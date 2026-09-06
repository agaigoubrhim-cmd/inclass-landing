export type ResourceType =
  | "article"
  | "guide"
  | "exercise"
  | "notes"
  | "exercise_corrige"
  | "mind_map"
  | "video"
  | "audio";

export interface ArticleItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body?: string | null;
  category: string;
  audience: string;
  author: string;
  readMinutes: number;
  cover: string;
  featured?: boolean | null;
  publishedAt: Date;
}

/**
 * Full resource item returned by the real INCLASS resources API.
 * Extends the legacy ArticleItem shape so existing components keep working,
 * and carries every field the API returns (type, media, stats, ...).
 */
export interface ResourceItem extends ArticleItem {
  /** Raw API resource type (e.g. "article", "guide", "video"). */
  type: string;
  /** Normalized frontend resource type. */
  resourceType: ResourceType;
  /** Remote id (UUID) when the item comes from the API. */
  apiId?: string | null;
  /** Real media URL for video/audio resources when provided by the API. */
  mediaUrl?: string | null;
  mediaType?: "video" | "audio" | null;
  accessTier?: string | null;
  language?: string | null;
  contentLanguages?: string[] | null;
  viewCount?: number;
  likeCount?: number;
  saveCount?: number;
  responsesCount?: number;
  subject?: string | null;
  educationLevel?: string | null;
  tags?: string[];
  categoryColor?: string | null;
  categoryIcon?: string | null;
  coverImageUrl?: string | null;
  tutorId?: string | null;
  avatarUrl?: string | null;
  isAnonymous?: boolean;
}

export const RESOURCE_TYPES: ResourceType[] = [
  "article",
  "guide",
  "exercise",
  "notes",
  "exercise_corrige",
  "mind_map",
  "video",
  "audio",
];

const TYPE_ALIASES: Record<string, ResourceType> = {
  article: "article",
  blog: "article",
  post: "article",
  guide: "guide",
  study_guide: "guide",
  "guide-etude": "guide",
  exercice: "exercise",
  exercise: "exercise",
  worksheet: "exercise",
  notes: "notes",
  "course-notes": "notes",
  "notes-de-cours": "notes",
  note: "notes",
  "exercice-corrige": "exercise_corrige",
  "exercices-corriges": "exercise_corrige",
  "exercise_corrige": "exercise_corrige",
  corrected_exercise: "exercise_corrige",
  corrected: "exercise_corrige",
  mind_map: "mind_map",
  mindmap: "mind_map",
  "mind-map": "mind_map",
  schema: "mind_map",
  video: "video",
  video_lesson: "video",
  audio: "audio",
  podcast: "audio",
  "audio-lesson": "audio",
};

export function normalizeResourceType(raw?: string | null): ResourceType {
  if (!raw) return "article";
  const key = raw.toLowerCase().trim().replace(/\s+/g, "-");
  const exact = TYPE_ALIASES[key];
  if (exact) return exact;
  // Loose matching (e.g. "exercice & corrigé", "carte mentale")
  if (key.includes("corrig")) return "exercise_corrige";
  if (key.includes("mentale") || key.includes("mind")) return "mind_map";
  if (key.includes("guide")) return "guide";
  if (key.includes("exerc") || key.includes("worksheet")) return "exercise";
  if (key.includes("audio") || key.includes("podcast")) return "audio";
  if (key.includes("video")) return "video";
  if (key.includes("note")) return "notes";
  return "article";
}

export const ARTICLE_CATEGORIES = [
  "Guide Étudiant",
  "Guide Tuteur",
  "Fonctionnalités",
  "Méthodologie",
  "Parents",
  "Examens",
];

/**
 * Returns the API-provided cover image URL only when it is a valid remote
 * HTTP/HTTPS URL. Local placeholder paths and missing/invalid values always
 * return null so the surrounding UI can collapse naturally.
 */
export function getApiCoverImage(
  article: Pick<ResourceItem, "coverImageUrl" | "cover">,
): string | null {
  const apiCover = article.coverImageUrl?.trim();
  if (apiCover && /^https?:\/\//i.test(apiCover)) return apiCover;

  // Some API payloads expose the same normalized value through `cover`; local
  // paths (e.g. `/images/...`) are never treated as an API image.
  const backendCover = article.cover?.trim();
  if (backendCover && /^https?:\/\//i.test(backendCover)) return backendCover;

  return null;
}

export function getDefaultArticleSections() {
  return [
    {
      heading: "1. Comprendre les attentes et le cadre",
      paragraphs: [
        "Chaque matière et chaque niveau exigent une méthode d'apprentissage spécifique. Avant de commencer les révisions, prenez le temps de structurer votre planning hebdomadaire.",
        "La régularité prime sur l'intensité : 45 minutes par jour d'exercices ciblés sont nettement plus efficaces qu'une session de 6 heures le week-end.",
      ],
    },
    {
      heading: "2. Les erreurs fréquentes à éviter",
      paragraphs: [
        "Ne pas faire d'annales corrigées en conditions réelles d'examen est l'erreur numéro un.",
        "N'hésitez pas à solliciter votre professeur particulier pour débriefer chaque erreur et transformer les incompréhensions en points forts.",
      ],
    },
    {
      heading: "3. Conseils pratiques et plan d'action",
      paragraphs: [
        "Faites des fiches synthétiques avec formules clés et définitions indispensables.",
        "Fixez-vous des objectifs hebdomadaires clairs et mesurez votre progression avec des évaluations régulières.",
      ],
    },
  ];
}
