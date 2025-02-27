import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../client/pages/Home";
import { vi } from "vitest";

// Mock API
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ _id: "1", title: "Test Post", content: "This is a test" }]),
  })
);

describe("Home Component", () => {
  it("renders the homepage", async () => {
    render(<Home />);
    expect(screen.getByText("Velkommen til hjemmesiden!")).toBeInTheDocument();
  });

  it("renders a list of posts", async () => {
    render(<Home />);
    const post = await screen.findByText("Test Post");
    expect(post).toBeInTheDocument();
  });

  it("submits a new post", async () => {
    render(<Home />);
    
    fireEvent.change(screen.getByPlaceholderText("Tittel"), { target: { value: "New Post" } });
    fireEvent.change(screen.getByPlaceholderText("Innhold"), { target: { value: "This is a new test post" } });
    fireEvent.change(screen.getByPlaceholderText("Forfatter-ID"), { target: { value: "12345" } });

    fireEvent.click(screen.getByText("Publiser"));
    
    expect(await screen.findByText("New Post")).toBeInTheDocument();
  });
});
