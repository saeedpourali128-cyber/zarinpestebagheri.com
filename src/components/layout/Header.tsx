import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/layout/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { TopLangBar } from "@/components/layout/TopLangBar";
import { NavLink } from "@/components/layout/NavLink";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { PriceInquiryButton } from "@/components/cta/PriceInquiryButton";
import { DownloadCatalogButton } from "@/components/cta/DownloadCatalogButton";
import { getSiteSettings, buildWhatsappLink } from "@/lib/data/site-settings";

export async function Header() {
  const t = await getTranslations("nav");
  const tCommon = await getTranslations("common");
  const tLang = await getTranslations("languageSwitcher");
  const settings = await getSiteSettings();
  const whatsappHref = buildWhatsappLink(settings);

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/factory", label: t("factory") },
    { href: "/machinery", label: t("machinery") },
    { href: "/products", label: t("products") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 bg-forest-950 text-cream-50 shadow-[0_10px_35px_rgba(7,31,20,.12)]">
      <TopLangBar comingSoonLabel={tLang("comingSoon")} />
      <div className="border-t border-gold-500/10 bg-forest-950">
        <a href="#main-content" className="skip-link">
          {tCommon("skipToContent")}
        </a>
        <div className="mx-auto flex min-h-[84px] w-full max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-7 lg:px-10">
          <Logo />

          <nav aria-label={t("home")} className="hidden items-center gap-5 xl:flex">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <DownloadCatalogButton
              href={settings.catalogUrl}
              label={tCommon("downloadCatalog")}
              pendingLabel={tCommon("pending")}
              variant="secondary"
              className="border-gold-500/55 px-4 py-2 text-xs text-gold-500 hover:bg-gold-500 hover:text-forest-950"
            />
            <PriceInquiryButton
              href={whatsappHref}
              label={t("priceInquiry")}
              pendingNotice={tCommon("pending")}
              variant="primary"
              className="border-gold-500 bg-gold-500 px-4 py-2 text-xs text-forest-950 hover:bg-gold-600"
            />
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <LanguageSwitcher label={tLang("label")} comingSoonLabel={tLang("comingSoon")} />
            <MobileMenu
              items={navItems}
              openLabel={t("openMenu")}
              closeLabel={t("closeMenu")}
              ctaSlot={
                <div className="flex flex-col gap-2.5">
                  <DownloadCatalogButton
                    href={settings.catalogUrl}
                    label={tCommon("downloadCatalog")}
                    pendingLabel={tCommon("pending")}
                    variant="secondary"
                    className="w-full"
                  />
                  <PriceInquiryButton
                    href={whatsappHref}
                    label={t("priceInquiry")}
                    pendingNotice={tCommon("pending")}
                    variant="primary"
                    className="w-full"
                  />
                </div>
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
}
