import type { ReactNode } from "react";

export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 text-forest-900 ${className}`}>
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gold-500/50 text-gold-600">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M19.5 4.5C13.5 4.5 8 8 7 15.5c4.5.3 8.5-1.2 11-4.3 1.2-1.5 1.7-3.8 1.5-6.7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M5 20c2.4-5.1 6.2-8.5 11.2-10.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
      <h2 className="text-xl font-extrabold sm:text-2xl">{children}</h2>
    </div>
  );
}
