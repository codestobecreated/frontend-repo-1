"use client";

import React from "react";
import { motion } from "framer-motion";

export default function OurGoals() {
  return (
    <section
      className="relative w-full py-16 md:py-24 bg-[#050505] overflow-hidden font-poppins border-t border-white/5"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-[#00b14f]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 text-center">
        
        {/* Simple & Clean Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-12"
        >
          <span className="block text-[#00b14f] text-[12px] font-bold uppercase tracking-[0.3em] mb-3">
            Our Goals
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight uppercase">
            SUSTAINABLE MOBILITY IS THE PATH <br className="hidden sm:inline" />
            <span className="text-[#00b14f]">TO THE FUTURE.</span>
          </h2>
        </motion.div>

        {/* Clean Paragraph Reading Flow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="space-y-6 text-zinc-200 text-base md:text-[17px] leading-relaxed font-normal text-center md:text-left"
        >
          <p className="text-white font-semibold text-base md:text-[18px] leading-relaxed border-l-2 border-[#00b14f] pl-4">
            The transition to electric mobility is a vital step towards building a cleaner, more sustainable and future-ready India.
          </p>

          <p>
            Through the wide-scale deployment of EV charging infrastructure, Relux strives to accelerate the adoption of electric vehicles across the country. We believe that for electric mobility to become truly mainstream, charging must be convenient, dependable and available wherever people need it.
          </p>

          <p>
            By supporting this shift towards cleaner transportation, Relux seeks to contribute to India&apos;s journey towards net-zero emissions across the energy and transport sectors.
          </p>

          <p>
            We envision an India where sustainable transportation is not a distant ambition, but an accessible part of everyday life—where cleaner mobility means cleaner air, healthier communities and a better environment for generations to come.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
