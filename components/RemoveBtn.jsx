"use client";

import { HiOutlineTrash } from "react-icons/hi";
import Swal from "sweetalert2";

export default function RemoveBtn({ id,title, onDelete  }) {
  const removeBook = async () => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete ${title}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const res = await fetch(`/api/books?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        Swal.fire("Deleted!", "Book has been deleted.", "success", );
        onDelete(id);
      } else {
        Swal.fire("Error!", "Failed to delete the book.", "error");
      }
    }
  };

  return (
    <button onClick={removeBook} className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-600">
      <HiOutlineTrash size={22} />
    </button>
  );
}
