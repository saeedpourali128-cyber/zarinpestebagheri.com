import createNextIntlPlugin from "next-intl/plugin";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // بهینه‌سازی تصاویر روی Cloudflare Workers نیاز به فعال‌سازی جداگانه‌ی
    // سرویس Cloudflare Images دارد؛ چون همه‌ی تصاویر همین پروژه از قبل WebP هستند،
    // این بهینه‌سازی سمت سرور غیرفعال می‌شود تا نیاز به آن سرویس نباشد.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);

// در محیط توسعه (next dev) به Cloudflare bindings (مثل self-reference) دسترسی می‌دهد.
initOpenNextCloudflareForDev();
