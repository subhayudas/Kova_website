import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import BlurText from './BlurText'
import { gsap } from '../lib/gsap'
import { useParallax } from '../hooks/useParallax'
import { useMagneticButton } from '../hooks/useMagneticButton'
import RippleButton from './ui/RippleButton'

const HERO_VIDEO = '/herobackgroundvideo.mp4'

const partners = ['Klub', 'Fabric', 'Pacha', 'Berghain', 'Marquee']

export default function Hero() {
  const videoRef = useParallax<HTMLVideoElement>(0.15)
  const partnerRefs = useRef<HTMLSpanElement[]>([])
  const bookBtnRef = useMagneticButton<HTMLAnchorElement>(0.3)
  const sectionRef = useRef<HTMLElement>(null)

  // Partner names stagger after load animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        partnerRefs.current,
        { opacity: 0, y: 20, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.08,
          delay: 1.6,
          duration: 0.7,
          ease: 'power3.out',
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative overflow-hidden h-[1000px] bg-black"
    >
      {/* Background video with parallax */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover z-0 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero_bg.png"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/5 z-0 pointer-events-none" />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]"
        style={{
          height: 300,
          background: 'linear-gradient(to bottom, transparent, black)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6" style={{ paddingTop: 150 }}>
        {/* Badge */}
        <motion.div
          className="liquid-glass border-gold-shimmer rounded-full px-1 py-1 flex items-center gap-2 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
        >
          <span className="bg-gold-gradient text-black rounded-full px-3 py-1 text-xs font-semibold font-body">
            New
          </span>
          <span className="text-white/80 text-sm font-body pr-2">
            Now in Mumbai | NCR
          </span>
        </motion.div>

        {/* Heading */}
        <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-gold-gradient leading-[0.85] max-w-3xl tracking-[-4px] mb-6">
          <BlurText text="Your Night. Your Table. Reserved." delay={100} />
        </h1>

        {/* Subtext */}
        <motion.p
          className="text-sm md:text-base text-white font-body font-light leading-tight max-w-md mb-8"
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
        >
          Skip the queue. Book premium seats at the best nightclubs and bars — instantly.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
        >
          <RippleButton
            href="#"
            className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-white text-sm font-body font-medium hover:bg-white/10 transition-colors"
          >
            <span ref={bookBtnRef as React.Ref<HTMLSpanElement>} className="flex items-center gap-2">
              Book a Table
              <ArrowUpRight size={16} />
            </span>
          </RippleButton>
          <RippleButton
            href="#"
            className="flex items-center gap-2 text-white text-sm font-body font-medium hover:text-white/80 transition-colors"
          >
            <ArrowUpRight size={16} />
            Explore Venues
          </RippleButton>
        </motion.div>


      </div>
    </section>
  )
}
