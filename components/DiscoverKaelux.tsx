"use client";

import Image from "next/image";
import { ArrowUpRight, Globe, Instagram, Github, Linkedin } from "lucide-react";
import Link from "next/link";

const links = [
  {
    label: "Kaelux.dev",
    href: "https://kaelux.dev",
    icon: Globe,
    accent: "from-indigo-500 via-sky-500 to-cyan-500",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/kaelux.dev",
    icon: Instagram,
    accent: "from-pink-500 via-purple-500 to-orange-400",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/kaelux",
    icon: Linkedin,
    accent: "from-blue-500 via-indigo-500 to-slate-500",
  },
  {
    label: "GitHub",
    href: "https://github.com/kaelux",
    icon: Github,
    accent: "from-slate-700 via-slate-800 to-black",
  },
];

export default function DiscoverKaelux() {
  return (
    <section
      id="discover-section"
      className="relative py-20 px-6 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden"
    >
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-purple-200/40 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-sky-200/30 blur-[160px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-white/70 shadow-sm text-xs font-semibold tracking-[0.28em] uppercase text-slate-500">
            Featured
          </span>
          <h2 className="mt-5 text-4xl md:text-5xl font-black gradient-text-primary hero-font">
            Discover Kaelux.dev
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Kaelux.dev crafts immersive AI-first experiences, blending research automation,
            live intelligence, and thoughtful strategy into products that feel hand-built.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          {/* Profile Card */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-indigo-400/40 via-purple-400/30 to-cyan-400/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <article className="relative overflow-hidden rounded-[26px] bg-white border border-white/60 shadow-[0_32px_80px_-40px_rgba(79,70,229,0.35)] backdrop-blur-xl">
              <div className="relative h-72">
                <Image
                  src="/kaelux-profile.svg"
                  alt="Kaelux brand profile artwork"
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/70 uppercase tracking-[0.2em]">
                      Studio
                    </p>
                    <h3 className="text-3xl font-black text-white hero-font">
                      Kaelux.dev
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-white text-sm font-semibold backdrop-blur-md border border-white/20">
                    Est. 2021
                  </div>
                </div>
              </div>

              <div className="px-8 py-8 space-y-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  We partner with visionary founders to design AI-native products that are
                  strategic, shippable, and grounded in verifiable insights. Every build
                  pairs handcrafted interfaces with reliable automation.
                </p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link relative flex items-center justify-between rounded-2xl border border-white/60 bg-white/70 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${link.accent} w-10 h-10 text-white shadow-md`}
                          >
                            <Icon className="w-5 h-5" />
                          </span>
                          <span className="text-gray-800 font-semibold">{link.label}</span>
                        </span>
                        <ArrowUpRight className="w-5 h-5 text-gray-400 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </article>
          </div>

          {/* Details / Upcoming Projects */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[0_24px_60px_-45px_rgba(2,132,199,0.55)] backdrop-blur-xl">
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                Why Kaelux.dev?
              </h4>
              <ul className="space-y-3 text-gray-600 leading-relaxed">
                <li>
                  • Research and content workflows orchestrated with real-time data, MCP
                  integrations, and bespoke scraping.
                </li>
                <li>
                  • Interfaces designed to feel premium yet practical—every animation has
                  purpose.
                </li>
                <li>
                  • Transparent delivery cadence with collaborative prototyping and rapid
                  iteration.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h5 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 mb-4">
                Coming Next
              </h5>
              <p className="text-gray-600">
                A curated grid of Kaelux.dev builds—from investigative research portals to
                automation stacks—launches here soon. Share the initiatives you want to
                explore, and we’ll showcase them next.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-[0.25em]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Project roll-out in progress
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
