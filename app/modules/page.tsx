'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import ModuleCard from '@/components/ModuleCard';
import { Button } from '@/components/ui/button';
import { BookOpen, Info, Loader2 } from 'lucide-react';
import Link from 'next/link';
import type { Json } from '@/lib/types';

interface Module {
  id: string;
  title: string;
  description: string;
  content: Json;
  order: number;
}

interface UserProgress {
  module_id: string;
  completed: boolean;
}

export default function ModulesPage() {
  const { user } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all modules
        const { data: modulesData, error: modulesError } = await supabase
          .from('modules')
          .select('*')
          .eq('is_published', true)
          .order('order', { ascending: true });

        if (modulesError) {
          console.error('Error fetching modules:', modulesError);
        } else if (modulesData) {
          setModules(modulesData);
        }

        // Fetch user progress if logged in
        if (user) {
          const { data: progressData } = await supabase
            .from('user_progress')
            .select('module_id, completed')
            .eq('user_id', user.id);

          if (progressData) {
            setUserProgress(progressData);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  const isModuleCompleted = (moduleId: string) => {
    return userProgress.some(p => p.module_id === moduleId && p.completed);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Learning Modules</h1>
            <p className="text-muted-foreground">
              Explore evidence-based mental health education
            </p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-foreground mb-1">Start Your Journey</h3>
          <p className="text-sm text-muted-foreground">
            Each module is designed to be completed in 15-30 minutes. Take your time, and feel free
            to revisit modules as often as you need. Progress is saved automatically.
          </p>
        </div>
      </div>

      {/* Modules Grid */}
      {modules && modules.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => {
              const content = module.content as { duration?: string; difficulty?: string; icon?: string } | null;
              return (
                <ModuleCard
                  key={module.id}
                  id={module.id}
                  title={module.title}
                  description={module.description || ''}
                  duration={content?.duration || '15 min'}
                  difficulty={content?.difficulty || 'Beginner'}
                  icon={content?.icon || 'BookOpen'}
                  order={module.order}
                  index={index}
                  completed={isModuleCompleted(module.id)}
                />
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-card border rounded-lg p-6 max-w-2xl">
              <h3 className="text-xl font-semibold mb-2">Ready to test your knowledge?</h3>
              <p className="text-muted-foreground mb-4">
                Complete quizzes after each module to track your progress and earn achievements.
              </p>
              <Button asChild>
                <Link href="/quizzes">View Quizzes</Link>
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="inline-block bg-muted/30 rounded-lg p-8 max-w-md">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Modules Available Yet</h3>
            <p className="text-muted-foreground mb-4">
              We&apos;re working on creating engaging mental health education content for you.
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
