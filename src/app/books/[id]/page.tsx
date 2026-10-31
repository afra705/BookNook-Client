import Link from "next/link";
import { ArrowLeft, BookOpen, User } from "lucide-react";

interface Person {
  name?: string;
  email?: string;
}

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  addedBy?: string | Person;
  createdBy?: string | Person;
  owner?: string | Person;
}

interface BookDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

// The API does not always include the adder, so support the common field names.
const getPersonName = (person: string | Person | undefined) => {
  if (!person) return undefined;
  if (typeof person === "string") return person;
  return person.name || person.email;
};

const BookDetails = async ({ params }: BookDetailsProps) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/books/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch book");
  }

  const book: Book = await res.json();

  const addedBy =
    getPersonName(book.addedBy) ??
    getPersonName(book.createdBy) ??
    getPersonName(book.owner) ??
    "BookNook Library";

  return (
    <section className="min-h-screen bg-[#F8F5ED] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#283D32] transition hover:text-[#C8795B]"
        >
          <ArrowLeft size={18} />
          Back to All Books
        </Link>

        <article className="mt-6 grid overflow-hidden rounded-3xl border border-[#E7E4D9] bg-[#FFFDF8] shadow-sm lg:grid-cols-[minmax(0,420px)_1fr]">
          {/* Book cover */}
          <div className="flex min-h-[360px] items-center justify-center bg-[#f1efea] p-8 lg:min-h-full">
            <img
              src={book.image}
              alt={`Cover of ${book.title}`}
              className="max-h-[520px] w-full max-w-[320px] rounded-xl object-contain shadow-lg"
            />
          </div>

          {/* Book details */}
          <div className="flex flex-col p-6 sm:p-9 lg:p-10">
            <span className="w-fit rounded-full bg-[#879878]/15 px-3 py-1 text-xs font-semibold text-[#283D32]">
              {book.category}
            </span>

            <h1 className="mt-4 text-3xl font-bold leading-tight text-[#283D32] sm:text-4xl">
              {book.title}
            </h1>

            <p className="mt-3 text-base text-[#68736A]">
              By <span className="font-semibold text-[#283D32]">{book.author}</span>
            </p>

            <div className="mt-8 border-t border-[#E7E4D9] pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-[2px] text-[#C8795B]">
                About this book
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#68736A] sm:text-base sm:leading-8">
                {book.description}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#E7E4D9] bg-[#F8F5ED] p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#283D32] text-[#FFFDF8]">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[2px] text-[#879878]">
                  Added by
                </p>
                <p className="mt-1 font-semibold text-[#283D32]">{addedBy}</p>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#283D32] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#879878] hover:shadow-lg sm:w-auto"
              >
                <BookOpen size={18} />
                Borrow This Book
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default BookDetails;
