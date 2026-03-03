import Link from 'next/link';
import Image from 'next/image';
import * as motion from 'framer-motion/client';

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
        ease: [0.16, 1, 0.3, 1], // Out-Expo
      }
    },
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center">
      {/* SECTION 2: The Giant Hero */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Hero (2).png"
            alt="MindEdu Hero Background"
            fill
            priority
            className="object-cover object-center"
          />
          {/* subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 px-6 mx-auto max-w-7xl py-24 md:py-40 flex flex-col items-center text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-4xl flex flex-col items-center"
          >
            {/* Tagline / Label */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="px-4 py-1.5 rounded-full border border-foreground/10 bg-background/50 backdrop-blur-xl text-xs font-bold uppercase tracking-widest text-foreground/80">
                Mental Health Reimagined
              </span>
            </motion.div>

            {/* Giant Hero Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] text-foreground mb-8"
            >
              Unlock Your Resilience:{' '}
              <br className="hidden md:block" />
              <span className="text-primary">The Future of Youth Wellness.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl leading-relaxed text-foreground/80 max-w-2xl mb-12"
            >
              Evidence-based learning, interactive tools, and a safe space to grow—all in one place. Discover your personalized health intelligence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/auth/signup"
                className="group relative flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full font-bold shadow-lg overflow-hidden transition-all hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Get Started Today</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </Link>

              <Link
                href="/modules"
                className="flex items-center justify-center px-8 py-4 bg-background/50 backdrop-blur-xl border border-foreground/10 text-foreground rounded-full font-bold transition-all hover:bg-background/80 hover:scale-105 active:scale-95"
              >
                Explore Modules
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Future sections will go here */}
      <div className="py-20 text-center text-foreground/40 font-bold uppercase tracking-widest text-xs">
        [Section 3: Core Insight Visual pending...]
      </div>
    </main>
  );
}
