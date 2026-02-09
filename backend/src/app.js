const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory database
let users = [];
let userIdCounter = 1;

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: "Backend API running" });
});

// GET all users
app.get('/users', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single user by ID
app.get('/users/:id', (req, res) => {
  try {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// CREATE new user
app.post('/users', (req, res) => {
  try {
    const { name, email } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: "Name and email are required"
      });
    }

    // Check if email already exists
    if (users.some(u => u.email === email)) {
      return res.status(400).json({
        success: false,
        error: "Email already exists"
      });
    }

    const newUser = {
      id: userIdCounter++,
      name: name.trim(),
      email: email.trim(),
      createdAt: new Date()
    };

    users.push(newUser);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// UPDATE user by ID
app.put('/users/:id', (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = parseInt(req.params.id);

    // Find user
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: "Name and email are required"
      });
    }

    // Check if email is taken by another user
    if (users.some(u => u.email === email && u.id !== userId)) {
      return res.status(400).json({
        success: false,
        error: "Email already exists"
      });
    }

    users[userIndex] = {
      ...users[userIndex],
      name: name.trim(),
      email: email.trim(),
      updatedAt: new Date()
    };

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: users[userIndex]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE user by ID
app.delete('/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const deletedUser = users.splice(userIndex, 1);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = app;
