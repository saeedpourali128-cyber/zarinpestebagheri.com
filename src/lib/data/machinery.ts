import { createClient } from "@/lib/supabase/server";
import type { MachineryItem } from "@/lib/types/machinery";
import type { AppLocale } from "@/lib/i18n/routing";

type I18n<T> = Partial<Record<AppLocale, T>> | null;

type MachineryRow = {
  slug: string;

  title: string;
  title_i18n: I18n<string>;

  description: string;
  description_i18n: I18n<string>;

  image: string | null;

  capacity_label: string | null;
  capacity_label_i18n: I18n<string>;
};

const SELECT_COLUMNS = `
  slug,
  title,
  title_i18n,
  description,
  description_i18n,
  image,
  capacity_label,
  capacity_label_i18n
`;

function mapMachineryItem(
  row: MachineryRow,
  locale: AppLocale
): MachineryItem {
  return {
    slug: row.slug,

    title:
      row.title_i18n?.[locale] ??
      row.title,

    description:
      row.description_i18n?.[locale] ??
      row.description,

    image: row.image,

    capacityLabel:
      row.capacity_label_i18n?.[locale] ??
      row.capacity_label,
  };
}

export async function getMachinery(
  locale: AppLocale = "fa"
): Promise<MachineryItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("machinery")
    .select(SELECT_COLUMNS)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(
      `Machinery fetch failed: ${error.message}`
    );
  }

  return (data ?? []).map((row) =>
    mapMachineryItem(row as MachineryRow, locale)
  );
}
