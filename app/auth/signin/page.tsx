"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import DarkVeil from "@/components/DarkVeil";
import { Chrome, ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      {/* Animated Background */}
      <DarkVeil />

      <div className="relative z-10 w-full max-w-md p-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to home</span>
        </Link>

        {/* Sign In Card */}
        <div className="backdrop-blur-2xl bg-white/10 rounded-3xl p-8 border-2 border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <Shield className="w-12 h-12 text-cyan-400 animate-pulse" />
                <div className="absolute inset-0 blur-xl bg-cyan-500/50 animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-3xl font-black text-white mb-2">
              Sign In
            </h1>
            <p className="text-white/70 text-sm">
              Sign in with your Google account to save your chat history and progress
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl"
          >
            <Chrome className="w-5 h-5 text-blue-500" />
            <span>Continue with Google</span>
          </button>

          {/* Note */}
          <div className="mt-6 p-4 bg-amber-500/10 border border-amber-400/30 rounded-xl">
            <p className="text-amber-200 text-xs text-center">
              <Shield className="w-4 h-4 inline mr-1" />
              Note: Admin authentication is still required to use the AI features
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/50 text-xs mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

