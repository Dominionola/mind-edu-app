import Link from 'next/link';
import Image from 'next/image';
import * as motion from 'framer-motion/client';
import { BookOpen, Zap, Trophy, ArrowRight, Activity, Target, Flame, Clock, RotateCcw, Smile } from 'lucide-react';

export default function Home() {
  // Stagger variants for the hero content
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      }
    },
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center">
      {/* SECTION 2: The Giant Hero - Contained Layout */}
      <section className="relative w-full py-6 px-6 sm:px-12 flex flex-col items-center">
        <div className="relative w-full max-w-7xl min-h-[600px] md:min-h-[800px] rounded-[40px] overflow-hidden flex items-center justify-center bg-zinc-900 shadow-2xl">
          {/* Background Image - Contained inside the rounded container */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <Image
              src="/hero-image.png"
              alt="MindEdu Hero Background"
              fill
              priority
              quality={100}
              className="object-cover object-center opacity-80"
            />
            {/* Subtle Gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent md:bg-gradient-to-b md:from-black/40 md:to-black/20" />
          </div>

          {/* Hero Content */}
          <div className="container relative z-10 px-6 mx-auto py-24 md:py-32 flex flex-col items-center text-center transition-all">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="max-w-3xl flex flex-col items-center"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-[4.5rem] font-bold tracking-tight leading-[1.05] text-white mb-6 drop-shadow-2xl"
              >
                Master Your Mind. <br className="hidden md:block" />
                Elevate Your Future.
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg font-medium text-white/90 max-w-xl mb-10 drop-shadow-lg leading-relaxed"
              >
                The digital sanctuary for youth mental wellness. Explore interactive modules, build resilience, and take control of your educational journey.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                <Link
                  href="/auth/signup"
                  className="group relative flex items-center justify-center px-10 py-4 bg-primary text-white rounded-full font-bold shadow-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center">
                    Start Learning Free <span className="ml-2 font-normal">›</span>
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </Link>

                <div className="flex items-center text-white/90 text-sm font-semibold drop-shadow-md">
                  <svg className="w-5 h-5 mr-2 text-primary border-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  Science-Backed & Youth-Verified
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Core Insight Visual - The Moment of Calm */}
      <section className="relative w-full py-24 md:py-40 bg-background overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

            {/* Left Column: The Message */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 text-center lg:text-left"
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6">
                Core Insight
              </h2>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-8">
                A health-check for <br />
                your mind, <span className="text-primary italic">simplified.</span>
              </h3>
              <p className="text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed mb-10">
                Experience the immediate power of the 4-4-4 technique. Our interactive tools aren't just features—they are scientifically proven anchors for your mental resilience.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <div className="flex items-center gap-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  </div>
                  <span className="text-sm font-bold tracking-wide text-foreground/80">Reduce Anxiety</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  </div>
                  <span className="text-sm font-bold tracking-wide text-foreground/80">Improve Focus</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: The Interactive Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 relative flex items-center justify-center p-8 lg:p-0"
            >
              {/* Outer Decorative Rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border border-primary/5 animate-[spin_20s_linear_infinite]" />
                <div className="absolute w-[250px] h-[250px] md:w-[380px] md:h-[380px] rounded-full border border-secondary/10 animate-[spin_15s_linear_reverse_infinite]" />
              </div>

              {/* The Breathing Circle Component */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                {/* Breath In/Out Animation */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1.5, 1],
                  }}
                  transition={{
                    duration: 12, // 4s inhale, 4s hold, 4s exhale
                    repeat: Infinity,
                    times: [0, 0.33, 0.66, 1],
                    ease: "easeInOut"
                  }}
                  className="absolute w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl"
                />

                <motion.div
                  animate={{
                    scale: [0.8, 1.3, 1.3, 0.8],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    times: [0, 0.33, 0.66, 1],
                    ease: "easeInOut"
                  }}
                  className="relative w-36 h-36 md:w-48 md:h-48 rounded-full bg-white shadow-[0_0_50px_rgba(var(--primary),0.1)] border border-primary/10 flex items-center justify-center z-10"
                >
                  <motion.div
                    animate={{
                      opacity: [0.4, 1, 1, 0.4]
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      times: [0, 0.33, 0.66, 1],
                    }}
                    className="text-center"
                  >
                    <span className="text-primary font-bold text-sm tracking-widest uppercase">
                      Breath
                    </span>
                  </motion.div>
                </motion.div>

                {/* Status Indicator */}
                <div className="absolute -bottom-12 flex flex-col items-center">
                  <div className="flex gap-2 mb-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          opacity: [0.3, 1, 0.3],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 4,
                          delay: i * 4,
                          repeat: Infinity,
                        }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                    Auto-Guided Cycle
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 4: Feature Showcase - Interactive Learning */}
      <section className="relative w-full py-24 md:py-40 bg-zinc-50/50">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4"
            >
              The Experience
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-foreground"
            >
              Learn. Practice. <span className="text-primary">Evolve.</span>
            </motion.h3>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Modules */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative p-8 md:p-10 rounded-[32px] bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-4">Interactive Modules</h4>
                <p className="text-foreground/60 leading-relaxed mb-8">
                  Evidence-based content on topics like depression, anxiety, and stress management, designed for the modern youth.
                </p>
                <Link href="/modules" className="inline-flex items-center text-sm font-bold text-primary group-hover:gap-2 transition-all">
                  Explore Library <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </div>
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
            </motion.div>

            {/* Feature 2: Quizzes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative p-8 md:p-10 rounded-[32px] bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-8 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-4">Smart Quizzes</h4>
                <p className="text-foreground/60 leading-relaxed mb-8">
                  Instant feedback with detailed explanations. Test your knowledge and build confidence as you learn.
                </p>
                <Link href="/quizzes" className="inline-flex items-center text-sm font-bold text-secondary group-hover:gap-2 transition-all">
                  Test Your Knowledge <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </div>
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-colors" />
            </motion.div>

            {/* Feature 3: Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative p-8 md:p-10 rounded-[32px] bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform">
                  <Trophy className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-4">Personal Growth</h4>
                <p className="text-foreground/60 leading-relaxed mb-8">
                  Track your progress, earn achievements, and see your resilience grow with real-time statistics and insights.
                </p>
                <Link href="/dashboard" className="inline-flex items-center text-sm font-bold text-accent group-hover:gap-2 transition-all">
                  View My Stats <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </div>
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Personalized Path - The Dashboard Preview */}
      <section className="relative w-full py-24 md:py-40 bg-zinc-950 text-white overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center lg:text-left"
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-6">
                Your Digital Sanctuary
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
                Your journey is unique. <br className="hidden lg:block" />
                <span className="text-white/50">We decode your progress with you.</span>
              </h3>
              <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed mb-10 mx-auto lg:mx-0">
                A private dashboard that grows with you. Watch your resilience build in real-time through personalized statistics, achievements, and adaptive learning paths.
              </p>

              <ul className="space-y-4 text-left max-w-sm mx-auto lg:mx-0">
                {[
                  { icon: Target, text: "Goal-oriented tracking" },
                  { icon: Activity, text: "Real-time wellness metrics" },
                  { icon: Flame, text: "Meaningful achievements" }
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex items-center gap-4 text-white/80 font-medium"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    {item.text}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right Column: Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 w-full max-w-lg lg:max-w-none relative"
            >
              {/* Main Card */}
              <div className="relative rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl p-6 md:p-8 shadow-2xl overflow-hidden group">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h4 className="text-lg font-semibold text-white">Your Progress</h4>
                    <p className="text-sm text-white/50">Last 7 Days</p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold tracking-wide">
                    Level 4
                  </div>
                </div>

                {/* Animated Stats */}
                <div className="space-y-6">
                  {/* Stat 1 */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/80">Modules Completed</span>
                      <span className="font-bold text-white">12/15</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "80%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/80">Resilience Score</span>
                      <span className="font-bold text-white">850 pts</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "65%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-secondary to-accent"
                      />
                    </div>
                  </div>
                </div>

                {/* Mini Activity Feed */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium text-white text-sm">Achievement Unlocked!</h5>
                      <p className="text-xs text-white/50">Perfect Quiz Score: Anxiety 101</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Decoration Cards */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 lg:-right-12 -bottom-10 bg-zinc-900 border border-white/10 p-5 rounded-2xl shadow-xl flex items-center gap-4 z-20"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Current Streak</p>
                  <p className="text-xl font-bold text-white leading-none">5 Days</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 6: Evidence & Impact - The Numbers */}
      <section className="relative w-full py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
            >
              Measurable Growth. <br className="md:hidden" /> Real Strategies.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-foreground/60 max-w-2xl mx-auto"
            >
              Built to fit your life, designed to help you thrive.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-black/5">
            {/* Metric 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center pt-8 md:pt-0"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h4 className="text-5xl font-bold text-foreground tracking-tight mb-2">15-25<span className="text-2xl text-primary align-top ml-1">min</span></h4>
              <p className="text-lg font-medium text-foreground/80 mb-2">Bite-sized Modules</p>
              <p className="text-sm text-foreground/60 max-w-[250px]">Perfectly timed lessons that fit easily into your daily routine without overwhelming you.</p>
            </motion.div>

            {/* Metric 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center pt-8 md:pt-0"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                <RotateCcw className="w-8 h-8" />
              </div>
              <h4 className="text-5xl font-bold text-foreground tracking-tight mb-2">∞</h4 >
              <p className="text-lg font-medium text-foreground/80 mb-2">Quiz Retakes</p>
              <p className="text-sm text-foreground/60 max-w-[250px]">Learn at your own pace. There's no failure, only continuous improvement and understanding.</p>
            </motion.div>

            {/* Metric 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center pt-8 md:pt-0"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6">
                <Smile className="w-8 h-8" />
              </div>
              <h4 className="text-5xl font-bold text-foreground tracking-tight mb-2">8</h4>
              <p className="text-lg font-medium text-foreground/80 mb-2">Emoji Moods</p>
              <p className="text-sm text-foreground/60 max-w-[250px]">Track your emotional state effortlessly through an intuitive emoji-based recording system.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Mobile Ecosystem - Coping Tools */}
      <section className="relative w-full py-24 md:py-40 bg-zinc-50 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

            {/* Left Column: Visual Mockup of Mobile App */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 relative w-full flex justify-center lg:justify-start"
            >
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

              {/* Mock Mobile Device Structure - iPhone 16 Pro Style */}
              <div className="relative w-[320px] h-[650px] bg-zinc-900 rounded-[3.5rem] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-zinc-200/50 rotate-[-2deg] hover:rotate-0 transition-transform duration-500 ease-out z-10">
                <div className="w-full h-full bg-[#F4F9F8] rounded-[2.8rem] overflow-hidden flex flex-col relative">

                  {/* Dynamic Island / Status Bar Area */}
                  <div className="h-10 w-full flex justify-between items-center px-6 pt-3 z-20">
                    <span className="text-[12px] font-bold text-slate-800">9:41</span>
                    {/* Camera Sensors */}
                    <div className="flex gap-1.5 items-center mr-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700/80" />
                    </div>
                  </div>

                  {/* App Content Mockup - Journal & Breathing */}
                  <div className="flex-1 p-6 flex flex-col pt-6">
                    <h4 className="text-2xl font-bold tracking-tight text-slate-800 mb-8">Morning Check-in</h4>

                    {/* Breathing Widget Mockup - Dynamic Style */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#d6efe2] rounded-3xl p-5 mb-5 border border-[#aae0c6]/50 relative overflow-hidden group shadow-sm flex flex-col cursor-pointer"
                    >
                      <div className="flex items-start gap-4 relative z-10 mb-6">
                        <div className="w-12 h-12 rounded-full bg-[#bde8d3] flex items-center justify-center text-[#1E5D46] shrink-0">
                          <Activity className="w-6 h-6 stroke-[2.5]" />
                        </div>
                        <div className="pt-1">
                          <p className="font-bold text-slate-800 text-[15px] leading-tight mb-1">4-4-4 Breathing</p>
                          <p className="text-xs text-slate-600 font-medium">Reduce stress</p>
                        </div>
                      </div>
                      <div className="mt-auto">
                        <div className="w-full h-11 bg-white rounded-2xl flex items-center justify-center text-[11px] font-bold text-[#1E5D46] tracking-[0.1em] uppercase shadow-sm group-hover:bg-[#fcfdfd] transition-colors">
                          Start Cycle
                        </div>
                      </div>
                    </motion.div>

                    {/* Journal Widget Mockup - Dynamic Style */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex flex-col cursor-pointer"
                    >
                      <div className="flex items-start gap-4 relative z-10 mb-5">
                        <div className="w-12 h-12 rounded-full bg-[#e6f3fa] flex items-center justify-center text-[#2A7596] shrink-0">
                          <BookOpen className="w-6 h-6 stroke-[2]" />
                        </div>
                        <div className="pt-1">
                          <p className="font-bold text-slate-800 text-[15px] leading-tight mb-1">Private Journal</p>
                          <p className="text-xs text-slate-500 font-medium">How are you feeling?</p>
                        </div>
                      </div>
                      <div className="w-full space-y-2.5 mt-2">
                        <div className="h-2 w-full bg-slate-100 rounded-full" />
                        <div className="h-2 w-5/6 bg-slate-100 rounded-full" />
                        <div className="h-2 w-1/2 bg-slate-100 rounded-full" />
                      </div>
                    </motion.div>

                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-1 bg-zinc-300 rounded-full" />
                </div>
              </div>

              {/* Decorative background circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-secondary/20 rounded-full -z-10" />
            </motion.div>

            {/* Right Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 text-center lg:text-left pt-12 lg:pt-0"
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-6">
                Mobile Ecosystem
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-8">
                Your health advisor, <br />
                <span className="text-secondary italic">in your pocket.</span>
              </h3>
              <p className="text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed mb-10 mx-auto lg:mx-0">
                MindEdu Hub isn't just a website. It's designed to feel like a native app, giving you instant access to coping tools the moment you need them, wherever you are.
              </p>

              <div className="flex flex-col gap-6 max-w-md mx-auto lg:mx-0">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-1">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-lg font-bold text-foreground mb-1">Instant Relief</h5>
                    <p className="text-foreground/60 leading-relaxed">Launch the 4-4-4 breathing visualizer instantly when feeling overwhelmed.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-lg font-bold text-foreground mb-1">Private Journaling</h5>
                    <p className="text-foreground/60 leading-relaxed">Log your moods and thoughts on the go in a completely secure environment.</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Future sections will go here */}
      <div className="py-20 text-center text-foreground/40 font-bold uppercase tracking-widest text-xs">
        [Section 8: Security & Privacy pending...]
      </div>
    </main>
  );
}
