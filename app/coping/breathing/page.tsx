'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Square } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';

type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'rest';

const PHASE_DURATIONS = {
  inhale: 4000,  // 4 seconds
  hold: 4000,    // 4 seconds
  exhale: 4000,  // 4 seconds
  rest: 1000,    // 1 second between cycles
};

const PHASE_LABELS = {
  inhale: 'Breathe In',
  hold: 'Hold',
  exhale: 'Breathe Out',
  rest: 'Rest',
};

const PHASE_COLORS = {
  inhale: 'from-secondary to-secondary/70',
  hold: 'from-accent to-accent/70',
  exhale: 'from-primary to-primary/70',
  rest: 'from-muted to-muted/70',
};

export default function BreathingExercisePage() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathingPhase>('rest');
  const [cycle, setCycle] = useState(0);
  const [progress, setProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const soundRef = useRef<Howl | null>(null);

  // Initialize Howler sound
  useEffect(() => {
    // You'll need to upload a chime sound to Supabase storage
    // For now, using a free sound from a CDN as example
    const chimeUrl = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';

    soundRef.current = new Howl({
      src: [chimeUrl],
      volume: 0.5,
      onload: () => {
        setIsLoaded(true);
      },
      onloaderror: () => {
        console.error('Failed to load chime sound');
        setIsLoaded(false);
      },
    });

    return () => {
      soundRef.current?.unload();
    };
  }, []);

  const playChime = useCallback(() => {
    if (soundEnabled && soundRef.current && isLoaded) {
      soundRef.current.play();
    }
  }, [soundEnabled, isLoaded]);

  const startBreathing = useCallback(() => {
    setIsActive(true);
    setCycle(0);
    setPhase('inhale');
    setProgress(0);
    playChime();
  }, [playChime]);

  const pauseBreathing = useCallback(() => {
    setIsActive(false);
    if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
  }, []);

  const resetBreathing = useCallback(() => {
    setIsActive(false);
    setPhase('rest');
    setCycle(0);
    setProgress(0);
    if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(!soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    if (!isActive) return;

    const duration = PHASE_DURATIONS[phase];
    const progressInterval = 50; // Update every 50ms
    let elapsed = 0;

    // Progress timer
    progressTimerRef.current = setInterval(() => {
      elapsed += progressInterval;
      setProgress((elapsed / duration) * 100);
    }, progressInterval);

    // Phase timer
    phaseTimerRef.current = setTimeout(() => {
      setProgress(0);

      // Transition to next phase
      if (phase === 'inhale') {
        setPhase('hold');
        playChime();
      } else if (phase === 'hold') {
        setPhase('exhale');
        playChime();
      } else if (phase === 'exhale') {
        setPhase('rest');
      } else if (phase === 'rest') {
        setCycle((prev) => prev + 1);
        setPhase('inhale');
        playChime();
      }
    }, duration);

    return () => {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isActive, phase, playChime]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (isActive) {
          pauseBreathing();
        } else {
          if (phase === 'rest' && cycle === 0) {
            startBreathing();
          } else {
            setIsActive(true);
          }
        }
      } else if (e.code === 'KeyR') {
        resetBreathing();
      } else if (e.code === 'KeyM') {
        toggleSound();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isActive, phase, cycle, pauseBreathing, startBreathing, resetBreathing, toggleSound]);

  const circleScale = phase === 'inhale' ? 1.5 : phase === 'exhale' ? 0.7 : 1;
  const circleDuration = PHASE_DURATIONS[phase] / 1000;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link href="/coping">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Coping Tools
            </Link>
          </Button>

          <h1 className="text-3xl font-bold mb-2">Breathing Exercise</h1>
          <p className="text-muted-foreground">
            4-4-4 breathing technique to reduce stress and anxiety
          </p>
        </div>

        {/* Main Exercise Card */}
        <Card className="mb-6">
          <CardContent className="p-8 md:p-12">
            {/* Breathing Circle */}
            <div className="flex flex-col items-center justify-center space-y-8">
              {/* Circle Container */}
              <div
                className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
                role="status"
                aria-live="polite"
                aria-label={`Breathing exercise: ${PHASE_LABELS[phase]}`}
              >
                {/* Animated Circle */}
                <motion.div
                  animate={{ scale: circleScale }}
                  transition={{
                    duration: circleDuration,
                    ease: 'easeInOut',
                  }}
                  className={`absolute w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br ${PHASE_COLORS[phase]} opacity-60 blur-xl`}
                />

                <motion.div
                  animate={{ scale: circleScale }}
                  transition={{
                    duration: circleDuration,
                    ease: 'easeInOut',
                  }}
                  className={`relative w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-br ${PHASE_COLORS[phase]} flex items-center justify-center shadow-2xl`}
                >
                  <div className="text-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={phase}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {PHASE_LABELS[phase]}
                        </p>
                        <p className="text-lg text-white/80">
                          {Math.ceil((PHASE_DURATIONS[phase] / 1000) * (1 - progress / 100))}s
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Progress Ring */}
                <svg
                  className="absolute w-56 h-56 md:w-72 md:h-72 -rotate-90"
                  viewBox="0 0 200 200"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-muted opacity-20"
                  />
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-primary"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: progress / 100 }}
                    transition={{ duration: 0.05 }}
                    strokeDasharray="565"
                    strokeDashoffset="0"
                  />
                </svg>
              </div>

              {/* Cycle Counter */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Cycles Completed</p>
                <p className="text-3xl font-bold text-foreground">{cycle}</p>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {!isActive && cycle === 0 ? (
                  <Button
                    size="lg"
                    onClick={startBreathing}
                    className="min-w-[140px]"
                    aria-label="Start breathing exercise"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Start
                  </Button>
                ) : !isActive ? (
                  <>
                    <Button
                      size="lg"
                      onClick={() => setIsActive(true)}
                      className="min-w-[140px]"
                      aria-label="Resume breathing exercise"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Resume
                    </Button>
                    <Button
                      size="lg"
                      onClick={resetBreathing}
                      variant="destructive"
                      aria-label="Stop and reset breathing exercise"
                    >
                      <Square className="mr-2 h-5 w-5" />
                      Stop
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="lg"
                      onClick={pauseBreathing}
                      variant="outline"
                      className="min-w-[140px]"
                      aria-label="Pause breathing exercise"
                    >
                      <Pause className="mr-2 h-5 w-5" />
                      Pause
                    </Button>
                    <Button
                      size="lg"
                      onClick={resetBreathing}
                      variant="destructive"
                      aria-label="Stop and reset breathing exercise"
                    >
                      <Square className="mr-2 h-5 w-5" />
                      Stop
                    </Button>
                  </>
                )}

                <Button
                  size="lg"
                  onClick={toggleSound}
                  variant="outline"
                  aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
                >
                  {soundEnabled ? (
                    <Volume2 className="h-5 w-5" />
                  ) : (
                    <VolumeX className="h-5 w-5" />
                  )}
                </Button>
              </div>

              {/* Keyboard Shortcuts */}
              <div className="text-center text-sm text-muted-foreground">
                <p className="font-medium mb-1">Keyboard Shortcuts</p>
                <p>Space: Play/Pause • R: Reset • M: Mute/Unmute</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-secondary">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Breathe In (4 seconds)</h4>
                  <p className="text-sm text-muted-foreground">
                    Slowly inhale through your nose, filling your lungs completely. Feel your chest and belly expand.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-accent">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Hold (4 seconds)</h4>
                  <p className="text-sm text-muted-foreground">
                    Hold your breath comfortably. Don&apos;t strain. Notice how your body feels.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Breathe Out (4 seconds)</h4>
                  <p className="text-sm text-muted-foreground">
                    Slowly exhale through your mouth. Release all tension as you breathe out.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-muted/40 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-muted-foreground">4</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Rest (1 second)</h4>
                  <p className="text-sm text-muted-foreground">
                    Brief pause before the next cycle. Repeat as many times as you need.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary/10 border border-secondary/30 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                💡 Tips for Best Results
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Find a quiet, comfortable place</li>
                <li>Sit or lie down with good posture</li>
                <li>Close your eyes if it helps you focus</li>
                <li>Practice for at least 3-5 cycles</li>
                <li>Use headphones for the audio cues</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
