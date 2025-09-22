const Message = require("../Models/messages");
const User = require("../Models/user");
const { getReciverSocketId, io } = require("../utils/socket");
// Get messages between two users
const getMessages = async (req, res) => {
  const { id } = req.params; // ID of the other user
  const userId = req.user._id; // ID of the authenticated user
  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: id },
        { senderId: id, receiverId: userId },
      ],
    }).sort({ createdAt: 1 }); // Sort by creation time

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Send a message
const sendMessage = async (req, res) => {
  const { id } = req.params; // ID of the receiver
  const userId = req.user._id; // ID of the authenticated user
  const { text } = req.body;

  try {
    const newMessage = new Message({
      senderId: userId,
      receiverId: id,
      text,
    });
    // Emit the message to the receiver if they are online
    const receiverSocketId = getReciverSocketId(recever);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    // send to the client to listend in this action societ.io
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get list of users who have exchanged messages with the authenticated user
const getUsers = async (req, res) => {
  const userId = req.user.id; // ID of the authenticated user
  try {
    const users = await User.find({ _id: { $ne: userId } });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMessages,
  sendMessage,
  getUsers,
};
