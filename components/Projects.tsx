'use client'

import { AnimatePresence, motion, useSpring } from 'framer-motion'
import {
  Activity,
  Building2,
  ChevronLeft,
  ChevronRight,
  Database,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

/* ═══════════════════════════════════════════════════════════
   SOUND  (unchanged — perfect as-is)
═══════════════════════════════════════════════════════════ */
function playClickSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const now = ctx.currentTime
    const voice = (freq: number, type: OscillatorType, gain: number, startMs: number, decayMs: number) => {
      const osc = ctx.createOscillator()
      const gn  = ctx.createGain()
      osc.connect(gn); gn.connect(ctx.destination)
      osc.type = type; osc.frequency.value = freq
      const s = now + startMs / 1000; const d = decayMs / 1000
      gn.gain.setValueAtTime(0, s)
      gn.gain.linearRampToValueAtTime(gain, s + 0.008)
      gn.gain.exponentialRampToValueAtTime(0.0001, s + d)
      osc.start(s); osc.stop(s + d + 0.01)
    }
    voice(1400, 'sine',     0.22, 40, 120)
    voice(700,  'sine',     0.10, 40,  90)
    voice(2400, 'triangle', 0.06, 38,  55)
    voice(15000,'sine',     0.03, 42,  80)
    voice(16500,'sine',     0.02, 48,  70)
    voice(60,   'sine',     0.08, 40, 100)
  } catch { /* noop */ }
}

/* ═══════════════════════════════════════════════════════════
   TYPES & DATA
═══════════════════════════════════════════════════════════ */
type TechTag = { name: string; className: string }
type GlowPalette = {
  /** The rich saturated accent — used for the border shimmer line */
  accent:  string
  /** Softer version for the halo glow */
  halo:    string
  /** Ember/spark colour */
  ember:   string
  /** Deep tinted shadow under the card */
  shadow:  string
}
type Project = {
  title: string; subtitle: string; description: string[]
  icon: React.ElementType; tech: TechTag[]
  accent: string; glow: GlowPalette
}

const projects: Project[] = [
  {
    title:    'DataPopulus — Country Data Visualisation',
    subtitle: 'Software Engineering Project',
    accent:   'from-cyan-400/70 via-indigo-500/70 to-violet-500/70',
    glow: {
      accent: '#38bdf8',   // sky-400  — cool electric blue
      halo:   '#0ea5e9',   // sky-500
      ember:  '#7dd3fc',   // sky-300
      shadow: '#0c4a6e',   // sky-950
    },
    description: [
      'Built a full-stack web application using Node.js, Pug, and MySQL to visualise country-level data including GNP, cities, and languages.',
      'Used Docker for containerisation and implemented CI/CD pipelines with CircleCI and unit testing with Jest.',
      'Collaborated in an Agile team of 5 using GitHub, delivering the project on time with strong code quality.',
    ],
    icon: Database,
    tech: [
      { name: 'JavaScript', className: 'tech-javascript' },
      { name: 'CSS',        className: 'tech-css'        },
      { name: 'MySQL',      className: 'tech-mysql'      },
      { name: 'HTML',       className: 'tech-html'       },
      { name: 'GitHub',     className: 'tech-github'     },
      { name: 'Docker',     className: 'tech-docker'     },
      { name: 'Jest',       className: 'tech-jest'       },
      { name: 'CircleCI',   className: 'tech-circleci'   },
    ],
  },
  {
    title:    'COVID-19 Symptom Checker',
    subtitle: 'Machine Learning / Data Science Project',
    accent:   'from-indigo-400/70 via-violet-500/70 to-fuchsia-500/70',
    glow: {
      accent: '#c084fc',   // purple-400
      halo:   '#a855f7',   // purple-500
      ember:  '#e9d5ff',   // purple-200
      shadow: '#3b0764',   // purple-950
    },
    description: [
      'Developed a Naïve Bayes model to predict COVID-19 severity, achieving 93.75% accuracy with a low error rate.',
      'Performed data preprocessing including normalisation, encoding categorical variables, and feature selection.',
      'Validated the model with external test inputs, demonstrating strong real-world prediction reliability.',
    ],
    icon: Activity,
    tech: [{ name: 'Python', className: 'tech-python' }],
  },
  {
    title:    'Machine Learning-based IDS',
    subtitle: 'Final Year Project',
    accent:   'from-rose-400/70 via-red-500/70 to-orange-400/70',
    glow: {
      accent: '#f87171',   // red-400
      halo:   '#ef4444',   // red-500
      ember:  '#fca5a5',   // red-300
      shadow: '#450a0a',   // red-950
    },
    description: [
      'Designed and trained a CNN model using CICIDS-2017 and KDD Cup99 datasets to detect network intrusions.',
      'Achieved 92% accuracy in identifying threats such as DoS Hulk and DDoS attacks.',
      'Evaluated performance using F1 score, ROC curve, and detailed analytical reporting.',
    ],
    icon: ShieldCheck,
    tech: [
      { name: 'Python',           className: 'tech-python' },
      { name: 'Scapy',            className: 'tech-scapy'  },
      { name: 'Virtual Machines', className: 'tech-vm'     },
    ],
  },
  {
    title:    'Accommodation Booking System',
    subtitle: 'Software Development Project',
    accent:   'from-amber-400/70 via-orange-500/70 to-rose-500/70',
    glow: {
      accent: '#fbbf24',   // amber-400
      halo:   '#f59e0b',   // amber-500
      ember:  '#fde68a',   // amber-200
      shadow: '#451a03',   // amber-950
    },
    description: [
      'Built a structured accommodation booking system to manage reservations and streamline booking workflows.',
      'Designed the project using object-oriented programming principles to improve maintainability and application structure.',
      'Focused on creating a reliable and user-friendly booking flow for handling accommodation-related operations.',
    ],
    icon: Building2,
    tech: [{ name: 'C#', className: 'tech-csharp' }],
  },
]

