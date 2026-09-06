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
  FileText,
  Headphones,
  Lightbulb,
  ListChecks,
  NotebookPen as NotebookPenIcon,
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

function EditorialArticle({ article }: { article: ResourceItem }) {
  const { dict, isRTL } = useI18n();

  const paragraphs = (article.body ? article.body.split("\n\n").filter(Boolean) : []).map((p) =>
    p.replace(/\s+/g, " ").trim(),
  );
  const fallback = getDefaultArticleSections()
    .flatMap((s) => [s.heading, ...s.paragraphs])
    .filter(Boolean);
  const body = paragraphs.length ? paragraphs : fallback;

  const lead = body.slice(0, 2);
  const rest = body.slice(2);

  const serif = {
    fontFamily:
      "Georgia, 'Times New Roman', 'Noto Serif', serif",
  };
  const rightImg = article.coverImageUrl || (article.cover && /^https?:/i.test(article.cover) ? article.cover : null);
  const hasImage = Boolean(rightImg);

  return (
    <div data-anim="up" className="border-b-4 border-ink dark:border-white">
      {/* Masthead */}
      <div className="border-y border-ink pt-4 pb-5 text-center dark:border-white">
        <div className="flex items-center justify-between border-b border-ink pb-2 text-[11px] font-bold uppercase tracking-[0.22em] dark:border-white/60">
          <span className="text-ink dark:text-white">{dict.common.brandName}</span>
          <span className="text-ink-soft dark:text-white/60">{article.category}</span>
        </div>
        <h1
          className="mt-5 text-[clamp(2.1rem,6vw,3.6rem)] font-black leading-[1.02] text-ink dark:text-white"
          style={serif}
        >
          {article.title}
        </h1>
        <p
          className="mx-auto mt-3 max-w-2xl text-[18px] italic text-ink-soft dark:text-white/70"
          style={serif}
        >
          {article.excerpt}
        </p>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft dark:text-white/50">
          {article.author} · {formatDate(article.publishedAt, "fr")}
        </p>
      </div>

      {/* Lead spread: drop-cap text + featured image */}
      <div className="grid gap-8 pt-8 md:grid-cols-2 md:items-start">
        <div className="space-y-5 text-[17px] leading-[1.85] text-ink-soft dark:text-white/80" style={serif}>
          {lead.map((paragraph, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "first-letter:float-left first-letter:mr-3 first-letter:text-[58px] first-letter:font-black first-letter:leading-[0.75] first-letter:text-ink dark:first-letter:text-white"
                  : ""
              }
            >
              {paragraph}
            </p>
          ))}
          <div className="border-l-4 border-ink pl-4 text-[15px] italic leading-relaxed text-ink dark:text-white/80 dark:border-white">
            {article.tags?.length ? article.tags.slice(0, 3).join(" · ") : article.category}
          </div>
        </div>

        <figure className="md:pt-2">
          <div className="relative aspect-[4/3] overflow-hidden bg-sand dark:bg-ink-900">
            {hasImage && rightImg ? (
              <Image
                src={rightImg}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(45deg,#f1f2f6,#f1f2f6_8px,#e9ebf2_8px,#e9ebf2_16px)] dark:bg-[repeating-linear-gradient(45deg,#141a2e,#141a2e_8px,#0d111f_8px,#0d111f_16px)]">
                <span className="text-[13px] font-bold uppercase tracking-[0.22em] text-ink-soft dark:text-white/60" style={serif}>
                  {dict.resourcesPage.imageNotFound}
                </span>
              </div>
            )}
          </div>
          <figcaption
            className="mt-2 text-xs italic text-ink-soft dark:text-white/50"
            style={serif}
          >
            {dict.common.brandName} — {article.category}
          </figcaption>
        </figure>
      </div>

      {/* Body spread: text + supporting pull-quote / detail */}
      <div className="mt-10 grid gap-8 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5 text-[16px] leading-[1.9] text-ink-soft dark:text-white/75" style={serif}>
          {rest.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="border-y border-ink py-5 text-center dark:border-white">
            <p
              className="text-[22px] font-bold italic leading-snug text-ink dark:text-white"
              style={serif}
            >
              « {article.excerpt.slice(0, 90) || article.category} »
            </p>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft dark:text-white/50">
              {dict.resourcesPage.keyPoints}
            </p>
          </div>
          <ul className="space-y-2.5 text-sm leading-relaxed text-ink-soft dark:text-white/70" style={serif}>
            {(article.tags?.length
              ? article.tags
              : [article.category, article.subject, article.educationLevel].filter(Boolean)
            )
              .slice(0, 6)
              .map((tag, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink dark:bg-white" aria-hidden="true" />
                  <span>{tag}</span>
                </li>
              ))}
          </ul>
        </aside>
      </div>

      {/* Page footer */}
      <div className="mt-10 flex items-center justify-between border-t border-ink pt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft dark:border-white/60 dark:text-white/50">
        <span dir={isRTL ? "rtl" : "ltr"}>www.inclass.app</span>
        <span>01</span>
      </div>
    </div>
  );
}

function NotepadDetail({ article }: { article: ResourceItem }) {
  const { dict } = useI18n();
  const paragraphs = (article.body || article.excerpt)
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const points =
    article.tags && article.tags.length
      ? article.tags
      : paragraphs.slice(0, 5);

  return (
    <div data-anim="up" className="relative overflow-hidden rounded-[12px] bg-[#fff9c9] text-[#4a4a2a] dark:bg-[#3d3a1c] dark:text-amber-50">
      {/* ruled paper */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 38px, rgba(136,133,80,0.32) 38px, rgba(136,133,80,0.32) 39px)",
        }}
      />
      {/* red margin lines */}
      <div aria-hidden="true" className="absolute inset-y-0 left-10 w-px bg-[#e66] opacity-60 sm:left-14" />
      <div aria-hidden="true" className="absolute inset-y-0 left-12 w-px bg-[#e66] opacity-40 sm:left-16" />
      <div aria-hidden="true" className="absolute inset-y-0 right-10 w-px bg-[#e66] opacity-40 sm:right-14" />
      {/* soft bottom shadow */}
      <div aria-hidden="true" className="absolute inset-x-2 bottom-0 h-6 bg-gradient-to-t from-black/15 to-transparent" />

      {/* metal clip */}
      <div aria-hidden="true" className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
        <div className="flex flex-col items-center">
          <div className="h-6 w-20 rounded-t-md bg-gradient-to-b from-[#f6f6f6] via-[#cfcfcf] to-[#9a9a9a] shadow-[0_3px_4px_rgba(0,0,0,0.25)]" />
          <div className="h-2 w-10 rounded-b-md bg-gradient-to-b from-[#ef7f2e] to-[#c85619] shadow-[0_3px_4px_rgba(0,0,0,0.18)]" />
        </div>
        <div className="absolute -bottom-6 left-1/2 h-12 w-11 -translate-x-1/2 rounded-b-full rounded-t-lg border-[3px] border-[#b9b9b9] border-t-0 bg-transparent shadow-[inset_0_-2px_4px_rgba(0,0,0,0.15)]" />
      </div>

      <div className="relative z-10 px-12 pb-12 pt-16 sm:px-16 sm:pt-20">
        {/* header */}
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#8f8a3a] dark:text-amber-300">
            <NotebookPenIcon className="h-4 w-4" aria-hidden="true" />
            {dict.resourcesPage.types.notes}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8f8a3a] dark:text-amber-300">
            {article.readMinutes} {dict.resourcesPage.minRead}
          </span>
        </div>

        <h1 className="mt-4 text-[clamp(1.8rem,5vw,3rem)] font-extrabold leading-tight text-[#4a4a2a] dark:text-amber-100">
          {article.title}
        </h1>

        <p className="mt-5 text-[16px] leading-[2.1] text-[#5b5a33] dark:text-amber-100/75">
          {article.excerpt}
        </p>

        {/* written notes */}
        <div className="mt-8 space-y-6">
          {paragraphs.slice(0, 8).map((paragraph, i) => (
            <p key={i} className="text-[15px] leading-[2.1] text-[#5b5a33] dark:text-amber-100/75">
              {paragraph}
            </p>
          ))}
        </div>

        {/* key points at the bottom of the page */}
        <div className="mt-10 border-t border-[#b9b48a]/60 pt-6">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8f8a3a] dark:text-amber-300">
            {dict.resourcesPage.keyPoints}
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {points.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-[#5b5a33] dark:text-amber-100/75">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e66]" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* footer */}
        <div className="mt-10 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f8a3a] dark:text-amber-300">
          <span dir="ltr">{article.author}</span>
          <span>01</span>
        </div>
      </div>
    </div>
  );
}

