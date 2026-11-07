import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import isValidId from "@/lib/validatedId";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return Response.json({ error: "Invalid product id" }, { status: 400 });
  }
  await connectDB();
  const product = await Product.findById(id).lean();
  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }
  return Response.json(product);
}
export async function PUT(request, { params }) {
  const { id } = await params;
  if (!isValidId(id)) {
    return Response.json({ error: "Invalid product id" }, { status: 400 });
  }
  try {
    await connectDB();
    const body = await request.json();
    const allowed = ["name", "price", "description"];
    const update = {};
    for (const key of allowed) {
      if (body[key] !== undefined) update[key] = body[key];
    }

    const product = await Product.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).lean();

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json(product);
  } catch (error) {
    if (error.name === "ValidationError") {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
export async function DELETE(request, { params }) {
  const { id } = await params;
  if (!isValidId(id)) {
    return Response.json({ error: "Invalid product id" }, { status: 400 });
  }
  await connectDB();
  const product = await Product.findByIdAndDelete(id).lean();

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json({ message: "Product deleted" });
}
