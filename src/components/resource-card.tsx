"use client";

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

function PaperLines() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, transparent, transparent 27px, rgba(180,132,61,0.18) 27px, rgba(180,132,61,0.18) 28px)",
      }}
    />
  );
}

function Tape() {
  return (
    <div
      aria-hidden="true"
      className="absolute -left-5 top-6 h-7 w-24 -rotate-45 bg-amber-200/80 shadow-sm dark:bg-amber-300/40"
    />
  );
}

function Spine() {
  return (
    <div aria-hidden="true" className="absolute inset-y-0 left-0 w-3.5 bg-[#e36a4f]">
      <span className="absolute left-1/2 top-6 h-2 w-2 -translate-x-1/2 rounded-full bg-white/90" />
      <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white/90" />
      <span className="absolute left-1/2 bottom-6 h-2 w-2 -translate-x-1/2 rounded-full bg-white/90" />
    </div>
  );
}

function FoldedCorner() {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-0 right-0 h-10 w-10 bg-gradient-to-tl from-[#e5cfa0] to-[#fff7e8] shadow-lg"
      style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
    />
  );
}

function ResourceCardSkin({ article, type, href }: { article: ResourceItem; type: ResourceType; href: string }) {
  const { dict, isRTL } = useI18n();

  switch (type) {
    case "notes": {
      return (
        <Link
          href={href}
          className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[26px] border border-amber-200/80 bg-[#fff9ee] p-6 pt-12 text-amber-950 transition-all duration-300 hover:-translate-y-1.5 dark:border-amber-500/20 dark:bg-ink-800 dark:text-amber-50 sm:p-7 sm:pt-12"
        >
          <PaperLines />
          <Spine />
          <Tape />
          <FoldedCorner />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
              <ResourceTypeIcon type={type} className="h-4 w-4" />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.14em]">
                {dict.resourcesPage.types.notes}
              </span>
            </div>
            <h3 className="mt-3 text-xl font-extrabold leading-snug transition-colors group-hover:text-amber-700 dark:text-amber-100 dark:group-hover:text-amber-300">
              {article.title}
            </h3>
            <p className="mt-4 text-sm italic leading-relaxed text-amber-900/75 line-clamp-[7] dark:text-amber-100/70">
              {article.excerpt}
            </p>
          </div>
          <div className="relative z-10 mt-6">
            <CardFooter article={article} skin="light" />
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
      return (
        <Link
          href={href}
          className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[26px] border border-line bg-white p-6 text-ink transition-all duration-300 hover:-translate-y-1.5 dark:border-white/10 dark:bg-ink-800 dark:text-white sm:p-7"
        >
          <div className="flex items-center justify-between gap-3 border-b border-line/70 pb-3 dark:border-white/10">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] ${isRTL ? "rtl-flip" : ""} text-ink-soft dark:text-white/60`}>
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              {dict.resourcesPage.types.article}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink-soft dark:text-white/50">
              {article.readMinutes} MIN
            </span>
          </div>

          <div className="relative z-10 mt-5">
            <h3 className="text-xl font-extrabold leading-snug transition-colors group-hover:text-tutor-700 dark:text-white dark:group-hover:text-tutor-300">
              {article.title}
            </h3>
            <p className="mt-4 text-[15px] leading-[1.9] text-ink-soft first-letter:float-left first-letter:mr-2 first-letter:text-[44px] first-letter:font-serif first-letter:leading-[0.8] first-letter:text-ink dark:text-white/70 dark:first-letter:text-white line-clamp-[8]">
              {article.excerpt}
            </p>
          </div>

          <div className="relative z-10 mt-6">
            <CardFooter article={article} skin="light" />
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
  return (
    <div data-anim-child className="h-full">
      <ResourceCardSkin article={article} type={type} href={`${basePath}/${article.slug}`} />
    </div>
  );
}
