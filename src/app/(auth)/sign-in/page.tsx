
"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {

  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import Image from "next/image";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackURL = searchParams.get("callbackURL") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
//google sign in 
const handleGoogleSignIn = async () => {
  try {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackURL,
    });

    if (error) {
      toast.error(error.message || "Google login failed");
    }
  } catch {
    toast.error("Something went wrong with Google login");
  }
};
  // Email and Password Login
  const handleSignIn = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter your email and password");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password");
        return;
      }

      toast.success("Login successful!");

      router.push(callbackURL);
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Login


  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F5ED] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#879878]/20 bg-[#FFFDF8] p-6 shadow-xl sm:p-8">

        {/* Logo and Title */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex  items-center justify-center ">
               <Image
                      src='/images/logo.png'
                      alt="BookNook Logo"
                      width={100}
                      height={100}
                      className="h-14 w-27 object-contain"
                      priority
                      />
          </div>

          <h1 className="text-3xl font-bold text-[#283D32]">
            Welcome Back!
          </h1>

          <p className="mt-2 text-sm text-[#879878]">
            Sign in to continue your BookNook journey.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSignIn} className="space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#292D2A]"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#879878]"
              />

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[#879878]/40 bg-white py-3 pl-10 pr-4 text-[#292D2A] outline-none transition focus:border-[#283D32] focus:ring-2 focus:ring-[#283D32]/10"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#292D2A]"
            >
              Password
            </label>

            <div className="relative">
              <Lock
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#879878]"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[#879878]/40 bg-white py-3 pl-10 pr-12 text-[#292D2A] outline-none transition focus:border-[#283D32] focus:ring-2 focus:ring-[#283D32]/10"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#879878] hover:text-[#283D32]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading || googleLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#283D32] py-3 font-semibold text-white transition hover:bg-[#3B5948] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={19} className="animate-spin" />
                Signing in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#879878]/30" />
          <span className="text-xs text-[#879878]">
            OR CONTINUE WITH
          </span>
          <div className="h-px flex-1 bg-[#879878]/30" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading || googleLoading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#879878]/40 bg-white py-3 font-medium text-[#292D2A] transition hover:bg-[#F8F5ED] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {googleLoading ? (
            <Loader2 size={19} className="animate-spin" />
          ) : (
            <svg
              viewBox="0 0 48 48"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.44 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.73 7.18l7.72 5.99c4.51-4.18 7.05-10.35 7.05-17.64z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.91-5.81l-7.72-5.99c-2.14 1.45-4.89 2.3-8.19 2.3-6.26 0-11.56-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
          )}

          {googleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        {/* Register Link */}
        <p className="mt-7 text-center text-sm text-[#292D2A]">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-bold text-[#C8795B] hover:underline"
          >
            Register Now
          </Link>
        </p>

        {/* Back to Home */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm text-[#879878] transition hover:text-[#283D32]"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F8F5ED]">
          <Loader2 className="animate-spin text-[#283D32]" size={32} />
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}