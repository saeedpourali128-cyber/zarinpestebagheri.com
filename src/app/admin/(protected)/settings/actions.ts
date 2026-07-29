"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadToMedia } from "@/lib/supabase/upload";

export async function updateSiteSettings(formData: FormData) {
  const catalogFile = formData.get("catalogFile") as File | null;
  const newCatalogUrl = await uploadToMedia(catalogFile, "catalog");

  const updates: Record<string, unknown> = {
    phone: String(formData.get("phone") ?? "").trim() || null,
    whatsapp_number: String(formData.get("whatsappNumber") ?? "").trim() || null,
    whatsapp_enabled: formData.get("whatsappEnabled") === "on",
    email: String(formData.get("email") ?? "").trim() || null,
    address: String(formData.get("address") ?? "").trim() || null,
    updated_at: new Date().toISOString(),
  };
  if (newCatalogUrl) updates.catalog_url = newCatalogUrl;

  const supabase = await createClient();
  const { error } = await supabase.from("site_settings").update(updates).eq("id", 1);
  if (error) throw new Error(`ذخیره تنظیمات ناموفق بود: ${error.message}`);

  revalidatePath("/[locale]", "layout");
  redirect("/admin/settings?saved=1");
}
