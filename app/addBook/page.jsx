"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author) {
      alert("Book Title and Author are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, author }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a book");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Book Title"
      />

      <input
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Book Author"
      />

      <button
        type="submit"
        className="bg-blue-400 hover:bg-blue-600 font-bold text-white py-3 px-6 w-fit"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Book"}
      </button>
    </form>
  );
}
