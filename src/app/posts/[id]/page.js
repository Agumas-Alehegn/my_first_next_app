import Link from "next/link";
import { notFound } from "next/navigation";
import Post from "@/models/Post";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import DeletePostButton from "@/components/DeletePostButton";
import DropDownMenu from "@/components/DropdownMenu";
import { getCurrentUser } from "@/lib/auth";

export default async function PostDetail({ params }) {
  const user = await getCurrentUser();
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    notFound();
  }
  await connectDB();
  const post = await Post.findById(id).lean();
  if (!post) {
    notFound();
  }
  const isOwner = user && String(post.createdBy) === user.id;
  console.log("owner:", isOwner);
  return (
    <main className="pt-10 p-4">
      <div className="flex justify-between items-center ">
        <h1 className="text-3xl font-semibold ">{post.title}</h1>
        {isOwner && (
          <DropDownMenu>
            <Link
              href={`/posts/${post._id}/edit`}
              className="px-4 py-2 mt-4 block font-semibold text-gray-500 hover:bg-gray-300"
            >
              Edit Post
            </Link>
            <DeletePostButton
              id={String(post._id)}
              className="block w-full px-4 py-2 text-left font-semibold text-red-600 hover:bg-gray-300"
            />
          </DropDownMenu>
        )}
      </div>
      <p className="mt-2 text-2xl text-gray-600 rounded-2xl ">{post.body}</p>
      <div className="flex justify-between items-center  ">
        <Link
          href="/posts"
          className=" border rounded-3xl px-4 py-2 mt-4 bg-gray-100 hover:bg-gray-200 inline-block font-bold text-gray-600"
        >
          ← Back to posts
        </Link>
      </div>
    </main>
  );
}
