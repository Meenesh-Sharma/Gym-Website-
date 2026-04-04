import express from "express";
import {
  createExercise,
  getExercises,
  deleteExercise,
} from "../controllers/exercise.js";

const router = express.Router();

router.post("/", createExercise);  
router.get("/", getExercises);     
router.delete("/:id", deleteExercise);

export default router;