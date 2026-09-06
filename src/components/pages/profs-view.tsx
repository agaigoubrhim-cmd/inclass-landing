"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck, CalendarClock, GraduationCap, Headphones, LayoutDashboard, Percent,
  ShieldCheck, Star, Users, Wallet, ArrowRight,
} from "lucide-react";
import PageHero from "@/components/page-hero";
import EarningsSimulator from "@/components/earnings-simulator";
import { CtaBand, FaqAccordion, StepsSection } from "@/components/sections";
import { WhatsAppIcon } from "@/components/icons";
import { SectionHead, Eyebrow, Rating } from "@/components/ui";
import { RollingText } from "@/components/gsap/rolling-text";
import { RollingNumber } from "@/components/gsap/rolling-number";
import { useI18n } from "@/i18n";

const STEP_ICONS = ["profile", "wallet", "inbox", "calendar", "users", "shield", "rocket"];

export default function ProfsView() {
  const { dict, isRTL } = useI18n();

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

  const perks = [
    { icon: Users, t: "Des élèves qualifiés", d: "Reçois des demandes d'élèves de ta ville et de tes matières, filtrées selon ton planning." },
    { icon: Wallet, t: "Paiement garanti", d: "L'argent de l'élève est bloqué avant le cours et te revient après la séance validée." },
    { icon: CalendarClock, t: "Ton planning, tes règles", d: "Tu acceptes uniquement les créneaux que tu choisis, cours en ligne ou à domicile." },
    { icon: LayoutDashboard, t: "Un tableau de bord simple", d: "Élèves, revenus, avis et comptes rendus centralisés dans une seule app." },
    { icon: Headphones, t: "Support dédié profs", d: "Une équipe basée à Agadir joignable pour t'aider sur chaque étape." },
    { icon: Star, t: "Une réputation vérifiée", d: "Les avis vérifiés font grimper ton profil dans les résultats de recherche." },
  ];

  return (
    <>
      <PageHero
        eyebrow={dict.audiences.tutorKicker}
        title={dict.audiences.tutorTitle}
        highlight={dict.common.brandName}
        tone="tutor"
        sub={dict.steps.tutorSub}
        image="/images/hero-tutor.jpg"
        imageAlt={dict.common.tutors}
        crumbs={[
          { label: dict.nav.howItWorks, href: "/comment-ca-marche/eleves" },
          { label: dict.common.tutors },
        ]}
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/contact?subject=Candidature%20Professeur"
            className="btn-duo inline-flex h-14 items-center gap-2 rounded-2xl px-8 font-extrabold"
          >
            <RollingText text={dict.audiences.tutorCta} />
            <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
          <Link
            href="#commissions"
            className="inline-flex h-14 items-center rounded-full border-2 border-white/40 px-8 font-bold text-white transition-colors hover:bg-white/10"
          >
            {dict.megaMenu.tutorLink2}
          </Link>
        </div>
      </PageHero>

      <section className="border-y border-line bg-cream dark:border-white/10 dark:bg-ink-950">
        <div data-anim-stagger className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { v: "48 h", l: dict.tutorsSection.statValidation },
            { v: "6 200 MAD", l: dict.tutorsSection.statRevenue },
            { v: "0%", l: dict.tutorsSection.statCommission },
            { v: "18 h", l: dict.tutorsSection.statPlanning },
          ].map((s) => (
            <div key={s.l} data-anim-child className="text-center">
              <p className="font-brand text-[clamp(1.5rem,3vw,2.1rem)] font-extrabold leading-none text-tutor-700 dark:text-tutor-400">
                <RollingNumber targetNumber={s.v} height={36} />
              </p>
              <p className="mt-2 text-sm font-medium text-ink-soft dark:text-white/60">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <StepsSection
        steps={tutorStepsData}
        tone="tutor"
        eyebrow={dict.steps.tutorEyebrow}
        title={dict.steps.tutorTitle}
        highlight={dict.steps.tutorHighlight}
        sub={dict.steps.tutorSub}
      />

      <section className="bg-sand/60 py-20 dark:bg-ink-950/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow={dict.aboutPage.valuesTitle}
            title={dict.audiences.tutorTitle}
            highlight={dict.common.brandName}
            tone="tutor"
            sub={dict.audiences.tutorBody}
          />
          <div data-anim-stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((p) => (
              <div
                key={p.t}
                data-anim-child
                className="rounded-3xl border border-line bg-white p-7 transition-all hover:border-tutor-300 dark:border-white/10 dark:bg-ink-800"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-tutor-50 text-tutor-600 dark:bg-tutor-950/60 dark:text-tutor-400">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink dark:text-white">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-white/70">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="commissions" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 scroll-mt-24">
        <EarningsSimulator />
      </section>

      {/* Direct Contact Card for tutor application */}
      <section id="candidature" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="rounded-[36px] border border-tutor-200 bg-tutor-50/60 p-8 text-center sm:p-12 dark:border-tutor-500/20 dark:bg-tutor-950/40">
          <span className="inline-flex rounded-full bg-tutor-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
            {dict.audiences.tutorKicker}
          </span>
          <h2 className="mt-4 text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">
            Prêt à rejoindre notre équipe d&apos;enseignants ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-soft dark:text-white/70">
            {dict.contactForm.sub}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact?subject=Recrutement%20Professeur"
              className="btn-duo inline-flex h-13 items-center gap-2 rounded-2xl px-8 text-sm font-extrabold"
            >
              <RollingText text={dict.contactForm.submitBtn} />
              <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
            <a
              href="https://wa.me/212600000000?text=Bonjour,%20je%20souhaite%20postuler%20comme%20professeur%20INCLASS"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-duo btn-duo-white group inline-flex h-13 items-center gap-2 rounded-2xl px-7 text-sm font-extrabold"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 scroll-mt-24">
        <SectionHead
          eyebrow={dict.faq.eyebrow}
          title={dict.faq.title}
          highlight={dict.faq.highlight}
          tone="tutor"
        />
        <div className="mt-12">
          <FaqAccordion tone="tutor" />
        </div>
      </section>

      <CtaBand tone="tutor" />
    </>
  );
}
