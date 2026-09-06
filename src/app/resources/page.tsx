import type { Metadata } from "next";
import { getArticles } from "@/lib/articles";
import ResourcesView from "@/components/pages/resources-view";
import type { ArticleItem } from "@/lib/article-types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resources & guides",
  description:
    "Study guides, exam strategies, orientation advice and teaching best practices — the INCLASS resources blog.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ResourcesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const raw = params.categorie ?? params.category;
  const category = (Array.isArray(raw) ? raw[0] : raw) ?? "";

  let articles: ArticleItem[] = [];
  let error = false;
  try {
    articles = await getArticles();
  } catch {
    error = true;
  }

  const list = category ? articles.filter((a) => a.category === category) : articles;

  return (
    <ResourcesView
      articles={list}
      selectedCategory={category}
      basePath="/resources"
      initialError={error && articles.length === 0}
    />
  );
}
