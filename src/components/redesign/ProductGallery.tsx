"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export function ProductGallery({ title, mainImage, gallery }: { title: string; mainImage: string; gallery: string[] }) {
  const images = useMemo(() => Array.from(new Set([mainImage, ...gallery])), [mainImage, gallery]);
  const [active, setActive] = useState(mainImage);

  return (
    <div>
      <div className="relative aspect-[1.7/1] overflow-hidden rounded-[26px] border border-line-200 bg-white shadow-[0_18px_55px_rgba(10,50,32,.1)] lg:aspect-[1.45/1]">
        <Image src={active} alt={title} fill priority sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
        {images.slice(0, 5).map((image, index) => (
          <button key={image} type="button" onClick={() => setActive(image)} aria-label={`تصویر ${index + 1} از ${title}`} className={`relative aspect-[1.8/1] overflow-hidden rounded-xl border-2 bg-white transition ${active === image ? "border-forest-700 shadow-md" : "border-transparent opacity-80 hover:opacity-100"}`}>
            <Image src={image} alt="" fill sizes="150px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
