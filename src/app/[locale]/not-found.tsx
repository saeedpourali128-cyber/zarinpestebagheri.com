import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Container } from "@/components/ui/Container";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="text-2xl font-semibold text-forest-900">{t("title")}</h1>
      <p className="mt-3 max-w-md text-ink-700">{t("description")}</p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-11 items-center justify-center border border-forest-900 px-6 py-3 text-sm font-medium text-forest-900 hover:bg-forest-900 hover:text-cream-50"
      >
        {t("backHome")}
      </Link>
    </Container>
  );
}
