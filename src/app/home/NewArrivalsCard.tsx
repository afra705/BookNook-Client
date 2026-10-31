import Link from "next/link";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
}

const NewArrivalsPage = async () => {
  const res = await fetch(`http://localhost:5000/new-arrivals`, {
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
    <div className="mb-12 text-center">
      <span className="text-sm font-semibold uppercase tracking-[3px] text-[#C8795B]">
        Fresh From Our Shelves
      </span>

      <h2 className="mt-3 text-3xl font-bold text-[#283D32] sm:text-4xl">
        New Arrivals
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#68736A] sm:text-base">
        Explore our latest collection of books and discover your next great read.
        Your next favorite story might be waiting here.
      </p>
    </div>

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
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <div
            key={book._id}
            className="overflow-hidden rounded-2xl border border-[#E7E4D9] bg-[#FFFDF8] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Book Image */}
            <div className="h-64 w-full bg-[#f1efea]">
              <img
                src={book.image}
                alt={book.title}
                className="h-full w-full object-contain p-4"
              />
            </div>

            {/* Book Details */}
            <div className="p-5">
              <span className="rounded-full bg-[#879878]/15 px-3 py-1 text-xs font-semibold text-[#283D32]">
                {book.category}
              </span>

              <h3 className="mt-4 line-clamp-1 text-xl font-bold text-[#283D32]">
                {book.title}
              </h3>

              <p className="mt-2 text-sm text-[#68736A]">
                By {book.author}
              </p>

              {/* View Details */}
              <Link
                href={`/books/${book._id}`}
                className="mt-5 block w-full rounded-lg bg-[#283D32] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#879878]"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* See All Books Button */}
    <div className="mt-12 text-center">
      <Link
        href="/books"
        className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#283D32] px-8 py-3 text-sm font-semibold text-[#283D32] transition duration-300 hover:bg-[#283D32] hover:text-white"
      >
        See All Books
        <span aria-hidden="true">→</span>
      </Link>
    </div>

  </div>
</section>

  );
};

export default NewArrivalsPage;
