import { ProductForm } from "../ProductForm";
import { createProduct } from "../actions";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-xl font-black text-forest-900">محصول جدید</h1>
      <div className="mt-6 max-w-3xl rounded-2xl border border-line-200 bg-white p-6">
        <ProductForm action={createProduct} />
      </div>
    </div>
  );
}
