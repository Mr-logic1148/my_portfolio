'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'Projects',   href: '#projects'   },
  { label: 'Skills',     href: '#skills'      },
  { label: 'Experience', href: '#experience'  },
  { label: 'Contact',    href: '#contact'     },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Close menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl"
    >
      {/* ── Desktop pill ── */}
      <div className="glass nav-panel-glow hidden md:flex items-center gap-4 rounded-2xl px-5 py-3">
        <div className="flex items-center gap-5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted transition hover:text-main"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="ml-2 h-6 w-px bg-white/10" />
        <ThemeToggle />
        <a
          href="/cv.pdf"
          className="nav-glow rounded-xl px-4 py-2 text-sm font-medium text-main transition hover:scale-105"
        >
          Download CV
        </a>
      </div>

      {/* ── Mobile bar ── */}
      <div className="glass nav-panel-glow flex md:hidden items-center justify-between rounded-2xl px-4 py-3">
        <span className="text-sm font-semibold text-main tracking-wide">Mehraj Gaud</span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-main"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{   opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="glass mt-2 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col py-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-5 py-3.5 text-sm font-medium text-muted hover:text-main hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="mx-5 my-2 h-px bg-white/8" />
              <a
                href="/cv.pdf"
                onClick={() => setOpen(false)}
                className="mx-3 mb-1 rounded-xl px-4 py-3 text-sm font-medium text-main text-center nav-glow"
              >
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}