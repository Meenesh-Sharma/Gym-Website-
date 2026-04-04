import express from "express";
import {
  createWorkoutPlan,
  getMyWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
} from "../controllers/workout.js";

import { protect } from "../middleware/authMiddleware.js"; // your JWT middleware

const router = express.Router();

// CREATE PLAN
router.post("/create", protect, createWorkoutPlan);

// GET CURRENT PLAN
router.get("/my", protect, getMyWorkoutPlan);

// BLOCK UPDATE
router.put("/update", protect, updateWorkoutPlan);

// OPTIONAL DELETE (testing)
router.delete("/delete", protect, deleteWorkoutPlan);

export default router;