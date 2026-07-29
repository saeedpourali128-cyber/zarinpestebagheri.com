function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DownloadCatalogButton({
  href,
  label,
  pendingLabel,
  variant = "secondary",
  className = "",
}: {
  /** آدرس فایل کاتالوگ (از تنظیمات سایت)؛ اگر هنوز آپلود نشده null است. */
  href: string | null;
  label: string;
  pendingLabel?: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const variantClasses =
    variant === "primary"
      ? "bg-forest-900 text-cream-50 hover:bg-forest-800 border border-forest-900"
      : "bg-transparent text-forest-900 border border-forest-900 hover:bg-forest-900 hover:text-cream-50";

  if (!href) {
    return (
      <span
        aria-disabled="true"
        title={pendingLabel}
        className={`inline-flex min-h-11 cursor-not-allowed items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium opacity-50 ${variantClasses} ${className}`}
      >
        <DownloadIcon />
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      download
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-150 ${variantClasses} ${className}`}
    >
      <DownloadIcon />
      {label}
    </a>
  );
}
