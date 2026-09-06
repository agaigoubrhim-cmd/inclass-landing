"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpenCheck, CalendarCheck, CreditCard, FileText, LineChart, MessagesSquare,
  RefreshCcw, ShieldCheck, Timer, Video, Wallet, ArrowRight,
} from "lucide-react";
import PageHero from "@/components/page-hero";
import { CitiesMarquee, CtaBand, FaqAccordion, GuaranteeBand, StepsSection } from "@/components/sections";
import { SectionHead, Btn, Eyebrow } from "@/components/ui";
import { SubjectIcon } from "@/components/icons";
import { RollingText } from "@/components/gsap/rolling-text";
import { RollingNumber } from "@/components/gsap/rolling-number";
import { useI18n } from "@/i18n";
import type { SubjectCard } from "@/lib/data";

const STEP_ICONS = ["search", "wallet", "users", "calendar", "trending"];

export default function ElevesView({ subjects }: { subjects: SubjectCard[] }) {
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
      "/images/hero-tutor.jpg",
    ][idx % 5],
  }));

  const parentStepsData = dict.steps.parentList.map((step, idx) => ({
    title: step.title,
    body: step.body,
    icon: ["users", "chart", "shield", "wallet"][idx % 4],
    image: [
      "/images/parents.jpg",
      "/images/lesson-home.jpg",
      "/images/hero-wide.jpg",
      "/images/banner-resources.jpg",
    ][idx % 4],
  }));

  return (
    <>
      <PageHero
        eyebrow={dict.audiences.studentKicker}
        title={dict.audiences.studentTitle}
        highlight={dict.common.brandName}
        tone="student"
        sub={dict.steps.studentSub}
        image="/images/hero-student.jpg"
        imageAlt={dict.common.students}
        crumbs={[
          { label: dict.nav.howItWorks, href: "/comment-ca-marche/eleves" },
          { label: dict.common.students },
        ]}
      />

      <StepsSection
        steps={studentStepsData}
        tone="student"
        eyebrow={dict.steps.studentEyebrow}
        title={dict.steps.studentTitle}
        highlight={dict.steps.studentHighlight}
        sub={dict.steps.studentSub}
      />

      <section className="bg-sand/60 py-20 dark:bg-ink-950/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div data-anim="left" className="relative">
              <div className="overflow-hidden rounded-[36px] border-4 border-white dark:border-white/10">
                <Image
                  src="/images/hero-student.jpg"
                  alt="Élève en cours particulier"
                  width={800}
                  height={800}
                  className="h-[420px] w-full object-cover"
                />
              </div>
              <div
                data-drift="0.8"
                className="absolute -right-4 bottom-8 w-[220px] rounded-2xl border border-line bg-white p-5 dark:border-white/10 dark:bg-ink-800"
              >
                <LineChart className="h-6 w-6 text-student-600 dark:text-student-400" />
                <p className="mt-2 text-sm font-bold text-ink dark:text-white">
                  De <RollingNumber targetNumber="9" height={20} /> à{" "}
                  <RollingNumber targetNumber="14,5" height={20} /> /20
                </p>
                <p className="text-xs text-ink-soft dark:text-white/60">
                  {dict.common.lessonsGiven} · <RollingNumber targetNumber="12" height={16} />
                </p>
              </div>
            </div>

            <div>
              <SectionHead
                align="left"
                eyebrow={dict.common.bothModes}
                title={dict.audiences.studentTitle}
                highlight={dict.common.brandName}
                sub={dict.audiences.studentBody}
              />
              <div data-anim-stagger className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Video, t: dict.common.online, d: "Visio + tableau blanc interactif, dès 80 MAD/h." },
                  { icon: BookOpenCheck, t: dict.common.home, d: "Le prof se déplace chez toi dans 32 villes du Maroc." },
                  { icon: Timer, t: "Flexibilité", d: "Soirs, week-ends et vacances scolaires selon ton rythme." },
                  { icon: RefreshCcw, t: "Garantie 100%", d: dict.megaMenu.guaranteeDesc },
                ].map((f) => (
                  <div
                    key={f.t}
                    data-anim-child
                    className="rounded-2xl border border-line bg-white p-5 dark:border-white/10 dark:bg-ink-800"
                  >
                    <f.icon className="h-6 w-6 text-student-600 dark:text-student-400" />
                    <h3 className="mt-3 text-base font-bold text-ink dark:text-white">{f.t}</h3>
                    <p className="mt-1 text-xs text-ink-soft dark:text-white/60 leading-relaxed">{f.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Section Anchor */}
      <section id="parents" className="scroll-mt-24">
        <StepsSection
          steps={parentStepsData}
          tone="parent"
          eyebrow={dict.steps.parentEyebrow}
          title={dict.steps.parentTitle}
          highlight={dict.steps.parentHighlight}
          sub={dict.steps.parentSub}
        />
      </section>

      <GuaranteeBand />

      <CitiesMarquee />

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

      <CtaBand />
    </>
  );
}
