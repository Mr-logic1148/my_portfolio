'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function FloatingSocials() {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling DOWN → hide
        setVisible(false)
      } else {
        // scrolling UP → show
        setVisible(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed top-6 left-6 z-50 hidden md:flex gap-4"
        >
          <a
            href="https://www.linkedin.com/in/mehraj-gaud"
            target="_blank"
            rel="noopener noreferrer"
            className="social-glow"
          >
            <Linkedin size={20} />
          </a>

          <a
            href="https://github.com/Mr-logic1148"
            target="_blank"
            rel="noopener noreferrer"
            className="social-glow"
          >
            <Github size={20} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}