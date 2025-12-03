'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { parseMarkdown } from '@/lib/markdownParser';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Clock, CheckCircle, Loader2, ClipboardCheck } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ModuleContent {
  sections: Array<{
    type: 'text' | 'image' | 'video';
    content?: string;
    url?: string;
    alt?: string;
    title?: string;
  }>;
  duration?: string;
  difficulty?: string;
  icon?: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  content: ModuleContent;
  order: number;
}

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [nextModule, setNextModule] = useState<{ id: string; title: string } | null>(null);
  const [relatedQuiz, setRelatedQuiz] = useState<{ id: string; title: string } | null>(null);
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchModule() {
      if (!params.id || Array.isArray(params.id)) return;

      try {
        const { data, error } = await supabase
          .from('modules')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;

        const moduleData = data as Module;
        setModule(moduleData);

        // Fetch next module
        const { data: nextData } = await supabase
          .from('modules')
          .select('id, title')
          .gt('order', moduleData.order)
          .order('order', { ascending: true })
          .limit(1)
          .single();

        if (nextData) {
          setNextModule(nextData as { id: string; title: string });
        }

        // Fetch related quiz for this module
        const { data: quizData } = await supabase
          .from('quizzes')
          .select('id, title')
          .eq('module_id', params.id)
          .limit(1)
          .single();

        if (quizData) {
          setRelatedQuiz(quizData as { id: string; title: string });
        }

        // Check if user has completed this module
        if (user) {
          const { data: progressData } = await supabase
            .from('user_progress')
            .select('completed')
            .eq('user_id', user.id)
            .eq('module_id', params.id)
            .single();

          if (progressData) {
            setCompleted((progressData as { completed: boolean }).completed);
          }
        }
      } catch (error) {
        console.error('Error fetching module:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchModule();
  }, [params.id, user]);

  const handleComplete = async () => {
    if (!user) {
      router.push('/auth/login?redirect=/modules/' + params.id);
      return;
    }

    setSaving(true);

    try {
      const response = await fetch('/api/module-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          module_id: params.id,
          completed: true,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setCompleted(true);
        setTimeout(() => {
          if (nextModule) {
            router.push(`/modules/${nextModule.id}`);
          }
        }, 1500);
      } else {
        alert(result.message || 'Failed to save progress');
      }
    } catch (error) {
      console.error('Error saving module completion:', error);
      alert('Failed to save progress');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!module) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Module Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The module you&apos;re looking for doesn&apos;t exist or has been unpublished.
        </p>
        <Button asChild>
          <Link href="/modules">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Modules
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <Button asChild variant="ghost" size="sm">
        <Link href="/modules">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Modules
        </Link>
      </Button>

      {/* Module Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-sm font-medium text-primary mb-2 block">
                Module {module.order}
              </span>
              <h1 className="text-3xl font-bold text-foreground mb-2">{module.title}</h1>
              <p className="text-lg text-muted-foreground">{module.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            {module.content?.duration && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{module.content.duration}</span>
              </div>
            )}
            {module.content?.difficulty && (
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary font-medium">
                {module.content.difficulty}
              </span>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Module Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {module.content?.sections?.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 3) }}
          >
            {section.type === 'text' && (
              <Card className="p-6">
                <div
                  className="prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdown(section.content || ''),
                  }}
                />
              </Card>
            )}

            {section.type === 'image' && section.url && (
              <Card className="overflow-hidden">
                <div className="relative w-full h-[400px]">
                  <Image
                    src={section.url}
                    alt={section.alt || 'Module image'}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  />
                </div>
                {section.alt && (
                  <div className="p-4 bg-muted/30">
                    <p className="text-sm text-muted-foreground text-center">{section.alt}</p>
                  </div>
                )}
              </Card>
            )}

            {section.type === 'video' && section.url && (
              <Card className="overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src={section.url}
                    title={section.title || 'Module video'}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
                {section.title && (
                  <div className="p-4 bg-muted/30">
                    <p className="text-sm font-medium text-center">{section.title}</p>
                  </div>
                )}
              </Card>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Completion Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 bg-gradient-to-br from-secondary/5 to-accent/5">
          <div className="text-center space-y-4">
            {!completed ? (
              <>
                <h3 className="text-xl font-semibold">Ready to continue?</h3>
                <p className="text-muted-foreground">
                  {relatedQuiz
                    ? "Test your knowledge or continue to the next module"
                    : "Mark this module as complete to track your progress"}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {relatedQuiz && (
                    <Button asChild size="lg" className="min-w-[200px]">
                      <Link href={`/quizzes/${relatedQuiz.id}`}>
                        <ClipboardCheck className="mr-2 h-5 w-5" />
                        Take Quiz
                      </Link>
                    </Button>
                  )}
                  <Button
                    onClick={handleComplete}
                    variant={relatedQuiz ? 'outline' : 'default'}
                    size="lg"
                    className="min-w-[200px]"
                    disabled={saving || !user}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Mark as Complete
                      </>
                    )}
                  </Button>
                  {nextModule && (
                    <Button asChild variant="outline" size="lg">
                      <Link href={`/modules/${nextModule.id}`}>
                        Next Module
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-4"
              >
                <CheckCircle className="h-16 w-16 text-secondary mx-auto" />
                <h3 className="text-2xl font-bold text-secondary">Module Complete!</h3>
                <p className="text-muted-foreground">
                  Great job! {nextModule ? "Moving to the next module..." : "You've completed all available modules!"}
                </p>
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
