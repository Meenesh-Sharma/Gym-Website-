import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { 
    type: String, 
    required: true, 
    enum: ["Trainer", "Receptionist", "Cleaner", "Manager"] 
  },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  // Trainer Specific Fields
  speciality: { type: String },
  experience: { type: String },
  description: { type: String },
}, { timestamps: true });

export default mongoose.model("Staff", StaffSchema);