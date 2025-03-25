"use client";

import { HiOutlineTrash } from "react-icons/hi";

export default function RemoveBtn({ id, onDelete  }) {
  const removeBook = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`/api/books?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete(id);
      }
    }
  };

  return (
    <button onClick={removeBook} className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-600">
      <HiOutlineTrash size={24} />
    </button>
  );
}
