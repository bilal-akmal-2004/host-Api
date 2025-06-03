const express = require("express");
const router = express.Router();

const User = require("../models/userModel");

// yahan pai routes define hain

// Yahan pai CRUD operation hain

// Read or view
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Create
router.post("/users", async (req, res) => {
  try {
    const { name, age, department } = req.body;
    const newUser = new User({ name, age, department });
    await newUser.save();
    res.status(200).json({
      success: true,
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Update
router.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, age, department } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, {
      name,
      age,
      department,
    });
    // if the user is not found
    if (!updatedUser) {
      res.status(500).json({
        success: false,
        message: "User not found !",
      });
    }

    // if the use is found
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Delete
router.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    // if the user is not found
    if (!deletedUser) {
      res.status(500).json({
        success: false,
        message: "User not found !",
      });
    }

    // if the use is found
    res.status(200).json({
      success: true,
      message: "Deleted successfully !",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
