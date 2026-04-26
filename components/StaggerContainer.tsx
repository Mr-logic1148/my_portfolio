    'use client'
    import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

    interface Props {
    children: React.ReactNode
    className?: string
    staggerDelay?: number
    }

    export default function StaggerContainer({
    children,
    className,
    staggerDelay = 0.1,
    }: Props) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
            hidden: {},
            visible: { transition: { staggerChildren: staggerDelay } },
        }}
        >
        {children}
        </motion.div>
    )
    }

    export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
        className={className}
        variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
        }}
        >
        {children}
        </motion.div>
    )
    }