"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";

import { Squiggle } from "@/components/icons";
import { RollingText } from "@/components/gsap/rolling-text";
import { useI18n } from "@/i18n";

export default function Hero() {
  const { dict, isRTL } = useI18n();

  return (
    <section className="w-full max-w-full overflow-hidden px-[10px] py-[10px]">
      <div className="relative flex min-h-[83svh] items-center overflow-hidden rounded-[40px] bg-ink sm:min-h-[calc(100svh-96px)]">
        {/* Background photo */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-wide.jpg"
            alt={dict.common.brandName}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Overlays - clean dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Brand color grade */}
        <div className="pointer-events-none absolute inset-0 mix-blend-screen bg-gradient-to-br from-tutor-500/25 via-transparent to-student-500/20" />
        <div className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-gradient-to-t from-tutor-700/25 via-transparent to-parent-500/15" />

        {/* Main content */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start px-5 pb-10 pt-14 sm:px-10 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tutor-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-tutor-300" />
              </span>
              <span className="font-brand uppercase tracking-[0.14em] text-tutor-200">
                {dict.common.tagline}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[clamp(2.35rem,6.5vw,4.8rem)] font-extrabold leading-[1.04] tracking-[-0.02em] text-white">
              {dict.hero.titlePrefix}{" "}
              <span className="relative inline-block font-brand text-tutor-300">
                {dict.hero.highlight}
                <Squiggle className="absolute -bottom-2 left-0 h-3.5 w-full text-student-500" />
              </span>{" "}
              {dict.hero.titleSuffix}
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/90 sm:mt-6 sm:text-[19px]">
              {dict.hero.description}
            </p>

            {/* Mobile buttons */}
            <div className="mt-6 flex w-full max-w-sm flex-col gap-2.5 sm:hidden">
              <Link
                href="/contact"
                className="btn-duo group flex h-13 w-full items-center justify-center gap-2 rounded-2xl px-6 text-sm font-extrabold"
              >
                <RollingText text={dict.hero.btnFind} />
                <ArrowRight className={`h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
              </Link>

              <Link
                href="/comment-ca-marche/profs"
                className="btn-duo btn-duo-white flex h-12 w-full items-center justify-center rounded-2xl px-6 text-xs font-extrabold"
              >
                <RollingText text={dict.hero.btnBecome} />
              </Link>
            </div>

            {/* Trust strip (mobile) */}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/15 pt-5 sm:hidden">
              {dict.hero.trustList.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white/85"
                >
                  <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-tutor-400" />
                  {item}
                </span>
              ))}
            </div>

            {/* Desktop buttons */}
            <div className="mt-8 hidden flex-wrap items-center gap-4 sm:flex">
              {/* Trouver un prof */}
              <div className="group flex gap-2">
                <Link
                  href="/contact"
                  className="btn-duo h-16 items-center gap-3 rounded-2xl px-8 text-[17px] font-extrabold"
                >
                  <RollingText text={dict.hero.btnFind} />
                </Link>

                <Link
                  href="/contact"
                  className="btn-duo h-16 w-16 items-center justify-center rounded-2xl"
                  aria-label={dict.hero.btnFind}
                >
                  <ArrowRight className={`h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </div>

              {/* Devenir enseignant */}
              <div className="group flex gap-2">
                <Link
                  href="/comment-ca-marche/profs"
                  className="btn-duo btn-duo-white h-16 items-center rounded-2xl px-7 text-[15px] font-extrabold"
                >
                  <RollingText text={dict.hero.btnBecome} />
                </Link>

                <Link
                  href="/comment-ca-marche/profs"
                  className="btn-duo btn-duo-white h-16 w-16 items-center justify-center rounded-2xl"
                  aria-label={dict.hero.btnBecome}
                >
                  <ArrowRight className={`h-5 w-5 text-ink transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </div>
            </div>

            {/* Trust strip */}
            <div className="mt-8 hidden flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-white/15 pt-6 sm:flex">
              {dict.hero.trustList.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-white/85"
                >
                  <BadgeCheck className="h-4 w-4 shrink-0 text-tutor-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
