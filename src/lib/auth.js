import "server-only";
import { cache } from "react";
import mongoose from "mongoose";
import { connectDB } from "./mongodb";
import User from "@/models/User";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  if (!session || !mongoose.isValidObjectId(session.userId)) {
    return null;
  }
  await connectDB();
  const user = await User.findById(session.userId).lean();
  if (!user) return null;
  return { id: String(user._id), name: user.name, email: user.email };
});

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
