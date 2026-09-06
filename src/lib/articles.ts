import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { articles, type Article } from "@/db/schema";
import {
  normalizeResourceType,
  type ArticleItem,
  type ResourceItem,
  type ResourceType,
} from "@/lib/article-types";

export const ARTICLE_CATEGORIES = [
  "Guide Étudiant",
  "Guide Tuteur",
  "Fonctionnalités",
  "Méthodologie",
  "Parents",
  "Examens",
];

const TYPE_LABEL_BY_RESOURCE: Record<ResourceType, string> = {
  article: "Article",
  guide: "Guide",
  exercise: "Exercice",
  notes: "Notes",
  exercise_corrige: "Exercice & Corrigé",
  mind_map: "Carte mentale",
  video: "Vidéo",
  audio: "Audio",
};

function toResourceItem(base: Article): ResourceItem {
  return {
    id: base.id,
    slug: base.slug,
    title: base.title,
    excerpt: base.excerpt,
    body: base.body,
    category: base.category,
    audience: base.audience,
    author: base.author,
    readMinutes: base.readMinutes,
    cover: base.cover,
    featured: base.featured,
    publishedAt: base.publishedAt,
    type: "article",
    resourceType: "article",
    apiId: null,
    mediaUrl: null,
    mediaType: null,
    accessTier: "free",
    language: "fr",
    contentLanguages: ["fr"],
    viewCount: 0,
    likeCount: 0,
    saveCount: 0,
    responsesCount: 0,
    subject: null,
    educationLevel: null,
    tags: [],
    categoryColor: null,
    categoryIcon: null,
    coverImageUrl: base.cover,
    tutorId: null,
    avatarUrl: null,
    isAnonymous: false,
  };
}

type FallbackInput = Partial<Omit<ArticleItem, "id">> & {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  resourceType?: ResourceType;
  mediaUrl?: string | null;
  mediaType?: "video" | "audio" | null;
  tags?: string[];
  subject?: string | null;
  educationLevel?: string | null;
  body?: string;
};

function fallbackResource(input: FallbackInput): ResourceItem {
  const base = toResourceItem({
    id: input.id,
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    body: input.body ?? "",
    category: input.category ?? "Conseils",
    audience: input.audience ?? "student",
    author: input.author ?? "Équipe INCLASS",
    readMinutes: input.readMinutes ?? 5,
    cover: input.cover ?? "/images/banner-resources.jpg",
    featured: input.featured ?? false,
    publishedAt: input.publishedAt ?? new Date(),
  });
  return {
    ...base,
    type: input.resourceType ?? "article",
    resourceType: input.resourceType ?? "article",
    mediaUrl: input.mediaUrl ?? null,
    mediaType: input.mediaType ?? null,
    tags: input.tags ?? [],
    subject: input.subject ?? null,
    educationLevel: input.educationLevel ?? null,
  };
}

