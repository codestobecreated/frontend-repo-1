"use client";

import React from "react";
import { ShieldCheck, Zap, Wrench, BadgeCheck, CreditCard, TrendingUp, AlertCircle } from "lucide-react";

const terms = [
  {
    icon: ShieldCheck,
    title: "We will provide feasibility guidance.",
    desc: "RELUX will first assess the proposed site and provide feasibility guidance. Revenue outcomes will depend on actual site performance.",
  },
  {
    icon: Zap,
    title: "Chargers are to be sourced exclusively through RELUX.",
    desc: "Canopy, visual identity, and overall setup must follow RELUX CI standards.",
  },
  {
    icon: Wrench,
    title: "Two-year warranty & maintenance.",
    desc: "Maintenance and warranty coverage will be provided by RELUX for an initial 2 years from the date of purchase.",
  },
  {
    icon: BadgeCheck,
    title: "Only approved RELUX branding may be displayed at the charging facility.",
    desc: "Third-party or franchisee logos are not permitted.",
  },
  {
    icon: AlertCircle,
    title: "Power availability is essential.",
    desc: "The franchisee must maintain 24×7 full-time three-phase power, with adequate EB sanctioned load and backup arrangements where feasible.",
  },
  {
    icon: CreditCard,
    title: "Payment methods & GST.",
    desc: "All RELUX transactions are GST billed. Payments are accepted through RTGS or bank transfer only; cash payments are not accepted. 100% advance payment is required before charger procurement and order dispatch.",
  },
  {
    icon: TrendingUp,
    title: "The expected ROI period is 3–5 years.",
    desc: "This will depend on traffic, location, electricity tariff, and charger utilization. You can estimate your returns using our ROI tool in the following section.",
  },
];

export default function FranchiseTerms() {
  return (
    <section
      className="relative w-full py-16 md:py-24 bg-white text-black font-poppins overflow-hidden"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >

      <div className="max-w-7xl mx-auto px-[5%] relative z-10">

        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <span className="text-[#00b14f] text-xs font-black uppercase tracking-[0.3em]">
            WORKING WITH RELUX
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black uppercase tracking-tight leading-tight">
            Franchise Terms &{" "}
            <span className="text-[#00b14f]">Guidelines</span>
          </h2>
          <p className="text-black/65 text-[16px] leading-relaxed font-normal max-w-2xl">
            A Relux franchise may be ideal for landowners, property owners, businesses, and fleet operators. Customer-facing locations such as hotels, restaurants, commercial buildings, or empty land where EV traffic is developing are all excellent locations for a franchise.
          </p>
          <p className="text-black/50 text-[16px] leading-relaxed font-normal max-w-2xl">
            Here are some things to keep in mind regarding a partnership with us at Relux.
          </p>
        </div>

        {/* Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {terms.map((term, idx) => {
            const Icon = term.icon;
            return (
              <div
                key={idx}
                className="group flex gap-4 items-start bg-black/[0.04] hover:bg-black/[0.07] border border-black/10 hover:border-[#00b14f]/40 rounded-2xl p-5 md:p-6 transition-all duration-300"
              >
                {/* Icon */}
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[#00b14f]/15 border border-[#00b14f]/25 flex items-center justify-center mt-0.5 group-hover:bg-[#00b14f]/25 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-[#00b14f]" />
                </div>

                {/* Text */}
                <div className="space-y-1">
                  <p className="text-black font-bold text-sm leading-snug">
                    {term.title}
                  </p>
                  <p className="text-black/65 text-[16px] font-normal leading-relaxed">
                    {term.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
