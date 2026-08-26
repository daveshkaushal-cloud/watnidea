'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  baseAlpha: number
  red: boolean
  phase: number
}

type Trail = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
}

/**
 * Immersive particle field:
 *  - slow floating particles (white + red glow)
 *  - red energy trail emitted from the cursor
 *  - subtle attraction toward the cursor
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // Particle count scales with area but is capped for perf
    const count = Math.min(90, Math.floor((width * height) / 16000))

    const particles: Particle[] = []
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -0.1 - Math.random() * 0.25,
        size: Math.random() * 1.8 + 0.4,
        baseAlpha: Math.random() * 0.5 + 0.2,
        red: Math.random() > 0.78,
        phase: Math.random() * Math.PI * 2,
      })
    }

    const trails: Trail[] = []
    const mouse = {
      x: width / 2,
      y: height / 2,
      prevX: width / 2,
      prevY: height / 2,
      active: false,
    }

    const onMove = (e: MouseEvent) => {
      mouse.prevX = mouse.x
      mouse.prevY = mouse.y
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
      // Emit trail particles proportional to movement speed
      const dx = mouse.x - mouse.prevX
      const dy = mouse.y - mouse.prevY
      const speed = Math.min(Math.hypot(dx, dy), 40)
      const emit = Math.floor(speed / 4) + 1
      for (let i = 0; i < emit; i++) {
        const t = i / emit
        trails.push({
          x: mouse.prevX + dx * t + (Math.random() - 0.5) * 4,
          y: mouse.prevY + dy * t + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6 - 0.2,
          life: 0,
          maxLife: 40 + Math.random() * 30,
          size: Math.random() * 2.2 + 0.8,
        })
      }
      if (trails.length > 220) trails.splice(0, trails.length - 220)
    }
    const onLeave = () => {
      mouse.active = false
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)

    let raf = 0
    let frame = 0

    const render = () => {
      frame++
      ctx.clearRect(0, 0, width, height)

      // Floating particles
      for (const p of particles) {
        // gentle sine drift
        p.x += p.vx + Math.sin(frame * 0.01 + p.phase) * 0.12
        p.y += p.vy

        // wrap
        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        // attraction toward cursor
        if (mouse.active) {
          const ddx = mouse.x - p.x
          const ddy = mouse.y - p.y
          const dist = Math.hypot(ddx, ddy)
          if (dist < 160) {
            const f = (1 - dist / 160) * 0.04
            p.vx += (ddx / dist) * f
            p.vy += (ddy / dist) * f
          }
        }
        // friction
        p.vx *= 0.985
        p.vy = p.vy * 0.985 + (-0.1 - Math.random() * 0.25) * 0.02

        const flicker = 0.7 + Math.sin(frame * 0.04 + p.phase) * 0.3
        const alpha = p.baseAlpha * flicker

        if (p.red) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(229,57,53,${alpha * 0.25})`
          ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.red
          ? `rgba(255,90,82,${alpha})`
          : `rgba(255,255,255,${alpha * 0.85})`
        ctx.fill()
      }

      // Red energy trails (additive)
      ctx.globalCompositeOperation = 'lighter'
      for (let i = trails.length - 1; i >= 0; i--) {
        const t = trails[i]
        t.life++
        t.x += t.vx
        t.y += t.vy
        t.vx *= 0.94
        t.vy *= 0.94
        const k = 1 - t.life / t.maxLife
        if (k <= 0) {
          trails.splice(i, 1)
          continue
        }
        const r = t.size * (0.6 + k * 1.6)
        const grad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, r * 4)
        grad.addColorStop(0, `rgba(255,90,82,${0.5 * k})`)
        grad.addColorStop(0.4, `rgba(229,57,53,${0.25 * k})`)
        grad.addColorStop(1, 'rgba(229,57,53,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(t.x, t.y, r * 4, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'

      raf = requestAnimationFrame(render)
    }

    if (!reduce) {
      raf = requestAnimationFrame(render)
    } else {
      render()
      cancelAnimationFrame(raf)
    }

    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 h-full w-full"
    />
  )
}
