"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ReturnBookProps {
  id: string;
}

const ReturnBook = ({ id }: ReturnBookProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReturn = async () => {
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/borrow/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to return book");
        return;
      }

      toast.success("Book returned successfully!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleReturn}
      disabled={loading}
      className="rounded-lg bg-[#283D32] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#3C5545] disabled:opacity-50"
    >
      {loading ? (
        <span className="flex items-center gap-1">
          <Loader2 className="h-3 w-3 animate-spin" />
          Returning...
        </span>
      ) : (
        "Return Book"
      )}
    </button>
  );
};

export default ReturnBook;