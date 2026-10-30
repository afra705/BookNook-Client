"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
    { name: "Add Book", href: "/add-book" },
    { name: "My Books", href: "/my-books" },
    { name: "My Borrows", href: "/my-borrows" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E5E0D5] bg-[#F8F5ED]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
         <Image
            src='/images/logo.png'
            alt="BookNook Logo"
            width={100}
            height={100}
            className="h-14 w-14 object-contain"
            priority
            />

          <span className="text-2xl font-bold tracking-tight text-[#283D32]">
            BookNook<span className="text-[#C8795B]">.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[#555D54] transition-colors hover:bg-[#E6EBDD] hover:text-[#283D32]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Login & Register */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-[#283D32] transition hover:bg-[#E6EBDD]"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-[#283D32] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3C5545]"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-[#283D32] transition hover:bg-[#E6EBDD] lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-[#E5E0D5] bg-[#FFFDF8] px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-[#555D54] transition hover:bg-[#E6EBDD] hover:text-[#283D32]"
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#E5E0D5] pt-4">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-[#283D32] px-4 py-2.5 text-center text-sm font-semibold text-[#283D32] transition hover:bg-[#E6EBDD]"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-[#283D32] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#3C5545]"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;