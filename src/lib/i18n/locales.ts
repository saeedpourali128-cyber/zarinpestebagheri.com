export interface LocaleMeta {
  code: string;
  nativeLabel: string;
  enabled: boolean;
}

export const localesMeta: LocaleMeta[] = [
  { code: "fa", nativeLabel: "فارسی", enabled: true },
  { code: "en", nativeLabel: "English", enabled: true },
  { code: "ar", nativeLabel: "العربية", enabled: true },
  { code: "ru", nativeLabel: "Русский", enabled: true },
];
