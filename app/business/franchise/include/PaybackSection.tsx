"use client";

import React from "react";
import { TrendingUp, Clock, ShieldCheck, DollarSign, Calendar } from "lucide-react";

export default function PaybackSection() {
  const steps = [
    {
      year: "YEAR 1",
      title: "Station Setup & Launch",
      desc: "Grid load approval, civil installation, Relux App listing, and building initial local driver footfall.",
      highlight: "Initial Footfall Build",
    },
    {
      year: "YEAR 2",
      title: "Ramp-Up & Break-Even",
      desc: "Daily session count increases with repeat highway travelers, fleet tie-ups, and operational cost recovery.",
      highlight: "Operational Break-Even",
    },
    {
      year: "YEAR 3",
      title: "Capital Recovery",
      desc: "High station utilization yields strong recurring cash flow, completing full payback of hardware & civil investment.",
      highlight: "Full Investment Payback",
    },
    {
      year: "YEAR 4+",
      title: "Sustained Net Profit",
      desc: "Station operates as a long-term passive profit center with high margins and opportunities to add more guns.",
      highlight: "High Margin Cash Flow",
    },
  ];

  return (
    <section
      className="relative w-full py-20 md:py-28 bg-[#050505] overflow-hidden font-poppins border-b border-white/5"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >
      {/* Glow Ornaments */}
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-[#00b14f]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[2px] bg-[#00b14f]" />
            <span className="text-[#00b14f] text-xs font-black uppercase tracking-[0.3em]">
              Financial Roadmap
            </span>
            <span className="w-8 h-[2px] bg-[#00b14f]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase leading-tight">
            YOUR MONEY BACK IN <span className="text-[#00b14f]">3 - 4 YEARS</span>
          </h2>
          <p className="text-white/60 text-[16px] leading-relaxed mt-3 max-w-xl font-normal">
            Our high-efficiency chargers and nationwide app visibility ensure predictable returns and swift capital recovery.
          </p>
        </div>

        {/* Financial Highlights Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex items-center gap-5 hover:border-[#00b14f]/30 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#00b14f]/10 text-[#00b14f] flex items-center justify-center font-black shrink-0">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-white tracking-tight">3 - 4 Yrs</div>
              <div className="text-xs font-bold text-[#00b14f] uppercase tracking-wider">Average Payback</div>
              <div className="text-[10px] text-white/40">Based on standard highway & urban traffic</div>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex items-center gap-5 hover:border-[#00b14f]/30 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#00b14f]/10 text-[#00b14f] flex items-center justify-center font-black shrink-0">
              <TrendingUp className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-white tracking-tight">25% - 35%</div>
              <div className="text-xs font-bold text-[#00b14f] uppercase tracking-wider">Estimated Project IRR</div>
              <div className="text-[10px] text-white/40">Strong annual yield on capital invested</div>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex items-center gap-5 hover:border-[#00b14f]/30 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#00b14f]/10 text-[#00b14f] flex items-center justify-center font-black shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-white tracking-tight">15+ Years</div>
              <div className="text-xs font-bold text-[#00b14f] uppercase tracking-wider">Hardware Lifespan</div>
              <div className="text-[10px] text-white/40">Industrial-grade durability with CMS support</div>
            </div>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#00b14f]/40 hover:shadow-[0_0_40px_rgba(0,177,79,0.15)] transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-lg bg-[#00b14f]/10 border border-[#00b14f]/20 text-[#00b14f] text-[10px] font-black tracking-widest uppercase">
                  {step.year}
                </span>
                <span className="text-white/20 font-black text-xl">0{idx + 1}</span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2 group-hover:text-[#00b14f] transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <span className="text-[10px] font-bold text-[#00b14f] uppercase tracking-wider block">
                  ✓ {step.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
