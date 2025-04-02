"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Book Title and Author are required.",
        confirmButtonColor: "#3085d6",
      });
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
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Book added successfully!",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          router.push("/");
        });
      } else {
        throw new Error("Failed to create a book");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong!",
      });
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
