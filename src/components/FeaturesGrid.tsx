import { useEffect, useRef } from 'react'
import { Zap, Sparkles, MapPin, Shield } from 'lucide-react'
import BlurText from './BlurText'
import { gsap } from '../lib/gsap'
import { useGSAPScrollReveal } from '../hooks/useGSAPScrollReveal'

const features = [
  {
    icon: Zap,
    title: 'Instant Booking',
    body: 'Reserve your table in under 60 seconds. No phone calls, no back-and-forth — just confirmed.',
  },
  {
    icon: Sparkles,
    title: 'VIP Access',
    body: 'Unlock exclusive areas, bottle service, and premium sections not available anywhere else.',
  },
  {
    icon: MapPin,
    title: '15+ Cities',
    body: "From London to Ibiza, KOVA covers the world's best nightlife destinations.",
  },
  {
    icon: Shield,
    title: 'Secure & Guaranteed',
    body: 'Every booking is protected. Full refund policy if plans change. Your night is safe with us.',
  },
]

export default function FeaturesGrid() {
  const gridRef = useGSAPScrollReveal<HTMLDivElement>({ stagger: 0.1, y: 40 })
  const headerRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<HTMLDivElement[]>([])
  const cardRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 20, filter: 'blur(4px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            stagger: 0.15, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true },
          }
        )
      }

      // Icon glow + scale on card hover
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const icon = iconRefs.current[i]

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            boxShadow: '0 0 40px rgba(255,255,255,0.06), inset 0 1px 1px rgba(255,255,255,0.12)',
            duration: 0.4,
          })
          if (icon) {
            gsap.to(icon, {
              scale: 1.1,
              boxShadow: '0 0 20px rgba(255,255,255,0.2)',
              duration: 0.3,
            })
          }
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, { boxShadow: '', duration: 0.4 })
          if (icon) {
            gsap.to(icon, { scale: 1, boxShadow: '', duration: 0.4 })
          }
        })

        // 3D tilt per card
        gsap.set(card, { transformPerspective: 800, transformOrigin: 'center center' })
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect()
          const x = (e.clientX - rect.left) / rect.width - 0.5
          const y = (e.clientY - rect.top) / rect.height - 0.5
          gsap.to(card, { rotationY: x * 10, rotationX: -y * 10, duration: 0.4, ease: 'power2.out' })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'elastic.out(1, 0.6)' })
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto w-full">
      {/* Section header */}
      <div ref={headerRef} className="flex flex-col items-center text-center mb-16 gap-4">
        <div className="liquid-glass rounded-full px-3.5 py-1">
          <span className="text-white text-xs font-medium font-body">Why KOVA</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          <BlurText text="The difference is everything." delay={100} />
        </h2>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, body }, i) => (
          <div
            key={title}
            data-reveal
            ref={(el) => { if (el) cardRefs.current[i] = el }}
            className="liquid-glass rounded-2xl p-6 flex flex-col gap-4 tilt-card"
          >
            <div
              ref={(el) => { if (el) iconRefs.current[i] = el }}
              className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center shrink-0"
            >
              <Icon size={18} className="text-white" />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-white font-body font-medium text-base">{title}</h4>
              <p className="text-white/60 font-body font-light text-sm leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
