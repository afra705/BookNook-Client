"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const AddBookForm = () => {
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please login first to add a book.");
      return;
    }

    setLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const data = Object.fromEntries(formData.entries());

      const bookData = {
        ...data,
        totalCopies: Number(data.totalCopies),

        addedBy: {
          name: session.user.name,
          email: session.user.email,
        },
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add book");
      }

      toast.success("Book added successfully!");

      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[#DADFD5] bg-white px-4 py-3 text-sm text-[#283D32] outline-none transition placeholder:text-[#A0A99F] focus:border-[#879878] focus:ring-2 focus:ring-[#879878]/20";

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5ED]">
        <p className="text-[#283D32]">Loading...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5ED] px-4">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-[#283D32]">
            Login Required
          </h2>

          <p className="mt-2 text-sm text-[#68736A]">
            Please login to add a new book.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F8F5ED] px-4 py-12">

      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <div className="mb-10 text-center">

          <span className="text-sm font-semibold uppercase tracking-[3px] text-[#C8795B]">
            BookNook Library
          </span>

          <h1 className="mt-3 text-3xl font-bold text-[#283D32] sm:text-4xl">
            Add a New Book
          </h1>

          <p className="mt-3 text-sm text-[#68736A]">
            Share your favorite books with our reading community.
          </p>

        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-[#E7E4D9] bg-[#FFFDF8] p-6 shadow-sm sm:p-9">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-[#283D32]"
              >
                Book Title *
              </label>

              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter book title"
                className={inputClass}
                required
              />
            </div>

            {/* Author */}
            <div>
              <label
                htmlFor="author"
                className="mb-2 block text-sm font-semibold text-[#283D32]"
              >
                Author Name *
              </label>

              <input
                type="text"
                id="author"
                name="author"
                placeholder="Enter author name"
                className={inputClass}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-[#283D32]"
              >
                Category *
              </label>

              <select
                id="category"
                name="category"
                className={inputClass}
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a category
                </option>

                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Kids">Kids</option>
                <option value="Others">Others</option>

              </select>
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-semibold text-[#283D32]"
              >
                Book Image URL *
              </label>

              <input
                type="url"
                id="image"
                name="image"
                placeholder="https://example.com/book-image.jpg"
                className={inputClass}
                required
              />
            </div>

            {/* Total Copies */}
            <div>
              <label
                htmlFor="totalCopies"
                className="mb-2 block text-sm font-semibold text-[#283D32]"
              >
                Total Copies *
              </label>

              <input
                type="number"
                id="totalCopies"
                name="totalCopies"
                placeholder="Enter available copies"
                min="0"
                className={inputClass}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-[#283D32]"
              >
                Book Description *
              </label>

              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Write something about this book..."
                className={`${inputClass} resize-none`}
                required
              />
            </div>

            {/* Added By */}
            <div className="rounded-xl border border-[#E7E4D9] bg-[#F8F5ED] p-4">

              <p className="mb-2 text-sm font-semibold text-[#283D32]">
                Added By
              </p>

              <p className="text-sm text-[#68736A]">
                Name: {session.user.name}
              </p>

              <p className="mt-1 text-sm text-[#68736A]">
                Email: {session.user.email}
              </p>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#283D32] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#3C5545] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Adding Book..." : "Add Book"}
            </button>

          </form>

        </div>

      </div>

    </section>
  );
};

export default AddBookForm;