
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen, Calendar } from "lucide-react";
import ReturnBook from "@/components/ReturnBook";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

interface BorrowedBook {
  _id: string;
  bookId: string;
  bookTitle: string;
  userName: string;
  userEmail: string;
  borrowedAt: string;
  returnDate?: string;
  status: string;
  image?: string;
}

const BorrowPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const token = await getTokenFromServer()
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-borrows/${(session.user.email)}`,
    { cache: "no-store",
       headers:{
      authorization: `Bearer ${token}`,
    }
     },
    
  );

  if (!res.ok) {
    throw new Error("Failed to fetch borrowed books");
  }

  const borrowedBooks: BorrowedBook[] = await res.json();

  return (
    <main className="min-h-screen bg-[#F8F5ED] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-[#283D32]">
          My Borrows
        </h1>

        <p className="mt-2 text-sm text-[#68736A]">
          Books you have borrowed from BookNook.
        </p>


{borrowedBooks.length === 0 ? (
  <div className="mt-6 rounded-xl border border-[#E7E4D9] bg-[#FFFDF8] p-10 text-center">
    <BookOpen className="mx-auto h-10 w-10 text-[#879878]" />

    <h2 className="mt-4 text-xl font-semibold text-[#283D32]">
      No borrowed books yet
    </h2>

    <p className="mt-2 text-sm text-[#68736A]">
      Browse books and borrow your first book.
    </p>

    <Link
      href="/books"
      className="mt-5 inline-block rounded-lg bg-[#283D32] px-5 py-2.5 text-sm text-white hover:bg-[#3C5545]"
    >
      Browse Books
    </Link>
  </div>
) : (
  <div className="mt-6">
    <p className="mb-4 text-sm text-[#68736A]">
      Total borrowed books: {borrowedBooks.length}
    </p>

    <div className="overflow-x-auto rounded-xl border border-[#E7E4D9] bg-[#FFFDF8]">
      <table className="w-full min-w-[850px] text-left text-sm">
        <thead className="bg-[#E8EBDD] text-[#283D32]">
          <tr>
            <th className="px-4 py-4 font-semibold">Book</th>
            <th className="px-4 py-4 font-semibold">Book Title</th>
            <th className="px-4 py-4 font-semibold">Borrowed Date</th>
            <th className="px-4 py-4 font-semibold">Return Date</th>
            <th className="px-4 py-4 font-semibold">Status</th>
            <th className="px-4 py-4 font-semibold">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#E7E4D9]">
          {borrowedBooks.map((book) => (
            <tr
              key={book._id}
              className="transition-colors hover:bg-[#F8F5ED]"
            >
              {/* Image */}
              <td className="px-4 py-3">
                <div className="h-16 w-12 overflow-hidden rounded-md bg-[#F1EFE6]">
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.bookTitle}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <BookOpen className="h-6 w-6 text-[#879878]" />
                    </div>
                  )}
                </div>
              </td>

              {/* Title and Borrower */}
              <td className="px-4 py-3">
                <p className="font-semibold text-[#283D32]">
                  {book.bookTitle}
                </p>
                <p className="mt-1 text-xs text-[#68736A]">
                  {book.userName}
                </p>
              </td>

              {/* Borrowed Date */}
              <td className="whitespace-nowrap px-4 py-3 text-[#68736A]">
                {book.borrowedAt
                  ? new Date(book.borrowedAt).toLocaleDateString("en-GB")
                  : "Not set"}
              </td>

              {/* Return Date */}
              <td className="whitespace-nowrap px-4 py-3 text-[#68736A]">
                {book.returnDate
                  ? new Date(book.returnDate).toLocaleDateString("en-GB")
                  : "Not set"}
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <span className="inline-block whitespace-nowrap rounded-full bg-[#E6EBDD] px-3 py-1 text-xs font-medium text-[#283D32]">
                  {book.status}
                </span>
              </td>

              {/* Action */}
              <td className="px-4 py-3">
                <ReturnBook id={book._id}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

      </div>
    </main>
  );
};

export default BorrowPage;
