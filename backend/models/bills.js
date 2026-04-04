

import mongoose from "mongoose";

const BillSchema = new mongoose.Schema(
  {
    memberName: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Paid", "Unpaid", "Outstanding"],
      default: "Outstanding",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bill", BillSchema);