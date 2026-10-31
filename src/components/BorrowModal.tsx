"use client";

import { useState } from "react";
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

interface BorrowModalProps {
  userName: string;
  userEmail: string;
  bookTitle: string;
}

export default function BorrowModal({
  userName,
  userEmail,
  bookTitle,
}: BorrowModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBorrow = async () => {
    setLoading(true);

    // Borrow API integration will be added here.
    console.log({
      userName,
      userEmail,
      bookTitle,
    });

    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
   <DialogTrigger >
  <Button className="w-full h-12 rounded-xl bg-[#283D32] text-white font-semibold shadow-lg hover:bg-[#3b624e] transition-all duration-300">
    <BookOpen className="mr-2 h-5 w-5" />
    Borrow This Book
  </Button>
</DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Borrow This Book</DialogTitle>
          <DialogDescription>
            Confirm your information before borrowing this book.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
         

          <div className="space-y-2">
            <label className="text-sm font-medium">User Name</label>
            <input
              value={userName}
              readOnly
              className="w-full rounded-md border bg-muted px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              value={userEmail}
              readOnly
              className="w-full rounded-md border bg-muted px-3 py-2 text-sm"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button onClick={handleBorrow} disabled={loading}>
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
