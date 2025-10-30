import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const heroFont = localFont({
  src: [
    {
      path: "../public/fonts/ClashGrotesk-Variable.woff2",
      style: "normal",
      weight: "100 700",
    },
  ],
  variable: "--font-hero",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KaleDocs AI - Powered by Gemini",
  description: "AI Assistant with Real-Time Web Search, GitHub Access, and Advanced Web Scraping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${heroFont.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