const FALLBACK: ResourceItem[] = [
  toResourceItem({
    id: 1,
    slug: "reussir-le-bac-national-plan-revision",
    title: "Réussir le Bac national : le plan de révision des 12 dernières semaines",
    excerpt:
      "Un rétroplanning réaliste, matière par matière, pour aborder le national sans paniquer et sans sacrifier ton sommeil.",
    body: "",
    category: "Examens",
    audience: "student",
    author: "Sara H., professeure agrégée",
    readMinutes: 8,
    cover: "/images/hero-student.jpg",
    featured: true,
    publishedAt: new Date("2026-01-12"),
  }),
  toResourceItem({
    id: 2,
    slug: "choisir-un-prof-particulier-au-maroc",
    title: "Comment choisir un prof particulier au Maroc : 7 critères qui comptent vraiment",
    excerpt:
      "Diplôme, expérience, feeling, tarif : le guide pour les parents qui veulent éviter les mauvaises surprises.",
    body: "",
    category: "Parents",
    audience: "parent",
    author: "Équipe INCLASS",
    readMinutes: 6,
    cover: "/images/parents.jpg",
    featured: true,
    publishedAt: new Date("2026-01-05"),
  }),
  toResourceItem({
    id: 3,
    slug: "fixer-son-tarif-horaire-prof-particulier",
    title: "Professeurs : comment fixer un tarif horaire juste (et le défendre)",
    excerpt:
      "Grille de prix par matière, par ville et par niveau, plus la méthode pour augmenter sans perdre tes élèves.",
    body: "",
    category: "Professeurs",
    audience: "tutor",
    author: "Amine M., Head of Tutors",
    readMinutes: 7,
    cover: "/images/become-tutor.jpg",
    featured: false,
    publishedAt: new Date("2025-12-18"),
  }),
  toResourceItem({
    id: 4,
    slug: "methode-pomodoro-lyceens",
    title: "La méthode Pomodoro adaptée aux lycéens marocains",
    excerpt:
      "25 minutes de travail, 5 de pause : comment structurer une soirée de révision efficace après une journée de cours.",
    body: "",
    category: "Méthodologie",
    audience: "student",
    author: "Équipe INCLASS",
    readMinutes: 5,
    cover: "/images/banner-resources.jpg",
    featured: false,
    publishedAt: new Date("2025-12-02"),
  }),
  toResourceItem({
    id: 5,
    slug: "apres-le-bac-filieres-marocaines",
    title: "Après le Bac : panorama des filières marocaines et de leurs concours",
    excerpt:
      "CPGE, ENCG, médecine, ENSA, facultés : ce qu'il faut préparer dès la 1ère Bac pour ne rien rater.",
    body: "",
    category: "Orientation",
    audience: "student",
    author: "Soukaina L., cofondatrice",
    readMinutes: 10,
    cover: "/images/lesson-home.jpg",
    featured: false,
    publishedAt: new Date("2025-11-20"),
  }),
  toResourceItem({
    id: 6,
    slug: "suivre-progres-enfant-sans-pression",
    title: "Suivre les progrès de son enfant sans mettre la pression",
    excerpt:
      "Les 5 indicateurs à regarder chaque mois, et les phrases à éviter avant un contrôle important.",
    body: "",
    category: "Parents",
    audience: "parent",
    author: "Hind N., support familles",
    readMinutes: 6,
    cover: "/images/hero-tutor.jpg",
    featured: false,
    publishedAt: new Date("2025-11-04"),
  }),
  fallbackResource({
    id: 7,
    slug: "guide-methodologie-revisions-efficaces",
    title: "Guide complet : organiser ses révisions sur 12 semaines",
    excerpt:
      "Un rétroplanning clair, avec objectifs hebdomadaires, fiches de synthèse et bilans réguliers pour aborder chaque contrôle sans stress.",
    body: "Commence par un diagnostic honnête de ton niveau. Bloque deux créneaux courts par semaine plutôt qu'un marathon le dimanche. Termine chaque séance par une fiche de synthèse de 10 lignes et un point de contrôle mensuel avec ton professeur ou tes parents.",
    category: "Guide Étudiant",
    audience: "student",
    author: "Sara H., professeure agrégée",
    readMinutes: 8,
    cover: "/images/banner-resources.jpg",
    featured: true,
    publishedAt: new Date("2026-02-02"),
    resourceType: "guide",
    tags: ["Méthodologie", "Organisation", "Bac national"],
    subject: "Méthodologie",
    educationLevel: "1ère Bac · 2ème Bac",
  }),
  fallbackResource({
    id: 8,
    slug: "exercices-maths-derivation-2eme-bac",
    title: "Exercices de maths : dérivation et étude de fonctions",
    excerpt:
      "Une série d'exercices progressifs pour maîtriser la dérivation, les tableaux de variations et les problèmes d'optimisation.",
    body: "Exercice 1 : calculer la dérivée de f(x)=x^3-3x+1. Exercice 2 : dresser le tableau de variations sur [-2;3]. Exercice 3 : déterminer la valeur minimale de la fonction sur l'intervalle.",
    category: "Guide Étudiant",
    audience: "student",
    author: "Mehdi A., ingénieur",
    readMinutes: 6,
    cover: "/images/lesson-home.jpg",
    featured: false,
    publishedAt: new Date("2026-02-10"),
    resourceType: "exercise",
    tags: ["Mathématiques", "Dérivation", "2ème Bac"],
    subject: "Mathématiques",
    educationLevel: "2ème Bac",
  }),
  fallbackResource({
    id: 9,
    slug: "notes-cours-physique-nouveau-mouvement",
    title: "Notes de cours : la cinématique du mouvement",
    excerpt:
      "Position, vitesse, accélération et équations horaires résumées en une fiche claire, avec les formules indispensables.",
    body: "Vitesse moyenne = distance / durée. Accélération = variation de vitesse / durée. Équation horaire du mouvement rectiligne uniformément accéléré : x(t)=x0+v0·t+½a·t².",
    category: "Méthodologie",
    audience: "student",
    author: "Omar B., docteur en physique",
    readMinutes: 4,
    cover: "/images/hero-wide.jpg",
    featured: false,
    publishedAt: new Date("2026-02-14"),
    resourceType: "notes",
    tags: ["Physique", "Cinématique", "Lycée"],
    subject: "Physique-Chimie",
    educationLevel: "Lycée",
  }),
  fallbackResource({
    id: 10,
    slug: "exercice-corrige-svt-genetique",
    title: "Exercice corrigé : génétique et lois de Mendel",
    excerpt:
      "Un exercice type examen avec énoncé, questionnement progressif et corrigé détaillé pas à pas.",
    body: "Enoncé : croiser deux plants de petits pois. Question 1 : déterminer les génotypes. Question 2 : établir l'échiquier de croisement. Corrigé : les caractères sont portés par des gènes autosomiques, l'allèle dominant s'exprime en hétérozygote...",
    category: "Examens",
    audience: "student",
    author: "Khalid R., professeur de SVT",
    readMinutes: 9,
    cover: "/images/hero-tutor.jpg",
    featured: false,
    publishedAt: new Date("2026-02-18"),
    resourceType: "exercise_corrige",
    tags: ["SVT", "Génétique", "Concours"],
    subject: "SVT",
    educationLevel: "2ème Bac · Concours",
  }),
  fallbackResource({
    id: 11,
    slug: "carte-mentale-revision-histoire",
    title: "Carte mentale : réviser la Seconde Guerre mondiale",
    excerpt:
      "Le schéma conceptuel qui relie dates, acteurs, phases et conséquences pour mémoriser plus vite le chapitre d'histoire.",
    body: "Centre : Seconde Guerre mondiale. Branches : causes (crise de 1929, montée des totalitarismes), grandes phases (guerre éclair, mondiale, débarquements), acteurs (Alliés, Axe), conséquences (ONU, blocs, décolonisation).",
    category: "Guide Étudiant",
    audience: "student",
    author: "Loubna S., professeure d'histoire",
    readMinutes: 5,
    cover: "/images/hero-student.jpg",
    featured: false,
    publishedAt: new Date("2026-02-22"),
    resourceType: "mind_map",
    tags: ["Histoire", "Révision", "Carte mentale"],
    subject: "Histoire-Géographie",
    educationLevel: "Tronc commun · 1ère Bac",
  }),
  fallbackResource({
    id: 12,
    slug: "video-cours-anglais-present-perfect",
    title: "Vidéo : le present perfect en 8 minutes",
    excerpt:
      "Une vidéo courte qui explique quand et comment utiliser le present perfect, avec des exemples et des exercices à l'écran.",
    body: "Le present perfect relie le passé au présent : used for experiences (I have visited...), for actions starting in the past (I have lived here since...), and for recent results (I have just finished...).",
    category: "Méthodologie",
    audience: "student",
    author: "Hajar Z., coach IELTS/TOEFL",
    readMinutes: 8,
    cover: "/images/hero-wide.jpg",
    featured: false,
    publishedAt: new Date("2026-03-01"),
    resourceType: "video",
    mediaType: "video",
    tags: ["Anglais", "Grammaire", "Vidéo"],
    subject: "Anglais",
    educationLevel: "Collège · Lycée",
  }),
  fallbackResource({
    id: 13,
    slug: "audio-podcast-methodologie-revisions",
    title: "Audio : 10 minutes pour mieux réviser le soir",
    excerpt:
      "Une capsule audio pour structurer sa soirée de travail : pauses actives, exercices ciblés et gestion des distractions.",
    body: "Commence par 5 minutes de rappel de ce que tu as appris, puis 25 minutes de travail concentré, puis 5 minutes de pause. Répète ce cycle trois fois, et termine par une fiche de synthèse.",
    category: "Méthodologie",
    audience: "student",
    author: "Équipe INCLASS",
    readMinutes: 10,
    cover: "/images/banner-resources.jpg",
    featured: false,
    publishedAt: new Date("2026-03-05"),
    resourceType: "audio",
    mediaType: "audio",
    tags: ["Méthodologie", "Podcast", "Révision"],
    subject: "Méthodologie",
    educationLevel: "Collège · Lycée",
  }),
];

