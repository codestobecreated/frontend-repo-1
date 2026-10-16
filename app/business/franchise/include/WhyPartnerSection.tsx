"use client";

import React from "react";
import { Calendar, Zap, CheckCircle2, MapPin, BadgeCheck, TrendingUp, Layers } from "lucide-react";

const stats = [
  {
    icon: Calendar,
    stat: "2009",
    desc: "Relux began operations.",
  },
  {
    icon: Zap,
    stat: "2012",
    desc: "Entered the EV charging space.",
  },
  {
    icon: CheckCircle2,
    stat: "1,000+",
    desc: "Installations nationwide",
  },
  {
    icon: MapPin,
    stat: "13+",
    desc: "States covered",
  },
];

const highlights = [
  {
    icon: TrendingUp,
    title: "Grown alongside the market",
    desc: "Working across different charging requirements and locations.",
  },
  {
    icon: Layers,
    title: "One complete network",
    desc: "Bringing together charging hardware, infrastructure, software and service.",
  },
];

export default function WhyPartnerSection() {
  return (
    <section
      className="relative w-full py-16 md:py-24 bg-gradient-to-b from-white via-[#f4faf6] to-white text-slate-900 font-poppins border-b border-emerald-100/80 overflow-hidden"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#00b14f_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Header + Intro ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Category Tag */}
            <div className="flex items-center gap-3">
              <span className="w-10 sm:w-14 h-[2px] bg-[#00b14f]" />
              <span className="text-[#00b14f] text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em]">
                WHY BUILD YOUR STATION WITH RELUX?
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight uppercase">
              EXPERIENCE THAT GOES BEYOND{" "}
              <span className="text-[#00b14f]">THE CHARGER</span>
            </h2>
            <p className="text-slate-700 text-[16px] font-normal leading-relaxed">
              Relux entered the EV charging space in 2012, when India's charging infrastructure was still in its early stages. Since then, we've worked across charging infrastructure, installation, technology and network operations, building our understanding from actual sites rather than from a business plan alone.
            </p>
            <div>

</div>

            {/* Investment Guarantee Badge */}
            <div className="inline-flex items-center gap-3 bg-[#00b14f] text-white px-6 py-4 rounded-2xl shadow-lg w-fit">
              {/* <BadgeCheck className="w-7 h-7 shrink-0" /> */}
              <div>
                <div className="font-extrabold text-sm sm:text-base leading-tight">WE'VE LEARNED WHAT MAKES A CHARGING STATION WORK.</div>
                <div className="text-white/90 text-xs font-medium">The right location. The right infrastructure. The right technology. And support after the charger goes live.</div>
              </div>
            </div>

          </div>

          {/* ── RIGHT: 4 Stat / Milestone Cards ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {stats.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-emerald-100/90 rounded-3xl p-6 sm:p-7 shadow-md hover:shadow-2xl hover:-translate-y-1 hover:border-[#00b14f]/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-4">
                      
                      <span className="text-3xl sm:text-4xl font-black text-[#00b14f] tracking-tight">
                        {item.stat}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-[#00b14f]/10 text-[#00b14f] group-hover:bg-[#00b14f] group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0 shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-800 font-extrabold text-base sm:text-lg leading-snug group-hover:text-[#00b14f] transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Highlight Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#f7fcf9] border border-emerald-100/80 rounded-2xl p-4 flex items-center gap-3.5 hover:border-[#00b14f]/40 transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#00b14f]/15 text-[#00b14f] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-slate-500 text-[11px] font-medium leading-tight mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

