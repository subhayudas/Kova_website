import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Hide native cursor
    document.documentElement.style.cursor = 'none'

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'none' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'none' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }

    const onEnter = () =>
      gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.3, ease: 'power2.out' })
    const onLeave = () =>
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' })

    const bindHoverEls = () => {
      const hoverEls = document.querySelectorAll('a, button, [data-cursor-hover]')
      hoverEls.forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
      return hoverEls
    }

    let hoverEls = bindHoverEls()

    // Re-bind after a short delay to catch dynamically rendered elements
    const timeout = setTimeout(() => {
      hoverEls.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      hoverEls = bindHoverEls()
    }, 500)

    window.addEventListener('mousemove', onMove)

    return () => {
      document.documentElement.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      clearTimeout(timeout)
      hoverEls.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Dot — instant tracking */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ width: 6, height: 6, borderRadius: '50%', background: 'white' }}
      />
      {/* Ring — lagging, blend mode */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.7)',
          mixBlendMode: 'difference',
        }}
      />
    </>
  )
}
