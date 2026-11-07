"use client";
import { useTransition } from "react";
import { deleteProduct } from "@/actions/productActions";

export default function DeleteButton({ id }) {
  const [isPending, startTransition] = useTransition();
  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete this ${id}?`)) return;
    startTransition(async () => {
      const result = await deleteProduct(id);
      if (result?.error) {
        alert(result.error);
      }
    });
  }
  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete product"}
    </button>
  );
}
