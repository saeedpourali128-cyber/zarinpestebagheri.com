"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

const SLIDE_DURATION_MS = 3000;
const TRANSITION_DURATION_MS = 850;

const slides = [
  {
    src: "/images/redesign/hero-slider/hero-slide-01-facility.webp",
    alt: "نمای ساختمان و مجموعه زرین دانه",
    position: "center center",
  },
  {
    src: "/images/redesign/hero-slider/hero-slide-02-quality-control.webp",
    alt: "کنترل کیفیت و درجه‌بندی مغز پسته",
    position: "center center",
  },
  {
    src: "/images/redesign/hero-slider/hero-slide-03-orchard.webp",
    alt: "باغ پسته و مسیر میان درختان پسته",
    position: "center center",
  },
] as const;

export function HomeHeroSlider() {
  const sliderItems = useMemo(() => [...slides, slides[0]], []);
  const [slideIndex, setSlideIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [paused, setPaused] = useState(false);

  const goToNextSlide = useCallback(() => {
    setSlideIndex((current) => current + 1);
  }, []);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(goToNextSlide, SLIDE_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [goToNextSlide, paused]);

  const handleTransitionEnd = () => {
    if (slideIndex !== slides.length) return;

    // اسلاید آخر، کپی اسلاید اول است. بدون انیمیشن به ابتدای Track برمی‌گردیم
    // تا حرکت بعدی همچنان از راست به چپ و بدون پرش دیده شود.
    setTransitionEnabled(false);
    setSlideIndex(0);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setTransitionEnabled(true));
    });
  };

  const activeDot = slideIndex % slides.length;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      dir="ltr"
      aria-label="تصاویر معرفی زرین دانه"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="flex h-full w-full will-change-transform motion-reduce:transition-none"
        style={{
          transform: `translate3d(-${slideIndex * 100}%, 0, 0)`,
          transition: transitionEnabled
            ? `transform ${TRANSITION_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
            : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {sliderItems.map((slide, index) => (
          <div
            key={`${slide.src}-${index}`}
            className="relative h-full min-w-full shrink-0"
            aria-hidden={index !== slideIndex}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              quality={90}
              className="object-cover"
              style={{ objectPosition: slide.position }}
            />
          </div>
        ))}
      </div>

      {/*
        لایه محافظ خوانایی: در موبایل کل تصویر کمی تیره است و در دسکتاپ
        سمت متن (چپ) تیره‌تر می‌شود و به‌تدریج به سمت تصویر محو می‌گردد.
      */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,31,20,.72)_0%,rgba(7,31,20,.48)_48%,rgba(7,31,20,.76)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,31,20,.95)_0%,rgba(7,31,20,.82)_32%,rgba(7,31,20,.42)_58%,rgba(7,31,20,.08)_100%)]" />
      <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center gap-2" dir="rtl">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`نمایش تصویر ${index + 1}`}
            aria-current={activeDot === index ? "true" : undefined}
            onClick={() => {
              setTransitionEnabled(true);
              setSlideIndex(index);
            }}
            className={`h-2.5 rounded-full border border-white/80 shadow-sm transition-all duration-300 ${
              activeDot === index ? "w-8 bg-gold-500" : "w-2.5 bg-white/75 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
