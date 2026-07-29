"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ children = "ذخیره" }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-11 items-center justify-center rounded-lg bg-forest-900 px-6 text-sm font-bold text-cream-50 transition hover:bg-forest-800 disabled:opacity-60"
    >
      {pending ? "در حال ذخیره…" : children}
    </button>
  );
}
