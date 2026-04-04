import express from "express";

import {
createContent,
  getAllContent,
  getContentByType,
  getSingleContent,
  updateContent,
  deleteContent,
} from "../controllers/content.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), createContent);

router.get("/", getAllContent);

router.get("/type/:type", getContentByType);

router.put("/:id", upload.single("image"), updateContent);

router.delete("/:id", deleteContent);

router.get("/:type", getContentByType); // hero / blog / pricing
router.get("/single/:id", getSingleContent); // optional

export default router;