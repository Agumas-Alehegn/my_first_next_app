import PostForm from "@/components/PostForm";
import { createPost } from "@/actions/postActions";
import { requireUser } from "@/lib/auth";

export default async function newPost() {
  const user = await requireUser();
  return (
    <main className="p-10">
      <h1 className="text-3xt font-white">Add Post</h1>
      <PostForm action={createPost} submitLabel="Create Post" />
    </main>
  );
}
