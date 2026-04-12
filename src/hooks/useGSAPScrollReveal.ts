import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

interface RevealOptions {
  stagger?: number
  y?: number
  duration?: number
  start?: string
}

export function useGSAPScrollReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-reveal]'),
        { opacity: 0, y: options.y ?? 40, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: options.stagger ?? 0.12,
          duration: options.duration ?? 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: options.start ?? 'top 82%',
            once: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [options.y, options.stagger, options.duration, options.start])

  return containerRef
}
