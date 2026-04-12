import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export function useCardTilt<T extends HTMLElement>(maxDeg = 8) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.set(el, { transformPerspective: 800, transformOrigin: 'center center' })

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(el, {
        rotationY: x * maxDeg * 2,
        rotationX: -y * maxDeg * 2,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const onLeave = () => {
      gsap.to(el, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.6)',
      })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [maxDeg])

  return ref
}
