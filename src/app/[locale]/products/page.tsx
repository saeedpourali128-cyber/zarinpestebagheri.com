import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/data/products";
import type { ProductCategory } from "@/lib/types/product";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  const t = await getTranslations("products");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/products" },
  };
}

const categoryOrder: ProductCategory[] = ["raw", "kernel", "khalal", "powder"];

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("products");
  const tCommon = await getTranslations("common");

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { href: "/", label: tCommon("breadcrumbHome") },
          { href: "/products", label: t("title") },
        ]}
      />

      <h1 className="mt-4 text-3xl font-bold text-forest-900">{t("title")}</h1>
      <p className="mt-3 max-w-2xl text-ink-700">{t("description")}</p>

      {categoryOrder.map((category) => {
        const items = products.filter((product) => product.category === category);
        if (!items.length) return null;

        return (
          <section key={category} className="mt-12">
            <h2 className="border-b border-line-200 pb-3 text-lg font-semibold text-forest-900">
              {t(`categories.${category}`)}
            </h2>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  viewLabel={t("viewProduct")}
                />
              ))}
            </ul>
          </section>
        );
      })}
    </Container>
  );
}
