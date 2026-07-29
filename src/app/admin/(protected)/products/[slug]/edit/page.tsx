import { notFound } from "next/navigation";
import { ProductForm } from "../../ProductForm";
import { updateProduct } from "../../actions";
import { getProductForEdit } from "../../data";

export default async function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductForEdit(slug);
  if (!product) notFound();

  const updateWithSlug = updateProduct.bind(null, slug);

  return (
    <div>
      <h1 className="text-xl font-black text-forest-900">ویرایش محصول</h1>
      <div className="mt-6 max-w-3xl rounded-2xl border border-line-200 bg-white p-6">
        <ProductForm action={updateWithSlug} product={product} />
      </div>
    </div>
  );
}
