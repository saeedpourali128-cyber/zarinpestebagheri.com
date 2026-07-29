import { CertificateForm } from "../CertificateForm";
import { createCertificate } from "../actions";

export default function NewCertificatePage() {
  return (
    <div>
      <h1 className="text-xl font-black text-forest-900">گواهی جدید</h1>
      <div className="mt-6 max-w-xl rounded-2xl border border-line-200 bg-white p-6">
        <CertificateForm action={createCertificate} />
      </div>
    </div>
  );
}
