import { TextField, TextAreaField, CheckboxField, NumberField, FileField } from "@/app/admin/_components/FormFields";
import { SubmitButton } from "@/app/admin/_components/SubmitButton";
import type { Certificate } from "@/lib/types/certificate";

export function CertificateForm({
  action,
  certificate,
}: {
  action: (formData: FormData) => void;
  certificate?: Certificate & { sortOrder?: number };
}) {
  return (
    <form action={action} className="space-y-6">
      {certificate ? (
        <div>
          <p className="mb-1.5 block text-xs font-bold text-forest-900">نامک (slug)</p>
          <p className="rounded-lg bg-cream-100 px-3 py-2.5 text-sm text-ink-600" dir="ltr">
            {certificate.slug}
          </p>
        </div>
      ) : (
        <TextField name="slug" label="نامک (slug)" required dir="ltr" placeholder="iso-22000" />
      )}

      <TextField name="title" label="عنوان" defaultValue={certificate?.title} required />
      <TextAreaField name="description" label="توضیح" defaultValue={certificate?.description} rows={2} required />
      <FileField name="image" label="تصویر گواهی" currentUrl={certificate?.image} />

      <div className="flex items-center gap-6">
        <CheckboxField name="isPlaceholder" label="نمونه است (تا دریافت مدرک رسمی)" defaultChecked={certificate?.isPlaceholder ?? true} />
        <div className="w-32">
          <NumberField name="sortOrder" label="ترتیب نمایش" defaultValue={certificate?.sortOrder} />
        </div>
      </div>

      <SubmitButton>ذخیره گواهی</SubmitButton>
    </form>
  );
}
