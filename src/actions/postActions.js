"use server";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { requireUser } from "@/lib/auth";

export async function createPost(prevState, formData) {
  const user = await requireUser();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const values = { title, body };
  if (!title) {
    return { error: "Title is required.", values };
  }
  if (!body) {
    return { error: "Body is required.", values };
  }
  try {
    await connectDB();
    await Post.create({ title, body, createdBy: user.id });
  } catch (err) {
    return { error: "Could not save the post. Please try again.", values };
  }
  revalidatePath("/posts");
  redirect("/posts");
}
export async function updatePost(id, prevState, formData) {
  const user = await requireUser();
  if (!mongoose.isValidObjectId(id)) {
    return { error: "Invalid post id." };
  }
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const values = (title, body);
  if (!title) {
    return { error: "Titele is required", values };
  }
  if (!body) {
    return { error: "Body is required", values };
  }
  try {
    connectDB();
    const updated = await Post.findByIdAndUpdate(
      { _id: id, createdBy: user.id },
      { title, body },
      { runValidators: true },
    ).lean();
    if (!updated) {
      return {
        error: "Post not found, or You are nor allowed to Edit post",
        values,
      };
    }
  } catch (error) {
    return { error: "Could not update the post. Please try again.", values };
  }

  revalidatePath("/posts");
  revalidatePath(`/posts/${id}`);
  redirect(`/posts/${id}`);
}
export async function deletePost(id) {
  const user = await requireUser();
  if (!mongoose.isValidObjectId(id)) {
    return { error: "Invalid post id." };
  }
  try {
    await connectDB();
    const deleted = await Post.findByIdAndDelete({
      _id: id,
      createdBy: user.id,
    }).lean();
    if (!deleted) {
      return { error: "Post not found, or You are not allowed to delete post" };
    }
  } catch (err) {
    return { error: "Could not delete the post. Please try again." };
  }
  revalidatePath("/posts");
  redirect("/posts");
}
