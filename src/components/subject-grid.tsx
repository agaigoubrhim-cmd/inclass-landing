"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Minus, Plus } from "lucide-react";

import { SubjectIcon } from "./icons";
import { RollingNumber } from "@/components/gsap/rolling-number";
import type { SubjectCard } from "@/lib/data";
import { useI18n } from "@/i18n";
import { getLocalizedSubject } from "@/lib/subject-translations";

const CATEGORY_ACCENT: Record<
  string,
  { chip: string; hoverBorder: string; icon: string; text: string }
> = {
  Scientifique: {
    chip: "bg-tutor-100 text-tutor-700 dark:bg-tutor-950/70 dark:text-tutor-300",
    hoverBorder: "hover:border-tutor-300 dark:hover:border-tutor-500/50",
    icon: "text-tutor-600 dark:text-tutor-300",
    text: "text-tutor-700 dark:text-tutor-300",
  },
  Langues: {
    chip: "bg-student-100 text-student-700 dark:bg-student-950/70 dark:text-student-300",
    hoverBorder: "hover:border-student-300 dark:hover:border-student-500/50",
    icon: "text-student-600 dark:text-student-300",
    text: "text-student-700 dark:text-student-300",
  },
  "Numérique": {
    chip: "bg-parent-100 text-parent-700 dark:bg-parent-950/70 dark:text-parent-300",
    hoverBorder: "hover:border-parent-300 dark:hover:border-parent-500/50",
    icon: "text-parent-600 dark:text-parent-300",
    text: "text-parent-700 dark:text-parent-300",
  },
  "Scolaire": {
    chip: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300",
    hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-500/50",
    icon: "text-emerald-600 dark:text-emerald-300",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  "Supérieur": {
    chip: "bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300",
    hoverBorder: "hover:border-sky-300 dark:hover:border-sky-500/50",
    icon: "text-sky-600 dark:text-sky-300",
    text: "text-sky-700 dark:text-sky-300",
  },
  "Littéraire": {
    chip: "bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300",
    hoverBorder: "hover:border-rose-300 dark:hover:border-rose-500/50",
    icon: "text-rose-600 dark:text-rose-300",
    text: "text-rose-700 dark:text-rose-300",
  },
};

export default function SubjectGrid({
  items,
}: {
  items: SubjectCard[];
}) {
  const [expanded, setExpanded] = useState(false);
  const { dict, locale, isRTL } = useI18n();

  const visible = expanded ? items : items.slice(0, 8);

  return (
    <div className="w-full">
      {/* Subjects Grid */}
      <div
        data-anim-stagger
        className="
          grid
          grid-cols-2
          gap-3
          sm:grid-cols-2
          sm:gap-4
          lg:grid-cols-3
          lg:gap-5
        "
      >
        {visible.map((subject) => {
          const accent =
            CATEGORY_ACCENT[subject.category] ?? CATEGORY_ACCENT["Scolaire"];
          return (
          <Link
            key={subject.slug}
            data-anim-child
            href={`/contact?subject=${encodeURIComponent(subject.name)}`}
            className={`
              group
              relative
              flex
              min-h-[150px]
              flex-col
              items-center
              justify-center
              overflow-hidden
              rounded-[22px]
              border
              bg-white
              px-4
              py-6
              text-center
              transition-all
              duration-300
              hover:-translate-y-1.5
              hover:border-ink/10
              dark:bg-ink-800
              dark:hover:border-white/20
              dark:
              ${accent.hoverBorder}
              

              sm:min-h-[130px]
              sm:flex-row
              sm:justify-start
              sm:gap-5
              sm:px-5
              sm:py-5
              sm:text-left
              rtl:sm:text-right

              lg:min-h-[145px]
              lg:gap-6
              lg:px-6
              lg:py-6
            `}
          >
            {/* ICON */}
            <span
              className={`
                grid
                h-[68px]
                w-[68px]
                shrink-0
                place-items-center
                rounded-2xl
                border
                border-line/80
                bg-white
                transition-all
                duration-300
                group-hover:scale-105
                dark:border-white/10
                dark:bg-white/[0.04]

                sm:h-[70px]
                sm:w-[70px]

                lg:h-20
                lg:w-20
              `}
            >
              <SubjectIcon
                name={subject.icon}
                className={`
                  h-11
                  w-11
                  shrink-0
                  transition-all
                  duration-300
                  group-hover:scale-110
                  ${accent.icon}

                  sm:h-12
                  sm:w-12

                  lg:h-14
                  lg:w-14
                `}
              />
            </span>

            {/* Subject Info */}
            <span className="min-w-0 max-w-full flex-1">
              <span
                className={`mb-1.5 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${accent.chip}`}
              >
                {subject.category}
              </span>

              <span
                className="
                  block
                  truncate
                  text-[15px]
                  font-extrabold
                  leading-tight
                  text-ink
                  dark:text-white

                  sm:text-[17px]

                  lg:text-[18px]
                "
              >
                {getLocalizedSubject(subject.slug, locale, subject.name)}
              </span>

              <span
                className={`
                  mt-1
                  block
                  truncate
                  text-[11px]
                  font-semibold
                  leading-relaxed
                  ${accent.text}

                  sm:text-[13px]

                  lg:text-[14px]
                `}
              >
                <RollingNumber targetNumber={subject.tutorsCount.toLocaleString("fr-MA")} height={18} /> {dict.subjectsSection.tutorsWord} ·{" "}
                <RollingNumber targetNumber={subject.learners.toLocaleString("fr-MA")} height={18} /> {dict.subjectsSection.studentsWord}
              </span>
            </span>

            {/* Arrow */}
            <span
              className="
                absolute
                right-2
                rtl:right-auto
                rtl:left-2
                top-2
                grid
                h-7
                w-7
                place-items-center
                rounded-full
                bg-ink/[0.04]
                transition-all
                duration-300
                group-hover:translate-x-1
                rtl:group-hover:-translate-x-1
                group-hover:bg-ink
                dark:bg-white/[0.06]
                dark:group-hover:bg-white

                sm:right-3
                rtl:sm:right-auto
                rtl:sm:left-3
                sm:top-3

                lg:relative
                lg:right-auto
                lg:left-auto
                lg:top-auto
                lg:h-10
                lg:w-10
              "
            >
              <ChevronRight
                className={`
                  h-4
                  w-4
                  text-ink/40
                  transition-colors
                  duration-300
                  group-hover:text-white
                  dark:text-white/40
                  dark:group-hover:text-ink

                  lg:h-5
                  lg:w-5
                  ${isRTL ? "rotate-180" : ""}
                `}
              />
            </span>
          </Link>
          );
        })}
      </div>

      {/* Show More / Less */}
      {items.length > 8 ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="
              mt-8
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-line
              bg-white
              px-6
              py-3
              text-sm
              font-bold
              text-ink
             
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-sand
             
              dark:border-white/15
              dark:bg-white/[0.06]
              dark:text-white
              dark:hover:bg-white/[0.12]
            "
          >
            {expanded ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}

            <span>
              {expanded
                ? dict.subjectsSection.showLess
                : `${dict.subjectsSection.showMore} (${items.length - 8})`}
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}