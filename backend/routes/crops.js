const express = require("express");
const Crop = require("../models/Crop");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const crops = await Crop.find().populate("farmer", "username");
  res.json(crops);
});

router.get("/my-crops", auth, async (req, res) => {
  const crops = await Crop.find({ farmer: req.user.id });
  res.json(crops);
});

router.post("/", auth, async (req, res) => {
  const crop = new Crop({ ...req.body, farmer: req.user.id });
  await crop.save();
  res.status(201).json(crop);
});

router.delete("/:id", auth, async (req, res) => {
  const crop = await Crop.findById(req.params.id);
  if (crop.farmer.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });
  await crop.remove();
  res.json({ message: "Crop deleted" });
});

module.exports = router;
