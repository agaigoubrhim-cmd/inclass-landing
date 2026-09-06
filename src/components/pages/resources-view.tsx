"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AlertTriangle, ArrowRight, BookOpen, Clock3, RefreshCw, Search, X } from "lucide-react";
import PageHero from "@/components/page-hero";
import { CtaBand } from "@/components/sections";
import { RollingNumber } from "@/components/gsap/rolling-number";
import { ARTICLE_CATEGORIES, type ArticleItem } from "@/lib/article-types";
import { useI18n } from "@/i18n";

const AUDIENCE_TAGS: Record<string, { cls: string }> = {
  student: { cls: "bg-student-100 text-student-800 dark:bg-student-950/80 dark:text-student-300" },
  tutor: { cls: "bg-tutor-100 text-tutor-800 dark:bg-tutor-950/80 dark:text-tutor-300" },
  parent: { cls: "bg-parent-100 text-parent-800 dark:bg-parent-950/80 dark:text-parent-300" },
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
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function ResourcesView({
  articles,
  selectedCategory = "",
  basePath = "/ressources",
  initialError = false,
}: {
  articles: ArticleItem[];
  selectedCategory?: string;
  basePath?: string;
  initialError?: boolean;
}) {
  const { dict, locale, isRTL } = useI18n();
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = articles.filter((article) => {
    if (normalizedQuery) {
      const haystack = `${article.title} ${article.excerpt} ${article.category} ${article.author}`.toLowerCase();
      if (!haystack.includes(normalizedQuery)) return false;
    }
    return true;
  });

  const hasActiveFilter = Boolean(normalizedQuery || selectedCategory);

  return (
    <>
      <PageHero
        eyebrow={dict.resourcesPage.eyebrow}
        title={dict.resourcesPage.title}
        highlight={dict.resourcesPage.highlight}
        tone="tutor"
        image="/images/banner-resources.jpg"
        imageAlt="INCLASS Resources"
        crumbs={[{ label: dict.nav.resources }]}
        sub={dict.resourcesPage.sub}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Category Filters Bar */}
        <div data-anim="up" className="flex flex-wrap items-center gap-2.5 pb-2">
          <Link
            href={basePath}
            className={`rounded-full px-5 py-2 text-sm font-bold transition-all duration-200 ${
              !selectedCategory
                ? "bg-ink text-cream dark:bg-white dark:text-ink"
                : "border border-line bg-white text-ink-soft hover:border-student-300 hover:bg-sand dark:border-white/10 dark:bg-ink-800 dark:text-white/70 dark:hover:bg-ink-700"
            }`}
          >
            {dict.resourcesPage.allArticles}
          </Link>
          {ARTICLE_CATEGORIES.map((c) => {
            const isSelected = selectedCategory === c;
            return (
              <Link
                key={c}
                href={`${basePath}?categorie=${encodeURIComponent(c)}`}
                className={`rounded-full border px-5 py-2 text-sm font-bold transition-all duration-200 ${
                  isSelected
                    ? "border-tutor-500 bg-tutor-500 text-white"
                    : "border-line bg-white text-ink-soft hover:border-tutor-300 hover:bg-sand dark:border-white/10 dark:bg-ink-800 dark:text-white/70 dark:hover:bg-ink-700"
                }`}
              >
                {c}
              </Link>
            );
          })}
        </div>

        {/* Search */}
        <div data-anim="up" className="mt-6">
          <div className="mx-auto flex max-w-xl items-center gap-2.5 rounded-full border border-line bg-white p-2 pl-4 transition-all focus-within:border-tutor-500 focus-within:ring-2 focus-within:ring-tutor-500/20 dark:border-white/15 dark:bg-ink-800">
            <Search className="h-4 w-4 shrink-0 text-ink-soft dark:text-white/50" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={dict.resourcesPage.searchPlaceholder}
              aria-label={dict.common.search}
              className="h-10 w-full min-w-0 bg-transparent text-sm font-medium text-ink placeholder:text-ink-soft/60 focus:outline-none dark:text-white dark:placeholder:text-white/40"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={dict.common.close}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink/5 text-ink-soft transition-colors hover:bg-ink/10 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/15"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>

        {/* Counter */}
        <p data-anim="up" className="mt-8 text-sm font-medium text-ink-soft dark:text-white/60">
          <span className="font-extrabold text-ink dark:text-white">
            <RollingNumber targetNumber={filtered.length} height={18} />
          </span>{" "}
          {dict.resourcesPage.availableArticles}
        </p>

        {/* Unified Premium Resource Cards Grid */}
        {initialError && articles.length === 0 ? (
          <div className="mt-12 rounded-[32px] border border-amber-200 bg-amber-50/80 p-10 text-center dark:border-amber-500/25 dark:bg-amber-950/30 sm:p-14">
            <AlertTriangle className="mx-auto h-10 w-10 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            <p className="mt-4 text-lg font-extrabold text-ink dark:text-white">
              {dict.errorState.title}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft dark:text-white/70">
              {dict.errorState.description}
            </p>
            <Link
              href={basePath}
              className="btn-duo mt-6 inline-flex h-11 items-center gap-2 rounded-2xl px-6 text-sm font-extrabold"
            >
              <RefreshCw className="h-4 w-4" />
              <span>{dict.errorState.btnRetry}</span>
            </Link>
          </div>
        ) : filtered.length ? (
          <div data-anim-stagger className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => {
              const tag = AUDIENCE_TAGS[article.audience] ?? AUDIENCE_TAGS.student;
              const coverImg = article.cover || "/images/banner-resources.jpg";

              return (
                <Link
                  key={article.slug}
                  data-anim-child
                  href={`${basePath}/${article.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-[30px] border border-line bg-white transition-all duration-300 hover:-translate-y-1.5 dark:border-white/10 dark:bg-ink-800"
                >
                  {/* Cover Image Container */}
                  <div className="relative h-52 w-full overflow-hidden bg-sand dark:bg-ink-900">
                    <Image
                      src={coverImg}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Category & Audience Pills */}
                    <div className="absolute left-4 rtl:left-auto rtl:right-4 top-4 flex flex-wrap gap-2">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md ${tag.cls}`}>
                        {article.category}
                      </span>
                    </div>

                    {/* Reading time badge */}
                    <div className="absolute bottom-3 right-4 rtl:right-auto rtl:left-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                      <Clock3 className="h-3.5 w-3.5" />
                      <span>{article.readMinutes} {dict.resourcesPage.minRead}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      {/* Title */}
                      <h3 className="text-lg font-extrabold leading-snug text-ink transition-colors group-hover:text-tutor-600 dark:text-white dark:group-hover:text-tutor-400">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft line-clamp-3 dark:text-white/70">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Author & Date Footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-line/70 pt-4 dark:border-white/10">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-tutor-100 text-xs font-extrabold text-tutor-700 dark:bg-tutor-950 dark:text-tutor-300">
                          {article.author.slice(0, 2).toUpperCase()}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-ink dark:text-white line-clamp-1">
                            {article.author}
                          </p>
                          <p className="text-[11px] text-ink-soft dark:text-white/50">
                            {formatDate(article.publishedAt, locale)}
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-tutor-600 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 dark:text-tutor-400">
                        <span>{dict.common.readArticle}</span>
                        <ArrowRight className={`h-3.5 w-3.5 ${isRTL ? "rotate-180" : ""}`} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-12 rounded-[32px] border border-dashed border-line bg-white p-14 text-center dark:border-white/10 dark:bg-ink-800">
            <BookOpen className="mx-auto h-10 w-10 text-ink-soft dark:text-white/40" aria-hidden="true" />
            <p className="mt-4 text-lg font-extrabold text-ink dark:text-white">
              {hasActiveFilter ? dict.resourcesPage.noResults : dict.resourcesPage.allArticles}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft dark:text-white/70">
              {hasActiveFilter ? dict.common.search : dict.resourcesPage.sub}
            </p>
            <Link
              href={basePath}
              className="btn-duo mt-6 inline-flex h-11 items-center rounded-2xl px-6 text-sm font-extrabold"
            >
              {dict.resourcesPage.allArticles}
            </Link>
          </div>
        )}
      </section>

      <CtaBand tone="tutor" />
    </>
  );
}
