"use client";

import { useState } from "react";
import { getWhatsappLink } from "@/lib/config/whatsapp";

type Variant = "primary" | "secondary";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-forest-900 text-cream-50 hover:bg-forest-800 border border-forest-900",
  secondary:
    "bg-transparent text-forest-900 border border-forest-900 hover:bg-forest-900 hover:text-cream-50",
};

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 20l1.3-3.9A8 8 0 1 1 9 19.3L4 20Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PriceInquiryButton({
  label,
  pendingNotice,
  productName,
  variant = "primary",
  className = "",
}: {
  label: string;
  pendingNotice: string;
  productName?: string;
  variant?: Variant;
  className?: string;
}) {
  const [showNotice, setShowNotice] = useState(false);
  const link = getWhatsappLink(productName);

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-150 ${variantClasses[variant]} ${className}`}
      >
        <ChatIcon />
        {label}
      </a>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowNotice(true)}
        className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-150 ${variantClasses[variant]} ${className}`}
      >
        <ChatIcon />
        {label}
      </button>
      <p role="status" aria-live="polite" className="mt-2 text-xs text-ink-500">
        {showNotice ? pendingNotice : ""}
      </p>
    </div>
  );
}
