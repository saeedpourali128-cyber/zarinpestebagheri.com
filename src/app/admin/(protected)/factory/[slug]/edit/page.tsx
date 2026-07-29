import { notFound } from "next/navigation";
import { FactoryImageForm } from "../../FactoryImageForm";
import { updateFactoryImage } from "../../actions";
import { getFactoryImageForEdit } from "../../data";

export default async function EditFactoryImagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getFactoryImageForEdit(slug);
  if (!item) notFound();

  const updateWithSlug = updateFactoryImage.bind(null, slug);

  return (
    <div>
      <h1 className="text-xl font-black text-forest-900">ویرایش تصویر کارخانه</h1>
      <div className="mt-6 max-w-lg rounded-2xl border border-line-200 bg-white p-6">
        <FactoryImageForm action={updateWithSlug} item={item} />
      </div>
    </div>
  );
}
