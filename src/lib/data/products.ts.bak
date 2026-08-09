import { createClient } from "@/lib/supabase/server";
import type { Product, ProductSpec } from "@/lib/types/product";

type ProductRow = {
  slug: string;
  title: string;
  category: Product["category"];
  short_description: string;
  description: string;
  main_image: string | null;
  gallery: string[] | null;
  specs: ProductSpec | null;
  usages: string[] | null;
  target_markets: string[] | null;
  related_product_slugs: string[] | null;
  related_article_slugs: string[] | null;
  seo_title: string;
  seo_description: string;
  featured: boolean;
};

const SELECT_COLUMNS =
  "slug, title, category, short_description, description, main_image, gallery, specs, usages, target_markets, related_product_slugs, related_article_slugs, seo_title, seo_description, featured";

function mapProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    shortDescription: row.short_description,
    description: row.description,
    mainImage: row.main_image,
    gallery: row.gallery ?? [],
    specs: row.specs ?? {},
    usages: row.usages ?? [],
    targetMarkets: row.target_markets ?? [],
    relatedProductSlugs: row.related_product_slugs ?? [],
    relatedArticleSlugs: row.related_article_slugs ?? [],
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    featured: row.featured,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(SELECT_COLUMNS)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`خطا در دریافت محصولات: ${error.message}`);
  return (data ?? []).map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select(SELECT_COLUMNS).eq("slug", slug).maybeSingle();
  if (error) throw new Error(`خطا در دریافت محصول: ${error.message}`);
  return data ? mapProduct(data) : undefined;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((product) => product.featured);
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
  if (!product.relatedProductSlugs.length) return [];
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select(SELECT_COLUMNS).in("slug", product.relatedProductSlugs);
  if (error) throw new Error(`خطا در دریافت محصولات مرتبط: ${error.message}`);
  const bySlug = new Map((data ?? []).map((row) => [row.slug, mapProduct(row)]));
  return product.relatedProductSlugs
    .map((slug) => bySlug.get(slug))
    .filter((item): item is Product => Boolean(item));
}
