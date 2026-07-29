import { Link } from "@/lib/i18n/navigation";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { Product } from "@/lib/types/product";

export function ProductCard({
  product,
  viewLabel,
}: {
  product: Product;
  viewLabel: string;
}) {
  return (
    <li className="group overflow-hidden rounded-lg border border-line-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="block">
        <PlaceholderImage
          src={product.mainImage}
          alt={product.title}
          label={product.title}
        />
        <div className="p-5">
          <h3 className="text-base font-semibold text-forest-900">
            {product.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-700">
            {product.shortDescription}
          </p>
          <span className="mt-4 inline-block text-sm font-medium text-gold-700 underline-offset-4 group-hover:underline">
            {viewLabel}
          </span>
        </div>
      </Link>
    </li>
  );
}
