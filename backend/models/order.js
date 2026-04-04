import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    productName: String,
    price: String,
    customerName: String,
    phone: String,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);