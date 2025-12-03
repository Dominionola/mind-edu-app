'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ClipboardCheck, TrendingUp, PenTool, Award, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Database } from '@/lib/types';

type UserResult = Database['public']['Tables']['user_results']['Row'];
type UserProgress = Database['public']['Tables']['user_progress']['Row'];
type Journal = Database['public']['Tables']['journals']['Row'];

interface Activity {
  type: 'quiz' | 'module' | 'journal';
  title: string;
  description: string;
  time: string;
  icon: typeof Award;
}

interface QuizResult {
  quiz_id: string;
  score: number;
  completed_at: string;
}

interface JournalEntry {
  created_at: string;
}

interface QuizData {
  title: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [quizResults, setQuizResults] = useState<UserResult[]>([]);
  const [journalCount, setJournalCount] = useState(0);
  const [modulesCompleted, setModulesCompleted] = useState(0);
  const [totalModules, setTotalModules] = useState(0);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

  useEffect(() => {
    async function fetchUserStats() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch quiz results
        const { data: results, error: resultsError} = await supabase
          .from('user_results')
          .select('*')
          .eq('user_id', user.id);

        if (!resultsError && results) {
          setQuizResults(results);
        }

        // Fetch journal count
        const { count, error: journalError } = await supabase
          .from('journals')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (!journalError && count !== null) {
          setJournalCount(count);
        }

        // Fetch modules completed
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('completed')
          .eq('user_id', user.id)
          .eq('completed', true);

        if (progressData) {
          setModulesCompleted(progressData.length);
        }

        // Fetch total modules count
        const { count: totalModulesCount } = await supabase
          .from('modules')
          .select('*', { count: 'exact', head: true })
          .eq('is_published', true);

        if (totalModulesCount !== null) {
          setTotalModules(totalModulesCount);
        }

        // Fetch recent activity
        const activities: Activity[] = [];

        // Get recent quiz results
        const { data: recentQuizResults } = await supabase
          .from('user_results')
          .select('quiz_id, score, completed_at')
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false })
          .limit(1);

        if (recentQuizResults && recentQuizResults.length > 0) {
          const latestQuiz = recentQuizResults[0] as unknown as QuizResult;
          const { data: quizData } = await supabase
            .from('quizzes')
            .select('title')
            .eq('id', latestQuiz.quiz_id)
            .single();

          const quiz = quizData as unknown as QuizData | null;
          if (quiz && quiz.title) {
            const timeAgo = getTimeAgo(new Date(latestQuiz.completed_at));
            activities.push({
              type: 'quiz',
              title: `Completed Quiz: ${quiz.title}`,
              description: `You scored ${latestQuiz.score}%`,
              time: timeAgo,
              icon: ClipboardCheck,
            });
          }
        }

        // Get recent module completions
        const { data: recentProgress } = await supabase
          .from('user_progress')
          .select('module_id, completed, updated_at, modules(title)')
          .eq('user_id', user.id)
          .eq('completed', true)
          .order('updated_at', { ascending: false })
          .limit(1);

        if (recentProgress && recentProgress.length > 0) {
          const progress = recentProgress[0] as UserProgress & { modules: { title: string } | null };
          if (progress.modules) {
            const timeAgo = getTimeAgo(new Date(progress.updated_at));
            activities.push({
              type: 'module',
              title: `Completed Module: ${progress.modules.title}`,
              description: 'Great job on finishing this learning module!',
              time: timeAgo,
              icon: BookOpen,
            });
          }
        }

        // Get recent journal entries
        const { data: recentJournals } = await supabase
          .from('journals')
          .select('created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (recentJournals && recentJournals.length > 0) {
          const journal = recentJournals[0] as unknown as JournalEntry;
          const timeAgo = getTimeAgo(new Date(journal.created_at));
          activities.push({
            type: 'journal',
            title: 'New Journal Entry',
            description: 'You wrote in your journal',
            time: timeAgo,
            icon: PenTool,
          });
        }

        // Sort by time (most recent first) and limit to 5
        activities.sort((a, b) => {
          const timeA = parseTimeAgo(a.time);
          const timeB = parseTimeAgo(b.time);
          return timeA - timeB;
        });

        setRecentActivity(activities.slice(0, 5));

        if (activities.length === 0) {
          // Show welcome message if no activity
          setRecentActivity([
            {
              type: 'module',
              title: 'Welcome to MindEdu Hub!',
              description: 'Start your mental health education journey by exploring our modules.',
              time: 'Just now',
              icon: Award,
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserStats();
  }, [user]);

  // Helper function to get time ago string
  function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  }

  // Helper function to parse time ago for sorting
  function parseTimeAgo(timeStr: string): number {
    if (timeStr === 'Just now') return 0;
    const match = timeStr.match(/(\d+)\s+(minute|hour|day)s?\s+ago/);
    if (!match) return 999999; // Old dates
    const value = parseInt(match[1]);
    const unit = match[2];
    if (unit === 'minute') return value;
    if (unit === 'hour') return value * 60;
    if (unit === 'day') return value * 1440;
    return 999999;
  }

  // Calculate statistics from quiz results
  // Calculate statistics from quiz results
  const passedQuizzes = quizResults.filter(r => r.score >= 60).length;
  const totalQuizzesTaken = quizResults.length;

  const stats = [
    {
      title: 'Modules Completed',
      value: loading ? '...' : modulesCompleted.toString(),
      total: totalModules.toString() || '0',
      icon: BookOpen,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Quizzes Passed',
      value: loading ? '...' : passedQuizzes.toString(),
      total: totalQuizzesTaken.toString() || 'taken',
      icon: ClipboardCheck,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      title: 'Total Quiz Score',
      value: loading ? '...' : totalQuizzesTaken > 0 ? `${Math.round(quizResults.reduce((sum, r) => sum + r.score, 0) / totalQuizzesTaken)}%` : '0%',
      total: 'average',
      icon: TrendingUp,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Journal Entries',
      value: loading ? '...' : journalCount.toString(),
      total: 'entries',
      icon: PenTool,
      color: 'text-chart-2',
      bgColor: 'bg-chart-2/10',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
        </h1>
        <p className="text-muted-foreground">
          Continue your mental health education journey and track your progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-baseline space-x-2 mt-2">
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">/ {stat.total}</p>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest achievements and progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading activity...</div>
            ) : recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <activity.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-foreground">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No recent activity yet. Start exploring!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>What would you like to do?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/modules">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Modules
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/quizzes">
                <ClipboardCheck className="mr-2 h-4 w-4" />
                Take a Quiz
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/coping/journal">
                <PenTool className="mr-2 h-4 w-4" />
                Write in Journal
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
