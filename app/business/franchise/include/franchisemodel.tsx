"use client";

import React, { useState } from "react";
import { MoveRight, Zap, CheckCircle2, Info } from "lucide-react";
import EnquiryModal from "./EnquiryModal";

const DEFAULT_MODELS = [
  {
    title: "STD 60KW",
    subtitle: "60 KW POWER SETUP",
    capacity: "60 kW",
    price: "₹ 10 Lakhs",
    space: "400 sq. ft",
    features: [
      "Space Requirement: 400 sq. ft",
      "ARAI Certified",
      "IP55 / IP66 Protection",
    ],
    desc: "Dual CCS2 fast charger ideal for busy state highways and city centers.",
    image: "/franchise/60 kW.webp",
    income: "₹ 10,000 / month",
    units: "4,000 units / month",
    returns: "₹ 16,00,000",
  },
  {
    title: "STD 120KW",
    subtitle: "120 KW POWER SETUP",
    capacity: "120 kW",
    price: "₹ 20 Lakhs",
    space: "500 sq. ft",
    features: [
      "Space Requirement: 500 sq. ft",
      "ARAI Certified",
      "IP55 / IP66 Protection",
    ],
    desc: "Heavy-duty ultra fast dual gun station for expressways & high traffic.",
    image: "/franchise/120 kW.webp",
    income: "₹ 20,000 / month",
    units: "8,000 units / month",
    returns: "₹ 32,00,000",
  },
  {
    title: "SUPER HUB",
    subtitle: "240 KW POWER SETUP",
    capacity: "240 kW",
    price: "₹ 1 Crore",
    space: "3,000 sq. ft",
    features: [
      "Space Requirement: 3,000 sq. ft",
      "ARAI Certified",
      "IP55 / IP66 Protection",
    ],
    desc: "Multi-gun charging canopy hub for fleet operators & commercial plazas.",
    image: "/franchise/Super Hub.webp",
    income: "₹ 1,00,000 / month",
    units: "15,000 units / month",
    returns: "₹ 1,60,00,000",
  },

];

export default function FranchiseModels() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const models = DEFAULT_MODELS;

  const handleEnquiry = (title: string) => {
    setSelectedModel(title);
    setIsModalOpen(true);
  };

  return (
    <section
      id="franchise-models"
      className="relative w-full py-16 md:py-24 bg-[#ffff] text-slate-900 font-poppins border-b border-slate-200"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >

      {/* Background Watermark/Pattern */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#00b14f]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00b14f]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full px-[5%] relative z-10 text-center">

        {/* Header */}
        <div className="flex flex-col items-center mb-14 max-w-4xl mx-auto space-y-3">
          <span className="text-[#00b14f] text-xs font-black uppercase tracking-[0.25em]">
            OUR EV CHARGING FRANCHISE MODELS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight leading-tight">
            EXPLORE OUR <span className="text-[#00b14f]">MODELS</span>
          </h2>
          <p className="text-slate-600 text-[16px] leading-relaxed font-normal">
            Relux offers a refundable business model with guaranteed monthly income, specifically tailored to suit the unique needs of your site. Whether it’s a city location with limited space, a highway site or large commercial property, we offer flexible models to best match your location. We also provide EMI options to make getting started more accessible.
          </p>
        </div>

        {/* 3 Cards Grid - Center Aligned */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 items-stretch w-full max-w-6xl mx-auto">
          {models.map((model, idx) => (
            <div
              key={idx}
              className="w-full bg-white border border-slate-100 rounded-4xl p-4 sm:p-5 shadow-lg hover:shadow-2xl hover:border-[#00b14f]/40 transition-all duration-300 flex flex-col justify-between text-left group"
            >
              {/* Image Header with Price Badge */}
              <div className="relative h-40 sm:h-44 w-full rounded-2xl overflow-hidden bg-slate-100 mb-5">
                {model.image ? (
                  <img
                    src={model.image}
                    alt={model.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-[#0a1a10] flex items-center justify-center">
                    <Zap className="w-10 h-10 text-[#00b14f]" />
                  </div>
                )}
                {/* Price Badge Overlay */}
                {model.price && (
                  <div className="absolute top-3 right-3 bg-[#69d98a] text-black font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    {model.price}
                  </div>
                )}
              </div>

              {/* Title & Power Setup Subtitle */}
              <div className="mb-4">
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight mb-0.5">
                  {model.title}
                </h3>
                <p className="text-[#00b14f] text-[11px] font-extrabold uppercase tracking-wider">
                  {model.subtitle || `${model.capacity} POWER SETUP`}
                </p>
              </div>

              {/* Specs Box (EST. PRICE | MIN SPACE) */}
              <div className="bg-[#f4faf6] border border-slate-100/90 rounded-2xl p-3 sm:p-3.5 grid grid-cols-2 gap-2 text-left mb-5">
                <div>
                  <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-wider block mb-0.5">
                    EST. PRICE
                  </span>
                  <span className="text-[#00b14f] text-xs font-black block">
                    {model.price}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-wider block mb-0.5">
                    MIN SPACE
                  </span>
                  <span className="text-slate-900 text-xs font-black block">
                    {model.space}
                  </span>
                </div>
              </div>

              {/* Bullet Features List with Green Checkmarks */}
              <div className="space-y-2.5 mb-5 flex-1">
                {model.features && model.features.length > 0 && (
                  model.features.map((feat: string, fIdx: number) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 font-semibold leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-[#00b14f] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Guaranteed Income Stats */}
              {/* {(model.income || model.units || model.returns) && (
                <div className="mb-5 rounded-2xl bg-[#0a1a10] border border-[#00b14f]/25 p-4 space-y-2.5">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00b14f] mb-3">Guaranteed Returns</p>
                  {model.income && (
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-[11px] font-semibold">Min. Monthly Income</span>
                      <span className="text-white font-extrabold text-[12px]">{model.income}</span>
                    </div>
                  )}
                  {model.units && (
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-[11px] font-semibold">Threshold Units</span>
                      <span className="text-white font-extrabold text-[12px]">{model.units}</span>
                    </div>
                  )}
                  {model.returns && (
                    <div className="flex items-center justify-between border-t border-white/10 pt-2.5 mt-1">
                      <span className="text-white/60 text-[11px] font-semibold">Est. Returns</span>
                      <span className="text-[#00b14f] font-extrabold text-[13px]">{model.returns}</span>
                    </div>
                  )}
                </div>
              )} */}

              {/* ENQUIRE NOW → Button */}
              <button
                onClick={() => handleEnquiry(model.title)}
                className="w-full py-3.5 rounded-full bg-[#00b14f] hover:bg-[#009643] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] cursor-pointer"
              >
                <span>ENQUIRE NOW</span>
                <MoveRight className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>

        {/* Floating Common Note Banner at Bottom */}
        {/* <div className="mt-12 max-w-4xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#e8f8ef] text-[#00b14f] flex items-center justify-center shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              <strong className="text-slate-900 font-extrabold">Common Note:</strong> Average EB tariff is ₹12/unit. Actual electricity tariff may vary by state and DISCOM tariff structure.
            </div>
          </div>

        </div> */}

      </div>

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modelTitle={selectedModel}
      />
    </section>
  );
}
