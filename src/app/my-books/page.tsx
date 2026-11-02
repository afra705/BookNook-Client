import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UpdatePage from "./Update";
import DeletePage from "./Delete";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
}

const MyBooksPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const token = await getTokenFromServer();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-books/${session.user.email}`,
    {
      cache: "no-store",
      headers:{
            authorization: `Bearer ${token}`,
          }
    },
    
  );

  if (!res.ok) {
    throw new Error("Failed to fetch your books");
  }

  const books: Book[] = await res.json();

  return (
    <section className="min-h-screen bg-[#F8F5ED] px-4 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-[3px] text-[#C8795B]">
            BookNook Library
          </span>

          <h1 className="mt-3 text-3xl font-bold text-[#283D32] sm:text-4xl">
            My Books
          </h1>

          <p className="mt-3 text-[#68736A]">
            Manage all the books you have added to our library.
          </p>
        </div>

        {/* Book count */}
        <div className="mb-6 ml-16">
          <p className="font-semibold text-[#283D32]">
            My Collection ({books.length} books)
          </p>
        </div>

        {/* Empty state */}
        {books.length === 0 ? (
          <div className="rounded-2xl border border-[#E7E4D9] bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-bold text-[#283D32]">No Books Found</h2>

            <p className="mt-2 text-sm text-[#68736A]">
              You have not added any books yet.
            </p>
          </div>
        ) : (
          /* Book cards */
          <div className="flex flex-col gap-5">
            {books.map((book) => (
              <article
                key={book._id}
                className="mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-[#E7E4D9] bg-white shadow-sm transition hover:shadow-md sm:flex-row"
              >
                {/* Book Image */}
             {/* Book Image */}
                <div className="h-36 w-full shrink-0 overflow-hidden bg-[#f1efea] sm:h-36 sm:w-32">
                {book.image ? (
                    <img
                    src={book.image}
                    alt={book.title}
                    className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-xs text-[#68736A]">
                    No image
                    </div>
                )}
                </div>

                {/* Book Details */}
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 p-3 sm:flex-row sm:items-center sm:px-4">
                  <div className="min-w-0 flex-1">
                    <span className="rounded-full bg-[#E9EDE5] px-2 py-1 text-[10px] font-semibold text-[#283D32]">
                      {book.category}
                    </span>

                    <h2 className="mt-1.5 truncate text-sm font-bold text-[#283D32]">
                      {book.title}
                    </h2>

                    <p className="mt-1 text-xs text-[#68736A]">
                      By {book.author}
                    </p>

                    <p className="mt-1 line-clamp-1 text-xs text-[#68736A]">
                      {book.description}
                    </p>

                    <p className="mt-1.5 text-xs text-[#283D32]">
                      Total Copies:{" "}
                      <span className="font-semibold">{book.totalCopies}</span>
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 sm:w-20 sm:shrink-0 sm:flex-col">
                    <UpdatePage book={book} />

                    <DeletePage bookId={book._id}/>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyBooksPage;
