import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getBooks = async () => {
  try {
    const res = await fetch(`/api/books`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }

    return await res.json();
  } catch (error) {
    console.log("Error loading books: ", error);
    return { books: [] }; 
  }
};

export default async function BooksList() {
  const data = await getBooks();
  const books = data?.books ?? []; 
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
                    {index + 1}
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
                    <RemoveBtn id={book._id} />
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
    </div>
  );
}
