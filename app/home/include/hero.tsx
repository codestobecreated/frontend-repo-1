import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiZap, FiMapPin, FiUsers, FiCpu, FiTarget, FiHeadphones } from "react-icons/fi";



export default function HomeHero() {
  return (
    <section className="relative w-full h-[80vh] md:h-[95vh] min-h-120 md:min-h-145 flex items-start bg-[#050505] overflow-hidden">

      {/* Background Image */}
      <Image
        src="/images/relux-electric-tamilnadu-banner.webp"
        alt="Relux Electric Tamil Nadu Banner"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="hero-bg absolute inset-0 w-full h-full object-cover opacity-80"
        style={{
          objectPosition: 'var(--hero-bg-pos)',
        }}
      />

      {/* ── Hero Content Card — top left ── */}
      <div className="relative z-10 w-full max-w-400 mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end md:justify-start pt-10 md:pt-56 pb-16 md:pb-0">

        <div className="relative group max-w-[90%] md:max-w-105 lg:max-w-120">

          {/* Outer glow ring */}
          <div className="absolute -inset-0.5 rounded-3xl bg-linear-to-br from-white/30 via-white/10 to-[#00b14f]/15 blur-[3px] opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

          {/* Glass Card - Removed border and top highlight line */}
          <div className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl" />
            <div className="absolute inset-0 bg-linear-to-br from-white/20 via-white/5 to-transparent" />

            <div className="relative z-10 p-5 md:p-6">
              <h1 className="text-white text-[17px] md:text-[19px] lg:text-[21px] font-bold leading-snug mb-2.5 tracking-wide drop-shadow">
                India&apos;s Most Trusted EV Charging Station Network
              </h1>
              <p className="text-white/65 text-[12px] md:text-[13px] leading-relaxed mb-5">
                Relux Electric builds the infrastructure for a cleaner, smarter, and more connected future of mobility. From reliable EV charging solutions to the systems that support their wider adoption, we make the transition to electric mobility simpler for businesses, communities, and drivers.
                We’re not just installing chargers we’re helping build the infrastructure that moves India towards a more sustainable tomorrow.

              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">

                <Link
                  href="/business/franchise"
                  className="group/btn relative inline-flex items-center justify-center gap-2 bg-[#00b14f] hover:bg-[#009b45] text-white font-bold text-[12px] px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_4px_16px_rgba(0,177,79,0.4)] hover:shadow-[0_8px_24px_rgba(0,177,79,0.55)] hover:-translate-y-0.5 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative">Partner With Us</span>
                </Link>
                {/* <Link
                  href="/products"
                  className="group/btn relative inline-flex items-center justify-center gap-2 bg-[#00b14f] hover:bg-[#009b45] text-white font-bold text-[12px] px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_4px_16px_rgba(0,177,79,0.4)] hover:shadow-[0_8px_24px_rgba(0,177,79,0.55)] hover:-translate-y-0.5 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative">View Our Products</span>
                </Link> */}
                <Link
                  href="/business/caas"
                  className="group/btn relative inline-flex items-center justify-center gap-2 bg-[#00b14f] hover:bg-[#009b45] text-white font-bold text-[12px] px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_4px_16px_rgba(0,177,79,0.4)] hover:shadow-[0_8px_24px_rgba(0,177,79,0.55)] hover:-translate-y-0.5 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative">Charger as a Service</span>
                </Link>
              </div>
            </div>
          </div>
        </div>


      </div>

    </section>
  );
}
