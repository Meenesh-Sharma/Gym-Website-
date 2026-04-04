import express from "express";
import {
  createMessage,
  getMessages,
  approveMessage,
  deleteMessage,
  getApprovedMessages
} from "../controllers/feedback.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/", getMessages);
router.get("/approved", getApprovedMessages);
router.put("/approve/:id", approveMessage);
router.delete("/:id", deleteMessage);

export default router;