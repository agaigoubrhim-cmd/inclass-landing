"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/home/hero";
import SubjectGrid from "@/components/subject-grid";
import TestimonialCarousel from "@/components/testimonial-carousel";
import { AudienceCards } from "@/components/audience-cards";
import { TutorCards } from "@/components/tutor-cards";
import {
  BecomeTutorBand,
  CitiesMarquee,
  CtaBand,
  FaqAccordion,
  GuaranteeBand,
  ParentsBand,
  StatsBar,
  StepsSection,
} from "@/components/sections";
import { SectionHead } from "@/components/ui";
import { RollingText } from "@/components/gsap/rolling-text";
import { useI18n } from "@/i18n";
import type { SubjectCard } from "@/lib/data";
import type { Testimonial, Tutor } from "@/db/schema";

const STEP_ICONS = ["search", "wallet", "users", "calendar", "trending"];

export default function HomeView({
  subjects,
  testimonials,
  tutors,
}: {
  subjects: SubjectCard[];
  testimonials: Testimonial[];
  tutors: Tutor[];
}) {
  const { dict, isRTL } = useI18n();

  const studentStepsData = dict.steps.studentList.map((step, idx) => ({
    title: step.title,
    body: step.body,
    icon: STEP_ICONS[idx % STEP_ICONS.length],
  }));

  return (
    <>
      {/* =========================================================
          HERO
         ========================================================= */}
      <Hero />

      {/* =========================================================
          STATS
         ========================================================= */}
      <StatsBar />

      {/* =========================================================
          SUBJECTS
         ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-center gap-6">
          <SectionHead
            align="center"
            eyebrow={dict.subjectsSection.eyebrow}
            title={dict.subjectsSection.title}
            highlight={dict.subjectsSection.highlight}
            sub={dict.subjectsSection.sub}
          />

          <Link
            data-anim="up"
            href="/contact"
            className="btn-duo btn-duo-white group inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-extrabold"
          >
            <RollingText text={dict.common.findTutor} />
            <ArrowRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
        </div>

        <div className="mt-12">
          <SubjectGrid items={subjects} />
        </div>
      </section>

      {/* =========================================================
          TESTIMONIALS
         ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-tutor-50/70 via-sand/60 to-student-50/70 py-20 dark:from-tutor-950/30 dark:via-ink-950/50 dark:to-student-950/25">
        <div className="relative">
          <TestimonialCarousel items={testimonials} />
        </div>
      </section>

      {/* =========================================================
          AUDIENCE CARDS
         ========================================================= */}
      <AudienceCards />

      {/* =========================================================
          HORIZONTAL EXPANDING STEPS ACCORDION
         ========================================================= */}
      <StepsSection
        steps={studentStepsData}
        tone="student"
        eyebrow={dict.steps.studentEyebrow}
        title={dict.steps.studentTitle}
        highlight={dict.steps.studentHighlight}
        sub={dict.steps.studentSub}
      />

      {/* =========================================================
          GUARANTEE
         ========================================================= */}
      <GuaranteeBand />

      {/* =========================================================
          FEATURED TUTORS
         ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow={dict.tutorsSection.eyebrow}
          title={dict.tutorsSection.title}
          highlight={dict.tutorsSection.highlight}
          sub={dict.tutorsSection.sub}
        />

        <div className="mt-14">
          <TutorCards tutors={tutors} />
        </div>

        <div data-anim="up" className="mt-10 text-center">
          <Link
            href="/contact"
            className="btn-duo group inline-flex h-12 items-center gap-2 rounded-2xl px-7 text-[15px] font-extrabold"
          >
            <RollingText text={dict.common.requestTutor} />
            <ArrowRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
        </div>
      </section>

      {/* =========================================================
          BECOME A TUTOR
         ========================================================= */}
      <BecomeTutorBand />

      {/* =========================================================
          PARENTS
         ========================================================= */}
      <ParentsBand />

      {/* =========================================================
          CITIES
         ========================================================= */}
      <CitiesMarquee />

      {/* =========================================================
          FAQ
         ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow={dict.faq.eyebrow}
          title={dict.faq.title}
          highlight={dict.faq.highlight}
          tone="parent"
        />

        <div className="mt-12">
          <FaqAccordion tone="parent" />
        </div>
      </section>

      {/* =========================================================
          CTA
         ========================================================= */}
      <CtaBand />
    </>
  );
}
