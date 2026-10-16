"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Zap, TrendingUp, ShieldCheck } from "lucide-react";
import { FAQS_DATA } from "./faqData";

export default function FranchiseFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="py-16 md:py-24 bg-[#0a0a0a] text-white border-t border-white/5 relative overflow-hidden font-poppins"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00b14f]/10 border border-[#00b14f]/20 text-[#00b14f] text-xs font-bold uppercase tracking-widest mb-4">
            <HelpCircle className="w-4 h-4" /> Got Questions?
          </div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white mb-4">
            Frequently Asked <span className="text-[#00b14f]">Questions</span>
          </h2>
          <p className="text-zinc-400 text-[16px] leading-relaxed">
            Everything you need to know about starting an EV charging station business with Relux Electric.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-3.5">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-zinc-900/90 border-[#00b14f]/40 shadow-lg shadow-[#00b14f]/5"
                    : "bg-zinc-950/60 border-white/5 hover:border-white/15"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm md:text-base font-bold text-zinc-100 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#00b14f] text-black rotate-180"
                        : "bg-white/5 text-zinc-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out px-6 ${
                    isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 pb-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <p className="text-zinc-300 text-[16px] leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
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
