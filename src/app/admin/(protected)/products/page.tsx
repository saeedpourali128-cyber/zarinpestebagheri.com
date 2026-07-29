import Link from "next/link";
import { getAllProducts } from "@/lib/data/products";
import { deleteProduct } from "./actions";
import { DeleteButton } from "@/app/admin/_components/DeleteButton";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-forest-900">محصولات</h1>
        <Link href="/admin/products/new" className="rounded-lg bg-forest-900 px-4 py-2 text-xs font-bold text-cream-50 hover:bg-forest-800">
          + محصول جدید
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line-200 bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-line-200 text-right text-xs text-ink-500">
              <th className="p-3">عنوان</th>
              <th className="p-3">دسته</th>
              <th className="p-3">نامک</th>
              <th className="p-3">منتخب</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.slug} className="border-b border-line-200 last:border-0">
                <td className="p-3 font-bold text-forest-900">{product.title}</td>
                <td className="p-3 text-ink-600">{product.category}</td>
                <td className="p-3 text-ink-500" dir="ltr">
                  {product.slug}
                </td>
                <td className="p-3 text-ink-600">{product.featured ? "بله" : "—"}</td>
                <td className="p-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.slug}/edit`}
                      className="rounded-lg border border-line-300 px-3 py-1.5 text-xs font-bold text-forest-900 hover:bg-cream-100"
                    >
                      ویرایش
                    </Link>
                    <DeleteButton action={deleteProduct.bind(null, product.slug)} confirmLabel={`محصول «${product.title}» حذف شود؟`} />
                  </div>
                </td>
              </tr>
            ))}
            {!products.length ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-ink-500">
                  هنوز محصولی ثبت نشده است.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
