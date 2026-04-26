'use client'

import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import HeroHologram from './HeroHologram'
import ParallaxWrapper from './ParallaxWrapper'
import ScrollFloat from './ScrollFloat'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden perspective-[1200px]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(139,92,246,0.12),transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <ScrollFloat>
          <ParallaxWrapper>
            <motion.div
              initial={{ opacity: 0, y: 60, rotateX: -6 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="transform-style-preserve-3d"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">

                  {/* Greeting */}
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-3 text-lg font-medium uppercase tracking-widest text-indigo-400"
                  >
                    Hey, I&apos;m
                  </motion.p>

                  {/* Name */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.45 }}
                    className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-500 bg-clip-text text-transparent animate-glow"
                  >
                    Mehraj Gaud
                  </motion.h1>

                  {/* Typewriter role */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.65 }}
                    className="mt-3 text-2xl font-medium text-main min-h-[2rem]"
                  >
                    <TypeAnimation
                      sequence={[
                        800,
                        'Full-Stack Developer',
                        2200,
                        'Next.js Engineer',
                        2000,
                        'Machine Learning Engineer',
                        2000,
                        'Problem Solver',
                        2000,
                        'Open to Work 👋',
                        2400,
                      ]}
                      wrapper="span"
                      speed={55}
                      deletionSpeed={70}
                      repeat={Infinity}
                      cursor={true}
                      style={{ display: 'inline-block' }}
                    />
                  </motion.div>

                  {/* Bio */}
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.85 }}
                    className="mt-6 max-w-xl mx-auto md:mx-0 text-lg text-muted"
                  >
                    I design and build high-end, scalable web experiences with modern technologies.
                  </motion.p>

                  {/* CTA buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
                  >
                    <a
                      href="#projects"
                      className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium text-sm shadow-[0_0_28px_rgba(99,102,241,0.35)] hover:shadow-[0_0_38px_rgba(99,102,241,0.55)] hover:scale-105 transition-all duration-200"
                    >
                      View My Work
                      <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </a>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/5 text-main font-medium text-sm backdrop-blur-sm hover:border-indigo-400/50 hover:bg-white/10 hover:scale-105 transition-all duration-200"
                    >
                      Contact Me
                    </a>
                  </motion.div>

                  {/* Scroll hint */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.6 }}
                    className="mt-14 hidden md:flex items-center gap-3 text-sm text-muted"
                  >
                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
                    >
                      <div className="w-1 h-1.5 rounded-full bg-indigo-400" />
                    </motion.div>
                    <span className="tracking-widest uppercase text-xs">Scroll to explore</span>
                  </motion.div>

                </div>

                {/* Hologram image — unchanged */}
                <div className="flex justify-center md:justify-end md:translate-y-4">
                  <HeroHologram src="/me.png" alt="Mehraj hologram" />
                </div>
              </div>
            </motion.div>
          </ParallaxWrapper>
        </ScrollFloat>
      </div>
    </section>
  )
}