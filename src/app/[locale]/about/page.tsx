import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tCommon = await getTranslations("common");
  const values = t.raw("values") as { title: string; description: string }[];

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { href: "/", label: tCommon("breadcrumbHome") },
          { href: "/about", label: t("title") },
        ]}
      />

      <h1 className="mt-4 text-3xl font-bold text-forest-900">{t("title")}</h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-ink-700">{t("intro")}</p>

      <PlaceholderImage
        src="/images/redesign/home-hero.webp"
        alt={t("title")}
        aspect="aspect-[21/9]"
        className="mt-8 rounded-lg"
      />

      <div className="mt-12 grid gap-10 border-t border-line-200 pt-10 sm:grid-cols-2">
        <div>
          <h2 className="text-base font-semibold text-forest-900">
            {t("activityHeading")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-700">
            {t("activityBody")}
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-forest-900">
            {t("locationHeading")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-700">
            {t("locationBody")}
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-forest-900">
            {t("capacityHeading")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-700">
            {t("capacityBody")}
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-forest-900">
            {t("audienceHeading")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-700">
            {t("audienceBody")}
          </p>
        </div>
      </div>

      <section className="mt-14 border-t border-line-200 pt-10">
        <h2 className="text-lg font-semibold text-forest-900">
          {t("valuesHeading")}
        </h2>
        <ul className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-3">
          {values.map((value, index) => (
            <li key={value.title} className="border-t border-forest-900/70 pt-4">
              <span className="text-xs text-gold-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-sm font-semibold text-forest-900">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">
                {value.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
