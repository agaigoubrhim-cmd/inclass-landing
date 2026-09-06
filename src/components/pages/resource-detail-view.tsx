"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  Headphones,
  Lightbulb,
  ListChecks,
  PenLine,
  Pause,
  Play,
  Volume2,
} from "lucide-react";
import PageHero from "@/components/page-hero";
import { CtaBand } from "@/components/sections";
import { RollingNumber } from "@/components/gsap/rolling-number";
import ArticleShareActions from "@/components/article-share-actions";
import {
  getDefaultArticleSections,
  normalizeResourceType,
  type ResourceItem,
  type ResourceType,
} from "@/lib/article-types";
import { ResourceTypeIcon } from "@/components/resource-type";
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

function ContentSections({ article }: { article: ResourceItem }) {
  const sections = getDefaultArticleSections();
  const paragraphs = article.body ? article.body.split("\n\n").filter(Boolean) : [];

  if (paragraphs.length) {
    return (
      <div className="mt-10 space-y-10">
        {paragraphs.map((paragraph, index) => (
          <section key={index} data-anim="up">
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft dark:text-white/80">{paragraph}</p>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-10">
      {sections.map((section, i) => (
        <section key={section.heading || i} data-anim="up">
          {section.heading ? (
            <h2 className="text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">{section.heading}</h2>
          ) : null}
          {section.paragraphs.map((paragraph, j) => (
            <p key={j} className="mt-4 text-[17px] leading-relaxed text-ink-soft dark:text-white/80">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}

function LeadBox({ article }: { article: ResourceItem }) {
  const { dict } = useI18n();
  return (
    <div
      data-anim="up"
      className="rounded-3xl border border-tutor-200/80 bg-tutor-50/70 p-6 dark:border-tutor-500/20 dark:bg-tutor-950/40 sm:p-8"
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-tutor-700 dark:text-tutor-300">
        <Lightbulb className="h-4 w-4" />
        {dict.resourcesPage.keyPoints}
      </div>
      <p className="mt-3 text-lg font-semibold leading-relaxed text-ink dark:text-white">{article.excerpt}</p>
    </div>
  );
}

function KeyPoints({ article }: { article: ResourceItem }) {
  const { dict } = useI18n();
  const points = article.tags && article.tags.length ? article.tags : article.excerpt.split(/[.!?]+/).filter(Boolean).slice(0, 5);
  return (
    <div data-anim="up" className="mt-8 rounded-3xl border border-line bg-white p-6 dark:border-white/10 dark:bg-ink-900 sm:p-7">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-white/60">
        <ListChecks className="h-4 w-4" />
        {dict.resourcesPage.keyPoints}
      </div>
      <ul className="mt-4 space-y-2.5">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft dark:text-white/80">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-tutor-500" aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PracticeArea({ article }: { article: ResourceItem }) {
  const { dict } = useI18n();
  const [answer, setAnswer] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const solution = article.body || article.excerpt;

  return (
    <div data-anim="up" className="mt-8 space-y-4">
      <div className="rounded-3xl border border-line bg-white p-6 dark:border-white/10 dark:bg-ink-900 sm:p-7">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-white/60">
          <PenLine className="h-4 w-4" />
          {dict.resourcesPage.practiceArea}
        </div>
        <label htmlFor="resource-answer" className="mt-4 block text-sm font-bold text-ink dark:text-white">
          {dict.resourcesPage.yourAnswer}
        </label>
        <textarea
          id="resource-answer"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          rows={6}
          className="mt-2 w-full resize-y rounded-2xl border border-line bg-cream/60 p-4 text-sm leading-relaxed text-ink placeholder:text-ink-soft/50 focus:border-tutor-500 focus:outline-none focus:ring-2 focus:ring-tutor-500/20 dark:border-white/10 dark:bg-ink-800 dark:text-white dark:placeholder:text-white/40"
          placeholder={article.excerpt}
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowSolution((v) => !v)}
            className="btn-duo inline-flex h-11 items-center gap-2 rounded-2xl px-5 text-sm font-extrabold"
          >
            {showSolution ? dict.resourcesPage.hideSolution : dict.resourcesPage.showSolution}
            <ChevronDown className={`h-4 w-4 transition-transform ${showSolution ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {showSolution ? (
        <div className="rounded-3xl border border-tutor-200 bg-tutor-50/70 p-6 dark:border-tutor-500/25 dark:bg-tutor-950/40 sm:p-7">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-tutor-700 dark:text-tutor-300">
            <ListChecks className="h-4 w-4" />
            {dict.resourcesPage.showSolution}
          </div>
          <div className="mt-4 space-y-3 text-[16px] leading-relaxed text-ink-soft dark:text-white/80">
            {solution.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MindMap({ article }: { article: ResourceItem }) {
  const { dict } = useI18n();
  const nodes = [
    article.category,
    article.subject,
    article.educationLevel,
    ...(article.tags || []),
  ].filter((node): node is string => Boolean(node));

  const center = article.title.slice(0, 32);
  const ring = nodes.slice(0, 8);

  return (
    <div data-anim="up" className="mt-8 rounded-3xl border border-line bg-white p-6 dark:border-white/10 dark:bg-ink-900 sm:p-8">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-white/60">
        <Lightbulb className="h-4 w-4" />
        {dict.resourcesPage.typeDescs.mind_map}
      </div>
      <div className="relative mt-6 grid place-items-center">
        <div className="pointer-events-none absolute inset-8 rounded-full border border-dashed border-line dark:border-white/10" aria-hidden="true" />
        <div
          className="z-10 max-w-[220px] rounded-2xl border border-parent-200 bg-parent-50 px-4 py-3 text-center text-sm font-extrabold text-parent-800 dark:border-parent-500/25 dark:bg-parent-950/50 dark:text-parent-200"
        >
          <span className="line-clamp-2 leading-snug">{center}</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {ring.map((node, i) => (
          <div
            key={`${node}-${i}`}
            className="rounded-2xl border border-line bg-sand/60 px-3 py-2.5 text-center text-xs font-bold text-ink-soft dark:border-white/10 dark:bg-white/5 dark:text-white/70"
          >
            {node}
          </div>
        ))}
      </div>
    </div>
  );
}

function MediaFrame({ article, type }: { article: ResourceItem; type: "video" | "audio" }) {
  const { dict } = useI18n();
  const [playing, setPlaying] = useState(false);
  const url = article.mediaUrl;
  const isVideo = type === "video";
  const label = isVideo ? dict.resourcesPage.playVideo : dict.resourcesPage.listenAudio;

  return (
    <div data-anim="up" className="mt-8 overflow-hidden rounded-3xl border border-line bg-ink-950 dark:border-white/10">
      {url ? (
        isVideo ? (
          <video src={url} poster={article.cover} controls className="aspect-video w-full bg-ink-950 object-cover" />
        ) : (
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-tutor-500 text-white transition-transform hover:scale-105 active:scale-95"
                aria-label={label}
              >
                {playing ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7" />}
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60">
                  <Volume2 className="h-4 w-4" />
                  {dict.resourcesPage.typeDescs.audio}
                </div>
                <p className="mt-1 line-clamp-2 text-base font-extrabold text-white">{article.title}</p>
              </div>
            </div>
            <audio src={url} controls className="mt-6 w-full" />
          </div>
        )
      ) : (
        <div className="relative aspect-video">
          <Image src={article.cover} alt={article.title} fill sizes="100vw" className="object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/55 to-ink-950/20" />
          <div className="absolute inset-0 grid place-items-center">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="grid h-20 w-20 place-items-center rounded-full bg-white/90 text-ink transition-transform hover:scale-105 active:scale-95"
              aria-label={label}
            >
              {playing ? <Pause className="h-9 w-9" /> : <Play className="h-9 w-9" />}
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <div className="mx-auto flex max-w-xl items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
              {isVideo ? <Play className="h-4 w-4" aria-hidden="true" /> : <Headphones className="h-4 w-4" aria-hidden="true" />}
              {label}
            </div>
            <p className="mx-auto mt-1 max-w-xl text-sm text-white/75">{dict.resourcesPage.mediaUnavailable}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ResourceContent({ article }: { article: ResourceItem }) {
  const { dict } = useI18n();
  const type: ResourceType = normalizeResourceType(article.type ?? article.resourceType);

  switch (type) {
    case "video":
      return (
        <>
          <MediaFrame article={article} type="video" />
          <LeadBox article={article} />
          <ContentSections article={article} />
        </>
      );
    case "audio":
      return (
        <>
          <MediaFrame article={article} type="audio" />
          <LeadBox article={article} />
          <ContentSections article={article} />
        </>
      );
    case "exercise":
    case "exercise_corrige":
      return (
        <>
          <LeadBox article={article} />
          <PracticeArea article={article} />
          <ContentSections article={article} />
        </>
      );
    case "mind_map":
      return (
        <>
          <LeadBox article={article} />
          <MindMap article={article} />
          <ContentSections article={article} />
        </>
      );
    case "notes":
      return (
        <>
          <LeadBox article={article} />
          <KeyPoints article={article} />
          <ContentSections article={article} />
        </>
      );
    case "guide":
      return (
        <>
          <LeadBox article={article} />
          <ContentSections article={article} />
        </>
      );
    case "article":
    default:
      return (
        <>
          <LeadBox article={article} />
          <ContentSections article={article} />
        </>
      );
  }
}

export default function ResourceDetailView({
  article,
  others,
  basePath = "/ressources",
}: {
  article: ResourceItem;
  others: ResourceItem[];
  basePath?: string;
}) {
  const { dict, locale, isRTL } = useI18n();
  const tone = TONE[article.audience] ?? "tutor";
  const type = normalizeResourceType(article.type ?? article.resourceType);
  const typeLabel = dict.resourcesPage.types[type] ?? dict.resourcesPage.types.article;

  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        tone={tone}
        image={article.cover}
        imageAlt={article.title}
        crumbs={[{ label: dict.nav.resources, href: basePath }, { label: article.category }]}
        sub={article.excerpt}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-white/85">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <ResourceTypeIcon type={type} className="h-3.5 w-3.5" />
            {typeLabel}
          </span>
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
            href={basePath}
            className="inline-flex items-center gap-2 text-sm font-semibold text-student-700 transition-colors hover:text-student-800 dark:text-student-400 dark:hover:text-student-300"
          >
            <ArrowLeft className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            {dict.resourcesPage.allArticles}
          </Link>

          <ArticleShareActions title={article.title} />
        </div>

        {/* Type-specific content */}
        <ResourceContent article={article} />

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
            <p className="text-sm text-ink-soft dark:text-white/60">{dict.footer.tagline}</p>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {others.length > 0 && (
        <section className="bg-sand/60 py-16 dark:bg-ink-950/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-ink dark:text-white">{dict.resourcesPage.relatedArticles}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => {
                const oType = normalizeResourceType(o.type ?? o.resourceType);
                return (
                  <Link
                    key={o.slug}
                    href={`${basePath}/${o.slug}`}
                    className="group rounded-3xl border border-line bg-white p-6 transition-all hover:-translate-y-1 dark:border-white/10 dark:bg-ink-800"
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-tutor-600 dark:text-tutor-400">
                      <ResourceTypeIcon type={oType} className="h-3.5 w-3.5" />
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
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CtaBand tone="tutor" />
    </>
  );
}
