'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * useReducedMotionSSR — hydration-safe reduced-motion hook.
 *
 * framer-motion's useReducedMotion() returns `null` during SSR and a
 * boolean on the client. When components branch on that value
 * (rendering <div> vs <motion.div>, or different props), the server
 * and client produce different markup → React hydration mismatch:
 *   "A tree hydrated but some attributes of the server rendered HTML
 *    didn't match the client properties."
 *
 * This hook always returns `false` during SSR AND during the first
 * client render (so the first client paint matches the server
 * markup), then updates to the real value after mount. The brief
 * animation is invisible during that single frame, and reduced-motion
 * users still get a static result (framer-motion components respect
 * the media query internally too).
 *
 * Use this instead of `useReducedMotion` in every client component
 * that branches on the reduced-motion value.
 */
export function useReducedMotionSSR(): boolean {
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    // Mount guard: set once after hydration so SSR + first client
    // render produce identical markup (always `false`), preventing
    // hydration mismatches. The real reduced-motion value applies
    // on the next paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])
  return mounted ? Boolean(reduce) : false
}

