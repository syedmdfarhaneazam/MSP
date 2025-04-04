const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/farmers", auth, async (req, res) => {
  const farmers = await User.find({ role: "SELLER" }).select("-password");
  res.json(farmers);
});

router.get("/buyers", auth, async (req, res) => {
  const buyers = await User.find({ role: "BUYER" }).select("-password");
  res.json(buyers);
});

router.get("/:id", auth, async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

router.put("/:id", auth, async (req, res) => {
  const { username, phone, address } = req.body;
  const user = await User.findById(req.params.id);
  if (!user || user._id.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  user.username = username || user.username;
  user.phone = phone || user.phone;
  user.address = address || user.address;
  await user.save();
  res.json(user);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({
    id: user._id,
    username: user.username,
    phone: user.phone,
    address: user.address,
    role: user.role,
  });
});

module.exports = router;
