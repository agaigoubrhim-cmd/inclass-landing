"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Lightbulb,
  PenLine,
} from "lucide-react";
import PageHero from "@/components/page-hero";
import { CtaBand } from "@/components/sections";
import { RollingNumber } from "@/components/gsap/rolling-number";
import ArticleShareActions from "@/components/article-share-actions";
import { type ArticleItem, getDefaultArticleSections } from "@/lib/article-types";
import { useI18n } from "@/i18n";

const TONE: Record<string, "student" | "tutor" | "parent"> = {
  student: "student",
  tutor: "tutor",
  parent: "parent",
};

function formatDate(date: Date, locale: string) {
  const locMap: Record<string, string> = {
    fr: "fr-MA",
    en: "en-US",
    es: "es-ES",
    ar: "ar-MA",
  };
  return new Intl.DateTimeFormat(locMap[locale] ?? "fr-MA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default function ResourceDetailView({
  article,
  others,
}: {
  article: ArticleItem;
  others: ArticleItem[];
}) {
  const { dict, locale, isRTL } = useI18n();
  const sections = getDefaultArticleSections();
  const tone = TONE[article.audience] ?? "tutor";

  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        tone={tone}
        image={article.cover}
        imageAlt={article.title}
        crumbs={[{ label: dict.nav.resources, href: "/ressources" }, { label: article.category }]}
        sub={article.excerpt}
      >
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-white/85">
          <span className="inline-flex items-center gap-2">
            <PenLine className="h-4 w-4" /> {article.author}
          </span>
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4" /> {formatDate(article.publishedAt, locale)}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock3 className="h-4 w-4" />{" "}
            <RollingNumber targetNumber={article.readMinutes} height={18} /> {dict.resourcesPage.minRead}
          </span>
        </div>
      </PageHero>

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Navigation & Share Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6 dark:border-white/10">
          <Link
            href="/ressources"
            className="inline-flex items-center gap-2 text-sm font-semibold text-student-700 transition-colors hover:text-student-800 dark:text-student-400 dark:hover:text-student-300"
          >
            <ArrowLeft className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            {dict.resourcesPage.allArticles}
          </Link>

          <ArticleShareActions title={article.title} />
        </div>

        {/* Lead Excerpt */}
        <div
          data-anim="up"
          className="mt-8 rounded-3xl border border-student-200/80 bg-student-50/70 p-6 dark:border-student-500/20 dark:bg-student-950/40 sm:p-8"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-student-700 dark:text-student-300">
            <Lightbulb className="h-4 w-4" />
            {dict.aboutPage.eyebrow}
          </div>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-ink dark:text-white">
            {article.excerpt}
          </p>
        </div>

        {/* Content sections */}
        <div className="mt-10 space-y-10">
          {(article.body ? [{ heading: "", paragraphs: article.body.split("\n\n") }] : sections).map(
            (section, i) => (
              <section key={section.heading || i} data-anim="up">
                {section.heading ? (
                  <h2 className="text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">
                    {section.heading}
                  </h2>
                ) : null}
                {section.paragraphs.map((paragraph, j) => (
                  <p
                    key={j}
                    className="mt-4 text-[17px] leading-relaxed text-ink-soft dark:text-white/80"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ),
          )}
        </div>

        {/* Author Bio Box */}
        <div
          data-anim="up"
          className="mt-12 flex flex-wrap items-center gap-5 rounded-3xl border border-line bg-white p-6 dark:border-white/10 dark:bg-ink-900 sm:p-7"
        >
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-tutor-100 text-xl font-bold text-tutor-700 dark:bg-tutor-950 dark:text-tutor-300">
            {article.author.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-tutor-600 dark:text-tutor-400">
              {dict.resourcesPage.writtenBy}
            </p>
            <h3 className="text-lg font-extrabold text-ink dark:text-white">{article.author}</h3>
            <p className="text-sm text-ink-soft dark:text-white/60">
              {dict.footer.tagline}
            </p>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {others.length > 0 && (
        <section className="bg-sand/60 py-16 dark:bg-ink-950/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-ink dark:text-white">
              {dict.resourcesPage.relatedArticles}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/ressources/${o.slug}`}
                  className="group rounded-3xl border border-line bg-white p-6 transition-all hover:-translate-y-1 dark:border-white/10 dark:bg-ink-800"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-tutor-600 dark:text-tutor-400">
                    {o.category}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-ink transition-colors group-hover:text-tutor-600 dark:text-white">
                    {o.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-tutor-600 dark:text-tutor-400">
                    {dict.common.readArticle}
                    <ArrowRight className={`h-3.5 w-3.5 ${isRTL ? "rotate-180" : ""}`} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand tone="tutor" />
    </>
  );
}
