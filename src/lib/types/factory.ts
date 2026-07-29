export interface FactoryImage {
  slug: string;
  caption: string;
  /** تا دریافت تصویر واقعی null است و PlaceholderImage نمایش داده می‌شود. */
  image: string | null;
}
