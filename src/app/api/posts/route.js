import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const post = await Post.create({
      title: body.title,
      body: body.body,
    });
    return Response.json(post, { status: 201 });
  } catch (error) {
    if (error.name === "ValidationError")
      return Response.json({ error: error.message }, { status: 400 });
  }
  return Response.json({ error: "Server error" }, { status: 500 });
}
