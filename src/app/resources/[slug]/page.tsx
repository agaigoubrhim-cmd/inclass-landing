import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResourceDetailView from "@/components/pages/resource-detail-view";
import { getArticle, getArticles } from "@/lib/articles";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article not found" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const others = (await getArticles()).filter((a) => a.slug !== article.slug).slice(0, 3);

  return <ResourceDetailView article={article} others={others} basePath="/resources" />;
}
