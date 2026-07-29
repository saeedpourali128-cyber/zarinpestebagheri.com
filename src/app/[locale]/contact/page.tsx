import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PriceInquiryButton } from "@/components/cta/PriceInquiryButton";
import { siteConfig } from "@/lib/config/site";
import { getSiteSettings, buildWhatsappLink } from "@/lib/data/site-settings";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contactPage");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contactPage");
  const tCommon = await getTranslations("common");
  const tFooter = await getTranslations("footer");
  const settings = await getSiteSettings();

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { href: "/", label: tCommon("breadcrumbHome") },
          { href: "/contact", label: t("title") },
        ]}
      />

      <h1 className="mt-4 text-3xl font-bold text-forest-900">{t("title")}</h1>
      <p className="mt-4 max-w-2xl text-ink-700">{t("description")}</p>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        <section>
          <h2 className="text-lg font-semibold text-forest-900">
            {t("salesUnitHeading")}
          </h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-ink-500">{tFooter("addressLabel")}</dt>
              <dd className="mt-1 text-ink-900">{settings.address ?? tCommon("pending")}</dd>
            </div>
            <div>
              <dt className="text-ink-500">{tFooter("phoneLabel")}</dt>
              <dd className="mt-1 text-ink-900">
                {settings.phone ?? tCommon("pending")}
              </dd>
            </div>
            <div>
              <dt className="text-ink-500">{tFooter("emailLabel")}</dt>
              <dd className="mt-1 text-ink-900">
                {settings.email ?? tCommon("pending")}
              </dd>
            </div>
            <div>
              <dt className="text-ink-500">{t("whatsappHeading")}</dt>
              <dd className="mt-1 text-ink-900">
                {settings.whatsappEnabled && settings.whatsappNumber ? settings.whatsappNumber : t("whatsappPending")}
              </dd>
            </div>
          </dl>

          <div className="mt-8">
            <PriceInquiryButton
              href={buildWhatsappLink(settings)}
              label={tCommon("priceInquiry")}
              pendingNotice={tCommon("pending")}
              variant="primary"
            />
          </div>
        </section>

        <section className="border border-line-200 bg-cream-100/60 p-6">
          <h2 className="text-lg font-semibold text-forest-900">
            {t("addressHeading")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-700">
            {siteConfig.locationLabel}
          </p>
          <p className="mt-6 text-xs leading-relaxed text-ink-500">
            {t("formNotice")}
          </p>
        </section>
      </div>
    </Container>
  );
}
