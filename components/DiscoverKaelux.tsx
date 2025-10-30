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

const projects = [
  {
    title: "OrbitOps",
    tag: "Flagship",
    description:
      "AI-grounded research desk with verifiable sourcing pipelines.",
    accent: "from-sky-500/90 via-indigo-500/90 to-purple-500/90",
  },
  {
    title: "Atlas Agent",
    tag: "Beta",
    description:
      "Git-native analyst that merges repo intelligence and PR cadences.",
    accent: "from-fuchsia-500/90 via-rose-500/90 to-amber-400/90",
  },
  {
    title: "Signal Board",
    tag: "Labs",
    description:
      "Live dashboards for curated policy, finance, and tech intel streams.",
    accent: "from-emerald-500/90 via-teal-500/90 to-cyan-400/90",
  },
  {
    title: "Pulse Relay",
    tag: "Studio",
    description:
      "Automation lanes for client hand-offs, meeting recaps, and delivery cadences.",
    accent: "from-amber-400/90 via-orange-500/90 to-rose-500/90",
  },
];

const infiniteProjects = [...projects, ...projects];

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
          <h2 className="mt-5 text-4xl md:text-5xl font-black hero-font leading-[1.15]">
            <span className="gradient-text-primary align-middle">Discover </span>
            <span className="shiny-text align-middle">Kaelux.dev</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Kaelux.dev crafts immersive AI-first experiences, blending research automation,
            live intelligence, and thoughtful strategy into products that feel hand-built.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-start">
          {/* Profile Card */}
          <div className="tilt-wrapper relative group self-start">
            <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-r from-indigo-400/35 via-purple-400/30 to-cyan-300/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <article className="tilt-card relative overflow-hidden rounded-[30px] bg-white border border-white/40 shadow-[0_38px_90px_-40px_rgba(59,130,246,0.35)] backdrop-blur-xl">
              <div className="relative h-[420px] md:h-[520px]">
                <Image
                  src="/kaelux-profile.svg"
                  alt="Kaelux brand profile artwork"
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/65" />
                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/70 uppercase tracking-[0.25em]">
                      Studio
                    </p>
                    <h3 className="text-4xl font-black text-white hero-font drop-shadow-lg">
                      Kaelux.dev
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-white text-sm font-semibold backdrop-blur-md border border-white/30">
                    Est. 2021
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Details / Upcoming Projects */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/70 bg-white/85 p-8 shadow-[0_24px_60px_-45px_rgba(2,132,199,0.55)] backdrop-blur-xl space-y-6">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Why Kaelux.dev?
                </h4>
                <h3 className="mt-3 text-2xl font-bold text-gray-900 hero-font">
                  Designing premium AI surfaces with real research fuel.
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We partner with visionary founders to design AI-native products that are
                strategic, shippable, and grounded in verifiable insights. Every launch pairs
                handcrafted interfaces with reliable automation and research depth.
              </p>

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

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link relative flex items-center justify-between rounded-2xl border border-white/70 bg-white px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
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

          </div>
        </div>

        <div className="mt-16 space-y-6 text-center">
          <h5 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
            Other Kaelux builds
          </h5>
          <p className="text-sm text-slate-500 uppercase tracking-[0.3em]">
            Scroll the stack ↓
          </p>
          <div className="infinite-scroll-track max-w-4xl mx-auto">
            <div className="infinite-scroll flex flex-col gap-5">
              {infiniteProjects.map((item, idx) => (
                <article key={`${item.title}-${idx}`} className="infinite-card">
                  <div
                    className={`infinite-card__accent bg-gradient-to-br ${item.accent}`}
                  >
                    <span className="hero-font">
                      {item.title.slice(0, 1)}
                    </span>
                  </div>
                  <div className="infinite-card__body">
                    <div className="flex items-center gap-3">
                      <span className="infinite-card__tag">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        {item.tag}
                      </span>
                      <span className="infinite-card__title">
                        {item.title}
                      </span>
                    </div>
                    <p className="infinite-card__description">
                      {item.description}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 infinite-card__cta" />
                </article>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white via-white/60 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white via-white/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
