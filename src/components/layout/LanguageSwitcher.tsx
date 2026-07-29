"use client";

import { useState, useRef, useEffect } from "react";
import { localesMeta } from "@/lib/i18n/locales";

export function LanguageSwitcher({
  label,
  comingSoonLabel,
}: {
  label: string;
  comingSoonLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const active = localesMeta.find((locale) => locale.enabled);

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
        <span>{active?.nativeLabel}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
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
          {localesMeta.map((locale) => (
            <li key={locale.code}>
              <button
                type="button"
                disabled={!locale.enabled}
                className={`flex w-full items-center justify-between px-3 py-2 text-sm ${
                  locale.enabled
                    ? "text-cream-50 hover:bg-forest-800"
                    : "cursor-not-allowed text-cream-50/40"
                }`}
                aria-current={locale.enabled ? "true" : undefined}
              >
                <span>{locale.nativeLabel}</span>
                {!locale.enabled ? (
                  <span className="text-xs text-cream-50/35">{comingSoonLabel}</span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
