import { useRef, type ReactNode, type MouseEvent } from 'react'
import { gsap } from '../../lib/gsap'

interface RippleButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
}

export default function RippleButton({ children, className = '', href, onClick }: RippleButtonProps) {
  const containerRef = useRef<HTMLElement>(null)

  const triggerRipple = (e: MouseEvent) => {
    const el = containerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ripple = document.createElement('span')
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
      transform: translate(-50%, -50%) scale(0);
      pointer-events: none;
      z-index: 0;
    `
    el.appendChild(ripple)

    gsap.to(ripple, {
      scale: 60,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    })

    onClick?.()
  }

  if (href) {
    return (
      <a
        ref={containerRef as React.Ref<HTMLAnchorElement>}
        href={href}
        className={`relative overflow-hidden ${className}`}
        onClick={triggerRipple}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={containerRef as React.Ref<HTMLButtonElement>}
      className={`relative overflow-hidden ${className}`}
      onClick={triggerRipple}
    >
      {children}
    </button>
  )
}
