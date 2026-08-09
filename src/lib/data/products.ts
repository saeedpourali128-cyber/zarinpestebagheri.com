import { createClient } from "@/lib/supabase/server";
import type { Product, ProductSpec } from "@/lib/types/product";
import type { AppLocale } from "@/lib/i18n/routing";

type I18n<T> = Partial<Record<AppLocale, T>> | null;

type ProductRow = {
  slug: string;
  title: string;
  title_i18n: I18n<string>;
  category: Product["category"];

  short_description: string;
  short_description_i18n: I18n<string>;

  description: string;
  description_i18n: I18n<string>;

  main_image: string | null;
  gallery: string[] | null;

  specs: ProductSpec | null;
  specs_i18n: I18n<ProductSpec>;

  usages: string[] | null;
  usages_i18n: I18n<string[]>;

  target_markets: string[] | null;
  target_markets_i18n: I18n<string[]>;

  related_product_slugs: string[] | null;
  related_article_slugs: string[] | null;

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
  category,
  short_description,
  short_description_i18n,
  description,
  description_i18n,
  main_image,
  gallery,
  specs,
  specs_i18n,
  usages,
  usages_i18n,
  target_markets,
  target_markets_i18n,
  related_product_slugs,
  related_article_slugs,
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

function mapProduct(row: ProductRow, locale: AppLocale): Product {
  return {
    slug: row.slug,
    title: localized(row.title_i18n, locale, row.title),
    category: row.category,

    shortDescription: localized(
      row.short_description_i18n,
      locale,
      row.short_description
    ),

    description: localized(
      row.description_i18n,
      locale,
      row.description
    ),

    mainImage: row.main_image,
    gallery: row.gallery ?? [],

    specs: localized(
      row.specs_i18n,
      locale,
      row.specs ?? {}
    ),

    usages: localized(
      row.usages_i18n,
      locale,
      row.usages ?? []
    ),

    targetMarkets: localized(
      row.target_markets_i18n,
      locale,
      row.target_markets ?? []
    ),

    relatedProductSlugs: row.related_product_slugs ?? [],
    relatedArticleSlugs: row.related_article_slugs ?? [],

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

export async function getAllProducts(
  locale: AppLocale = "fa"
): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(SELECT_COLUMNS)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Products fetch failed: ${error.message}`);
  }

  return (data ?? []).map((row) =>
    mapProduct(row as ProductRow, locale)
  );
}

export async function getProductBySlug(
  slug: string,
  locale: AppLocale = "fa"
): Promise<Product | undefined> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(SELECT_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Product fetch failed: ${error.message}`);
  }

  return data
    ? mapProduct(data as ProductRow, locale)
    : undefined;
}

export async function getFeaturedProducts(
  locale: AppLocale = "fa"
): Promise<Product[]> {
  const products = await getAllProducts(locale);
  return products.filter((product) => product.featured);
}

export async function getRelatedProducts(
  product: Product,
  locale: AppLocale = "fa"
): Promise<Product[]> {
  if (!product.relatedProductSlugs.length) return [];

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(SELECT_COLUMNS)
    .in("slug", product.relatedProductSlugs);

  if (error) {
    throw new Error(`Related products fetch failed: ${error.message}`);
  }

  const bySlug = new Map(
    (data ?? []).map((row) => {
      const product = mapProduct(row as ProductRow, locale);
      return [product.slug, product] as const;
    })
  );

  return product.relatedProductSlugs
    .map((slug) => bySlug.get(slug))
    .filter((item): item is Product => Boolean(item));
}
