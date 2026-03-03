'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

/**
 * PremiumCardDemo
 * 
 * A showcase component implementing 21st.dev inspired patterns:
 * - Staggered entrance animations
 * - Glassmorphism effects
 * - Premium typography sizing
 * - OKLCH calming color palette
 */
export default function PremiumCardDemo() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1], // Out-Expo
            },
        },
    }

    return (
        <section className="py-24 md:py-40 px-6 bg-[oklch(0.98_0.008_220)]">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="max-w-7xl mx-auto"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-[oklch(0.25_0.02_250)]/60 mb-4 block">
                        Exclusive Innovation
                    </span>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] text-[oklch(0.25_0.02_250)]">
                        Experience the <span className="text-[oklch(0.55_0.15_220)]">Future</span> of Learning
                    </h1>
                </motion.div>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="group relative p-8 rounded-[2rem] border border-[oklch(0.25_0.02_250)]/10 bg-white/40 backdrop-blur-xl transition-all hover:shadow-2xl hover:shadow-[oklch(0.55_0.15_220)]/10"
                        >
                            <div className="mb-6 w-12 h-12 rounded-2xl bg-[oklch(0.55_0.15_220)]/10 flex items-center justify-center text-[oklch(0.55_0.15_220)]">
                                <Sparkles size={24} />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-[oklch(0.25_0.02_250)]">Precision Metrics</h3>
                            <p className="text-lg leading-relaxed text-[oklch(0.25_0.02_250)]/70 mb-8">
                                Harness high-fidelity data visualization and insights inspired by premium 21st.dev components.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-2 px-6 py-3 bg-[oklch(0.55_0.15_220)] text-white rounded-full font-bold shadow-md hover:bg-[oklch(0.55_0.15_220)]/90 transition-colors"
                            >
                                Learn More <ArrowRight size={18} />
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
