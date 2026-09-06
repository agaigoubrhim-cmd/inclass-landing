"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck, Clock3, MapPin, MessagesSquare, Users, Video, Home as HomeIcon, ChevronDown, Plus, Minus, MessageCircle, HelpCircle, ArrowRight,
} from "lucide-react";
import { CITIES, STATS } from "@/content/site";
import { Btn, Eyebrow, Rating, SectionHead, type Tone } from "./ui";
import {
  SearchAnimatedIcon,
  UsersAnimatedIcon,
  CalendarAnimatedIcon,
  TrendingAnimatedIcon,
  ProfileAnimatedIcon,
  ShieldAnimatedIcon,
  InboxAnimatedIcon,
  WalletAnimatedIcon,
  AcademicCapAnimatedIcon,
  RocketAnimatedIcon,
  WhatsAppIcon,
} from "./icons";
import type { Tutor } from "@/db/schema";
import { RollingNumber } from "@/components/gsap/rolling-number";
import { RollingText } from "@/components/gsap/rolling-text";
import { useI18n } from "@/i18n";

const STEP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  search: SearchAnimatedIcon,
  users: UsersAnimatedIcon,
  calendar: CalendarAnimatedIcon,
  trending: TrendingAnimatedIcon,
  profile: ProfileAnimatedIcon,
  shield: ShieldAnimatedIcon,
  inbox: InboxAnimatedIcon,
  wallet: WalletAnimatedIcon,
  cap: AcademicCapAnimatedIcon,
  rocket: RocketAnimatedIcon,
};

const STAT_ACCENTS = [
  { dot: "bg-tutor-500", ring: "ring-tutor-500/20", label: "text-tutor-700 dark:text-tutor-300" },
  { dot: "bg-student-500", ring: "ring-student-500/20", label: "text-student-700 dark:text-student-300" },
  { dot: "bg-parent-500", ring: "ring-parent-500/20", label: "text-parent-700 dark:text-parent-300" },
  { dot: "bg-student-500", ring: "ring-student-500/20", label: "text-student-700 dark:text-student-300" },
  { dot: "bg-tutor-500", ring: "ring-tutor-500/20", label: "text-tutor-700 dark:text-tutor-300" },
];

