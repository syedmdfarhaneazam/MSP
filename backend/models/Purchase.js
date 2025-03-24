const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  crop: { type: mongoose.Schema.Types.ObjectId, ref: "Crop", required: true },
  units: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Purchase", purchaseSchema);
