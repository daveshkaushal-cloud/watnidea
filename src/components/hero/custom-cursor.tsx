'use client'

import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'

/**
 * Premium custom cursor (visual ENHANCEMENT — NOT a replacement):
 *  - a small solid red-glow dot that tracks the pointer instantly
 *  - an outer ring that springs behind with a slight lag
 *  - grows + shows a label when hovering interactive elements ([data-cursor])
 *
 * IMPORTANT (Task 14-fix-pointer-v2): the native system cursor is NEVER
 * hidden. The custom cursor (red dot + white ring) renders ON TOP of the
 * native cursor as a premium visual flourish. This guarantees the user
 * ALWAYS has a visible, functional cursor — even in embedded / iframe /
 * preview-panel contexts where this component's `mousemove` listener or
 * Framer Motion animation may not fire reliably (which previously left
 * users with NO visible cursor at all, because the native cursor was
 * force-hidden via `cursor: none !important` while the custom layer never
 * rendered). If this component fails to mount for any reason, the native
 * cursor simply remains — graceful degradation with no usability loss.
 *
 * Visibility is fully controlled by CSS in globals.css:
 *   - `.wn-cursor-layer { display: none }` by default (touch / coarse pointers)
 *   - `@media (pointer: fine) { .wn-cursor-layer { display: block } }`
 * There is NO `cursor: none` rule anywhere — the native cursor is always
 * visible.
 *
 * The mousemove / mousedown / mouseup listeners are ALWAYS attached (even on
 * touch devices) — they are harmless on touch (no `mousemove` fires) and
 * this avoids breaking on headless / unusual UA strings where
 * `matchMedia('(pointer: fine)')` may falsely report `false`.
 *
 * POSITION TRACKING via `animate()`:
 * The ring + dot positions are plain `useMotionValue`s (NOT `useSpring`).
 * On each mousemove we call framer-motion's `animate(value, target, config)`
 * which kicks off a fresh spring animation and automatically cancels the
 * previous one. This is more robust than `useSpring(initial, config)` +
 * `set()`: `useSpring`'s internal SpringValue can stall after the component
 * re-renders (e.g. when `hovering` flips and the inner div's `animate`
 * width/height/scale changes), leaving the ring visually stuck at its
 * pre-hover position even though `set()` keeps firing. `animate()` creates
 * a brand-new animation on each call with no stale internal state, so the
 * ring reliably tracks the pointer across hover/unhover transitions.
 *
 * FIRST-MOVE `jump()`:
 * The motion values start off-screen at `-100, -100`. On the first
 * `mousemove` we `jump()` (no spring) them to the pointer so the custom
 * cursor materialises exactly at the pointer instead of flying in from
 * off-screen. (This used to also gate hiding the native cursor; now it
 * just gives the custom cursor a clean entrance — the native cursor
 * stays visible throughout.)
 *
 * The cursor elements use a two-layer structure: an outer motion.div whose
 * ONLY transform is `translate(x, y)` (driven by the motion values), and an
 * inner motion.div that owns the `-50%` centering translate + the animated
 * width/height/border/scale. Keeping the position transform isolated on its
 * own element means the inner div's `animate` never competes with the
 * position transform.
 */

// Spring configs — module-level so the `useEffect` deps are stable across
// re-renders. Ring trails behind (softer spring + lower mass for a snappy
// but visible lag), dot tracks near-instantly (stiff spring).
const RING_SPRING = { type: 'spring' as const, stiffness: 320, damping: 28, mass: 0.5 }
const DOT_SPRING = { type: 'spring' as const, stiffness: 1100, damping: 50 }

