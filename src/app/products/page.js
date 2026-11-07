import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { getCurrentUser } from "@/lib/auth";

export default async function Products() {
  const user = await getCurrentUser();
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).lean();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold text-amber-300">Products</h1>
      {user && (
        <Link
          href="/products/new"
          className="mt-2 inline-block text-blue-500 underline"
        >
          + Add product
        </Link>
      )}

      <ul className="mt-4 space-y-2">
        {products.map((product) => (
          <li key={String(product._id)}>
            <Link
              href={`/products/${product._id}`}
              className="text-blue-500 underline"
            >
              {product.name} - ${product.price}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
