import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["anonymous", "registered", "verified"], default: "anonymous" }, // User role
});

export const User = mongoose.model("User", userSchema);
