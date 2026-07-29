export function Badge({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-full border border-gold-600/50 bg-cream-100 px-3 py-1 text-xs text-gold-700">
      {children}
    </span>
  );
}
