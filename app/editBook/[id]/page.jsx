import EditBookForm from "@/components/EditBookForm";

const getBookById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch book");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditBook({ params }) {
  const { id } = params;
  const { book } = await getBookById(id);
  const { title, author } = book;

  return <EditBookForm id={id} title={title} author={author} />;
}