export function StatsBar() {
  const { dict } = useI18n();

  const localizedStats = [
    { value: "12 400+", label: dict.common.verifiedTutors },
    { value: "85 000+", label: dict.common.lessonsGiven },
    { value: "48", label: dict.common.subjectsCovered },
    { value: "32", label: dict.common.citiesInMorocco },
    { value: "4,9 ★", label: dict.common.avgRating },
  ];

  return (
    <section className="relative overflow-hidden border-y border-line/70 bg-white/60 py-10 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.02]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tutor-300/60 to-transparent dark:via-tutor-500/50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-student-300/60 to-transparent dark:via-student-500/50" />

      <div
        data-anim-stagger
        className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-6 sm:px-6 md:grid-cols-5 lg:gap-4 lg:px-8"
      >
        {localizedStats.map((stat, i) => {
          const accent = STAT_ACCENTS[i % STAT_ACCENTS.length];
          const isLast = i === localizedStats.length - 1;
          return (
            <div
              key={stat.label}
              data-anim-child
              className={`relative overflow-hidden rounded-3xl border border-line/80 bg-white/80 px-4 py-5 text-center ring-1 ${accent.ring} transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-ink-800/60 ${isLast ? "col-span-2 md:col-span-1" : ""}`}
            >
              {/* Top accent strip */}
              <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent ${accent.dot.replace("bg-", "text-")}`} />
              <span className={`absolute left-4 top-4 h-2 w-2 rounded-full ${accent.dot} opacity-80`} />
              <p className="font-brand text-[clamp(1.7rem,3.2vw,2.35rem)] font-extrabold leading-none text-ink dark:text-white">
                <RollingNumber targetNumber={stat.value} height={40} />
              </p>

              <p className={`mt-2 text-[13px] font-bold ${accent.label}`}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export { AudienceCards } from "./audience-cards";

const DEFAULT_STEP_IMAGES = [
  "/images/hero-student.jpg",
  "/images/lesson-home.jpg",
  "/images/hero-wide.jpg",
  "/images/become-tutor.jpg",
  "/images/parents.jpg",
  "/images/hero-tutor.jpg",
  "/images/banner-resources.jpg",
];

export function StepsSection({
  steps,
  tone = "student",
  eyebrow,
  title,
  highlight,
  sub,
}: {
  steps: { title: string; body: string; icon: string; image?: string }[];
  tone?: Tone;
  eyebrow: string;
  title: string;
  highlight?: string;
  sub?: string;
}) {
  const { isRTL } = useI18n();
  const [activeStep, setActiveStep] = useState(0);

  const numberCls: Record<Tone, string> = {
    student: "bg-student-600 text-student-50",
    tutor: "bg-tutor-600 text-tutor-50",
    parent: "bg-parent-600 text-parent-50",
    ink: "bg-ink text-cream dark:bg-white dark:text-ink",
  };

  const stepWord = isRTL ? "خطوة" : "Étape";
  const ofWord = isRTL ? "من" : "sur";

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHead eyebrow={eyebrow} title={title} highlight={highlight} sub={sub} tone={tone} />

      {/* Desktop / Tablet: Horizontal Expanding Cards Slider */}
      <div data-anim="up" className="mt-14 hidden md:flex h-[460px] lg:h-[490px] w-full gap-3 overflow-hidden rounded-[36px] border border-line bg-sand/30 p-3 dark:border-white/10 dark:bg-ink-900/50">
        {steps.map((step, i) => {
          const isActive = activeStep === i;
          const Icon = STEP_ICONS[step.icon] ?? SearchAnimatedIcon;
          const stepImg = step.image || DEFAULT_STEP_IMAGES[i % DEFAULT_STEP_IMAGES.length];
          const stepNumber = String(i + 1).padStart(2, "0");
          const cleanTitle = step.title.replace(/^\d+\.\s*/, "");

          if (isActive) {
            return (
              <div
                key={step.title}
                className="group relative flex-[4.5] overflow-hidden rounded-[28px] p-8 text-white transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between"
              >
                {/* Background image & gradient overlay */}
                <Image
                  src={stepImg}
                  alt={cleanTitle}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/65 to-ink/25 dark:from-black/95 dark:via-black/75 dark:to-black/35" />

                {/* Top Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest ${numberCls[tone]} backdrop-blur-md`}
                  >
                    <span>{stepWord} {stepNumber}</span>
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/25 text-white">
                    <Icon className="h-7 w-7 text-white" />
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 max-w-xl space-y-3">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-cream/70">
                    {stepWord} {i + 1} {ofWord} {steps.length}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-cream/90">
                    {step.body}
                  </p>
                </div>
              </div>
            );
          }

          {/* Folded / Collapsed Card */}
          return (
            <div
              key={step.title}
              onMouseEnter={() => setActiveStep(i)}
              onClick={() => setActiveStep(i)}
              onFocus={() => setActiveStep(i)}
              tabIndex={0}
              role="button"
              aria-label={`${stepWord} ${i + 1}: ${cleanTitle}`}
              className="group relative flex-[0.7] overflow-hidden rounded-[28px] border border-line bg-white/90 p-4 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-student-400 hover:bg-white dark:border-white/10 dark:bg-ink-800/90 dark:hover:bg-ink-800 dark:hover:border-student-500/50 cursor-pointer flex flex-col items-center justify-between"
            >
              {/* Top: Step number & Icon */}
              <div className="flex flex-col items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-sand text-xs font-extrabold text-ink dark:bg-white/10 dark:text-white group-hover:scale-110 transition-transform">
                  {stepNumber}
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-sand/60 dark:bg-white/5 text-ink-soft dark:text-white/60 group-hover:text-ink dark:group-hover:text-white transition-all">
                  <Icon className="h-6 w-6" />
                </span>
              </div>

              {/* Middle: Vertical Title */}
              <div className="my-auto py-4">
                <span className="block [writing-mode:vertical-rl] rotate-180 text-xs sm:text-sm font-extrabold tracking-wider uppercase text-ink-soft dark:text-white/70 group-hover:text-ink dark:group-hover:text-white transition-colors select-none line-clamp-1">
                  {cleanTitle}
                </span>
              </div>

              {/* Bottom indicator dot */}
              <div className="h-2 w-2 rounded-full bg-line group-hover:bg-student-500 transition-colors dark:bg-white/20" />
            </div>
          );
        })}
      </div>

      {/* Mobile: Interactive Stack & Tap-to-expand */}
      <div className="mt-8 flex flex-col gap-3 md:hidden">
        {steps.map((step, i) => {
          const isActive = activeStep === i;
          const Icon = STEP_ICONS[step.icon] ?? SearchAnimatedIcon;
          const stepImg = step.image || DEFAULT_STEP_IMAGES[i % DEFAULT_STEP_IMAGES.length];
          const stepNumber = String(i + 1).padStart(2, "0");
          const cleanTitle = step.title.replace(/^\d+\.\s*/, "");

          if (isActive) {
            return (
              <div
                key={step.title}
                className="relative overflow-hidden rounded-[28px] p-6 text-white min-h-[320px] flex flex-col justify-between"
              >
                <Image
                  src={stepImg}
                  alt={cleanTitle}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/70 to-ink/35" />

                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-extrabold uppercase ${numberCls[tone]}`}
                  >
                    {stepWord} {stepNumber}
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 backdrop-blur-md text-white">
                    <Icon className="h-6 w-6 text-white" />
                  </span>
                </div>

                <div className="relative z-10 space-y-2 mt-12">
                  <h3 className="text-xl font-extrabold text-white leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-cream/90 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            );
          }

          return (
            <button
              key={step.title}
              type="button"
              onClick={() => setActiveStep(i)}
              className="flex w-full items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 text-left transition-all hover:bg-sand/30 dark:border-white/10 dark:bg-ink-800"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sand text-xs font-bold text-ink dark:bg-white/10 dark:text-white">
                  {stepNumber}
                </span>
                <Icon className="h-5 w-5 shrink-0 text-ink-soft dark:text-white/60" />
                <span className="min-w-0 truncate text-sm font-bold text-ink dark:text-white">
                  {cleanTitle}
                </span>
              </div>
              <span className="shrink-0 text-xs font-semibold text-student-600 dark:text-student-400">
                →
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function GuaranteeBand() {
  const { dict } = useI18n();

  const guaranteesList = [
    { title: dict.guarantees.g1Title, body: dict.guarantees.g1Body, icon: AcademicCapAnimatedIcon },
    { title: dict.guarantees.g2Title, body: dict.guarantees.g2Body, icon: ShieldAnimatedIcon },
    { title: dict.guarantees.g3Title, body: dict.guarantees.g3Body, icon: WalletAnimatedIcon },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-ink-900 via-ink-800 to-ink-950 border border-white/10 px-5 py-12 text-student-50 sm:rounded-[40px] sm:px-8 sm:py-16">
      {/* Decorative brand glows */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <div data-anim="up" className="mb-5 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-student-100 backdrop-blur-md">
            <ShieldAnimatedIcon className="h-4 w-4" />
            {dict.megaMenu.guaranteeBadge}
          </span>
        </div>
        <h2
          data-anim="up"
          className="text-center text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-tight text-white"
        >
          {dict.megaMenu.guaranteeTitle}
        </h2>
        <p data-anim="up" data-anim-delay="0.06" className="mt-4 text-center text-student-100 max-w-2xl mx-auto">
          {dict.megaMenu.guaranteeDesc}
        </p>
        <div data-anim-stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {guaranteesList.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.title}
                data-anim-child
                className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
              >
                <Icon className="h-9 w-9" />
                <h3 className="mt-4 text-lg font-bold text-white">{g.title}</h3>
                <p className="mt-2 text-sm text-student-100/90 leading-relaxed">{g.body}</p>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}

export function HowItWorksTeaser() {
  const { dict } = useI18n();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHead
        eyebrow={dict.audiences.studentKicker}
        title={dict.audiences.studentTitle}
        highlight={dict.common.brandName}
        sub={dict.audiences.studentBody}
      />
      <div className="mt-12 text-center">
        <Link
          href="/comment-ca-marche/eleves"
          className="btn-duo inline-flex h-12 items-center gap-2 rounded-2xl px-7 font-extrabold"
        >
          <RollingText text={dict.audiences.studentCta} />
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

export function BecomeTutorBand() {
  const { dict, isRTL } = useI18n();

  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-gradient-to-r from-tutor-700 via-tutor-600 to-tutor-500 px-5 py-12 text-white sm:rounded-[36px] sm:px-12 sm:py-16">
      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] items-center">
        <div>
          <span className="inline-flex rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            {dict.audiences.tutorKicker}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-tight">
            {dict.audiences.tutorTitle}
          </h2>
          <p className="mt-3 text-base text-tutor-100/90 leading-relaxed max-w-xl">
            {dict.audiences.tutorBody}
          </p>
          <ul className="mt-6 space-y-2.5">
            {dict.audiences.tutorBullets.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-medium">
                <BadgeCheck className="h-5 w-5 text-tutor-200 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col justify-center">
          <Link
            href="/comment-ca-marche/profs"
            className="btn-duo btn-duo-white group flex h-13 items-center justify-center gap-2 rounded-2xl px-7 font-extrabold"
          >
            <RollingText text={dict.audiences.tutorCta} />
            <ArrowRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
          <Link
            href="/contact?subject=Recrutement%20Professeur"
            className="flex h-13 items-center justify-center gap-2 rounded-2xl border-2 border-white/40 bg-transparent px-7 font-extrabold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
          >
            {dict.common.contactAdvisor}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ParentsBand() {
  const { dict, isRTL } = useI18n();

  return (
    <section className="relative overflow-hidden bg-parent-50 py-16 dark:bg-parent-950/30 dark:border-y dark:border-parent-500/10 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-parent-200/70 bg-white/70 p-5 backdrop-blur-sm sm:rounded-[36px] sm:p-8 lg:p-10 dark:border-parent-500/15 dark:bg-white/[0.02]">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <span className="inline-flex rounded-full bg-parent-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-parent-800 dark:bg-parent-950 dark:text-parent-300">
              {dict.audiences.parentKicker}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink dark:text-white leading-tight">
              {dict.audiences.parentTitle}
            </h2>
            <p className="mt-3 text-base text-ink-soft dark:text-white/75 leading-relaxed">
              {dict.audiences.parentBody}
            </p>
            <ul className="mt-6 space-y-3">
              {dict.audiences.parentBullets.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-semibold text-ink dark:text-white">
                  <BadgeCheck className="h-5 w-5 text-parent-600 dark:text-parent-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/comment-ca-marche/eleves#parents"
                className="btn-duo group inline-flex h-12 items-center gap-2 rounded-2xl px-7 font-extrabold"
              >
                <RollingText text={dict.audiences.parentCta} />
                <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/contact"
                className="btn-duo btn-duo-white group inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-6 font-extrabold"
              >
                {dict.common.contactAdvisor}
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src="/images/parents.jpg"
              alt={dict.audiences.parentTitle}
              width={700}
              height={500}
              className="h-[380px] w-full object-cover"
            />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection({
  testimonials = [],
}: {
  testimonials?: Array<{
    authorName: string;
    authorRole: string;
    city: string;
    quote: string;
    detail: string;
    rating: number;
  }>;
}) {
  const { dict } = useI18n();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHead
        eyebrow="Témoignages"
        title="Ils progressent avec"
        highlight={dict.common.brandName}
        sub="Retours d'expérience d'élèves, de parents et d'enseignants partout au Maroc."
      />
      <div data-anim-stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            data-anim-child
            className="flex flex-col justify-between rounded-3xl border border-line bg-white p-6 dark:border-white/10 dark:bg-ink-800"
          >
            <div>
              <Rating value={t.rating} />
              <p className="mt-4 text-sm leading-relaxed text-ink-soft dark:text-white/80 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
            <div className="mt-6 border-t border-line/70 pt-4 dark:border-white/10">
              <p className="text-sm font-bold text-ink dark:text-white">{t.authorName}</p>
              <p className="text-xs text-ink-soft dark:text-white/50">{t.detail} · {t.city}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export { TutorCard, TutorCards } from "./tutor-cards";

export function CitiesMarquee() {
  const { dict } = useI18n();
  const row = [...CITIES, ...CITIES];
  return (
    <section className="overflow-hidden border-y border-line bg-sand py-6 dark:border-white/10 dark:bg-ink-950">
      <div className="flex w-max marquee-track gap-4 pl-4">
        {row.map((city, i) => (
          <Link
            key={`${city}-${i}`}
            href={`/contact?city=${encodeURIComponent(city)}`}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-student-50 dark:border-white/10 dark:bg-ink-800 dark:text-white dark:hover:bg-student-950/60"
          >
            <MapPin className="h-4 w-4 text-student-500" />
            <span>{dict.footer.tutorInCity} {city}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function FaqAccordion({
  items,
  tone = "student",
}: {
  items?: { q: string; a: string }[];
  tone?: Tone;
}) {
  const { dict } = useI18n();
  const list = items || dict.faq.items;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const badgeCls: Record<Tone, string> = {
    student: "bg-student-100 text-student-700 dark:bg-student-950/80 dark:text-student-300",
    tutor: "bg-tutor-100 text-tutor-700 dark:bg-tutor-950/80 dark:text-tutor-300",
    parent: "bg-parent-100 text-parent-700 dark:bg-parent-950/80 dark:text-parent-300",
    ink: "bg-sand text-ink dark:bg-white/10 dark:text-white",
  };

  const activeBorderCls: Record<Tone, string> = {
    student: "border-student-300 dark:border-student-500/40 ring-1 ring-student-500/15",
    tutor: "border-tutor-300 dark:border-tutor-500/40 ring-1 ring-tutor-500/15",
    parent: "border-parent-300 dark:border-parent-500/40 ring-1 ring-parent-500/15",
    ink: "border-ink/40 dark:border-white/30",
  };

  const buttonCls: Record<Tone, string> = {
    student: "bg-student-600 text-white",
    tutor: "bg-tutor-600 text-white",
    parent: "bg-parent-600 text-white",
    ink: "bg-ink text-white dark:bg-white dark:text-ink",
  };

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {list.map((item, idx) => {
        const isOpen = openIndex === idx;
        const num = String(idx + 1).padStart(2, "0");

        return (
          <div
            key={item.q}
            data-anim-child
            className={`overflow-hidden rounded-[24px] border bg-white transition-all duration-300 dark:bg-ink-800/90 ${
              isOpen
                ? `${activeBorderCls[tone]} bg-white dark:bg-ink-800`
                : "border-line/90 hover:border-line dark:border-white/10 dark:hover:border-white/20"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs font-extrabold ${badgeCls[tone]}`}
                >
                  {num}
                </span>
                <span className="text-[16px] sm:text-[18px] font-bold text-ink dark:text-white leading-snug">
                  {item.q}
                </span>
              </div>

              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-transform duration-300 ${
                  isOpen
                    ? `${buttonCls[tone]} rotate-180`
                    : "bg-sand text-ink-soft hover:text-ink dark:bg-white/10 dark:text-white/70"
                }`}
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-line/60 px-5 pb-6 pt-4 dark:border-white/10 sm:px-6 sm:pb-6">
                <p className="text-[15px] leading-relaxed text-ink-soft dark:text-white/75 sm:pl-[44px]">
                  {item.a}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* Helpful contact banner below FAQ */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-sand/60 p-4 sm:p-5 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white dark:bg-ink-800">
            <HelpCircle className="h-5 w-5 text-student-600 dark:text-student-400" />
          </span>
          <div>
            <p className="text-sm font-bold text-ink dark:text-white">{dict.faq.moreQuestions}</p>
            <p className="text-xs text-ink-soft dark:text-white/60">{dict.faq.supportAnswerTime}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-duo inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-extrabold"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>{dict.faq.directWhatsapp}</span>
          </a>
          <Link
            href="/contact"
            className="btn-duo btn-duo-white inline-flex items-center rounded-2xl px-4 py-2 text-xs font-extrabold"
          >
            {dict.nav.contact}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CtaBand({
  title,
  sub,
  tone = "ink",
}: {
  title?: string;
  sub?: string;
  tone?: Tone;
}) {
  const { dict } = useI18n();
  const bg: Record<Tone, string> = {
    student: "bg-gradient-to-br from-student-600 via-student-600 to-student-800 text-student-50",
    tutor: "bg-gradient-to-br from-tutor-500 via-tutor-600 to-tutor-800 text-tutor-50",
    parent: "bg-gradient-to-br from-parent-500 via-parent-600 to-parent-800 text-parent-50",
    ink: "bg-gradient-to-br from-ink-700 via-ink to-ink-950 text-cream dark:from-ink-700 dark:via-ink-700 dark:to-ink-950 dark:border dark:border-white/10",
  };

  const displayTitle = title || `${dict.hero.titlePrefix} ${dict.hero.highlight} ${dict.hero.titleSuffix}`;
  const displaySub = sub || dict.hero.description;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-4 pt-20 sm:px-6 lg:px-8">
      <div
        data-anim="scale"
        className={`relative overflow-hidden rounded-[28px] px-5 py-12 text-center sm:rounded-[36px] sm:px-16 sm:py-14 ${bg[tone]}`}
      >
        {/* Decorative color glows */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        <h2 className="relative text-[clamp(1.9rem,4.4vw,3rem)] font-extrabold leading-tight text-white">
          {displayTitle}
        </h2>
        <p className="relative mx-auto mt-4 max-w-2xl opacity-90 leading-relaxed text-cream/90">{displaySub}</p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="btn-duo btn-duo-white group inline-flex h-13 items-center rounded-2xl px-7 text-[15px] font-extrabold"
          >
            <RollingText text={dict.common.requestTutor} />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex h-13 items-center rounded-2xl border-2 border-white/40 px-7 text-[15px] font-extrabold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
          >
            <RollingText text={dict.common.contactAdvisor} />
          </Link>
        </div>
      </div>
    </section>
  );
}
