export const siteConfig = {
  name: "زرین پسته باقری",
  legalName: "شرکت زرین دانه ترشیز",
  url: "https://zarinpestebagheri.com",
  locationLabel: "کاشمر، خراسان رضوی",
  supplyCapacityLabel: "بیش از ۲۰۰۰ تن در سال",
  ogImage: "/images/redesign/home-hero.webp",
} as const;

// اطلاعات تماس واقعی هنوز دریافت نشده؛ تا رسیدن مدارک/اطلاعات نهایی همین placeholder می‌ماند.
export const contactInfo = {
  phone: null as string | null,
  whatsapp: null as string | null,
  email: null as string | null,
  address: "کاشمر، خراسان رضوی — در انتظار تکمیل اطلاعات نشانی دقیق",
  pendingLabel: "در انتظار تکمیل اطلاعات",
} as const;
