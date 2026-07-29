import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { machinery } from "@/lib/data/machinery";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("machineryPage");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/machinery" },
  };
}

export default async function MachineryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("machineryPage");
  const tCommon = await getTranslations("common");

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { href: "/", label: tCommon("breadcrumbHome") },
          { href: "/machinery", label: t("title") },
        ]}
      />

      <h1 className="mt-4 text-3xl font-bold text-forest-900">{t("title")}</h1>
      <p className="mt-4 max-w-2xl text-ink-700">{t("description")}</p>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {machinery.map((item) => (
          <li
            key={item.slug}
            className="overflow-hidden rounded-lg border border-line-200 bg-white shadow-sm"
          >
            <PlaceholderImage src={item.image} alt={item.title} label={item.title} />
            <div className="p-5">
              <h2 className="text-base font-semibold text-forest-900">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">
                {item.description}
              </p>
              <p className="mt-3 text-xs text-ink-500">
                {t("capacityLabel")}:{" "}
                {item.capacityLabel ?? t("capacityPending")}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
