'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ProgressBar';
import QuizResults from '@/components/QuizResults';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  id: string;
  topic: string;
  title: string;
  questions: QuizQuestion[];
  passing_score: number;
  difficulty: string | null;
  created_at: string;
}

export default function QuizPage() {
  const params = useParams();
  const { user } = useAuth();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

  const answers = watch();

  useEffect(() => {
    async function fetchQuiz() {
      if (!params.id || Array.isArray(params.id)) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('quizzes')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;

        setQuiz(data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [params.id]);

  const onSubmit = async (data: Record<string, number>) => {
    if (!quiz) return;

    // Calculate score
    let correctCount = 0;
    quiz.questions.forEach((question) => {
      if (Number(data[question.id]) === question.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setShowResults(true);

    // Save result if user is logged in
    if (user) {
      setSaving(true);
      try {
        const response = await fetch('/api/save-quiz-result', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quiz_id: quiz.id,
            score: correctCount,
            total_questions: quiz.questions.length,
            answers: data,
          }),
        });

        const result = await response.json();
        if (!result.success) {
          console.error('Failed to save result:', result.error);
        }
      } catch (error) {
        console.error('Error saving quiz result:', error);
      } finally {
        setSaving(false);
      }
    }
  };

  const handleNext = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRetake = () => {
    setShowResults(false);
    setCurrentQuestion(0);
    setScore(0);
    // Clear all answers
    quiz?.questions.forEach((q) => {
      setValue(q.id, undefined);
    });
  };

  const isQuestionAnswered = (questionId: string) => {
    return answers[questionId] !== undefined;
  };

  const allQuestionsAnswered = () => {
    return quiz?.questions.every((q) => isQuestionAnswered(q.id)) || false;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Quiz Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The quiz you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild>
          <Link href="/quizzes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Quizzes
          </Link>
        </Button>
      </div>
    );
  }

  if (showResults) {
    return (
      <QuizResults
        score={score}
        totalQuestions={quiz.questions.length}
        passingScore={quiz.passing_score}
        userAnswers={answers}
        questions={quiz.questions}
        quizId={quiz.id}
        moduleId={undefined}
        onRetake={handleRetake}
      />
    );
  }

  // Safety check for questions array
  if (!quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>No Questions Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This quiz doesn&apos;t have any questions yet.
            </p>
            <Button asChild>
              <Link href="/quizzes">Back to Quizzes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestionData = quiz.questions[currentQuestion];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button asChild variant="ghost" size="sm">
        <Link href="/quizzes">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Link>
      </Button>

      {/* Login reminder for anonymous users */}
      {!user && (
        <Card className="bg-accent/10 border-accent/30">
          <CardContent className="py-4">
            <p className="text-sm text-accent-foreground">
              💡 <Link href="/auth/login" className="font-semibold underline">Log in</Link> to save your quiz results and track your progress over time!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Quiz Header */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">{quiz.title}</h1>
          <p className="text-muted-foreground mb-4">
            {quiz.questions.length} questions • Passing score: {quiz.passing_score}%
            {quiz.difficulty && ` • ${quiz.difficulty}`}
          </p>

          {/* Progress Bar */}
          <ProgressBar
            current={currentQuestion + 1}
            total={quiz.questions.length}
          />
        </CardContent>
      </Card>

      {/* Guest Warning */}
      {!user && (
        <Card className="border-accent/50 bg-accent/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground mb-1">Guest Mode</p>
                <p className="text-sm text-muted-foreground">
                  You&apos;re taking this quiz as a guest. Your results won&apos;t be saved.{' '}
                  <Link href="/auth/login" className="text-primary hover:underline font-medium">
                    Log in
                  </Link>{' '}
                  to track your progress.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Question {currentQuestion + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-foreground">{currentQuestionData.question}</p>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestionData.options.map((option, index) => (
                  <label
                    key={`option-${index}`}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      answers[currentQuestionData.id] === index
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <input
                      type="radio"
                      value={index}
                      {...register(currentQuestionData.id, { required: true })}
                      className="mt-1 h-4 w-4 text-primary focus:ring-primary"
                    />
                    <span className="flex-1 text-sm">{option}</span>
                  </label>
                ))}
              </div>

              {errors[currentQuestionData.id] && (
                <p className="text-sm text-destructive">Please select an answer</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between gap-4">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {quiz.questions.filter((q) => isQuestionAnswered(q.id)).length} of{' '}
                {quiz.questions.length} answered
              </p>
            </div>

            {currentQuestion < quiz.questions.length - 1 ? (
              <Button onClick={handleNext} disabled={!isQuestionAnswered(currentQuestionData.id)}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit(onSubmit)}
                disabled={!allQuestionsAnswered() || saving}
                className="min-w-[120px]"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Submit Quiz
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Jump */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Quick Jump</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {quiz.questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(index)}
                className={`aspect-square rounded-md text-sm font-medium transition-colors ${
                  index === currentQuestion
                    ? 'bg-primary text-primary-foreground'
                    : isQuestionAnswered(q.id)
                    ? 'bg-secondary/20 text-secondary-foreground hover:bg-secondary/30'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
