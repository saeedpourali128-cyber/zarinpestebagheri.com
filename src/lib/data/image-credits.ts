export interface ImageCredit {
  /** مسیر فایل داخل public/images */
  path: string;
  title: string;
  author: string;
  source: string;
  license: string;
  /** true یعنی این عکس نمونهٔ استوک است، نه عکس واقعی زرین دانه ترشیز؛ باید در آینده با عکس واقعی جایگزین شود. */
  isStockPlaceholder: true;
}

// همهٔ تصاویر این فهرست از ویکی‌مدیا کامنز و با مجوز Creative Commons تهیه شده‌اند
// (پسته‌های خراسان شمالی و خراسان رضوی) و صرفاً به‌عنوان Placeholder فاز اول استفاده می‌شوند.
// پیش از انتشار نهایی، باید با عکس‌های واقعی کارخانه و محصولات زرین پسته باقری جایگزین شوند.
export const imageCredits: ImageCredit[] = [
  {
    path: "/images/stock/hero-pistachio-box.webp",
    title: "Pistachio nuts from Iran",
    author: "Amin",
    source: "https://commons.wikimedia.org/wiki/File:Pistachio_nuts_from_Iran.jpg",
    license: "CC BY-SA 4.0",
    isStockPlaceholder: true,
  },
  {
    path: "/images/stock/orchard-tractor.webp",
    title: "Pistachio harvest in North Khorasan",
    author: "علی‌اصغر سلیمی / تسنیم",
    source:
      "https://commons.wikimedia.org/wiki/File:Pistachio_harvest_in_North_Khorasan_12_Tasnim.jpg",
    license: "CC BY 4.0",
    isStockPlaceholder: true,
  },
  {
    path: "/images/stock/sorting-trays.webp",
    title: "Harvesting pistachios from the orchards of North Khorasan",
    author: "Maryam Davarnia / Mehr News Agency",
    source:
      "https://commons.wikimedia.org/wiki/File:2025_Harvesting_pistachios_from_the_orchards_of_North_Khorasan_15_Mehr.jpg",
    license: "CC BY 4.0",
    isStockPlaceholder: true,
  },
  {
    path: "/images/stock/branch-closeup.webp",
    title: "Harvesting pistachios from the orchards of North Khorasan",
    author: "Maryam Davarnia / Mehr News Agency",
    source:
      "https://commons.wikimedia.org/wiki/File:2025_Harvesting_pistachios_from_the_orchards_of_North_Khorasan_1_Mehr.jpg",
    license: "CC BY 4.0",
    isStockPlaceholder: true,
  },
  {
    path: "/images/stock/hand-sorting.webp",
    title: "پسته کنده‌شده از درخت",
    author: "لاشار کوبچ",
    source: "https://commons.wikimedia.org/wiki/File:پسته_کنده_شده_از_درخت.JPG",
    license: "CC BY-SA 3.0",
    isStockPlaceholder: true,
  },
  {
    path: "/images/stock/drying-floor.webp",
    title: "Harvesting pistachios from the orchards of North Khorasan",
    author: "Maryam Davarnia / Mehr News Agency",
    source:
      "https://commons.wikimedia.org/wiki/File:2025_Harvesting_pistachios_from_the_orchards_of_North_Khorasan_5_Mehr.jpg",
    license: "CC BY 4.0",
    isStockPlaceholder: true,
  },
  {
    path: "/images/stock/orchard-harvest-bucket.webp",
    title: "Pistachio harvest in North Khorasan",
    author: "علی‌اصغر سلیمی / تسنیم",
    source:
      "https://commons.wikimedia.org/wiki/File:Pistachio_harvest_in_North_Khorasan_7_Tasnim.jpg",
    license: "CC BY 4.0",
    isStockPlaceholder: true,
  },
];
