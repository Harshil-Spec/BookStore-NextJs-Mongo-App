import BooksList from "@/components/BooksList";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <SignedIn>
        <BooksList />
      </SignedIn>
      <SignedOut>
        <h1 className="text-3xl font-bold">Please sign In to continue...</h1>
      </SignedOut>
    </>
  );
}
