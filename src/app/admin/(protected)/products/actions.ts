"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadToMedia, uploadManyToMedia } from "@/lib/supabase/upload";
import type { ProductCategory } from "@/lib/types/product";

function linesToArray(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function readProductFields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    category: String(formData.get("category") ?? "raw") as ProductCategory,
    short_description: String(formData.get("shortDescription") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    specs: {
      cultivar: String(formData.get("cultivar") ?? "").trim() || undefined,
      sizeOz: String(formData.get("sizeOz") ?? "").trim() || undefined,
      opennessType: String(formData.get("opennessType") ?? "").trim() || undefined,
      kernelColor: String(formData.get("kernelColor") ?? "").trim() || undefined,
      kernelPercentage: String(formData.get("kernelPercentage") ?? "").trim() || undefined,
      packagingType: String(formData.get("packagingType") ?? "").trim() || undefined,
      minOrder: String(formData.get("minOrder") ?? "").trim() || undefined,
      storageConditions: String(formData.get("storageConditions") ?? "").trim() || undefined,
    },
    usages: linesToArray(formData.get("usages")),
    target_markets: linesToArray(formData.get("targetMarkets")),
    related_product_slugs: linesToArray(formData.get("relatedProductSlugs")),
    related_article_slugs: linesToArray(formData.get("relatedArticleSlugs")),
    seo_title: String(formData.get("seoTitle") ?? "").trim(),
    seo_description: String(formData.get("seoDescription") ?? "").trim(),
    featured: formData.get("featured") === "on",
    sort_order: Number(formData.get("sortOrder") ?? 0),
  };
}

export async function createProduct(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) throw new Error("نامک (slug) الزامی است.");

  const mainImage = await uploadToMedia(formData.get("mainImage") as File | null, "products");
  const galleryFiles = formData.getAll("gallery") as File[];
  const gallery = await uploadManyToMedia(galleryFiles, "products");

  const supabase = await createClient();
  const { error } = await supabase.from("products").insert({
    slug,
    main_image: mainImage,
    gallery,
    ...readProductFields(formData),
  });
  if (error) throw new Error(`ساخت محصول ناموفق بود: ${error.message}`);

  revalidatePath("/[locale]", "layout");
  redirect("/admin/products");
}

export async function updateProduct(slug: string, formData: FormData) {
  const supabase = await createClient();
  const newMainImage = await uploadToMedia(formData.get("mainImage") as File | null, "products");
  const newGalleryFiles = formData.getAll("gallery") as File[];
  const newGalleryImages = await uploadManyToMedia(newGalleryFiles, "products");

  const updates: Record<string, unknown> = readProductFields(formData);
  if (newMainImage) updates.main_image = newMainImage;

  if (newGalleryImages.length) {
    const { data: existing } = await supabase.from("products").select("gallery").eq("slug", slug).maybeSingle();
    updates.gallery = [...(existing?.gallery ?? []), ...newGalleryImages];
  }

  const { error } = await supabase.from("products").update(updates).eq("slug", slug);
  if (error) throw new Error(`ویرایش محصول ناموفق بود: ${error.message}`);

  revalidatePath("/[locale]", "layout");
  redirect("/admin/products");
}

export async function deleteProduct(slug: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("slug", slug);
  if (error) throw new Error(`حذف محصول ناموفق بود: ${error.message}`);

  revalidatePath("/[locale]", "layout");
  redirect("/admin/products");
}
