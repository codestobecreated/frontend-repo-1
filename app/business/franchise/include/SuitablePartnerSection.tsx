"use client";

import React from "react";
import { Building2, Store, Trees, Truck } from "lucide-react";

const suitableForList = [
  {
    icon: Building2,
    title: "Property owners",
    desc: "With accessible commercial or roadside property.",
    tag: "Commercial & Roadside",
  },
  {
    icon: Store,
    title: "Businesses",
    desc: "Hotels, restaurants, retail spaces, commercial buildings and other customer-facing locations.",
    tag: "Customer-Facing Locations",
  },
  {
    icon: Trees,
    title: "Landowners",
    desc: "With suitable land in locations where EV traffic is developing.",
    tag: "High EV Traffic Zones",
  },
  {
    icon: Truck,
    title: "Fleet operators",
    desc: "Looking to establish dedicated charging infrastructure.",
    tag: "Dedicated Infrastructure",
  },
];

export default function SuitablePartnerSection() {
  return (
    <section
      className="relative w-full py-16 md:py-24 bg-gradient-to-b from-white via-[#f4faf6] to-white text-slate-900 font-poppins border-b border-emerald-100/80 overflow-hidden"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#00b14f_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-10 sm:w-14 h-[2px] bg-[#00b14f]" />
            <span className="text-[#00b14f] text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em]">
              PARTNER ELIGIBILITY
            </span>
            <span className="w-10 sm:w-14 h-[2px] bg-[#00b14f]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight leading-tight max-w-4xl">
            A RELUX FRANCHISE MAY BE <span className="text-[#00b14f]">SUITABLE FOR</span>
          </h2>
        </div>

        {/* 4 Cards Grid (2x2 on tablet, 4-col on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {suitableForList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-emerald-100/90 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:border-[#00b14f]/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Top Row: Icon + Badge */}
                  {/* <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#00b14f]/10 text-[#00b14f] group-hover:bg-[#00b14f] group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div> */}

                  {/* Title */}
                  <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl group-hover:text-[#00b14f] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-[16px] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Accent line */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#00b14f] bg-[#00b14f]/10 px-3 py-1 rounded-full inline-block">
                    {item.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
