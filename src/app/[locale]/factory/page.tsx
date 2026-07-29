import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { DownloadCatalogButton } from "@/components/cta/DownloadCatalogButton";
import { PriceInquiryButton } from "@/components/cta/PriceInquiryButton";
import { getFactoryImages } from "@/lib/data/factory";
import { getMachinery } from "@/lib/data/machinery";
import { getAllCertificates } from "@/lib/data/certificates";
import { getSiteSettings, buildWhatsappLink } from "@/lib/data/site-settings";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("factoryPage");
  return { title: t("title"), description: t("description"), alternates: { canonical: "/factory" } };
}

const qualities = [
  ["استانداردهای بین‌المللی", "گواهی‌ها و رویه‌های معتبر"],
  ["تکنولوژی روز دنیا", "تجهیزات مدرن در فرآوری"],
  ["اصول بهداشتی", "کنترل محیط و ایمنی محصول"],
  ["کنترل کیفیت چندمرحله‌ای", "نظارت از دریافت تا بسته‌بندی"],
];

export default async function FactoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("factoryPage");
  const tCommon = await getTranslations("common");
  const [factoryImages, machinery, certificates, settings] = await Promise.all([
    getFactoryImages(),
    getMachinery(),
    getAllCertificates(),
    getSiteSettings(),
  ]);
  const whatsappHref = buildWhatsappLink(settings);

  return (
    <>
      <section className="bg-cream-50 py-8 sm:py-10">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10">
          <Breadcrumbs items={[{ href: "/", label: tCommon("breadcrumbHome") }, { href: "/factory", label: t("title") }]} />
          <div className="mt-5 grid gap-6 xl:grid-cols-[1fr_360px]">
            <div className="space-y-8">
              <div className="grid items-center gap-7 lg:grid-cols-[1.05fr_.95fr]">
                <div className="relative min-h-[300px] overflow-hidden rounded-[26px] border border-line-200 bg-white shadow-[0_18px_55px_rgba(10,50,32,.1)] sm:min-h-[390px]">
                  <Image src="/images/redesign/factory-hero.webp" alt="نمای کارخانه زرین پسته باقری" fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
                </div>
                <div>
                  <h1 className="text-3xl font-black leading-[1.55] text-forest-900 sm:text-4xl">محیط کارخانه و فرآیند تولید</h1>
                  <div className="mt-4 h-0.5 w-24 bg-gold-600" />
                  <p className="mt-5 text-sm leading-8 text-ink-700 sm:text-base">ما از باغ تا بسته‌بندی، با بهره‌گیری از فناوری‌های روز و استانداردهای کنترل کیفیت، ایمنی و یکنواختی محصول را در مراحل دریافت، فرآوری، درجه‌بندی و بسته‌بندی دنبال می‌کنیم.</p>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {qualities.map(([title, body]) => <div key={title} className="rounded-2xl border border-line-200 bg-white p-4 shadow-sm"><span className="text-xl text-gold-700">✦</span><b className="mt-2 block text-xs text-forest-900">{title}</b><p className="mt-1 text-[10px] leading-5 text-ink-500">{body}</p></div>)}
                  </div>
                </div>
              </div>

              <section>
                <SectionTitle>محیط کارخانه</SectionTitle>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                  {factoryImages.map((item) => <figure key={item.slug} className="overflow-hidden rounded-2xl border border-line-200 bg-white shadow-sm"><div className="relative aspect-[1.35/1] bg-cream-100">{item.image ? <Image src={item.image} alt={item.caption} fill sizes="220px" className="object-cover" /> : null}</div><figcaption className="p-3 text-center text-xs font-bold leading-6 text-forest-900">{item.caption}</figcaption></figure>)}
                </div>
              </section>

              <section id="machines" className="scroll-mt-40">
                <div className="flex flex-wrap items-center justify-between gap-4"><SectionTitle>دستگاه‌ها</SectionTitle><a href={`/${locale}/machinery`} className="rounded-full border border-forest-900 px-4 py-2 text-xs font-bold text-forest-900 hover:bg-forest-900 hover:text-white">مشاهده همه دستگاه‌ها ←</a></div>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                  {machinery.map((item) => <figure key={item.slug} className="overflow-hidden rounded-2xl border border-line-200 bg-white shadow-sm"><div className="relative aspect-[1.45/1] bg-cream-100">{item.image ? <Image src={item.image} alt={item.title} fill sizes="210px" className="object-cover" /> : null}</div><figcaption className="p-3 text-center text-xs font-bold leading-6 text-forest-900">{item.title}</figcaption></figure>)}
                </div>
              </section>
            </div>

            <aside className="rounded-3xl border border-line-200 bg-white p-5 shadow-sm xl:sticky xl:top-36 xl:self-start">
              <SectionTitle>گواهی‌ها و مجوزها</SectionTitle>
              <p className="mt-4 text-xs leading-6 text-ink-600">نشان‌های زیر برای نمایش ساختار طراحی در نظر گرفته شده‌اند. نسخه اسناد واقعی پس از تأیید و بارگذاری رسمی در سایت منتشر می‌شود.</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-3">
                {certificates.map((certificate) => <div key={certificate.slug} className="rounded-2xl border border-line-200 bg-white p-3 text-center shadow-sm"><div className="relative mx-auto h-12 w-20">{certificate.image ? <Image src={certificate.image} alt={certificate.title} fill sizes="80px" className="object-contain" /> : null}</div><b className="mt-2 block text-[10px] leading-5 text-forest-900">{certificate.title}</b><span className="mt-1 block text-[9px] leading-4 text-ink-500">{certificate.description}</span></div>)}
              </div>
              <div className="mt-5"><DownloadCatalogButton href={settings.catalogUrl} label="دانلود مستندات" pendingLabel="مستندات در حال تکمیل است" variant="primary" className="w-full" /></div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-line-200 bg-white py-10">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10">
          <SectionTitle>چرا زرین پسته باقری؟</SectionTitle>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[['۳۰+','تجربه و اعتبار','بیش از ۳۰ سال'],['♙','پشتیبانی تخصصی','و مشاوره'],['▣','بسته‌بندی استاندارد','و صادراتی'],['↗','تحویل به‌موقع','برای بازارهای هدف'],['✓','کیفیت پایدار','و یکنواخت']].map(([icon,title,body]) => <div key={title} className="rounded-2xl border border-line-200 bg-white p-5 text-center shadow-sm"><span className="text-xl font-black text-gold-700">{icon}</span><b className="mt-2 block text-sm text-forest-900">{title}</b><p className="mt-1 text-xs text-ink-500">{body}</p></div>)}
          </div>
          <div className="mt-7 flex flex-col items-center justify-between gap-5 rounded-3xl bg-forest-900 p-7 text-center text-cream-50 sm:flex-row sm:text-right"><div><b className="text-lg">برای بازدید، همکاری یا استعلام سفارش با واحد فروش در تماس باشید</b><p className="mt-1 text-xs text-cream-100/65">پاسخ‌گویی به سفارش‌های عمده داخلی و صادراتی</p></div><PriceInquiryButton href={whatsappHref} label="استعلام قیمت" pendingNotice="شماره تماس در حال تکمیل است" variant="primary" className="shrink-0" /></div>
        </div>
      </section>
    </>
  );
}
