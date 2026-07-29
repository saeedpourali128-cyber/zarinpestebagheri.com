"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 flex h-11 w-full items-center justify-center rounded-lg bg-forest-900 text-sm font-bold text-cream-50 transition hover:bg-forest-800 disabled:opacity-60"
    >
      {pending ? "در حال ورود…" : "ورود"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-bold text-forest-900">
          ایمیل
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="h-11 w-full rounded-lg border border-line-300 bg-white px-3 text-sm text-ink-900 outline-none focus:border-forest-700"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-xs font-bold text-forest-900">
          رمز عبور
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="h-11 w-full rounded-lg border border-line-300 bg-white px-3 text-sm text-ink-900 outline-none focus:border-forest-700"
        />
      </div>
      {state.error ? <p className="text-xs font-bold text-red-600">{state.error}</p> : null}
      <SubmitButton />
    </form>
  );
}
