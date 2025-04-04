const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();
const app = express();

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const allowedOrigins = [
  "http://localhost:5173", // local
  "https://msp-one.vercel.app/", // vercel
  "https://msp-syed-md-farhan-e-azams-projects.vercel.app/", // vercel
  "https://msp-git-main-syed-md-farhan-e-azams-projects.vercel.app", // vercel
  process.env.FRONTEND_URL, // and env variable
].filter(Boolean); // remove false values

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // cookies or auth headers ke liye
  }),
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/crops", require("./routes/crops"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
