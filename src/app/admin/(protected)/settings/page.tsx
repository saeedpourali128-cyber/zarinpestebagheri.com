import { getSiteSettings } from "@/lib/data/site-settings";
import { updateSiteSettings } from "./actions";
import { TextField, CheckboxField } from "@/app/admin/_components/FormFields";
import { SubmitButton } from "@/app/admin/_components/SubmitButton";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="text-xl font-black text-forest-900">تنظیمات سایت</h1>
      <p className="mt-1 text-sm text-ink-500">شماره تماس، واتساپ، ایمیل، آدرس و کاتالوگ سایت</p>

      {saved ? (
        <p className="mt-4 rounded-lg bg-green-50 px-4 py-2.5 text-sm font-bold text-green-700">تنظیمات ذخیره شد.</p>
      ) : null}

      <div className="mt-6 max-w-xl rounded-2xl border border-line-200 bg-white p-6">
        <form action={updateSiteSettings} className="space-y-6">
          <TextField name="phone" label="شماره تلفن" defaultValue={settings.phone} dir="ltr" />
          <TextField name="email" label="ایمیل" defaultValue={settings.email} dir="ltr" />
          <TextField name="address" label="آدرس" defaultValue={settings.address} />

          <div className="space-y-3 rounded-xl border border-line-200 p-4">
            <TextField
              name="whatsappNumber"
              label="شماره واتساپ (با کد کشور، بدون + یا صفر ابتدایی — مثال: 989123456789)"
              defaultValue={settings.whatsappNumber}
              dir="ltr"
            />
            <CheckboxField name="whatsappEnabled" label="دکمه‌ی استعلام قیمت به واتساپ وصل شود" defaultChecked={settings.whatsappEnabled} />
          </div>

          <div>
            <label htmlFor="catalogFile" className="mb-1.5 block text-xs font-bold text-forest-900">
              فایل کاتالوگ (PDF)
            </label>
            {settings.catalogUrl ? (
              <a href={settings.catalogUrl} target="_blank" rel="noopener noreferrer" className="mb-2 block text-xs text-forest-700 underline">
                مشاهده فایل فعلی
              </a>
            ) : null}
            <input
              id="catalogFile"
              name="catalogFile"
              type="file"
              accept="application/pdf"
              className="block w-full text-xs text-ink-700 file:ml-3 file:rounded-lg file:border-0 file:bg-forest-900 file:px-3 file:py-2 file:text-xs file:font-bold file:text-cream-50"
            />
            <p className="mt-1 text-[11px] text-ink-500">در صورت خالی گذاشتن، فایل فعلی حفظ می‌شود.</p>
          </div>

          <SubmitButton>ذخیره تنظیمات</SubmitButton>
        </form>
      </div>
    </div>
  );
}
