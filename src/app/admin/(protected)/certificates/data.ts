import { createClient } from "@/lib/supabase/server";
import type { Certificate } from "@/lib/types/certificate";

export async function getCertificateForEdit(slug: string): Promise<(Certificate & { sortOrder: number }) | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("certificates").select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(`خطا در دریافت گواهی: ${error.message}`);
  if (!data) return undefined;

  return {
    slug: data.slug,
    title: data.title,
    description: data.description,
    image: data.image,
    isPlaceholder: data.is_placeholder,
    sortOrder: data.sort_order,
  };
}
