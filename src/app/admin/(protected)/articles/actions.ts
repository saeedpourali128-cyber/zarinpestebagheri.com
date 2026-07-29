"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadToMedia } from "@/lib/supabase/upload";

function linesToArray(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function readArticleFields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    short_description: String(formData.get("shortDescription") ?? "").trim(),
    content: linesToArray(formData.get("content")),
    related_product_slugs: linesToArray(formData.get("relatedProductSlugs")),
    seo_title: String(formData.get("seoTitle") ?? "").trim(),
    seo_description: String(formData.get("seoDescription") ?? "").trim(),
    featured: formData.get("featured") === "on",
    sort_order: Number(formData.get("sortOrder") ?? 0),
  };
}

export async function createArticle(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) throw new Error("نامک (slug) الزامی است.");

  const coverImage = await uploadToMedia(formData.get("coverImage") as File | null, "articles");

  const supabase = await createClient();
  const { error } = await supabase.from("articles").insert({
    slug,
    cover_image: coverImage,
    ...readArticleFields(formData),
  });
  if (error) throw new Error(`ساخت مقاله ناموفق بود: ${error.message}`);

  revalidatePath("/[locale]", "layout");
  redirect("/admin/articles");
}

export async function updateArticle(slug: string, formData: FormData) {
  const supabase = await createClient();
  const newCoverImage = await uploadToMedia(formData.get("coverImage") as File | null, "articles");

  const updates: Record<string, unknown> = readArticleFields(formData);
  if (newCoverImage) updates.cover_image = newCoverImage;

  const { error } = await supabase.from("articles").update(updates).eq("slug", slug);
  if (error) throw new Error(`ویرایش مقاله ناموفق بود: ${error.message}`);

  revalidatePath("/[locale]", "layout");
  redirect("/admin/articles");
}

export async function deleteArticle(slug: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("slug", slug);
  if (error) throw new Error(`حذف مقاله ناموفق بود: ${error.message}`);

  revalidatePath("/[locale]", "layout");
  redirect("/admin/articles");
}
