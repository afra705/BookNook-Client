
import Link from "next/link";
import BookCard, { type Book } from "@/components/BookCard";
import NewArrivalsAnimation from "./NewArrivalsAnimation";

const NewArrivalsPage = async () => {
  const res = await fetch("http://localhost:5000/new-arrivals", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const books: Book[] = await res.json();

  return (
    <section className="bg-[#F8F5ED] px-4 py-16">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <NewArrivalsAnimation type="heading">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-[3px] text-[#C8795B]">
              Fresh From Our Shelves
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#283D32] sm:text-4xl">
              New Arrivals
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#68736A] sm:text-base">
              Explore our latest collection of books and discover your next
              great read. Your next favorite story might be waiting here.
            </p>
          </div>
        </NewArrivalsAnimation>

        {/* Books Grid */}
        {books.length === 0 ? (
          <div className="py-16 text-center">
            <h3 className="text-xl font-semibold text-[#283D32]">
              No New Arrivals Yet
            </h3>
            <p className="mt-2 text-sm text-[#68736A]">
              Stay tuned! Exciting new books will be added soon.
            </p>
          </div>
        ) : (
          <NewArrivalsAnimation type="grid">
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <NewArrivalsAnimation key={book._id} type="card">
                  <BookCard book={book} />
                </NewArrivalsAnimation>
              ))}
            </div>
          </NewArrivalsAnimation>
        )}

        {/* See All Books Button */}
        <NewArrivalsAnimation type="heading">
          <div className="mt-12 text-center">
            <Link
              href="/books"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#283D32] px-8 py-3 text-sm font-semibold text-[#283D32] transition duration-300 hover:bg-[#283D32] hover:text-white"
            >
              See All Books
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </NewArrivalsAnimation>

      </div>
    </section>
  );
};

export default NewArrivalsPage;
