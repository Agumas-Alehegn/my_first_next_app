"use client";
import { useActionState } from "react";
export default function ProductForm({
  action,
  initialValues = {},
  submitLabel = "Save",
}) {
  const [state, formAction, isPending] = useActionState(action, null);
  const values = state?.values ?? initialValues;
  return (
    <form action={formAction} className="mt-6 max-w-md space-y-4">
      {state?.error && (
        <p className="rounded bg-red-100 p-3 text-red-700">{state.error}</p>
      )}

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

      <div>
        <label htmlFor="price" className="block font-medium">
          Price
        </label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          min="0"
          required
          defaultValue={values.price}
          className="mt-1 w-full rounded border p-2"
        />
      </div>

      <div>
        <label htmlFor="description" className="block font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={values.description}
          className="mt-1 w-full rounded border p-2"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
