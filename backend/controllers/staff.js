import Staff from "../models/staff.js";

export const getStaff = async (req, res) => {
  try {
    const { search, role } = req.query;
    let query = {};

    if (role) {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    const staffList = await Staff.find(query).sort({ createdAt: -1 });

    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new staff
export const createStaff = async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update staff member
export const updateStaff = async (req, res) => {
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete staff
export const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};