import { createClient } from "@/lib/supabase/server";
import type { FactoryImage } from "@/lib/types/factory";
import type { AppLocale } from "@/lib/i18n/routing";

type I18n<T> = Partial<Record<AppLocale, T>> | null;

type FactoryRow = {
  slug: string;
  caption: string;
  caption_i18n: I18n<string>;
  image: string | null;
};

const SELECT_COLUMNS =
  "slug, caption, caption_i18n, image";

function mapFactoryImage(
  row: FactoryRow,
  locale: AppLocale
): FactoryImage {
  return {
    slug: row.slug,
    caption:
      row.caption_i18n?.[locale] ?? row.caption,
    image: row.image,
  };
}

export async function getFactoryImages(
  locale: AppLocale = "fa"
): Promise<FactoryImage[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("factory_images")
    .select(SELECT_COLUMNS)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(
      `Factory images fetch failed: ${error.message}`
    );
  }

  return (data ?? []).map((row) =>
    mapFactoryImage(row as FactoryRow, locale)
  );
}
