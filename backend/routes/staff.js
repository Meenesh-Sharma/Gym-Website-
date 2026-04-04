import express from "express";
const router = express.Router();
import { getStaff, createStaff, updateStaff, deleteStaff } from "../controllers/staff.js";

router.get("/", getStaff);
router.post("/", createStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

export default router;