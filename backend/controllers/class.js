

import GymClass from "../models/class.js";

// @desc    Get All Classes (Admin view)
export const getAdminClasses = async (req, res) => {
  try {
    const classes = await GymClass.find().sort({ createdAt: -1 });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Grouped Schedule (Schedule Page view)
export const getSchedule = async (req, res) => {
  try {
    const allDetail = await GymClass.find();
    
    // Grouping logic for the frontend tabs
    const schedule = {
      mixed: allDetail.filter(c => c.gender === "All"),
      women: allDetail.filter(c => c.gender === "Women"),
      men: allDetail.filter(c => c.gender === "Men"),
    };

    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Class
export const createClass = async (req, res) => {
  try {
    const newClass = new GymClass(req.body);
    await newClass.save();

    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update Class
export const updateClass = async (req, res) => {
  try {
    const updated = await GymClass.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete Class
export const deleteClass = async (req, res) => {
  try {
    await GymClass.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};