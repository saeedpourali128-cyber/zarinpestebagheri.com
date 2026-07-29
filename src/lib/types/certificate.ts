export interface Certificate {
  slug: string;
  title: string;
  description: string;
  /** تا بارگذاری مدرک واقعی null است و PlaceholderImage نمایش داده می‌شود. */
  image: string | null;
  /** تا زمانی که مدرک واقعی بارگذاری نشده true است و برچسب نمونه نمایش داده می‌شود. */
  isPlaceholder: boolean;
}
