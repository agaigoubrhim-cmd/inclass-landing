import type { Metadata } from "next";
import { getArticles } from "@/lib/articles";
import { normalizeResourceType } from "@/lib/article-types";
import ResourcesView from "@/components/pages/resources-view";
import type { ResourceItem } from "@/lib/article-types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resources & guides",
  description:
    "Study guides, exam strategies, orientation advice and teaching best practices — the INCLASS resources blog.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ResourcesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const rawCat = params.categorie ?? params.category;
  const rawType = params.type ?? params.kind;
  const category = (Array.isArray(rawCat) ? rawCat[0] : rawCat) ?? "";
  const selectedType = (Array.isArray(rawType) ? rawType[0] : rawType) ?? "";
  const typeKey = normalizeResourceType(selectedType);

  let articles: ResourceItem[] = [];
  let error = false;
  try {
    articles = await getArticles();
  } catch {
    error = true;
  }

  const list = articles.filter((a) => {
    if (category && a.category !== category) return false;
    if (selectedType && a.resourceType !== typeKey) return false;
    return true;
  });

  return (
    <ResourcesView
      articles={list}
      selectedCategory={category}
      selectedType={selectedType ? typeKey : ""}
      basePath="/resources"
      initialError={error && articles.length === 0}
    />
  );
}
