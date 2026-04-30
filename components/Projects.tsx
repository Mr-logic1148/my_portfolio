'use client'

import { motion } from 'framer-motion'
import {
  Activity,
  Building2,
  Database,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

type TechTag = {
  name: string
  className: string
}

type Project = {
  title: string
  subtitle: string
  description: string[]
  icon: React.ElementType
  tech: TechTag[]
  accent: string
}

const projects: Project[] = [
  {
    title: 'DataPopulus - Country Data Visualization Platform',
    subtitle: 'Software Engineering Project',
    accent: 'from-cyan-400/70 via-indigo-500/70 to-violet-500/70',
    description: [
      'Built a full-stack web application using Node.js, Pug, and MySQL to visualise country-level data including GNP, cities, and languages.',
      'Used Docker for containerisation and implemented CI/CD pipelines with CircleCI and unit testing with Jest.',
      'Collaborated in an Agile team of 5 using GitHub, delivering the project on time with strong code quality.',
    ],
    icon: Database,
    tech: [
      { name: 'JavaScript', className: 'tech-javascript' },
      { name: 'CSS', className: 'tech-css' },
      { name: 'MySQL', className: 'tech-mysql' },
      { name: 'HTML', className: 'tech-html' },
      { name: 'GitHub', className: 'tech-github' },
      { name: 'Docker', className: 'tech-docker' },
      { name: 'Jest', className: 'tech-jest' },
      { name: 'CircleCI', className: 'tech-circleci' },
    ],
  },
  {
    title: 'COVID-19 Symptom Checker',
    subtitle: 'Machine Learning / Data Science Project',
    accent: 'from-indigo-400/70 via-violet-500/70 to-fuchsia-500/70',
    description: [
      'Developed a Naïve Bayes model to predict COVID-19 severity, achieving 93.75% accuracy with a low error rate.',
      'Performed data preprocessing including normalization, encoding categorical variables, and feature selection.',
      'Validated the model with external test inputs, demonstrating strong real-world prediction reliability.',
    ],
    icon: Activity,
    tech: [{ name: 'Python', className: 'tech-python' }],
  },
  {
    title: 'Machine Learning-based IDS',
    subtitle: 'Final Year Project',
    accent: 'from-violet-400/70 via-indigo-500/70 to-cyan-400/70',
    description: [
      'Designed and trained a CNN model using CICIDS-2017 and KDD Cup99 datasets to detect network intrusions.',
      'Achieved 92% accuracy in identifying threats such as DoS Hulk and DDoS attacks.',
      'Evaluated performance using F1 score, ROC curve, and detailed analytical reporting.',
    ],
    icon: ShieldCheck,
    tech: [
      { name: 'Python', className: 'tech-python' },
      { name: 'Scapy', className: 'tech-scapy' },
      { name: 'Virtual Machines', className: 'tech-vm' },
    ],
  },
  {
    title: 'Accommodation Booking System',
    subtitle: 'Software Development Project',
    accent: 'from-amber-400/70 via-orange-500/70 to-rose-500/70',
    description: [
      'Built a structured accommodation booking system to manage reservations and streamline booking workflows.',
      'Designed the project using object-oriented programming principles to improve maintainability and application structure.',
      'Focused on creating a reliable and user-friendly booking flow for handling accommodation-related operations.',
    ],
    icon: Building2,
    tech: [{ name: 'C#', className: 'tech-csharp' }],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="relative max-w-7xl mx-auto px-6 py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute right-8 top-1/3 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute left-0 bottom-10 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-auto mb-20 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-indigo-300 backdrop-blur-md shadow-[0_0_25px_rgba(99,102,241,0.14)]">
          <Sparkles size={16} />
          Selected Work
        </div>

        <h2 className="mt-6 text-3xl font-semibold text-main md:text-5xl">
          Projects built with
          <span className="block pb-3 bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
            technical depth and real outcomes
          </span>
        </h2>

        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
          A selection of projects across full-stack development, machine learning,
          data analysis, and security-focused problem solving.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, rotateX: 2, rotateY: -2, scale: 1.01 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            viewport={{ once: true }}
            className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-[28px] border border-white/10 card-surface p-8 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.3)] transition-all duration-300"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent}`} />
            <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-indigo-500/10 opacity-60 blur-3xl transition-opacity group-hover:opacity-100" />
            <div className="absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-violet-500/10 opacity-60 blur-3xl transition-opacity group-hover:opacity-100" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_22px_rgba(99,102,241,0.14)]">
                <project.icon className="text-indigo-300" size={28} />
              </div>

              <h3 className="mb-1 text-xl font-medium text-main">
                {project.title}
              </h3>

              <p className="mb-5 text-sm text-indigo-300">
                {project.subtitle}
              </p>

              <ul className="space-y-3 text-sm leading-relaxed text-muted">
                {project.description.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-r ${project.accent}`}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-2">
                <p className="mb-3 text-sm font-medium text-main">
                  Languages & Tools
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tag, tagIndex) => (
                    <motion.span
                      key={`${project.title}-${tag.name}`}
                      initial={{ opacity: 0, scale: 0.8, y: 8 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.08 + tagIndex * 0.04,
                      }}
                      viewport={{ once: true }}
                      whileHover={{ y: -4, scale: 1.05 }}
                      className={`tech-badge ${tag.className}`}
                    >
                      {tag.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}