/* ═══════════════════════════════════════════════════════════
   SLIDE VARIANTS
═══════════════════════════════════════════════════════════ */
const slideVariants = {
  enter:  (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0, scale: 0.95 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit:   (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0, scale: 0.95 }),
}

/* ═══════════════════════════════════════════════════════════
   EMBER PARTICLE
   Tiny glowing dot that drifts upward and fades.
   Inspired by the 156 spark regions in the reference image —
   each one is small, isolated, barely there.
═══════════════════════════════════════════════════════════ */
function Ember({ glow, seed }: { glow: GlowPalette; seed: number }) {
  const leftPct = 8  + (seed * 41) % 84
  const size    = 1.5 + (seed % 2) * 1
  const dur     = 2.2 + (seed % 6) * 0.5
  const delay   = (seed * 0.31) % 3.0
  const driftX  = ((seed % 7) - 3) * 14

  return (
    <motion.div
      style={{
        position:      'absolute',
        bottom:        '0',
        left:          `${leftPct}%`,
        width:         `${size}px`,
        height:        `${size}px`,
        borderRadius:  '50%',
        background:    glow.ember,
        boxShadow:     `0 0 ${size * 3}px ${glow.accent}`,
        pointerEvents: 'none',
        zIndex:        30,
      }}
      animate={{
        y:       [0, -(50 + (seed % 35))],
        x:       [0, driftX],
        opacity: [0, 0.85, 0.5, 0],
        scale:   [0.8, 1, 0.6, 0],
      }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  )
}

/* ═══════════════════════════════════════════════════════════
   SHIMMER BORDER
   A travelling bright spot that slowly orbits the card border.
   Inspired by the concentrated glow seen on the card's left
   edge in the reference image — not a full border glow,
   just one hot point of light moving around.
═══════════════════════════════════════════════════════════ */
function ShimmerBorder({ glow }: { glow: GlowPalette }) {
  return (
    <>
      {/* The base border — thin, nearly invisible, same colour as accent */}
      <motion.div
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position:      'absolute',
          inset:         0,
          borderRadius:  '32px',
          border:        `1px solid ${glow.accent}44`,
          pointerEvents: 'none',
          zIndex:        15,
        }}
      />

      {/* Travelling hot-spot — the premium detail */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{
          position:      'absolute',
          inset:         '-1px',
          borderRadius:  '32px',
          pointerEvents: 'none',
          zIndex:        16,
        }}
      >
        {/* The glowing dot riding along the top edge */}
        <div
          style={{
            position:     'absolute',
            top:          '-2px',
            left:         '40%',
            width:        '80px',
            height:       '4px',
            borderRadius: '50%',
            background:   `radial-gradient(ellipse, ${glow.accent}ee 0%, ${glow.accent}44 50%, transparent 100%)`,
            filter:       'blur(2px)',
          }}
        />
      </motion.div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   CARD GLOW EFFECT
   Three-layer approach, all very subtle:
   1. Deep coloured shadow beneath the card (depth)
   2. Thin breathing border + travelling shimmer spot
   3. A handful of floating embers rising from the bottom
═══════════════════════════════════════════════════════════ */
function CardGlow({ glow }: { glow: GlowPalette }) {
  return (
    <>
      {/* Layer 1 — deep coloured drop shadow below the card.
          Barely visible, just adds coloured depth like the dark
          bg in the reference image glows faintly near the card */}
      <motion.div
        animate={{ opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position:      'absolute',
          inset:         '10px -4px -16px',
          borderRadius:  '36px',
          background:    'transparent',
          boxShadow:     `0 16px 48px 0px ${glow.shadow}cc, 0 4px 20px 0px ${glow.halo}22`,
          pointerEvents: 'none',
          zIndex:        0,
          filter:        'blur(4px)',
        }}
      />

      {/* Layer 2 — the shimmer border system */}
      <ShimmerBorder glow={glow} />

      {/* Layer 3 — embers: only 6, subtle, occasional */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <Ember key={i} glow={glow} seed={i * 13 + 7} />
      ))}
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   MOUSE-TRACKED INNER GLOW
   Soft radial gradient that follows the cursor — like a torch
   shining on frosted glass. pointer-events: none throughout
   so underlying badges and content stay fully interactive.
═══════════════════════════════════════════════════════════ */
function MouseGlow({ glow, mouseX, mouseY, visible }: {
  glow: GlowPalette
  mouseX: number   // 0–1 fraction of card width
  mouseY: number   // 0–1 fraction of card height
  visible: boolean
}) {
  const opacity = useSpring(visible ? 1 : 0, { stiffness: 80, damping: 18 })

  return (
    <motion.div
      style={{
        position:      'absolute',
        inset:         0,
        opacity,
        background:    `radial-gradient(
          600px circle at ${mouseX * 100}% ${mouseY * 100}%,
          ${glow.accent}12 0%,
          transparent 60%
        )`,
        pointerEvents: 'none',
        zIndex:        5,
        borderRadius:  '32px',
      }}
    />
  )
}

/* ═══════════════════════════════════════════════════════════
   ARROW BUTTON
═══════════════════════════════════════════════════════════ */
function ArrowButton({ direction, onClick, glow, label }: {
  direction: 'left' | 'right'; onClick: () => void
  glow: GlowPalette; label: string
}) {
  const [active, setActive] = useState(false)
  return (
    <motion.button
      type="button" aria-label={label} onClick={onClick}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
      className="relative flex h-14 w-14 items-center justify-center rounded-2xl border bg-white/5 backdrop-blur-md transition-all duration-200 focus:outline-none focus-visible:ring-2"
      style={{
        borderColor: `${glow.accent}44`,
        boxShadow:   active
          ? `0 0 22px ${glow.accent}66, inset 0 0 12px ${glow.accent}18`
          : `0 0  8px ${glow.accent}22`,
      }}
    >
      <motion.span
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
        style={{ background: `radial-gradient(circle, ${glow.accent}18 0%, transparent 70%)` }}
      />
      {direction === 'left'
        ? <ChevronLeft  size={22} className="text-main relative z-10" />
        : <ChevronRight size={22} className="text-main relative z-10" />}
    </motion.button>
  )
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
export default function Projects() {
  const [[index, direction], setSlide] = useState([0, 0])
  const project    = projects[index]
  const autoRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isHovered  = useRef(false)
  const cardRef    = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos]   = useState({ x: 0.5, y: 0.5 })
  const [cardHovered, setCardHovered] = useState(false)

  // Silent slide — used by auto-advance (no sound)
  const advance = useCallback((dir: number) => {
    setSlide(([prev]) => [(prev + dir + projects.length) % projects.length, dir])
  }, [])

  // Arrow/keyboard slide — plays sound
  const go = useCallback((dir: number) => {
    playClickSound()
    setSlide(([prev]) => [(prev + dir + projects.length) % projects.length, dir])
  }, [])

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearTimeout(autoRef.current)
    const schedule = () => {
      autoRef.current = setTimeout(() => {
        if (!isHovered.current) {
          advance(1)
        } else {
          // Hovered — keep rescheduling silently until not hovered
          schedule()
        }
      }, 7000)
    }
    schedule()
  }, [advance])

  useEffect(() => {
    resetAuto()
    return () => { if (autoRef.current) clearTimeout(autoRef.current) }
  }, [index, resetAuto])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { go(1);  resetAuto() }
      if (e.key === 'ArrowLeft')  { go(-1); resetAuto() }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [go, resetAuto])

  return (
    <section id="projects" className="relative max-w-7xl mx-auto px-6 py-32">

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} viewport={{ once: true }}
        className="mx-auto mb-16 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-indigo-300 backdrop-blur-md shadow-[0_0_25px_rgba(99,102,241,0.14)]">
          <Sparkles size={16} />
          Selected Work
        </div>
        <h2 className="mt-6 pb-1 text-3xl font-semibold text-main md:text-5xl">
          Projects built with
          <span className="block pb-1 bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
            technical depth and real outcomes
          </span>
        </h2>
        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
          A selection of projects across full-stack development, machine learning,
          data analysis, and security-focused problem solving.
        </p>
      </motion.div>

      {/* Stage */}
      <div className="relative" style={{ perspective: '1200px' }}>
        <div
          className="relative"
          style={{ minHeight: '460px' }}
          onMouseEnter={() => { isHovered.current = true }}
          onMouseLeave={() => { isHovered.current = false; resetAuto() }}
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              transition={{
                x:       { type: 'spring', stiffness: 300, damping: 32 },
                opacity: { duration: 0.22 },
                scale:   { duration: 0.3 },
              }}
              style={{ position: 'relative' }}
            >
              {/* Glow system — outside overflow:hidden so embers can escape.
                  pointer-events: none ensures hover on badges/content works. */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`glow-${index}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20 }}
                >
                  <CardGlow glow={project.glow} />
                </motion.div>
              </AnimatePresence>

              {/* Card */}
              <div
                ref={cardRef}
                onMouseMove={(e) => {
                  const rect = cardRef.current?.getBoundingClientRect()
                  if (!rect) return
                  setMousePos({
                    x: (e.clientX - rect.left) / rect.width,
                    y: (e.clientY - rect.top)  / rect.height,
                  })
                }}
                onMouseEnter={() => setCardHovered(true)}
                onMouseLeave={() => setCardHovered(false)}
                className="relative flex flex-col md:flex-row card-surface border rounded-[32px] overflow-hidden backdrop-blur-xl"
                style={{
                  minHeight:   '460px',
                  borderColor: `${project.glow.accent}28`,
                  boxShadow:   `0 24px 80px rgba(0,0,0,0.5)`,
                }}
              >
                {/* Mouse-tracked inner highlight — pointer-events:none, never blocks content */}
                <MouseGlow glow={project.glow} mouseX={mousePos.x} mouseY={mousePos.y} visible={cardHovered} />

                {/* Coloured accent stripe */}
                <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${project.accent}`} />
                <div className={`absolute inset-x-0 top-0 h-[2px] md:hidden bg-gradient-to-r ${project.accent}`} />

                {/* Left meta */}
                <div className="flex flex-col justify-between gap-8 p-8 md:p-10 md:w-64 lg:w-72 shrink-0 border-b border-white/5 md:border-b-0 md:border-r md:border-white/5">
                  <div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.12, duration: 0.35 }}
                      className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                      style={{ boxShadow: `0 0 20px ${project.glow.accent}33` }}
                    >
                      <project.icon
                        size={32}
                        style={{ color: project.glow.accent }}
                      />
                    </motion.div>

                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-indigo-400 mb-2">
                      Project {index + 1} of {projects.length}
                    </p>
                    <p className="text-sm font-medium leading-snug text-indigo-300">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Dots */}
                  <div className="flex items-center gap-2">
                    {projects.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSlide([i, i > index ? 1 : -1])
                          resetAuto()
                        }}
                        aria-label={`Go to project ${i + 1}`}
                        className="rounded-full transition-all duration-300 focus:outline-none"
                        style={{
                          width:      i === index ? '28px' : '8px',
                          height:     '8px',
                          background: i === index ? p.glow.accent : 'rgba(255,255,255,0.15)',
                          boxShadow:  i === index ? `0 0 8px ${p.glow.accent}88` : 'none',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Right content */}
                <div className="flex flex-col flex-1 p-8 md:p-10 lg:p-12">
                  <motion.h3
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.38 }}
                    className="text-2xl md:text-3xl font-semibold text-main leading-normal mb-6"
                  >
                    {project.title}
                  </motion.h3>

                  <ul className="space-y-4 flex-1">
                    {project.description.map((point, i) => (
                      <motion.li
                        key={point}
                        initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.14 + i * 0.08, duration: 0.38 }}
                        className="flex items-start gap-3 text-sm md:text-base leading-relaxed text-muted"
                      >
                        <span
                          className="mt-2 h-2 w-2 shrink-0 rounded-full"
                          style={{ background: project.glow.accent, boxShadow: `0 0 6px ${project.glow.accent}88` }}
                        />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.34, duration: 0.38 }}
                    className="mt-8 pt-6 border-t border-white/10"
                  >
                    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
                      Languages & Tools
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tag, i) => (
                        <motion.span
                          key={tag.name}
                          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.36 + i * 0.04, duration: 0.28 }}
                          whileHover={{ y: -3, scale: 1.06 }}
                          className={`tech-badge ${tag.className}`}
                        >
                          {tag.name}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <ArrowButton direction="left"  glow={project.glow} label="Previous project" onClick={() => { go(-1); resetAuto() }} />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted select-none px-2">Navigate</span>
          <ArrowButton direction="right" glow={project.glow} label="Next project"     onClick={() => { go(1);  resetAuto() }} />
        </div>
      </div>
    </section>
  )
}