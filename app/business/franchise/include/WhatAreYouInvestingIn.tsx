"use client";

import React from "react";

const investmentItems = [
  {
    title: "CHARGING EQUIPMENT",
    desc: "The charging hardware selected for your location and required capacity.",
  },
  {
    title: "ELECTRICAL INFRASTRUCTURE",
    desc: "Power infrastructure required to safely support the charging setup.",
  },
  {
    title: "SITE & CIVIL WORK",
    desc: "The physical setup required to make the location ready for charging operations.",
  },
  {
    title: "SOFTWARE & CONNECTIVITY",
    desc: "CMS and network connectivity for monitoring, payments and station management.",
  },
  {
    title: "INSTALLATION & COMMISSIONING",
    desc: "Technical execution from setup through station commissioning.",
  },
  {
    title: "OPERATIONS & SUPPORT",
    desc: "Ongoing technical assistance and support after the station goes live.",
  },
];

export default function WhatAreYouInvestingIn() {
  return (
    <section
      className="w-full py-16 md:py-24 bg-black text-white font-poppins border-t border-white/10 relative overflow-hidden"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00b14f]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#00b14f]" />
            <span className="text-[#00b14f] text-xs font-black uppercase tracking-[0.3em]">
              What are you investing in? 
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.1]">
            NOT JUST A <span className="text-[#00b14f]">CHARGER.</span>
          </h2>

          <p className="mt-2 text-white/70 text-[16px] font-normal leading-relaxed max-w-3xl">
            By choosing Relux, you are supporting the transition towards cleaner transportation while contributing to a growing EV ecosystem across India. Reliable and accessible charging infrastructure makes electric mobility more practical, helping reduce dependence on fossil fuels and our country’s carbon footprint.
            It is an investment in more than infrastructure—it is an investment in cleaner air, healthier communities and a more sustainable future.
          </p>
        </div>

        {/* 6 Investment Components Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {investmentItems.map((item, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:bg-white/[0.08] hover:border-[#00b14f]/50 transition-all duration-300 group shadow-lg hover:shadow-[#00b14f]/10"
            > */}
              {/* Top hover border glow */}
              {/* <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00b14f] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}

              {/* Ambient background glow */}
              {/* <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-[#00b14f]/5 rounded-full blur-2xl group-hover:bg-[#00b14f]/15 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#00b14f] bg-[#00b14f]/10 border border-[#00b14f]/25 px-3 py-1 rounded-full uppercase">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-base md:text-lg font-black text-white uppercase tracking-wider group-hover:text-[#00b14f] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-white/70 text-xs md:text-sm font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div> */}

        </div>
    </section>
  );
}
