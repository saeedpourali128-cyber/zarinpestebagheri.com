export type ProductCategory = "raw" | "kernel" | "khalal" | "powder";

export interface ProductSpec {
  cultivar?: string;
  sizeOz?: string;
  opennessType?: string;
  kernelColor?: string;
  kernelPercentage?: string;
  packagingType?: string;
  minOrder?: string;
  storageConditions?: string;
}

export interface Product {
  slug: string;
  title: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  /** تا دریافت تصویر واقعی محصول null است و PlaceholderImage نمایش داده می‌شود. */
  mainImage: string | null;
  gallery: string[];
  specs: ProductSpec;
  usages: string[];
  targetMarkets: string[];
  relatedProductSlugs: string[];
  relatedArticleSlugs: string[];
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
}
