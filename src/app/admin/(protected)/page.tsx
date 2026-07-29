import Link from "next/link";
import { getAllProducts } from "@/lib/data/products";
import { getAllArticles } from "@/lib/data/articles";
import { getAllCertificates } from "@/lib/data/certificates";
import { getFactoryImages } from "@/lib/data/factory";
import { getMachinery } from "@/lib/data/machinery";

export default async function AdminDashboardPage() {
  const [products, articles, certificates, factoryImages, machinery] = await Promise.all([
    getAllProducts(),
    getAllArticles(),
    getAllCertificates(),
    getFactoryImages(),
    getMachinery(),
  ]);

  const cards = [
    { href: "/admin/products", label: "محصولات", count: products.length },
    { href: "/admin/articles", label: "مقالات دانشنامه", count: articles.length },
    { href: "/admin/certificates", label: "گواهی‌ها", count: certificates.length },
    { href: "/admin/factory", label: "تصاویر کارخانه", count: factoryImages.length },
    { href: "/admin/machinery", label: "دستگاه‌ها", count: machinery.length },
  ];

  return (
    <div>
      <h1 className="text-xl font-black text-forest-900">داشبورد</h1>
      <p className="mt-1 text-sm text-ink-500">مدیریت محتوای سایت زرین پسته باقری</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-line-200 bg-white p-5 text-center shadow-sm transition hover:border-gold-500/50 hover:shadow-md"
          >
            <b className="block text-2xl font-black text-forest-900">{card.count}</b>
            <span className="mt-1 block text-xs text-ink-500">{card.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
