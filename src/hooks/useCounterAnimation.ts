import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export function useCounterAnimation(target: string) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Parse e.g. "500+" → { num: 500, suffix: '+' }
    // Also handles "50K+" → { num: 50, suffix: 'K+' }
    // And "4.9★" → { num: 4.9, suffix: '★' }
    const match = target.match(/^([\d.]+)(.*)$/)
    if (!match) {
      el.textContent = target
      return
    }

    const endValue = parseFloat(match[1])
    const suffix = match[2] ?? ''
    const isDecimal = match[1].includes('.')

    const obj = { val: 0 }

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: endValue,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate() {
          el.textContent = isDecimal
            ? obj.val.toFixed(1) + suffix
            : Math.round(obj.val) + suffix
        },
        onComplete() {
          el.textContent = target
        },
      })
    })

    return () => ctx.revert()
  }, [target])

  return ref
}
