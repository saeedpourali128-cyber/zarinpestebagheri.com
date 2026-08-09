"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { localesMeta } from "@/lib/i18n/locales";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import type { AppLocale } from "@/lib/i18n/routing";

export function LanguageSwitcher({
  label,
  comingSoonLabel,
}: {
  label: string;
  comingSoonLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onClickOutside);
    return () =>
      document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const active = localesMeta.find(
    (locale) => locale.code === currentLocale
  );

  function changeLanguage(locale: string) {
    if (locale === currentLocale) {
      setOpen(false);
      return;
    }

    router.replace(pathname, {
      locale: locale as AppLocale,
    });

    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex min-h-11 items-center gap-1.5 px-2 text-sm text-gold-500 hover:text-gold-600"
      >
        <span className="sr-only">{label}</span>
        <span>{active?.nativeLabel ?? currentLocale.toUpperCase()}</span>

        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          aria-hidden="true"
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
          />
        </svg>
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute end-0 z-20 mt-1 w-40 rounded-xl border border-gold-500/25 bg-forest-950 py-1 shadow-xl"
        >
          {localesMeta.map((locale) => {
            const isActive = locale.code === currentLocale;

            return (
              <li key={locale.code}>
                <button
                  type="button"
                  onClick={() => changeLanguage(locale.code)}
                  disabled={!locale.enabled}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex w-full items-center justify-between px-3 py-2 text-sm ${
                    isActive
                      ? "text-gold-500"
                      : locale.enabled
                        ? "text-cream-50 hover:bg-forest-800"
                        : "cursor-not-allowed text-cream-50/40"
                  }`}
                >
                  <span>{locale.nativeLabel}</span>

                  {!locale.enabled ? (
                    <span className="text-xs text-cream-50/35">
                      {comingSoonLabel}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
