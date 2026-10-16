"use client";

import React, { useState } from "react";
import {
  Wallet,
  Building2,
  Car,
  Maximize2,
  Zap,
  FileCheck,
  ShieldCheck,
  Award,
  CreditCard,
  TrendingUp,
  PlugZap,
  Receipt,
  Compass,
  Cpu,
} from "lucide-react";

export default function RequirementsSection() {
  const [activeTab, setActiveTab] = useState<"requirements" | "terms">("requirements");

  const siteChecklist = [
    {
      icon: Wallet,
      num: "01",
      title: "Suitable Investment Capacity",
      desc: "Capital appropriate to the selected charging model.",
    },
    {
      icon: Building2,
      num: "02",
      title: "Available Land or Commercial Space",
      desc: "Owned or legally leased property suitable for the setup.",
    },
    {
      icon: Car,
      num: "03",
      title: "Vehicle & Extended Accessibility",
      desc: "Customers should be able to enter, charge and exit conveniently, throughout the day",
    },
    {
      icon: Maximize2,
      num: "04",
      title: "Adequate Space",
      desc: "Room for chargers, parking and vehicle movement.",
    },
    {
      icon: Zap,
      num: "05",
      title: "Power Feasibility",
      desc: "A suitable electricity connection or feasibility for obtaining one.",
    },
    {
      icon: FileCheck,
      num: "06",
      title: "Valid Property Documents",
      desc: "Ownership or lease documentation for site verification.",
    },
  ];

  const terms = [
    {
      icon: Compass,
      num: "01",
      title: "Site Feasibility",
      desc: "RELUX will assess the proposed site and provide feasibility guidance. Revenue outcomes will depend on actual site performance.",
    },
    {
      icon: Cpu,
      num: "02",
      title: "Equipment & Design Standards",
      desc: "Chargers are to be sourced exclusively through RELUX. Canopy, visual identity, and overall setup must follow RELUX CI standards.",
    },
    {
      icon: ShieldCheck,
      num: "03",
      title: "Two-Year Warranty & Maintenance",
      desc: "Maintenance and warranty coverage will be provided by RELUX for an initial 2 years from the date of purchase.",
    },
    {
      icon: Award,
      num: "04",
      title: "Branding Guidelines",
      desc: "Only approved RELUX branding may be displayed at the charging facility. Third-party or franchisee logos are not permitted.",
    },
    {
      icon: CreditCard,
      num: "05",
      title: "Order Payment",
      desc: "100% advance payment is required before charger procurement and order dispatch.",
    },
    {
      icon: TrendingUp,
      num: "06",
      title: "ROI Timeline",
      desc: "The expected return period is 3–5 years, depending on traffic, location, electricity tariff, and charger utilization.",
    },
    {
      icon: PlugZap,
      num: "07",
      title: "Power Availability",
      desc: "The franchisee must maintain 24×7 full-time three-phase power, with adequate EB sanctioned load and backup arrangements where feasible.",
    },
    {
      icon: Receipt,
      num: "08",
      title: "GST & Payment Methods",
      desc: "All RELUX transactions are GST billed. Payments are accepted through RTGS or bank transfer only; cash payments are not accepted.",
    },
  ];

  return (
    <section
      className="relative w-full py-16 md:py-24 bg-gradient-to-b from-[#f4faf6] via-white to-[#edf8f1] text-slate-900 font-poppins border-b border-emerald-100/80 overflow-hidden"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >
      {/* Subtle Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#00b14f_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          {/* Category Tag */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-10 sm:w-14 h-[2px] bg-[#00b14f]" />
            <span className="text-[#00b14f] text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em]">
              DOES YOUR LOCATION QUALIFY?
            </span>
            <span className="w-10 sm:w-14 h-[2px] bg-[#00b14f]" />
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight leading-tight max-w-4xl">
            WHAT MAKES A SITE IDEAL FOR A{" "}
            <span className="text-[#00b14f]">CHARGING STATION?</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-slate-600 text-[16px] font-normal leading-relaxed max-w-2xl">
            A good charging station starts with a good site. It should have:
          </p>

          {/* Tab Switcher Buttons */}
          <div className="flex items-center gap-2 mt-6 bg-slate-200/70 p-1.5 rounded-full border border-slate-300/60 shadow-inner">
            <button
              onClick={() => setActiveTab("requirements")}
              type="button"
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "requirements"
                  ? "bg-[#00b14f] text-white shadow-md"
                  : "text-slate-700 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              Site Requirements
            </button>
            <button
              onClick={() => setActiveTab("terms")}
              type="button"
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "terms"
                  ? "bg-[#00b14f] text-white shadow-md"
                  : "text-slate-700 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              Franchise Terms & Guidelines
            </button>
          </div>
        </div>

        {/* Tab Content: Requirements Grid (6 Cards, 3 Cols on desktop) */}
        {activeTab === "requirements" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {siteChecklist.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-emerald-100/90 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-2xl hover:-translate-y-1 hover:border-[#00b14f]/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle corner highlight */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-emerald-100/40 to-transparent rounded-bl-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />

                  <div>
                    <div className="flex items-center justify-between mb-5 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-[#00b14f]/10 text-[#00b14f] group-hover:bg-[#00b14f] group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0 shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-extrabold text-[#00b14f] tracking-wide uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00b14f] inline-block animate-pulse" />
                      Site Qualifier
                    </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-2.5 group-hover:text-[#00b14f] transition-colors leading-snug relative z-10">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium relative z-10">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom indicator check badge */}
                  {/* <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                    <span className="text-[11px] font-extrabold text-[#00b14f] tracking-wide uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00b14f] inline-block animate-pulse" />
                      Site Qualifier
                    </span>
                    <div className="w-7 h-7 rounded-full bg-emerald-50 text-[#00b14f] border border-emerald-200/60 flex items-center justify-center group-hover:bg-[#00b14f] group-hover:text-white group-hover:border-[#00b14f] transition-all">
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div> */}
                </div>
              );
            })}
          </div>
        ) : (
          /* Terms Grid - 8 Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
            {terms.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-emerald-100/90 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-2xl hover:-translate-y-1 hover:border-[#00b14f]/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#00b14f]/10 text-[#00b14f] group-hover:bg-[#00b14f] group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[#00b14f] font-black text-sm sm:text-base tracking-wider">
                        {item.num}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-2.5 group-hover:text-[#00b14f] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

