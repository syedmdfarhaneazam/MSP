const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  picture: String,
  name: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  dateOfExtraction: { type: Date, required: true },
  units: { type: Number, required: true },
  unitsInStock: { type: Number, required: true },
  unitsSold: { type: Number, default: 0 },
});

module.exports = mongoose.model("Crop", cropSchema);
