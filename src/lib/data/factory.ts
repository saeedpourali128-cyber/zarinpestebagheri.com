import { createClient } from "@/lib/supabase/server";
import type { FactoryImage } from "@/lib/types/factory";

const SELECT_COLUMNS = "slug, caption, image";

function mapFactoryImage(row: { slug: string; caption: string; image: string | null }): FactoryImage {
  return { slug: row.slug, caption: row.caption, image: row.image };
}

export async function getFactoryImages(): Promise<FactoryImage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("factory_images")
    .select(SELECT_COLUMNS)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`خطا در دریافت تصاویر کارخانه: ${error.message}`);
  return (data ?? []).map(mapFactoryImage);
}
