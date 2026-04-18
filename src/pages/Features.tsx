import { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  ArrowDown,
  Activity,
  TrendingUp,
  Lock,
  Clock,
  Settings2,
  MessageCircle,
  ShieldCheck,
  QrCode,
  Check,
  CheckCheck,
  CheckCircle2,
  Sparkles,
  Users,
  IndianRupee,
  Zap,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import BlurText from '../components/BlurText'
import RippleButton from '../components/ui/RippleButton'
import CtaFooter from '../components/CtaFooter'
import { useMagneticButton } from '../hooks/useMagneticButton'
import { useCardTilt } from '../hooks/useCardTilt'
import { useCounterAnimation } from '../hooks/useCounterAnimation'
import { useParallax } from '../hooks/useParallax'

// ─── Feature 1: Live Dashboard ───────────────────────────────────────────────

function LiveDashboardIllustration() {
  const cardRef = useCardTilt<HTMLDivElement>(6)
  const checkInRef = useCounterAnimation('248')
  const [paymentIdx, setPaymentIdx] = useState(0)
  const payments = ['UPI', 'Card', 'Cash']

  useEffect(() => {
    const id = setInterval(() => setPaymentIdx((i) => (i + 1) % 3), 1600)
    return () => clearInterval(id)
  }, [])

  const tiers = [
    { name: 'GA', sold: 182, total: 250, color: 'from-white/60 to-white/20' },
    { name: 'VIP', sold: 58, total: 80, color: 'from-[#D4AF37] to-[#FBF5B7]' },
    { name: 'Table', sold: 8, total: 12, color: 'from-[#D4AF37]/80 to-[#D4AF37]/30' },
  ]

  const guests = ['Aryan K.', 'Sana M.', 'Rohan D.', 'Ira S.', 'Kabir P.']

  return (
    <div
      ref={cardRef}
      className="tilt-card liquid-glass-strong border-gold-shimmer card-glow rounded-3xl p-6 md:p-8 w-full max-w-md relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-emerald-400 text-[10px] font-body font-semibold uppercase tracking-widest">
            Live
          </span>
        </div>
        <span className="text-white/40 text-[10px] font-body uppercase tracking-widest">
          Sat · 11:42 PM
        </span>
      </div>

      {/* Tier bars */}
      <div className="space-y-3 mb-6 relative z-10">
        {tiers.map((t, i) => (
          <div key={t.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-white/80 text-xs font-body font-medium">{t.name}</span>
              <span className="text-white/50 text-[10px] font-body">
                {t.sold}/{t.total}
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${t.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${(t.sold / t.total) * 100}%` }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row: check-ins + payment method */}
      <div className="grid grid-cols-2 gap-3 mb-5 relative z-10">
        <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
          <div className="text-white/40 text-[9px] font-body uppercase tracking-widest mb-1">
            Checked in
          </div>
          <div className="flex items-baseline gap-1">
            <span
              ref={checkInRef}
              className="text-2xl font-heading text-gold-gradient leading-none"
            >
              0
            </span>
            <span className="text-white/40 text-[10px] font-body">/ 342</span>
          </div>
        </div>
        <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
          <div className="text-white/40 text-[9px] font-body uppercase tracking-widest mb-1">
            Payment
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={payments[paymentIdx]}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-white text-lg font-heading leading-none"
            >
              {payments[paymentIdx]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Guest stream */}
      <div className="space-y-1.5 relative z-10">
        <div className="text-white/40 text-[9px] font-body uppercase tracking-widest mb-2">
          Latest bookings
        </div>
        {guests.map((g, i) => (
          <motion.div
            key={g}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.12, duration: 0.5 }}
            className="flex items-center justify-between text-[11px] font-body"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FBF5B7] flex items-center justify-center text-[8px] font-bold text-black">
                {g.charAt(0)}
              </div>
              <span className="text-white/80">{g}</span>
            </div>
            <span className="text-white/40">just now</span>
          </motion.div>
        ))}
      </div>

      {/* Ambient glow */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}

// ─── Feature 2: Revenue Tracking ─────────────────────────────────────────────

function RevenueIllustration() {
  const cardRef = useCardTilt<HTMLDivElement>(6)
  const totalRef = useCounterAnimation('4.82L')
  const [hovered, setHovered] = useState<number | null>(null)

  const events = [
    { name: 'Fri · Club Noir', ga: 40, vip: 70, table: 30, total: '1.4L' },
    { name: 'Sat · Skyline', ga: 60, vip: 100, table: 50, total: '2.1L' },
    { name: 'Sun · Sundown', ga: 30, vip: 50, table: 20, total: '1.3L' },
  ]

  return (
    <div
      ref={cardRef}
      className="tilt-card liquid-glass-strong border-gold-shimmer card-glow rounded-3xl p-6 md:p-8 w-full max-w-md relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-2 relative z-10">
        <span className="text-white/40 text-[10px] font-body uppercase tracking-widest">
          Total · this week
        </span>
        <TrendingUp size={14} className="text-[#D4AF37]" />
      </div>
      <div className="flex items-baseline gap-1 mb-8 relative z-10">
        <IndianRupee size={24} className="text-white/80 -mr-1" />
        <span ref={totalRef} className="text-5xl font-heading text-gold-gradient leading-none">
          0
        </span>
      </div>

      {/* Stacked bars */}
      <div className="flex items-end justify-around gap-4 h-40 mb-4 relative z-10">
        {events.map((ev, i) => {
          const h = ev.ga + ev.vip + ev.table
          return (
            <div
              key={ev.name}
              className="flex-1 flex flex-col items-center gap-2 cursor-pointer group"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative w-full">
                <AnimatePresence>
                  {hovered === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black border border-[#D4AF37]/40 rounded-md px-2 py-1 text-[9px] font-body text-white z-20"
                    >
                      ₹{ev.total}
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: h }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full mx-auto flex flex-col justify-end overflow-hidden rounded-t-md"
                  style={{ maxWidth: 44 }}
                >
                  <div
                    style={{ height: ev.table }}
                    className="bg-gradient-to-t from-[#D4AF37] to-[#FBF5B7]"
                  />
                  <div
                    style={{ height: ev.vip }}
                    className="bg-gradient-to-t from-[#D4AF37]/70 to-[#D4AF37]/40"
                  />
                  <div
                    style={{ height: ev.ga }}
                    className="bg-white/25"
                  />
                </motion.div>
              </div>
              <span className="text-[9px] font-body text-white/50 text-center leading-tight">
                {ev.name.split(' · ')[0]}
              </span>
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-3 text-[10px] font-body relative z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm bg-white/25" /> <span className="text-white/50">GA</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm bg-[#D4AF37]/60" /> <span className="text-white/50">VIP</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm bg-gradient-to-t from-[#D4AF37] to-[#FBF5B7]" /> <span className="text-white/50">Table</span>
        </div>
      </div>
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}

// ─── Feature 3: Hard Capacity Limits ─────────────────────────────────────────

function CapacityIllustration() {
  const cardRef = useCardTilt<HTMLDivElement>(6)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [shake, setShake] = useState(0)

  const onOverbook = () => {
    setShake((s) => s + 1)
  }

  useEffect(() => {
    if (!btnRef.current || shake === 0) return
    gsap.fromTo(
      btnRef.current,
      { x: -8 },
      { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
    )
  }, [shake])

  const tiers = [
    { name: 'GA', closed: false, pct: 72 },
    { name: 'VIP', closed: true, pct: 100 },
    { name: 'Table', closed: true, pct: 100 },
  ]

  return (
    <div
      ref={cardRef}
      className="tilt-card liquid-glass-strong border-gold-shimmer card-glow rounded-3xl p-6 md:p-8 w-full max-w-md relative overflow-hidden"
    >
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <Lock size={12} className="text-[#D4AF37]" />
        <span className="text-[#D4AF37] text-[10px] font-body font-semibold uppercase tracking-widest">
          Capacity locked
        </span>
      </div>

      <div className="space-y-3 mb-6 relative z-10">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className={`relative rounded-xl border p-3 ${
              t.closed
                ? 'border-[#D4AF37]/40 bg-[#D4AF37]/[0.04]'
                : 'border-white/10 bg-white/[0.02]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-xs font-body font-medium">{t.name}</span>
              {t.closed ? (
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.15, type: 'spring', stiffness: 200 }}
                  className="flex items-center gap-1 bg-gold-gradient text-black text-[9px] font-bold uppercase tracking-widest rounded-full px-2 py-0.5"
                >
                  <Lock size={8} /> Sold out
                </motion.div>
              ) : (
                <span className="text-white/50 text-[10px] font-body">{t.pct}%</span>
              )}
            </div>
            <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${t.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full ${
                  t.closed ? 'bg-gradient-to-r from-[#D4AF37] to-[#FBF5B7]' : 'bg-white/40'
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <button
        ref={btnRef}
        onClick={onOverbook}
        className="w-full rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] text-white/70 text-xs font-body py-2.5 transition-colors relative z-10"
      >
        Try to overbook →
      </button>
      <AnimatePresence>
        {shake > 0 && (
          <motion.div
            key={shake}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-center text-[10px] font-body text-red-300/80 relative z-10"
          >
            Blocked — tier is full.
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute -top-16 -right-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}

// ─── Feature 4: Dynamic Pricing ──────────────────────────────────────────────

function DynamicPricingIllustration() {
  const cardRef = useCardTilt<HTMLDivElement>(6)
  const [hour, setHour] = useState(21)

  useEffect(() => {
    const id = setInterval(() => setHour((h) => (h >= 26 ? 21 : h + 1)), 1400)
    return () => clearInterval(id)
  }, [])

  const rate = (() => {
    if (hour < 22) return { label: 'Early', price: 499 }
    if (hour < 24) return { label: 'Peak', price: 999 }
    return { label: 'Late', price: 799 }
  })()

  const displayHour = hour > 24 ? hour - 24 : hour
  const suffix = hour >= 24 ? 'AM' : 'PM'

  // angle for hand
  const angle = ((hour - 21) / 6) * 360

  return (
    <div
      ref={cardRef}
      className="tilt-card liquid-glass-strong border-gold-shimmer card-glow rounded-3xl p-6 md:p-8 w-full max-w-md relative overflow-hidden"
    >
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <Clock size={12} className="text-[#D4AF37]" />
        <span className="text-[#D4AF37] text-[10px] font-body font-semibold uppercase tracking-widest">
          Time-based rules
        </span>
      </div>

      {/* Dial */}
      <div className="flex items-center justify-center mb-6 relative z-10">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 200 200" className="absolute inset-0">
            <circle
              cx="100" cy="100" r="90"
              fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"
            />
            <circle
              cx="100" cy="100" r="78"
              fill="none" stroke="url(#dialGrad)" strokeWidth="2"
              strokeDasharray="490"
              strokeDashoffset={490 - (490 * (hour - 21)) / 6}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
              style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
            <defs>
              <linearGradient id="dialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#FBF5B7" />
              </linearGradient>
            </defs>
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <line
                key={a}
                x1="100" y1="20" x2="100" y2="28"
                stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"
                transform={`rotate(${a} 100 100)`}
              />
            ))}
            <motion.line
              x1="100" y1="100" x2="100" y2="40"
              stroke="#FBF5B7" strokeWidth="2" strokeLinecap="round"
              animate={{ rotate: angle }}
              style={{ originX: '100px', originY: '100px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <circle cx="100" cy="100" r="5" fill="#D4AF37" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white/40 text-[9px] font-body uppercase tracking-widest mt-14">
              {rate.label}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 relative z-10">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <div className="text-white/40 text-[9px] font-body uppercase tracking-widest mb-1">
            Time
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={hour}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-xl font-heading text-white leading-none"
            >
              {displayHour}:00 {suffix}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/[0.06] p-3">
          <div className="text-[#D4AF37] text-[9px] font-body uppercase tracking-widest mb-1">
            Price
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={rate.price}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-xl font-heading text-gold-gradient leading-none"
            >
              ₹{rate.price}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="absolute -bottom-16 -right-10 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}

// ─── Feature 5: Full Event Control ───────────────────────────────────────────

function EventControlIllustration() {
  const cardRef = useCardTilt<HTMLDivElement>(6)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 70%',
        onEnter: () => {
          const timers = [
            setTimeout(() => setStep(1), 400),
            setTimeout(() => setStep(2), 1100),
            setTimeout(() => setStep(3), 1800),
            setTimeout(() => setStep(4), 2400),
          ]
          return () => timers.forEach(clearTimeout)
        },
        once: true,
      })
    })
    return () => ctx.revert()
  }, [])

  const fields = [
    { label: 'Price', before: '₹999', after: '₹1,199', step: 1 },
    { label: 'Capacity', before: '250', after: '300', step: 2 },
    { label: 'Availability', before: 'Open', after: 'Waitlist', step: 3 },
  ]

  return (
    <div
      ref={cardRef}
      className="tilt-card liquid-glass-strong border-gold-shimmer card-glow rounded-3xl p-6 md:p-8 w-full max-w-md relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <Settings2 size={12} className="text-[#D4AF37]" />
          <span className="text-[#D4AF37] text-[10px] font-body font-semibold uppercase tracking-widest">
            Edit event
          </span>
        </div>
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="flex items-center gap-1 bg-gold-gradient text-black text-[9px] font-bold uppercase tracking-widest rounded-full px-2 py-0.5"
            >
              <Check size={10} strokeWidth={3} /> Saved
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-3 relative z-10">
        {fields.map((f) => {
          const done = step >= f.step
          return (
            <div
              key={f.label}
              className={`rounded-xl border p-3 transition-colors ${
                done
                  ? 'border-[#D4AF37]/30 bg-[#D4AF37]/[0.04]'
                  : 'border-white/10 bg-white/[0.02]'
              }`}
            >
              <div className="text-white/40 text-[9px] font-body uppercase tracking-widest mb-1">
                {f.label}
              </div>
              <div className="flex items-center gap-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={done ? 'after' : 'before'}
                    initial={{ y: 8, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -8, opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.3 }}
                    className={`text-lg font-heading leading-none ${
                      done ? 'text-gold-gradient' : 'text-white/70'
                    }`}
                  >
                    {done ? f.after : f.before}
                  </motion.span>
                </AnimatePresence>
                {step === f.step && (
                  <motion.span
                    className="inline-block w-0.5 h-5 bg-[#D4AF37]"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-5 flex items-center gap-2 text-[10px] font-body text-white/50 relative z-10">
        <Zap size={10} className="text-[#D4AF37]" />
        Changes reflect instantly across every booking channel.
      </div>
      <div className="absolute -top-16 -left-10 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}

// ─── Feature 6: WhatsApp Alerts ──────────────────────────────────────────────

function WhatsAppIllustration() {
  const cardRef = useCardTilt<HTMLDivElement>(6)

  const messages = [
    { t: '23:01', text: 'New booking · Sana M. · VIP × 2', delay: 0 },
    { t: '23:14', text: '50% milestone — VIP tier half full 🎯', delay: 0.3 },
    { t: '23:32', text: '80% milestone — VIP nearly sold out', delay: 0.6 },
    { t: '23:47', text: 'VIP is SOLD OUT 🔒', delay: 0.9 },
    { t: '23:58', text: 'QR scanned · Aryan K. checked in', delay: 1.2 },
  ]

  return (
    <div
      ref={cardRef}
      className="tilt-card liquid-glass-strong border-gold-shimmer card-glow rounded-3xl p-6 md:p-8 w-full max-w-md relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center">
            <MessageCircle size={14} className="text-[#25D366]" />
          </div>
          <div>
            <div className="text-white text-xs font-body font-semibold">Entrava</div>
            <div className="text-white/40 text-[9px] font-body">online</div>
          </div>
        </div>
        <span className="text-white/30 text-[9px] font-body">WhatsApp</span>
      </div>

      <div className="space-y-2 relative z-10">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: m.delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/5 px-3 py-2"
          >
            <div className="text-white/90 text-[11px] font-body leading-snug">{m.text}</div>
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-white/35 text-[8px] font-body">{m.t}</span>
              <CheckCheck size={10} className="text-[#53bdeb]" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* typing indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 0.4 }}
        className="mt-3 flex items-center gap-1 relative z-10"
      >
        <div className="rounded-full bg-white/[0.04] border border-white/5 px-3 py-2 flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1 h-1 rounded-full bg-white/60 block"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </motion.div>

      <div className="absolute -bottom-16 -right-10 w-48 h-48 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}

// ─── Feature 7: Verified Guest Data ──────────────────────────────────────────

function VerifiedGuestIllustration() {
  const cardRef = useCardTilt<HTMLDivElement>(6)
  const [digits, setDigits] = useState<(string | null)[]>([null, null, null, null, null, null])
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 70%',
        onEnter: () => {
          const otp = ['4', '8', '2', '1', '9', '3']
          otp.forEach((d, i) => {
            setTimeout(() => {
              setDigits((prev) => {
                const next = [...prev]
                next[i] = d
                return next
              })
              if (i === otp.length - 1) setTimeout(() => setVerified(true), 400)
            }, 300 + i * 220)
          })
        },
        once: true,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={cardRef}
      className="tilt-card liquid-glass-strong border-gold-shimmer card-glow rounded-3xl p-6 md:p-8 w-full max-w-md relative overflow-hidden"
    >
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <ShieldCheck size={12} className="text-[#D4AF37]" />
        <span className="text-[#D4AF37] text-[10px] font-body font-semibold uppercase tracking-widest">
          OTP verification
        </span>
      </div>

      <div className="text-white/60 text-xs font-body mb-4 relative z-10">
        Code sent to <span className="text-white">+91 98765 43210</span>
      </div>

      <div className="flex gap-2 mb-6 relative z-10">
        {digits.map((d, i) => (
          <div
            key={i}
            className={`flex-1 aspect-square rounded-xl border flex items-center justify-center text-xl font-heading transition-colors ${
              d
                ? 'border-[#D4AF37]/40 bg-[#D4AF37]/[0.06] text-gold-gradient'
                : 'border-white/10 bg-white/[0.02] text-white/20'
            }`}
          >
            <AnimatePresence mode="wait">
              {d ? (
                <motion.span
                  key={d}
                  initial={{ scale: 0.4, opacity: 0, y: 8 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: 'backOut' }}
                >
                  {d}
                </motion.span>
              ) : (
                <span>·</span>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {verified && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl border border-emerald-400/30 bg-emerald-400/[0.05] p-3 relative z-10"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center">
                <Check size={12} strokeWidth={3} className="text-black" />
              </div>
              <span className="text-emerald-300 text-xs font-body font-semibold">
                Guest verified
              </span>
            </div>
            <div className="grid grid-cols-2 gap-y-1 text-[10px] font-body">
              <span className="text-white/50">Name</span>
              <span className="text-white/90 text-right">Sana Mehta</span>
              <span className="text-white/50">Phone</span>
              <span className="text-white/90 text-right">+91 98765 43210</span>
              <span className="text-white/50">Status</span>
              <span className="text-emerald-300 text-right">OTP verified</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute -top-16 -right-10 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}

// ─── Feature 8: Automatic Guest Confirmation ─────────────────────────────────

function QRConfirmationIllustration() {
  const cardRef = useCardTilt<HTMLDivElement>(6)
  const [paid, setPaid] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: 'top 70%',
        onEnter: () => setTimeout(() => setPaid(true), 500),
        once: true,
      })
    })
    return () => ctx.revert()
  }, [])

  // fake QR pattern (7x7 grid with pseudo-random cells)
  const pattern =
    '1111111' +
    '1000101' +
    '1011101' +
    '1010001' +
    '1110111' +
    '0010010' +
    '1111101'

  return (
    <div
      ref={cardRef}
      className="tilt-card liquid-glass-strong border-gold-shimmer card-glow rounded-3xl p-6 md:p-8 w-full max-w-md relative overflow-hidden"
    >
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <QrCode size={12} className="text-[#D4AF37]" />
        <span className="text-[#D4AF37] text-[10px] font-body font-semibold uppercase tracking-widest">
          Auto-delivery
        </span>
      </div>

      {/* Flow: payment → QR */}
      <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
        {/* Payment step */}
        <motion.div
          animate={{ scale: paid ? 0.92 : 1, opacity: paid ? 0.5 : 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center"
        >
          <IndianRupee size={18} className="text-[#D4AF37] mx-auto mb-1" />
          <div className="text-white/90 text-[11px] font-body font-semibold">Paid</div>
          <div className="text-white/40 text-[9px] font-body">₹999 · UPI</div>
        </motion.div>

        <motion.div
          animate={{ x: paid ? 8 : -8, opacity: paid ? 1 : 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <ArrowUpRight size={16} className="text-[#D4AF37] rotate-45" />
        </motion.div>

        {/* QR step */}
        <div className="flex-1 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/[0.04] p-3">
          <div className="grid grid-cols-7 gap-[2px] w-20 h-20 mx-auto mb-1">
            {pattern.split('').map((c, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={paid ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{
                  delay: 0.2 + (i / pattern.length) * 0.6,
                  duration: 0.2,
                  ease: 'backOut',
                }}
                className={c === '1' ? 'bg-white' : 'bg-transparent'}
                style={{ aspectRatio: '1' }}
              />
            ))}
          </div>
          <div className="text-white/90 text-[10px] font-body text-center font-semibold">
            QR sent
          </div>
        </div>
      </div>

      <AnimatePresence>
        {paid && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-3 flex items-center gap-3 relative z-10"
          >
            <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0">
              <MessageCircle size={14} className="text-[#25D366]" />
            </div>
            <div className="flex-1">
              <div className="text-white/90 text-[11px] font-body">
                Your QR for <span className="text-[#D4AF37]">Skyline · Sat</span>
              </div>
              <div className="text-white/40 text-[9px] font-body">Sent to guest · 0.4s</div>
            </div>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute -bottom-16 -left-10 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}

// ─── Feature row wrapper ─────────────────────────────────────────────────────

type Feature = {
  num: string
  label: string
  title: string
  body: string
  bullets: string[]
  illustration: React.ReactNode
}

const features: Feature[] = [
  {
    num: '01',
    label: 'Live dashboard',
    title: 'Watch the room fill in real time.',
    body:
      'Every booking, every guest, every payment — on one screen that updates the moment it happens. No refreshing. No spreadsheets. No guessing.',
    bullets: [
      'Bookings broken down by tier',
      'Guest names as they confirm',
      'UPI, Card, Cash at a glance',
      'Live check-in count',
    ],
    illustration: <LiveDashboardIllustration />,
  },
  {
    num: '02',
    label: 'Revenue tracking',
    title: 'Know exactly what tonight earned.',
    body:
      'Total takings broken down by event and by tier, updated live. Close the night knowing your numbers — not discovering them next week.',
    bullets: [
      'Per-event earnings',
      'Per-tier breakdown',
      'Hover any bar for detail',
      'Export anytime',
    ],
    illustration: <RevenueIllustration />,
  },
  {
    num: '03',
    label: 'Hard capacity limits',
    title: 'Tiers close themselves. No overbooking.',
    body:
      'Set the number. The system enforces it. When a tier hits capacity, it locks — no exceptions, no oversells, no awkward conversations at the door.',
    bullets: [
      'Auto-close at capacity',
      'No manual gatekeeping',
      'Real-time across channels',
      'Waitlist (optional)',
    ],
    illustration: <CapacityIllustration />,
  },
  {
    num: '04',
    label: 'Dynamic pricing',
    title: 'Prices that move with the night.',
    body:
      'Set early-bird, peak, and late-night rates once. The app switches at the exact minute — you focus on the floor, not on updating a menu.',
    bullets: [
      'Time-based rule engine',
      'Automatic switches',
      'Preview before publishing',
      'Applies to every channel',
    ],
    illustration: <DynamicPricingIllustration />,
  },
  {
    num: '05',
    label: 'Full event control',
    title: 'Change anything. Instantly.',
    body:
      'Bump the price. Add 50 more spots. Close a tier. Reopen it. Every edit pushes live in under a second, across every guest who has the link.',
    bullets: [
      'Edit price, capacity, availability',
      'Instant propagation',
      'No republish, no delay',
      'Full audit trail',
    ],
    illustration: <EventControlIllustration />,
  },
  {
    num: '06',
    label: 'WhatsApp alerts',
    title: 'The night, in your pocket.',
    body:
      'Entrava pings you on WhatsApp for every booking, at 50%, 80%, and sold-out milestones, and for every QR scan at the door. Silence your admin tab and still know everything.',
    bullets: [
      'Booking notifications',
      '50 / 80 / 100% milestones',
      'Live check-in log',
      'One chat, zero noise',
    ],
    illustration: <WhatsAppIllustration />,
  },
  {
    num: '07',
    label: 'Verified guest data',
    title: 'Real names. Real numbers. Every time.',
    body:
      'Every guest is OTP-verified before a booking is confirmed. No throwaway emails, no fake numbers — the list you see is the list that walks in.',
    bullets: [
      'OTP on every booking',
      'Verified phone + name',
      'Clean exportable CRM',
      'Fraud-proof',
    ],
    illustration: <VerifiedGuestIllustration />,
  },
  {
    num: '08',
    label: 'Automatic confirmation',
    title: 'Guests get their QR the instant they pay.',
    body:
      'No manual sends. No "check your spam." The QR lands in the guest\'s hand the moment payment clears — and you never touch it.',
    bullets: [
      'Instant QR delivery',
      'WhatsApp + email',
      'No admin work',
      'Traceable on scan',
    ],
    illustration: <QRConfirmationIllustration />,
  },
]

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)
  const illRef = useRef<HTMLDivElement>(null)
  const isEven = index % 2 === 1

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rowRef.current, start: 'top 75%', once: true },
      })
      if (numRef.current) {
        tl.fromTo(
          numRef.current,
          { opacity: 0, scale: 1.2 },
          { opacity: 0.08, scale: 1, duration: 1.1, ease: 'power2.out' },
          0
        )
      }
      if (textRef.current) {
        tl.fromTo(
          textRef.current.querySelectorAll('[data-reveal]'),
          { opacity: 0, y: 30, filter: 'blur(4px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            stagger: 0.08, duration: 0.8, ease: 'power3.out',
          },
          0.1
        )
      }
      if (illRef.current) {
        tl.fromTo(
          illRef.current,
          { opacity: 0, x: isEven ? -40 : 40, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out' },
          0
        )
      }
    }, rowRef)
    return () => ctx.revert()
  }, [isEven])

  return (
    <div
      ref={rowRef}
      className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-20 lg:py-28"
    >
      {/* Watermark number */}
      <span
        ref={numRef}
        className={`absolute top-0 ${
          isEven ? 'right-4 lg:right-16' : 'left-4 lg:left-16'
        } text-[140px] lg:text-[220px] font-heading text-white/0 leading-none pointer-events-none select-none`}
        style={{ opacity: 0 }}
      >
        {feature.num}
      </span>

      {/* Text */}
      <div
        ref={textRef}
        className={`${isEven ? 'lg:order-2' : 'lg:order-1'} relative z-10`}
      >
        <div data-reveal className="flex items-center gap-2 mb-4">
          <Sparkles size={14} className="text-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xs font-body font-medium uppercase tracking-widest">
            {feature.label}
          </span>
        </div>
        <h3
          data-reveal
          className="text-4xl md:text-5xl lg:text-6xl font-heading text-white leading-[1.05] mb-5"
        >
          {feature.title}
        </h3>
        <p data-reveal className="text-white/70 text-base md:text-lg font-body leading-relaxed mb-6 max-w-lg">
          {feature.body}
        </p>
        <ul className="space-y-2 max-w-lg">
          {feature.bullets.map((b) => (
            <li
              key={b}
              data-reveal
              className="flex items-center gap-3 text-white/80 text-sm font-body"
            >
              <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Illustration */}
      <div
        ref={illRef}
        className={`${isEven ? 'lg:order-1' : 'lg:order-2'} flex justify-center relative z-10`}
        style={{ opacity: 0 }}
      >
        {feature.illustration}
      </div>
    </div>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function FeaturesHero() {
  const demoBtnRef = useMagneticButton<HTMLAnchorElement>(0.25)
  const scrollBtnRef = useMagneticButton<HTMLButtonElement>(0.25)
  const glowRef1 = useParallax<HTMLDivElement>(0.3)
  const glowRef2 = useParallax<HTMLDivElement>(0.15)
  const floatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!floatRef.current) return
    const ctx = gsap.context(() => {
      const tiles = floatRef.current!.querySelectorAll('[data-float]')
      tiles.forEach((tile, i) => {
        gsap.to(tile, {
          y: i % 2 === 0 ? -12 : 12,
          duration: 3 + i * 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      })
    })
    return () => ctx.revert()
  }, [])

  const scrollToFeatures = () => {
    document.getElementById('features-start')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 pb-20 px-6">
      {/* glow layers */}
      <div
        ref={glowRef1}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/15 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        ref={glowRef2}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FBF5B7]/10 rounded-full blur-[120px] pointer-events-none"
      />

      {/* floating tiles */}
      <div
        ref={floatRef}
        className="absolute inset-0 pointer-events-none hidden md:block"
      >
        <div
          data-float
          className="absolute top-[22%] left-[12%] liquid-glass rounded-2xl px-4 py-3 flex items-center gap-2"
        >
          <Activity size={14} className="text-[#D4AF37]" />
          <span className="text-white/80 text-[11px] font-body">Live · 248 in</span>
        </div>
        <div
          data-float
          className="absolute top-[30%] right-[10%] liquid-glass rounded-2xl px-4 py-3 flex items-center gap-2"
        >
          <MessageCircle size={14} className="text-[#25D366]" />
          <span className="text-white/80 text-[11px] font-body">VIP 80%</span>
        </div>
        <div
          data-float
          className="absolute bottom-[26%] left-[18%] liquid-glass rounded-2xl px-4 py-3 flex items-center gap-2"
        >
          <IndianRupee size={14} className="text-[#D4AF37]" />
          <span className="text-white/80 text-[11px] font-body">₹4.82L</span>
        </div>
        <div
          data-float
          className="absolute bottom-[30%] right-[14%] liquid-glass rounded-2xl px-4 py-3 flex items-center gap-2"
        >
          <QrCode size={14} className="text-white/90" />
          <span className="text-white/80 text-[11px] font-body">QR delivered</span>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 liquid-glass rounded-full px-4 py-1.5 mb-8">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D4AF37]" />
          </span>
          <span className="text-white/80 text-xs font-body uppercase tracking-widest">
            Features
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[88px] font-heading text-white leading-[1.02] mb-4">
          <BlurText text="Everything you need" delay={80} />
          <br />
          <BlurText text="to run a night." delay={80} />
        </h1>
        <h2 className="text-5xl md:text-7xl lg:text-[88px] font-heading leading-[1.02] mb-10">
          <span className="text-gold-gradient italic">One app.</span>
        </h2>

        <p className="text-white/60 text-base md:text-lg font-body max-w-xl mx-auto mb-10">
          From the first booking to the last check-in — every tool you need to
          open, fill, and close the room.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <RippleButton
            href="#"
            className="flex items-center gap-2 bg-gold-gradient text-black rounded-full px-6 py-3 text-sm font-body font-semibold hover:opacity-90 transition-opacity"
          >
            <span ref={demoBtnRef as React.Ref<HTMLSpanElement>} className="flex items-center gap-2">
              Book a demo
              <ArrowUpRight size={16} />
            </span>
          </RippleButton>
          <button
            ref={scrollBtnRef}
            onClick={scrollToFeatures}
            className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-body px-6 py-3 transition-colors"
          >
            See it in action
            <ArrowDown size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Closer band ─────────────────────────────────────────────────────────────

function Closer() {
  const quoteRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!quoteRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current!.querySelectorAll('[data-reveal]'),
        { opacity: 0, y: 40, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          stagger: 0.15, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: quoteRef.current, start: 'top 80%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={quoteRef} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div data-reveal className="flex items-center justify-center gap-2 mb-6">
          <Users size={14} className="text-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xs font-body font-medium uppercase tracking-widest">
            The promise
          </span>
        </div>
        <h2
          data-reveal
          className="text-5xl md:text-7xl lg:text-8xl font-heading leading-[1.02] mb-6"
        >
          <span className="text-white">Nothing for you </span>
          <span className="text-gold-gradient italic">to do.</span>
        </h2>
        <p data-reveal className="text-white/60 text-base md:text-lg font-body max-w-xl mx-auto">
          Entrava handles the operations. You run the night.
        </p>
      </div>
    </section>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Features() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="bg-black text-white relative overflow-hidden">
      <FeaturesHero />
      <div id="features-start" className="max-w-7xl mx-auto px-6 lg:px-12">
        {features.map((f, i) => (
          <FeatureRow key={f.num} feature={f} index={i} />
        ))}
      </div>
      <Closer />
      <CtaFooter />
    </main>
  )
}
