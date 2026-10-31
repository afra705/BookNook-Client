
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  BookOpen,
  User,
  Mail,
  Lock,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

const SignUpPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const isPasswordValid =
    hasUppercase && hasLowercase && hasMinLength;

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.error("Password does not meet the requirements.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const image = String(formData.get("image") || "").trim();

    if (!name || !email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: image || undefined,
      });

      if (error) {
        toast.error(error.message || "Registration failed!");
        return;
      }

      if (data) {
        toast.success("Account created successfully!");
        router.push("/sign-in");
        router.refresh();
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen bg-[#F8F5ED] flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-5xl bg-[#FFFDF8] rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-between bg-[#283D32] p-12 text-[#FFFDF8]">

          <Link href="/" className="flex items-center gap-2">
            <BookOpen size={32} />
            <span className="text-2xl font-bold">BookNook</span>
          </Link>

          <div>
            <p className="text-[#879878] uppercase tracking-widest text-sm mb-4">
              Your Reading Journey
            </p>

            <h1 className="text-4xl font-bold leading-tight">
              Discover Stories.
              <br />
              Explore Knowledge.
              <br />
              <span className="text-[#C8795B]">
                Create Your Library.
              </span>
            </h1>

            <p className="mt-6 text-[#F8F5ED]/70 leading-7">
              Join BookNook and explore a world of books.
              Build your personal collection and share
              your favorite reads.
            </p>
          </div>

          <p className="text-sm text-[#F8F5ED]/50">
            © 2026 BookNook
          </p>
        </div>

        {/* Right Side */}
        <div className="p-6 sm:p-10 md:p-12">

          <Link
            href="/"
            className="md:hidden flex justify-center items-center gap-2 mb-8 text-2xl font-bold text-[#283D32]"
          >
            <BookOpen size={28} />
            BookNook
          </Link>

          <div className="mb-8">
            <p className="text-sm uppercase tracking-widest text-[#879878] font-semibold">
              Get Started
            </p>

            <h2 className="text-3xl font-bold text-[#283D32] mt-2">
              Create Account
            </h2>

            <p className="text-[#292D2A]/60 mt-2 text-sm">
              Register to start your reading journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#292D2A] mb-2">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#879878]" size={19} />

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-xl border border-[#879878]/30 bg-[#F8F5ED]/50 py-3 pl-12 pr-4 outline-none focus:border-[#283D32] text-[#292D2A]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#292D2A] mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#879878]" size={19} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-[#879878]/30 bg-[#F8F5ED]/50 py-3 pl-12 pr-4 outline-none focus:border-[#283D32] text-[#292D2A]"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-[#292D2A] mb-2">
                Photo URL
              </label>

              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#879878]" size={19} />

                <input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-xl border border-[#879878]/30 bg-[#F8F5ED]/50 py-3 pl-12 pr-4 outline-none focus:border-[#283D32] text-[#292D2A]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#292D2A] mb-2">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#879878]" size={19} />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#879878]/30 bg-[#F8F5ED]/50 py-3 pl-12 pr-12 outline-none focus:border-[#283D32] text-[#292D2A]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#879878]"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              {/* Validation */}
              <div className="mt-3 rounded-xl bg-[#F8F5ED] p-3 space-y-2">
                <p className="text-xs font-semibold text-[#292D2A]">
                  Password requirements:
                </p>

                <p className={`text-xs ${hasUppercase ? "text-green-700" : "text-[#879878]"}`}>
                  {hasUppercase ? "✓" : "○"} At least one uppercase letter
                </p>

                <p className={`text-xs ${hasLowercase ? "text-green-700" : "text-[#879878]"}`}>
                  {hasLowercase ? "✓" : "○"} At least one lowercase letter
                </p>

                <p className={`text-xs ${hasMinLength ? "text-green-700" : "text-[#879878]"}`}>
                  {hasMinLength ? "✓" : "○"} Minimum 6 characters
                </p>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !isPasswordValid}
              className="w-full rounded-xl bg-[#283D32] py-3.5 text-white font-semibold hover:bg-[#354E40] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-[#879878]/30 flex-1" />
            <span className="text-xs text-[#879878]">OR</span>
            <div className="h-px bg-[#879878]/30 flex-1" />
          </div>

          {/* Google */}
          <button
            type="button"
   
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-[#879878]/30 py-3 font-semibold text-[#292D2A] hover:bg-[#F8F5ED] transition disabled:opacity-50"
          >
            {googleLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <svg viewBox="0 0 48 48" className="w-5 h-5">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 5)" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.77 7.18l7.73 6C44.4 37.85 46.98 31.7 46.98 24.55Z" />
                <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z" transform="translate(0 5)" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.14 1.44-4.87 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
              </svg>
            )}

            Continue with Google
          </button>

          {/* Login */}
          <p className="mt-7 text-center text-sm text-[#292D2A]/70">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-bold text-[#283D32] hover:text-[#C8795B] underline underline-offset-4"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
