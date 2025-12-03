import { createClient } from '@/lib/supabase-server';
import QuizCard from '@/components/QuizCard';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Info, Trophy } from 'lucide-react';
import Link from 'next/link';
import type { Database } from '@/lib/types';

type QuizRow = Database['public']['Tables']['quizzes']['Row'];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function QuizzesPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch all quizzes (no auth required)
  const { data: quizzesData, error } = await supabase
    .from('quizzes')
    .select('*')
    .order('topic', { ascending: true })
    .order('difficulty', { ascending: true });

  const quizzes = quizzesData as QuizRow[] | null;

  if (error && error.message) {
    console.error('Error fetching quizzes:', error);
  }

  // If user is authenticated, fetch their results
  type UserResult = {
    quiz_id: string;
    score: number;
    completed_at: string;
  };
  let userResults: UserResult[] = [];
  if (user) {
    const { data: resultsData } = await supabase
      .from('user_results')
      .select('quiz_id, score, completed_at')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false });

    const results = resultsData as UserResult[] | null;

    if (results) {
      // Get the latest result for each quiz
      const latestResults = new Map<string, UserResult>();
      results.forEach((result) => {
        if (!latestResults.has(result.quiz_id)) {
          latestResults.set(result.quiz_id, result);
        }
      });
      userResults = Array.from(latestResults.values());
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <ClipboardCheck className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Knowledge Quizzes</h1>
            <p className="text-muted-foreground">
              Test your understanding and reinforce your learning
            </p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">How Quizzes Work</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Each quiz tests your knowledge from the related module. You need to score at least the
            passing percentage to pass. Don&apos;t worry - you can retake quizzes as many times as you need!
          </p>
          {!user && (
            <p className="text-sm text-primary font-medium">
              💡 Log in to save your quiz results and track your progress over time.
            </p>
          )}
        </div>
      </div>

      {/* User Progress Stats (if logged in) */}
      {user && userResults.length > 0 && (
        <div className="bg-gradient-to-br from-secondary/10 to-accent/10 border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-6 w-6 text-secondary" />
            <h3 className="text-xl font-semibold">Your Progress</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-2xl font-bold text-foreground">{userResults.length}</p>
              <p className="text-sm text-muted-foreground">Quizzes Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">
                {Math.round(
                  userResults.reduce((sum, r) => sum + r.score, 0) / userResults.length
                )}
                %
              </p>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">
                {userResults.filter((r) => r.score >= 60).length}
              </p>
              <p className="text-sm text-muted-foreground">Quizzes Passed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {Math.max(...userResults.map((r) => r.score), 0)}%
              </p>
              <p className="text-sm text-muted-foreground">Best Score</p>
            </div>
          </div>
        </div>
      )}

      {/* Quizzes Grid */}
      {quizzes && quizzes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz, index) => {
              const userResult = userResults.find((r) => r.quiz_id === quiz.id);
              const questions = quiz.questions as { length?: number } | null;

              return (
                <QuizCard
                  key={quiz.id}
                  id={quiz.id}
                  title={quiz.title}
                  moduleTitle={quiz.topic}
                  questionCount={questions?.length || 0}
                  passingScore={quiz.passing_score}
                  duration={'10 min'}
                  difficulty={quiz.difficulty || 'Beginner'}
                  completed={!!userResult}
                  lastScore={userResult?.score}
                  index={index}
                />
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-card border rounded-lg p-6 max-w-2xl">
              <h3 className="text-xl font-semibold mb-2">Want to learn more?</h3>
              <p className="text-muted-foreground mb-4">
                Explore our educational modules to deepen your understanding of mental health topics.
              </p>
              <Button asChild>
                <Link href="/modules">Browse Modules</Link>
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="inline-block bg-muted/30 rounded-lg p-8 max-w-md">
            <ClipboardCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Quizzes Available Yet</h3>
            <p className="text-muted-foreground mb-4">
              We&apos;re creating engaging quizzes to test your knowledge.
            </p>
            <Button asChild variant="outline">
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
