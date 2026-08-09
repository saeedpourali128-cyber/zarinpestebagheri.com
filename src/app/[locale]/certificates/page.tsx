import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Badge } from "@/components/ui/Badge";
import { getAllCertificates } from "@/lib/data/certificates";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("certificatesPage");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/certificates" },
  };
}

export default async function CertificatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("certificatesPage");
  const tCommon = await getTranslations("common");
  const certificates = await getAllCertificates(locale as "fa" | "en" | "ar" | "ru");

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { href: "/", label: tCommon("breadcrumbHome") },
          { href: "/certificates", label: t("title") },
        ]}
      />

      <h1 className="mt-4 text-3xl font-bold text-forest-900">{t("title")}</h1>
      <p className="mt-4 max-w-2xl text-ink-700">{t("description")}</p>
      <p className="mt-2 max-w-2xl text-sm text-gold-700">
        {t("placeholderNotice")}
      </p>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <li
            key={certificate.slug}
            className="rounded-lg border border-line-200 bg-white p-5 shadow-sm"
          >
            <PlaceholderImage
              src={certificate.image}
              alt={certificate.title}
              label={certificate.title}
              aspect="aspect-[3/4]"
              className="rounded-md"
            />
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-forest-900">
                  {certificate.title}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">
                  {certificate.description}
                </p>
              </div>
            </div>
            {certificate.isPlaceholder ? (
              <div className="mt-3">
                <Badge>{tCommon("sampleUntilRealDocument")}</Badge>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </Container>
  );
}
