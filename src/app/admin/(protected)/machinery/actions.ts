"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadToMedia } from "@/lib/supabase/upload";

function readMachineryFields(formData: FormData) {
  const capacityLabel = String(formData.get("capacityLabel") ?? "").trim();
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    capacity_label: capacityLabel || null,
    sort_order: Number(formData.get("sortOrder") ?? 0),
  };
}

export async function createMachineryItem(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) throw new Error("نامک (slug) الزامی است.");

  const image = await uploadToMedia(formData.get("image") as File | null, "machinery");

  const supabase = await createClient();
  const { error } = await supabase.from("machinery").insert({ slug, image, ...readMachineryFields(formData) });
  if (error) throw new Error(`ثبت دستگاه ناموفق بود: ${error.message}`);

  revalidatePath("/[locale]", "layout");
  redirect("/admin/machinery");
}

export async function updateMachineryItem(slug: string, formData: FormData) {
  const supabase = await createClient();
  const newImage = await uploadToMedia(formData.get("image") as File | null, "machinery");

  const updates: Record<string, unknown> = readMachineryFields(formData);
  if (newImage) updates.image = newImage;

  const { error } = await supabase.from("machinery").update(updates).eq("slug", slug);
  if (error) throw new Error(`ویرایش دستگاه ناموفق بود: ${error.message}`);

  revalidatePath("/[locale]", "layout");
  redirect("/admin/machinery");
}

export async function deleteMachineryItem(slug: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("machinery").delete().eq("slug", slug);
  if (error) throw new Error(`حذف دستگاه ناموفق بود: ${error.message}`);

  revalidatePath("/[locale]", "layout");
  redirect("/admin/machinery");
}
