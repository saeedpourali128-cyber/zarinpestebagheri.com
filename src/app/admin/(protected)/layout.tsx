import Link from "next/link";
import { requireAdminUser } from "@/lib/supabase/admin-guard";
import { logout } from "@/app/admin/actions";

const navItems = [
  { href: "/admin", label: "داشبورد" },
  { href: "/admin/products", label: "محصولات" },
  { href: "/admin/articles", label: "دانشنامه" },
  { href: "/admin/certificates", label: "گواهی‌ها" },
  { href: "/admin/factory", label: "کارخانه" },
  { href: "/admin/machinery", label: "دستگاه‌ها" },
  { href: "/admin/settings", label: "تنظیمات سایت" },
];

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdminUser();

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 flex-col border-l border-line-200 bg-forest-950 p-5 text-cream-50 sm:flex">
        <h1 className="text-sm font-black text-gold-500">پنل مدیریت</h1>
        <p className="mt-1 truncate text-[11px] text-cream-100/50">{user.email}</p>
        <nav className="mt-8 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2.5 text-sm text-cream-100/85 transition hover:bg-forest-900 hover:text-gold-500"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logout} className="mt-auto pt-8">
          <button type="submit" className="w-full rounded-lg border border-gold-500/30 px-3 py-2.5 text-xs font-bold text-gold-500 hover:bg-forest-900">
            خروج
          </button>
        </form>
      </aside>

      <div className="flex-1 p-5 sm:p-8">
        <div className="mb-5 sm:hidden">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-black text-forest-900">پنل مدیریت</h1>
            <form action={logout}>
              <button type="submit" className="rounded-lg border border-line-300 px-3 py-1.5 text-xs font-bold text-forest-900">
                خروج
              </button>
            </form>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-full border border-line-300 px-3 py-1.5 text-xs font-bold text-forest-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        {children}
      </div>
    </div>
  );
}
