import type { Product } from "@/lib/types/product";

const genericStorage =
  "نگهداری در محل خشک و خنک، دور از رطوبت و نور مستقیم آفتاب";

export const products: Product[] = [
  {
    slug: "pesteh-akbari",
    title: "پسته اکبری",
    category: "raw",
    shortDescription:
      "یکی از بلندترین ارقام پسته ایران، با پوسته کشیده و ظاهر ممتاز.",
    description:
      "پسته اکبری یکی از شناخته‌شده‌ترین ارقام پسته ایران است که با پوسته کشیده و بلند خود از سایر ارقام متمایز می‌شود. این رقم در کاشمر تأمین، درجه‌بندی و بسته‌بندی می‌شود و برای مصرف خام یا بوداده مناسب است.",
    // تصویر نمونهٔ عمومی پسته ایرانی (نه عکس اختصاصی این رقم) — تا دریافت عکاسی واقعی محصول جایگزین شود. جزئیات مجوز: lib/data/image-credits.ts
    mainImage: "/images/redesign/product-hero.webp",
    gallery: ["/images/redesign/product-thumb-1.webp", "/images/redesign/product-thumb-2.webp", "/images/redesign/product-thumb-3.webp", "/images/redesign/product-thumb-4.webp", "/images/redesign/product-thumb-5.webp"],
    specs: {
      cultivar: "اکبری",
      opennessType: "خندان",
      storageConditions: genericStorage,
      sizeOz: "در انتظار تکمیل اطلاعات",
      packagingType: "در انتظار تکمیل اطلاعات",
      minOrder: "در انتظار تکمیل اطلاعات",
    },
    usages: ["مصرف خام و بوداده", "بسته‌بندی عمده و خرده‌فروشی"],
    targetMarkets: ["عمده‌فروشان داخلی", "مشتریان صادراتی"],
    relatedProductSlugs: ["pesteh-ahmad-aghaei", "pesteh-kalleghouchi"],
    relatedArticleSlugs: ["arqam-peste-iran"],
    seoTitle: "پسته اکبری | زرین پسته باقری",
    seoDescription:
      "تأمین و بسته‌بندی عمده پسته اکبری از کاشمر، خراسان رضوی. مناسب عمده‌فروشان، کارخانه‌ها و مشتریان صادراتی.",
    featured: true,
  },
  {
    slug: "pesteh-ahmad-aghaei",
    title: "پسته احمدآقایی",
    category: "raw",
    shortDescription: "رقمی کشیده و باکیفیت، مناسب بسته‌بندی صادراتی و هدیه.",
    description:
      "پسته احمدآقایی با شکل کشیده و ظاهر یک‌دست، یکی از ارقام مرغوب پسته ایران محسوب می‌شود. این محصول در زرین پسته باقری از تولیدکنندگان منطقه کاشمر تأمین و برای عرضه عمده و صادراتی آماده‌سازی می‌شود.",
    // تصویر نمونهٔ عمومی پسته ایرانی — تا دریافت عکاسی واقعی محصول جایگزین شود.
    mainImage: "/images/redesign/home-product-4.webp",
    gallery: ["/images/redesign/product-hero.webp"],
    specs: {
      cultivar: "احمدآقایی",
      opennessType: "خندان",
      storageConditions: genericStorage,
      sizeOz: "در انتظار تکمیل اطلاعات",
      packagingType: "در انتظار تکمیل اطلاعات",
      minOrder: "در انتظار تکمیل اطلاعات",
    },
    usages: ["مصرف خام و بوداده", "بسته‌بندی هدیه و صادراتی"],
    targetMarkets: ["عمده‌فروشان داخلی", "مشتریان صادراتی"],
    relatedProductSlugs: ["pesteh-akbari", "pesteh-fandoghi"],
    relatedArticleSlugs: ["arqam-peste-iran"],
    seoTitle: "پسته احمدآقایی | زرین پسته باقری",
    seoDescription:
      "تأمین و بسته‌بندی عمده پسته احمدآقایی از کاشمر، خراسان رضوی. مناسب عمده‌فروشان، کارخانه‌ها و مشتریان صادراتی.",
    featured: true,
  },
  {
    slug: "pesteh-fandoghi",
    title: "پسته فندقی",
    category: "raw",
    shortDescription: "پرمصرف‌ترین رقم پسته ایران، با دانه‌ای گرد و متوسط.",
    description:
      "پسته فندقی به دلیل تولید بالا در باغات ایران، پرمصرف‌ترین و شناخته‌شده‌ترین رقم پسته کشور است. دانه‌ای گرد و متوسط دارد و برای مصارف عمده خانگی، صنعتی و صادراتی مناسب است.",
    // تصویر نمونهٔ عمومی پسته ایرانی — تا دریافت عکاسی واقعی محصول جایگزین شود.
    mainImage: "/images/redesign/home-product-3.webp",
    gallery: ["/images/redesign/related-3.webp"],
    specs: {
      cultivar: "فندقی",
      opennessType: "خندان",
      storageConditions: genericStorage,
      sizeOz: "در انتظار تکمیل اطلاعات",
      packagingType: "در انتظار تکمیل اطلاعات",
      minOrder: "در انتظار تکمیل اطلاعات",
    },
    usages: ["مصرف خام و بوداده", "تأمین عمده صنعتی"],
    targetMarkets: ["عمده‌فروشان داخلی", "کارخانه‌های فرآوری", "مشتریان صادراتی"],
    relatedProductSlugs: ["pesteh-akbari", "pesteh-kalleghouchi"],
    relatedArticleSlugs: ["arqam-peste-iran"],
    seoTitle: "پسته فندقی | زرین پسته باقری",
    seoDescription:
      "تأمین و بسته‌بندی عمده پسته فندقی از کاشمر، خراسان رضوی. مناسب عمده‌فروشان، کارخانه‌ها و مشتریان صادراتی.",
    featured: true,
  },
  {
    slug: "pesteh-kalleghouchi",
    title: "پسته کله‌قوچی",
    category: "raw",
    shortDescription: "درشت‌ترین رقم پسته ایران، با دانه‌ای بزرگ و گرد.",
    description:
      "پسته کله‌قوچی به دلیل اندازه بزرگ دانه، به‌عنوان درشت‌ترین رقم پسته ایران شناخته می‌شود. این محصول از باغات کاشمر تأمین می‌شود و برای بازارهایی که به دنبال اندازه دانه بزرگ‌تر هستند مناسب است.",
    // تصویر نمونهٔ عمومی پسته ایرانی — تا دریافت عکاسی واقعی محصول جایگزین شود.
    mainImage: "/images/redesign/related-2.webp",
    gallery: ["/images/redesign/product-thumb-2.webp"],
    specs: {
      cultivar: "کله‌قوچی",
      opennessType: "خندان",
      storageConditions: genericStorage,
      sizeOz: "در انتظار تکمیل اطلاعات",
      packagingType: "در انتظار تکمیل اطلاعات",
      minOrder: "در انتظار تکمیل اطلاعات",
    },
    usages: ["مصرف خام و بوداده", "بسته‌بندی صادراتی"],
    targetMarkets: ["مشتریان صادراتی", "عمده‌فروشان داخلی"],
    relatedProductSlugs: ["pesteh-fandoghi", "pesteh-akbari"],
    relatedArticleSlugs: ["arqam-peste-iran"],
    seoTitle: "پسته کله‌قوچی | زرین پسته باقری",
    seoDescription:
      "تأمین و بسته‌بندی عمده پسته کله‌قوچی از کاشمر، خراسان رضوی. مناسب عمده‌فروشان، کارخانه‌ها و مشتریان صادراتی.",
    featured: false,
  },
  {
    slug: "maghz-pesteh-sabz",
    title: "مغز پسته سبز",
    category: "kernel",
    shortDescription: "مغز پسته پوست‌گرفته با رنگ سبز طبیعی، آماده مصرف صنعتی.",
    description:
      "مغز پسته سبز حاصل پوست‌گیری کامل پسته و جداسازی مغز با رنگ سبز طبیعی است. این محصول برای مصارف صنایع غذایی از جمله بستنی، شیرینی و شکلات مورد استفاده قرار می‌گیرد.",
    mainImage: "/images/redesign/home-product-2.webp",
    gallery: ["/images/redesign/related-4.webp"],
    specs: {
      kernelColor: "سبز روشن",
      kernelPercentage: "در انتظار تکمیل اطلاعات",
      storageConditions: genericStorage,
      packagingType: "در انتظار تکمیل اطلاعات",
      minOrder: "در انتظار تکمیل اطلاعات",
    },
    usages: ["صنایع بستنی و شیرینی", "صنایع شکلات‌سازی", "بسته‌بندی خرده‌فروشی"],
    targetMarkets: ["کارخانه‌های فرآوری مواد غذایی", "مشتریان صادراتی"],
    relatedProductSlugs: ["maghz-pesteh-dopoost", "khalal-pesteh"],
    relatedArticleSlugs: ["tafavot-anva-maghz-pesteh"],
    seoTitle: "مغز پسته سبز | زرین پسته باقری",
    seoDescription:
      "تأمین عمده مغز پسته سبز از کاشمر، مناسب صنایع غذایی و مشتریان صادراتی.",
    featured: true,
  },
  {
    slug: "maghz-pesteh-dopoost",
    title: "مغز پسته دوپوست",
    category: "kernel",
    shortDescription: "مغز پسته با پوست نازک نگه‌داشته‌شده، مناسب مصارف صنعتی.",
    description:
      "مغز پسته دوپوست، مغزی است که پوست نازک دور آن حفظ شده است. این نوع مغز معمولاً در فرآیندهای صنعتی که نیاز به فرآوری بیشتر دارند مورد استفاده قرار می‌گیرد.",
    mainImage: "/images/redesign/related-3.webp",
    gallery: ["/images/redesign/home-product-2.webp"],
    specs: {
      kernelColor: "در انتظار تکمیل اطلاعات",
      kernelPercentage: "در انتظار تکمیل اطلاعات",
      storageConditions: genericStorage,
      packagingType: "در انتظار تکمیل اطلاعات",
      minOrder: "در انتظار تکمیل اطلاعات",
    },
    usages: ["فرآوری صنعتی", "صنایع غذایی"],
    targetMarkets: ["کارخانه‌های فرآوری مواد غذایی", "مشتریان صادراتی"],
    relatedProductSlugs: ["maghz-pesteh-sabz", "pesteh-poudr"],
    relatedArticleSlugs: ["tafavot-anva-maghz-pesteh"],
    seoTitle: "مغز پسته دوپوست | زرین پسته باقری",
    seoDescription:
      "تأمین عمده مغز پسته دوپوست از کاشمر، مناسب صنایع غذایی و مشتریان صادراتی.",
    featured: false,
  },
  {
    slug: "khalal-pesteh",
    title: "خلال پسته",
    category: "khalal",
    shortDescription: "پسته خلال‌شده، مناسب تزئین شیرینی، بستنی و شکلات.",
    description:
      "خلال پسته از برش نازک مغز پسته به‌دست می‌آید و عمدتاً برای تزئین شیرینی‌جات، بستنی و محصولات شکلاتی استفاده می‌شود. این محصول در اندازه‌های قابل تنظیم بر اساس نیاز مشتری بسته‌بندی می‌شود.",
    mainImage: "/images/redesign/home-product-1.webp",
    gallery: ["/images/redesign/product-thumb-3.webp"],
    specs: {
      kernelColor: "در انتظار تکمیل اطلاعات",
      storageConditions: genericStorage,
      packagingType: "در انتظار تکمیل اطلاعات",
      minOrder: "در انتظار تکمیل اطلاعات",
    },
    usages: ["تزئین شیرینی و بستنی", "صنایع شکلات‌سازی"],
    targetMarkets: ["کارخانه‌های شیرینی و شکلات", "مشتریان صادراتی"],
    relatedProductSlugs: ["maghz-pesteh-sabz", "pesteh-poudr"],
    relatedArticleSlugs: ["tafavot-anva-maghz-pesteh"],
    seoTitle: "خلال پسته | زرین پسته باقری",
    seoDescription:
      "تأمین عمده خلال پسته از کاشمر، مناسب صنایع شیرینی، بستنی و شکلات.",
    featured: true,
  },
  {
    slug: "pesteh-poudr",
    title: "پودر پسته",
    category: "powder",
    shortDescription: "پودر حاصل از آسیاب مغز پسته، برای مصارف صنایع غذایی.",
    description:
      "پودر پسته از آسیاب مغز پسته تهیه می‌شود و در صنایع غذایی از جمله شیرینی‌پزی، بستنی‌سازی و تولید محصولات ترکیبی کاربرد دارد. دانه‌بندی پودر بر اساس نیاز مشتری قابل تنظیم است.",
    mainImage: "/images/redesign/related-4.webp",
    gallery: ["/images/redesign/home-product-1.webp"],
    specs: {
      storageConditions: genericStorage,
      packagingType: "در انتظار تکمیل اطلاعات",
      minOrder: "در انتظار تکمیل اطلاعات",
    },
    usages: ["شیرینی‌پزی و قنادی", "صنایع بستنی"],
    targetMarkets: ["کارخانه‌های فرآوری مواد غذایی", "مشتریان صادراتی"],
    relatedProductSlugs: ["khalal-pesteh", "maghz-pesteh-dopoost"],
    relatedArticleSlugs: ["tafavot-anva-maghz-pesteh"],
    seoTitle: "پودر پسته | زرین پسته باقری",
    seoDescription:
      "تأمین عمده پودر پسته از کاشمر، مناسب صنایع غذایی و مشتریان صادراتی.",
    featured: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedProductSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((item): item is Product => Boolean(item));
}
