import { MachineryForm } from "../MachineryForm";
import { createMachineryItem } from "../actions";

export default function NewMachineryPage() {
  return (
    <div>
      <h1 className="text-xl font-black text-forest-900">دستگاه جدید</h1>
      <div className="mt-6 max-w-lg rounded-2xl border border-line-200 bg-white p-6">
        <MachineryForm action={createMachineryItem} />
      </div>
    </div>
  );
}
