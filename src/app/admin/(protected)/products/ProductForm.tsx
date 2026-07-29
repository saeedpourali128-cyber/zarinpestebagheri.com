import {
  TextField,
  TextAreaField,
  LinesField,
  SelectField,
  CheckboxField,
  NumberField,
  FileField,
} from "@/app/admin/_components/FormFields";
import { SubmitButton } from "@/app/admin/_components/SubmitButton";
import type { Product } from "@/lib/types/product";

const categoryOptions = [
  { value: "raw", label: "خام (raw)" },
  { value: "kernel", label: "مغز (kernel)" },
  { value: "khalal", label: "خلال (khalal)" },
  { value: "powder", label: "پودر (powder)" },
];

export function ProductForm({
  action,
  product,
}: {
  action: (formData: FormData) => void;
  product?: Product & { sortOrder?: number };
}) {
  return (
    <form action={action} className="space-y-6">
      {product ? (
        <div>
          <p className="mb-1.5 block text-xs font-bold text-forest-900">نامک (slug)</p>
          <p className="rounded-lg bg-cream-100 px-3 py-2.5 text-sm text-ink-600" dir="ltr">
            {product.slug}
          </p>
        </div>
      ) : (
        <TextField name="slug" label="نامک (slug) — فقط حروف لاتین و خط‌تیره" required dir="ltr" placeholder="pesteh-akbari" />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField name="title" label="عنوان" defaultValue={product?.title} required />
        <SelectField name="category" label="دسته‌بندی" defaultValue={product?.category} options={categoryOptions} />
      </div>

      <TextAreaField name="shortDescription" label="توضیح کوتاه" defaultValue={product?.shortDescription} rows={2} required />
      <TextAreaField name="description" label="توضیح کامل" defaultValue={product?.description} rows={5} required />

      <div>
        <h3 className="mb-3 text-sm font-black text-forest-900">مشخصات فنی</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField name="cultivar" label="رقم" defaultValue={product?.specs.cultivar} />
          <TextField name="sizeOz" label="اندازه / انس" defaultValue={product?.specs.sizeOz} />
          <TextField name="opennessType" label="نوع خندانی" defaultValue={product?.specs.opennessType} />
          <TextField name="kernelColor" label="رنگ مغز" defaultValue={product?.specs.kernelColor} />
          <TextField name="kernelPercentage" label="درصد مغز" defaultValue={product?.specs.kernelPercentage} />
          <TextField name="packagingType" label="نوع بسته‌بندی" defaultValue={product?.specs.packagingType} />
          <TextField name="minOrder" label="حداقل سفارش" defaultValue={product?.specs.minOrder} />
          <TextField name="storageConditions" label="شرایط نگهداری" defaultValue={product?.specs.storageConditions} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <LinesField name="usages" label="کاربردها" defaultValue={product?.usages} />
        <LinesField name="targetMarkets" label="بازارهای هدف" defaultValue={product?.targetMarkets} />
        <LinesField name="relatedProductSlugs" label="نامک محصولات مرتبط" defaultValue={product?.relatedProductSlugs} hint="نامک هر محصول را در یک خط بنویسید." />
        <LinesField name="relatedArticleSlugs" label="نامک مقالات مرتبط" defaultValue={product?.relatedArticleSlugs} hint="نامک هر مقاله را در یک خط بنویسید." />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FileField name="mainImage" label="تصویر اصلی" currentUrl={product?.mainImage} />
        <FileField name="gallery" label="افزودن تصویر به گالری" multiple />
      </div>

      <TextField name="seoTitle" label="عنوان سئو" defaultValue={product?.seoTitle} required />
      <TextAreaField name="seoDescription" label="توضیح سئو" defaultValue={product?.seoDescription} rows={2} required />

      <div className="flex items-center gap-6">
        <CheckboxField name="featured" label="محصول منتخب (نمایش در صفحه اصلی)" defaultChecked={product?.featured} />
        <div className="w-32">
          <NumberField name="sortOrder" label="ترتیب نمایش" defaultValue={product?.sortOrder} />
        </div>
      </div>

      <SubmitButton>ذخیره محصول</SubmitButton>
    </form>
  );
}
