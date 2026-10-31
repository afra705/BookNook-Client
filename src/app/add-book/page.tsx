'use client'
import React from "react";

const AddBookForm = () => {
      const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

       const res = await fetch(`http://localhost:5000/books`,{
          method: 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(data)
       })
       const result = await res.json();
       console.log(result);
       
    };
  return (
    <section className="min-h-screen bg-[#F8F5ED] px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <span className="text-sm font-semibold uppercase tracking-[3px] text-[#C8795B]">
            BookNook Library
          </span>

          <h1 className="mt-3 text-3xl font-bold text-[#283D32] sm:text-4xl">
            Add a New Book
          </h1>

          <p className="mt-3 text-sm text-[#68736A]">
            Share a new story with our reading community.
          </p>
        </div>

        {/* Form */}
    <div className="rounded-2xl border border-[#E7E4D9] bg-[#f1efea] p-6 shadow-sm sm:p-9">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Book Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-[#283D32]"
              >
                Book Title
              </label>

              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter book title"
                required
                className="w-full rounded-lg border border-[#DADFD5] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#879878] focus:ring-2 focus:ring-[#879878]/20"
              />
            </div>

            {/* Author and Category */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="author"
                  className="mb-2 block text-sm font-semibold text-[#283D32]"
                >
                  Author Name
                </label>

                <input
                  id="author"
                  type="text"
                  name="author"
                  placeholder="Enter author name"
                  required
                  className="w-full rounded-lg border border-[#DADFD5] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#879878] focus:ring-2 focus:ring-[#879878]/20"
                />
              </div>
              {/* Total Copies */}
            <div>
              <label
                htmlFor="totalCopies"
                className="mb-2 block text-sm font-semibold text-[#283D32]"
              >
                Total Copies
              </label>

              <input
                id="totalCopies"
                type="number"
                name="totalCopies"
                min="0"
                step="1"
                placeholder="Enter total copies"
                required
                className="w-full rounded-lg border border-[#DADFD5] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#879878] focus:ring-2 focus:ring-[#879878]/20"
              />
            </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-[#283D32]"
                >
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  defaultValue=""
                  required
                  className="w-full rounded-lg border border-[#DADFD5] bg-white px-4 py-3 text-sm text-gray-500 outline-none transition focus:border-[#879878] focus:ring-2 focus:ring-[#879878]/20"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Fiction">Fiction</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Kids">Kids</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-semibold text-[#283D32]"
              >
                Book Cover Image URL
              </label>

              <input
                id="image"
                type="url"
                name="image"
                placeholder="https://example.com/book-cover.jpg"
                required
                className="w-full rounded-lg border border-[#DADFD5] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#879878] focus:ring-2 focus:ring-[#879878]/20"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-[#283D32]"
              >
                Book Description
              </label>

              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Write a short description about the book..."
                required
                className="w-full resize-none rounded-lg border border-[#DADFD5] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#879878] focus:ring-2 focus:ring-[#879878]/20"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#283D32] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#879878]"
            >
              Add Book
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddBookForm;
