import express from "express";
import { Post } from "../models/Post.js";

const router = express.Router();

// Hent alle innlegg
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Noe gikk galt" });
  }
});

// Opprett et nytt innlegg
router.post("/", async (req, res) => {
  const { title, content, authorId } = req.body;
  if (!title || !content || !authorId) {
    return res.status(400).json({ error: "Alle felt er påkrevd" });
  }
  try {
    const newPost = new Post({ title, content, author: authorId });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Kunne ikke opprette innlegg" });
  }
});

// Rediger innlegg
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Kunne ikke oppdatere innlegget" });
  }
});

// Slett innlegg
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Innlegg slettet" });
  } catch (err) {
    res.status(500).json({ error: "Kunne ikke slette innlegget" });
  }
});

export default router;
