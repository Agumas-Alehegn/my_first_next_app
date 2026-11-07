import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { getCurrentUser } from "@/lib/auth";

export default async function Posts() {
  const user = await getCurrentUser();
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Posts</h1>
      <ul className="mt-4 space-y-3">
        {posts.slice(0, 10).map((post) => (
          <li key={String(post._id)} className="rounded border p-4">
            <Link href={`/posts/${post._id}`}>
              <h1 className="font-semibold">{post.title}</h1>
              <p className="text-gray-600">{post.body}</p>
            </Link>
          </li>
        ))}
      </ul>
      {user && (
        <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          <Link href="/posts/new">Create New Post</Link>
        </button>
      )}
    </main>
  );
}
