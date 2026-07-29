import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";

const handleI18nRouting = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  // روی همه‌ی درخواست‌ها، سشن Supabase (اگر وجود داشته باشد) را رفرش نگه می‌داریم.
  const { response: supabaseResponse } = await updateSession(request);

  // مسیرهای /admin بیرون از next-intl هستند (بدون پیشوند زبان)؛ کنترل ورود
  // در src/app/admin/(protected)/layout.tsx انجام می‌شود، نه اینجا.
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return supabaseResponse;
  }

  const intlResponse = handleI18nRouting(request);
  for (const cookie of supabaseResponse.cookies.getAll()) {
    intlResponse.cookies.set(cookie);
  }
  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
