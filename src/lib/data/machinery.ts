import { createClient } from "@/lib/supabase/server";
import type { MachineryItem } from "@/lib/types/machinery";

const SELECT_COLUMNS = "slug, title, description, image, capacity_label";

function mapMachineryItem(row: {
  slug: string;
  title: string;
  description: string;
  image: string | null;
  capacity_label: string | null;
}): MachineryItem {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    image: row.image,
    capacityLabel: row.capacity_label,
  };
}

export async function getMachinery(): Promise<MachineryItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("machinery")
    .select(SELECT_COLUMNS)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`خطا در دریافت دستگاه‌ها: ${error.message}`);
  return (data ?? []).map(mapMachineryItem);
}
