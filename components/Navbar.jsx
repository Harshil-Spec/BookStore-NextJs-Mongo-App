import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-400 px-8 py-3 border-b border-[var(--foreground)]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link className="text-xl font-semibold text-[var(--foreground)]" href={"/"}>
              Book Store Next.js App
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton>
                <button className="px-2 py-1 text-sm  bg-white hover:bg-green-300 font-bold text-dark  border dark:border-neutral-700">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="px-2 py-1 text-sm  bg-white hover:bg-green-300 font-bold text-dark  border dark:border-neutral-700">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link
                className="px-2 py-1 text-sm  bg-white hover:bg-green-300 font-bold text-dark  border dark:border-neutral-700"
                href="/addBook"
              >
                Add Books
              </Link>
              {/* <SignOutButton /> */}
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
