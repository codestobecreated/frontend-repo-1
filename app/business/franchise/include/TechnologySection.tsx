"use client";

import React from "react";
import { Smartphone, Monitor, CreditCard, Fingerprint, Headphones } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Relux App",
    desc: "Drivers can locate and access charging stations through the Relux ecosystem.",
    tag: "Mobile Access",
  },
  {
    icon: Monitor,
    title: "CMS",
    desc: "Charging activity and station information can be monitored through the central management system.",
    tag: "Central Management",
  },
  {
    icon: CreditCard,
    title: "Digital Payments",
    desc: "Customers can make payments through supported digital payment methods.",
    tag: "Instant Pay",
  },
  {
    icon: Fingerprint,
    title: "RFID",
    desc: "Compatible users can access charging through RFID-based authentication.",
    tag: "Smart Auth",
  },
  {
    icon: Headphones,
    title: "Remote Support",
    desc: "Relux provides ongoing technical support for the charging infrastructure.",
    tag: "24/7 Monitoring",
  },
];

export default function TechnologySection() {
  return (
    <section
      className="relative w-full py-16 md:py-24 bg-gradient-to-b from-white via-[#f4faf6] to-white text-slate-900 font-poppins border-b border-emerald-100/80 overflow-hidden"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >

      {/* Subtle Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#00b14f_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-10 sm:w-14 h-[2px] bg-[#00b14f]" />
            <span className="text-[#00b14f] text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em]">
              Technology
            </span>
            <span className="w-10 sm:w-14 h-[2px] bg-[#00b14f]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight leading-tight max-w-3xl">
            THE STATION IS{" "}
            <span className="text-[#00b14f]">CONNECTED.</span>
          </h2>

          <p className="mt-4 text-slate-600 text-[16px] font-normal max-w-2xl leading-relaxed">
            A charging station needs to do more than deliver electricity. Relux's charging ecosystem supports digital access and station management, helping partners monitor and manage charging activity.
          </p>
        </div>

        {/* 5 Feature Cards — Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-emerald-100/90 rounded-3xl p-6 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:border-[#00b14f]/50 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Top Row: Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-[#00b14f]/10 text-[#00b14f] group-hover:bg-[#00b14f] group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl group-hover:text-[#00b14f] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Tag Badge */}
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
