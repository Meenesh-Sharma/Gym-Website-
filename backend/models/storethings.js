// models/product.js

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String }, //  NEW
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);