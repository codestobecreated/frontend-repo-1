"use client";

import React from "react";
import Image from "next/image";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ZeroModal from "./ZeroModal";

export default function ZeroHero() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isModalOpen = searchParams.get("inquiry") === "form" || searchParams.get("status") === "success";

  const handleOpenModal = () => {
    router.push(`${pathname}?inquiry=form`, { scroll: false });
  };

  const handleCloseModal = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <section
      className="relative w-full bg-black overflow-hidden pt-8 pb-16 md:pt-16 md:pb-8 px-6 font-poppins"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >
      {/* Signature Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00b14f]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00b14f]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column: Elite Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col h-full justify-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#00b14f]" />
              <span className="text-[#00b14f] text-xs font-black uppercase ">
                Zero Investment Model
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.05] mb-8 uppercase">
              REVENUE WITHOUT <br />
              <span className="text-[#00b14f]">CAPITAL.</span>
            </h1>

            <p className="text-zinc-200 text-base md:text-[17px] leading-relaxed mb-10 max-w-lg font-normal">
              Partner with RELUX Electric for a zero-investment EV charging station at your location. Transform your idle space into a recurring revenue stream without any upfront costs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {[
                "100% Asset Ownership",
                "Revenue Sharing Model",
                "Full Technical Support",
                "24/7 Monitoring"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 rounded-lg bg-[#00b14f]/20 flex items-center justify-center shrink-0 border border-[#00b14f]/40">
                    <FiCheck className="w-3.5 h-3.5 text-[#00b14f] stroke-[3.5]" />
                  </div>
                  <span className="text-white font-bold text-[13px] md:text-[14px] uppercase tracking-wide">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleOpenModal}
                className="w-full sm:w-fit px-9 py-4 bg-[#00b14f] hover:bg-white hover:text-black text-white font-black text-xs md:text-sm uppercase tracking-[0.25em] rounded-sm transition-all duration-300 shadow-xl shadow-[#00b14f]/30 active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Partner Now</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Visual Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative grid grid-cols-2 gap-4 h-[400px] md:h-[500px]"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
              <Image
                src="/images/zero.jpg"
                alt="Elite Station"
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
                <Image
                  src="/about/relux_website_img.webp"
                  alt="Relux Tech"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-gradient-to-br from-[#00b14f] via-[#009b45] to-[#007835] flex items-center justify-center p-6 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_70%)] pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-none mb-3 drop-shadow-[0_4px_14px_rgba(0,0,0,0.6)]">
                    0%
                  </span>

                  <span className="text-xs sm:text-sm font-black uppercase tracking-[0.22em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    Investment Cost
                  </span>

                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <ZeroModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
