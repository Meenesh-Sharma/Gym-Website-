
import express from "express";
import {
  getNotifications,
  markAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

// GET notifications
router.get("/", getNotifications);

// MARK AS READ
router.patch("/:id/read", markAsRead);

export default router;