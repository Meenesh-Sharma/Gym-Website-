import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["BILL", "USER", "STAFF", "ORDER"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification; 