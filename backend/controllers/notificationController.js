
import Notification from "../models/Notification.js";


export const getNotifications = async (req, res) => {
  try {
    const { type } = req.query;
    let query = {};

    if (type && type !== "ALL") {
      query.type = type;
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      isRead: true,
    });

    res.status(200).json({ message: "Notification marked as read" });
  } catch (err) {
    res.status(500).json({ error: "Error updating notification" });
  }
};

export const createNotification = async ({ type, message }) => {
  try {
    const newNotif = new Notification({
      type,
      message,
    });

    await newNotif.save();
    return newNotif;
  } catch (err) {
    console.error("Notification Error:", err);
  }
};