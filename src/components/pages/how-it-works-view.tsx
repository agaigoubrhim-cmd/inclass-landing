"use client";

import Link from "next/link";
import { ArrowRight, Laptop, Home as HomeIcon } from "lucide-react";
import PageHero from "@/components/page-hero";
import {
  CitiesMarquee,
  CtaBand,
  FaqAccordion,
  GuaranteeBand,
  StepsSection,
} from "@/components/sections";
import { SectionHead } from "@/components/ui";
import { RollingText } from "@/components/gsap/rolling-text";
import { useI18n } from "@/i18n";

const STEP_ICONS = ["profile", "wallet", "search", "calendar", "star", "shield", "rocket"];

export default function HowItWorksView() {
  const { dict, isRTL } = useI18n();

  const studentStepsData = dict.steps.studentList.map((step, idx) => ({
    title: step.title,
    body: step.body,
    icon: STEP_ICONS[idx % STEP_ICONS.length],
    image: [
      "/images/hero-student.jpg",
      "/images/hero-wide.jpg",
      "/images/lesson-home.jpg",
      "/images/parents.jpg",
      "/images/become-tutor.jpg",
    ][idx % 5],
  }));

  const tutorStepsData = dict.steps.tutorList.map((step, idx) => ({
    title: step.title,
    body: step.body,
    icon: STEP_ICONS[idx % STEP_ICONS.length],
    image: [
      "/images/become-tutor.jpg",
      "/images/hero-tutor.jpg",
      "/images/lesson-home.jpg",
      "/images/hero-wide.jpg",
      "/images/banner-resources.jpg",
      "/images/hero-student.jpg",
      "/images/parents.jpg",
    ][idx % 7],
  }));

  const comparisons = [
    {
      feature: dict.common.online + " / " + dict.common.home,
      online: "En visioconférence interactive avec tableau partagé",
      home: "À domicile, directement chez vous ou chez le professeur",
    },
    {
      feature: "Flexibilité géographique",
      online: "Partout au Maroc & à l'étranger (diaspora)",
      home: "Dans votre quartier (Agadir, Casablanca, Rabat, Marrakech, etc.)",
    },
    {
      feature: "Tarifs indicatifs",
      online: "Dès 80 MAD / heure",
      home: "Dès 100 MAD / heure",
    },
    {
      feature: "Suivi des progrès",
      online: "Compte rendu numérique envoyé après chaque séance",
      home: "Échange direct avec le prof + compte rendu sur l'application",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={dict.nav.howItWorks}
        title={dict.common.tagline}
        highlight={dict.common.brandName}
        tone="student"
        sub={dict.hero.description}
        image="/images/lesson-home.jpg"
        imageAlt={dict.nav.howItWorks}
        crumbs={[{ label: dict.nav.howItWorks }]}
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/comment-ca-marche/eleves"
            className="btn-duo group inline-flex h-12 items-center gap-2 rounded-2xl px-6 font-extrabold"
          >
            <RollingText text={dict.nav.studentGuide} />
            <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
          <Link
            href="/comment-ca-marche/profs"
            className="group inline-flex h-12 items-center gap-2 rounded-full border-2 border-white/40 px-6 font-bold text-white transition-colors hover:bg-white/10"
          >
            <RollingText text={dict.nav.tutorGuide} />
            <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
        </div>
      </PageHero>

      {/* STUDENT STEPS SECTION */}
      <StepsSection
        steps={studentStepsData}
        tone="student"
        eyebrow={dict.steps.studentEyebrow}
        title={dict.steps.studentTitle}
        highlight={dict.steps.studentHighlight}
        sub={dict.steps.studentSub}
      />

      <GuaranteeBand />

      {/* TUTOR STEPS SECTION */}
      <StepsSection
        steps={tutorStepsData}
        tone="tutor"
        eyebrow={dict.steps.tutorEyebrow}
        title={dict.steps.tutorTitle}
        highlight={dict.steps.tutorHighlight}
        sub={dict.steps.tutorSub}
      />

      {/* COMPARISON TABLE */}
      <section className="bg-sand/60 py-20 dark:bg-ink-950/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow="Formats d'apprentissage"
            title="En ligne ou à domicile : comparez les"
            highlight="avantages"
          />

          <div data-anim="up" className="mt-12 overflow-hidden rounded-[32px] border border-line bg-white dark:border-white/10 dark:bg-ink-800">
            <div className="grid grid-cols-3 border-b border-line bg-sand/60 p-4 text-sm font-bold text-ink dark:border-white/10 dark:bg-ink-900 dark:text-white sm:p-5">
              <div>Critères</div>
              <div className="flex items-center gap-2 text-student-700 dark:text-student-400">
                <Laptop className="h-4 w-4 shrink-0" />
                <span>{dict.common.online}</span>
              </div>
              <div className="flex items-center gap-2 text-tutor-700 dark:text-tutor-400">
                <HomeIcon className="h-4 w-4 shrink-0" />
                <span>{dict.common.home}</span>
              </div>
            </div>

            <div className="divide-y divide-line dark:divide-white/10">
              {comparisons.map((row) => (
                <div key={row.feature} className="grid grid-cols-1 gap-2 p-4 text-sm sm:grid-cols-3 sm:gap-5 sm:p-5">
                  <div className="font-bold text-ink dark:text-white">{row.feature}</div>
                  <div className="flex items-start gap-2 text-ink-soft dark:text-white/70">
                    <Laptop className="mt-0.5 h-4 w-4 shrink-0 text-student-500 sm:hidden" />
                    <span>{row.online}</span>
                  </div>
                  <div className="flex items-start gap-2 text-ink-soft dark:text-white/70">
                    <HomeIcon className="mt-0.5 h-4 w-4 shrink-0 text-tutor-500 sm:hidden" />
                    <span>{row.home}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow={dict.faq.eyebrow}
          title={dict.faq.title}
          highlight={dict.faq.highlight}
          tone="student"
        />
        <div className="mt-12">
          <FaqAccordion tone="student" />
        </div>
      </section>

      <CitiesMarquee />

      <CtaBand tone="student" />
    </>
  );
}
