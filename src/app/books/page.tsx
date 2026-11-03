import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BookCard, { type Book } from "@/components/BookCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Books",
};
interface BooksPageProps {
  searchParams: Promise<{
    category?: string | string[];
  }>;
}

const BooksPage = async ({ searchParams }: BooksPageProps) => {
  const params = await searchParams;
  const categoryParam = Array.isArray(params.category)
    ? params.category[0]
    : params.category;
  const selectedCategory = categoryParam?.trim() || "";
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const books: Book[] = await res.json();

  const filteredBooks = selectedCategory
    ? books.filter(
        (book) =>
          book.category?.trim().toLowerCase() ===
          selectedCategory.toLowerCase()
      )
    : books;


  return (
    <section className="min-h-screen bg-[#F8F5ED] px-4 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-[3px] text-[#C8795B]">
            BookNook Library
          </span>

          <h1 className="mt-3 text-3xl font-bold text-[#283D32] sm:text-4xl">
            Explore Our Books
          </h1>

          <p className="mt-3 text-sm text-[#68736A]">
            Discover your next favorite book from our collection.
          </p>
        </div>

        {/* Active Category Filter */}
        {selectedCategory && (
          <div className="mb-8 flex flex-col items-center justify-between gap-3 rounded-2xl border border-[#E7E4D9] bg-[#FFFDF8] px-5 py-4 sm:flex-row">
            <p className="text-sm text-[#68736A]">
              Showing{" "}
              <span className="font-semibold text-[#283D32]">
                {selectedCategory}
              </span>{" "}
              books
              <span className="ml-2 text-[#879878]">
                ({filteredBooks.length})
              </span>
            </p>

            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#283D32] transition hover:text-[#C8795B]"
            >
              View All Books
              <ArrowRight size={17} />
            </Link>
          </div>
        )}

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="py-16 text-center">
            <h2 className="text-xl font-semibold text-[#283D32]">
              {selectedCategory
                ? `No ${selectedCategory} Books Available`
                : "No Books Available"}
            </h2>
            <p className="mt-2 text-sm text-[#68736A]">
              {selectedCategory
                ? "Try another category or browse our full collection."
                : "Add some books to explore our collection."}
            </p>

            {selectedCategory && (
              <Link
                href="/books"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#283D32] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#879878]"
              >
                View All Books
                <ArrowRight size={17} />
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}

          </div>
        )}
      </div>
    </section>
  );
};

export default BooksPage;
