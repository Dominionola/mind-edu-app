'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Award, TrendingUp, RotateCcw, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  passingScore: number;
  userAnswers: Record<string, number>;
  questions: QuizQuestion[];
  quizId: string;
  moduleId?: string;
  onRetake: () => void;
}

export default function QuizResults({
  score,
  totalQuestions,
  passingScore,
  userAnswers,
  questions,
  moduleId,
  onRetake,
}: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= passingScore;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Score Summary */}
      <Card className={`border-2 ${passed ? 'border-secondary' : 'border-destructive/50'}`}>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
                passed ? 'bg-secondary/20' : 'bg-destructive/20'
              }`}
            >
              {passed ? (
                <Award className="h-10 w-10 text-secondary" />
              ) : (
                <TrendingUp className="h-10 w-10 text-destructive" />
              )}
            </motion.div>

            <div>
              <h2 className="text-3xl font-bold mb-2">
                {passed ? 'Congratulations!' : 'Keep Learning!'}
              </h2>
              <p className="text-lg text-muted-foreground">
                You scored {score} out of {totalQuestions} ({percentage}%)
              </p>
              {passed ? (
                <p className="text-secondary font-medium mt-2">
                  You passed! Great job on mastering this topic.
                </p>
              ) : (
                <p className="text-muted-foreground mt-2">
                  You need {passingScore}% to pass. Review the explanations below and try again!
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button onClick={onRetake} variant="outline" size="lg">
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake Quiz
              </Button>
              {moduleId && (
                <Button asChild size="lg">
                  <Link href={`/modules/${moduleId}`}>
                    Review Module
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline" size="lg">
                <Link href="/quizzes">
                  All Quizzes
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Review Your Answers</h3>
        <div className="space-y-4">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[question.id];
            const isCorrect = Number(userAnswer) === question.correctAnswer;

            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card
                  className={`border-l-4 ${
                    isCorrect ? 'border-l-secondary' : 'border-l-destructive'
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="shrink-0">
                        {isCorrect ? (
                          <CheckCircle className="h-6 w-6 text-secondary" />
                        ) : (
                          <XCircle className="h-6 w-6 text-destructive" />
                        )}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold mb-2">
                          Question {index + 1}
                        </CardTitle>
                        <p className="text-base text-foreground">{question.question}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* Options */}
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => {
                        const isUserAnswer = Number(userAnswer) === optIndex;
                        const isCorrectAnswer = question.correctAnswer === optIndex;

                        return (
                          <div
                            key={optIndex}
                            className={`p-3 rounded-lg border-2 ${
                              isCorrectAnswer
                                ? 'bg-secondary/10 border-secondary'
                                : isUserAnswer
                                ? 'bg-destructive/10 border-destructive'
                                : 'bg-muted/30 border-muted'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {isCorrectAnswer && (
                                <CheckCircle className="h-4 w-4 text-secondary shrink-0" />
                              )}
                              {isUserAnswer && !isCorrectAnswer && (
                                <XCircle className="h-4 w-4 text-destructive shrink-0" />
                              )}
                              <span className="text-sm">{option}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                      <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-accent" />
                        Explanation
                      </h5>
                      <p className="text-sm text-muted-foreground">{question.explanation}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
