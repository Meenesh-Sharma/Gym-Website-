

import User from "../models/user.js";
import Notification from "../models/Notification.js";
import Subscription from "../models/subscription.js";
import WorkoutStats from "../models/workoutStats.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//  REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      email,
      phone,
      address,
      password,
    } = req.body;

    // Check existing user
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      age,
      gender,
      email,
      phone,
      address,
      password: hashedPassword,
    });

    //  Create default workout stats
    await WorkoutStats.create({
      user: user._id,
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message });
  }
};


//  LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user,
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message });
  }
};


//  GET ALL USERS (ADMIN)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json(users);

  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ message: error.message });
  }
};


//  UPDATE USER (ADMIN)
export const updateUser = async (req, res) => {
  try {
    const { name, phone, age, gender, email, address, membership } = req.body;
    const userId = req.params.id;

    // Update basic user info
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, phone, age, gender, email, address },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    //  HANDLE MEMBERSHIP
    if (membership) {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      // Expire old subscriptions
      await Subscription.updateMany(
        { userId: userId, status: "Active" },
        { status: "Expired" }
      );

      // Create new subscription
      await Subscription.create({
        userId: userId,
        userName: updatedUser.name,
        plan: membership,
        price: "0",
        startDate,
        endDate,
        status: "Active",
      });

      // Notification
      await Notification.create({
        title: "Membership Updated",
        message: `${updatedUser.name} updated plan to ${membership}`,
        type: "membership",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: error.message });
  }
};


//  DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);

    // Also delete related data
    await Subscription.deleteMany({ userId });
    await WorkoutStats.deleteMany({ user: userId });

    res.status(200).json({
      success: true,
      message: "User and related data deleted successfully",
    });

  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ message: error.message });
  }
};


//  GET USERS WITH SUBSCRIPTIONS
export const getUsersWithSubscriptions = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    const now = new Date();

    const usersWithPlans = await Promise.all(
      users.map(async (user) => {
        const subscription = await Subscription.findOne({
          userId: user._id,
        }).sort({ createdAt: -1 });

        let status = "No Plan";

        if (subscription) {
          status =
            new Date(subscription.endDate) > now
              ? "Active"
              : "Expired";
        }

        return {
          ...user.toObject(),
          plan: subscription?.plan || "No Plan",
          startDate: subscription?.startDate || null,
          endDate: subscription?.endDate || null,
          status,
        };
      })
    );

    res.status(200).json(usersWithPlans);

  } catch (error) {
    console.error("Get Users With Sub Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const stats = await WorkoutStats.findOne({
      user: req.params.userId,
    });

    if (!stats) {
      return res.json({
        workouts: 0,
        streak: 0,
        level: "Beginner",
        hours: 0,
      });
    }

    res.json(stats);

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};