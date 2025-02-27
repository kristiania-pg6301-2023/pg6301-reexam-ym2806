import React, { useEffect, useState } from "react";
import "./Home.css";

const API_BASE_URL = "https://pg6301-app-271305e16ae4.herokuapp.com/api";

function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/posts`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Feil ved henting:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !author) {
      alert("Alle felt må fylles ut");
      return;
    }

    const newPost = { title, content, authorId: author };

    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const savedPost = await response.json();
        setPosts([...posts, savedPost]);
        setTitle("");
        setContent("");
        setAuthor("");
      } else {
        alert("Kunne ikke lagre innlegget");
      }
    } catch (error) {
      console.error("Feil ved lagring av innlegg:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/posts/${id}`, { method: "DELETE" });
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Feil ved sletting av innlegg:", error);
    }
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <h2>The exam-gram</h2>
      </nav>

      {/* Main content */}
      <div className="content">
        <h1>Velkommen til hjemmesiden!</h1>

        {/* Post creation form */}
        <div className="form-container">
          <h2>Opprett et nytt innlegg</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Tittel" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Innhold" value={content} onChange={(e) => setContent(e.target.value)} required />
            <input type="text" placeholder="Forfatter-ID" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            <button type="submit" className="publish-btn">Publiser</button>
          </form>
        </div>

        {/* Posts display */}
        <div className="posts-container">
          <h2>Innlegg</h2>
          {posts.length === 0 ? <p>Ingen innlegg ennå. Vær den første til å skrive!</p> : null}
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <button className="delete-btn" onClick={() => handleDelete(post._id)}>Slett</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
