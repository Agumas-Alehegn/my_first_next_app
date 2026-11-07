import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return Response.json(products);
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const product = await Product.create({
      name: body.name,
      price: body.price,
      description: body.description,
    });

    return Response.json(product, { status: 201 });
  } catch (error) {
    if (error.name === "ValidationError") {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
