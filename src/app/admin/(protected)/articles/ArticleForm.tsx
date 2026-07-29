import { TextField, TextAreaField, LinesField, CheckboxField, NumberField, FileField } from "@/app/admin/_components/FormFields";
import { SubmitButton } from "@/app/admin/_components/SubmitButton";
import type { Article } from "@/lib/types/article";

export function ArticleForm({
  action,
  article,
}: {
  action: (formData: FormData) => void;
  article?: Article & { sortOrder?: number };
}) {
  return (
    <form action={action} className="space-y-6">
      {article ? (
        <div>
          <p className="mb-1.5 block text-xs font-bold text-forest-900">نامک (slug)</p>
          <p className="rounded-lg bg-cream-100 px-3 py-2.5 text-sm text-ink-600" dir="ltr">
            {article.slug}
          </p>
        </div>
      ) : (
        <TextField name="slug" label="نامک (slug)" required dir="ltr" placeholder="arqam-peste-iran" />
      )}

      <TextField name="title" label="عنوان" defaultValue={article?.title} required />
      <TextAreaField name="shortDescription" label="توضیح کوتاه" defaultValue={article?.shortDescription} rows={2} required />
      <LinesField name="content" label="متن مقاله" defaultValue={article?.content} rows={10} hint="هر پاراگراف را در یک خط جدا بنویسید." />
      <LinesField name="relatedProductSlugs" label="نامک محصولات مرتبط" defaultValue={article?.relatedProductSlugs} />
      <FileField name="coverImage" label="تصویر کاور" currentUrl={article?.coverImage} />
      <TextField name="seoTitle" label="عنوان سئو" defaultValue={article?.seoTitle} required />
      <TextAreaField name="seoDescription" label="توضیح سئو" defaultValue={article?.seoDescription} rows={2} required />

      <div className="flex items-center gap-6">
        <CheckboxField name="featured" label="مقاله منتخب (نمایش در صفحه اصلی)" defaultChecked={article?.featured} />
        <div className="w-32">
          <NumberField name="sortOrder" label="ترتیب نمایش" defaultValue={article?.sortOrder} />
        </div>
      </div>

      <SubmitButton>ذخیره مقاله</SubmitButton>
    </form>
  );
}
