import WorkoutPlan from "../models/workoutStats.js";


// 🔹 helper → get start of week (Monday)
const getWeekStart = () => {
  const now = new Date();
  const day = now.getDay(); // 0 (Sun) - 6 (Sat)

  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday
  const monday = new Date(now.setDate(diff));

  monday.setHours(0, 0, 0, 0);
  return monday;
};


//  CREATE WORKOUT PLAN (ONLY ONCE PER WEEK)
export const createWorkoutPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { plan } = req.body;

    const weekStart = getWeekStart();

    // check existing plan for this week
    const existing = await WorkoutPlan.findOne({
      userId,
      weekStart,
    });

    if (existing) {
      return res.status(400).json({
        message: "Workout already created for this week",
      });
    }

    const newPlan = await WorkoutPlan.create({
      userId,
      weekStart,
      plan,
      isLocked: true,
    });

    res.status(201).json(newPlan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


//  GET CURRENT WEEK PLAN
export const getMyWorkoutPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const weekStart = getWeekStart();

    const plan = await WorkoutPlan.findOne({
      userId,
      weekStart,
    });

    res.json(plan || null);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


// ❌ BLOCK UPDATE (LOCKED SYSTEM)
export const updateWorkoutPlan = async (req, res) => {
  return res.status(403).json({
    message: "Workout plan is locked for this week",
  });
};


// 🗑️ OPTIONAL: DELETE (for testing only)
export const deleteWorkoutPlan = async (req, res) => {
  try {
    const userId = req.user.id;

    await WorkoutPlan.deleteMany({ userId });

    res.json({ message: "All workout plans deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};