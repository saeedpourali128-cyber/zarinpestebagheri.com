import { localesMeta } from "@/lib/i18n/locales";

export function TopLangBar({ comingSoonLabel }: { comingSoonLabel: string }) {
  return (
    <div className="hidden border-b border-gold-500/15 bg-forest-950 sm:block">
      <div className="mx-auto flex h-8 w-full max-w-[1440px] items-center px-7 lg:px-10">
        <ul className="ms-auto flex items-center gap-4" dir="ltr">
          {localesMeta.map((locale) => (
            <li key={locale.code}>
              <span
                title={locale.enabled ? undefined : comingSoonLabel}
                className={`text-[11px] tracking-[.12em] ${locale.enabled ? "font-bold text-gold-500" : "cursor-not-allowed text-cream-50/45"}`}
              >
                {locale.code.toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
