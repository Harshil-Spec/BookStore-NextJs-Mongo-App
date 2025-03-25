import connectMongoDB from "@/libs/mongodb";
import Book from "@/models/book";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, author } = await request.json();
  await connectMongoDB();
  await Book.create({ title, author });
  return NextResponse.json({ message: "Book Created" }, { status: 201 });
}

// export async function GET() {
//   await connectMongoDB();
//   const books = await Book.find();
//   return NextResponse.json({ books });
// }
export async function GET(request) {
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
  const limit = parseInt(request.nextUrl.searchParams.get("limit") || "5");
  const skip = (page - 1) * limit;

  await connectMongoDB();
  const books = await Book.find().skip(skip).limit(limit);
  const totalBooks = await Book.countDocuments();

  return NextResponse.json({
    books,
    totalPages: Math.ceil(totalBooks / limit),
    currentPage: page,
  });
}


export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Book.findByIdAndDelete(id);
  return NextResponse.json({ message: "Book deleted" }, { status: 200 });
}
