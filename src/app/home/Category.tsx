
"use client";

import Link from "next/link";
import {
  BookOpen,
  FlaskConical,
  Landmark,
  Baby,
  BookMarked,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Fiction",
    description: "Discover stories that spark your imagination.",
    icon: BookOpen,
    color: "bg-[#E8EBDD]",
    iconColor: "text-[#283D32]",
  },
  {
    name: "Science",
    description: "Explore discoveries and the wonders of science.",
    icon: FlaskConical,
    color: "bg-[#F5E4D8]",
    iconColor: "text-[#C8795B]",
  },
  {
    name: "History",
    description: "Travel through time and discover our past.",
    icon: Landmark,
    color: "bg-[#E8EBDD]",
    iconColor: "text-[#283D32]",
  },
  {
    name: "Kids",
    description: "Enjoy wonderful stories for young readers.",
    icon: Baby,
    color: "bg-[#F5E4D8]",
    iconColor: "text-[#C8795B]",
  },
  {
    name: "Others",
    description: "Explore more books from different genres.",
    icon: BookMarked,
    color: "bg-[#E8EBDD]",
    iconColor: "text-[#283D32]",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const CategoryPage = () => {
  return (
    <main className="min-h-screen bg-[#F8F5ED]">

      {/* Hero Section */}
      <section className="px-4 pb-12 pt-16 sm:px-6 sm:pt-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-6xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#D9DFD1] bg-white/70 px-4 py-2 text-sm font-medium text-[#283D32]"
          >
            <BookOpen size={16} />
            Explore Our Collection
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-[#283D32] sm:text-5xl lg:text-6xl"
          >
            Find Your Next
            <span className="mt-2 block text-[#C8795B]">
              Favorite Read
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#68736A] sm:text-lg"
          >
            From timeless classics to fascinating discoveries, explore
            our collection and find books that inspire your imagination.
          </motion.p>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">

          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[3px] text-[#C8795B]">
                Browse Categories
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#283D32] sm:text-3xl">
                Explore by Genre
              </h2>
            </div>

            <Link
              href="/books"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#283D32] transition hover:text-[#C8795B]"
            >
              View All Books
              <ArrowRight size={17} />
            </Link>
          </motion.div>

          {/* Category Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <motion.div
                  key={category.name}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.25 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="h-full"
                >
                  <Link
                    href={`/books?category=${encodeURIComponent(category.name)}`}
                    className="group block h-full rounded-2xl border border-[#E7E4D9] bg-[#FFFDF8] p-6 transition duration-300 hover:border-[#879878] hover:shadow-lg"
                  >
                    {/* Category Icon */}
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.12 }}
                      transition={{ duration: 0.3 }}
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${category.color} transition duration-300`}
                    >
                      <Icon
                        size={27}
                        strokeWidth={1.7}
                        className={category.iconColor}
                      />
                    </motion.div>

                    {/* Category Name */}
                    <h3 className="mt-5 text-xl font-bold text-[#283D32]">
                      {category.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 min-h-12 text-sm leading-6 text-[#68736A]">
                      {category.description}
                    </p>

                    {/* Explore Button */}
                    <div className="mt-5 flex items-center justify-between border-t border-[#E7E4D9] pt-4">
                      <span className="text-sm font-medium text-[#879878]">
                        Explore Books
                      </span>

                      <ArrowRight
                        size={18}
                        className="text-[#C8795B] transition-transform duration-300 group-hover:translate-x-2"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default CategoryPage;
