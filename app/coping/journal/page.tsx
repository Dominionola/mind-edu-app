'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, Loader2, Sparkles, Clock, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getPersonalizedPrompts, JournalPrompt } from '@/lib/journalPrompts';

interface JournalFormData {
  title: string;
  content: string;
  mood: string;
}

interface JournalEntry {
  id: string;
  title: string | null;
  content: string;
  mood: string | null;
  created_at: string;
}

const moods = [
  { value: 'happy', label: 'Happy', emoji: '😊' },
  { value: 'calm', label: 'Calm', emoji: '😌' },
  { value: 'anxious', label: 'Anxious', emoji: '😰' },
  { value: 'sad', label: 'Sad', emoji: '😢' },
  { value: 'stressed', label: 'Stressed', emoji: '😫' },
  { value: 'angry', label: 'Angry', emoji: '😠' },
  { value: 'grateful', label: 'Grateful', emoji: '🙏' },
  { value: 'tired', label: 'Tired', emoji: '😴' },
];

export default function JournalPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loadingPrompts, setLoadingPrompts] = useState(true);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const [prompts, setPrompts] = useState<JournalPrompt[]>([]);
  const [recentEntries, setRecentEntries] = useState<JournalEntry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<JournalFormData>();

  const selectedMood = watch('mood');
  const content = watch('content');

  // Fetch personalized prompts based on quiz results
  useEffect(() => {
    async function fetchPrompts() {
      if (!user) {
        setPrompts(getPersonalizedPrompts());
        setLoadingPrompts(false);
        return;
      }

      try {
        // Fetch user's quiz results
        const { data: results } = await supabase
          .from('user_results')
          .select('quiz_id, score, quizzes(title)')
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false })
          .limit(5);

        const formattedResults = results?.map((r: { quiz_id: string; score: number; quizzes: { title: string } | null }) => ({
          quiz_id: r.quiz_id,
          score: r.score,
          quiz_title: r.quizzes?.title,
        }));

        setPrompts(getPersonalizedPrompts(formattedResults));
      } catch (error) {
        console.error('Error fetching prompts:', error);
        setPrompts(getPersonalizedPrompts());
      } finally {
        setLoadingPrompts(false);
      }
    }

    fetchPrompts();
  }, [user]);

  // Fetch recent journal entries
  useEffect(() => {
    async function fetchRecentEntries() {
      if (!user) {
        setLoadingEntries(false);
        return;
      }

      try {
        const response = await fetch('/api/journal?limit=3');
        const data = await response.json();

        if (data.success) {
          setRecentEntries(data.data);
        }
      } catch (error) {
        console.error('Error fetching entries:', error);
      } finally {
        setLoadingEntries(false);
      }
    }

    fetchRecentEntries();
  }, [user]);

  const onSubmit = async (data: JournalFormData) => {
    if (!user) {
      router.push('/auth/login?redirect=/coping/journal');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title || null,
          content: data.content,
          mood: data.mood || null,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        reset();

        // Refresh recent entries
        const entriesResponse = await fetch('/api/journal?limit=3');
        const entriesData = await entriesResponse.json();
        if (entriesData.success) {
          setRecentEntries(entriesData.data);
        }

        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        alert(result.message || 'Failed to save journal entry');
      }
    } catch (error) {
      console.error('Error saving journal:', error);
      alert('Failed to save journal entry');
    } finally {
      setSaving(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    const currentContent = content || '';
    const newContent = currentContent ? `${currentContent}\n\n${prompt}` : prompt;
    setValue('content', newContent);
  };

  const deleteEntry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this journal entry?')) return;

    try {
      const response = await fetch(`/api/journal?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setRecentEntries(recentEntries.filter((entry) => entry.id !== id));
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link href="/coping">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Coping Tools
            </Link>
          </Button>

          <h1 className="text-3xl font-bold mb-2">Personal Journal</h1>
          <p className="text-muted-foreground">
            Express your thoughts and feelings in a safe, private space
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Journal Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Auth Warning */}
            {!user && (
              <Card className="border-accent/50 bg-accent/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Guest Mode</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        You need to log in to save your journal entries and access personalized prompts.
                      </p>
                      <Button asChild size="sm">
                        <Link href="/auth/login?redirect=/coping/journal">
                          Log In to Save
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-secondary/20 border border-secondary/30 rounded-lg"
              >
                <p className="text-secondary font-medium">✓ Journal entry saved successfully!</p>
              </motion.div>
            )}

            {/* Journal Entry Form */}
            <Card>
              <CardHeader>
                <CardTitle>New Journal Entry</CardTitle>
                <CardDescription>
                  Take a moment to reflect on your thoughts and feelings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Title <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="Give your entry a title..."
                      {...register('title')}
                      disabled={saving}
                      aria-label="Journal entry title"
                    />
                  </div>

                  {/* Mood Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="mood">
                      How are you feeling? <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <div className="grid grid-cols-4 gap-2">
                      {moods.map((mood) => (
                        <label
                          key={mood.value}
                          className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedMood === mood.value
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50 hover:bg-muted/50'
                          }`}
                        >
                          <input
                            type="radio"
                            value={mood.value}
                            {...register('mood')}
                            className="sr-only"
                            disabled={saving}
                          />
                          <span className="text-2xl mb-1" role="img" aria-label={mood.label}>
                            {mood.emoji}
                          </span>
                          <span className="text-xs text-center">{mood.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content">
                      Your thoughts <span className="text-destructive">*</span>
                    </Label>
                    <textarea
                      id="content"
                      rows={12}
                      placeholder="Write freely... There's no right or wrong way to journal. Let your thoughts flow."
                      {...register('content', {
                        required: 'Please write something before saving',
                        minLength: {
                          value: 10,
                          message: 'Please write at least 10 characters',
                        },
                      })}
                      disabled={saving}
                      className="w-full px-3 py-2 rounded-md border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      aria-label="Journal entry content"
                      aria-required="true"
                      aria-describedby={errors.content ? 'content-error' : undefined}
                    />
                    {errors.content && (
                      <p id="content-error" className="text-sm text-destructive" role="alert">
                        {errors.content.message}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {content?.length || 0} characters
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={saving || !user}
                    className="w-full"
                    size="lg"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Entry
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Writing Prompts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Writing Prompts
                </CardTitle>
                <CardDescription>
                  {user ? 'Personalized for you' : 'Get started with these ideas'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingPrompts ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    {prompts.slice(0, 5).map((prompt, index) => (
                      <motion.button
                        key={prompt.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handlePromptClick(prompt.prompt)}
                        className="w-full text-left p-3 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-lg shrink-0">{prompt.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-primary mb-1">
                              {prompt.category}
                            </p>
                            <p className="text-sm text-foreground line-clamp-2 group-hover:line-clamp-none">
                              {prompt.prompt}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Entries */}
            {user && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="h-5 w-5 text-primary" />
                    Recent Entries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingEntries ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : recentEntries.length > 0 ? (
                    <div className="space-y-3">
                      {recentEntries.map((entry) => (
                        <div
                          key={entry.id}
                          className="p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="font-medium text-sm line-clamp-1">
                              {entry.title || 'Untitled'}
                            </p>
                            <button
                              onClick={() => deleteEntry(entry.id)}
                              className="text-destructive hover:text-destructive/80 shrink-0"
                              aria-label="Delete entry"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                            {entry.content}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(entry.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No entries yet. Start writing!
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Journaling Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex gap-2">
                    <span>💭</span>
                    <span>Write without judgment or editing</span>
                  </li>
                  <li className="flex gap-2">
                    <span>🕐</span>
                    <span>Set aside 10-15 minutes daily</span>
                  </li>
                  <li className="flex gap-2">
                    <span>🔒</span>
                    <span>Your entries are completely private</span>
                  </li>
                  <li className="flex gap-2">
                    <span>🎯</span>
                    <span>Focus on your feelings, not just events</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
