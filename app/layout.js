import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextJs+MongoDB CRUD App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="max-w-3xl mx-auto p-4">
            {/* Welcome to Book Store Application */}
            <Navbar />
            <div className="mt-8">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
