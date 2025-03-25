const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Use environment variable for MongoDB URI
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://syedmdfarhaneazam:M0ng0Db@azamsdb.elr9l.mongodb.net/?retryWrites=true&w=majority&appName=azamsDB";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Your routes here
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/crops", require("./routes/crops"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
