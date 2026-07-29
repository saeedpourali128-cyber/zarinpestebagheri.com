import { createClient } from "@/lib/supabase/server";
import type { MachineryItem } from "@/lib/types/machinery";

export async function getMachineryItemForEdit(slug: string): Promise<(MachineryItem & { sortOrder: number }) | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("machinery").select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(`خطا در دریافت دستگاه: ${error.message}`);
  if (!data) return undefined;

  return {
    slug: data.slug,
    title: data.title,
    description: data.description,
    image: data.image,
    capacityLabel: data.capacity_label,
    sortOrder: data.sort_order,
  };
}
