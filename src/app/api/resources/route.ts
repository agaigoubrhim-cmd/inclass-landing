import { NextResponse } from "next/server";
import { getArticles } from "@/lib/articles";
import { normalizeResourceType } from "@/lib/article-types";
import type { ResourceItem } from "@/lib/article-types";

export const dynamic = "force-dynamic";

/**
 * Internal resources endpoint reused by the client-side multilingual hook.
 * Language filtering is delegated to getArticles (server-side ?language= when
 * the backend supports it, then the `language` field is the source of truth).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language") || undefined;
  const category = searchParams.get("category") || undefined;
  const type = searchParams.get("type") || undefined;

  let list: ResourceItem[] = [];
  try {
    list = await getArticles(category, language);
    if (type) {
      const typeKey = normalizeResourceType(type);
      list = list.filter((item) => item.resourceType === typeKey);
    }
  } catch {
    return NextResponse.json({ data: [], error: "Unable to load resources" }, { status: 500 });
  }

  return NextResponse.json({ data: list });
}
