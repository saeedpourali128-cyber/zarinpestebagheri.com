import { createClient } from "@/lib/supabase/server";

const MEDIA_BUCKET = "media";

/**
 * یک فایل را در باکت عمومی media آپلود می‌کند و آدرس عمومی آن را برمی‌گرداند.
 * اگر file خالی/تعریف‌نشده باشد (یعنی کاربر فایل جدیدی انتخاب نکرده)، null برمی‌گردد
 * تا فراخوان بتواند تصویر قبلی را دست‌نخورده نگه دارد.
 */
export async function uploadToMedia(file: File | null, folder: string): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const supabase = await createClient();
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-]/g, "-").toLowerCase();
  const path = `${folder}/${Date.now()}-${safeName}`;

  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  });
  if (error) throw new Error(`آپلود فایل ناموفق بود: ${error.message}`);

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/** چند فایل را همزمان آپلود می‌کند (برای گالری محصول) و فقط آدرس‌های موفق را برمی‌گرداند. */
export async function uploadManyToMedia(files: File[], folder: string): Promise<string[]> {
  const urls = await Promise.all(files.filter((file) => file.size > 0).map((file) => uploadToMedia(file, folder)));
  return urls.filter((url): url is string => Boolean(url));
}
