const express = require("express");
const Purchase = require("../models/Purchase");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/my-purchases", auth, async (req, res) => {
  const purchases = await Purchase.find({ buyer: req.user.id }).populate(
    "crop",
    "name",
  );
  res.json(purchases);
});

module.exports = router;
