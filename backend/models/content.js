import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
{
  type: {
    type: String,
    enum: ["hero", "blog", "pricing"],
    required: true,
  },

  message: String,
  image: String,

  title: String,
  description: String,
  author: String,

  name: String,
  price: Number,
  features: [String],
},
{ timestamps: true }
);

export default mongoose.model("Content", contentSchema);