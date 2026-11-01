import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
}

interface BookCardProps {
  book: Book;
}

/**
 * Shared catalogue card used by the home page and the books listing.
 * The whole card is the link, so there is no nested interactive content.
 */
export default function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/books/${book._id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E7E4D9] bg-[#FFFDF8] shadow-[0_2px_10px_-6px_rgba(40,61,50,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#879878]/70 hover:shadow-[0_28px_50px_-28px_rgba(40,61,50,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8795B]"
    >
      {/* Cover stage */}
      <div className="relative flex h-72 items-center justify-center overflow-hidden bg-gradient-to-b from-[#E9ECDF] via-[#EFEEE6] to-[#F4F1E8] px-6 pt-7">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(#CBD3BF 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        {/* Arch matte echoing the banner display */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 h-[78%] w-[56%] -translate-x-1/2 rounded-t-full bg-[#F8F5ED]/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
        />

        {/* Shelf line */}
        <div
          aria-hidden="true"
          className="absolute inset-x-6 bottom-0 h-px bg-[#283D32]/10"
        />

        <span className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-[#E7E4D9] bg-[#FFFDF8]/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#283D32] shadow-sm backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C8795B]" />
          {book.category}
        </span>

        {/* Monogram fallback while a cover loads (or if it fails) */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-4 top-10 flex items-center justify-center font-serif text-7xl font-bold text-[#283D32]/10"
        >
          {book.title.charAt(0).toUpperCase()}
        </span>

        <img
          src={book.image}
          alt=""
          decoding="async"
          className="relative z-10 max-h-full max-w-full object-contain pb-4 drop-shadow-[0_18px_18px_rgba(40,61,50,0.18)] transition-transform duration-500 ease-out group-hover:-rotate-1 group-hover:scale-[1.05]"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 font-serif text-xl font-bold leading-snug text-[#283D32] transition-colors duration-300 group-hover:text-[#C8795B]">
          {book.title}
        </h3>

        <p className="mt-1.5 text-sm text-[#68736A]">By {book.author}</p>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between border-t border-[#E7E4D9] pt-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#879878]">
              View details
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#283D32]/20 text-[#283D32] transition-all duration-300 group-hover:border-[#283D32] group-hover:bg-[#283D32] group-hover:text-[#F8F5ED]">
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
