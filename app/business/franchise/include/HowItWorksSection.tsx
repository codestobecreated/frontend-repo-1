"use client";

import React, { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import EnquiryModal from "./EnquiryModal";

const STEPS = [
  {
    num: "01",
    title: "Share Your Location",
    desc: "Tell us about your property — whether it's a highway plot, commercial space, residential complex or fleet depot.",
  },
  {
    num: "02",
    title: "Site Assessment",
    desc: "Our team evaluates power availability, footfall, accessibility and infrastructure feasibility at your site.",
  },
  {
    num: "03",
    title: "Find the Right Setup",
    desc: "We recommend the charger type, capacity and configuration best suited for your specific location and use case.",
  },
  {
    num: "04",
    title: "Plan & Build the Infrastructure",
    desc: "Civil, electrical and network groundwork is executed by our certified installation partners.",
  },
  {
    num: "05",
    title: "Go Live",
    desc: "Your station is commissioned, tested and made live on the Relux network — ready to charge.",
  },
  {
    num: "06",
    title: "Ongoing Support from Relux",
    desc: "Remote monitoring, maintenance coordination and technical support keeps your station running.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function HowItWorksSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className="relative w-full py-20 md:py-28 bg-[#031d10] text-white font-poppins overflow-hidden border-b border-emerald-900/40"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >
      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[320px] bg-[#00b14f]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00b14f]/8 rounded-full blur-3xl pointer-events-none" />
      {/* Dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00b14f_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07] pointer-events-none" />

      <div className="max-w-[1550px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">

        {/* ── Header ── */}
        <motion.div {...fadeUp(0)} className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-5">
           
            <div className="inline-flex items-center gap-2 text-[#00b14f] text-lg font-extrabold uppercase tracking-wider">
             
              <span>FROM SITE TO CHARGING STATION</span>
            </div>
           
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            The Right Charger Needs the{" "}
            <span className="text-[#00b14f]">Right Location</span>
          </h2>
          <p className="mt-4 text-white/60 text-[16px] max-w-2xl mx-auto leading-relaxed font-normal">
            A highway property, commercial space, residential development or fleet location can each call for a different charging setup.
            Relux evaluates your location before recommending what fits.
          </p>
        </motion.div>

        {/* ── Steps Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              {...fadeUp(0.08 * idx)}
              className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-7 md:p-8 hover:border-[#00b14f]/40 hover:bg-white/[0.055] transition-all duration-400 overflow-hidden"
            >
              {/* Top green glow on hover */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00b14f] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Step Number — large watermark */}
              {/* <span className="absolute top-5 right-6 text-6xl font-black text-white/[0.04] select-none leading-none pointer-events-none">
                {step.num}
              </span> */}

              {/* Step badge */}
              <span className="inline-block text-[10px] font-black uppercase tracking-[0.18em] text-[#00b14f] bg-[#00b14f]/10 border border-[#00b14f]/25 px-3 py-1 rounded-full mb-5">
                STEP {step.num}
              </span>

              {/* Title */}
              <h3 className="text-white font-extrabold text-lg md:text-xl leading-snug mb-3 group-hover:text-[#00b14f] transition-colors duration-300">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-[16px] leading-relaxed font-normal">
                {step.desc}
              </p>

              {/* Bottom accent line */}
              <div className="mt-6 w-8 h-[2px] bg-[#00b14f]/40 rounded-full group-hover:w-14 group-hover:bg-[#00b14f] transition-all duration-400" />
            </motion.div>
          ))}
        </div>

        {/* ── CTA Banner ── */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-12 md:mt-16 relative flex flex-col md:flex-row items-center justify-between gap-6 px-8 md:px-12 py-8 rounded-2xl border border-[#00b14f]/20 bg-white/[0.03] overflow-hidden"
        >
          {/* Glow stripe */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#00b14f]/60 to-transparent" />

          <div className="text-center md:text-left">
            <span className="text-[#00b14f] font-extrabold text-xs uppercase tracking-widest block mb-1">
              HAVE QUESTIONS ABOUT SITE SUITABILITY?
            </span>
            <h4 className="text-white font-black text-xl sm:text-2xl md:text-3xl tracking-tight">
              Not Sure If Your Location Is Right?
            </h4>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="bg-[#00b14f] hover:bg-white text-white hover:text-[#031d10] px-8 py-3.5 rounded-xl font-extrabold text-sm flex items-center gap-2.5 transition-all duration-300 shadow-lg shadow-[#00b14f]/20 cursor-pointer shrink-0 active:scale-95"
          >
            <span>Talk to Relux</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modelTitle="Location Evaluation"
      />
    </section>
  );
}
