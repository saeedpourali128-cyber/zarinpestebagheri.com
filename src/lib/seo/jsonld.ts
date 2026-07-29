import { siteConfig } from "@/lib/config/site";

export interface BreadcrumbEntry {
  label: string;
  href: string;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    areaServed: siteConfig.locationLabel,
  };
}

export function breadcrumbJsonLd(items: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}

export function productJsonLd({
  name,
  description,
  url,
  image,
}: {
  name: string;
  description: string;
  url: string;
  image?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url,
    ...(image ? { image } : {}),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
  };
}

export function articleJsonLd({
  headline,
  description,
  url,
  image,
}: {
  headline: string;
  description: string;
  url: string;
  image?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    ...(image ? { image } : {}),
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
    },
  };
}
