"use client";

import { useState } from "react";
import NavBar from "@/app/components/navbar/page";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body || !author) {
      alert("All fields are required");
      return;
    }

    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, userId: author }),
    });

    if (res.ok) {
      alert("Post created successfully");
      setTitle("");
      setBody("");
      setAuthor("");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto py-6 px-6">
        <h1 className="text-2xl font-bold my-3">Create New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 bg-black text-white"
              required
            />
          </div>
          <div>
            <label className="block">Content</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border p-2  bg-black text-white"
              required
            />
          </div>
          <div>
            <label className="block">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border p-2  bg-black text-white"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}
