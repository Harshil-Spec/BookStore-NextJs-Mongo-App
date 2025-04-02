"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const getBooks = async (page = 1, limit = 5) => {
  try {
    const res = await fetch(`/api/books?page=${page}&limit=${limit}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }

    return await res.json();
  } catch (error) {
    console.error("Error loading books: ", error);
    return { books: [], totalPages: 0, currentPage: 1 };
  }
};

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchBooks = async (page = 1) => {
    const data = await getBooks(page, limit);
    setBooks(data?.books ?? []);
    setTotalPages(data?.totalPages ?? 1);
    setCurrentPage(data?.currentPage ?? 1);
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  // Handle delete and update books state
  const handleDelete = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-0">
      <h2 className="text-center text-2xl font-bold mb-2">Book List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-600 shadow-md">
          <thead>
            <tr className="bg-blue-400 text-white">
              <th className="p-3 border border-gray-600">No.</th>
              <th className="p-3 border border-gray-600">Title</th>
              <th className="p-3 border border-gray-600">Author</th>
              <th className="p-3 border border-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book, index) => (
                <tr key={book._id} className="bg-white hover:bg-gray-200">
                  <td className="p-3 border border-gray-600 text-center">
                    {/* {index + 1} */}
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td className="p-3 text-blue-900 border border-gray-600 text-center">
                    {book.title}
                  </td>
                  <td className="p-3 border border-gray-600 text-center">
                    {book.author}
                  </td>
                  <td className="p-3 border border-gray-400 text-center flex justify-center gap-2">
                    <Link
                      href={`/editBook/${book._id}`}
                      className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      <HiPencilAlt size={22} />
                    </Link>
                    <RemoveBtn id={book._id} title={book.title} onDelete={handleDelete} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-400 px-4 py-2 rounded disabled:opacity-50"
        >
          <GrPrevious/>
        </button>
        <span className="font-bold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-blue-400 px-4 py-2 rounded disabled:opacity-50"
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
}
