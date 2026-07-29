import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { DownloadCatalogButton } from "@/components/cta/DownloadCatalogButton";
import { PriceInquiryButton } from "@/components/cta/PriceInquiryButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getFeaturedProducts } from "@/lib/data/products";
import { getFactoryImages } from "@/lib/data/factory";
import { getAllCertificates } from "@/lib/data/certificates";
import { getFeaturedArticles } from "@/lib/data/articles";
import { getSiteSettings, buildWhatsappLink } from "@/lib/data/site-settings";
import { siteConfig } from "@/lib/config/site";
import { HomeHeroSlider } from "@/components/redesign/HomeHeroSlider";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: siteConfig.legalName,
  description: "تأمین، بسته‌بندی و صادرات پسته و مغز پسته از کاشمر، خراسان رضوی.",
  alternates: { canonical: "/" },
};

const features = [
  ["۳۰+", "بیش از ۳۰ سال", "سابقه و تجربه"],
  ["✦", "تأمین مستقیم", "از کشاورزان خراسان"],
  ["۲۰۰۰", "ظرفیت بیش از", "تن در سال"],
  ["▣", "بسته‌بندی استاندارد", "و صادراتی"],
  ["۲۵+", "صادرات به بیش از", "کشور جهان"],
];

const sideLinks: Array<[string, string, string]> = [
  ["/about", "چرا زرین پسته باقری", "مزیت‌های رقابتی ما"],
  ["/products", "محصولات", "مشاهده همه محصولات"],
  ["/certificates", "گواهی‌ها و مجوزها", "مشاهده همه"],
  ["/knowledge-base", "دانشنامه پسته", "مشاهده همه مقالات"],
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [featuredProducts, featuredArticles, factoryImages, certificates, settings] = await Promise.all([
    getFeaturedProducts(),
    getFeaturedArticles(),
    getFactoryImages(),
    getAllCertificates(),
    getSiteSettings(),
  ]);
  const products = featuredProducts.slice(0, 5);
  const articles = featuredArticles.slice(0, 3);
  const whatsappHref = buildWhatsappLink(settings);

  return (
    <>
      <section className="relative isolate min-h-[680px] overflow-hidden border-b border-line-200 bg-forest-950 sm:min-h-[640px] lg:min-h-[660px]">
        <HomeHeroSlider />

        <div className="relative z-10 mx-auto flex min-h-[680px] w-full max-w-[1440px] items-center px-5 py-16 sm:min-h-[640px] sm:px-7 lg:min-h-[660px] lg:px-10">
          <div className="w-full max-w-[680px] py-6 text-right text-white [text-shadow:0_2px_18px_rgba(0,0,0,.28)] [&_[role=status]]:text-white/75 sm:py-8 lg:mr-auto lg:py-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/55 bg-forest-950/45 px-4 py-2 text-xs font-bold text-gold-500 shadow-sm backdrop-blur-sm">
              از باغ تا بازار جهانی
            </span>

            <h1 className="mt-5 text-3xl font-black leading-[1.55] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,.35)] sm:text-4xl xl:text-[46px]">
              تأمین تخصصی پسته و مغز پسته
              <span className="block text-gold-500">از کشاورزان خراسان تا بازارهای جهانی</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,.45)] sm:text-base">
              با بیش از سه دهه تجربه در صنعت پسته، زرین دانه ترشیز از قلب کشاورزی ایران در خراسان رضوی، سالانه بیش از ۲۰۰۰ تن پسته و مغز پسته را با استانداردهای جهانی تأمین، بسته‌بندی و برای بازارهای داخلی و صادراتی آماده می‌کند.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <PriceInquiryButton
                href={whatsappHref}
                label="استعلام قیمت"
                pendingNotice="اطلاعات تماس در حال تکمیل است"
                variant="primary"
                className="border-gold-500 bg-gold-500 text-forest-950 shadow-[0_10px_28px_rgba(0,0,0,.20)] hover:border-gold-600 hover:bg-gold-600"
              />
              <DownloadCatalogButton
                href={settings.catalogUrl}
                label="دانلود کاتالوگ"
                pendingLabel="کاتالوگ در حال تکمیل است"
                variant="secondary"
                className="border-white/70 bg-forest-950/25 text-white shadow-[0_10px_28px_rgba(0,0,0,.16)] backdrop-blur-sm hover:border-gold-500 hover:bg-white/10 hover:text-gold-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto grid w-full max-w-[1440px] gap-6 px-5 sm:px-7 lg:grid-cols-[1fr_300px] lg:px-10">
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
              {features.map(([icon, title, subtitle]) => (
                <div key={title} className="rounded-2xl border border-line-200 bg-white px-4 py-5 text-center shadow-[0_8px_28px_rgba(10,50,32,.06)]">
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-cream-100 text-sm font-black text-gold-700">{icon}</span>
                  <b className="mt-3 block text-sm text-forest-900">{title}</b>
                  <span className="mt-1 block text-xs text-ink-500">{subtitle}</span>
                </div>
              ))}
            </div>

            <div>
              <SectionTitle>محصولات منتخب</SectionTitle>
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
                {products.map((product) => (
                  <Link key={product.slug} href={`/products/${product.slug}`} className="group overflow-hidden rounded-2xl border border-line-200 bg-white p-3 shadow-[0_8px_28px_rgba(10,50,32,.06)] transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative aspect-[2/1] overflow-hidden rounded-xl bg-cream-100">
                      {product.mainImage ? (
                        <Image src={product.mainImage} alt={product.title} fill sizes="220px" className="object-cover transition duration-500 group-hover:scale-105" />
                      ) : null}
                    </div>
                    <h3 className="mt-3 text-center text-sm font-extrabold text-forest-900">{product.title}</h3>
                  </Link>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-line-200 bg-white shadow-sm">
              <div className="grid min-h-44 grid-cols-2 sm:grid-cols-3 lg:grid-cols-[240px_repeat(4,1fr)]">
                <Link href="/factory" className="flex flex-col items-start justify-center bg-forest-900 p-6 text-cream-50">
                  <span className="text-xs text-gold-500">نگاهی به</span>
                  <h3 className="mt-2 text-xl font-black">محیط کارخانه</h3>
                  <span className="mt-5 rounded-full border border-gold-500/50 px-4 py-2 text-xs text-gold-500">مشاهده بیشتر ←</span>
                </Link>
                {factoryImages.slice(0, 4).map((item) => (
                  <div key={item.slug} className="relative min-h-40 border-s border-white/20 bg-forest-900">
                    {item.image ? (
                      <Image src={item.image} alt={item.caption} fill sizes="260px" className="object-cover" />
                    ) : null}
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/85 to-transparent px-3 pb-3 pt-10 text-xs font-bold text-white">{item.caption}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {certificates.slice(0, 6).map((certificate) => (
                <div key={certificate.slug} className="rounded-2xl border border-line-200 bg-white p-3 text-center shadow-sm">
                  <div className="relative mx-auto h-12 w-20">{certificate.image ? <Image src={certificate.image} alt={certificate.title} fill sizes="80px" className="object-contain" /> : null}</div>
                  <b className="mt-2 block text-xs text-forest-900">{certificate.title}</b>
                  <span className="mt-1 block text-[10px] leading-5 text-ink-500">{certificate.description}</span>
                </div>
              ))}
            </div>

            <div>
              <SectionTitle>دانشنامه پسته</SectionTitle>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {articles.map((article) => (
                  <Link key={article.slug} href={`/knowledge-base/${article.slug}`} className="group overflow-hidden rounded-2xl border border-line-200 bg-white shadow-sm">
                    <div className="relative aspect-[16/8] bg-cream-100">{article.coverImage ? <Image src={article.coverImage} alt={article.title} fill sizes="420px" className="object-cover transition duration-500 group-hover:scale-105" /> : null}</div>
                    <h3 className="p-4 text-sm font-extrabold leading-7 text-forest-900">{article.title}</h3>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-5 rounded-3xl bg-forest-900 px-7 py-7 text-center text-cream-50 sm:flex-row sm:text-right">
              <div><b className="text-lg">برای دریافت اطلاعات بیشتر و استعلام قیمت با ما در ارتباط باشید</b><p className="mt-1 text-xs text-cream-100/65">واحد فروش آماده پاسخ‌گویی به سفارش‌های عمده و صادراتی است.</p></div>
              <PriceInquiryButton href={whatsappHref} label="استعلام قیمت از طریق واتساپ" pendingNotice="شماره واتساپ در حال تکمیل است" variant="primary" className="shrink-0" />
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-36 lg:self-start">
            {sideLinks.map(([href, title, subtitle]) => (
              <Link key={href} href={href} className="flex items-center justify-between rounded-2xl border border-line-200 bg-white p-5 shadow-[0_8px_26px_rgba(10,50,32,.06)] transition hover:border-gold-500/50 hover:shadow-md">
                <div><h3 className="text-sm font-extrabold text-forest-900">{title}</h3><p className="mt-1 text-xs text-ink-500">{subtitle}</p></div>
                <span className="text-xl text-gold-700">‹</span>
              </Link>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}
