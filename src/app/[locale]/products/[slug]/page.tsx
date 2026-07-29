import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PriceInquiryButton } from "@/components/cta/PriceInquiryButton";
import { DownloadCatalogButton } from "@/components/cta/DownloadCatalogButton";
import { ProductGallery } from "@/components/redesign/ProductGallery";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { JsonLd } from "@/components/seo/JsonLd";
import { productJsonLd } from "@/lib/seo/jsonld";
import { getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import { getArticleBySlug } from "@/lib/data/articles";
import { getAllCertificates } from "@/lib/data/certificates";
import { getSiteSettings, buildWhatsappLink } from "@/lib/data/site-settings";
import { siteConfig } from "@/lib/config/site";
import type { ProductSpec } from "@/lib/types/product";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return { title: product.seoTitle, description: product.seoDescription, alternates: { canonical: `/products/${product.slug}` }, openGraph: { title: product.seoTitle, description: product.seoDescription, url: `/products/${product.slug}` } };
}

const specOrder: (keyof ProductSpec)[] = ["cultivar", "sizeOz", "opennessType", "kernelColor", "kernelPercentage", "packagingType", "minOrder", "storageConditions"];

export default async function ProductDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = await getProductBySlug(slug);
  if (!product || !product.mainImage) notFound();

  const t = await getTranslations("products");
  const tCommon = await getTranslations("common");
  const [related, relatedArticleResults, certificates, settings] = await Promise.all([
    getRelatedProducts(product),
    Promise.all(product.relatedArticleSlugs.map((articleSlug) => getArticleBySlug(articleSlug))),
    getAllCertificates(),
    getSiteSettings(),
  ]);
  const whatsappHref = buildWhatsappLink(settings, product.title);
  const relatedProducts = related.slice(0, 4);
  const relatedArticles = relatedArticleResults.filter(
    (article): article is NonNullable<typeof article> => Boolean(article)
  );
  const specs = specOrder.filter((key) => product.specs[key]).map((key) => ({ key, label: t(`specLabels.${key}`), value: product.specs[key] as string }));

  const chips = [
    ["حداقل سفارش", product.specs.minOrder ?? "قابل مذاکره", "⚖"],
    ["مناسب صادرات", "بله", "◎"],
    ["نوع بسته‌بندی", product.specs.packagingType ?? "سفارشی", "▣"],
    ["نوع خندانی", product.specs.opennessType ?? "بر اساس سفارش", "◡"],
    ["اندازه / انس", product.specs.sizeOz ?? "بر اساس سفارش", "↔"],
  ];

  return (
    <>
      <section className="border-b border-line-200 bg-cream-50 py-8 sm:py-10">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 lg:px-10">
          <Breadcrumbs items={[{ href: "/", label: tCommon("breadcrumbHome") }, { href: "/products", label: t("title") }, { href: `/products/${product.slug}`, label: product.title }]} />
          <div className="mt-5 grid gap-9 lg:grid-cols-[1.12fr_.88fr] lg:items-start">
            <ProductGallery title={product.title} mainImage={product.mainImage} gallery={product.gallery} />
            <div className="lg:pt-3">
              <span className="text-xs font-bold text-gold-700">{t(`categories.${product.category}`)}</span>
              <h1 className="mt-3 text-3xl font-black leading-tight text-forest-900 sm:text-4xl">{product.title} صادراتی</h1>
              <p className="mt-2 text-sm font-bold text-gold-700">درشت، خوش‌خندان، مغز سبز و یکدست</p>
              <p className="mt-5 text-sm leading-8 text-ink-700 sm:text-base">{product.description}</p>
              <div className="mt-7 grid grid-cols-2 gap-3 xl:grid-cols-5">
                {chips.map(([label, value, icon]) => (
                  <div key={label} className="rounded-2xl border border-line-200 bg-white p-3 text-center shadow-sm">
                    <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-cream-100 font-bold text-gold-700">{icon}</span>
                    <b className="mt-2 block text-[11px] text-forest-900">{label}</b>
                    <span className="mt-1 block text-[10px] leading-5 text-ink-500">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <PriceInquiryButton href={whatsappHref} label="استعلام قیمت و موجودی از طریق واتساپ" pendingNotice="شماره واتساپ در حال تکمیل است" variant="primary" className="flex-1" />
                <DownloadCatalogButton href={settings.catalogUrl} label="دانلود برگه مشخصات (PDF)" pendingLabel="برگه مشخصات در حال تکمیل است" variant="secondary" className="flex-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto w-full max-w-[1440px] space-y-7 px-5 sm:px-7 lg:px-10">
          <div className="grid gap-6 xl:grid-cols-[1.15fr_.85fr_1.1fr]">
            <section className="rounded-3xl border border-line-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionTitle>مشخصات فنی</SectionTitle>
              <div className="mt-5 grid gap-5 sm:grid-cols-[180px_1fr]">
                <div className="relative min-h-48 overflow-hidden rounded-2xl bg-cream-100"><Image src="/images/redesign/tech-pistachio.webp" alt="پسته ممتاز ایران" fill sizes="190px" className="object-cover" /></div>
                <dl className="divide-y divide-line-200">
                  {specs.map((spec) => <div key={spec.key} className="flex items-center justify-between gap-4 py-2.5 text-xs"><dt className="font-bold text-forest-800">{spec.label}</dt><dd className="text-left text-ink-600">{spec.value}</dd></div>)}
                  <div className="flex items-center justify-between gap-4 py-2.5 text-xs"><dt className="font-bold text-forest-800">مدت ماندگاری</dt><dd className="text-left text-ink-600">۱۲ ماه در شرایط مناسب</dd></div>
                </dl>
              </div>
            </section>

            <section className="rounded-3xl border border-line-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionTitle>کاربردها و مشتریان هدف</SectionTitle>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[...product.usages, ...product.targetMarkets].slice(0, 4).map((item, index) => <div key={item} className="rounded-2xl bg-cream-100 p-4 text-center"><span className="text-xl text-gold-700">{["◎", "♧", "▣", "◈"][index]}</span><p className="mt-2 text-xs font-bold leading-6 text-forest-900">{item}</p></div>)}
              </div>
              <h3 className="mt-6 text-center text-sm font-extrabold text-forest-900">مناسب برای بازارهای صادراتی</h3>
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-ink-600"><span className="rounded-full border px-3 py-1.5">چین</span><span className="rounded-full border px-3 py-1.5">امارات</span><span className="rounded-full border px-3 py-1.5">آلمان</span><span className="rounded-full border px-3 py-1.5">ترکیه</span><span className="rounded-full border px-3 py-1.5">عراق</span></div>
            </section>

            <section className="rounded-3xl border border-line-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionTitle>محصولات مرتبط</SectionTitle>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {relatedProducts.map((related) => (
                  <Link key={related.slug} href={`/products/${related.slug}`} className="group rounded-2xl border border-line-200 p-3 text-center transition hover:border-gold-500/50">
                    <div className="relative aspect-[1.45/1] overflow-hidden rounded-xl bg-cream-100">{related.mainImage ? <Image src={related.mainImage} alt={related.title} fill sizes="180px" className="object-cover transition group-hover:scale-105" /> : null}</div>
                    <b className="mt-2 block text-xs leading-6 text-forest-900">{related.title}</b>
                    <span className="mt-2 inline-block text-[10px] font-bold text-gold-700">مشاهده محصول ←</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_.6fr]">
            <section className="relative overflow-hidden rounded-3xl bg-forest-900 text-cream-50">
              <div className="grid min-h-48 items-center gap-5 p-6 sm:grid-cols-[260px_repeat(3,1fr)]">
                <div className="relative min-h-40"><Image src="/images/redesign/benefit-pistachio.webp" alt="پسته صادراتی ممتاز" fill sizes="280px" className="object-contain" /></div>
                {[['صادرات مطمئن','بسته‌بندی صادراتی و هماهنگی مدارک'],['کیفیت تضمینی','فرآوری استاندارد و کنترل چندمرحله‌ای'],['انتخاب دقیق','دانه‌های یکدست با خندانی بالا']].map(([title, body]) => <div key={title} className="border-gold-500/25 text-center sm:border-r sm:px-4"><span className="text-2xl text-gold-500">✦</span><b className="mt-2 block text-sm">{title}</b><p className="mt-2 text-xs leading-6 text-cream-100/65">{body}</p></div>)}
              </div>
            </section>
            <section className="rounded-3xl border border-line-200 bg-white p-6 shadow-sm">
              <SectionTitle>راهنمای خرید {product.title}</SectionTitle>
              <p className="mt-5 text-sm leading-8 text-ink-700">برای خرید عمده، اندازه دانه، درصد خندانی، نوع بسته‌بندی و بازار مقصد از مهم‌ترین معیارهای انتخاب هستند. واحد فروش بر اساس نیاز سفارش، مشخصات دقیق محموله را اعلام می‌کند.</p>
              {relatedArticles[0] ? <Link href={`/knowledge-base/${relatedArticles[0].slug}`} className="mt-5 inline-flex rounded-full border border-forest-900 px-5 py-2.5 text-xs font-bold text-forest-900 hover:bg-forest-900 hover:text-white">مطالعه مقاله کامل ←</Link> : null}
            </section>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-3xl border border-line-200 bg-white p-4 shadow-sm sm:grid-cols-3 lg:grid-cols-6">
            {certificates.slice(0, 6).map((certificate) => <div key={certificate.slug} className="text-center"><div className="relative mx-auto h-12 w-20">{certificate.image ? <Image src={certificate.image} alt={certificate.title} fill sizes="80px" className="object-contain" /> : null}</div><b className="mt-2 block text-[11px] text-forest-900">{certificate.title}</b><span className="mt-1 block text-[10px] text-ink-500">{certificate.description}</span></div>)}
          </div>
        </div>
      </section>

      <JsonLd data={productJsonLd({ name: product.title, description: product.seoDescription, url: `${siteConfig.url}/${locale}/products/${product.slug}`, image: product.mainImage })} />
    </>
  );
}
