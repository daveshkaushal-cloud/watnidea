'use client'

import { useEffect, useState } from 'react'
import { Sparkles, ArrowUpRight } from 'lucide-react'
import { useReducedMotionSSR } from '@/components/site/use-reduced-motion-ssr'
import { Container, CTAButton, IdeaStamp, Sticker, Underline } from '@/components/site/primitives'

export function HomeHero() {
  const reduce = useReducedMotionSSR()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const id = requestAnimationFrame(() => setMounted(true)); return () => cancelAnimationFrame(id) }, [])
  const mount = !reduce && mounted ? 'wn-hero-animate' : ''

  return (
    <section
      aria-labelledby="hero-heading"
      className="wn-grain-paper relative overflow-hidden !pt-[calc(72px+2.75rem)] pb-10 sm:!pt-[calc(72px+3.25rem)] sm:pb-16"
      style={{ background: '#FFC83D', color: '#111111' }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-[240px] w-[240px] rounded-full opacity-25 blur-[100px]" style={{ background: '#F13D32' }} />
        <div className="absolute right-0 top-1/3 h-[280px] w-[280px] rounded-full opacity-20 blur-[110px]" style={{ background: '#3D5AFE' }} />
      </div>
      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          {/* LEFT — headline */}
          <div className="lg:col-span-7">
            <div className={mount} style={{ animationDelay: '0ms' }}>
              <div className="flex flex-wrap items-center gap-3">
                <Sticker accent="#111111" textColor="#FFC83D" tilt="left">Branding &amp; Creative Agency</Sticker>
              </div>
            </div>
            <h1
              id="hero-heading"
              className={`${mount} mt-5 max-w-[16ch] font-editorial text-[clamp(2.25rem,6vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.02em]`}
              style={{ animationDelay: '60ms' }}
            >
              Branding and Creative Solutions That Make Businesses <span style={{ color: '#F13D32' }}><Underline>Stand Out</Underline></span>
            </h1>
            <p
              className={`${mount} mt-5 max-w-xl text-base leading-relaxed text-[#111111] opacity-85 sm:text-lg`}
              style={{ animationDelay: '120ms' }}
            >
              Build a memorable brand with strategic thinking, creative design, digital experiences, content, and campaigns created around your business, audience, and goals.
            </p>
            <div
              className={`${mount} mt-7 flex flex-col gap-3 sm:flex-row sm:items-center`}
              style={{ animationDelay: '180ms' }}
            >
              <CTAButton href="/book-strategy-call" icon={<Sparkles className="h-4 w-4" />} aria-label="Start your project">Start Your Project</CTAButton>
              <CTAButton href="/work" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />} aria-label="Explore our work">Explore Our Work</CTAButton>
            </div>
          </div>

          {/* RIGHT — specimen card with 4 creative pillars */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className={`relative ${mount}`} style={{ animationDelay: '240ms' }}>
              <div className="relative overflow-hidden rounded-[22px] border border-[rgba(17,17,17,0.16)] bg-[#FFFFFF] p-5 shadow-[0_10px_30px_-18px_rgba(17,17,17,0.25)]">
                <div className="absolute -right-3 -top-3 z-10"><IdeaStamp label="What an idea" size={88} color="#F13D32" /></div>
                <p className="wn-caption text-[#555255]">Specimen 01</p>
                <p className="mt-1 font-editorial text-2xl font-bold leading-none tracking-tight text-[#111111]">wat<span style={{ color: '#F13D32' }}>N</span>idea</p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-[#555255]">Branding &amp; Creative Agency</p>
                <div className="my-4 h-px bg-[rgba(17,17,17,0.12)]" />
                <p className="wn-caption text-[#555255]">Four creative pillars</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {[
                    { label: 'Brand', color: '#F13D32' },
                    { label: 'Digital', color: '#3D5AFE' },
                    { label: 'Content', color: '#7657F6' },
                    { label: 'Growth', color: '#157468' },
                  ].map((p, i) => (
                    <div key={p.label} className="flex items-center gap-2 rounded-lg border border-[rgba(17,17,17,0.10)] bg-[#FFF7E9] px-2.5 py-2.5 text-xs font-medium text-[#111111]">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded font-editorial text-[0.6rem] font-bold text-white" style={{ background: p.color }}>{i + 1}</span>
                      <span className="truncate">{p.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-[rgba(17,17,17,0.10)] pt-3">
                  <span className="font-editorial text-xs italic text-[#555255]">Identity with Soul. Strategy with Teeth.</span>
                </div>
              </div>
              <span aria-hidden className="wn-tape" style={{ left: '50%', top: '-10px', transform: 'translateX(-50%) rotate(-3deg)' }} />
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .wn-hero-animate {
            animation: wn-hero-fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
          }
          @keyframes wn-hero-fade-in-up {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>
    </section>
  )
}
