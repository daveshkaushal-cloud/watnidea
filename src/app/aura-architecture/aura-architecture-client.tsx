'use client'

/**
 * AuraArchitectureClient — client shell for the /aura-architecture route.
 *
 * Mirrors the home/about page shell structure (page.tsx / about/page.tsx):
 *   - Fixed background layers (LiquidChrome + ParticleField)
 *   - CustomCursor (desktop only)
 *   - Navbar
 *   - <main> with composed Aura sections
 *   - Footer (sticky bottom)
 *   - .wn-vignette + .wn-grain overlays
 *
 * CRITICAL: `overflow-clip` (NOT `overflow-hidden`) on the root wrapper.
 * The page uses sticky/pinned sections (Section 2, Section 5) —
 * `overflow: hidden` would make the wrapper a scroll container and break
 * sticky positioning (Task 10 fix).
 *
 * Sections 1–9 (Hero, Why Forgotten, What Is Aura, What We Build, Process,
 * Case Studies, Outcome, FAQ, Final CTA) all compose into this shell.
 *
 * This file is a client component so the parent `page.tsx` (server
 * component) can export `metadata`.
 */

import CustomCursor from '@/components/hero/custom-cursor'
import LiquidChrome from '@/components/hero/liquid-chrome'
import ParticleField from '@/components/hero/particle-field'
import Navbar from '@/components/hero/navbar'
import Footer from '@/components/hero/footer'
import AuraHero from '@/components/aura-architecture/section-1-hero'
import AuraWhyForgotten from '@/components/aura-architecture/section-2-why-forgotten'
import AuraWhatIs from '@/components/aura-architecture/section-3-what-is'
import AuraWhatWeBuild from '@/components/aura-architecture/section-4-what-we-build'
import AuraProcess from '@/components/aura-architecture/section-5-process'
import AuraCaseStudies from '@/components/aura-architecture/section-6-case-studies'
import AuraOutcome from '@/components/aura-architecture/section-7-outcome'
import AuraFaq from '@/components/aura-architecture/section-8-faq'
import AuraFinalCta from '@/components/aura-architecture/section-9-final-cta'

export default function AuraArchitectureClient() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-clip bg-[#050505] text-white">
      {/* Fixed background layers */}
      <LiquidChrome />
      <ParticleField />

      {/* Cursor (desktop only) */}
      <CustomCursor />

      {/* Top nav */}
      <Navbar />

      {/* Main */}
      <main className="relative z-40 flex flex-1 flex-col">
        <AuraHero />          {/* Section 1 */}
        <AuraWhyForgotten />  {/* Section 2 */}
        <AuraWhatIs />        {/* Section 3 */}
        <AuraWhatWeBuild />   {/* Section 4 */}
        <AuraProcess />       {/* Section 5 */}
        <AuraCaseStudies />   {/* Section 6 */}
        <AuraOutcome />       {/* Section 7 */}
        <AuraFaq />           {/* Section 8 */}
        <AuraFinalCta />      {/* Section 9 */}
      </main>

      {/* Sticky footer */}
      <Footer />

      {/* Overlays */}
      <div className="wn-vignette" />
      <div className="wn-grain" />
    </div>
  )
}
