
"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";


interface BorrowModalProps {
  bookId: string;
  userName: string;
  userEmail: string;
  bookTitle: string;
  image:string
}



export default function BorrowModal({
  bookId,
  userName,
  userEmail,
  bookTitle,
  image
}: BorrowModalProps) {

  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBorrow = async () => {
    setLoading(true);

    try {
      const token = await getTokenFromClient()
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId,
          userName,
          userEmail,
          bookTitle,
          image,
          borrowedAt: new Date(),
          returnDate: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ),
          status: "Borrowed",
        }),
              });

      const data = await res.json();
 
      console.log(data);
      console.log("Book image:", image);
      router.push("");
      if (!res.ok) {
        toast.error(data.message || "Failed to borrow book");
        return;
      }
   

      toast.success("Book borrowed successfully!");
      setOpen(false);
      
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex h-12 w-50 items-center justify-center gap-2 rounded-xl bg-[#283D32] font-semibold text-white transition-colors hover:bg-[#3C5545]">
        
          <BookOpen className="h-5 w-5" />
          <span>Borrow This Book</span>
   
      </DialogTrigger>

      <DialogContent className="border-[#E7E4D9] bg-[#FFFDF8] text-[#283D32] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl font-bold text-[#283D32]">
            Borrow This Book
          </DialogTitle>

          <DialogDescription className="text-[#68736A]">
            Confirm your information before borrowing this book.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-[#283D32]">Book Title</p>
            <p className="rounded-md border border-[#DADFD5] bg-[#F8F5ED] px-3 py-2.5 text-sm text-[#283D32]">
              {bookTitle}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#283D32]">
              User Name
            </label>
            <input
              value={userName}
              readOnly
              className="w-full rounded-md border border-[#DADFD5] bg-[#F1EFE6] px-3 py-2 text-sm text-[#68736A] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#283D32]">
              Email
            </label>
            <input
              value={userEmail}
              readOnly
              className="w-full rounded-md border border-[#DADFD5] bg-[#F1EFE6] px-3 py-2 text-sm text-[#68736A] outline-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
            className="border-[#DADFD5] text-[#283D32] hover:bg-[#F1EFE6] hover:text-[#283D32]"
          >
            Cancel
          </Button>

          <Button
            onClick={handleBorrow}
            disabled={loading}
            className="bg-[#283D32] text-white hover:bg-[#3C5545]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Borrow"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

