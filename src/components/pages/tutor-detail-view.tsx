"use client";

import Link from "next/link";
import {
  BadgeCheck,
  CalendarCheck,
  FileCheck2,
  GraduationCap,
  Home as HomeIcon,
  Languages,
  MapPin,
  ShieldCheck,
  Star,
  UserCheck,
  Video,
  Zap,
} from "lucide-react";
import { Rating } from "@/components/ui";
import { CtaBand, TutorCard } from "@/components/sections";
import { SubjectIcon } from "@/components/icons";
import { RollingNumber } from "@/components/gsap/rolling-number";
import TutorBookingWidget from "@/components/tutor-booking-widget";
import type { Tutor } from "@/lib/data";
import { useI18n } from "@/i18n";
import { getLocalizedSubject } from "@/lib/subject-translations";

const REVIEWS_SAMPLE = [
  {
    author: "Karim M.",
    role: "Élève 2ème Bac SM",
    rating: 5,
    date: "2 semaines",
    comment:
      "Professeur exceptionnel ! Grâce à ses explications claires et ses fiches de synthèse, j'ai augmenté ma moyenne de 4 points.",
  },
  {
    author: "Fatima Zahra T.",
    role: "Parent d'élève",
    rating: 5,
    date: "1 mois",
    comment:
      "Pédagogue, ponctuel et très à l'écoute. Le compte rendu envoyé après chaque cours nous permet de suivre les progrès en direct.",
  },
  {
    author: "Othmane K.",
    role: "Étudiant CPGE",
    rating: 5,
    date: "2 mois",
    comment:
      "Une méthode rigoureuse axée sur les concours. Je recommande les yeux fermés pour tous les élèves exigeants.",
  },
];

