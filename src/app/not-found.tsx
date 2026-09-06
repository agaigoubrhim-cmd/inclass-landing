"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Home,
  MessageCircle,
  Rocket,
  Search,
  Sparkles,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { RollingText } from "@/components/gsap/rolling-text";
import { useI18n } from "@/i18n";

export default function NotFound() {
  const router = useRouter();
  const { dict, isRTL } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/contact?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/contact");
    }
  };

  const popularPages = [
    {
      title: dict.nav.studentGuide,
      desc: dict.megaMenu.studentTagline,
      href: "/comment-ca-marche/eleves",
      icon: GraduationCap,
      tone: "border-student-200 bg-student-50/70 hover:bg-student-100/80 text-student-700 dark:border-student-500/20 dark:bg-student-950/40 dark:text-student-300",
      badge: dict.common.students,
    },
    {
      title: dict.nav.tutorGuide,
      desc: dict.megaMenu.tutorTagline,
      href: "/comment-ca-marche/profs",
      icon: Rocket,
      tone: "border-tutor-200 bg-tutor-50/70 hover:bg-tutor-100/80 text-tutor-700 dark:border-tutor-500/20 dark:bg-tutor-950/40 dark:text-tutor-300",
      badge: dict.common.tutors,
    },
    {
      title: dict.nav.resources,
      desc: dict.common.tagline,
      href: "/ressources",
      icon: BookOpen,
      tone: "border-amber-200 bg-amber-50/70 hover:bg-amber-100/80 text-amber-800 dark:border-amber-500/20 dark:bg-amber-950/40 dark:text-amber-300",
      badge: dict.nav.resources,
    },
    {
      title: dict.common.contactAdvisor,
      desc: dict.faq.supportAnswerTime,
      href: "/contact",
      icon: MessageCircle,
      tone: "border-parent-200 bg-parent-50/70 hover:bg-parent-100/80 text-parent-700 dark:border-parent-500/20 dark:bg-parent-950/40 dark:text-parent-300",
      badge: dict.nav.contact,
    },
  ];

  return (
    <section className="relative min-h-[85vh] overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* Background Decorative Glows */}
      <div className="pointer-events-none absolute left-1/2 top-12 -translate-x-1/2 -translate-y-1/2">
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Top Status Pill */}
        <div data-anim="up" className="inline-flex items-center gap-2 rounded-full border border-student-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-student-700 backdrop-blur-md dark:border-student-500/30 dark:bg-ink-800/80 dark:text-student-300">
          <Sparkles className="h-3.5 w-3.5 text-student-500" />
          <span>{dict.notFound.statusBadge}</span>
        </div>

        {/* Big Stylized 404 Heading */}
        <h1
          data-anim="up"
          className="mt-6 text-[clamp(4.5rem,14vw,9rem)] font-black leading-none tracking-tight text-ink dark:text-white"
        >
          4<span className="bg-gradient-to-r from-student-500 via-tutor-500 to-parent-500 bg-clip-text text-transparent">0</span>4
        </h1>

        <p data-anim="up" className="mt-2 text-xl font-extrabold text-ink dark:text-white sm:text-2xl">
          {dict.notFound.title}
        </p>

        <p data-anim="up" className="mx-auto mt-3 max-w-xl text-base text-ink-soft dark:text-white/70">
          {dict.notFound.description}
        </p>

        {/* Quick Embedded Search Bar */}
        <form
          data-anim="up"
          onSubmit={handleSearch}
          className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full border border-line bg-white p-1.5 transition-all focus-within:border-student-500 focus-within:ring-2 focus-within:ring-student-500/20 dark:border-white/15 dark:bg-ink-800"
        >
          <div className="flex flex-1 items-center gap-2.5 pl-3">
            <Search className="h-4 w-4 text-ink-soft dark:text-white/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dict.notFound.searchPlaceholder}
              className="w-full bg-transparent text-sm font-medium text-ink placeholder:text-ink-soft/60 focus:outline-none dark:text-white dark:placeholder:text-white/40"
            />
          </div>
          <button
            type="submit"
            className="btn-duo inline-flex h-10 items-center gap-1.5 rounded-2xl px-5 text-xs font-extrabold"
          >
            <span>{dict.notFound.searchBtn}</span>
            <ArrowRight className={`h-3.5 w-3.5 ${isRTL ? "rotate-180" : ""}`} />
          </button>
        </form>

        {/* Action Buttons */}
        <div data-anim="up" className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="btn-duo group inline-flex h-12 items-center gap-2 rounded-2xl px-7 text-sm font-extrabold"
          >
            <Home className="h-4 w-4" />
            <RollingText text={dict.notFound.btnHome} />
          </Link>

          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-duo inline-flex h-12 items-center gap-2 rounded-2xl px-6 text-sm font-extrabold"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>{dict.notFound.btnWhatsapp}</span>
          </a>

          <Link
            href="/contact"
            className="btn-duo btn-duo-white inline-flex h-12 items-center gap-2 rounded-2xl px-6 text-sm font-extrabold"
          >
            <span>{dict.notFound.btnContact}</span>
          </Link>
        </div>

        {/* Helpful Shortcut Cards Grid */}
        <div className="mt-14 text-left">
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-white/50">
            {dict.notFound.popularPages}
          </p>

          <div data-anim-stagger className="grid gap-4 sm:grid-cols-2">
            {popularPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.href}
                  data-anim-child
                  href={page.href}
                  className={`group flex items-start gap-4 rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-1 ${page.tone}`}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white dark:bg-ink-900">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider opacity-75">
                        {page.badge}
                      </span>
                      <ArrowRight className={`h-4 w-4 opacity-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100 ${isRTL ? "rotate-180" : ""}`} />
                    </div>
                    <p className="mt-1 text-base font-extrabold text-ink dark:text-white">
                      {page.title}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-soft line-clamp-2 dark:text-white/70">
                      {page.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
