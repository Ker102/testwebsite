"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import DarkVeil from "@/components/DarkVeil";
import { Lock, Sparkles, Shield, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const success = await login(password);

    if (success) {
      router.push("/");
    } else {
      setError("Invalid password. Please try again.");
      setPassword("");
    }

    setIsLoading(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <DarkVeil />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo/Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Shield className="w-16 h-16 text-purple-400 animate-pulse" />
              <div className="absolute inset-0 blur-2xl bg-purple-500/40 animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-3 drop-shadow-2xl">
            Admin Access
          </h1>
          <p className="text-white/70 text-lg font-medium">
            Enter your password to continue
          </p>
        </div>

        {/* Login Form */}
        <div className="backdrop-blur-2xl bg-white/10 rounded-3xl p-8 border-2 border-white/20 shadow-2xl hover:border-white/30 transition-all duration-500 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-white font-semibold text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-400" />
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-white/20 bg-white/10 text-white placeholder-white/40 focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-400/30 transition-all duration-300 backdrop-blur-sm font-medium hover:bg-white/15 focus:bg-white/15"
                  disabled={isLoading}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-2xl px-4 py-3 text-red-200 text-sm font-medium animate-slide-up flex items-center gap-2">
                <Lock className="w-4 h-4" />
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!password || isLoading}
              className="w-full group/btn relative px-7 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/30 overflow-hidden"
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 -top-full group-hover/btn:top-0 bg-gradient-to-b from-white/30 to-transparent transition-all duration-500"></div>

              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Access Dashboard
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Info Text */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-white/50 text-xs text-center flex items-center justify-center gap-2">
              <Lock className="w-3 h-3" />
              Secure admin authentication required
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex items-center justify-center gap-4 opacity-50">
          <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <Lock className="w-5 h-5 text-purple-400 animate-pulse animation-delay-2000" />
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <Shield className="w-5 h-5 text-pink-400 animate-pulse animation-delay-4000" />
        </div>
      </div>
    </div>
  );
}

