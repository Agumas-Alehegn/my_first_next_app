import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductForm from "@/components/ProductForm";
import { updateProduct } from "@/actions/productActions";
import { requireUser } from "@/lib/auth";

export default async function EditProduct({ params }) {
  const user = await requireUser();
  const { id } = await params;
  await connectDB();
  const product = await Product.findById(id).lean();
  if (!product || String(product.createdBy) !== user.id) {
    notFound();
  }
  const updateProductWithId = updateProduct.bind(null, id);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Edit {product.name}</h1>
      <ProductForm
        action={updateProductWithId}
        initialValues={{
          name: product.name,
          price: product.price,
          description: product.description,
        }}
        submitLabel="Save changes"
      />
    </main>
  );
}
