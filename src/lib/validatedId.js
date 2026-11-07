import mongoose from "mongoose";
export default function isValidId(id) {
  return mongoose.isValidObjectId(id) ? null : "Invalid id.";
}
