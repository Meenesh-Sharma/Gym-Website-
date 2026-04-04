

import Product from "../models/storethings.js";
import { createNotification}  from "./notificationController.js";

// GET ALL
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();

    //  NOTIFICATION
    await createNotification({
      type: "BILL",
      message: `New product added: ${saved.name}`,
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    //  NOTIFICATION
    await createNotification({
      type: "BILL",
      message: `Product updated: ${updated.name}`,
    });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    //  NOTIFICATION
    await createNotification({
      type: "BILL",
      message: `Product deleted: ${deleted?.name}`,
    });

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};