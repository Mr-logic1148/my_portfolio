    'use client'
    import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

    interface Props {
    children: React.ReactNode
    className?: string
    delay?: number
    direction?: 'up' | 'left' | 'right' | 'none'
    }

    export default function AnimateOnScroll({
    children,
    className,
    delay = 0,
    direction = 'up',
    }: Props) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    const directions = {
        up:    { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
        left:  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
        right: { hidden: { opacity: 0, x: 40 },  visible: { opacity: 1, x: 0 } },
        none:  { hidden: { opacity: 0 },          visible: { opacity: 1 } },
    }

    return (
        <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={directions[direction]}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        >
        {children}
        </motion.div>
    )
    }