const SECTIONS: { heading: string; paragraphs: string[] }[] = [
  {
    heading: "Pourquoi ça change tout",
    paragraphs: [
      "Sur INCLASS, nous accompagnons chaque semaine des milliers d'élèves marocains. Le constat est toujours le même : ce n'est pas le nombre d'heures de travail qui fait la différence, mais la régularité et la qualité du feedback reçu.",
      "Un professeur particulier bien choisi ne se contente pas de refaire le cours : il identifie les blocages précis, propose des exercices ciblés et vérifie la progression séance après séance.",
    ],
  },
  {
    heading: "La méthode en pratique",
    paragraphs: [
      "Commence par un diagnostic honnête du niveau actuel. Un test de 30 minutes suffit pour repérer les chapitres fragiles et éviter de perdre du temps sur ce qui est déjà acquis.",
      "Découpe ensuite l'objectif en blocs hebdomadaires. Deux séances d'une heure par semaine donnent de bien meilleurs résultats qu'une session marathon de trois heures le dimanche soir.",
      "Enfin, garde une trace écrite : fiche de synthèse après chaque séance, liste des erreurs récurrentes, et un point de contrôle mensuel avec le professeur et les parents.",
    ],
  },
  {
    heading: "Les erreurs à éviter",
    paragraphs: [
      "Changer de professeur toutes les trois semaines empêche de construire une relation pédagogique. Donne au moins un mois avant d'évaluer, sauf si le courant ne passe vraiment pas dès la première séance.",
      "Ne néglige pas non plus les matières « secondaires » : sur le Bac national, ce sont souvent elles qui font gagner ou perdre une mention.",
    ],
  },
];

