import Link from "next/link";
import mongoose from "mongoose";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import AddToCartButton from "@/components/AddToCartButton";
import DeleteButton from "@/components/DeleteButton";
import DrobdownMenu from "@/components/DropdownMenu";
import { getCurrentUser } from "@/lib/auth";
export default async function ProductDetail({ params }) {
  const user = await getCurrentUser();
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    notFound();
  }
  await connectDB();
  const product = await Product.findById(id).lean();
  if (!product) {
    notFound();
  }
  const isOwner = user && String(product.createdBy) === user.id;
  return (
    <main className="p-10">
      <div className="flex  justify-between  ">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-xl text-green-600">${product.price}</p>
          <p className="mt-2 text-gray-600">{product.description}</p>

          <Link
            href="/products"
            className="mt-6 inline-block text-blue-500  px-2 border-amber-200"
          >
            ← Back to products
          </Link>
        </div>

        <div>
          {isOwner && (
            <DrobdownMenu productId={String(product._id)}>
              <AddToCartButton productName={product.name} />
              <DeleteButton id={String(product._id)} />

              <Link
                href={`/products/${product._id}/edit`}
                className="mt-4 mr-4 inline-block   px-4 py-2 rounded-3xl bg-blue-500  text-white hover:bg-blue-600   "
              >
                Edit product
              </Link>
              <button>
                <Link
                  href={`/products/${product._id}/reviews`}
                  className="mt-4 inline-block   px-4 py-2 rounded-3xl bg-green-500  text-white hover:bg-green-600   "
                >
                  Review
                </Link>
              </button>
            </DrobdownMenu>
          )}
        </div>
      </div>
    </main>
  );
}
