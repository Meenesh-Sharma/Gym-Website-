import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userName: String,

    plan: {
      type: String,
     
      required: true,
    },

    price: String,

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["Active", "Expired"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", subscriptionSchema);