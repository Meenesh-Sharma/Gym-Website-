import Order from "../models/order.js";
import { createNotification } from "./notificationController.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const {
      productId,
      productName,
      price,
      customerName,
      phone,
    } = req.body;

    //  Validation
    if (!productName || !customerName || !phone) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    //  Create Order
    const order = new Order({
      productId,
      productName,
      price,
      customerName,
      phone,
    });

    const savedOrder = await order.save();

    //  CREATE NOTIFICATION (IMPORTANT)
    await createNotification({
      type: "ORDER",
      message: `📦 ${customerName} ordered ${productName} (${price}) contect number is ${phone}`,
    });

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({
      message: "Failed to create order",
    });
  }
};

// GET ALL ORDERS (Admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

// DELETE ORDER (optional)
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete order",
    });
  }
};