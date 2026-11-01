import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <main className="min-h-screen bg-[#F8F5ED]">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-5">
            <Skeleton className="h-5 w-36 bg-[#e7e4d9]" />
            <Skeleton className="h-12 w-full max-w-lg bg-[#e7e4d9]" />
            <Skeleton className="h-6 w-4/5 bg-[#e7e4d9]" />
            <Skeleton className="h-6 w-3/5 bg-[#e7e4d9]" />

            <div className="flex gap-3 pt-3">
              <Skeleton className="h-12 w-36 rounded-lg bg-[#e7e4d9]" />
              <Skeleton className="h-12 w-32 rounded-lg bg-[#e7e4d9]" />
            </div>
          </div>

          <Skeleton className="h-64 w-full rounded-2xl bg-[#e7e4d9] md:h-80" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-7 space-y-3">
          <Skeleton className="mx-auto h-8 w-52 bg-[#e7e4d9]" />
          <Skeleton className="mx-auto h-4 w-72 max-w-full bg-[#e7e4d9]" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#E7E4D9] bg-[#FFFDF8] p-5"
            >
              <Skeleton className="mx-auto mb-4 h-14 w-14 rounded-full bg-[#e7e4d9]" />
              <Skeleton className="mx-auto h-5 w-24 bg-[#e7e4d9]" />
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div className="space-y-3">
            <Skeleton className="h-8 w-48 bg-[#e7e4d9]" />
            <Skeleton className="h-4 w-64 max-w-full bg-[#e7e4d9]" />
          </div>
          <Skeleton className="h-9 w-24 rounded-lg bg-[#e7e4d9]" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-[#E7E4D9] bg-[#FFFDF8]"
            >
              <Skeleton className="h-56 w-full rounded-none bg-[#e7e4d9]" />

              <div className="space-y-3 p-5">
                <Skeleton className="h-5 w-24 bg-[#e7e4d9]" />
                <Skeleton className="h-6 w-4/5 bg-[#e7e4d9]" />
                <Skeleton className="h-4 w-2/5 bg-[#e7e4d9]" />
                <Skeleton className="h-10 w-full rounded-lg bg-[#e7e4d9]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 space-y-3">
          <Skeleton className="h-8 w-52 bg-[#e7e4d9]" />
          <Skeleton className="h-4 w-72 max-w-full bg-[#e7e4d9]" />
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#E7E4D9] bg-[#FFFDF8] p-4"
            >
              <Skeleton className="h-48 w-full bg-[#e7e4d9]" />
              <Skeleton className="mt-4 h-5 w-4/5 bg-[#e7e4d9]" />
              <Skeleton className="mt-3 h-4 w-2/3 bg-[#e7e4d9]" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Loading;