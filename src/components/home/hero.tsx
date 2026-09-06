"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { useRef } from "react";

import { Squiggle } from "@/components/icons";
import { RollingText } from "@/components/gsap/rolling-text";
import { useHeroAnimation } from "@/components/gsap/use-hero-animation";
import { useI18n } from "@/i18n";

export default function Hero() {
  const { dict, isRTL } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLDivElement>(null);

  useHeroAnimation({
    sectionRef,
    heroRef,
    imageRef,
    badgeRef,
    titleRef,
    descriptionRef,
    buttonsRef,
    trustRef,
    mobileButtonRef,
  });

  return (
    <section
      ref={sectionRef}
      className="w-screen max-w-full overflow-hidden px-[10px] py-[10px]"
    >
      <div
        ref={heroRef}
        className="relative flex min-h-[85svh] items-center overflow-hidden rounded-[40px] bg-ink will-change-[clip-path,transform] sm:min-h-[calc(100svh-96px)]"
      >
        {/* Background photo */}
        <div
          ref={imageRef}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/images/hero-wide.jpg"
            alt={dict.common.brandName}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Overlays - rich cinematic dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Brand color grade */}
        <div className="pointer-events-none absolute inset-0 mix-blend-screen bg-gradient-to-br from-tutor-500/25 via-transparent to-student-500/20" />
        <div className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-gradient-to-t from-tutor-700/25 via-transparent to-parent-500/15" />

        {/* Brand glows */}
        <div
          data-parallax="-0.2"
          className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-tutor-500/35 blur-[110px]"
        />

        <div
          data-parallax="0.25"
          className="pointer-events-none absolute bottom-0 right-10 h-80 w-80 rounded-full bg-student-500/30 blur-[130px]"
        />

        {/* Main content */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start px-6 pb-28 pt-14 sm:px-10 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md shadow-sm"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-student-400" />
              <span className="font-brand uppercase tracking-[0.14em] text-tutor-200">
                {dict.common.tagline}
              </span>
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="text-[clamp(2.5rem,6.5vw,4.8rem)] font-extrabold leading-[1.04] text-white"
            >
              {dict.hero.titlePrefix}{" "}
              <span className="relative inline-block font-brand text-tutor-300">
                {dict.hero.highlight}
                <Squiggle className="absolute -bottom-2 left-0 h-3.5 w-full text-student-500" />
              </span>{" "}
              {dict.hero.titleSuffix}
            </h1>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/90 sm:text-[19px]"
            >
              {dict.hero.description}
            </p>

            {/* Desktop buttons */}
            <div
              ref={buttonsRef}
              className="mt-8 hidden flex-wrap items-center gap-4 sm:flex"
            >
              {/* Trouver un prof */}
              <div className="group flex gap-1">
                <Link
                  href="/contact"
                  className="inline-flex h-16 items-center gap-3 rounded-full bg-tutor-500 px-10 text-[17px] font-bold text-white transition-all duration-300 hover:bg-tutor-600 hover:shadow-lg hover:shadow-tutor-500/25"
                >
                  <RollingText text={dict.hero.btnFind} />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-tutor-500 text-white transition-all duration-300 hover:bg-tutor-600 hover:shadow-lg hover:shadow-tutor-500/25"
                  aria-label={dict.hero.btnFind}
                >
                  <ArrowRight className={`h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </div>

              {/* Devenir enseignant */}
              <div className="group flex gap-1">
                <Link
                  href="/comment-ca-marche/profs"
                  className="inline-flex h-16 items-center rounded-full border border-white/30 bg-white/95 px-8 text-[15px] font-bold text-ink backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-lg"
                >
                  <RollingText text={dict.hero.btnBecome} />
                </Link>

                <Link
                  href="/comment-ca-marche/profs"
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/95 text-ink backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-lg"
                  aria-label={dict.hero.btnBecome}
                >
                  <ArrowRight className={`h-5 w-5 text-ink transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </div>
            </div>

            {/* Trust strip */}
            <div
              ref={trustRef}
              className="mt-8 hidden flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-white/15 pt-6 sm:flex"
            >
              {dict.hero.trustList.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-white/85"
                >
                  <BadgeCheck className="h-4 w-4 shrink-0 text-student-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile buttons group */}
        <div
          ref={mobileButtonRef}
          className="absolute bottom-6 left-1/2 z-20 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col gap-2.5 sm:hidden"
        >
          <Link
            href="/contact"
            className="group flex h-13 w-full items-center justify-center gap-2 rounded-full bg-tutor-500 px-6 text-sm font-bold text-white shadow-lg shadow-tutor-500/30 active:scale-[0.98]"
          >
            <RollingText text={dict.hero.btnFind} />
            <ArrowRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
          </Link>

          <Link
            href="/comment-ca-marche/profs"
            className="flex h-12 w-full items-center justify-center rounded-full border border-white/30 bg-white/90 px-6 text-xs font-bold text-ink backdrop-blur-md active:scale-[0.98]"
          >
            <RollingText text={dict.hero.btnBecome} />
          </Link>
        </div>
      </div>
    </section>
  );
}