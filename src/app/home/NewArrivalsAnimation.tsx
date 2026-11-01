
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface NewArrivalsAnimationProps {
  children: ReactNode;
  type: "heading" | "grid" | "card";
}

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

export default function NewArrivalsAnimation({
  children,
  type,
}: NewArrivalsAnimationProps) {
  if (type === "grid") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {children}
      </motion.div>
    );
  }

  if (type === "card") {
    return (
      <motion.div
        variants={cardVariants}
        whileHover={{
          y: -8,
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 0.98 }}
        className="h-full"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
