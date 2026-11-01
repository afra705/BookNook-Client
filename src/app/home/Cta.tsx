"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const spines = [
  {
    title: "Fiction",
    color: "#283D32",
    text: "#F8F5ED",
    height: "h-44 sm:h-56 lg:h-64",
    rotate: -3,
  },
  {
    title: "History",
    color: "#C8795B",
    text: "#FFFDF8",
    height: "h-56 sm:h-72 lg:h-80",
    rotate: 2,
  },
  {
    title: "Science",
    color: "#879878",
    text: "#283D32",
    height: "h-40 sm:h-52 lg:h-60",
    rotate: -1.5,
  },
  {
    title: "Kids",
    color: "#E8EBDD",
    text: "#283D32",
    height: "h-48 sm:h-64 lg:h-72",
    rotate: 3,
  },
  {
    title: "Poetry",
    color: "#F5E4D8",
    text: "#283D32",
    height: "h-36 sm:h-48 lg:h-56",
    rotate: -2,
  },
];

const marqueeWords = [
  "Turn the page",
  "Stories for every shelf",
  "Read · Discover · Share",
  "Your next chapter",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut" as const,
    },
  },
};

const Cta = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#F8F5ED] px-4 pb-16 pt-20 sm:px-6 sm:pt-24 lg:px-10">
      {/* Faint dotted texture — deliberately lighter than the banner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(#DDE2D4 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

     
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-5 top-24 hidden text-[11px] font-semibold uppercase tracking-[0.45em] text-[#879878] [writing-mode:vertical-rl] lg:block"
      >
        BookNook · Reading Corner
      </span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* ---------- Left: copy ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="lg:pl-8"
        >
          {/* Eyebrow with rule, not a pill badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#879878]"
          >
            <span className="h-px w-8 bg-[#879878]" />
            Open the next chapter
          </motion.div>

          {/* Headline with a hand-drawn underline */}
          <motion.h2
            variants={itemVariants}
            className="mt-6 font-serif text-4xl font-bold leading-[1.1] text-[#283D32] sm:text-5xl lg:text-6xl"
          >
            Your shelf is
            <br />
            <span className="relative inline-block">
              <span className="italic text-[#283D32]">waiting</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 240 22"
                fill="none"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-4 w-full"
              >
                <motion.path
                  d="M3 15C42 5 96 3 146 6c34 2 66 6 91 9"
                  stroke="#C8795B"
                  strokeWidth="7"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.1,
                    delay: 0.55,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </span>
            <span className="text-[#C8795B]">.</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-md text-sm leading-7 text-[#68736A] sm:text-base sm:leading-8"
          >
            Browse the collection for classics and fresh arrivals, or share a
            book you love with the BookNook community. There is always room
            for one more story.
          </motion.p>

          {/* Text links with circular arrows — no pill buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8"
          >
            <Link
              href="/books"
              className="group inline-flex w-fit items-center gap-3 text-sm font-semibold text-[#283D32]"
            >
              <span className="bg-gradient-to-r from-[#C8795B] to-[#C8795B] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]">
                Browse the collection
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#283D32]/25 transition-all duration-300 group-hover:border-[#283D32] group-hover:bg-[#283D32] group-hover:text-[#F8F5ED]">
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:rotate-45"
                />
              </span>
            </Link>

            <Link
              href="/add-book"
              className="w-fit text-sm font-semibold text-[#68736A] underline decoration-[#879878]/50 decoration-2 underline-offset-[6px] transition duration-300 hover:text-[#C8795B] hover:decoration-[#C8795B]"
            >
              Add a book to the shelf
            </Link>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-10 text-xs uppercase tracking-[0.22em] text-[#A4AFA0]"
          >
            Free to explore · New titles every week
          </motion.p>
        </motion.div>

        {/* ---------- Right: animated shelf ---------- */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Soft sage ground shadow */}
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-1/2 h-40 w-4/5 -translate-x-1/2 rounded-full bg-[#879878]/20 blur-3xl"
          />

          {/* Floating tag above the shelf */}
          <motion.div
            initial={{ opacity: 0, y: 14, rotate: -8 }}
            whileInView={{ opacity: 1, y: 0, rotate: -6 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute -top-2 right-2 z-20 inline-flex items-center gap-2 rounded-lg border border-[#E7E4D9] bg-[#FFFDF8] px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#283D32] shadow-md sm:right-6"
          >
            <Sparkles size={14} className="text-[#C8795B]" />
            New this week
          </motion.div>

          {/* Books */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.09 } },
            }}
            className="relative z-10 flex items-end justify-center gap-2 px-2 sm:gap-3 sm:px-6 lg:gap-4"
          >
            {spines.map((spine) => (
              <motion.div
                key={spine.title}
                variants={{
                  hidden: { opacity: 0, y: 70, rotate: 0 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotate: spine.rotate,
                    transition: {
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -16,
                        rotate: 0,
                        transition: { duration: 0.3 },
                      }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                style={{ backgroundColor: spine.color, color: spine.text }}
                className={`group relative w-11 shrink-0 cursor-pointer rounded-t-sm shadow-[0_18px_30px_-18px_rgba(40,61,50,0.55)] sm:w-14 lg:w-16 ${spine.height}`}
              >
                {/* Spine lighting */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1/3 rounded-tl-sm bg-white/10"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-y-2 left-1.5 w-px bg-white/25"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-y-2 right-1.5 w-px bg-black/10"
                />

                {/* Title band */}
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-4 h-px w-1/2 -translate-x-1/2 bg-current opacity-30"
                />

                <span className="pointer-events-none absolute inset-0 flex items-start justify-center pb-5 pt-9 [writing-mode:vertical-rl]">
                  <span className="rotate-180 text-[10px] font-semibold uppercase tracking-[0.3em] sm:text-[11px]">
                    {spine.title}
                  </span>
                </span>

                {/* Bottom label block */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 left-1/2 h-1.5 w-4 -translate-x-1/2 rounded-full bg-current opacity-25"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Shelf plank */}
          <div className="relative z-10 mx-auto mt-1 h-2.5 w-full rounded-full bg-[#283D32] shadow-[0_10px_20px_-8px_rgba(40,61,50,0.6)]">
            <div className="mx-auto h-1 w-1/2 rounded-full bg-[#C8795B]" />
          </div>
          <div className="mx-auto h-6 w-3/4 rounded-b-xl bg-[#283D32]/10" />
        </div>
      </div>

      {/* ---------- Ticker: unique divider, no accent bar ---------- */}
      <div className="relative mt-16 overflow-hidden border-y border-[#E7E4D9] py-4">
        <motion.div
          className="flex w-max items-center gap-8"
          animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map(
            (word, index) => (
              <div key={`${word}-${index}`} className="flex items-center gap-8">
                <span className="whitespace-nowrap font-serif text-xl italic text-[#283D32]/20 sm:text-2xl">
                  {word}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8795B]/40" />
              </div>
            ),
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Cta;
