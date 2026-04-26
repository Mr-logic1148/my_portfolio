    'use client'

    import { motion, useScroll, useSpring } from 'framer-motion'

    export default function ScrollProgress() {
    const { scrollYProgress } = useScroll()

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[9999] bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500"
        />
    )
    }