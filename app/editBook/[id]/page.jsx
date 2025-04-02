"use client";

import EditBookForm from "@/components/EditBookForm";
import { use, useEffect, useState } from "react";

export default function EditBook({ params }) {
  const { id } = use(params); 
  const [books, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`, {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });
     
        if (!res.ok) {
          throw new Error("Failed to fetch book");
        }

        const bookData = await res.json(); 

        setBook(bookData);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  if (!books) return <p>Loading...</p>;
  return (
  

      <EditBookForm id={id} title={books.title} author={books.author} />
   
  );
}
