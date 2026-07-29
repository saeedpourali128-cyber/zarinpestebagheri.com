import { notFound } from "next/navigation";
import { ArticleForm } from "../../ArticleForm";
import { updateArticle } from "../../actions";
import { getArticleForEdit } from "../../data";

export default async function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleForEdit(slug);
  if (!article) notFound();

  const updateWithSlug = updateArticle.bind(null, slug);

  return (
    <div>
      <h1 className="text-xl font-black text-forest-900">ویرایش مقاله</h1>
      <div className="mt-6 max-w-3xl rounded-2xl border border-line-200 bg-white p-6">
        <ArticleForm action={updateWithSlug} article={article} />
      </div>
    </div>
  );
}
