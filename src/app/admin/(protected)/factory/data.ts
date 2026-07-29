import { createClient } from "@/lib/supabase/server";
import type { FactoryImage } from "@/lib/types/factory";

export async function getFactoryImageForEdit(slug: string): Promise<(FactoryImage & { sortOrder: number }) | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("factory_images").select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(`خطا در دریافت تصویر کارخانه: ${error.message}`);
  if (!data) return undefined;

  return { slug: data.slug, caption: data.caption, image: data.image, sortOrder: data.sort_order };
}
