import { TextField, NumberField, FileField } from "@/app/admin/_components/FormFields";
import { SubmitButton } from "@/app/admin/_components/SubmitButton";
import type { FactoryImage } from "@/lib/types/factory";

export function FactoryImageForm({
  action,
  item,
}: {
  action: (formData: FormData) => void;
  item?: FactoryImage & { sortOrder?: number };
}) {
  return (
    <form action={action} className="space-y-6">
      {item ? (
        <div>
          <p className="mb-1.5 block text-xs font-bold text-forest-900">نامک (slug)</p>
          <p className="rounded-lg bg-cream-100 px-3 py-2.5 text-sm text-ink-600" dir="ltr">
            {item.slug}
          </p>
        </div>
      ) : (
        <TextField name="slug" label="نامک (slug)" required dir="ltr" placeholder="factory-7" />
      )}

      <TextField name="caption" label="عنوان تصویر" defaultValue={item?.caption} required />
      <FileField name="image" label="تصویر" currentUrl={item?.image} />
      <div className="w-32">
        <NumberField name="sortOrder" label="ترتیب نمایش" defaultValue={item?.sortOrder} />
      </div>

      <SubmitButton>ذخیره</SubmitButton>
    </form>
  );
}
