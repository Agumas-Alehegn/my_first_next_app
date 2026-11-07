"use server";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { createSession, deleteSession } from "@/lib/session";
export async function register(prevState, formData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const values = { name, email };

  if (!name) return { error: "Name is required.", values };
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { error: "Please enter a valid email.", values };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters. values" };
  }
  let user;
  try {
    await connectDB();
    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return { error: "An account with this email already exists", values };
    }
    const passwordHash = await bcrypt.hash(password, 12);
    user = await User.create({ name, email, passwordHash });
  } catch (err) {
    if (err.code === 11000) {
      return { error: "An account with this email already exists.", values };
    }
    return { error: "Couldn't create the account. Please try again.", values };
  }
  await createSession(String(user._id));
  redirect("/");
}

export async function login(prevState, formData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLocaleLowerCase();
  const password = String(formData.get("password") ?? "");
  const values = { email, password };

  if (!email) {
    return { error: "Email is required to login.", values };
  }
  if (!password) {
    return { error: "Password is required to login.", values };
  }
  let user;
  try {
    await connectDB();
    user = await User.findOne({ email }).select("+passwordHash");
  } catch (err) {
    return { error: "Something went wrong.", values };
  }
  const passwordOk = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false;
  if (!user || !passwordOk) {
    return {
      error:
        "Invalid email or password. Please try with correct email or password.",
      values,
    };
  }
  await createSession(String(user._id));
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
