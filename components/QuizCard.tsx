'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ClipboardCheck, Target, Award } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface QuizCardProps {
  id: string;
  title: string;
  moduleTitle?: string;
  questionCount: number;
  passingScore: number;
  duration?: string;
  difficulty?: string;
  completed?: boolean;
  lastScore?: number;
  index: number;
}

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
  Intermediate: 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
  Advanced: 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
};

export default function QuizCard({
  id,
  title,
  moduleTitle,
  questionCount,
  passingScore,
  duration = '10 min',
  difficulty = 'Beginner',
  completed = false,
  lastScore,
  index,
}: QuizCardProps) {
  const difficultyClass = difficultyColors[difficulty] || difficultyColors.Beginner;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 group relative">
        {completed && lastScore !== undefined && (
          <div className="absolute top-4 right-4">
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                lastScore >= passingScore
                  ? 'bg-secondary/20 text-secondary-foreground'
                  : 'bg-destructive/20 text-destructive'
              }`}
            >
              <Award className="h-3 w-3" />
              {lastScore}%
            </div>
          </div>
        )}

        <CardHeader>
          <div className="flex items-start justify-between mb-3">
            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <ClipboardCheck className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          {moduleTitle && (
            <CardDescription className="text-sm font-medium text-muted-foreground">
              Related to: {moduleTitle}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Questions:</span>
              <span className="font-medium">{questionCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Passing Score:</span>
              <span className="font-medium">{passingScore}%</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm flex-wrap">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <span className={`px-2 py-1 rounded-md text-xs font-medium border ${difficultyClass}`}>
              {difficulty}
            </span>
          </div>

          <Button
            asChild
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
            variant={completed ? 'outline' : 'default'}
          >
            <Link href={`/quizzes/${id}`}>
              <Target className="mr-2 h-4 w-4" />
              {completed ? 'Retake Quiz' : 'Start Quiz'}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
