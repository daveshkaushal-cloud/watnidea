'use client'

import { useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
  cursorLabel?: string
  onClick?: () => void
  ariaLabel?: string
}

/**
 * Magnetic button: the inner content follows the cursor slightly while
 * hovering, and springs back on leave. Supports primary (red) and
 * secondary (outline) variants.
 */
export default function MagneticButton({
  children,
  className,
  variant = 'primary',
  cursorLabel,
  onClick,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    setPos({ x: x * 0.35, y: y * 0.35 })
  }

  const reset = () => setPos({ x: 0, y: 0 })

  const isPrimary = variant === 'primary'

  return (
    <motion.button
      ref={ref}
      aria-label={ariaLabel}
      data-cursor={cursorLabel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300',
        isPrimary
          ? 'bg-[#E53935] text-white'
          : 'border border-white/25 bg-white/5 text-white backdrop-blur-md hover:border-white/50',
        className
      )}
    >
      {/* Shine sweep */}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out',
          'group-hover:translate-x-full'
        )}
      />
      {/* Glow */}
      {isPrimary && (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-1 rounded-full opacity-60 blur-md transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle at center, rgba(229,57,53,0.7), rgba(229,57,53,0))',
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}
