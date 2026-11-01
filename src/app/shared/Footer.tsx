
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  BookOpen,
  Camera,
  Mail,
  MessageCircle,
  Users,
} from "lucide-react";

const exploreLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
  { name: "Add a Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
];

const accountLinks = [
  { name: "Sign In", href: "/sign-in" },
  { name: "Create Account", href: "/sign-up" },
  { name: "My Books", href: "/my-books" },
];

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com", icon: Camera },
  { name: "Community", href: "https://facebook.com", icon: Users },
  { name: "Discussions", href: "https://discord.com", icon: MessageCircle },
  { name: "Email", href: "mailto:hello@booknook.com", icon: Mail },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-auto overflow-hidden bg-[#283D32] text-[#E1E5D9]">
      {/* Soft corner glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#879878]/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Main content */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_0.8fr_1.5fr] lg:gap-8 lg:py-16">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="BookNook Logo"
                width={56}
                height={56}
                className="h-12 w-12 rounded-full bg-[#F8F5ED] object-contain p-1"
              />

              <span className="text-2xl font-bold tracking-tight text-[#FFFDF8]">
                BookNook<span className="text-[#C8795B]">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-[#B9C4B0]">
              A small shelf for big imaginations. Discover stories, share the
              books you love, and keep turning pages.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={
                      social.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      social.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F8F5ED]/15 text-[#D7DFD0] transition duration-300 hover:-translate-y-1 hover:border-[#C8795B] hover:bg-[#C8795B] hover:text-white"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#879878]">
              Explore
            </h3>

            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-[#C9D2C1] transition-colors duration-300 hover:text-[#FFFDF8]"
                  >
                    <span className="h-px w-0 bg-[#C8795B] transition-all duration-300 group-hover:w-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Account */}
          <nav aria-label="Account">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#879878]">
              Account
            </h3>

            <ul className="mt-5 space-y-3">
              {accountLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-[#C9D2C1] transition-colors duration-300 hover:text-[#FFFDF8]"
                  >
                    <span className="h-px w-0 bg-[#C8795B] transition-all duration-300 group-hover:w-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* About BookNook */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#879878]">
              About BookNook
            </h3>

            <p className="mt-5 text-sm leading-7 text-[#B9C4B0]">
              Your cozy corner for discovering wonderful books, exploring new
              ideas, and sharing the joy of reading with a community of book
              lovers.
            </p>

            <Link
              href="/books"
              className="group mt-5 inline-flex items-center gap-2 rounded-xl bg-[#C8795B] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#B86B4F]"
            >
              <BookOpen size={17} />
              Explore Our Books
            </Link>

            <p className="mt-4 flex items-center gap-2 text-xs text-[#879878]">
              <BookOpen size={14} />
              Read · Discover · Repeat
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative flex flex-col items-center justify-between gap-4 border-t border-[#F8F5ED]/10 py-6 sm:flex-row">
          <p className="text-xs text-[#879878]">
            © {new Date().getFullYear()} BookNook. Made for readers.
          </p>

          <div className="flex items-center gap-5">
            <p className="hidden text-xs text-[#879878] sm:block">
              Read · Discover · Repeat
            </p>

            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 text-xs font-semibold text-[#D7DFD0] transition-colors duration-300 hover:text-[#FFFDF8]"
            >
              Back to top

              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#F8F5ED]/20 transition duration-300 group-hover:-translate-y-1 group-hover:border-[#C8795B] group-hover:bg-[#C8795B]">
                <ArrowUp size={14} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Oversized faded wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden"
      >
        <p className="-mb-[0.18em] translate-y-[0.12em] whitespace-nowrap text-center font-serif text-[19vw] font-bold leading-none tracking-tight text-[#F8F5ED]/[0.04]">
          BookNook
        </p>
      </div>
    </footer>
  );
};

export default Footer;
