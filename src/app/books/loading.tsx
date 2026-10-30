import React from "react";
import { BookOpen } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F8F5ED]">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#879878]/20 border-t-[#283D32]" />

        <BookOpen className="h-9 w-9 text-[#283D32]" />
      </div>

      <h2 className="mt-6 text-xl font-semibold text-[#283D32]">
        Loading Books...
      </h2>

      <p className="mt-2 text-sm text-[#879878]">
        Preparing your next reading adventure.
      </p>
    </div>
  );
};

export default Loading;