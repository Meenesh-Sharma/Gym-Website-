import Exercise from "../models/exercise.js";

// CREATE
export const createExercise = async (req, res) => {
  try {
    const { name, kcal } = req.body;

    const exists = await Exercise.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Exercise already exists" });
    }

    const exercise = await Exercise.create({ name, kcal });

    res.status(201).json(exercise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
export const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find().sort({ createdAt: -1 });
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteExercise = async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};