import express from "express";
import { registerUser, loginUser, getUsersWithSubscriptions, deleteUser, updateUser,  getUserStats } from "../controllers/user.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/with-subscription", getUsersWithSubscriptions);
router.delete("/:id", deleteUser);
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// 2. Dynamic routes (ID based) last
router.put("/:id", updateUser);
router.get("/:userId", protect, getUserStats);
export default router;