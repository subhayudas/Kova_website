import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: (self) => {
          gsap.set(bar, { scaleX: self.progress })
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-[2px]"
      style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.3))',
      }}
    />
  )
}
