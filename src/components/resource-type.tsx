import {
  BookOpen,
  Brain,
  FileCheck2,
  FileText,
  GraduationCap,
  Headphones,
  NotebookPen,
  Video,
  type LucideIcon,
} from "lucide-react";
import type { ResourceType } from "@/lib/article-types";

export const RESOURCE_TYPE_ICONS: Record<ResourceType, LucideIcon> = {
  article: BookOpen,
  guide: GraduationCap,
  exercise: FileText,
  notes: NotebookPen,
  exercise_corrige: FileCheck2,
  mind_map: Brain,
  video: Video,
  audio: Headphones,
};

export const RESOURCE_TYPE_STYLE: Record<
  ResourceType,
  {
    solid: string;
    soft: string;
    text: string;
    border: string;
    dot: string;
  }
> = {
  article: {
    solid: "bg-student-500 text-white",
    soft: "bg-student-100 text-student-700 dark:bg-student-950/80 dark:text-student-300",
    text: "text-student-600 dark:text-student-400",
    border: "border-student-200 dark:border-student-500/25",
    dot: "bg-student-500",
  },
  guide: {
    solid: "bg-tutor-500 text-white",
    soft: "bg-tutor-100 text-tutor-700 dark:bg-tutor-950/80 dark:text-tutor-300",
    text: "text-tutor-600 dark:text-tutor-400",
    border: "border-tutor-200 dark:border-tutor-500/25",
    dot: "bg-tutor-500",
  },
  exercise: {
    solid: "bg-parent-500 text-white",
    soft: "bg-parent-100 text-parent-700 dark:bg-parent-950/80 dark:text-parent-300",
    text: "text-parent-600 dark:text-parent-400",
    border: "border-parent-200 dark:border-parent-500/25",
    dot: "bg-parent-500",
  },
  notes: {
    solid: "bg-ink text-cream dark:bg-white dark:text-ink",
    soft: "bg-sand text-ink dark:bg-white/10 dark:text-white",
    text: "text-ink-soft dark:text-white/80",
    border: "border-line dark:border-white/10",
    dot: "bg-ink-soft dark:bg-white/50",
  },
  exercise_corrige: {
    solid: "bg-tutor-500 text-white",
    soft: "bg-tutor-100 text-tutor-700 dark:bg-tutor-950/80 dark:text-tutor-300",
    text: "text-tutor-600 dark:text-tutor-400",
    border: "border-tutor-200 dark:border-tutor-500/25",
    dot: "bg-tutor-500",
  },
  mind_map: {
    solid: "bg-parent-500 text-white",
    soft: "bg-parent-100 text-parent-700 dark:bg-parent-950/80 dark:text-parent-300",
    text: "text-parent-600 dark:text-parent-400",
    border: "border-parent-200 dark:border-parent-500/25",
    dot: "bg-parent-500",
  },
  video: {
    solid: "bg-student-500 text-white",
    soft: "bg-student-100 text-student-700 dark:bg-student-950/80 dark:text-student-300",
    text: "text-student-600 dark:text-student-400",
    border: "border-student-200 dark:border-student-500/25",
    dot: "bg-student-500",
  },
  audio: {
    solid: "bg-ink text-cream dark:bg-white dark:text-ink",
    soft: "bg-sand text-ink dark:bg-white/10 dark:text-white",
    text: "text-ink-soft dark:text-white/80",
    border: "border-line dark:border-white/10",
    dot: "bg-ink-soft dark:bg-white/50",
  },
};

export function ResourceTypeIcon({
  type,
  className = "",
}: {
  type: ResourceType | string;
  className?: string;
}) {
  switch (type) {
    case "guide":
      return <GraduationCap className={className} aria-hidden="true" />;
    case "exercise":
      return <FileText className={className} aria-hidden="true" />;
    case "notes":
      return <NotebookPen className={className} aria-hidden="true" />;
    case "exercise_corrige":
      return <FileCheck2 className={className} aria-hidden="true" />;
    case "mind_map":
      return <Brain className={className} aria-hidden="true" />;
    case "video":
      return <Video className={className} aria-hidden="true" />;
    case "audio":
      return <Headphones className={className} aria-hidden="true" />;
    case "article":
    default:
      return <BookOpen className={className} aria-hidden="true" />;
  }
}
