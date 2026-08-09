import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { ProductCard } from "@/components/product/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd } from "@/lib/seo/jsonld";
import { getArticleBySlug } from "@/lib/data/articles";
import { getProductBySlug } from "@/lib/data/products";
import { siteConfig } from "@/lib/config/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug, locale as "fa" | "en" | "ar" | "ru");
  if (!article) return {};

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: { canonical: `/knowledge-base/${article.slug}` },
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      url: `/knowledge-base/${article.slug}`,
      type: "article",
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = await getArticleBySlug(slug, locale as "fa" | "en" | "ar" | "ru");
  if (!article) notFound();

  const t = await getTranslations("knowledgeBasePage");
  const tProducts = await getTranslations("products");
  const tCommon = await getTranslations("common");

  const relatedProductResults = await Promise.all(
    article.relatedProductSlugs.map((productSlug) => getProductBySlug(productSlug))
  );
  const relatedProducts = relatedProductResults.filter(
    (product): product is NonNullable<typeof product> => Boolean(product)
  );

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { href: "/", label: tCommon("breadcrumbHome") },
          { href: "/knowledge-base", label: t("title") },
          { href: `/knowledge-base/${article.slug}`, label: article.title },
        ]}
      />

      <article className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-bold text-forest-900">{article.title}</h1>
        <p className="mt-3 text-base text-ink-700">{article.shortDescription}</p>

        <PlaceholderImage
          src={article.coverImage}
          alt={article.title}
          label={article.title}
          aspect="aspect-[16/9]"
          className="mt-8 rounded-lg"
        />

        <div className="mt-8 space-y-5">
          {article.content.map((paragraph, index) => (
            <p key={index} className="text-base leading-8 text-ink-700">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {relatedProducts.length ? (
        <section className="mt-16 max-w-3xl border-t border-line-200 pt-10">
          <h2 className="text-lg font-semibold text-forest-900">
            {tCommon("relatedProducts")}
          </h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                viewLabel={tProducts("viewProduct")}
              />
            ))}
          </ul>
        </section>
      ) : null}

      <JsonLd
        data={articleJsonLd({
          headline: article.title,
          description: article.seoDescription,
          url: `${siteConfig.url}/${locale}/knowledge-base/${article.slug}`,
          image: article.coverImage,
        })}
      />
    </Container>
  );
}
