import { createClient } from "@/lib/supabase/server";
import type { Article } from "@/lib/types/article";
import type { AppLocale } from "@/lib/i18n/routing";

type I18n<T> = Partial<Record<AppLocale, T>> | null;

type ArticleRow = {
  slug: string;

  title: string;
  title_i18n: I18n<string>;

  short_description: string;
  short_description_i18n: I18n<string>;

  content: string[] | null;
  content_i18n: I18n<string[]>;

  cover_image: string | null;
  related_product_slugs: string[] | null;

  seo_title: string;
  seo_title_i18n: I18n<string>;

  seo_description: string;
  seo_description_i18n: I18n<string>;

  featured: boolean;
};

const SELECT_COLUMNS = `
  slug,
  title,
  title_i18n,
  short_description,
  short_description_i18n,
  content,
  content_i18n,
  cover_image,
  related_product_slugs,
  seo_title,
  seo_title_i18n,
  seo_description,
  seo_description_i18n,
  featured
`;

function localized<T>(
  translated: I18n<T>,
  locale: AppLocale,
  fallback: T
): T {
  return translated?.[locale] ?? fallback;
}

function mapArticle(
  row: ArticleRow,
  locale: AppLocale
): Article {
  return {
    slug: row.slug,

    title: localized(
      row.title_i18n,
      locale,
      row.title
    ),

    shortDescription: localized(
      row.short_description_i18n,
      locale,
      row.short_description
    ),

    content: localized(
      row.content_i18n,
      locale,
      row.content ?? []
    ),

    coverImage: row.cover_image,

    relatedProductSlugs:
      row.related_product_slugs ?? [],

    seoTitle: localized(
      row.seo_title_i18n,
      locale,
      row.seo_title
    ),

    seoDescription: localized(
      row.seo_description_i18n,
      locale,
      row.seo_description
    ),

    featured: row.featured,
  };
}

export async function getAllArticles(
  locale: AppLocale = "fa"
): Promise<Article[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(SELECT_COLUMNS)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(
      `Articles fetch failed: ${error.message}`
    );
  }

  return (data ?? []).map((row) =>
    mapArticle(row as ArticleRow, locale)
  );
}

export async function getArticleBySlug(
  slug: string,
  locale: AppLocale = "fa"
): Promise<Article | undefined> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select(SELECT_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Article fetch failed: ${error.message}`
    );
  }

  return data
    ? mapArticle(data as ArticleRow, locale)
    : undefined;
}

export async function getFeaturedArticles(
  locale: AppLocale = "fa"
): Promise<Article[]> {
  const articles = await getAllArticles(locale);

  return articles.filter(
    (article) => article.featured
  );
}
