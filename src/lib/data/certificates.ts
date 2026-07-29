import { createClient } from "@/lib/supabase/server";
import type { Certificate } from "@/lib/types/certificate";

const SELECT_COLUMNS = "slug, title, description, image, is_placeholder";

function mapCertificate(row: {
  slug: string;
  title: string;
  description: string;
  image: string | null;
  is_placeholder: boolean;
}): Certificate {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    image: row.image,
    isPlaceholder: row.is_placeholder,
  };
}

export async function getAllCertificates(): Promise<Certificate[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certificates")
    .select(SELECT_COLUMNS)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`خطا در دریافت گواهی‌ها: ${error.message}`);
  return (data ?? []).map(mapCertificate);
}
