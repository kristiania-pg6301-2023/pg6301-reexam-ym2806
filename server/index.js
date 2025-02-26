import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Ensure we get the correct directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env explicitly
dotenv.config({ path: path.resolve(__dirname, "../server/.env") });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Import the post routes using ES module syntax
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 5000;

console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

// Add the routes for posts
app.use("/api/posts", postRoutes);  // This tells express to use the post routes under /api/posts
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("✅ Backend running!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
