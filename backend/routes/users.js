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

router.put("/:id", auth, async (req, res) => {
  const { username, phone, address } = req.body;
  const user = await User.findById(req.params.id);
  if (user._id.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });
  user.username = username || user.username;
  user.phone = phone || user.phone;
  user.address = address || user.address;
  await user.save();
  res.json(user);
});

module.exports = router;
