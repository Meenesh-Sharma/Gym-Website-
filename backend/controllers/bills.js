

import Bill from "../models/bills.js";
import { createNotification } from "./notificationController.js";

//  GET all bills
export const getBills = async (req, res) => {
  console.log("GET /api/bills hit");
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });
    res.status(200).json(bills);
  } catch (error) {
    console.error("Get Bills Error:", error);
    res.status(500).json({ message: error.message });
  }
};

//  CREATE bill
export const createBill = async (req, res) => {
  try {
    const { memberName, description, amount, discount } = req.body;

    const subtotal = Number(amount);
    const off = Number(discount) || 0;

    // VALIDATION
    if (!memberName?.trim() || !description?.trim() || isNaN(subtotal)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const finalTotal = subtotal - off;

    const newBill = new Bill({
      memberName,
      description,
      amount: subtotal,
      discount: off,
      total: finalTotal,
      status: "Outstanding",
    });

    const savedBill = await newBill.save();

    //  NOTIFICATION
    await createNotification({
      type: "BILL",
      message: `New bill created for ${memberName} (₹${finalTotal}) for ${description}`,
    });

    res.status(201).json(savedBill);

  } catch (error) {
    console.error("Create Bill Error:", error);
    res.status(500).json({ message: error.message });
  }
};

//  UPDATE bill
export const updateBill = async (req, res) => {
  try {
    const { amount, discount } = req.body;

    if (amount !== undefined || discount !== undefined) {
      const subtotal = Number(amount);
      const off = Number(discount) || 0;
      req.body.total = subtotal - off;
    }

    const updatedBill = await Bill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    //  NOTIFICATION
    await createNotification({
      type: "BILL",
      message: `Bill updated for ${updatedBill.memberName}`,
    });

    res.status(200).json(updatedBill);

  } catch (error) {
    console.error("Update Bill Error:", error);
    res.status(400).json({ message: error.message });
  }
};

//  DELETE bill
export const deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    await Bill.findByIdAndDelete(req.params.id);

    //  NOTIFICATION
    await createNotification({
      type: "BILL",
      message: `Bill deleted for ${bill?.memberName}`,
    });

    res.status(200).json({ message: "Bill deleted successfully" });

  } catch (error) {
    console.error("Delete Bill Error:", error);
    res.status(500).json({ message: error.message });
  }
};