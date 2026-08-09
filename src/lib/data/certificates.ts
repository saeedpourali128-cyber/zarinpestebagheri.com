import { createClient } from "@/lib/supabase/server";
import type { Certificate } from "@/lib/types/certificate";
import type { AppLocale } from "@/lib/i18n/routing";

type I18n<T> = Partial<Record<AppLocale, T>> | null;

type CertificateRow = {
  slug: string;
  title: string;
  title_i18n: I18n<string>;
  description: string;
  description_i18n: I18n<string>;
  image: string | null;
  is_placeholder: boolean;
};

const SELECT_COLUMNS = `
  slug,
  title,
  title_i18n,
  description,
  description_i18n,
  image,
  is_placeholder
`;

function mapCertificate(
  row: CertificateRow,
  locale: AppLocale
): Certificate {
  return {
    slug: row.slug,
    title: row.title_i18n?.[locale] ?? row.title,
    description:
      row.description_i18n?.[locale] ?? row.description,
    image: row.image,
    isPlaceholder: row.is_placeholder,
  };
}

export async function getAllCertificates(
  locale: AppLocale = "fa"
): Promise<Certificate[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("certificates")
    .select(SELECT_COLUMNS)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(
      `Certificates fetch failed: ${error.message}`
    );
  }

  return (data ?? []).map((row) =>
    mapCertificate(row as CertificateRow, locale)
  );
}
