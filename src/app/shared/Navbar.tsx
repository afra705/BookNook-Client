"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, LogOut, UserCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Navbar = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
    { name: "Add Book", href: "/add-book" },
    { name: "My Books", href: "/my-books" },
    { name: "My Borrows", href: "/my-borrows" },
  ];

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully!");
          setIsOpen(false);
          router.push("/sign-in");
          router.refresh();
        },
        onError: () => {
          toast.error("Logout failed. Please try again.");
        },
      },
    });
  };

  const user = session?.user;

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E5E0D5] bg-[#F8F5ED]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
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

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 lg:flex">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-[#E6EBDD]" />
          ) : user ? (
            <>
              {/* User Info */}
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-[#E6EBDD]"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full border border-[#879878] object-cover"
                  />
                ) : (
                  <UserCircle size={32} className="text-[#283D32]" />
                )}

                <span className="max-w-28 truncate text-sm font-semibold text-[#283D32]">
                  {user.name || "User"}
                </span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 rounded-lg border border-[#C8795B] px-4 py-2.5 text-sm font-semibold text-[#C8795B] transition hover:bg-[#C8795B] hover:text-white"
              >
                <LogOut size={17} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-[#283D32] transition hover:bg-[#E6EBDD]"
              >
                Login
              </Link>

              <Link
                href="/sign-up"
                className="rounded-lg bg-[#283D32] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3C5545]"
              >
                Register
              </Link>
            </>
          )}
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

            {/* Mobile Links */}
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

            <div className="mt-3 border-t border-[#E5E0D5] pt-4">
              {isPending ? (
                <div className="h-10 animate-pulse rounded-lg bg-[#E6EBDD]" />
              ) : user ? (
                <div className="space-y-3">

                  {/* Mobile User Info */}
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg p-3 hover:bg-[#E6EBDD]"
                  >
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full border border-[#879878] object-cover"
                      />
                    ) : (
                      <UserCircle size={36} className="text-[#283D32]" />
                    )}

                    <div>
                      <p className="font-semibold text-[#283D32]">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-[#879878]">
                        {user.email}
                      </p>
                    </div>
                  </Link>

                  {/* Mobile Logout */}
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#C8795B] px-4 py-3 text-sm font-semibold text-[#C8795B] transition hover:bg-[#C8795B] hover:text-white"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/sign-in"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg border border-[#283D32] px-4 py-2.5 text-center text-sm font-semibold text-[#283D32] transition hover:bg-[#E6EBDD]"
                  >
                    Login
                  </Link>

                  <Link
                    href="/sign-up"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg bg-[#283D32] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#3C5545]"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
