"use client";
import { useActionState } from "react";
export default function PostForm({
  action,
  initialValues = {},
  submitLabel = "Save",
}) {
  const [state, formAction, isPending] = useActionState(action, null);
  const values = state?.values ?? initialValues;
  return (
    <form action={formAction} className="mt-6 max-w-md space-y-4">
      {state?.error && <p className="text-red-300">{state.error}</p>}
      <div>
        <label className="">Title</label>
        <input
          name="title"
          type="text"
          required
          defaultValue={values.title}
          className="mt-1 w-full rounded border p-"
        />
      </div>
      <div>
        <label className="">Body</label>
        <textarea
          name="body"
          required
          defaultValue={values.body}
          className="mt-1 w-full rounded border p-"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isPending ? "Is Saving..." : submitLabel}
      </button>
    </form>
  );
}
