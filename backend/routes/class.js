import express from "express";
const router = express.Router();
import { 
  getAdminClasses, 
  getSchedule, 
  createClass, 
  updateClass, 
  deleteClass 
} from "../controllers/class.js";

// Public Route
router.get("/schedule", getSchedule);

// Admin Routes
router.get("/", getAdminClasses);
router.post("/", createClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

export default router;