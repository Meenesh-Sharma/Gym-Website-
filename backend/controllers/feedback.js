import Message from '../models/feedback.js'

export const createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const approveMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getApprovedMessages = async (req, res) => {
  try {
    const messages = await Message.find({ approved: true });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};