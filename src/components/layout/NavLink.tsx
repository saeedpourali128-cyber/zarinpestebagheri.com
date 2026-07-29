"use client";

import { usePathname, Link } from "@/lib/i18n/navigation";

export function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`relative py-3 text-[13px] font-medium transition-colors ${
        isActive ? "text-gold-500" : "text-cream-50/82 hover:text-gold-500"
      }`}
    >
      {label}
      {isActive ? <span className="absolute inset-x-1 -bottom-0.5 h-px bg-gold-500" /> : null}
    </Link>
  );
}
