export interface LocaleMeta {
  code: string;
  nativeLabel: string;
  enabled: boolean;
}

// فقط «fa» در فاز اول فعال است؛ بقیه موارد برای آماده‌سازی چندزبانه آینده در این فهرست باقی می‌مانند.
export const localesMeta: LocaleMeta[] = [
  { code: "fa", nativeLabel: "فارسی", enabled: true },
  { code: "en", nativeLabel: "English", enabled: false },
  { code: "ar", nativeLabel: "العربية", enabled: false },
  { code: "zh", nativeLabel: "中文", enabled: false },
  { code: "ru", nativeLabel: "Русский", enabled: false },
];
