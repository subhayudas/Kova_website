import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export function useParallax<T extends HTMLElement>(speed = 0.2) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100 * -1,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [speed])

  return ref
}
