import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: "" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },

  { timestmps: true },
);
export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
