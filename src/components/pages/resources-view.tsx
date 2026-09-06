"use client";

import Link from "next/link";
import { useState } from "react";
import { AlertTriangle, BookOpen, RefreshCw, Search, X } from "lucide-react";
import PageHero from "@/components/page-hero";
import { CtaBand } from "@/components/sections";
import { RollingNumber } from "@/components/gsap/rolling-number";
import { ARTICLE_CATEGORIES, RESOURCE_TYPES, type ResourceItem } from "@/lib/article-types";
import { useLanguageResources } from "@/lib/use-language-resources";
import { ResourceTypeIcon } from "@/components/resource-type";
import ResourceCard from "@/components/resource-card";
import { useI18n } from "@/i18n";

function ResourcesSkeleton() {
  return (
    <div className="mt-8 grid grid-cols-1 animate-pulse items-stretch gap-5 sm:gap-6 md:grid-cols-2 md:gap-7 lg:grid-cols-3" aria-busy="true" role="status">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-[360px] rounded-[26px] border border-line bg-white dark:border-white/10 dark:bg-ink-800">
          <div className="h-40 rounded-t-[26px] bg-sand dark:bg-ink-900" />
          <div className="space-y-3 p-6">
            <div className="h-4 w-3/4 rounded-full bg-ink/10 dark:bg-white/15" />
            <div className="h-3 w-full rounded-full bg-ink/5 dark:bg-white/10" />
            <div className="h-3 w-5/6 rounded-full bg-ink/5 dark:bg-white/10" />
          </div>
        </div>
      ))}
      <span className="sr-only">Chargement…</span>
    </div>
  );
}

export default function ResourcesView({
  articles,
  initialLocale = "fr",
  selectedCategory = "",
  selectedType = "",
  basePath = "/ressources",
  initialError = false,
}: {
  articles: ResourceItem[];
  initialLocale?: string;
  selectedCategory?: string;
  selectedType?: string;
  basePath?: string;
  initialError?: boolean;
}) {
  const { dict } = useI18n();
  const [query, setQuery] = useState("");
  const { articles: langArticles, total: languageTotal, loading, error } = useLanguageResources(
    articles,
    initialLocale,
  );

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = langArticles.filter((article) => {
    if (normalizedQuery) {
      const typeLabel = dict.resourcesPage.types[article.resourceType] ?? "";
      const haystack = `${article.title} ${article.excerpt} ${article.category} ${article.author} ${
        article.tags?.join(" ") ?? ""
      } ${typeLabel}`.toLowerCase();
      if (!haystack.includes(normalizedQuery)) return false;
    }
    return true;
  });

  const hasActiveFilter = Boolean(normalizedQuery || selectedCategory || selectedType);
  const languageEmpty = languageTotal === 0 && !hasActiveFilter;

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
        {/* Resource Type Selector */}
        <div data-anim="up" className="rounded-[30px] border border-line bg-white/60 p-5 sm:p-7 dark:border-white/10 dark:bg-ink-800/60">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-tutor-100 text-xs font-extrabold text-tutor-700 dark:bg-tutor-950/80 dark:text-tutor-300">
                1
              </span>
              <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-ink dark:text-white">
                {dict.resourcesPage.typeOfResource}
              </h2>
            </div>
            <Link
              href={basePath}
              className="rounded-full border border-line bg-white px-4 py-1.5 text-xs font-bold text-ink-soft transition-colors hover:border-tutor-300 hover:bg-sand dark:border-white/10 dark:bg-ink-800 dark:text-white/70 dark:hover:bg-ink-700"
            >
              {dict.resourcesPage.typeAll}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {RESOURCE_TYPES.map((type) => {
              const isSelected = selectedType === type;
              const label = dict.resourcesPage.types[type];
              const desc = dict.resourcesPage.typeDescs[type];
              return (
                <Link
                  key={type}
                  href={`${basePath}?type=${type}${selectedCategory ? `&categorie=${encodeURIComponent(selectedCategory)}` : ""}`}
                  aria-pressed={isSelected}
                  className={`group flex flex-col items-center gap-1.5 rounded-2xl border p-4 text-center transition-all duration-200 sm:p-5 ${
                    isSelected
                      ? "border-tutor-500 bg-tutor-50 ring-2 ring-tutor-500/15 dark:border-tutor-400 dark:bg-tutor-950/50"
                      : "border-line bg-white hover:-translate-y-0.5 hover:border-tutor-300 hover:bg-sand dark:border-white/10 dark:bg-ink-900 dark:hover:border-tutor-500/40 dark:hover:bg-ink-700/50"
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-xl transition-transform duration-200 group-hover:scale-110 ${
                      isSelected ? "bg-tutor-500 text-white" : "bg-sand text-ink-soft dark:bg-white/10 dark:text-white/70"
                    }`}
                  >
                    <ResourceTypeIcon type={type} className="h-5 w-5" />
                  </span>
                  <strong
                    className={`text-sm font-extrabold ${
                      isSelected ? "text-tutor-700 dark:text-tutor-300" : "text-ink dark:text-white"
                    }`}
                  >
                    {label}
                  </strong>
                  <span className="text-xs leading-snug text-ink-soft dark:text-white/55">{desc}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Category Filters Bar */}
        <div data-anim="up" className="mt-8 flex flex-wrap items-center gap-2.5">
          <Link
            href={selectedType ? `${basePath}?type=${selectedType}` : basePath}
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
                href={`${basePath}?categorie=${encodeURIComponent(c)}${
                  selectedType ? `&type=${selectedType}` : ""
                }`}
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
          <div className="mx-auto flex max-w-xl items-center gap-2.5 rounded-full border border-line bg-white p-2 ps-4 transition-all focus-within:border-tutor-500 focus-within:ring-2 focus-within:ring-tutor-500/20 dark:border-white/15 dark:bg-ink-800">
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
        {loading ? (
          <ResourcesSkeleton />
        ) : initialError || error ? (
          <div className="mt-12 rounded-[32px] border border-amber-200 bg-amber-50/80 p-10 text-center dark:border-amber-500/25 dark:bg-amber-950/30 sm:p-14">
            <AlertTriangle className="mx-auto h-10 w-10 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            <p className="mt-4 text-lg font-extrabold text-ink dark:text-white">{dict.errorState.title}</p>
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
          <div data-anim-stagger className="mt-8 grid grid-cols-1 items-stretch gap-5 sm:gap-6 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
            {filtered.map((article) => (
              <ResourceCard key={article.slug} article={article} basePath={basePath} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-[32px] border border-dashed border-line bg-white p-14 text-center dark:border-white/10 dark:bg-ink-800">
            <BookOpen className="mx-auto h-10 w-10 text-ink-soft dark:text-white/40" aria-hidden="true" />
            <p className="mt-4 text-lg font-extrabold text-ink dark:text-white">
              {languageEmpty
                ? dict.resourcesPage.noContentInLanguage
                : hasActiveFilter
                  ? dict.resourcesPage.noResults
                  : dict.resourcesPage.allArticles}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft dark:text-white/70">
              {languageEmpty
                ? dict.resourcesPage.sub
                : hasActiveFilter
                  ? dict.common.search
                  : dict.resourcesPage.sub}
            </p>
            <Link href={basePath} className="btn-duo mt-6 inline-flex h-11 items-center rounded-2xl px-6 text-sm font-extrabold">
              {dict.resourcesPage.allArticles}
            </Link>
          </div>
        )}
      </section>

      <CtaBand tone="tutor" />
    </>
  );
}
