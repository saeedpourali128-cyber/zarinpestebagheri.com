import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types/product";

export async function getProductForEdit(slug: string): Promise<(Product & { sortOrder: number }) | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(`خطا در دریافت محصول: ${error.message}`);
  if (!data) return undefined;

  return {
    slug: data.slug,
    title: data.title,
    category: data.category,
    shortDescription: data.short_description,
    description: data.description,
    mainImage: data.main_image,
    gallery: data.gallery ?? [],
    specs: data.specs ?? {},
    usages: data.usages ?? [],
    targetMarkets: data.target_markets ?? [],
    relatedProductSlugs: data.related_product_slugs ?? [],
    relatedArticleSlugs: data.related_article_slugs ?? [],
    seoTitle: data.seo_title,
    seoDescription: data.seo_description,
    featured: data.featured,
    sortOrder: data.sort_order,
  };
}
