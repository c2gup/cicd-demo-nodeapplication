const express = require("express");

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// In-memory data store
const users = [];

// Home Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Middleware: Only user with id = 1 has access
const checkUserAccess = (req, res, next) => {
  const userId = Number(req.params.id);

  if (userId !== 1) {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  next();
};

// Add User
app.post("/user", (req, res) => {
  const newUser = req.body;

  if (!newUser || !newUser.name || !newUser.email) {
    return res.status(400).json({
      error: "Invalid user data",
    });
  }

  const user = {
    id: users.length + 1,
    name: newUser.name,
    email: newUser.email,
  };

  users.push(user);

  res.status(201).json({
    message: "User added successfully",
    user,
  });
});

// Get All Users
app.get("/user", (req, res) => {
  res.json(users);
});

// Protected Route: Get User by ID
app.get("/user/:id", checkUserAccess, (req, res) => {
  const userId = Number(req.params.id);

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "Access granted",
    user,
  });
});

module.exports = app;
