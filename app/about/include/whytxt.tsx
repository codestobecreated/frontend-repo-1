"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function WhyTxt() {
  return (
    <section
      className="w-full py-16 md:py-24 bg-black text-white font-poppins border-t border-white/10 relative overflow-hidden"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#00b14f]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-16 bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
          
          {/* Left Side: Tag & Headline */}
          <div className="max-w-2xl flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[2px] bg-[#00b14f]" />
              <span className="text-[#00b14f] text-[11px] font-mono font-bold uppercase tracking-[0.25em]">
                THE ROAD AHEAD IS ELECTRIC
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug tracking-tight">
              Whether you&apos;re looking to deploy charging infrastructure, partner with Relux or explore our charging solutions,{" "}
              <span className="text-[#00b14f]">let&apos;s talk.</span>
            </h2>
          </div>

          {/* Right Side: Simple CTA Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0 min-w-[280px]">
            <Link
              href="/business/franchise"
              className="inline-flex items-center justify-between gap-4 bg-[#00b14f] hover:bg-white hover:text-black text-white font-black text-xs md:text-sm uppercase tracking-wider px-7 py-4 rounded-xl transition-all duration-300 shadow-[0_4px_25px_rgba(0,177,79,0.3)] hover:shadow-[0_8px_30px_rgba(0,177,79,0.5)] hover:-translate-y-0.5 group cursor-pointer"
            >
              <span>Explore Franchise</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/business/zero-investment"
              className="inline-flex items-center justify-between gap-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-[#00b14f] font-black text-xs md:text-sm uppercase tracking-wider px-7 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer"
            >
              <span>Explore Zero Investment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#00b14f]" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
