import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/lib/i18n/routing";
import { siteConfig } from "@/lib/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/lib/seo/jsonld";
import "@fontsource-variable/estedad/wght.css";
import "@/app/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const tCommon = await getTranslations({
    locale,
    namespace: "common",
  });

  const tHome = await getTranslations({
    locale,
    namespace: "homeRedesign",
  });

  const openGraphLocales: Record<string, string> = {
    fa: "fa_IR",
    en: "en_US",
    ar: "ar_SA",
    ru: "ru_RU",
  };

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${tCommon("siteName")} | ${tCommon("legalName")}`,
      template: `%s | ${tCommon("siteName")}`,
    },
    description: tHome("heroBody"),
    openGraph: {
      type: "website",
      siteName: tCommon("siteName"),
      locale: openGraphLocales[locale] ?? "fa_IR",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#15291f",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "fa" || locale === "ar" ? "rtl" : "ltr"}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={organizationJsonLd()} />
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
