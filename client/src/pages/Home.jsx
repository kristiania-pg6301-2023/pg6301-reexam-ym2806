import React, { useEffect, useState } from "react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
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
      const response = await fetch("http://localhost:5000/api/posts", {
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
      await fetch(`http://localhost:5000/api/posts/${id}`, { method: "DELETE" });
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Feil ved sletting av innlegg:", error);
    }
  };

  return (
    <div>
      <h1>Velkommen til hjemmesiden!</h1>

      <h2>Opprett et nytt innlegg</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Tittel" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Innhold" value={content} onChange={(e) => setContent(e.target.value)} required />
        <input type="text" placeholder="Forfatter-ID" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <button type="submit">Publiser</button>
      </form>

      <h2>Innlegg</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleDelete(post._id)}>Slett</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
