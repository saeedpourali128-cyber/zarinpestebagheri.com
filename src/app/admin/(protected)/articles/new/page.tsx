import { ArticleForm } from "../ArticleForm";
import { createArticle } from "../actions";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-xl font-black text-forest-900">مقاله جدید</h1>
      <div className="mt-6 max-w-3xl rounded-2xl border border-line-200 bg-white p-6">
        <ArticleForm action={createArticle} />
      </div>
    </div>
  );
}
