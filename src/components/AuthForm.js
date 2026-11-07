"use client";
import { useActionState } from "react";

export default function AuthForm({ action, isRegister = false, submitLabel }) {
  const [state, formAction, isPending] = useActionState(action, null);
  const values = state?.values ?? {};
  return (
    <form action={formAction} className="mt-6 max-w-md space-y-4">
      {state?.error && (
        <p className="rounded bg-red-100 p-3 text-red-700">{state.error}</p>
      )}
      {isRegister && (
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={values.name}
            className="mt-1 w-full rounded border p-2"
          />
        </div>
      )}
      <div>
        <label htmlFor="email" className="block font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="text"
          required
          defaultValue={values.email}
          className="mt-1 w-full rounded border p-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="block font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={isRegister ? 8 : undefined}
          autoComplete={isRegister ? "new-password" : "current-password"}
          className="mt-1 w-full rounded border p-2"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Please wait..." : submitLabel}
      </button>
    </form>
  );
}
