# پچ حذف کادر سفید Hero

این پچ روی نسخه‌ای نصب می‌شود که Hero Slider قبلاً در آن فعال شده است.

تغییرات:
- حذف کامل کارت سفید روی اسلایدر
- قرارگیری ثابت متن و دکمه‌ها روی تصویر
- گرادیان سبز تیره برای خوانایی متن
- تیتر سفید و بخش تأکیدی طلایی
- دکمه اصلی طلایی و دکمه کاتالوگ شفاف
- پوشش مناسب موبایل و دسکتاپ

## نصب
فایل ZIP را در ریشه پروژه، کنار package.json، Extract و Replace کنید.
سپس:

```powershell
Remove-Item .next -Recurse -Force -ErrorAction SilentlyContinue
npm run lint
npx tsc --noEmit
npm run build
npm run dev
```
