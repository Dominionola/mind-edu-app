'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, TrendingUp, BookOpen, Heart, CloudRain, Brain, Sparkles, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  duration?: string;
  difficulty?: string;
  icon?: string;
  order: number;
  index: number;
  completed?: boolean;
}

type IconType = typeof CloudRain | typeof Heart | typeof TrendingUp | typeof BookOpen | typeof Brain | typeof Sparkles;
const iconMap: Record<string, IconType> = {
  CloudRain,
  Heart,
  TrendingUp,
  BookOpen,
  Brain,
  Sparkles,
};

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
  Intermediate: 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
  Advanced: 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
};

export default function ModuleCard({
  id,
  title,
  description,
  duration = '15 min',
  difficulty = 'Beginner',
  icon = 'BookOpen',
  order,
  index,
  completed = false,
}: ModuleCardProps) {
  const IconComponent = iconMap[icon] || BookOpen;
  const difficultyClass = difficultyColors[difficulty] || difficultyColors.Beginner;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className={`h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 group ${completed ? 'border-secondary/50 bg-secondary/5' : ''}`}>
        <CardHeader>
          <div className="flex items-start justify-between mb-3">
            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
            <div className="flex items-center gap-2">
              {completed && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/20 text-secondary">
                  <CheckCircle className="h-3 w-3" />
                  <span className="text-xs font-medium">Completed</span>
                </div>
              )}
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                Module {order}
              </span>
            </div>
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-base line-clamp-3">
            {description}
          </CardDescription>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <span className={`px-2 py-1 rounded-md text-xs font-medium border ${difficultyClass}`}>
              {difficulty}
            </span>
          </div>

          <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground" variant={completed ? 'outline' : 'default'}>
            <Link href={`/modules/${id}`}>
              {completed ? 'Review Module' : 'Start Learning'}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
