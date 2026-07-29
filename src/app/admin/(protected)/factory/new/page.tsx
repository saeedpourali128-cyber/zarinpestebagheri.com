import { FactoryImageForm } from "../FactoryImageForm";
import { createFactoryImage } from "../actions";

export default function NewFactoryImagePage() {
  return (
    <div>
      <h1 className="text-xl font-black text-forest-900">تصویر کارخانه جدید</h1>
      <div className="mt-6 max-w-lg rounded-2xl border border-line-200 bg-white p-6">
        <FactoryImageForm action={createFactoryImage} />
      </div>
    </div>
  );
}
