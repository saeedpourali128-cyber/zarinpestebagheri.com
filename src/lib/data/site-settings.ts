import { createClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/lib/types/site-settings";

const DEFAULT_SETTINGS: SiteSettings = {
  phone: null,
  whatsappNumber: null,
  whatsappEnabled: false,
  email: null,
  address: null,
  catalogUrl: null,
};

const WHATSAPP_MESSAGE = "با سلام، در خصوص قیمت محصولات زرین پسته باقری نیاز به استعلام دارم.";

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("phone, whatsapp_number, whatsapp_enabled, email, address, catalog_url")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw new Error(`خطا در دریافت تنظیمات سایت: ${error.message}`);
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

/** لینک نهایی wa.me را می‌سازد؛ اگر واتساپ غیرفعال یا شماره‌ای ثبت نشده باشد، null برمی‌گرداند. */
export function buildWhatsappLink(settings: SiteSettings, productName?: string): string | null {
  if (!settings.whatsappEnabled || !settings.whatsappNumber) return null;
  const text = productName ? `${WHATSAPP_MESSAGE} (محصول مورد نظر: ${productName})` : WHATSAPP_MESSAGE;
  return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
