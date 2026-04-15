import { useEffect, useRef } from 'react'
import BlurText from './BlurText'
import { gsap } from '../lib/gsap'
import { useGSAPScrollReveal } from '../hooks/useGSAPScrollReveal'

const testimonials = [
  {
    quote:
      'Walked straight past the queue into our reserved booth. ENTRAVA made the whole night seamless.',
    name: 'Jamie Torres',
    role: 'Regular at Tape London',
  },
  {
    quote:
      'Booked a VIP table at Pacha in minutes. The confirmation was instant and everything was exactly as promised.',
    name: 'Priya Mehta',
    role: 'Group booking, Ibiza',
  },
  {
    quote:
      "We use ENTRAVA every weekend now. It's the only way to guarantee a proper night out without the chaos.",
    name: 'Alex Richter',
    role: 'Club-goer, Berlin',
  },
]

export default function Testimonials() {
  const gridRef = useGSAPScrollReveal<HTMLDivElement>({ stagger: 0.15, y: 40 })
  const headerRef = useRef<HTMLDivElement>(null)
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

      // Card tilt + hover glow
      cardRefs.current.forEach((card) => {
        if (!card) return

        gsap.set(card, { transformPerspective: 800, transformOrigin: 'center center' })

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect()
          const x = (e.clientX - rect.left) / rect.width - 0.5
          const y = (e.clientY - rect.top) / rect.height - 0.5
          gsap.to(card, { rotationY: x * 8, rotationX: -y * 8, duration: 0.4, ease: 'power2.out' })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'elastic.out(1, 0.6)' })
          gsap.to(card, { boxShadow: '', duration: 0.4 })
        })

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            boxShadow: '0 0 40px rgba(255,255,255,0.06), inset 0 1px 1px rgba(255,255,255,0.12)',
            duration: 0.4,
          })
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
          <span className="text-white text-xs font-medium font-body">Reviews</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          <BlurText text="The night starts here." delay={100} />
        </h2>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map(({ quote, name, role }, i) => (
          <div
            key={name}
            data-reveal
            ref={(el) => { if (el) cardRefs.current[i] = el }}
            className="liquid-glass rounded-2xl p-8 flex flex-col gap-6 tilt-card"
          >
            <p className="text-white/80 font-body font-light text-sm italic leading-relaxed flex-1">
              "{quote}"
            </p>
            <div className="flex flex-col gap-1">
              <span className="text-white font-body font-medium text-sm">{name}</span>
              <span className="text-white/50 font-body font-light text-xs">{role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
