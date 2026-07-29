import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

function requireEnv(name: "SUPABASE_URL" | "SUPABASE_ANON_KEY"): string {
  const value = process.env[name];
  if (!value) throw new Error(`متغیر محیطی ${name} تنظیم نشده است.`);
  return value;
}

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(requireEnv("SUPABASE_URL"), requireEnv("SUPABASE_ANON_KEY"), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // در Server Component نمی‌توان کوکی نوشت؛ proxy.ts سشن را رفرش نگه می‌دارد.
        }
      },
    },
  });
}
