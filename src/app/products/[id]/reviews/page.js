import mongoose from "mongoose";
import { notFound } from "next/navigation";
import Link from "next/link";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";

export default async function ProductReview({ params }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    notFound;
  }
  await connectDB();
  const product = await Product.findById(id).lean();
  console.log(product);
  if (!product) {
    notFound();
  }
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Reviews for {product.name}</h1>
      <p className="mt-2 text-gray-600">No reviews yet!</p>
      <Link
        href={`/products/${product._id}`}
        className="text-blue-500 underline"
      >
        Back to Product
      </Link>
    </main>
  );
}
