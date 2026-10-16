"use client";

import React from "react";
import { FiTrendingUp, FiSettings, FiActivity } from "react-icons/fi";
import { motion } from "framer-motion";

const features = [
  {
    title: "Additional Income",
    description: "Turn unused land into a steady revenue source. Earn from every EV charge with zero maintenance costs.",
    icon: FiTrendingUp,
  },
  {
    title: "Seamless Integration",
    description: "RELUX handles everything—from installation to operations—so you can focus on your core business.",
    icon: FiSettings,
  },
  {
    title: "Enhanced Visibility",
    description: "Boost your brand's green image and attract premium EV users to your business location.",
    icon: FiActivity,
  },
];

export default function ZeroFeatures() {
  return (
    <section
      className="relative w-full py-16 md:py-24 bg-black overflow-hidden px-6 font-poppins"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header - Elite Style */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#00b14f]" />
              <span className="text-[#00b14f] text-xs font-black uppercase ">
                Location Partner
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end w-full">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter uppercase text-center md:text-left">
                UNLEASH YOUR <br />
                <span className="text-[#00b14f]">IDLE SPACE POTENTIAL.</span>
              </h2>
              <p className="text-zinc-200 text-base md:text-[17px] leading-relaxed max-w-lg md:text-left text-center font-normal">
                Unlock the potential of your unused space with the RELUX Zero Investment Franchise Plan. 
                Whether it's a highway frontage or a hotel parking lot, we transform your property into a high-tech revenue engine.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Features Grid - High Density */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 bg-[#0c0c0c] border border-white/10 hover:border-[#00b14f]/40 transition-all duration-500 rounded-2xl relative overflow-hidden shadow-lg"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00b14f]/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-12 h-12 rounded-xl bg-[#00b14f]/15 flex items-center justify-center mb-6 border border-[#00b14f]/30 group-hover:bg-[#00b14f] transition-all duration-500">
                <feature.icon className="w-6 h-6 text-[#00b14f] group-hover:text-black transition-colors" />
              </div>
              
              <h3 className="text-xl font-black text-white tracking-tight uppercase mb-4">
                {feature.title}
              </h3>
              
              <p className="text-zinc-200 text-[15px] md:text-[16px] leading-relaxed font-normal">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
