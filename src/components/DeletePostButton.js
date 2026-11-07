"use client";
import { useTransition } from "react";
import { deletePost } from "@/actions/postActions";

export default function DeletePostButton({
  id,
  className = "mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700",
}) {
  const [isPending, startTransition] = useTransition();
  async function handlePostDelete() {
    if (!confirm(`Are you sure you want to delete this ${id}?`)) return;
    startTransition(async () => {
      const result = await deletePost(id);
      if (result?.error) {
        alert(result.error);
      }
    });
  }
  return (
    <button
      onClick={handlePostDelete}
      disabled={isPending}
      className={`${className} disabled:opacity-50`}
    >
      {isPending ? "Deleting..." : "Delete Post"}
    </button>
  );
}
