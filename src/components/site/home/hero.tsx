'use client'

import Image from 'next/image'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { Container, CTAButton } from '@/components/site/primitives'

const SERVICES = [
  ['01', 'Brand Identity', '#F13D32'],
  ['02', 'Web Experiences', '#3D5AFE'],
  ['03', 'Social Systems', '#C8F542'],
  ['04', 'Video Stories', '#F97316'],
  ['05', 'Performance', '#66DFC0'],
  ['06', 'AI Creative', '#7657F6'],
  ['07', 'AEO + SEO', '#FFC83D'],
] as const

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="wn-grain-paper relative overflow-hidden border-b border-black/10 bg-[#FFC83D] !pt-[calc(72px+2.5rem)] pb-0 sm:!pt-[calc(72px+3.5rem)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-[#F13D32] opacity-20 blur-[100px]" />
        <div className="absolute right-[-8%] top-[-12%] h-[62%] w-[48%] rotate-[8deg] rounded-[80px] bg-[#7657F6]" />
        <div className="absolute bottom-[-22%] right-[23%] h-80 w-80 rounded-full bg-[#66DFC0]" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rotate-12 rounded-[60px] bg-[#F97316] opacity-85" />
      </div>

      <Container className="relative">
        <div className="grid min-h-[690px] grid-cols-1 items-center gap-8 pb-12 lg:grid-cols-12 lg:gap-10 lg:pb-14">
          <div className="relative z-30 lg:col-span-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rotate-[-2deg] rounded-full bg-[#111111] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_4px_0_#F13D32]">
                watNidea · The Identity Lab
              </span>
              <span className="rounded-full border border-black/15 bg-[#FFF7E9]/75 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.13em] text-[#111111] backdrop-blur-sm">
                Strategy × Creativity × Growth
              </span>
            </div>

            <h1
              id="hero-heading"
              className="mt-6 max-w-[11ch] font-editorial text-[clamp(3.35rem,6.1vw,6.4rem)] font-medium leading-[0.9] tracking-[-0.055em] text-[#111111]"
            >
              A{' '}
              <strong className="font-semibold">
                Branding and Marketing Agency
              </strong>{' '}
              with ideas that{' '}
              <span className="relative inline-block text-[#F13D32]">
                echo.
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 h-[8px] w-full rounded-full bg-[#F13D32]"
                />
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base font-medium leading-relaxed text-[#302D28] sm:text-lg">
              We connect brand, digital, content, media and AI into creative
              systems that look distinctive, communicate clearly and keep
              working after the first impression.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CTAButton
                href="/book-strategy-call"
                icon={<Sparkles className="h-4 w-4" />}
                aria-label="Start a project with watNidea"
              >
                Start Your Project
              </CTAButton>
              <CTAButton
                href="/work"
                variant="secondary"
                icon={<ArrowUpRight className="h-4 w-4" />}
                aria-label="Explore watNidea work"
              >
                Enter the Work
              </CTAButton>
            </div>
          </div>

          <div className="relative z-20 lg:col-span-6">
            <div className="relative mx-auto h-[500px] max-w-[680px] sm:h-[570px]">
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/50 sm:h-[500px] sm:w-[500px]"
              />
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35 sm:h-[400px] sm:w-[400px]"
              />

              <div className="hero-float-slow absolute left-1/2 top-1/2 z-10 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-[8px] border-[#FFF7E9] bg-[#111111] shadow-[0_30px_80px_-30px_rgba(17,17,17,0.75)] sm:h-[350px] sm:w-[350px]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="watNidea AI-assisted creative film"
                  className="absolute inset-0 h-full w-full object-contain p-5 sm:p-7"
                >
                  <source
                    src="/watnidea-ai-campaign-loop-1600x1000.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video element.
                </video>

                <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center">
                  <span className="rounded-full bg-[#111111]/90 px-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white shadow-lg backdrop-blur-sm">
                    watNidea · AI Creative Reel
                  </span>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/25" />
              </div>

              <div className="hero-float-fast absolute left-0 top-7 z-20 h-[190px] w-[120px] rotate-[-8deg] overflow-hidden rounded-full border-[6px] border-[#FFF7E9] bg-white shadow-[0_18px_45px_-22px_rgba(17,17,17,0.65)] sm:left-3 sm:h-[230px] sm:w-[145px]">
                <Image
                  src="/work/highway-hub-showcase.webp"
                  alt="Website experience by watNidea"
                  fill
                  priority
                  sizes="150px"
                  className="object-cover"
                />
              </div>

              <div className="hero-float-medium absolute bottom-3 right-0 z-20 h-[150px] w-[185px] rotate-[7deg] overflow-hidden rounded-[42px] border-[6px] border-[#FFF7E9] bg-white shadow-[0_18px_45px_-22px_rgba(17,17,17,0.65)] sm:bottom-5 sm:right-2 sm:h-[180px] sm:w-[225px]">
                <Image
                  src="/project-branding.webp"
                  alt="Brand identity work by watNidea"
                  fill
                  priority
                  sizes="230px"
                  className="object-cover"
                />
              </div>

              <div className="hero-float-fast absolute bottom-8 left-2 z-20 h-[105px] w-[190px] rotate-[-5deg] overflow-hidden rounded-[24px] border-[6px] border-[#FFF7E9] bg-white shadow-[0_18px_45px_-22px_rgba(17,17,17,0.65)] sm:bottom-10 sm:left-6 sm:h-[120px] sm:w-[225px]">
                <Image
                  src="/project-social-campaign.webp"
                  alt="Social campaign creative by watNidea"
                  fill
                  sizes="230px"
                  className="object-cover"
                />
              </div>

              <div className="absolute left-1/2 top-[88%] z-30 -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] whitespace-nowrap rounded-full bg-[#C8F542] px-5 py-3 text-center text-xs font-black uppercase tracking-[0.14em] text-[#111111] shadow-[0_4px_0_#111111]">
                What an idea!
              </div>

              <span className="absolute right-5 top-8 z-30 rotate-[6deg] rounded-full bg-[#F13D32] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-wider text-white shadow-[0_3px_0_#111111]">
                Brand with soul
              </span>
              <span className="absolute right-0 top-[42%] z-30 rotate-[-3deg] rounded-full bg-[#FFC83D] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-wider text-[#111111] shadow-[0_3px_0_#111111]">
                Strategy with teeth
              </span>
              <span className="absolute left-[34%] top-3 z-30 rotate-[-5deg] rounded-full bg-[#66DFC0] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-wider text-[#111111] shadow-[0_3px_0_#111111]">
                Built to move
              </span>
            </div>
          </div>
        </div>
      </Container>

      <div className="relative z-30 border-y border-black/10 bg-[#FFF7E9]">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
          {SERVICES.map(([number, label, color]) => (
            <div
              key={number}
              className="group flex min-h-[74px] items-center gap-3 border-b border-r border-black/10 px-4 py-3 last:border-r-0 sm:border-b-0"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.62rem] font-black"
                style={{
                  background: color,
                  color:
                    color === '#C8F542' ||
                    color === '#FFC83D' ||
                    color === '#66DFC0'
                      ? '#111111'
                      : '#FFFFFF',
                }}
              >
                {number}
              </span>
              <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#302D28]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .hero-float-slow {
            animation: hero-float-slow 6.5s ease-in-out infinite;
          }
          .hero-float-medium {
            animation: hero-float-medium 5.5s ease-in-out infinite;
          }
          .hero-float-fast {
            animation: hero-float-fast 4.5s ease-in-out infinite;
          }
          @keyframes hero-float-slow {
            0%, 100% { transform: translate(-50%, -50%) translateY(0); }
            50% { transform: translate(-50%, -50%) translateY(-10px); }
          }
          @keyframes hero-float-medium {
            0%, 100% { transform: rotate(7deg) translateY(0); }
            50% { transform: rotate(4deg) translateY(-12px); }
          }
          @keyframes hero-float-fast {
            0%, 100% { translate: 0 0; }
            50% { translate: 0 -10px; }
          }
        }
      `}</style>
    </section>
  )
}
