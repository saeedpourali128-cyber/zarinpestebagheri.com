import { createClient } from "@/lib/supabase/server";
import type { Article } from "@/lib/types/article";

type ArticleRow = {
  slug: string;
  title: string;
  short_description: string;
  content: string[] | null;
  cover_image: string | null;
  related_product_slugs: string[] | null;
  seo_title: string;
  seo_description: string;
  featured: boolean;
};

const SELECT_COLUMNS =
  "slug, title, short_description, content, cover_image, related_product_slugs, seo_title, seo_description, featured";

function mapArticle(row: ArticleRow): Article {
  return {
    slug: row.slug,
    title: row.title,
    shortDescription: row.short_description,
    content: row.content ?? [],
    coverImage: row.cover_image,
    relatedProductSlugs: row.related_product_slugs ?? [],
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    featured: row.featured,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(SELECT_COLUMNS)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`خطا در دریافت مقالات: ${error.message}`);
  return (data ?? []).map(mapArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("articles").select(SELECT_COLUMNS).eq("slug", slug).maybeSingle();
  if (error) throw new Error(`خطا در دریافت مقاله: ${error.message}`);
  return data ? mapArticle(data) : undefined;
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((article) => article.featured);
}
