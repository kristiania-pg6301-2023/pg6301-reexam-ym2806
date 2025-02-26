import express from "express";
import { User } from "../models/User.js"; // ✅ Import correctly

const router = express.Router();

// Get all users (for debugging)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Kunne ikke hente brukere" });
  }
});

// Create a new user (Signup)
router.post("/", async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: "Brukernavn og e-post er påkrevd" });
  }
  try {
    const newUser = new User({ username, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Kunne ikke opprette bruker" });
  }
});

export default router; // ✅ Correct ES module export
