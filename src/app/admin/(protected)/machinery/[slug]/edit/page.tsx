import { notFound } from "next/navigation";
import { MachineryForm } from "../../MachineryForm";
import { updateMachineryItem } from "../../actions";
import { getMachineryItemForEdit } from "../../data";

export default async function EditMachineryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getMachineryItemForEdit(slug);
  if (!item) notFound();

  const updateWithSlug = updateMachineryItem.bind(null, slug);

  return (
    <div>
      <h1 className="text-xl font-black text-forest-900">ویرایش دستگاه</h1>
      <div className="mt-6 max-w-lg rounded-2xl border border-line-200 bg-white p-6">
        <MachineryForm action={updateWithSlug} item={item} />
      </div>
    </div>
  );
}