export default function CustomCursor() {
  // Plain motion values — animated via `animate()` on each mousemove.
  const ringX = useMotionValue(-100)
  const ringY = useMotionValue(-100)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState<string>('')
  const [down, setDown] = useState(false)

  // Spring configs — ring trails behind, dot tracks near-instantly.
  // Defined as module-level constants (below) so the `useEffect` deps
  // are stable across re-renders (otherwise the effect would re-run on
  // every render, tearing down + re-adding the mousemove listener).

  useEffect(() => {
    // First-move `jump()`: the motion values start off-screen at
    // `-100, -100`. On the first `mousemove` we `jump()` (no spring) them
    // to the pointer so the custom cursor materialises exactly at the
    // pointer instead of flying in from off-screen. The native system
    // cursor remains visible throughout (it is NEVER hidden — see the
    // component doc comment + globals.css), so this is purely a clean
    // entrance for the custom layer, not a cursor-handoff gate.
    let firstMove = true
    const move = (e: MouseEvent) => {
      const cx = e.clientX
      const cy = e.clientY
      if (firstMove) {
        firstMove = false
        ringX.jump(cx)
        ringY.jump(cy)
        dotX.jump(cx)
        dotY.jump(cy)
      } else {
        // Subsequent moves: animate (spring) towards the new pointer
        // position. `animate()` cancels any in-flight animation on the
        // same motion value and starts a fresh spring, which is immune
        // to the re-render stall that `useSpring` + `set()` can hit.
        animate(ringX, cx, RING_SPRING)
        animate(ringY, cy, RING_SPRING)
        animate(dotX, cx, DOT_SPRING)
        animate(dotY, cy, DOT_SPRING)
      }

      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        '[data-cursor], a, button'
      )
      if (el) {
        setHovering(true)
        setLabel(el.getAttribute('data-cursor') || '')
      } else {
        setHovering(false)
        setLabel('')
      }
    }
    const downH = () => setDown(true)
    const upH = () => setDown(false)

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mousedown', downH)
    window.addEventListener('mouseup', upH)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', downH)
      window.removeEventListener('mouseup', upH)
    }
  }, [ringX, ringY, dotX, dotY])

  return (
    // z-[9999] so the cursor floats above EVERYTHING: navbar (z-50), mega
    // menu (z-[45]) and mobile overlay (z-[60]) which live inside the
    // navbar's own stacking context, plus the grain/vignette overlays
    // (z-60/z-55) and any shadcn toasts/modals.
    <div className="wn-cursor-layer pointer-events-none fixed inset-0 z-[9999]">
      {/* OUTER RING — two-layer structure (Task 14 fix):
          - Position wrapper (outer motion.div): the ONLY thing on this
            element is `style={{ x, y }}` — pure motion-value-driven
            `translate(x, y)`. No `animate`, no `translateX/Y: -50%`, no
            other transforms. This isolation is critical: when `hovering`
            flips and the inner div's `animate` (width/height/scale) changes,
            Framer Motion v12 can otherwise stall the outer div's
            motion-value subscription, leaving the ring visually stuck at
            its pre-hover position even though `ringX.set(cx)` keeps firing.
            With the position on its own element, the subscription is stable.
          - Visual inner motion.div: owns the `-50%` centering translate
            (static, relative to its own size) + the animated
            width/height/borderColor/backgroundColor/scale. Because these
            are on a separate element, they never compete with the
            position transform. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="pointer-events-none rounded-full border"
          style={{ translateX: '-50%', translateY: '-50%' }}
          animate={{
            width: hovering ? 64 : 34,
            height: hovering ? 64 : 34,
            borderColor: hovering
              ? 'rgba(229,57,53,0.9)'
              : 'rgba(255,255,255,0.5)',
            backgroundColor: hovering
              ? 'rgba(229,57,53,0.10)'
              : 'rgba(229,57,53,0)',
            scale: down ? 0.82 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        />
      </motion.div>

      {/* INNER DOT — same two-layer structure as the ring: position on the
          outer motion.div (pure x/y), centering + visual on the inner.
          The dot's spring is stiff (1100) so it tracks near-instantly. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="pointer-events-none rounded-full"
          style={{
            translateX: '-50%',
            translateY: '-50%',
            background: '#E53935',
            boxShadow:
              '0 0 10px rgba(229,57,53,0.9), 0 0 24px rgba(229,57,53,0.45)',
          }}
          animate={{
            width: hovering ? 6 : 7,
            height: hovering ? 6 : 7,
            opacity: hovering ? 0.9 : 1,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        />
      </motion.div>

      {/* HOVER LABEL — rides on the ring's spring so it trails the same way.
          Same two-layer structure: position (ringX/ringY) on the outer,
          centering + opacity/scale animation on the inner. Only rendered
          when `label` is non-empty (set by hovering [data-cursor]/a/button). */}
      {label ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0"
          style={{ x: ringX, y: ringY }}
        >
          <motion.div
            className="pointer-events-none whitespace-nowrap rounded-full bg-[#E53935] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
            style={{ translateX: '-50%', translateY: '-50%' }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {label}
          </motion.div>
        </motion.div>
      ) : null}
    </div>
  )
}
