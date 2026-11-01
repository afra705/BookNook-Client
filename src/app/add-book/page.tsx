'use client'
import { useState, type ReactNode } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  AlignLeft,
  BookOpen,
  ChevronDown,
  Copy,
  Image as ImageIcon,
  Layers,
  Loader2,
  Plus,
  User,
} from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-[#DADFD5] bg-white py-3 pl-11 pr-4 text-sm text-[#283D32] shadow-[0_1px_2px_rgba(40,61,50,0.04)] outline-none transition placeholder:text-[#9BA79E] hover:border-[#C6CFC1] focus:border-[#879878] focus:ring-4 focus:ring-[#879878]/15";

const iconClass =
  "pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#879878]";

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-semibold text-[#283D32]"
    >
      {children}
    </label>
  );
}

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="text-sm font-bold uppercase tracking-[2px] text-[#283D32]">
        {title}
      </h2>
      <p className="mt-1 text-xs text-[#68736A]">{description}</p>
    </div>
  );
}

const AddBookForm = () => {
  const { data: session, isPending } = authClient.useSession();

  const [imageUrl, setImageUrl] = useState("");
  const [previewError, setPreviewError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const showPreview =
    /^https?:\/\/.+/i.test(imageUrl.trim()) && !previewError;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (isPending || submitting) return;

    if (!session) {
      toast.error("Please login first!");
      return;
    }

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

    try {
      setSubmitting(true);

      const res = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (res.ok) {
        toast.success("Book added successfully!");
        form.reset();
        setImageUrl("");
        setPreviewError(false);
      } else {
        toast.error("Failed to add book!");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F8F5ED] px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
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
        <div className="rounded-3xl border border-[#E7E4D9] bg-[#FFFDF8] p-6 shadow-[0_20px_50px_-30px_rgba(40,61,50,0.45)] sm:p-9">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Book details */}
            <div>
              <SectionTitle
                title="Book details"
                description="The basics readers will see in the catalog."
              />

              <div className="space-y-5">
                {/* Book Title */}
                <div>
                  <FieldLabel htmlFor="title">Book Title</FieldLabel>

                  <div className="group relative">
                    <BookOpen aria-hidden="true" className={iconClass} />

                    <input
                      id="title"
                      type="text"
                      name="title"
                      placeholder="Enter book title"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Author, Category and Total Copies */}
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                  <div>
                    <FieldLabel htmlFor="author">Author Name</FieldLabel>

                    <div className="relative">
                      <User aria-hidden="true" className={iconClass} />

                      <input
                        id="author"
                        type="text"
                        name="author"
                        placeholder="Enter author name"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <FieldLabel htmlFor="category">Category</FieldLabel>

                    <div className="relative">
                      <Layers aria-hidden="true" className={iconClass} />

                      <select
                        id="category"
                        name="category"
                        defaultValue=""
                        required
                        className={`${inputClass} cursor-pointer appearance-none pr-10 text-[#283D32] invalid:text-[#9BA79E]`}
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

                      <ChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#879878]"
                      />
                    </div>
                  </div>

                  <div>
                    <FieldLabel htmlFor="totalCopies">Total Copies</FieldLabel>

                    <div className="relative">
                      <Copy aria-hidden="true" className={iconClass} />

                      <input
                        id="totalCopies"
                        type="number"
                        name="totalCopies"
                        min="0"
                        step="1"
                        placeholder="0"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E0DED2] to-transparent" />

            {/* Cover and description */}
            <div>
              <SectionTitle
                title="Cover & description"
                description="A good cover and short summary help readers pick it up."
              />

              <div className="space-y-5">
                {/* Image URL */}
                <div>
                  <FieldLabel htmlFor="image">Book Cover Image URL</FieldLabel>

                  <div className="relative">
                    <ImageIcon aria-hidden="true" className={iconClass} />

                    <input
                      id="image"
                      type="url"
                      name="image"
                      placeholder="https://example.com/book-cover.jpg"
                      required
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        setPreviewError(false);
                      }}
                      className={inputClass}
                    />
                  </div>

                  {/* Live cover preview */}
                  {showPreview && (
                    <div className="mt-3 flex items-center gap-4 rounded-xl border border-[#E7E4D9] bg-[#F8F5ED] p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl.trim()}
                        alt="Book cover preview"
                        onError={() => setPreviewError(true)}
                        className="h-20 w-14 shrink-0 rounded-md border border-[#E0DED2] bg-white object-cover shadow-sm"
                      />

                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#C8795B]">
                          Cover preview
                        </p>
                        <p className="mt-1 truncate text-sm text-[#68736A]">
                          {imageUrl.trim()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <FieldLabel htmlFor="description">
                    Book Description
                  </FieldLabel>

                  <div className="relative">
                    <AlignLeft
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3.5 top-3.5 h-[18px] w-[18px] text-[#879878]"
                    />

                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      placeholder="Write a short description about the book..."
                      required
                      className={`${inputClass} resize-none pt-3 leading-relaxed`}
                    />
                  </div>

                  <p className="mt-2 text-xs text-[#879878]">
                    Tip: 2–3 sentences about the plot or what makes it special.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-3 pt-1">
              <button
                type="submit"
                disabled={isPending || submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#283D32] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_-15px_rgba(40,61,50,0.9)] transition hover:bg-[#3B5948] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#879878]/35 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                    Adding book...
                  </>
                ) : (
                  <>
                    <Plus aria-hidden="true" className="h-4 w-4" />
                    Add Book
                  </>
                )}
              </button>

              <p className="text-center text-xs text-[#879878]">
                The book will be added to the catalog under your account.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddBookForm;