function VintageGuidePage({ article }: { article: ResourceItem }) {
  const { dict } = useI18n();
  const serif = {
    fontFamily: "Georgia, 'Times New Roman', 'Noto Serif', serif",
  };

  const items = [
    article.category,
    article.subject,
    article.educationLevel,
    ...(article.tags || []),
  ]
    .filter((item): item is string => Boolean(item))
    .slice(0, 8);

  const paragraphs = (article.body || article.excerpt)
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div
      data-anim="up"
      className="relative mx-auto max-w-3xl overflow-hidden rounded-[8px] border border-[#c8b890] bg-[#f4ecd8] px-6 py-12 text-[#4a3c25] sm:px-14 sm:py-16 dark:bg-[#2c2620] dark:text-amber-50"
    >
      {/* aged paper texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 25%, rgba(133,105,62,0.28) 0, transparent 32%), radial-gradient(circle at 85% 75%, rgba(133,105,62,0.2) 0, transparent 30%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, rgba(120,95,55,0.04) 0, rgba(120,95,55,0.04) 1px, transparent 1px, transparent 10px)",
        }}
      />

      <div className="relative z-10">
        {/* ornamental masthead */}
        <div className="border-t-4 border-double border-[#4a3c25] dark:border-amber-100" />
        <div className="mt-1 border-t border-[#4a3c25] dark:border-amber-100/70" />

        {/* title */}
        <div className="mt-8 text-center">
          <h1
            className="text-[clamp(2.2rem,7vw,4rem)] font-black uppercase tracking-[0.14em] leading-none text-[#2f2413] dark:text-amber-100"
            style={serif}
          >
            {dict.resourcesPage.contents}
          </h1>
          <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#6e5832] dark:text-amber-300" style={serif}>
            {article.title}
          </p>
          <p className="mx-auto mt-5 max-w-xl text-[15px] italic leading-relaxed text-[#6e5832] dark:text-amber-100/70" style={serif}>
            {article.excerpt}
          </p>
        </div>

        {/* page header row */}
        <div className="mt-10 flex items-end justify-between border-b border-[#4a3c25] pb-1 dark:border-amber-100/60">
          <span />
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6e5832] dark:text-amber-300" style={serif}>
            {dict.resourcesPage.pageLabel}.
          </span>
        </div>

        {/* index entries */}
        <div className="mt-6 space-y-6">
          <div>
            <p
              className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#6e5832] dark:text-amber-300"
              style={serif}
            >
              {dict.resourcesPage.partOne}
            </p>
            <p
              className="mt-1 text-[12px] font-bold uppercase tracking-[0.18em] text-[#8a6f42] dark:text-amber-200/70"
              style={serif}
            >
              {dict.resourcesPage.sectionOne}
            </p>
            <ul className="mt-4 space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-baseline gap-2 text-sm text-[#4a3c25] dark:text-amber-100/80" style={serif}>
                  <span className="shrink-0">{item}</span>
                  <span className="flex-1 border-b border-dotted border-[#8a6f42]/70" aria-hidden="true" />
                  <span className="shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-double border-[#4a3c25]/50 pt-5 dark:border-amber-100/40">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#6e5832] dark:text-amber-300" style={serif}>
              {article.subject || article.category}
            </p>
            <div className="mt-4 space-y-4 text-[15px] leading-[1.9] text-[#4a3c25] dark:text-amber-100/75" style={serif}>
              {paragraphs.slice(0, 6).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* footer ornament */}
        <div className="mt-12 flex items-center justify-between border-t border-[#4a3c25] pt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8a6f42] dark:border-amber-100/40 dark:text-amber-200/60" style={serif}>
          <span dir="ltr">{article.author}</span>
          <span>01</span>
        </div>
        <div className="mt-1 border-t border-double border-[#4a3c25]/50 dark:border-amber-100/40" />
      </div>
    </div>
  );
}

