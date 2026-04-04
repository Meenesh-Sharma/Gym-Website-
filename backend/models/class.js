import mongoose from "mongoose";

const GymClassSchema = new mongoose.Schema({
  name: { type: String, required: true },
  instructor: { type: String, required: true },
  schedule: { type: String, required: true }, // e.g., "Mon/Wed/Fri 7:00 AM"
  time: { type: String, required: true },     // e.g., "7:00 AM"
  duration: { type: String, required: true },
  capacity: { type: Number, required: true },
  gender: { 
    type: String, 
    required: true, 
    enum: ["Men", "Women", "All"],
    default: "All" 
  },
  // Binary representation: [1, 0, 1, 0, 1, 0, 0]
  days: { 
    type: [Number], 
    default: [0, 0, 0, 0, 0, 0, 0] 
  }
}, { timestamps: true });

export default mongoose.model("GymClass", GymClassSchema);