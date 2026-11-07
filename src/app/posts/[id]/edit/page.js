import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { notFound } from "next/navigation";
import { updatePost } from "@/actions/postActions";
import PostForm from "@/components/PostForm";
import { requireUser } from "@/lib/auth";

export default async function EditPost({ params }) {
  const user = await requireUser();
  const { id } = await params;
  await connectDB();
  const post = await Post.findById(id).lean();
  if (!post || String(post.createdBy) !== user.id) {
    notFound();
  }
  const updatePostWithId = updatePost.bind(null, id);
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Edit {post.title}</h1>
      <PostForm
        action={updatePostWithId}
        initialValues={{
          title: post.title,
          body: post.body,
        }}
        submitLabel="Save changes"
      />
    </main>
  );
}
