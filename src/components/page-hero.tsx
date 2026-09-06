"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Squiggle } from "./icons";
import type { Tone } from "./ui";
import { useI18n } from "@/i18n";

const CHIP: Record<Tone, string> = {
  student: "bg-student-500/90 text-white",
  tutor: "bg-tutor-500/90 text-white",
  parent: "bg-parent-500/90 text-white",
  ink: "bg-white/15 text-white",
};

const SQUIGGLE: Record<Tone, string> = {
  student: "text-student-400",
  tutor: "text-tutor-300",
  parent: "text-parent-300",
  ink: "text-white/50",
};

export type Crumb = { label: string; href?: string };

export default function PageHero({
  eyebrow,
  title,
  highlight,
  sub,
  tone = "student",
  image = "/images/hero-wide.jpg",
  imageAlt = "INCLASS — cours particuliers au Maroc",
  crumbs = [],
  children,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  sub?: string;
  tone?: Tone;
  image?: string;
  imageAlt?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  const { dict, isRTL } = useI18n();

  return (
    <section className="w-screen max-w-full overflow-hidden px-[10px] py-[10px]">
      <div className="relative flex min-h-[54vh] items-center overflow-hidden rounded-[40px] bg-ink">
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink/85" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-16 text-center sm:px-10 sm:py-20">
          {/* Breadcrumb */}
          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-7 flex justify-center">
              <ol className="flex flex-wrap items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[13px] text-white/70 backdrop-blur-md">
                <li>
                  <Link href="/" className="transition-colors hover:text-white">
                    {dict.nav.home}
                  </Link>
                </li>
                {crumbs.map((crumb, i) => (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    <ChevronRight className={`h-3.5 w-3.5 opacity-50 ${isRTL ? "rotate-180" : ""}`} />
                    {crumb.href && i < crumbs.length - 1 ? (
                      <Link href={crumb.href} className="transition-colors hover:text-white">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="font-semibold text-white">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="inline-block">
            <span
              className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] backdrop-blur-md ${CHIP[tone]}`}
            >
              {eyebrow}
            </span>
          </div>

          <h1 className="mt-6 text-[clamp(2.2rem,5.4vw,4rem)] font-extrabold leading-[1.02] text-white">
            {title}
            {highlight ? (
              <span className="relative ms-2 inline-block">
                {highlight}
                <Squiggle className={`absolute -bottom-2 left-0 h-3.5 w-full ${SQUIGGLE[tone]}`} />
              </span>
            ) : null}
          </h1>

          {sub ? (
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/80">
              {sub}
            </p>
          ) : null}

          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
