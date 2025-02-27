import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Konverter __dirname for ES-modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Last .env-fil (bruker riktig path for både lokal utvikling og produksjon)
dotenv.config({ path: path.resolve(__dirname, "../server/.env") });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Logg MongoDB URI (sjekk at .env er riktig lastet)
console.log("MONGO_URI:", process.env.MONGO_URI);

// Koble til MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Importer API-ruter
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

// Sett opp API-endepunkter
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

// 🔹 **Håndterer både lokal utvikling og produksjon**
if (process.env.NODE_ENV === "production") {
  // PRODUKSJON: Serve frontend bygget med Vite (ligger i `client/dist`)
  const clientBuildPath = path.resolve(__dirname, "../client/dist");
  app.use(express.static(clientBuildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
} else {
  // LOKAL: Legg til en melding på root (http://localhost:5000/) for enkel testing
  app.get("/", (req, res) => {
    res.json({ message: "Backend running locally!" });
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
