import { useEffect, useRef } from 'react'
import HlsVideo from './HlsVideo'
import { gsap } from '../lib/gsap'
import { useParallax } from '../hooks/useParallax'
import { useCounterAnimation } from '../hooks/useCounterAnimation'

const STATS_VIDEO = 'https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8'

const stats = [
  { value: '500+', label: 'Partner venues' },
  { value: '50K+', label: 'Nights booked' },
  { value: '4.9★', label: 'Average rating' },
  { value: '15+', label: 'Cities covered' },
]

function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useCounterAnimation(value)
  return (
    <div className="flex flex-col gap-2 text-center">
      <span
        ref={ref}
        className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-gold-gradient"
      >
        0
      </span>
      <span className="text-white/60 font-body font-light text-sm">{label}</span>
    </div>
  )
}

export default function Stats() {
  const videoRef = useParallax<HTMLDivElement>(0.25)
  const glassCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (glassCardRef.current) {
        gsap.fromTo(
          glassCardRef.current,
          { opacity: 0, scale: 0.95, y: 30 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 1.1, ease: 'power3.out',
            scrollTrigger: {
              trigger: glassCardRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative overflow-hidden py-32">
      {/* Desaturated HLS video background with parallax */}
      <div
        ref={videoRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <HlsVideo
          src={STATS_VIDEO}
          className="w-full h-full object-cover"
          style={{ filter: 'saturate(0)' }}
        />
      </div>

      {/* Top gradient fade */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-[1]"
        style={{ height: 200, background: 'linear-gradient(to bottom, black, transparent)' }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]"
        style={{ height: 200, background: 'linear-gradient(to top, black, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 max-w-5xl mx-auto w-full">
        <div ref={glassCardRef} className="liquid-glass border-gold-shimmer rounded-3xl p-12 md:p-16" style={{ opacity: 0 }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map(({ value, label }) => (
              <StatCounter key={label} value={value} label={label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
