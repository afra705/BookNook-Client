"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Home } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <main className="flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#F8F5ED] px-4 py-16">
      <div className="mx-auto w-full max-w-xl text-center">

        {/* Book Illustration */}
        <motion.div
          initial={{ opacity: 0, y: -30, rotate: -15 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto mb-8 flex h-48 w-48 items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-[#879878]/15" />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex h-36 w-36 items-center justify-center rounded-2xl bg-[#283D32] shadow-xl"
          >
            <BookOpen
              size={76}
              strokeWidth={1.3}
              className="text-[#F8F5ED]"
            />
          </motion.div>

          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute right-2 top-2 text-5xl font-bold text-[#C8795B]"
          >
            ?
          </motion.span>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="text-sm font-semibold uppercase tracking-[4px] text-[#C8795B]">
            BookNook Library
          </span>

          <h1 className="mt-4 text-7xl font-extrabold text-[#283D32] sm:text-8xl">
            404
          </h1>

          <h2 className="mt-4 text-2xl font-bold text-[#283D32] sm:text-3xl">
            Oops! Page Not Found
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#68736A] sm:text-base">
            Looks like this page has gone missing from our bookshelf.
            Don&apos;t worry, there are plenty of wonderful books waiting for you!
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#283D32] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#879878]"
          >
            <Home size={17} />
            Back to Home
          </Link>

          <Link
            href="/books"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#283D32] px-6 py-3 text-sm font-semibold text-[#283D32] transition hover:bg-[#E9EDE5]"
          >
            Explore Books
            <ArrowRight size={17} />
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-xs text-[#879878]"
        >
          Every page has a story. Let&apos;s find yours!
        </motion.p>
      </div>
    </main>
  );
};

export default NotFound;