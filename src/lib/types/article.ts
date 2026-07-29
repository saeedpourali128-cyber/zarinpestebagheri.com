export interface Article {
  slug: string;
  title: string;
  shortDescription: string;
  content: string[];
  /** تا دریافت تصویر واقعی null است و PlaceholderImage نمایش داده می‌شود. */
  coverImage: string | null;
  relatedProductSlugs: string[];
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
}
