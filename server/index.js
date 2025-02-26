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

// Import API routes
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 5000;

console.log("MONGO_URI:", process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// API Routes
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

// Default backend test route
app.get("/", (req, res) => {
  res.send("Backend running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
