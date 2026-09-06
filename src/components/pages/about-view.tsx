"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import PageHero from "@/components/page-hero";
import { CtaBand, StatsBar } from "@/components/sections";
import { SectionHead } from "@/components/ui";
import { RollingNumber } from "@/components/gsap/rolling-number";
import { RollingText } from "@/components/gsap/rolling-text";
import {
  AcademicCapAnimatedIcon,
  RocketAnimatedIcon,
  ShieldAnimatedIcon,
  SearchAnimatedIcon,
} from "@/components/icons";
import { useI18n } from "@/i18n";

const VALUE_ICONS = [AcademicCapAnimatedIcon, RocketAnimatedIcon, ShieldAnimatedIcon];
const VALUE_CLASSES = [
  "bg-student-50 border-student-200 text-student-700 dark:bg-student-950/40 dark:border-student-500/20 dark:text-student-300",
  "bg-tutor-50 border-tutor-200 text-tutor-700 dark:bg-tutor-950/40 dark:border-tutor-500/20 dark:text-tutor-300",
  "bg-parent-50 border-parent-200 text-parent-700 dark:bg-parent-950/40 dark:border-parent-500/20 dark:text-parent-300",
];

const TEAM = [
  { initials: "YB", name: "Yassine B.", role: "Cofondateur · Produit", cls: "bg-student-100 text-student-700 dark:bg-student-950/80 dark:text-student-300" },
  { initials: "SL", name: "Soukaina L.", role: "Cofondatrice · Pédagogie", cls: "bg-tutor-100 text-tutor-700 dark:bg-tutor-950/80 dark:text-tutor-300" },
  { initials: "AM", name: "Amine M.", role: "Head of Tutors", cls: "bg-parent-100 text-parent-700 dark:bg-parent-950/80 dark:text-parent-300" },
  { initials: "HN", name: "Hind N.", role: "Support & Relations Familles", cls: "bg-student-100 text-student-700 dark:bg-student-950/80 dark:text-student-300" },
];

export default function AboutView() {
  const { dict, isRTL } = useI18n();

  return (
    <>
      <PageHero
        eyebrow={dict.aboutPage.eyebrow}
        title={dict.aboutPage.title}
        highlight={dict.aboutPage.highlight}
        tone="ink"
        sub={dict.aboutPage.sub}
        image="/images/become-tutor.jpg"
        imageAlt="INCLASS"
        crumbs={[{ label: dict.nav.about }]}
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="btn-duo inline-flex h-12 items-center gap-2 rounded-2xl px-7 font-extrabold"
          >
            <RollingText text={dict.aboutPage.btnFind} />
            <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
          <Link
            href="/comment-ca-marche/profs"
            className="inline-flex h-12 items-center rounded-full border-2 border-white/40 px-7 font-bold text-white transition-colors hover:bg-white/10"
          >
            {dict.aboutPage.btnBecome}
          </Link>
        </div>
      </PageHero>

      <StatsBar />

      <section id="valeurs" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div data-anim="left" className="relative">
            <div className="overflow-hidden rounded-[36px] border-4 border-white dark:border-white/10">
              <Image
                src="/images/lesson-home.jpg"
                alt="Cours particulier"
                width={900}
                height={700}
                className="h-[380px] w-full object-cover"
              />
            </div>
            <div
              data-drift="0.7"
              className="absolute -bottom-6 -right-4 rtl:-right-auto rtl:-left-4 max-w-[230px] rounded-2xl border border-line bg-white p-5 dark:border-white/10 dark:bg-ink-800"
            >
              <Sparkles className="h-6 w-6 text-student-500" />
              <p className="mt-2 text-sm font-bold text-ink dark:text-white">
                <RollingNumber targetNumber={dict.aboutPage.statPercent} height={20} />
              </p>
              <p className="text-xs text-ink-soft dark:text-white/60">
                {dict.aboutPage.statPercentDesc}
              </p>
            </div>
          </div>

          <div>
            <SectionHead
              align="left"
              eyebrow={dict.aboutPage.missionEyebrow}
              title={dict.aboutPage.missionTitle}
              highlight={dict.aboutPage.missionHighlight}
              sub={dict.aboutPage.missionBody}
            />
            <ul data-anim-stagger className="mt-8 space-y-4">
              {[
                { icon: SearchAnimatedIcon, t: dict.guarantees.g2Title, d: dict.guarantees.g2Body },
                { icon: RocketAnimatedIcon, t: dict.guarantees.g1Title, d: dict.guarantees.g1Body },
                { icon: ShieldAnimatedIcon, t: dict.guarantees.g3Title, d: dict.guarantees.g3Body },
              ].map((item) => (
                <li key={item.t} data-anim-child className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sand dark:bg-ink-800">
                    <item.icon className="h-7 w-7" />
                  </span>
                  <span>
                    <span className="block font-bold text-ink dark:text-white">{item.t}</span>
                    <span className="block text-sm text-ink-soft dark:text-white/60">{item.d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="confiance" className="bg-sand/60 py-20 dark:bg-ink-950/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow={dict.aboutPage.valuesEyebrow}
            title={dict.aboutPage.valuesTitle}
            highlight={dict.aboutPage.valuesHighlight}
            sub={dict.aboutPage.valuesSub}
          />
          <div data-anim-stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {dict.aboutPage.valuesList.map((v, i) => {
              const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
              const cls = VALUE_CLASSES[i % VALUE_CLASSES.length];
              return (
                <div
                  key={v.title}
                  data-anim-child
                  className={`rounded-[28px] border p-7 transition-transform duration-300 hover:-translate-y-1.5 ${cls}`}
                >
                  <Icon className="h-8 w-8" />
                  <h3 className="mt-5 text-xl font-extrabold text-ink dark:text-white">{v.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft dark:text-white/70">{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow={dict.aboutPage.storyEyebrow}
          title={dict.aboutPage.storyTitle}
          highlight={dict.aboutPage.storyHighlight}
          sub={dict.aboutPage.storySub}
          tone="tutor"
        />
        <div data-anim-stagger className="relative mt-14 grid gap-6 md:grid-cols-4">
          {dict.aboutPage.timelineList.map((t) => (
            <div
              key={t.year}
              data-anim-child
              className="relative rounded-[26px] border border-line bg-white p-6 dark:border-white/10 dark:bg-ink-800"
            >
              <span className="inline-flex rounded-full bg-tutor-600 px-3 py-1 text-sm font-extrabold text-tutor-50">
                <RollingNumber targetNumber={t.year} height={20} />
              </span>
              <h3 className="mt-4 text-lg font-extrabold text-ink dark:text-white">{t.title}</h3>
              <p className="mt-2 text-sm text-ink-soft dark:text-white/60">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="equipe" className="relative overflow-hidden bg-ink py-20 text-cream">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 data-anim="up" className="text-[clamp(2rem,4.4vw,3rem)] font-extrabold">
              {dict.aboutPage.teamTitle} {dict.aboutPage.teamHighlight}
            </h2>
            <p data-anim="up" className="mt-4 text-cream/70">
              {dict.aboutPage.teamSub}
            </p>
          </div>
          <div data-anim-stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m) => (
              <div
                key={m.name}
                data-anim-child
                className="rounded-[26px] border border-white/10 bg-white/5 p-6 text-center"
              >
                <span
                  className={`mx-auto grid h-16 w-16 place-items-center rounded-2xl text-lg font-extrabold ${m.cls}`}
                >
                  {m.initials}
                </span>
                <p className="mt-4 font-bold">{m.name}</p>
                <p className="text-sm text-cream/60">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand tone="ink" />
    </>
  );
}
