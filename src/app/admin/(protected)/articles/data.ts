import { createClient } from "@/lib/supabase/server";
import type { Article } from "@/lib/types/article";

export async function getArticleForEdit(slug: string): Promise<(Article & { sortOrder: number }) | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("articles").select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(`خطا در دریافت مقاله: ${error.message}`);
  if (!data) return undefined;

  return {
    slug: data.slug,
    title: data.title,
    shortDescription: data.short_description,
    content: data.content ?? [],
    coverImage: data.cover_image,
    relatedProductSlugs: data.related_product_slugs ?? [],
    seoTitle: data.seo_title,
    seoDescription: data.seo_description,
    featured: data.featured,
    sortOrder: data.sort_order,
  };
}
