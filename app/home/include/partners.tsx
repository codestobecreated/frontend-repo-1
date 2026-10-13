import React from "react";

const partners = [
  { name: "Maruti Suzuki" },
  { name: "Ather" },
  { name: "Audi" },
  { name: "BYD" },
  { name: "Casagrand" },
  { name: "Indinfravit" },
  { name: "Mahindra" },
];

export default function HomePartners() {
  return (
    <section className="relative w-full py-8 bg-black overflow-hidden">
      {/* Title Row */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="hidden md:block h-px flex-1 max-w-37.5 bg-linear-to-r from-transparent to-white/20" />
        <h2 className="text-white/80 text-[13px] md:text-[14px] font-semibold tracking-[0.2em] uppercase text-center leading-relaxed">

          Our <span className="text-[#00b14f]">Trusted Partners</span>
        </h2>
        <div className="hidden md:block h-px flex-1 max-w-37.5 bg-linear-to-l from-transparent to-white/20" />
      </div>

      {/* Logo Marquee Row */}
      <div className="relative">
        {/* Edge Fades */}
        <div className="hidden md:block pointer-events-none absolute left-0 top-0 bottom-0 w-40 bg-linear-to-r from-black via-black/80 to-transparent z-10" />
        <div className="hidden md:block pointer-events-none absolute right-0 top-0 bottom-0 w-40 bg-linear-to-l from-black via-black/80 to-transparent z-10" />

        <div className="flex overflow-hidden">
          <div className="flex items-center animate-marquee hover:[animation-play-state:running]! whitespace-nowrap py-6 gap-16 md:gap-32" style={{ animationDuration: "35s" }}>
            {[...partners, ...partners, ...partners].map((partner, i) => (
              <span
                key={i}
                className="text-[18px] md:text-[28px] font-extrabold uppercase tracking-[0.2em] text-white/50 select-none cursor-default"
              >
                {partner.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

