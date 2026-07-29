import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
import { routing } from "@/lib/i18n/routing";
import { getAllProducts } from "@/lib/data/products";
import { getAllArticles } from "@/lib/data/articles";

const staticPaths = [
  "",
  "/about",
  "/products",
  "/factory",
  "/machinery",
  "/certificates",
  "/knowledge-base",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locale = routing.defaultLocale;
  const entries: MetadataRoute.Sitemap = [];
  const [products, articles] = await Promise.all([getAllProducts(), getAllArticles()]);

  for (const path of staticPaths) {
    entries.push({
      url: `${siteConfig.url}/${locale}${path}`,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
    });
  }

  for (const product of products) {
    entries.push({
      url: `${siteConfig.url}/${locale}/products/${product.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const article of articles) {
    entries.push({
      url: `${siteConfig.url}/${locale}/knowledge-base/${article.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
