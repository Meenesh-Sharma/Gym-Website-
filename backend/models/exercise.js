import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  kcal: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Exercise", exerciseSchema);