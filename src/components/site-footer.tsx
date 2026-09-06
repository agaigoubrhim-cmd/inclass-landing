"use client";

import Link from "next/link";
import { ArrowRight, Check, Loader2, Moon, Sun } from "lucide-react";

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
import { useState } from "react";
import { FALLBACK_SUBJECTS, CITIES, LEVELS } from "@/content/site";
import { MoroccoFlag } from "./icons";
import { useTheme } from "./site-header";
import { useI18n } from "@/i18n";
import { getLocalizedSubject } from "@/lib/subject-translations";

const LINK_CLASS = "transition-colors duration-200 hover:text-white";

function FooterNewsletter() {
  const { dict, isRTL } = useI18n();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Erreur");
      setState("done");
      setMessage(dict.footer.newsletterSuccess);
      setEmail("");
    } catch {
      setState("error");
      setMessage("Une erreur est survenue.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full space-y-3">
      <div className="flex items-center gap-3 border-b border-white/20 pb-2 transition-colors focus-within:border-white">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={dict.footer.newsletterPlaceholder}
          className="h-11 w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
        />
      </div>

      {/* Full button — hero style */}
      <button
        type="submit"
        disabled={state === "loading"}
        className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-tutor-500 px-8 text-[15px] font-bold text-white transition-all duration-300 hover:bg-tutor-600 hover:shadow-lg hover:shadow-tutor-500/25 disabled:opacity-60"
      >
        {state === "loading" ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : state === "done" ? (
          <Check className="h-5 w-5" />
        ) : (
          <ArrowRight
            className={`h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 ${
              isRTL ? "rotate-180 group-hover:-translate-x-1" : ""
            }`}
          />
        )}
        <span>{dict.footer.newsletterBtn}</span>
      </button>

      {message ? (
        <p className={`text-xs ${state === "error" ? "text-red-300" : "text-student-200"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}

export default function SiteFooter() {
  const { dict, locale } = useI18n();
  const { theme, toggle } = useTheme();

  const subjectGroups = [
    {
      label: "Scientifiques",
      items: FALLBACK_SUBJECTS.filter((s) => s.category === "Scientifique"),
    },
    {
      label: "Langues",
      items: FALLBACK_SUBJECTS.filter((s) => s.category === "Langues"),
    },
    {
      label: "Autres matières",
      items: FALLBACK_SUBJECTS.filter(
        (s) => s.category !== "Scientifique" && s.category !== "Langues"
      ),
    },
  ];

  const footerColumns = [
    {
      title: dict.common.students,
      links: [
        { label: dict.megaMenu.studentLink1, href: "/comment-ca-marche/eleves" },
        { label: dict.megaMenu.studentLink2, href: "/contact" },
        { label: dict.megaMenu.studentLink4, href: "/comment-ca-marche/eleves" },
        { label: dict.megaMenu.studentLink3, href: "/comment-ca-marche/eleves" },
        { label: dict.megaMenu.studentLink5, href: "/comment-ca-marche/eleves#parents" },
      ],
    },
    {
      title: dict.common.tutors,
      links: [
        { label: dict.megaMenu.tutorLink1, href: "/comment-ca-marche/profs" },
        { label: dict.megaMenu.tutorLink2, href: "/comment-ca-marche/profs#commissions" },
        { label: dict.megaMenu.tutorLink3, href: "/comment-ca-marche/profs#candidature" },
        { label: dict.megaMenu.tutorLink4, href: "/comment-ca-marche/profs#faq" },
      ],
    },
    {
      title: dict.common.parents,
      links: [
        { label: dict.megaMenu.parentLink1, href: "/comment-ca-marche/eleves#parents" },
        { label: dict.megaMenu.parentLink2, href: "/comment-ca-marche/eleves#suivi" },
        { label: dict.megaMenu.parentLink3, href: "/a-propos#confiance" },
        { label: dict.megaMenu.parentLink4, href: "/comment-ca-marche/eleves#faq" },
      ],
    },
    {
      title: dict.common.brandName,
      links: [
        { label: dict.nav.about, href: "/a-propos" },
        { label: dict.nav.resources, href: "/ressources" },
        { label: dict.nav.contact, href: "/contact" },
        { label: dict.faq.eyebrow, href: "/#faq" },
      ],
    },
  ];

  return (
    <footer className="w-full">
      {/* =========================================================
          DISCOVERY / SEO FOOTER LINKS (LIGHT SURFACE)
         ========================================================= */}
      <section className="w-full border-t border-line bg-sand/70 px-4 py-14 dark:border-white/10 dark:bg-white/[0.03] sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-lg font-bold text-ink dark:text-white">
            {dict.footer.subjectsTitle}
          </h2>

          {/* SUBJECTS */}
          <div className="mt-8 grid w-full gap-10 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {subjectGroups.map((group) => (
              <div key={group.label} className="min-w-0">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-ink-soft dark:text-white/50">
                  {group.label}
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {group.items.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/contact?subject=${encodeURIComponent(s.name)}`}
                      className={`${LINK_CLASS} truncate text-ink-soft dark:text-white/60`}
                    >
                      {getLocalizedSubject(s.slug, locale, s.name)}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* DISCOVERY COLUMNS */}
          <div className="mt-12 grid w-full gap-10 border-t border-line pt-10 text-sm dark:border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {/* HOME */}
            <div className="min-w-0">
              <p className="mb-4 font-bold text-ink dark:text-white">
                {dict.footer.homeCoursesTitle}
              </p>

              <div className="grid grid-cols-1 gap-2">
                {CITIES.slice(0, 8).map((city) => (
                  <Link
                    key={city}
                    href={`/contact?city=${encodeURIComponent(city)}`}
                    className={`${LINK_CLASS} truncate text-ink-soft dark:text-white/60`}
                  >
                    {dict.footer.tutorInCity} {city}
                  </Link>
                ))}
              </div>
            </div>

            {/* ONLINE */}
            <div className="min-w-0">
              <p className="mb-4 font-bold text-ink dark:text-white">
                {dict.footer.onlineCoursesTitle}
              </p>

              <ul className="space-y-2 text-ink-soft dark:text-white/60">
                {FALLBACK_SUBJECTS.slice(0, 8).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/contact?subject=${encodeURIComponent(s.name)}`}
                      className={`${LINK_CLASS} truncate`}
                    >
                      {getLocalizedSubject(s.slug, locale, s.name)} ({dict.footer.onlineSubject})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* LEVELS */}
            <div className="min-w-0">
              <p className="mb-4 font-bold text-ink dark:text-white">
                {dict.footer.levelsTitle}
              </p>

              <ul className="space-y-2 text-ink-soft dark:text-white/60">
                {LEVELS.map((level) => (
                  <li key={level}>
                    <Link
                      href="/comment-ca-marche/eleves"
                      className={`${LINK_CLASS} truncate`}
                    >
                      {level}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* EXAMS */}
            <div className="min-w-0">
              <p className="mb-4 font-bold text-ink dark:text-white">
                {dict.footer.examsTitle}
              </p>

              <ul className="space-y-2 text-ink-soft dark:text-white/60">
                {[
                  "Baccalauréat national",
                  "Concours médecine",
                  "Concours ingénieurs (CNC)",
                  "TCF / DELF",
                  "IELTS & TOEFL",
                  "Régional 1ère Bac",
                ].map((label) => (
                  <li key={label}>
                    <Link
                      href="/contact"
                      className={`${LINK_CLASS} truncate hover:text-parent-600 dark:hover:text-parent-300`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN BRAND FOOTER (DARK SURFACE — KOSBIOTIC-STYLE)
         ========================================================= */}
      <section className="relative overflow-hidden bg-[#070707] text-white">
        <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
          {/* Giant brand wordmark */}
          <div className="border-b border-white/10 pt-16 sm:pt-20">
            <Link href="/" aria-label={dict.common.brandName} className="block">
              <span className="block break-all text-[clamp(4.2rem,15.5vw,15rem)] font-extrabold leading-[0.82] tracking-[-0.07em] text-white transition-opacity hover:opacity-80">
                inclass
              </span>
            </Link>
          </div>

          {/* Content grid: newsletter + columns */}
          <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[minmax(260px,1fr)_2.3fr] lg:gap-24 lg:py-20">
            {/* Newsletter + socials */}
            <div className="min-w-0">
              <h3 className="text-sm font-bold tracking-tight">Newsletter</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/45">
                {dict.footer.tagline}
              </p>

              <div className="mt-6 max-w-sm">
                <FooterNewsletter />
              </div>

              <label className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-white/40">
                <input type="checkbox" className="accent-white" />
                <span>J&apos;accepte les conditions</span>
              </label>

              <div className="mt-6 flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white hover:text-white"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white hover:text-white"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Link columns */}
            <div className="grid min-w-0 grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              {footerColumns.map((col) => (
                <div key={col.title} className="min-w-0">
                  <p className="text-sm font-bold tracking-tight">{col.title}</p>
                  <ul className="mt-5 space-y-3 text-[13px] text-white/50">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-7 text-[10px] uppercase tracking-[0.18em] text-white/35">
            <p className="flex items-center gap-2">
              <MoroccoFlag className="h-4 w-6 rounded-sm opacity-80" />
              <span>COPYRIGHT INCLASS 2026</span>
            </p>
            <p className="text-white/35">{dict.footer.marocAll}</p>
            <div className="flex gap-6">
              <Link href="/a-propos" className="transition-colors hover:text-white">
                {dict.footer.legalNotice}
              </Link>
              <Link href="/a-propos" className="transition-colors hover:text-white">
                {dict.footer.privacy}
              </Link>
              <Link href="/a-propos" className="transition-colors hover:text-white">
                {dict.footer.terms}
              </Link>
            </div>
          </div>
        </div>

        {/* Floating theme toggle (bottom-right, like reference) */}
        <button
          type="button"
          onClick={toggle}
          aria-label="Basculer le thème"
          className="absolute bottom-6 right-6 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white/15"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </section>
    </footer>
  );
}