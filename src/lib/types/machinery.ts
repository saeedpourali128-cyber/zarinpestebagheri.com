export interface MachineryItem {
  slug: string;
  title: string;
  description: string;
  /** تا دریافت تصویر واقعی null است و PlaceholderImage نمایش داده می‌شود. */
  image: string | null;
  /** عدد ظرفیت واقعی هنوز دریافت نشده؛ تا آن زمان null می‌ماند. */
  capacityLabel: string | null;
}
