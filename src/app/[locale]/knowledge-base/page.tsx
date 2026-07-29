import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Link } from "@/lib/i18n/navigation";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { getAllArticles } from "@/lib/data/articles";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("knowledgeBasePage");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/knowledge-base" },
  };
}

export default async function KnowledgeBasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("knowledgeBasePage");
  const tCommon = await getTranslations("common");
  const articles = await getAllArticles();

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { href: "/", label: tCommon("breadcrumbHome") },
          { href: "/knowledge-base", label: t("title") },
        ]}
      />

      <h1 className="mt-4 text-3xl font-bold text-forest-900">{t("title")}</h1>
      <p className="mt-4 max-w-2xl text-ink-700">{t("description")}</p>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <li
            key={article.slug}
            className="overflow-hidden rounded-lg border border-line-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <Link href={`/knowledge-base/${article.slug}`} className="block">
              <PlaceholderImage
                src={article.coverImage}
                alt={article.title}
                label={article.title}
                aspect="aspect-[16/10]"
              />
              <div className="p-5">
                <h2 className="text-base font-semibold text-forest-900">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  {article.shortDescription}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
