// import express from "express";
// import {
//   createSubscription,
//   getAllSubscriptions,
//   getUserSubscriptions,
//   updateSubscriptionStatus,
//   deleteSubscription,
// } from "../controllers/subscriptions.js";

// const router = express.Router();

// //  CREATE (User buys plan)
// router.post("/", createSubscription);

// //  ADMIN: GET ALL
// router.get("/", getAllSubscriptions);

// //  USER: GET HIS SUBSCRIPTIONS
// router.get("/user/:userId", getUserSubscriptions);

// //  UPDATE STATUS
// router.put("/:id", updateSubscriptionStatus);

// //  DELETE
// router.delete("/:id", deleteSubscription);

// export default router;

import express from "express";
import {
  createSubscription,
  getAllSubscriptions,
  getUserSubscriptions,
  updateSubscriptionStatus,
  deleteSubscription,
} from "../controllers/subscriptions.js";

import { protect } from "../middleware/authMiddleware.js"; //  ADD THIS

const router = express.Router();

//  CREATE (User buys plan)
router.post("/", protect, createSubscription); //  ADD protect HERE

//  ADMIN: GET ALL
router.get("/", getAllSubscriptions);

//  USER: GET HIS SUBSCRIPTIONS
router.get("/user/:userId", getUserSubscriptions);

//  UPDATE STATUS
router.put("/:id", updateSubscriptionStatus);

//  DELETE
router.delete("/:id", deleteSubscription);

export default router;