import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";  // Ensure these are imported
import mongoose from "mongoose";
import app from "../index.js"; // Importer serveren

describe("API Tests for Posts", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close(); // Lukker DB-tilkobling etter test
  });

  it("Henter alle innlegg (GET /api/posts)", async () => {
    const res = await request(app).get("/api/posts");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Oppretter et nytt innlegg (POST /api/posts)", async () => {
    const newPost = { title: "Testinnlegg", content: "Dette er en test", authorId: "12345" };
    const res = await request(app).post("/api/posts").send(newPost);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toBe("Testinnlegg");
  });
});
