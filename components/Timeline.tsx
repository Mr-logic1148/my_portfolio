'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Briefcase, Building2, CalendarDays, Sparkles, TrendingUp } from 'lucide-react'
import { useRef } from 'react'

type ExperienceItem = {
  role: string
  company: string
  period: string
  description: string[]
  accent: string
}

const experience: ExperienceItem[] = [
  {
    role: 'Technology Support Placement',
    company: 'McDonald’s',
    period: 'June 2025 – September 2025',
    accent: 'from-amber-400/70 via-orange-500/60 to-rose-500/70',
    description: [
      'Supported enterprise-level systems and point-of-sale infrastructure across restaurant environments.',
      'Resolved technical incidents and provided hands-on IT support to minimise operational downtime.',
      'Gained exposure to large-scale IT operations, service desk workflows, and support processes.',
    ],
  },
  {
    role: 'Junior Software Developer',
    company: 'Fly Affinity',
    period: 'October 2024 – February 2025 (Fixed-term)',
    accent: 'from-indigo-400/70 via-violet-500/60 to-fuchsia-500/70',
    description: [
      'Through backend optimization (in PHP and Javascript) and using proven debugging techniques such as unit testing, continuous integration, and breakpoints on code blocks which enhanced code performance by 28%.',
      'Created new website features such as live flight tracker and dynamic price calculator to improve website aesthetics, conducted usability testing across non-technical staff, achieving 89% user satisfaction.',
      'Collaborated with senior engineers across 10+ code reviews, strengthening code standards and reducing errors across the codebase, whilst converting design files into actual websites. ',
    ],
  },
  {
    role: 'Web Developer (Intern)',
    company: 'Fly Affinity',
    period: 'May 2024 – July 2024',
    accent: 'from-cyan-400/70 via-indigo-500/60 to-violet-500/70',
    description: [
      'Boosted user engagement by 66% by designing and creating interactive web pages such as landing page, testimonial, services, and contact pages, using WordPress plugins and page builders.',
      'Built an interactive global map location feature by integrating third-party plugin (OpenUser Map) and APIs, improving website aesthetics, and cutting location-related complaints by 40%.',
      'Reduced page load times by 30% by conducting regular website performance audits such as comparing load time on different devices, plugin updates, and performance monitoring.',
    ],
  },
]

export default function Timeline() {
  const sectionRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 35%'],
  })

  const railHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const railGlow = useTransform(scrollYProgress, [0, 1], [0.35, 1])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative max-w-7xl mx-auto px-6 py-32"
    >
      {/* Ambient section glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute right-12 top-1/3 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute left-0 bottom-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-auto mb-20 max-w-3xl text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-indigo-300 backdrop-blur-md shadow-[0_0_25px_rgba(99,102,241,0.14)]">
          <Sparkles size={16} />
          Career Journey
        </div>

        <h2 className="mt-6 text-3xl font-semibold text-main md:text-5xl">
          Experience that shows impact,
          <span className="block pb-1 bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
            not just job titles
          </span>
        </h2>

        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
          A timeline of roles where I combined technical problem-solving, web
          development, support engineering, and measurable improvement.
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline rail */}
        <div className="absolute bottom-0 left-6 top-0 md:left-1/2 md:-translate-x-1/2">
          <div className="relative h-full w-[3px] overflow-hidden rounded-full">
            <div className="absolute inset-0 rounded-full bg-white/10" />

            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-cyan-400/15 via-indigo-500/20 to-fuchsia-500/15 blur-md" />

            <motion.div
              style={{ height: railHeight, opacity: railGlow }}
              className="absolute left-0 right-0 top-0 rounded-full bg-gradient-to-b from-cyan-400 via-indigo-500 to-fuchsia-500 shadow-[0_0_18px_rgba(99,102,241,0.55),0_0_34px_rgba(168,85,247,0.38)]"
            />

            <motion.div
              style={{ height: railHeight, opacity: railGlow }}
              className="absolute left-0 right-0 top-0 rounded-full bg-gradient-to-b from-cyan-400/70 via-indigo-500/80 to-fuchsia-500/70 blur-md"
            />
          </div>
        </div>

        <div className="space-y-14 md:space-y-20">
          {experience.map((item, index) => {
            const isRight = index % 2 === 1

            return (
              <motion.div
                key={`${item.role}-${item.company}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: index * 0.12 }}
                viewport={{ once: true, amount: 0.25 }}
                className="relative items-stretch md:grid md:grid-cols-2 md:gap-8"
              >
                {/* Timeline node */}
                <div className="absolute left-6 top-8 z-20 -translate-x-1/2 md:left-1/2">
                  <div className="relative flex h-5 w-5 items-center justify-center rounded-full border border-white/25 bg-[#0b0b18] shadow-[0_0_25px_rgba(139,92,246,0.45)]">
                    <div className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${item.accent}`} />
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.accent} opacity-70 blur-md`} />
                  </div>
                </div>

                <div
                  className={`pl-16 md:pl-0 ${
                    isRight ? 'md:col-start-2 md:pl-14' : 'md:pr-14'
                  }`}
                >
                  <ExperienceCard item={item} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({ item }: { item: ExperienceItem }) {
  const metricHighlights = item.description.filter((point) =>
    /\d+%|\d+\.\d+%/.test(point)
  )

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-7 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.22)]"
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`} />
      <div className="absolute -right-16 -top-20 h-40 w-40 rounded-full bg-violet-500/10 opacity-70 blur-3xl transition-opacity group-hover:opacity-100" />
      <div className="absolute -bottom-24 -left-12 h-40 w-40 rounded-full bg-indigo-500/10 opacity-60 blur-3xl transition-opacity group-hover:opacity-90" />

      <div className="relative z-10">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-indigo-200">
            <Briefcase size={14} />
            {item.role}
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-muted">
            <Building2 size={14} />
            {item.company}
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-muted">
            <CalendarDays size={14} />
            {item.period}
          </span>
        </div>

        <h3 className="text-2xl font-semibold leading-normal text-main">
          {item.role}
        </h3>

        <p className="mt-2 text-base font-medium text-indigo-300">
          {item.company}
        </p>

        {metricHighlights.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-3">
            {metricHighlights.slice(0, 2).map((point) => {
              const match = point.match(/\d+(\.\d+)?%/)
              const metric = match?.[0] ?? 'Impact'

              return (
                <div
                  key={`${item.role}-${metric}`}
                  className="inline-flex items-center gap-2 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 px-3 py-2 text-sm text-indigo-100 shadow-[0_0_20px_rgba(99,102,241,0.14)]"
                >
                  <TrendingUp size={14} />
                  <span className="font-semibold">{metric}</span>
                </div>
              )
            })}
          </div>
        )}

        <ul className="mt-6 space-y-3">
          {item.description.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 leading-relaxed text-muted"
            >
              <span
                className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-r ${item.accent}`}
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}