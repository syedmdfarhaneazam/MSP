const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ["BUYER", "SELLER", "ADMIN"], required: true },
  address: { type: String },
  crops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Crop" }],
  testimonials: [{ type: String }],
  recentPurchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Purchase" }],
});

module.exports = mongoose.model("User", userSchema);
