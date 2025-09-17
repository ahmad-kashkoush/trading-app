# Real-Time Chatting Feature Documentation

This document explains the real-time chat functionality implemented in the trading app backend, including code structure, flow, and usage examples.

---

## Overview

The real-time chat feature allows users to exchange messages instantly using **Socket.IO** for real-time communication and **MongoDB** for message persistence. The backend exposes REST APIs for fetching and sending messages, and emits socket events to notify users of new messages.

---

## Main Components

- **Message Model:** Stores chat messages in MongoDB.
- **Socket.IO:** Handles real-time message delivery.
- **Controller Functions:** Manage message retrieval and sending.

---

## How It Works

### 1. Fetching Messages

When a user opens a chat with another user, the frontend calls:

```
GET /messages/:id
```

- `:id` is the ID of the other user.
- Returns all messages exchanged between the authenticated user and the other user.

**Example Response:**

```json
[
  {
    "_id": "6501f...",
    "senderId": "user1",
    "receiverId": "user2",
    "text": "Hello!",
    "createdAt": "2025-09-17T12:00:00.000Z"
  },
  ...
]
```

---

### 2. Sending a Message

When a user sends a message, the frontend calls:

```
POST /messages/:id
```

- `:id` is the receiver's user ID.
- Request body: `{ "text": "Hi there!" }`

**Backend Flow:**

1. Creates a new message document.
2. Saves it to MongoDB.
3. Checks if the receiver is online (using their socket ID).
4. If online, emits a `newMessage` event to the receiver via Socket.IO.
5. Responds with the saved message.

**Example Request:**

```json
POST /messages/USER_ID_2
{
  "text": "Hi there!"
}
```

**Example Response:**

```json
{
  "_id": "6501f...",
  "senderId": "user1",
  "receiverId": "user2",
  "text": "Hi there!",
  "createdAt": "2025-09-17T12:01:00.000Z"
}
```

---

### 3. Real-Time Notification

If the receiver is online, they receive a `newMessage` event via Socket.IO:

```js
socket.on("newMessage", (message) => {
  // Update chat UI with the new message
});
```

---

## Code Explanation

### Controller: `messages.controller.js`

**Send Message Logic:**

```js
const sendMessage = (io) => async (req, res) => {
  const { id: receiverId } = req.params;
  const userId = req.user._id || req.user.id;
  const { text } = req.body;

  try {
    const newMessage = new Message({
      senderId: userId,
      receiverId,
      text,
    });

    await newMessage.save();

    const receiverSocketId = getReciverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
```

- **Creates and saves** the message.
- **Emits** the message to the receiver if online.

---

## Example Usage Flow

1. **User A** sends a message to **User B**.
2. Backend saves the message and emits a real-time event to **User B** if online.
3. **User B**'s frontend listens for `newMessage` and updates the chat instantly.

---

## Summary

- **REST API** for fetching and sending messages.
- **Socket.IO** for real-time delivery.
- **MongoDB** for message storage.
- **Controller** handles business logic and socket events.

This setup ensures users have a seamless, real-time chat experience in
