import type { Metadata } from "next";
import { getArticles } from "@/lib/articles";
import { normalizeResourceType } from "@/lib/article-types";
import ResourcesView from "@/components/pages/resources-view";
import type { ResourceItem } from "@/lib/article-types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ressources & conseils pédagogiques",
  description:
    "Guides de révision, orientation, conseils aux parents et bonnes pratiques pour les professeurs : le blog d'INCLASS.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ResourcesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const raw = params.categorie;
  const rawType = params.type ?? params.kind;
  const category = (Array.isArray(raw) ? raw[0] : raw) ?? "";
  const selectedType = (Array.isArray(rawType) ? rawType[0] : rawType) ?? "";
  const typeKey = normalizeResourceType(selectedType);

  const all = await getArticles();
  const list = all.filter((a: ResourceItem) => {
    if (category && a.category !== category) return false;
    if (selectedType && a.resourceType !== typeKey) return false;
    return true;
  });

  return <ResourcesView articles={list} selectedCategory={category} selectedType={selectedType ? typeKey : ""} />;
}
