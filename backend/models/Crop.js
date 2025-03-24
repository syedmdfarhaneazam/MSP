const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  monthOfProduction: { type: Date, required: true },
  unitsSold: { type: Number, default: 0 },
  unitsInStock: { type: Number, required: true },
});

module.exports = mongoose.model("Crop", cropSchema);
