

import Content from "../models/content.js";


export const createContent = async (req, res) => {
  try {
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({ message: "Content type is required" });
    }

    let data = { type };

    // HERO
    if (type === "hero") {
      data.message = req.body.message || "";
      data.image = req.file?.path || "";
    }

    // BLOG
    if (type === "blog") {
      data.title = req.body.title || "";
      data.description = req.body.description || "";
      data.author = req.body.author || "";
      data.image = req.file?.path || "";
    }

    // PRICING
    if (type === "pricing") {
      data.name = req.body.name || "";
      data.price = Number(req.body.price) || 0;

      //  HANDLE FEATURES
      if (typeof req.body.features === "string") {
        try {
          data.features = JSON.parse(req.body.features);
        } catch {
          data.features = req.body.features.split(",");
        }
      } else {
        data.features = req.body.features || [];
      }
    }

    const content = await Content.create(data);

    res.status(201).json({
      success: true,
      message: "Content created successfully",
      data: content,
    });

  } catch (error) {
    console.error("Create Content Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const getAllContent = async (req, res) => {
  try {
    const content = await Content.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: content.length,
      data: content,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getContentByType = async (req, res) => {
  try {
    const { type } = req.params;

    const allowedTypes = ["hero", "blog", "pricing"];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid content type",
      });
    }

    const content = await Content.find({ type }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: content.length,
      data: content,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getSingleContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json({
      success: true,
      data: content,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateContent = async (req, res) => {
  try {
    const updated = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Content updated",
      data: updated,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteContent = async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Content deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};