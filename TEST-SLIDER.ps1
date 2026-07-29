$ErrorActionPreference = "Stop"

if (-not (Test-Path ".\package.json")) {
    throw "فایل package.json پیدا نشد. این اسکریپت را از ریشه پروژه اجرا کنید."
}

Remove-Item ".next" -Recurse -Force -ErrorAction SilentlyContinue
npm run lint
npx tsc --noEmit
npm run build
Write-Host "`nاسلایدر با موفقیت بررسی شد. برای اجرا: npm run dev" -ForegroundColor Green
