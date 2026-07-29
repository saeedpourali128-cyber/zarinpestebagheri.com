"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link } from "@/lib/i18n/navigation";

export interface NavItem { href: string; label: string; }

export function MobileMenu({ items, ctaSlot, openLabel, closeLabel }: { items: NavItem[]; ctaSlot?: ReactNode; openLabel: string; closeLabel: string; }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button type="button" onClick={() => setOpen(true)} aria-label={openLabel} aria-expanded={open} className="flex h-11 w-11 items-center justify-center text-gold-500">
        <svg width="25" height="25" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
      </button>
      {open ? createPortal(
        <div className="fixed inset-0 z-50 overflow-y-auto bg-forest-950 text-cream-50">
          <div className="flex items-center justify-between border-b border-gold-500/20 px-5 py-4">
            <span className="text-sm font-bold text-gold-500">منوی سایت</span>
            <button type="button" onClick={() => setOpen(false)} aria-label={closeLabel} className="flex h-11 w-11 items-center justify-center text-gold-500">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
            </button>
          </div>
          <nav className="flex flex-col px-5 py-4">
            {items.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-gold-500/15 py-4 text-base text-cream-50/90 hover:text-gold-500">{item.label}</Link>)}
          </nav>
          {ctaSlot ? <div className="px-5 pb-6">{ctaSlot}</div> : null}
        </div>, document.body) : null}
    </div>
  );
}
