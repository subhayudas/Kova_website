import { ArrowUpRight } from 'lucide-react'
import HlsVideo from './HlsVideo'
import BlurText from './BlurText'
import { useParallax } from '../hooks/useParallax'
import { useGSAPScrollReveal } from '../hooks/useGSAPScrollReveal'
import RippleButton from './ui/RippleButton'

const START_VIDEO = 'https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8'

export default function StartSection() {
  const videoRef = useParallax<HTMLDivElement>(0.2)
  const contentRef = useGSAPScrollReveal<HTMLDivElement>({ stagger: 0.15, y: 30 })

  return (
    <section className="relative overflow-hidden py-32 min-h-[600px] flex items-center">
      {/* HLS Video background with parallax */}
      <div
        ref={videoRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <HlsVideo
          src={START_VIDEO}
          className="w-full h-full object-cover"
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
      <div ref={contentRef} className="relative z-10 w-full flex flex-col items-center text-center px-6 gap-6">
        <div data-reveal className="liquid-glass rounded-full px-3.5 py-1">
          <span className="text-white text-xs font-medium font-body">How It Works</span>
        </div>

        <h2 data-reveal className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] max-w-2xl">
          <BlurText text="Browse. Book. Arrive in style." delay={120} />
        </h2>

        <p data-reveal className="text-white/60 font-body font-light text-sm md:text-base max-w-md">
          Find the perfect venue, lock in your table, and walk straight to your seats — no waiting, no stress.
        </p>

        <div data-reveal>
          <RippleButton
            href="#"
            className="liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-2 text-white text-sm font-body font-medium"
          >
            Get Started
            <ArrowUpRight size={16} />
          </RippleButton>
        </div>
      </div>
    </section>
  )
}
