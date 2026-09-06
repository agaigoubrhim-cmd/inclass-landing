import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Squiggle } from "./icons";
import { RollingText } from "./gsap/rolling-text";

export type Tone = "student" | "tutor" | "parent" | "ink";

const TONE_SOLID: Record<Tone, string> = {
  student: "bg-student-600 text-student-50 hover:bg-student-700",
  tutor: "bg-tutor-600 text-tutor-50 hover:bg-tutor-700",
  parent: "bg-parent-600 text-parent-50 hover:bg-parent-700",
  ink: "bg-ink text-cream hover:bg-ink-soft dark:bg-white dark:text-ink dark:hover:bg-cream",
};

const TONE_OUTLINE: Record<Tone, string> = {
  student: "border-student-300 text-student-700 hover:bg-student-50 dark:border-student-500/40 dark:text-student-300 dark:hover:bg-student-950/40",
  tutor: "border-tutor-300 text-tutor-700 hover:bg-tutor-50 dark:border-tutor-500/40 dark:text-tutor-300 dark:hover:bg-tutor-950/40",
  parent: "border-parent-300 text-parent-700 hover:bg-parent-50 dark:border-parent-500/40 dark:text-parent-300 dark:hover:bg-parent-950/40",
  ink: "border-ink/20 text-ink hover:bg-ink/5 dark:border-white/20 dark:text-white dark:hover:bg-white/5",
};

const TONE_SOFT: Record<Tone, string> = {
  student: "bg-student-100 text-student-800 hover:bg-student-200 dark:bg-student-950/70 dark:text-student-300 dark:hover:bg-student-900/60",
  tutor: "bg-tutor-100 text-tutor-800 hover:bg-tutor-200 dark:bg-tutor-950/70 dark:text-tutor-300 dark:hover:bg-tutor-900/60",
  parent: "bg-parent-100 text-parent-800 hover:bg-parent-200 dark:bg-parent-950/70 dark:text-parent-300 dark:hover:bg-parent-900/60",
  ink: "bg-sand text-ink hover:bg-line dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
};

export function Btn({
  href,
  children,
  tone = "ink",
  variant = "solid",
  size = "md",
  className = "",
  arrow = false,
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  variant?: "solid" | "outline" | "soft";
  size?: "sm" | "md" | "lg";
  className?: string;
  arrow?: boolean;
}) {
  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-[15px]",
    lg: "h-14 px-8 text-base",
  };
  const variants = {
    solid: TONE_SOLID[tone],
    outline: `border-2 bg-transparent ${TONE_OUTLINE[tone]}`,
    soft: TONE_SOFT[tone],
  };
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.98] ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {typeof children === "string" ? <RollingText text={children} /> : children}
      {arrow ? (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      ) : null}
    </Link>
  );
}

export function Eyebrow({
  children,
  tone = "student",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const tones: Record<Tone, string> = {
    student: "bg-student-100 text-student-700 dark:bg-student-950/80 dark:text-student-300 dark:border dark:border-student-500/30",
    tutor: "bg-tutor-100 text-tutor-700 dark:bg-tutor-950/80 dark:text-tutor-300 dark:border dark:border-tutor-500/30",
    parent: "bg-parent-100 text-parent-700 dark:bg-parent-950/80 dark:text-parent-300 dark:border dark:border-parent-500/30",
    ink: "bg-ink/8 text-ink dark:bg-white/10 dark:text-white",
  };
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] font-brand ${tones[tone]} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  highlight,
  sub,
  tone = "student",
  align = "center",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: string;
  highlight?: string;
  sub?: string;
  tone?: Tone;
  align?: "center" | "left";
  className?: string;
}) {
  const squiggleTone: Record<Tone, string> = {
    student: "text-student-300 dark:text-student-400",
    tutor: "text-tutor-300 dark:text-tutor-400",
    parent: "text-parent-300 dark:text-parent-400",
    ink: "text-ink/30 dark:text-white/30",
  };
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow ? (
        <div data-anim="up" className="mb-4">
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2
        data-anim="up"
        className="font-display text-[clamp(1.9rem,4.4vw,3.1rem)] font-extrabold leading-[1.06] text-ink dark:text-white"
      >
        {title}
        {highlight ? (
          <span className="relative ml-2 inline-block font-brand">
            {highlight}
            <Squiggle
              className={`absolute -bottom-2 left-0 h-3 w-full ${squiggleTone[tone]}`}
            />
          </span>
        ) : null}
      </h2>
      {sub ? (
        <p
          data-anim="up"
          data-anim-delay="0.08"
          className={`mt-5 text-[17px] leading-relaxed text-ink-soft dark:text-white/70 ${align === "center" ? "mx-auto" : ""}`}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}

export function Rating({ value = 5, className = "" }: { value?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${value}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9L12 2.6Z"
            fill={i < value ? "#f5a524" : "#e7ddcf"}
          />
        </svg>
      ))}
    </span>
  );
}
