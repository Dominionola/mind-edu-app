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
      className={`fixed top-0 z-50 w-full flex justify-center transition-all duration-700 pt-6 px-6 sm:px-12`}
    >
      <div className={`
        flex items-center justify-between w-full max-w-7xl h-14 sm:h-16 px-6 sm:px-10 rounded-full transition-all duration-700
        ${scrolled
          ? 'bg-background/60 backdrop-blur-3xl border border-white/10 shadow-lg translate-y-[-10px]'
          : 'bg-black/40 backdrop-blur-xl border border-white/5'
        }
      `}>
        {/* Logo Area */}
        <Link href="/" className="flex items-center space-x-3 group outline-none">
          <div className="bg-primary/20 p-2 rounded-xl group-hover:scale-110 transition-transform duration-500">
            <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <span className={`text-xl font-bold tracking-tight transition-colors duration-500 ${scrolled ? 'text-foreground' : 'text-white'}`}>
            MindEdu Hub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {['Modules', 'Quizzes', 'Dashboard', 'Coping'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:scale-105 ${scrolled ? 'text-foreground/60 hover:text-foreground' : 'text-white/60 hover:text-white'
                }`}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <div className="flex items-center space-x-6">
              <div className={`px-4 py-1.5 rounded-full border text-xs font-semibold transition-all duration-500 ${scrolled ? 'bg-background/50 border-foreground/10 text-foreground' : 'bg-white/5 border-white/10 text-white'
                }`}>
                {user.email?.split('@')[0] || 'User'}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignOut}
                className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${scrolled ? 'text-foreground/60 hover:text-foreground' : 'text-white/60 hover:text-white'
                  }`}
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/auth/login" className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${scrolled ? 'text-foreground/80 hover:text-foreground' : 'text-white/80 hover:text-white'
                  }`}>
                  Log In
                </Link>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(var(--primary), 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg transition-all"
                onClick={() => router.push('/auth/signup')}
              >
                Join Today
              </motion.button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 transition-colors ${scrolled ? 'text-foreground/60' : 'text-white/60'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
