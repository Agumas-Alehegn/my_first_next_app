"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { requireUser } from "@/lib/auth";

function parseProductForm(formData) {
  const name = String(formData.get("name") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(priceRaw);
  const values = { name, price: priceRaw, description };

  if (!name) {
    return { error: "Name is required.", values };
  }
  if (priceRaw === "" || Number.isNaN(price) || price < 0) {
    return { error: "Price must be a number, 0 or more.", values };
  }
  return { data: { name, price, description }, values };
}

export async function createProduct(prevState, formData) {
  const user = await requireUser();

  const { data, error, values } = parseProductForm(formData);

  if (error) {
    return { error, values };
  }

  try {
    await connectDB();
    await Product.create({ ...data, createdBy: user.id });
  } catch (err) {
    return { error: "Could not save the product. Please try again.", values };
  }

  revalidatePath("/products");
  redirect("/products");
}

export async function updateProduct(id, prevState, formData) {
  const user = await requireUser();
  if (!mongoose.isValidObjectId(id)) {
    return { error: "Invalid product id." };
  }
  const { data, error, values } = parseProductForm(formData);

  if (error) {
    return { error, values };
  }

  try {
    await connectDB();
    const updated = await Product.findByIdAndUpdate(
      { _id: id, createdBy: user.id },
      data,
      {
        runValidators: true,
      },
    ).lean();

    if (!updated) {
      return {
        error: "Product not found, or you are not allowed to edit",
        values,
      };
    }
  } catch (err) {
    return { error: "Could not update the product. Please try again.", values };
  }

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
  redirect(`/products/${id}`);
}

export async function deleteProduct(id) {
  const user = await requireUser();
  if (!mongoose.isValidObjectId(id)) {
    return { error: "Invalid product id." };
  }
  try {
    await connectDB();
    const deleted = await Product.findByIdAndDelete({
      _id: id,
      createdBy: user.id,
    }).lean();
    if (!deleted) {
      return {
        error: "Product not found, or you are not allowed to  delete it",
      };
    }
  } catch (err) {
    return { error: "Could not delete the product. Please try again." };
  }
  revalidatePath("/products");
  redirect("/products");
}
