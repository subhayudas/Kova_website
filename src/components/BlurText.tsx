import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number // ms per word
}

export default function BlurText({ text, className = '', delay = 100 }: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  const words = text.split(' ')

  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={
            inView
              ? { filter: 'blur(0px)', opacity: 1, y: 0 }
              : { filter: 'blur(10px)', opacity: 0, y: 50 }
          }
          transition={{
            delay: (i * delay) / 1000,
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
