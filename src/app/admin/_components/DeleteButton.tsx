"use client";

export function DeleteButton({ action, confirmLabel = "این مورد حذف شود؟" }: { action: () => void; confirmLabel?: string }) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!confirm(confirmLabel)) event.preventDefault();
      }}
    >
      <button type="submit" className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50">
        حذف
      </button>
    </form>
  );
}
