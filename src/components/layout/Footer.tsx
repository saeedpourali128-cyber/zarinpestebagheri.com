import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { siteConfig } from "@/lib/config/site";
import { getAllProducts } from "@/lib/data/products";
import { getSiteSettings, buildWhatsappLink } from "@/lib/data/site-settings";
import { PriceInquiryButton } from "@/components/cta/PriceInquiryButton";

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");
  const year = new Date().getFullYear();
  const [products, settings] = await Promise.all([getAllProducts(), getSiteSettings()]);

  return (
    <footer className="relative overflow-hidden border-t border-gold-500/20 bg-forest-950 text-cream-100">
      <div className="pointer-events-none absolute inset-0 opacity-[.055]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#dab465 1px,transparent 0)", backgroundSize: "28px 28px" }} />
      <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-14 sm:px-7 md:grid-cols-2 lg:grid-cols-[1.1fr_.8fr_.9fr_1.25fr] lg:px-10 lg:py-16">
        <div className="relative min-h-56">
          <Image src="/images/redesign/footer-pistachio.webp" alt="پسته زرین دانه ترشیز" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-contain object-bottom" />
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-gold-500">{t("productsTitle")}</h3>
          <ul className="mt-5 space-y-3 text-sm text-cream-100/72">
            {products.slice(0, 5).map((product) => (
              <li key={product.slug}><Link href={`/products/${product.slug}`} className="transition-colors hover:text-gold-500">‹ {product.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-gold-500">{t("quickLinks")}</h3>
          <ul className="mt-5 space-y-3 text-sm text-cream-100/72">
            <li><Link href="/" className="hover:text-gold-500">‹ {tNav("home")}</Link></li>
            <li><Link href="/about" className="hover:text-gold-500">‹ {tNav("about")}</Link></li>
            <li><Link href="/factory" className="hover:text-gold-500">‹ {tNav("factory")}</Link></li>
            <li><Link href="/machinery" className="hover:text-gold-500">‹ {tNav("machinery")}</Link></li>
            <li><Link href="/knowledge-base" className="hover:text-gold-500">‹ دانشنامه پسته</Link></li>
            <li><Link href="/contact" className="hover:text-gold-500">‹ {tNav("contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-extrabold text-gold-500">{siteConfig.name}</h2>
          <p className="mt-2 text-xs text-cream-100/55">{siteConfig.legalName}</p>
          <p className="mt-5 max-w-md text-sm leading-7 text-cream-100/72">{t("about")}</p>
          <div className="mt-5 space-y-2 text-sm text-cream-100/76">
            <p>نشانی: {settings.address ?? tCommon("pending")}</p>
            <p>تلفن: {settings.phone ?? tCommon("pending")}</p>
            <p>ایمیل: {settings.email ?? tCommon("pending")}</p>
          </div>
          <div className="mt-6">
            <PriceInquiryButton
              href={buildWhatsappLink(settings)}
              label={tCommon("priceInquiry")}
              pendingNotice={tCommon("pending")}
              variant="primary"
              className="inline-flex"
            />
          </div>
        </div>
      </div>
      <div className="relative border-t border-gold-500/15 px-5 py-4 text-center text-xs text-cream-100/45">
        © {year} {t("rightsReserved")}
      </div>
    </footer>
  );
}
