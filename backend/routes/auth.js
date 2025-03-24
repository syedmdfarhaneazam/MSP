const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password, phone, role, address } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      phone,
      role,
      address,
    });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, "secret", {
      expiresIn: "1h",
    });
    res.json({ token, user: user.toObject({ getters: true }) });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