export default function TutorDetailView({
  tutor,
  similar,
}: {
  tutor: Tutor;
  similar: Tutor[];
}) {
  const { dict, locale, isRTL } = useI18n();

  const modeLabel =
    tutor.mode === "online"
      ? dict.common.online
      : tutor.mode === "home"
        ? dict.common.home
        : dict.common.bothModes;

  const localizedSubject = getLocalizedSubject(tutor.subjectSlug, locale, tutor.subjectLabel);

  const verifiedChecks = [
    { icon: UserCheck, title: "Identité vérifiée (CIN)", desc: "Pièce d'identité marocaine contrôlée" },
    { icon: FileCheck2, title: "Diplômes certifiés", desc: "Titres universitaires et attestations validés" },
    { icon: ShieldCheck, title: "Entretien pédagogique", desc: "Testé et validé par nos inspecteurs" },
    { icon: Zap, title: "Réactivité garantie", desc: "Réponse moyenne en moins d'une heure" },
  ];

  return (
    <>
      {/* =========================================================
          PROFILE HERO / HEADER
         ========================================================= */}
      <section className="relative overflow-hidden bg-student-50/70 px-4 py-12 sm:px-6 lg:px-8 dark:border-b dark:border-student-500/10 dark:bg-student-950/30">
        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/comment-ca-marche/eleves"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-student-700 transition-colors hover:text-student-800 dark:text-student-400 dark:hover:text-student-300"
          >
            <span className={isRTL ? "rotate-180 inline-block" : ""}>←</span> {dict.nav.howItWorks}
          </Link>

          <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
            {/* Left side: Tutor Info, Bio, Credentials, Reviews */}
            <div data-anim="up" className="space-y-8">
              {/* Header profile badge */}
              <div className="flex flex-wrap items-start gap-5">
                <span className="grid h-24 w-24 place-items-center rounded-3xl bg-student-600 text-3xl font-extrabold text-student-50">
                  {tutor.initials}
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold leading-tight text-ink dark:text-white">
                      {tutor.fullName}
                    </h1>
                    {tutor.verified ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-tutor-50 px-2.5 py-1 text-xs font-bold text-tutor-700 dark:bg-tutor-950/70 dark:text-tutor-300">
                        <BadgeCheck className="h-4 w-4 text-tutor-600 dark:text-tutor-400" />
                        {dict.common.verifiedTutors}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm font-medium text-ink-soft dark:text-white/70">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-student-600 dark:text-student-400" />
                      {tutor.city}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      {tutor.mode === "home" ? (
                        <HomeIcon className="h-4 w-4 text-tutor-600 dark:text-tutor-400" />
                      ) : (
                        <Video className="h-4 w-4 text-tutor-600 dark:text-tutor-400" />
                      )}
                      {modeLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Languages className="h-4 w-4 text-parent-600 dark:text-parent-400" />
                      {tutor.languages}
                    </span>
                  </p>
                </div>
              </div>

              {/* Headline & Badges */}
              <div>
                <p className="text-xl font-bold text-ink dark:text-white sm:text-2xl">
                  {tutor.headline}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-student-700 dark:border dark:border-white/10 dark:bg-ink-800 dark:text-student-300">
                    <SubjectIcon name="book" className="h-3.5 w-3.5" />
                    {localizedSubject}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-parent-700 dark:border dark:border-white/10 dark:bg-ink-800 dark:text-parent-300">
                    <GraduationCap className="h-3.5 w-3.5" />
                    {tutor.levels}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-tutor-700 dark:border dark:border-white/10 dark:bg-ink-800 dark:text-tutor-300">
                    <CalendarCheck className="h-3.5 w-3.5" />
                    <RollingNumber targetNumber={tutor.lessons} height={16} /> {dict.common.lessonsGiven}
                  </span>
                </div>
              </div>

              {/* Bio & Methodology */}
              <div className="rounded-3xl border border-line bg-white p-6 dark:border-white/10 dark:bg-ink-900/80 sm:p-7">
                <h2 className="text-lg font-bold text-ink dark:text-white">Présentation &amp; Pédagogie</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft dark:text-white/80">
                  {tutor.bio}
                </p>
                <div className="mt-6 grid gap-3 border-t border-line/80 pt-5 dark:border-white/10 sm:grid-cols-2">
                  <div className="rounded-2xl bg-sand/60 p-4 dark:bg-white/5">
                    <p className="text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-white/50">
                      Méthode d&apos;enseignement
                    </p>
                    <p className="mt-1 text-sm font-semibold text-ink dark:text-white">
                      Diagnostic initial + fiches synthèses + entraînement intensif sur sujets d&apos;examens.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-sand/60 p-4 dark:bg-white/5">
                    <p className="text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-white/50">
                      Suivi personnalisé
                    </p>
                    <p className="mt-1 text-sm font-semibold text-ink dark:text-white">
                      Compte rendu envoyé après chaque cours avec points acquis et exercices à faire.
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Quality Badges */}
              <div className="rounded-3xl border border-line bg-white p-6 dark:border-white/10 dark:bg-ink-900/80 sm:p-7">
                <h2 className="text-lg font-bold text-ink dark:text-white">Garanties &amp; Vérifications</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {verifiedChecks.map((c) => {
                    const Icon = c.icon;
                    return (
                      <div key={c.title} className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-student-100 text-student-700 dark:bg-student-950/80 dark:text-student-300">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-ink dark:text-white">{c.title}</p>
                          <p className="text-xs text-ink-soft dark:text-white/60">{c.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="rounded-3xl border border-line bg-white p-6 dark:border-white/10 dark:bg-ink-900/80 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-ink dark:text-white">
                      {dict.common.reviewsWord} ({tutor.reviews})
                    </h2>
                    <div className="mt-1 flex items-center gap-2">
                      <Rating value={Math.round(Number(tutor.rating))} />
                      <span className="text-sm font-extrabold text-ink dark:text-white">
                        {Number(tutor.rating).toFixed(1)} / 5
                      </span>
                    </div>
                  </div>
                  <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-ink dark:bg-white/10 dark:text-white">
                    100% {dict.common.verifiedTutors}
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {REVIEWS_SAMPLE.map((r, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-line/70 bg-sand/30 p-4 dark:border-white/10 dark:bg-white/[0.03]"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-ink dark:text-white">{r.author}</p>
                          <p className="text-xs text-ink-soft dark:text-white/50">{r.role} · {r.date}</p>
                        </div>
                        <div className="flex text-amber-400">
                          {Array.from({ length: r.rating }).map((_, j) => (
                            <Star key={j} className="h-3.5 w-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="mt-2.5 text-xs leading-relaxed text-ink-soft dark:text-white/75">
                        &quot;{r.comment}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Interactive Sticky Booking & Pricing Widget */}
            <div>
              <TutorBookingWidget tutor={tutor} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SIMILAR TUTORS
         ========================================================= */}
      {similar.length ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-student-600 dark:text-student-400">
                {dict.common.brandName}
              </p>
              <h2 data-anim="up" className="mt-1 text-2xl font-extrabold text-ink dark:text-white">
                {dict.tutorsSection.title} ({localizedSubject})
              </h2>
            </div>
            <Link
              href={`/contact?subject=${encodeURIComponent(tutor.subjectLabel)}`}
              className="text-sm font-bold text-student-600 hover:underline dark:text-student-400"
            >
              {dict.common.findTutor} →
            </Link>
          </div>

          <div data-anim-stagger className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {similar.map((t, idx) => (
              <TutorCard key={t.slug} tutor={t} index={idx} />
            ))}
          </div>
        </section>
      ) : null}

      <CtaBand
        title={`Envie de progresser avec ${tutor.fullName} ?`}
        sub={dict.megaMenu.guaranteeDesc}
        tone="student"
      />
    </>
  );
}
