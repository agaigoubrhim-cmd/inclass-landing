"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  Clock3,
  FileCheck2,
  FileText,
  GraduationCap,
  Headphones,
  Heart,
  MessageCircle,
  NotebookPen,
  Play,
  Video,
} from "lucide-react";
import type { ResourceItem, ResourceType } from "@/lib/article-types";
import { normalizeResourceType } from "@/lib/article-types";
import { ResourceTypeIcon } from "@/components/resource-type";
import { useI18n } from "@/i18n";

function formatCount(value?: number) {
  if (!value) return "0";
  if (value < 1000) return String(value);
  if (value < 1_000_000) return `${(value / 1000).toFixed(value < 10_000 ? 1 : 0)}k`;
  return `${(value / 1_000_000).toFixed(1)}M`;
}

function authorShort(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return name;
  return `${parts[0]} ${parts[1].charAt(0)}.`;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return `${parts[0]?.[0] ?? "I"}${parts[1]?.[0] ?? "C"}`.toUpperCase();
}

function CardFooter({
  article,
  skin,
}: {
  article: ResourceItem;
  skin: "light" | "dark" | "gradient";
}) {
  const { dict, isRTL } = useI18n();
  const authorText = skin === "dark" || skin === "gradient" ? "text-white/70" : "text-ink-soft dark:text-white/60";
  const avatar =
    skin === "dark"
      ? "bg-white/15 text-white"
      : skin === "gradient"
        ? "bg-white/20 text-white"
        : "bg-sand text-ink-soft dark:bg-white/10 dark:text-white/70";
  const statText =
    skin === "dark" || skin === "gradient" ? "text-white/75" : "text-ink-soft/80 dark:text-white/55";

  return (
    <div
      className={`mt-auto flex items-center justify-between gap-3 border-t pt-4 ${
        skin === "light"
          ? "border-line/70 dark:border-white/10"
          : skin === "gradient"
            ? "border-white/20"
            : "border-white/10"
      }`}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-extrabold ${avatar}`}
          aria-hidden="true"
        >
          {initials(article.author)}
        </span>
        <span className={`truncate text-xs font-bold ${authorText}`}>
          <span className="line-clamp-1" dir="ltr">{authorShort(article.author)}</span>
        </span>
      </span>

      <span className={`flex shrink-0 items-center gap-2.5 text-[11px] font-semibold ${statText}`}>
        <span className="inline-flex items-center gap-1" title={dict.resourcesPage.minRead}>
          <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
          {article.readMinutes}min
        </span>
        <span className="inline-flex items-center gap-1" title={dict.resourcesPage.comments}>
          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
          {formatCount(article.responsesCount ?? article.likeCount ?? 0)}
        </span>
        <span className="inline-flex items-center gap-1" title={dict.resourcesPage.likes}>
          <Heart className={`h-3.5 w-3.5 ${isRTL ? "rtl-flip" : ""}`} aria-hidden="true" />
          {formatCount(article.likeCount)}
        </span>
      </span>
    </div>
  );
}

function TypeChip({
  type,
  skin,
}: {
  type: ResourceType;
  skin: "light" | "dark" | "gradient" | "paper";
}) {
  const { dict } = useI18n();
  const label = dict.resourcesPage.types[type] ?? dict.resourcesPage.types.article;

  const base =
    skin === "gradient"
      ? "border-white/40 bg-white/15 text-white"
      : skin === "dark"
        ? "border-white/20 bg-white/10 text-white/85"
        : skin === "paper"
          ? "border-amber-700/30 bg-amber-100/70 text-amber-900"
          : "border-line bg-sand/70 text-ink-soft dark:border-white/10 dark:bg-white/5 dark:text-white/70";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] ${base}`}
    >
      <ResourceTypeIcon type={type} className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

function NotepadClip() {
  return (
    <div aria-hidden="true" className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
      {/* metal clip arm holding the top edge */}
      <div className="flex flex-col items-center">
        <div className="h-5 w-16 rounded-t-md bg-gradient-to-b from-[#f6f6f6] via-[#cfcfcf] to-[#9a9a9a] shadow-[0_3px_4px_rgba(0,0,0,0.25)]" />
        <div className="h-1.5 w-8 rounded-b-md bg-gradient-to-b from-[#ef7f2e] to-[#c85619] shadow-[0_3px_4px_rgba(0,0,0,0.18)]" />
      </div>
      {/* metal loop */}
      <div className="absolute -bottom-5 left-1/2 h-10 w-9 -translate-x-1/2 rounded-b-full rounded-t-lg border-[3px] border-[#b9b9b9] border-t-0 bg-transparent shadow-[inset_0_-2px_4px_rgba(0,0,0,0.15)]" />
    </div>
  );
}

function ResourceCardSkin({ article, type, href }: { article: ResourceItem; type: ResourceType; href: string }) {
  const { dict } = useI18n();

  switch (type) {
    case "notes": {
      return (
        <Link
          href={href}
          className="group relative flex min-h-[390px] flex-col overflow-hidden rounded-[10px] bg-[#fff9c9] text-[#4a4a2a] transition-all duration-300 hover:-translate-y-1.5 dark:bg-[#3d3a1c] dark:text-amber-50"
        >
          {/* ruled paper */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent, transparent 34px, rgba(136,133,80,0.32) 34px, rgba(136,133,80,0.32) 35px)",
            }}
          />
          {/* soft shadow at the bottom so the page feels lifted */}
          <div aria-hidden="true" className="absolute inset-x-2 bottom-0 h-5 bg-gradient-to-t from-black/15 to-transparent" />

          {/* metal clip */}
          <NotepadClip />

          {/* red margin line on the left */}
          <div aria-hidden="true" className="absolute inset-y-4 left-7 w-px bg-[#e66] opacity-70" />
          <div aria-hidden="true" className="absolute inset-y-4 right-7 w-px bg-[#e66] opacity-40" />

          <div className="relative z-10 flex h-full flex-col px-8 pb-6 pt-12 sm:px-10 sm:pt-14">
            <div className="flex items-center gap-2 text-[#8f8a3a] dark:text-amber-300">
              <ResourceTypeIcon type={type} className="h-4 w-4" />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.16em]">
                {dict.resourcesPage.types.notes}
              </span>
            </div>
            <h3 className="mt-3 text-[22px] font-extrabold leading-snug transition-colors group-hover:text-[#7a7524] dark:text-amber-100 dark:group-hover:text-amber-300">
              {article.title}
            </h3>
            <p className="mt-4 text-[15px] leading-8 text-[#5b5a33] dark:text-amber-100/75">
              {article.excerpt}
            </p>

            {/* small "Notebook" marker */}
            <div className="mt-auto flex items-center justify-between pt-6">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8f8a3a] dark:text-amber-300">
                <NotebookPen className="h-3.5 w-3.5" aria-hidden="true" />
                {article.readMinutes} {dict.resourcesPage.minRead}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8f8a3a] dark:text-amber-300">
                {article.author}
              </span>
            </div>
          </div>
        </Link>
      );
    }

    case "guide": {
      return (
        <Link
          href={href}
          className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#4c1d95_0%,#7c3aed_42%,#a855f7_70%,#e46ee3_100%)] p-6 text-white transition-all duration-300 hover:-translate-y-1.5 sm:p-7"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-fuchsia-300/15 blur-2xl" aria-hidden="true" />

          <div className="relative z-10">
            <TypeChip type={type} skin="gradient" />
            <h3 className="mt-4 text-2xl font-extrabold leading-snug transition-colors group-hover:text-fuchsia-100">
              {article.title}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-white/85 line-clamp-[8]">
              {article.excerpt}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/75">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              {article.readMinutes} {dict.resourcesPage.minRead}
            </span>
          </div>
          <div className="relative z-10 mt-6">
            <CardFooter article={article} skin="gradient" />
          </div>
        </Link>
      );
    }

    case "article": {
      const serif = {
        fontFamily: "Georgia, 'Times New Roman', 'Noto Serif', serif",
        letterSpacing: "-0.01em",
      };
      const paragraphs = (article.excerpt ? article.excerpt : article.body || "")
        .split(/(?<=\.)\s+/)
        .map((p) => p.trim())
        .filter(Boolean);
      const leadHeading = paragraphs[0] || article.category;
      const leadBody = paragraphs.slice(1, 3).join(" ");
      const restBody = paragraphs.slice(3);
      // Real API image only (`cover_image_url`). Local default banners are not
      // treated as a real photo so a missing API image shows the placeholder.
      const imageUrl = article.coverImageUrl || (article.cover && /^https?:/i.test(article.cover) ? article.cover : null);
      const hasImage = Boolean(imageUrl);

      return (
        <Link
          href={href}
          className="group relative flex flex-col overflow-hidden rounded-[6px] border-2 border-ink bg-white text-ink transition-all duration-300 hover:-translate-y-1.5 dark:border-white dark:bg-white dark:text-ink"
        >
          {/* Masthead */}
          <div className="flex items-center justify-between border-b-2 border-ink px-5 py-2.5 sm:px-7">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em]">{dict.common.brandName}</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft">{article.category}</span>
          </div>

          {/* Headline */}
          <div className="border-b-2 border-ink px-5 pb-5 pt-6 text-center sm:px-7 sm:pt-7">
            <h3 className="text-[clamp(1.6rem,4vw,2.8rem)] font-black leading-[1.04] text-ink" style={serif}>
              {article.title}
            </h3>
            <p className="mt-3 text-sm italic text-ink-soft" style={serif}>
              {article.excerpt}
            </p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft">
              {article.author} · {article.readMinutes} MIN
            </p>
          </div>

          {/* Lead spread: text + media */}
          <div className="grid gap-6 px-5 pt-6 sm:px-7 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h4 className="text-[17px] font-extrabold leading-snug text-ink" style={serif}>
                {leadHeading}
              </h4>
              {leadBody ? (
                <p
                  className="mt-3 text-[15px] leading-[1.8] text-ink-soft first-letter:float-left first-letter:mr-2.5 first-letter:text-[52px] first-letter:font-black first-letter:leading-[0.72] first-letter:text-ink"
                  style={serif}
                >
                  {leadBody}
                </p>
              ) : (
                <p
                  className="mt-3 text-[15px] leading-[1.8] text-ink-soft first-letter:float-left first-letter:mr-2.5 first-letter:text-[52px] first-letter:font-black first-letter:leading-[0.72] first-letter:text-ink"
                  style={serif}
                >
                  {article.excerpt}
                </p>
              )}
            </div>

            <figure className="order-1 md:order-2">
              <div className="relative aspect-[4/3] overflow-hidden border border-ink/20 bg-sand">
                {hasImage && imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(45deg,#f1f2f6,#f1f2f6_8px,#e9ebf2_8px,#e9ebf2_16px)]">
                    <span
                      className="text-[13px] font-bold uppercase tracking-[0.22em] text-ink-soft"
                      style={serif}
                    >
                      {dict.resourcesPage.imageNotFound}
                    </span>
                  </div>
                )}
              </div>
              <figcaption className="mt-2 text-xs italic text-ink-soft" style={serif}>
                {dict.common.brandName} — {article.category}
              </figcaption>
            </figure>
          </div>

          {/* Body spread: continuing text + pull quote */}
          {restBody.length > 0 ? (
            <div className="mt-6 grid gap-6 px-5 sm:px-7 md:grid-cols-[1.4fr_1fr]">
              <div className="space-y-4 text-[15px] leading-[1.8] text-ink-soft" style={serif}>
                {restBody.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <aside className="border-y border-ink py-5 text-center md:border-y-0 md:border-l md:py-0 md:pl-6">
                <p className="text-lg font-bold italic leading-snug text-ink" style={serif}>
                  « {article.tags?.[0] || article.category} »
                </p>
                <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft">
                  {dict.resourcesPage.keyPoints}
                </p>
              </aside>
            </div>
          ) : null}

          {/* Page footer */}
          <div className="mt-7 flex items-center justify-between border-t-2 border-ink px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft sm:px-7" style={serif}>
            <span dir="ltr">www.inclass.app</span>
            <span>01</span>
          </div>
        </Link>
      );
    }

    case "video":
    case "audio": {
      const isVideo = type === "video";
      const Icon = isVideo ? Play : Headphones;
      return (
        <Link
          href={href}
          className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[26px] bg-[radial-gradient(120%_120%_at_0%_0%,#141a2e_0%,#070913_70%)] p-6 text-white transition-all duration-300 hover:-translate-y-1.5 sm:p-7"
        >
          <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
            <div className="absolute left-8 top-8 h-40 w-40 rounded-[28px] border border-white/10" />
            <div className="absolute right-8 top-16 h-40 w-40 rounded-full border border-white/10" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <TypeChip type={type} skin="dark" />
              <span className={`grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition-transform duration-300 group-hover:scale-110 ${isVideo ? "" : "rounded-full"}`}>
                {isVideo ? <Video className="h-5 w-5" aria-hidden="true" /> : <Icon className="h-5 w-5" aria-hidden="true" />}
              </span>
            </div>
            <h3 className="mt-6 text-xl font-extrabold leading-snug transition-colors group-hover:text-fuchsia-200">
              {article.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/65 line-clamp-[7]">{article.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/60">
              {isVideo ? <Play className="h-4 w-4" aria-hidden="true" /> : <Headphones className="h-4 w-4" aria-hidden="true" />}
              {isVideo ? dict.resourcesPage.playVideo : dict.resourcesPage.listenAudio}
            </span>
          </div>

          <div className="relative z-10 mt-6">
            <CardFooter article={article} skin="dark" />
          </div>
        </Link>
      );
    }

    case "exercise": {
      return (
        <Link
          href={href}
          className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[26px] border border-tutor-200/70 bg-[#eef3ff] p-6 text-ink transition-all duration-300 hover:-translate-y-1.5 dark:border-tutor-500/20 dark:bg-ink-800 dark:text-white sm:p-7"
        >
          <div className="pointer-events-none absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-tutor-500/10 text-tutor-600 dark:text-tutor-300" aria-hidden="true">
            <FileText className="h-5 w-5" />
          </div>
          <div className="relative z-10">
            <TypeChip type={type} skin="light" />
            <h3 className="mt-4 text-xl font-extrabold leading-snug transition-colors group-hover:text-tutor-700 dark:text-white dark:group-hover:text-tutor-300">
              {article.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft line-clamp-[7] dark:text-white/65">
              {article.excerpt}
            </p>
          </div>
          <div className="relative z-10 mt-6">
            <CardFooter article={article} skin="light" />
          </div>
        </Link>
      );
    }

    case "exercise_corrige": {
      return (
        <Link
          href={href}
          className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[26px] border border-tutor-300/50 bg-[linear-gradient(160deg,#eef3ff_0%,#dbe6ff_100%)] p-6 text-ink transition-all duration-300 hover:-translate-y-1.5 dark:border-tutor-500/25 dark:bg-ink-800 dark:text-white sm:p-7"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-tutor-500/10" aria-hidden="true" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <TypeChip type={type} skin="light" />
              <span className="grid h-10 w-10 place-items-center rounded-full bg-tutor-500 text-white" aria-hidden="true">
                <FileCheck2 className="h-5 w-5" />
              </span>
            </div>
            <h3 className="mt-4 text-xl font-extrabold leading-snug transition-colors group-hover:text-tutor-700 dark:text-white dark:group-hover:text-tutor-300">
              {article.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft line-clamp-[7] dark:text-white/65">
              {article.excerpt}
            </p>
          </div>
          <div className="relative z-10 mt-6">
            <CardFooter article={article} skin="light" />
          </div>
        </Link>
      );
    }

    case "mind_map": {
      return (
        <Link
          href={href}
          className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[26px] border border-parent-200/70 bg-[#f4f1ff] p-6 text-ink transition-all duration-300 hover:-translate-y-1.5 dark:border-parent-500/20 dark:bg-ink-800 dark:text-white sm:p-7"
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <span className="absolute left-7 top-1/2 h-3 w-3 rounded-full bg-parent-400/70" />
            <span className="absolute right-8 top-1/3 h-2.5 w-2.5 rounded-full bg-parent-400/50" />
            <span className="absolute bottom-10 right-14 h-2 w-2 rounded-full bg-parent-400/40" />
            <span className="absolute left-14 bottom-16 h-3 w-3 rounded-full bg-parent-400/60" />
            <Brain className="absolute right-6 top-6 h-12 w-12 text-parent-400/30" />
          </div>
          <div className="relative z-10">
            <TypeChip type={type} skin="light" />
            <h3 className="mt-4 text-xl font-extrabold leading-snug transition-colors group-hover:text-parent-700 dark:text-white dark:group-hover:text-parent-300">
              {article.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft line-clamp-[7] dark:text-white/65">
              {article.excerpt}
            </p>
          </div>
          <div className="relative z-10 mt-6">
            <CardFooter article={article} skin="light" />
          </div>
        </Link>
      );
    }

    default:
      return null;
  }
}

export default function ResourceCard({ article, basePath }: { article: ResourceItem; basePath: string }) {
  const type = normalizeResourceType(article.type ?? article.resourceType);
  const isArticle = type === "article";
  return (
    <div data-anim-child className={isArticle ? "lg:col-span-3" : "h-full"}>
      <ResourceCardSkin article={article} type={type} href={`${basePath}/${article.slug}`} />
    </div>
  );
}
