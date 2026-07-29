import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "ورود به پنل مدیریت" };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm rounded-2xl border border-line-200 bg-white p-8 shadow-lg">
        <h1 className="text-center text-lg font-black text-forest-900">پنل مدیریت زرین پسته باقری</h1>
        <p className="mt-2 text-center text-xs text-ink-500">برای ادامه وارد شوید</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
