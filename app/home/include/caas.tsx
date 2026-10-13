"use client";

import React from "react";
import Link from "next/link";
import { FiZap, FiArrowRight } from "react-icons/fi";

export default function HomeCaaS() {
  return (
    <section className="relative w-full py-6 md:py-10 bg-[#f8f9fa] overflow-hidden font-sans">
      <div className="w-[95%] 2xl:max-w-400 mx-auto px-4 md:px-8 relative z-10">
        {/* Black Card container with decreased height & increased width */}
        <div className="relative group rounded-2xl md:rounded-3xl overflow-hidden p-6 md:p-8 lg:px-10 bg-black border border-black/10 shadow-xl transition-all duration-500">
          
          {/* Top highlight green gradient line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#00b14f] to-transparent opacity-80" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
            
            {/* Left Glowing Lightning Icon */}
            <div className="shrink-0 relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 z-10 ml-2 md:ml-4">
               <div className="absolute inset-0 bg-[#00b14f] blur-[25px] md:blur-[35px] rounded-full opacity-60 z-0 pointer-events-none scale-150"></div>
               <FiZap className="w-8 h-8 md:w-10 md:h-10 text-white relative z-10 fill-white drop-shadow-[0_0_15px_rgba(0,255,100,0.8)]" />
            </div>

            <div className="flex-1 text-center lg:text-left">
              {/* Title */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug mb-2.5">
                Charging as a Service <span className="text-[#00b14f]">(CaaS)</span>
              </h2>

              {/* Exact User Text Content */}
              <p className="text-white/80 text-sm md:text-base leading-relaxed font-normal max-w-5xl">
                At Relux, we provide Charging as a Service (CaaS), letting you lease your EV chargers from us instead of buying them. We provide the charging infrastructure, technology, operations, and ongoing support—so you can offer EV charging while we take care of the complexity behind it.
              </p>
            </div>

            {/* Interactive Action Button */}
            <div className="shrink-0 w-full lg:w-auto">
              <Link
                href="/business/caas"
                className="group/btn relative inline-flex items-center justify-center gap-2.5 bg-[#00b14f] hover:bg-[#009b45] text-white font-bold text-[13px] md:text-[14px] px-6 py-3 md:px-7 md:py-3.5 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(0,177,79,0.4)] hover:shadow-[0_8px_28px_rgba(0,177,79,0.6)] hover:-translate-y-0.5 overflow-hidden w-full sm:w-auto whitespace-nowrap"
              >
                <div className="absolute inset-0 bg-white/15 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">Explore CaaS</span>
                <FiArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
