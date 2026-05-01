'use client'

import { motion } from 'framer-motion'
import { BarChart3, Brain, Code2, Layers, Sparkles, Wrench } from 'lucide-react'

type SkillTag = {
  name: string
  className: string
}

type SkillCategory = {
  title: string
  icon: React.ElementType
  skills: SkillTag[]
  accent: string
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Machine Learning & Data Science',
    icon: Brain,
    accent: 'from-cyan-400/70 via-indigo-500/70 to-violet-500/70',
    skills: [
      { name: 'TensorFlow', className: 'skill-tensorflow' },
      { name: 'Scikit-learn', className: 'skill-scikit' },
      { name: 'Pandas', className: 'skill-pandas' },
      { name: 'NumPy', className: 'skill-numpy' },
      { name: 'Model Deployment', className: 'skill-deployment' },
      { name: 'Hyperparameter Tuning', className: 'skill-tuning' },
    ],
  },
  {
    title: 'Data Visualization',
    icon: BarChart3,
    accent: 'from-indigo-400/70 via-violet-500/70 to-fuchsia-500/70',
    skills: [
      { name: 'Tableau', className: 'skill-tableau' },
      { name: 'Power BI', className: 'skill-powerbi' },
      { name: 'Matplotlib', className: 'skill-matplotlib' },
      { name: 'Seaborn', className: 'skill-seaborn' },
    ],
  },
  {
    title: 'Programming Languages',
    icon: Code2,
    accent: 'from-violet-400/70 via-indigo-500/70 to-cyan-400/70',
    skills: [
      { name: 'Python', className: 'skill-python' },
      { name: 'SQL', className: 'skill-sql' },
      { name: 'R', className: 'skill-r' },
      { name: 'Java', className: 'skill-java' },
      { name: 'Node.js', className: 'skill-node' },
      { name: 'JavaScript', className: 'skill-javascript' },
    ],
  },
  {
    title: 'Testing & DevOps',
    icon: Wrench,
    accent: 'from-emerald-400/70 via-cyan-500/70 to-indigo-500/70',
    skills: [
      { name: 'Jest', className: 'skill-jest' },
      { name: 'CircleCI', className: 'skill-circleci' },
      { name: 'Nodemon', className: 'skill-nodemon' },
      { name: 'Integration Testing', className: 'skill-testing' },
      { name: 'Unit Testing', className: 'skill-testing' },
    ],
  },
  {
    title: 'Software Engineering Practices',
    icon: Layers,
    accent: 'from-amber-400/70 via-orange-500/70 to-rose-500/70',
    skills: [
      { name: 'Data Preprocessing', className: 'skill-preprocessing' },
      { name: 'SDLC', className: 'skill-sdlc' },
      { name: 'Agile Methodology', className: 'skill-agile' },
      { name: 'Version Control (GitHub)', className: 'skill-git' },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute right-10 top-1/3 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute left-0 bottom-16 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-auto mb-12 md:mb-20 max-w-3xl text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-indigo-300 backdrop-blur-md shadow-[0_0_25px_rgba(99,102,241,0.14)]">
          <Sparkles size={16} />
          Capability Stack
        </div>

        <h2 className="mt-6 text-3xl font-semibold text-main md:text-5xl">
          Skills that balance
          <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
            engineering, data, and delivery
          </span>
        </h2>

        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
          A focused mix of software engineering, machine learning, testing, and
          data tooling built through academic projects and hands-on technical work.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 card-surface p-5 sm:p-8 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.28)] transition-all duration-300"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${category.accent}`} />
            <div className="absolute -right-16 -top-20 h-40 w-40 rounded-full bg-violet-500/10 opacity-70 blur-3xl transition-opacity group-hover:opacity-100" />
            <div className="absolute -bottom-24 -left-12 h-40 w-40 rounded-full bg-indigo-500/10 opacity-60 blur-3xl transition-opacity group-hover:opacity-90" />

            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_20px_rgba(99,102,241,0.12)]">
                  <category.icon className="text-indigo-300" size={24} />
                </div>

                <h3 className="text-xl font-medium leading-snug text-main">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={`${category.title}-${skill.name}`}
                    initial={{ opacity: 0, scale: 0.85, y: 8 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.05 + skillIndex * 0.03,
                    }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, scale: 1.05 }}
                    className={`skill-badge ${skill.className}`}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}