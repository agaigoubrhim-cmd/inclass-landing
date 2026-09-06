"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n";
import type { ResourceItem } from "@/lib/article-types";

/**
 * Loads resources for the currently selected language only.
 *
 * - Server-provided content for the initial locale is used as the first cache
 *   entry so there is no extra request on first paint.
 * - Every language response is cached per locale.
 * - Stale requests are aborted/ignored, so old-language content never flashes
 *   while the new language is loading.
 * - `total` is the number of items returned by the API for that language
 *   (before local category/type/search filters), which powers the empty state.
 */
export function useLanguageResources(
  initialArticles: ResourceItem[] = [],
  initialLocale = "fr",
) {
  const { locale, mounted } = useI18n();
  const [cache, setCache] = useState<Record<string, ResourceItem[]>>({
    [initialLocale]: initialArticles,
  });
  const [errorLocale, setErrorLocale] = useState<string | null>(null);
  const requestId = useRef(0);

  useEffect(() => {
    if (!mounted || !locale) return;
    if (cache[locale] || locale === initialLocale) return;

    const id = ++requestId.current;
    const controller = new AbortController();
    fetch(`/api/resources?language=${encodeURIComponent(locale)}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (requestId.current !== id) return;
        const data = Array.isArray(json?.data) ? (json.data as ResourceItem[]) : [];
        setCache((prev) => ({ ...prev, [locale]: data }));
        setErrorLocale(null);
      })
      .catch((err) => {
        if (err?.name === "AbortError" || requestId.current !== id) return;
        setErrorLocale(locale);
      });

    return () => controller.abort();
  }, [locale, mounted, cache, initialLocale]);

  // The language field is the only source of truth. Content is only shown for
  // the locale already present in cache (or the SSR-provided initial locale).
  const available = cache[locale] ?? (locale === initialLocale ? initialArticles : undefined);

  const hasError = Boolean(locale) && errorLocale === locale;
  const isLoading = !available && !hasError;
  const displayArticles = available ?? [];
  const displayTotal = available?.length ?? 0;

  return {
    articles: displayArticles,
    total: displayTotal,
    loading: isLoading,
    error: hasError,
    locale,
  };
}
