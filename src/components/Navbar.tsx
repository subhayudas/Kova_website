import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useMagneticButton } from '../hooks/useMagneticButton'
import RippleButton from './ui/RippleButton'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Why Entrava', to: '/why' },
  { label: 'Promoters & Venues', to: '/promoters-venues' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const bookBtnRef = useMagneticButton<HTMLAnchorElement>(0.25)
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Slide in from top on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      )
    })
    return () => ctx.revert()
  }, [])

  // Scroll-aware background — only on home where #hero-section exists
  useEffect(() => {
    if (!isHome) {
      // Always show glass background on inner pages
      gsap.set(navRef.current, {
        backgroundColor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(20px)',
      })
      return
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#hero-section',
        start: 'bottom top',
        onEnter: () =>
          gsap.to(navRef.current, {
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(20px)',
            duration: 0.4,
            ease: 'power2.out',
          }),
        onLeaveBack: () =>
          gsap.to(navRef.current, {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(0px)',
            duration: 0.4,
            ease: 'power2.out',
          }),
      })
    })
    return () => ctx.revert()
  }, [isHome])

  return (
    <nav
      ref={navRef}
      className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 py-3 flex items-center justify-between rounded-full mx-4"
      style={{ opacity: 0 }}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img src="/logo.png" alt="Entrava" className="h-24 w-auto" />
        </Link>
      </div>

      {/* Center nav pill — desktop only */}
      <div className="hidden md:flex items-center liquid-glass rounded-full px-1.5 py-1 gap-1">
        {navLinks.map(({ label, to }) => {
          const isActive = to !== '#' && location.pathname === to
          return to === '#' ? (
            <a
              key={label}
              href="#"
              className="relative px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors group"
            >
              {label}
              <span className="absolute bottom-1 left-3 right-3 h-px bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ) : (
            <Link
              key={label}
              to={to}
              className={`relative px-3 py-2 text-sm font-medium font-body transition-colors group ${
                isActive ? 'text-[#D4AF37]' : 'text-white/90 hover:text-white'
              }`}
            >
              {label}
              <span
                className={`absolute bottom-1 left-3 right-3 h-px bg-gold-gradient transition-transform duration-300 origin-left ${
                  isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </Link>
          )
        })}
        <RippleButton
          href="#"
          className="flex items-center gap-1 bg-gold-gradient text-black rounded-full px-3.5 py-1.5 text-sm font-medium font-body hover:opacity-90 transition-opacity"
        >
          <span ref={bookBtnRef as React.Ref<HTMLSpanElement>} className="flex items-center gap-1">
            Book Now
            <ArrowUpRight size={14} />
          </span>
        </RippleButton>
      </div>

      {/* Mobile CTA */}
      <div className="flex md:hidden">
        <RippleButton
          href="#"
          className="flex items-center gap-1 bg-gold-gradient text-black rounded-full px-3.5 py-1.5 text-sm font-medium font-body hover:opacity-90 transition-opacity"
        >
          Book Now
          <ArrowUpRight size={14} />
        </RippleButton>
      </div>
    </nav>
  )
}
