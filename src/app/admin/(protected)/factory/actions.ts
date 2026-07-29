"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadToMedia } from "@/lib/supabase/upload";

export async function createFactoryImage(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) throw new Error("نامک (slug) الزامی است.");

  const image = await uploadToMedia(formData.get("image") as File | null, "factory");

  const supabase = await createClient();
  const { error } = await supabase.from("factory_images").insert({
    slug,
    caption: String(formData.get("caption") ?? "").trim(),
    image,
    sort_order: Number(formData.get("sortOrder") ?? 0),
  });
  if (error) throw new Error(`ثبت تصویر کارخانه ناموفق بود: ${error.message}`);

  revalidatePath("/[locale]", "layout");
  redirect("/admin/factory");
}

export async function updateFactoryImage(slug: string, formData: FormData) {
  const supabase = await createClient();
  const newImage = await uploadToMedia(formData.get("image") as File | null, "factory");

  const updates: Record<string, unknown> = {
    caption: String(formData.get("caption") ?? "").trim(),
    sort_order: Number(formData.get("sortOrder") ?? 0),
  };
  if (newImage) updates.image = newImage;

  const { error } = await supabase.from("factory_images").update(updates).eq("slug", slug);
  if (error) throw new Error(`ویرایش تصویر کارخانه ناموفق بود: ${error.message}`);

  revalidatePath("/[locale]", "layout");
  redirect("/admin/factory");
}

export async function deleteFactoryImage(slug: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("factory_images").delete().eq("slug", slug);
  if (error) throw new Error(`حذف تصویر کارخانه ناموفق بود: ${error.message}`);

  revalidatePath("/[locale]", "layout");
  redirect("/admin/factory");
}
