import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import BlurText from './BlurText'
import { gsap } from '../lib/gsap'
import { useCardTilt } from '../hooks/useCardTilt'
import RippleButton from './ui/RippleButton'

export default function FeaturesChess() {
  const sectionRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const text1Ref = useRef<HTMLDivElement>(null)
  const card1Ref = useCardTilt<HTMLDivElement>(6)
  const row2Ref = useRef<HTMLDivElement>(null)
  const text2Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useCardTilt<HTMLDivElement>(6)

  // Section header reveal
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30, filter: 'blur(4px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            stagger: 0.15, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true },
          }
        )
      }

      // Row 1: text from left, card from right
      if (text1Ref.current && row1Ref.current) {
        gsap.fromTo(
          text1Ref.current,
          { opacity: 0, x: -60, filter: 'blur(4px)' },
          {
            opacity: 1, x: 0, filter: 'blur(0px)',
            duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: row1Ref.current, start: 'top 75%', once: true },
          }
        )
        gsap.fromTo(
          card1Ref.current,
          { opacity: 0, x: 60, scale: 0.95 },
          {
            opacity: 1, x: 0, scale: 1,
            duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: row1Ref.current, start: 'top 75%', once: true },
          }
        )
      }

      // Row 2: text from right, card from left
      if (text2Ref.current && row2Ref.current) {
        gsap.fromTo(
          text2Ref.current,
          { opacity: 0, x: 60, filter: 'blur(4px)' },
          {
            opacity: 1, x: 0, filter: 'blur(0px)',
            duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: row2Ref.current, start: 'top 75%', once: true },
          }
        )
        gsap.fromTo(
          card2Ref.current,
          { opacity: 0, x: -60, scale: 0.95 },
          {
            opacity: 1, x: 0, scale: 1,
            duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: row2Ref.current, start: 'top 75%', once: true },
          }
        )
      }

      // Card glow on hover
      const addGlow = (el: HTMLElement | null) => {
        if (!el) return
        el.addEventListener('mouseenter', () =>
          gsap.to(el, { boxShadow: '0 0 50px rgba(255,255,255,0.08), inset 0 1px 1px rgba(255,255,255,0.15)', duration: 0.4 })
        )
        el.addEventListener('mouseleave', () =>
          gsap.to(el, { boxShadow: '', duration: 0.4 })
        )
      }
      addGlow(card1Ref.current)
      addGlow(card2Ref.current)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto w-full">
      {/* Section header */}
      <div ref={headerRef} className="flex flex-col items-center text-center mb-20 gap-4">
        <div className="liquid-glass rounded-full px-3.5 py-1">
          <span className="text-white text-xs font-medium font-body">Features</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          <BlurText text="Everything your night needs." delay={100} />
        </h2>
      </div>

      {/* Row 1: text left, video right */}
      <div ref={row1Ref} className="flex flex-col md:flex-row items-center gap-12 mb-24">
        <div ref={text1Ref} className="flex-1 flex flex-col gap-6">
          <h3 className="text-3xl md:text-4xl font-heading italic text-white leading-tight">
            Exclusive venues.
            <br />
            Verified tables.
          </h3>
          <p className="text-white/60 font-body font-light text-sm md:text-base leading-relaxed max-w-md">
            Every listing is curated and confirmed with the venue. What you book is exactly what you get — no surprises, no disappointment.
          </p>
          <RippleButton
            href="#"
            className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-white text-sm font-body font-medium w-fit"
          >
            Browse Venues
            <ArrowUpRight size={16} />
          </RippleButton>
        </div>

        <div ref={card1Ref} className="flex-1 tilt-card card-glow">
          <div className="liquid-glass rounded-2xl overflow-hidden">
            <video
              src="/tablebooking.mp4"
              className="w-full h-auto object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>

      {/* Row 2: video left, text right */}
      <div ref={row2Ref} className="flex flex-col md:flex-row-reverse items-center gap-12">
        <div ref={text2Ref} className="flex-1 flex flex-col gap-6">
          <h3 className="text-3xl md:text-4xl font-heading italic text-white leading-tight">
            Instant confirmation.
            <br />
            Zero friction.
          </h3>
          <p className="text-white/60 font-body font-light text-sm md:text-base leading-relaxed max-w-md">
            Your booking is confirmed in seconds. Get a digital pass straight to your phone — just show up and enjoy.
          </p>
          <RippleButton
            href="#"
            className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-white text-sm font-body font-medium w-fit"
          >
            Book Now
            <ArrowUpRight size={16} />
          </RippleButton>
        </div>

        <div ref={card2Ref} className="flex-1 tilt-card card-glow">
          <div className="liquid-glass rounded-2xl overflow-hidden">
            <video
              src="/zerofriction.mp4"
              className="w-full h-auto object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  )
}
