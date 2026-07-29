"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadToMedia } from "@/lib/supabase/upload";

function readCertificateFields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    is_placeholder: formData.get("isPlaceholder") === "on",
    sort_order: Number(formData.get("sortOrder") ?? 0),
  };
}

export async function createCertificate(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) throw new Error("نامک (slug) الزامی است.");

  const image = await uploadToMedia(formData.get("image") as File | null, "certificates");

  const supabase = await createClient();
  const { error } = await supabase.from("certificates").insert({ slug, image, ...readCertificateFields(formData) });
  if (error) throw new Error(`ساخت گواهی ناموفق بود: ${error.message}`);

  revalidatePath("/[locale]", "layout");
  redirect("/admin/certificates");
}

export async function updateCertificate(slug: string, formData: FormData) {
  const supabase = await createClient();
  const newImage = await uploadToMedia(formData.get("image") as File | null, "certificates");

  const updates: Record<string, unknown> = readCertificateFields(formData);
  if (newImage) updates.image = newImage;

  const { error } = await supabase.from("certificates").update(updates).eq("slug", slug);
  if (error) throw new Error(`ویرایش گواهی ناموفق بود: ${error.message}`);

  revalidatePath("/[locale]", "layout");
  redirect("/admin/certificates");
}

export async function deleteCertificate(slug: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("certificates").delete().eq("slug", slug);
  if (error) throw new Error(`حذف گواهی ناموفق بود: ${error.message}`);

  revalidatePath("/[locale]", "layout");
  redirect("/admin/certificates");
}
