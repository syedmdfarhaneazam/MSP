const express = require("express");
const multer = require("multer");
const Crop = require("../models/Crop");
const auth = require("../middleware/auth");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", auth, async (req, res) => {
  const crops = await Crop.find().populate("farmer", "username");
  res.json(crops);
});

router.get("/my-crops", auth, async (req, res) => {
  const crops = await Crop.find({ farmer: req.user.id });
  res.json(crops);
});

router.get("/:id", auth, async (req, res) => {
  const crop = await Crop.findById(req.params.id).populate(
    "farmer",
    "username",
  );
  if (!crop) return res.status(404).json({ message: "Crop not found" });
  res.json(crop);
});

router.post("/", auth, upload.single("picture"), async (req, res) => {
  if (req.user.role !== "SELLER")
    return res.status(403).json({ message: "Only farmers can post crops" });

  const { name, expirationDate, dateOfExtraction, units } = req.body;
  const crop = new Crop({
    farmer: req.user.id,
    picture: req.file ? req.file.path : null,
    name,
    expirationDate,
    dateOfExtraction,
    units: Number(units),
    unitsInStock: Number(units),
  });
  await crop.save();
  res.json(crop);
});

router.put("/:id", auth, async (req, res) => {
  const crop = await Crop.findById(req.params.id);
  if (!crop || crop.farmer.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  const { name, expirationDate, dateOfExtraction, units } = req.body;
  crop.name = name || crop.name;
  crop.expirationDate = expirationDate || crop.expirationDate;
  crop.dateOfExtraction = dateOfExtraction || crop.dateOfExtraction;
  crop.units = Number(units) || crop.units;
  crop.unitsInStock = Number(units) || crop.unitsInStock;
  await crop.save();
  res.json(crop);
});

router.delete("/:id", auth, async (req, res) => {
  const crop = await Crop.findById(req.params.id);
  if (!crop || crop.farmer.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });
  await crop.deleteOne();
  res.json({ message: "Crop deleted" });
});

router.post("/:id/buy", auth, async (req, res) => {
  if (req.user.role !== "BUYER")
    return res.status(403).json({ message: "Only buyers can buy crops" });

  const crop = await Crop.findById(req.params.id);
  if (!crop) return res.status(404).json({ message: "Crop not found" });

  const { units } = req.body;
  if (!units || units <= 0 || units > crop.unitsInStock) {
    return res.status(400).json({ message: "Invalid units requested" });
  }

  crop.unitsInStock -= units;
  crop.unitsSold = (crop.unitsSold || 0) + units;
  await crop.save();
  res.json(crop);
});

module.exports = router;
