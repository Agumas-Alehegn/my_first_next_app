import ProductForm from "@/components/ProductForm";
import { createProduct } from "@/actions/productActions";
import { requireUser } from "@/lib/auth";

export default async function NewProduct() {
  await requireUser();
  return (
    <main className=" p-10 ">
      <h1 className="text-3xl font-bold">Add product</h1>
      <ProductForm action={createProduct} submitLabel="Add product" />
    </main>
  );
}
