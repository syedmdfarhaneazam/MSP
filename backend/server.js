const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const cropRoutes = require("./routes/crops");
const purchaseRoutes = require("./routes/purchases");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/crops", cropRoutes);
app.use("/purchases", purchaseRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
