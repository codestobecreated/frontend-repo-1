import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomeHero() {
  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center bg-black overflow-hidden font-sans">
      {/* Background Banner Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/relux-electric-tamilnadu-banner.webp"
          alt="Relux Electric EV Charging Station Network"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[75%_center] sm:object-[68%_center] lg:object-center"
        />

        {/* Soft, light gradient overlay - brightens image while keeping text legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 via-50% to-transparent pointer-events-none" />

        {/* Subtle top gradient under navbar */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-400 mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-24 pb-12 sm:pb-16">
        <div className="max-w-md sm:max-w-lg lg:max-w-[34rem] flex flex-col items-start text-left">

          {/* Main Hero Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[3rem] font-black text-white tracking-tight leading-[1.14] mb-3.5 sm:mb-4.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            India&apos;s Most Trusted <br className="hidden sm:inline" />
            <span className="text-[#00e676]">EV Charging Network</span>
          </h1>

          {/* Description Paragraph */}
          <p className="text-zinc-100 text-xs sm:text-sm md:text-base leading-relaxed max-w-md sm:max-w-lg mb-6 sm:mb-7 font-normal drop-shadow-[0_1px_5px_rgba(0,0,0,0.5)]">
            Relux Electric builds the infrastructure for a smarter, more sustainable, and better connected future of mobility. From EV charging solutions to the systems that support their adoption, we make the transition to electric mobility simpler for businesses, communities, and drivers.
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Primary Button: Partner With Us */}
            <Link
              href="/business/franchise"
              className="inline-flex items-center justify-center gap-2 bg-[#00b14f] hover:bg-[#00c853] text-white font-extrabold text-xs sm:text-sm px-6 sm:px-7 py-2.5 sm:py-3 rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(0,177,79,0.35)] hover:shadow-[0_12px_28px_rgba(0,177,79,0.5)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Partner With Us</span>
            </Link>

            {/* Secondary Button: Charger as a Service */}
            <Link
              href="/business/caas"
              className="inline-flex items-center justify-center gap-2 bg-black/45 hover:bg-black/65 text-white font-bold text-xs sm:text-sm px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border border-white/25 hover:border-white/50 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Charger as a Service</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
