import Image from "next/image";

function PistachioMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
    >
      <path d="M12 2.5c2.6 0 4.2 2.4 4.2 6.2 0 5.4-2.4 9.6-4.2 12.8-1.8-3.2-4.2-7.4-4.2-12.8 0-3.8 1.6-6.2 4.2-6.2Z" />
      <path d="M9 8.3c.8.6 1.9.9 3 .9s2.2-.3 3-.9" />
    </svg>
  );
}

export function PlaceholderImage({
  src,
  alt,
  label,
  className = "",
  aspect = "aspect-[4/3]",
}: {
  src?: string | null;
  alt: string;
  label?: string;
  className?: string;
  aspect?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${aspect} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative flex flex-col items-center justify-center gap-2 border border-line-300 bg-cream-100 text-ink-500 ${aspect} ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, transparent, transparent 10px, rgba(29,28,24,0.035) 10px, rgba(29,28,24,0.035) 11px)",
      }}
    >
      <PistachioMark />
      {label ? (
        <span className="px-4 text-center text-xs leading-relaxed text-ink-500">
          {label}
        </span>
      ) : null}
    </div>
  );
}
