# پچ اسلایدر صفحه اصلی زرین دانه

این پچ بخش Hero صفحه اصلی را به اسلایدر تصویری خودکار تبدیل می‌کند.

## رفتار اسلایدر

- تعویض خودکار تصویر هر ۳ ثانیه
- حرکت پیوسته از راست به چپ
- ثابت ماندن تیتر، توضیحات و دکمه‌ها روی تصاویر
- توقف خودکار هنگام قرار گرفتن ماوس یا فوکوس روی اسلایدر
- سه نشانگر قابل کلیک در پایین اسلایدر
- تصاویر WebP با اندازه ۱۹۲۰×۱۰۸۰
- سازگار با موبایل و دسکتاپ

## فایل‌های پچ

- `src/components/redesign/HomeHeroSlider.tsx`
- `src/app/[locale]/page.tsx`
- `public/images/redesign/hero-slider/*.webp`

## نصب

فایل ZIP پچ را داخل پوشه اصلی پروژه، همان پوشه‌ای که `package.json` قرار دارد، Extract و Replace کنید.

سپس:

```powershell
Remove-Item ".next" -Recurse -Force -ErrorAction SilentlyContinue
npm run lint
npx tsc --noEmit
npm run build
npm run dev
```

پیش‌نمایش:

`http://localhost:3000/fa`
