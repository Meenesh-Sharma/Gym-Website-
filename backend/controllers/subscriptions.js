

import Subscription from "../models/subscription.js";
import User from "../models/user.js";
import { createNotification } from "./notificationController.js";


//  CREATE SUBSCRIPTION
export const createSubscription = async (req, res) => {
  try {
    const { planName, price, durationMonths } = req.body;

    const userId = req.user?._id;
    const userName = req.user?.name;

    if (!userId || !planName || !price) {
      return res.status(400).json({
        success: false,
        message: "Plan, price and user information are required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //  Prevent duplicate active plan
    const existingActive = await Subscription.findOne({
  userId: userId,
  status: "Active",
  endDate: { $gt: new Date() },
});

if (existingActive) {
  return res.status(400).json({
    success: false,
    message: "You already have an active subscription",
  });
}

    //  Date calculation
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + (Number(durationMonths) || 1));

    //  Create subscription
    const subscription = await Subscription.create({
      userId,
      userName,
      plan: planName,
      price: price.toString(),
      startDate,
      endDate,
      status: "Active",
    });

    //  Notification
    await createNotification({
      type: "USER",
      message: `${user.name} subscribed to ${planName}`,
    });

    console.log(` NEW SUBSCRIPTION: ${user.name} → ${planName}`);

    res.status(201).json({
      success: true,
      message: "Subscription successful 🎉",
      data: subscription,
    });

  } catch (error) {
    console.error("Create Subscription Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



//  GET ALL SUBSCRIPTIONS (ADMIN)
export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .sort({ createdAt: -1 });

    res.status(200).json(subscriptions);

  } catch (error) {
    console.error("Get Subscriptions Error:", error);
    res.status(500).json({ message: error.message });
  }
};



//  GET SINGLE USER SUBSCRIPTION ( FIXED)
export const getUserSubscriptions = async (req, res) => {
  try {
    const { userId } = req.params;

    const subscription = await Subscription.findOne({ userId })
      .sort({ createdAt: -1 });

    if (!subscription) {
      return res.status(200).json({
        plan: "No Plan",
        status: "N/A",
        startDate: null,   //  ADD THIS
        endDate: null,
      });
    }

    let status = subscription.status;

    if (new Date(subscription.endDate) < new Date()) {
      status = "Expired";
    }

    res.status(200).json({
      plan: subscription.plan,
      status,
      startDate: subscription.startDate, //  THIS IS MISSING
      endDate: subscription.endDate,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



//  UPDATE SUBSCRIPTION STATUS
export const updateSubscriptionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Subscription.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json(updated);

  } catch (error) {
    console.error("Update Subscription Error:", error);
    res.status(500).json({ message: error.message });
  }
};



//  DELETE SUBSCRIPTION
export const deleteSubscription = async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Subscription deleted successfully",
    });

  } catch (error) {
    console.error("Delete Subscription Error:", error);
    res.status(500).json({ message: error.message });
  }
};