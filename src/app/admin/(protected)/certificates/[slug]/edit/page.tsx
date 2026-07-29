import { notFound } from "next/navigation";
import { CertificateForm } from "../../CertificateForm";
import { updateCertificate } from "../../actions";
import { getCertificateForEdit } from "../../data";

export default async function EditCertificatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const certificate = await getCertificateForEdit(slug);
  if (!certificate) notFound();

  const updateWithSlug = updateCertificate.bind(null, slug);

  return (
    <div>
      <h1 className="text-xl font-black text-forest-900">ویرایش گواهی</h1>
      <div className="mt-6 max-w-xl rounded-2xl border border-line-200 bg-white p-6">
        <CertificateForm action={updateWithSlug} certificate={certificate} />
      </div>
    </div>
  );
}
