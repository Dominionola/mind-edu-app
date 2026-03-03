'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Brain, LogOut, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to add glassmorphism background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Out-Expo premium easing
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled
          ? 'bg-background/40 backdrop-blur-[24px] border-b border-foreground/5 shadow-sm'
          : 'bg-transparent border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6 md:px-12">
        {/* Logo Area */}
        <Link href="/" className="flex items-center space-x-3 group outline-none">
          <div className="bg-primary/10 p-2.5 rounded-xl group-hover:scale-105 transition-transform duration-300">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            MindEdu Hub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/modules"
            className="text-xs font-bold uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors"
          >
            Modules
          </Link>
          <Link
            href="/quizzes"
            className="text-xs font-bold uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors"
          >
            Quizzes
          </Link>
          {user && (
            <>
              <Link
                href="/dashboard"
                className="text-xs font-bold uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/coping"
                className="text-xs font-bold uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors"
              >
                Coping
              </Link>
            </>
          )}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full border border-foreground/10 bg-background/50 backdrop-blur-xl">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground/80">
                  {user.email || 'Guest User'}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSignOut}
                className="flex items-center text-sm font-bold text-foreground/60 hover:text-foreground transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </motion.button>
            </div>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link href="/auth/login" className="text-sm font-bold text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-full">
                  Log In
                </Link>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-primary text-white rounded-full font-bold shadow-md hover:shadow-lg transition-shadow"
                onClick={() => router.push('/auth/signup')}
              >
                Get Started
              </motion.button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground/60 hover:text-foreground transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu (Animated) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-foreground/5 bg-background/95 backdrop-blur-[24px] overflow-hidden"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col space-y-4">
              <Link
                href="/modules"
                className="text-lg font-bold tracking-tight text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Modules
              </Link>
              <Link
                href="/quizzes"
                className="text-lg font-bold tracking-tight text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Quizzes
              </Link>
              {user && (
                <>
                  <Link
                    href="/dashboard"
                    className="text-lg font-bold tracking-tight text-foreground/80 hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/coping"
                    className="text-lg font-bold tracking-tight text-foreground/80 hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Coping
                  </Link>
                </>
              )}
              <div className="pt-6 border-t border-foreground/10">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 px-4 py-3 rounded-2xl bg-muted">
                      <User className="h-5 w-5 text-primary" />
                      <span className="text-base font-medium text-foreground/80">
                        {user.email || 'Guest User'}
                      </span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex justify-center items-center px-6 py-3 border border-foreground/20 rounded-full font-bold text-foreground hover:bg-foreground/5 transition-colors"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link
                      href="/auth/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex justify-center items-center px-6 py-3 border border-foreground/20 rounded-full font-bold text-foreground hover:bg-foreground/5 transition-colors"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex justify-center items-center px-6 py-3 bg-primary text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
