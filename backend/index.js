
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/user.js";
import contentRoutes from "./routes/content.js";
import messageRoutes from "./routes/feedback.js";
import staffRoutes from "./routes/staff.js";
import classRoutes from "./routes/class.js";
import billRoutes from "./routes/bills.js";
import productRoutes from "./routes/storethings.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import orderRoutes from "./routes/order.js";
import subscriptionRoutes from "./routes/susbcriptions.js";
import workoutRoutes from "./routes/workout.js";
import exerciseRoutes from "./routes/exercise.js";

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// --- FIXED CORS LOGIC ---
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim()) 
  : [];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman or mobile)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Log exactly which URL is being blocked so you can fix your .env
      console.log(`CORS Blocked: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));

app.use(express.json());

// Routes
app.use("/api/user", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/products", productRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/exercise", exerciseRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5400;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});