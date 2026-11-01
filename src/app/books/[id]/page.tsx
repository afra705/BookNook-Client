import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Link from "next/link";
import { ArrowLeft, BookOpen, User, Copy } from "lucide-react";
import BorrowModal from "@/components/BorrowModal";


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
  totalCopies: number;
  addedBy?: string | Person;
  createdBy?: string | Person;
  owner?: string | Person;
}

interface BookDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

const getPersonName = (person : string | Person | undefined) => {
  if (!person) return undefined;
  if (typeof person === "string") return person;
  return person.name || person.email;
};

const getPersonEmail = (person : string | Person | undefined)=>{
    if(!person || typeof person === "string") return undefined;
    return person.email;
}

const BookDetails = async ({ params }: BookDetailsProps) => {

   
  const session = await auth.api.getSession({
    headers: await headers(),
  });

   if (!session) {
    redirect("/login");
  }

  const userName = session.user.name;
  const userEmail = session.user.email;


  const { id } = await params;

  const res = await fetch(`http://localhost:5000/books/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch book");
  }
 

  const book: Book = await res.json();

  // if user already exists
  const borrowRes = await fetch(
  `http://localhost:5000/my-borrows/${(userEmail)}`,
  { cache: "no-store" }
  );
  const borroWBooks = await borrowRes.json();
  
const alreadyBorrowed = borroWBooks.some(
  (borrow: { bookId: string }) => borrow.bookId === book._id
);

  const addedBy =
    getPersonName(book.addedBy) ??
    getPersonName(book.createdBy) ??
    "BookNook Library";

const addedByEmail = 
    getPersonEmail(book.addedBy)??
    getPersonEmail(book.createdBy)??
    'booknook@gmail.com'


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
          {/* Book Cover */}
          <div className="flex min-h-[360px] items-center justify-center bg-[#f1efea] p-8 lg:min-h-full">
            <img
              src={book.image}
              alt={`Cover of ${book.title}`}
              className="max-h-[520px] w-full max-w-[320px] rounded-xl object-contain shadow-lg"
            />
          </div>

          {/* Book Details */}
          <div className="flex flex-col p-6 sm:p-9 lg:p-10">
            <span className="w-fit rounded-full bg-[#879878]/15 px-3 py-1 text-xs font-semibold text-[#283D32]">
              {book.category}
            </span>

            <h1 className="mt-4 text-3xl font-bold leading-tight text-[#283D32] sm:text-4xl">
              {book.title}
            </h1>

            <p className="mt-3 text-base text-[#68736A]">
              By{" "}
              <span className="font-semibold text-[#283D32]">
                {book.author}
              </span>
            </p>

            {/* Description */}
            <div className="mt-8 border-t border-[#E7E4D9] pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-[2px] text-[#C8795B]">
                About this book
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#68736A] sm:text-base sm:leading-8">
                {book.description}
              </p>
            </div>

            {/* Added By & Total Copies */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {/* Added By */}

          {/* Added By */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#E7E4D9] bg-[#F8F5ED] p-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#283D32] text-[#FFFDF8]">
            <User size={20} />
          </div>

          <div className="min-w-0">
            <p className="text-sm text-[#77786F]">Added By</p>

            <p className="mt-1 font-semibold text-[#283D32]">
              {addedBy}
            </p>

            {addedByEmail && (
              <p className="mt-1 break-all text-xs text-[#68736A]">
                {addedByEmail}
              </p>
            )}
          </div>
        </div>


              {/* Total Copies */}
              <div className="flex items-center gap-3 rounded-2xl border border-[#E7E4D9] bg-[#F8F5ED] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C8795B] text-white">
                  <Copy size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#879878]">
                    Total Copies
                  </p>

                  <p className="mt-1 font-semibold text-[#283D32]">
                    {book.totalCopies ?? 0}{" "}
                    <span className="text-sm font-normal text-[#68736A]">
                      {book.totalCopies === 1 ? "copy" : "copies"}
                    </span>
                  </p>

                  {book.totalCopies > 0 ? (
                    <p className="mt-1 text-xs font-medium text-green-700">
                      Available
                    </p>
                  ) : (
                    <p className="mt-1 text-xs font-medium text-red-600">
                      Not Available
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Borrow Button */}
          <div className="mt-auto pt-8">
            {alreadyBorrowed ? (
              <button
                disabled
              className="flex h-12 w-50 items-center justify-center gap-2 rounded-xl bg-[#969c99] font-semibold text-[#2a4132] transition-colors hover:bg-[#919291]"
              >
                <BookOpen className="mr-2 inline h-5 w-5" />
                Already Borrowed
              </button>
            ) : book.totalCopies > 0 ? (
              <BorrowModal
                bookId={book._id}
                userName={userName}
                userEmail={userEmail}
                bookTitle={book.title}
                image={book.image}
              />
            ) : (
              <button
                disabled
                className="h-12 w-full cursor-not-allowed rounded-xl bg-gray-200 font-semibold text-gray-500"
              >
                <BookOpen className="mr-2 inline h-5 w-5" />
                Not Available
              </button>
            )}
          </div>

          </div>
        </article>
      </div>
    </section>
  );
};

export default BookDetails;
