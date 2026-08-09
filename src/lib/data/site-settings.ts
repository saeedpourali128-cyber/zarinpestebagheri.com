import { createClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/lib/types/site-settings";
import type { AppLocale } from "@/lib/i18n/routing";

const DEFAULT_SETTINGS: SiteSettings = {
  phone: null,
  whatsappNumber: null,
  whatsappEnabled: false,
  email: null,
  address: null,
  catalogUrl: null,
};

const WHATSAPP_MESSAGES: Record<AppLocale, string> = {
  fa: "با سلام، در خصوص قیمت محصولات زرین پسته باقری نیاز به استعلام دارم.",
  en: "Hello, I would like to request pricing information for Zarrin Pesteh Bagheri products.",
  ar: "مرحباً، أود الاستفسار عن أسعار منتجات زرين پسته باقري.",
  ru: "Здравствуйте! Я хотел(а) бы получить информацию о ценах на продукцию Zarrin Pesteh Bagheri.",
};

const PRODUCT_LABELS: Record<AppLocale, string> = {
  fa: "محصول مورد نظر",
  en: "Product",
  ar: "المنتج",
  ru: "Товар",
};

export async function getSiteSettings(
  _locale: AppLocale = "fa"
): Promise<SiteSettings> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_settings")
    .select(
      "phone, whatsapp_number, whatsapp_enabled, email, address, catalog_url"
    )
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Site settings fetch failed: ${error.message}`
    );
  }

  if (!data) return DEFAULT_SETTINGS;

  return {
    phone: data.phone,
    whatsappNumber: data.whatsapp_number,
    whatsappEnabled: data.whatsapp_enabled,
    email: data.email,
    address: data.address,
    catalogUrl: data.catalog_url,
  };
}

export function buildWhatsappLink(
  settings: SiteSettings,
  productName?: string,
  locale: AppLocale = "fa"
): string | null {
  if (
    !settings.whatsappEnabled ||
    !settings.whatsappNumber
  ) {
    return null;
  }

  const baseMessage = WHATSAPP_MESSAGES[locale];

  const text = productName
    ? `${baseMessage} (${PRODUCT_LABELS[locale]}: ${productName})`
    : baseMessage;

  return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