function ExerciseSheet({ article }: { article: ResourceItem }) {
  const { dict } = useI18n();
  const items = [
    article.category,
    article.subject,
    article.educationLevel,
    ...(article.tags || []),
  ]
    .filter((item): item is string => Boolean(item))
    .slice(0, 8);

  const paragraphs = (article.body || article.excerpt)
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div
      data-anim="up"
      className="mx-auto max-w-3xl rounded-[8px] border border-[#c9dcf2] bg-white p-4 text-ink dark:bg-ink-800 dark:text-white sm:p-7"
    >
      {/* blue document title header */}
      <div className="rounded-[4px] bg-gradient-to-r from-[#dcebfc] to-[#eef6ff] px-4 py-3 text-center text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#2f5c8a] dark:from-ink-700 dark:to-ink-600 dark:text-blue-200">
        {dict.resourcesPage.types.exercise}
      </div>

      <h1 className="mt-6 text-center text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-tight text-[#1c3a5e] dark:text-white">
        {article.title}
      </h1>

      {/* instruction row box */}
      <div className="mt-7 rounded-[6px] border border-[#bcd6f2] bg-[#f5faff] px-4 py-4 dark:border-blue-500/30 dark:bg-ink-900">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2f5c8a] dark:text-blue-300">
          {dict.resourcesPage.exerciseInstruction}
        </span>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft dark:text-white/75">{article.excerpt}</p>
      </div>

      {/* section list */}
      <div className="mt-6 space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-[6px] border border-[#cfe0f4] bg-[#fbfdff] px-4 py-3 dark:border-blue-500/20 dark:bg-ink-900"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#2b62e8]/10 text-[11px] font-extrabold text-[#2b62e8] dark:text-blue-300">
              {i + 1}
            </span>
            <span className="text-[14px] font-bold text-[#2f5c8a] dark:text-blue-200">{item}</span>
          </div>
        ))}
      </div>

      {/* exercise body */}
      <div className="mt-7 overflow-hidden rounded-[6px] border border-[#cfe0f4] dark:border-blue-500/20">
        <div className="border-b border-[#cfe0f4] bg-[#f5faff] px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2f5c8a] dark:border-blue-500/20 dark:bg-ink-900 dark:text-blue-300">
          {article.subject || article.category}
        </div>
        <div className="space-y-4 bg-white p-5 dark:bg-ink-900">
          {paragraphs.slice(0, 8).map((paragraph, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-1 shrink-0 text-[12px] font-extrabold text-[#2b62e8] dark:text-blue-300">
                {String(i + 1).padStart(2, "0")}.
              </span>
              <p className="text-[15px] leading-[1.9] text-ink-soft dark:text-white/75">{paragraph}</p>
            </div>
          ))}
        </div>
      </div>

      {/* answer / practice line */}
      <div className="mt-6 flex items-start gap-2 border-t border-[#dcebfc] pt-5 dark:border-blue-500/20">
        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#2b62e8] dark:text-blue-300" aria-hidden="true" />
        <p className="text-[13px] leading-relaxed text-[#5a6b7c] dark:text-white/60">
          {dict.resourcesPage.answerHere}: {article.body || article.excerpt}
        </p>
      </div>
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
      return <ExerciseSheet article={article} />;
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
      return <NotepadDetail article={article} />;
    case "guide":
      return <VintageGuidePage article={article} />;
    case "article":
      return <EditorialArticle article={article} />;
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
  const isEditorial = type === "article" || type === "notes" || type === "guide" || type === "exercise";

  return (
    <>
      {isEditorial ? null : (
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
      )}

      <article
        className={`mx-auto px-4 py-14 sm:px-6 lg:px-8 ${
          isEditorial ? "max-w-3xl" : "max-w-4xl py-16"
        }`}
      >
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