export function articleSections() {
  return SECTIONS;
}

type ApiResource = {
  id: string;
  slug: string;
  type?: string;
  resource_type?: string | null;
  title: string;
  excerpt?: string | null;
  body_preview?: string | null;
  cover_image_url?: string | null;
  read_time_minutes?: number | null;
  language?: string | null;
  content_languages?: string[] | null;
  access_tier?: string | null;
  is_featured?: boolean;
  is_anonymous?: boolean;
  published_at?: string | null;
  view_count?: number;
  like_count?: number;
  save_count?: number;
  responses_count?: number;
  video_url?: string | null;
  audio_url?: string | null;
  media_url?: string | null;
  file_url?: string | null;
  tutor?: {
    id?: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string | null;
  } | null;
  subject?: {
    id?: string;
    name?: string;
    slug?: string;
  } | null;
  education_level?: {
    id?: string | number;
    name?: string;
    slug?: string;
  } | null;
  category?: {
    id?: number;
    name?: string;
    slug?: string;
    icon?: string | null;
    color?: string | null;
  } | null;
  tags?: Array<{ id: number; name: string; slug: string }>;
};

function cleanText(value?: string | null): string {
  if (!value) return "";
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function mapApiResourceToResource(item: ApiResource): ResourceItem {
  const catName =
    item.category?.name ||
    item.tags?.[0]?.name ||
    (item.type === "guide" ? "Guide" : "Méthodologie");

  const isTutor =
    item.category?.slug?.toLowerCase().includes("tuteur") ||
    item.tags?.some((t) => t.slug === "tuteur" || t.name.toLowerCase().includes("tuteur"));
  const isParent =
    item.tags?.some((t) => t.slug === "parents" || t.name.toLowerCase().includes("parent"));
  const audience = isTutor ? "tutor" : isParent ? "parent" : "student";

  const authorName = item.tutor
    ? `${item.tutor.first_name || ""} ${item.tutor.last_name || ""}`.trim()
    : "Équipe INCLASS";

  const cleanPreview = cleanText(item.body_preview);
  const resourceType = normalizeResourceType(item.type || item.resource_type || item.category?.slug);
  const mediaUrl = item.video_url || item.audio_url || item.media_url || item.file_url || null;
  const mediaType = item.video_url ? "video" : item.audio_url ? "audio" : null;

  return {
    id: item.id as unknown as number,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt || (cleanPreview ? cleanPreview.slice(0, 180) + "..." : ""),
    body: cleanPreview,
    category: catName,
    audience,
    author: authorName || "Équipe INCLASS",
    readMinutes: item.read_time_minutes || 5,
    cover: item.cover_image_url || "/images/banner-resources.jpg",
    featured: Boolean(item.is_featured || item.type === "guide"),
    publishedAt: new Date(item.published_at || Date.now()),
    type: item.type || resourceType,
    resourceType,
    apiId: item.id,
    mediaUrl,
    mediaType,
    accessTier: item.access_tier || null,
    language: item.language || null,
    contentLanguages: item.content_languages || null,
    viewCount: item.view_count || 0,
    likeCount: item.like_count || 0,
    saveCount: item.save_count || 0,
    responsesCount: item.responses_count || 0,
    subject: item.subject?.name || null,
    educationLevel: item.education_level?.name || null,
    tags: item.tags?.map((t) => t.name) || [],
    categoryColor: item.category?.color || null,
    categoryIcon: item.category?.icon || null,
    coverImageUrl: item.cover_image_url || null,
    tutorId: item.tutor?.id || null,
    avatarUrl: item.tutor?.avatar_url || null,
    isAnonymous: Boolean(item.is_anonymous),
  };
}

export function resourceTypeLabel(type: ResourceType | string): string {
  return TYPE_LABEL_BY_RESOURCE[type as ResourceType] ?? "Article";
}

/**
 * Content languages supported by the resources API.
 * `language` is the single source of truth: an item is shown in a locale
 * only when its `language` field matches the requested locale.
 */
export const RESOURCE_LANGUAGES = ["fr", "ar", "en"] as const;

export type ResourceLanguage = (typeof RESOURCE_LANGUAGES)[number];

function normalizeLanguage(value?: string | null): string {
  const lang = (value || "").trim().toLowerCase();
  if (lang.startsWith("ar")) return "ar";
  if (lang.startsWith("en")) return "en";
  if (lang.startsWith("fr")) return "fr";
  return lang;
}

export async function getArticles(category?: string, language?: string): Promise<ResourceItem[]> {
  const requestedLanguage = language ? normalizeLanguage(language) : "";
  const filterByCategory = (list: ResourceItem[]) =>
    category ? list.filter((a: ArticleItem) => a.category.toLowerCase() === category.toLowerCase()) : list;

  try {
    // Prefer server-side language filtering when the backend supports it.
    const apiUrl = new URL("https://api.inclass.app/api/resources");
    if (requestedLanguage) apiUrl.searchParams.set("language", requestedLanguage);
    const res = await fetch(apiUrl.toString(), { next: { revalidate: 300 } });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json?.data) && json.data.length > 0) {
        const list: ResourceItem[] = json.data.map(mapApiResourceToResource);
        // The `language` field is the ONLY source of truth, so filter again
        // even when the backend accepted the ?language= parameter.
        const byLang = requestedLanguage
          ? list.filter((a) => normalizeLanguage(a.language) === requestedLanguage)
          : list;
        return filterByCategory(byLang);
      }
    }
  } catch {
    // API fallback
  }

  // The local DB/fallback content is French only. Never fall back to another
  // language: for ar/en there is no matching content, so return an empty list.
  if (requestedLanguage && requestedLanguage !== "fr") return [];

  try {
    const rows = await db.select().from(articles).orderBy(desc(articles.publishedAt));
    if (rows.length) {
      const list = rows.map(toResourceItem);
      return filterByCategory(list);
    }
  } catch {
    // table not migrated yet
  }
  return filterByCategory(FALLBACK);
}

export async function getArticle(slug: string): Promise<ResourceItem | null> {
  try {
    const all = await getArticles();
    const found = all.find((a) => a.slug === slug || String(a.id) === slug || a.apiId === slug);
    if (found) return found;
  } catch {
    // ignore
  }

  try {
    const rows = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
    if (rows[0]) return toResourceItem(rows[0]);
  } catch {
    // ignore
  }
  return FALLBACK.find((a) => a.slug === slug || String(a.id) === slug) ?? null;
}
