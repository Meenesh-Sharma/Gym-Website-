import mongoose from "mongoose";

const workoutPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    weekStart: {
      type: Date,
      required: true,
    },

    plan: {
      type: Object, // { "Push Ups-Mon": true }
      required: true,
    },

    isLocked: {
      type: Boolean,
      default: true, // lock after creation
    },
  },
  { timestamps: true }
);

export default mongoose.model("WorkoutPlan", workoutPlanSchema);