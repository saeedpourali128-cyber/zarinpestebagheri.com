"use client";

import { useLocale } from "next-intl";
import { localesMeta } from "@/lib/i18n/locales";
import { Link, usePathname } from "@/lib/i18n/navigation";
import type { AppLocale } from "@/lib/i18n/routing";

export function TopLangBar({
  comingSoonLabel,
}: {
  comingSoonLabel: string;
}) {
  const currentLocale = useLocale();
  const pathname = usePathname();

  return (
    <div className="border-b border-gold-500/15">
      <div className="mx-auto flex w-full max-w-[1440px] justify-end gap-4 px-5 py-2 sm:px-7 lg:px-10">
        {localesMeta.map((locale) => {
          const isActive = locale.code === currentLocale;

          if (!locale.enabled) {
            return (
              <span
                key={locale.code}
                title={comingSoonLabel}
                className="cursor-not-allowed text-[11px] tracking-[.12em] text-cream-50/45"
              >
                {locale.code.toUpperCase()}
              </span>
            );
          }

          return (
            <Link
              key={locale.code}
              href={pathname}
              locale={locale.code as AppLocale}
              aria-current={isActive ? "page" : undefined}
              className={`text-[11px] tracking-[.12em] transition ${
                isActive
                  ? "font-bold text-gold-500"
                  : "font-bold text-gold-500 hover:text-gold-300"
              }`}
            >
              {locale.code.toUpperCase()}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
