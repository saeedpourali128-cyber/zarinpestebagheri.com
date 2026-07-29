import Link from "next/link";
import { getAllArticles } from "@/lib/data/articles";
import { deleteArticle } from "./actions";
import { DeleteButton } from "@/app/admin/_components/DeleteButton";

export default async function AdminArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-forest-900">دانشنامه</h1>
        <Link href="/admin/articles/new" className="rounded-lg bg-forest-900 px-4 py-2 text-xs font-bold text-cream-50 hover:bg-forest-800">
          + مقاله جدید
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line-200 bg-white">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-line-200 text-right text-xs text-ink-500">
              <th className="p-3">عنوان</th>
              <th className="p-3">نامک</th>
              <th className="p-3">منتخب</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.slug} className="border-b border-line-200 last:border-0">
                <td className="p-3 font-bold text-forest-900">{article.title}</td>
                <td className="p-3 text-ink-500" dir="ltr">
                  {article.slug}
                </td>
                <td className="p-3 text-ink-600">{article.featured ? "بله" : "—"}</td>
                <td className="p-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/articles/${article.slug}/edit`}
                      className="rounded-lg border border-line-300 px-3 py-1.5 text-xs font-bold text-forest-900 hover:bg-cream-100"
                    >
                      ویرایش
                    </Link>
                    <DeleteButton action={deleteArticle.bind(null, article.slug)} confirmLabel={`مقاله «${article.title}» حذف شود؟`} />
                  </div>
                </td>
              </tr>
            ))}
            {!articles.length ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-ink-500">
                  هنوز مقاله‌ای ثبت نشده است.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
