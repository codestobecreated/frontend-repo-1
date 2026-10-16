"use client";

import React from "react";
import { BarChart2, TrendingUp, Zap, Users, ArrowUpRight, CheckCircle2 } from "lucide-react";

/* ── Mini sparkline SVG ── */
function Sparkline() {
  return (
    <svg viewBox="0 0 160 60" className="w-32 h-10 text-[#00b14f]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sparklineGradLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00b14f" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00b14f" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path
        d="M 0,55 C 30,50 50,45 70,35 C 90,25 120,20 160,8 L 160,60 L 0,60 Z"
        fill="url(#sparklineGradLight)"
      />
      <path
        d="M 0,55 C 30,50 50,45 70,35 C 90,25 120,20 160,8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="70" cy="35" r="2.5" fill="currentColor" />
      <circle cx="115" cy="21" r="2.5" fill="currentColor" />
      <circle cx="160" cy="8" r="3" fill="currentColor" />
    </svg>
  );
}

const stats = [
  {
    icon: BarChart2,
    value: "7.66%",
    title: "EV Penetration in India",
    sub: "Recorded in 2024",

  },
  {
    icon: TrendingUp,
    value: "30%",
    title: "EV Penetration Target",
    sub: "Targeted by 2030",

  },
  {
    icon: Zap,
    value: "50%",
    title: "EV Sales Share",
    sub: "Projected in India by 2035",

  },
  {
    icon: Users,
    value: "100%",
    title: "Infrastructure Need",
    sub: "Massive EV charging market expansion",

  },
];

export default function EvRevolutionSection() {
  return (
    <section
      id="about-section"
      className="relative w-full py-16 md:py-24 text-slate-900 font-poppins border-b border-emerald-100/80 overflow-hidden scroll-mt-10"
      style={{
        backgroundImage: "url('/franchise/bg_franchise.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif',
      }}
    >
      {/* Light Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-xs pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-10 sm:w-14 h-[2px] bg-[#00b14f]" />
            <span className="text-[#00b14f] text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em]">
              THE OPPORTUNITY
            </span>
            <span className="w-10 sm:w-14 h-[2px] bg-[#00b14f]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight leading-tight max-w-4xl">
            EV ADOPTION IS GROWING. CHARGING INFRASTRUCTURE HAS TO{" "}
            <span className="text-[#00b14f]">GROW WITH IT.</span>
          </h2>
        </div>

        {/* 2 Column Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* ── LEFT COLUMN: Narrative Overview Card ── */}
          <div className="lg:col-span-7 bg-white border border-emerald-100/90 rounded-3xl p-6 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">

            <div className="space-y-6">

              {/* Card Accent Tag */}
              {/* <div className="flex items-center gap-2 text-[#00b14f] font-extrabold text-xs uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#00b14f] animate-pulse" />
                Strategic Market Overview
              </div> */}

              {/* Main Paragraph */}
              <p className="text-slate-700 text-[16px] font-normal leading-relaxed">
                More electric cars, commercial vehicles and fleets on Indian roads mean more places to charge.
                But setting up a charging station isn't simply a matter of buying a charger and plugging it in. The location, power availability, charger capacity, vehicle traffic, access, parking and ongoing operations all affect how a station performs.
                That's where Relux comes in.
                We help our partners evaluate the target location, select the charging setup appropriate for their needs, and establish the required infrastructure to get the station operational.
                You bring the location and investment. Relux brings the charging infrastructure and operational support.

              </p>

              {/* Highlight Box: Relux Role */}
              <div className="bg-[#f0fbf4] border-l-4 border-[#00b14f] p-5 sm:p-6 rounded-r-2xl">
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#00b14f]" />
                  That's where Relux comes in.
                </h3>
                <p className="text-slate-600 text-[16px] font-normal leading-relaxed">
                  We help our partners evaluate the target location, select the charging setup appropriate for their needs, and establish the required infrastructure to get the station operational.
                </p>
              </div>

              {/* Key Takeaway Banner */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 flex items-center gap-4 sm:gap-5 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-[#00b14f] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Zap className="w-6 h-6 fill-white" />
                </div>
                <p className="font-bold text-xs sm:text-sm md:text-base leading-snug">
                  You bring the location and investment. <br className="hidden sm:block" />
                  <span className="text-[#00b14f]">Relux brings the charging infrastructure and operational support.</span>
                </p>
              </div>

            </div>

          </div>

          {/* ── RIGHT COLUMN: 4 Market Stats Cards ── */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 items-stretch">
            {stats.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-emerald-100/90 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:border-[#00b14f]/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
                >
                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#00b14f]/10 text-[#00b14f] group-hover:bg-[#00b14f] group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    {/* Stat Value */}
                    <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">
                      {item.value}
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base mb-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed">
                      {item.sub}
                    </p>
                  </div>

                  {/* Bottom Graphic Sparkline */}
                  <div className="pt-4 flex items-center justify-between">
                    <Sparkline />
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#00b14f] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
