import { cookies } from "next/headers";

/**
 * Supported content languages. The `language` field on the API resource is the
 * single source of truth; `fr` is the default fallback locale for the shell UI.
 */
export const SUPPORTED_CONTENT_LANGUAGES = ["fr", "ar", "en"] as const;

export type ContentLanguage = (typeof SUPPORTED_CONTENT_LANGUAGES)[number];

export function isContentLanguage(value?: string | null): value is ContentLanguage {
  if (!value) return false;
  const lang = value.toLowerCase();
  if (lang.startsWith("ar")) return true;
  if (lang.startsWith("en")) return true;
  if (lang.startsWith("fr")) return true;
  return false;
}

export function normalizeContentLanguage(value?: string | null): ContentLanguage {
  if (!value) return "fr";
  const lang = value.toLowerCase();
  if (lang.startsWith("ar")) return "ar";
  if (lang.startsWith("en")) return "en";
  return "fr";
}

/** Reads the persisted locale (cookie) on the server, defaulting to French. */
export async function getResourceLocale(): Promise<ContentLanguage> {
  try {
    const store = await cookies();
    const raw = store.get("NEXT_LOCALE")?.value;
    if (isContentLanguage(raw)) return normalizeContentLanguage(raw);
  } catch {
    // cookies unavailable (e.g. static render)
  }
  return "fr";
}
