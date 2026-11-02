"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
}
interface IB{
    book:Book
}

export default function UpdatePage({book}:IB) {
 const router = useRouter()

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

 const handleUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  
  const token = await getTokenFromClient()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${book._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json", 
      authorization: `Bearer ${token}`,

    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (res.ok) {
    toast.success("Book updated successfully!");
    router.push('/my-books')
  } else {
   
      toast.error('"Update failed!"');
  }
  

};




  return (
    <>
      {/* Edit Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-center gap-2 rounded-md bg-[#283D32] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#879878]"
      >
        <Pencil size={14} />
        Edit
      </button>

      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[85vh] w-[90%] overflow-y-auto rounded-2xl border-none bg-[#F8F5ED] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#283D32]">
              Edit Book
            </DialogTitle>

            <DialogDescription className="text-gray-600">
              Update your book information.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate}>
            <div className="space-y-4 py-3">
              {/* Book Title */}
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="text-sm font-semibold text-[#283D32]"
                >
                  Book Title
                </label>

                <Input
                  id="title"
                  name="title"
                  placeholder="Enter book title"
                  defaultValue={book.title}
                  required
                  className="border-[#D8DED3] bg-white focus-visible:ring-[#879878]"
                />
              </div>

              {/* Author */}
              <div className="space-y-2">
                <label
                  htmlFor="author"
                  className="text-sm font-semibold text-[#283D32]"
                >
                  Author
                </label>

                <Input
                  id="author"
                  name="author"
                  placeholder="Enter author name"
                  defaultValue={book.author}
                  required
                  className="border-[#D8DED3] bg-white focus-visible:ring-[#879878]"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="text-sm font-semibold text-[#283D32]"
                >
                  Category
                </label>

                <Input
                  id="category"
                  name="category"
                  placeholder="Enter category"
                  defaultValue={book.category}
                  required
                  className="border-[#D8DED3] bg-white focus-visible:ring-[#879878]"
                />
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="text-sm font-semibold text-[#283D32]"
                >
                  Image URL
                </label>

                <Input
                  id="image"
                  name="image"
                  placeholder={book.image}
                  defaultValue={book.image}
                  required
                  className="border-[#D8DED3] bg-white focus-visible:ring-[#879878]"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-[#283D32]"
                >
                  Description
                </label>

                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter book description"
                  defaultValue={book.description}
                  rows={4}
                  required
                  className="resize-none border-[#D8DED3] bg-white focus-visible:ring-[#879878]"
                />
              </div>
            </div>

            {/* Buttons */}
            <DialogFooter className="flex flex-row justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="border-[#283D32] text-[#283D32]"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="bg-[#283D32] text-white hover:bg-[#879878]"
              >
                {loading ? "Updating..." : "Update Book"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}