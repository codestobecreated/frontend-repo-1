"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function HomeCTABanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-20 md:py-28 overflow-hidden bg-black">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {shouldLoadVideo ? (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="metadata"
            poster="/images/city.jpg"
            className="w-full h-full object-cover opacity-60 transition-opacity duration-1000"
          >
            <source src="/home_video/relux_drone.mp4" type="video/mp4" />
          </video>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center opacity-60"
            style={{ backgroundImage: "url('/images/city.jpg')" }}
          />
        )}
        {/* Solid Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6 md:mb-8">
          PLUG IN. POWER UP. LEAVE THE REST <br />
          BEHIND. THE <span className="text-[#00b14f]">NATION&apos;S FASTEST</span> <br />
          <span className="text-[#00b14f]">CHARGING</span> FOR EVERY EV.
        </h2>

        <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto mb-8 md:mb-10 font-normal">
          Relux Electric has built a strong national charging network that keeps EV owners powered no matter where they roam.
          <span className="text-white"> Move for modern highways</span>, our stations are accessible and trusted 24/7.
        </p>

        <Link
          href="/locations"
          className="inline-flex items-center justify-center bg-[#00b14f] hover:bg-[#009b45] text-white font-bold text-[14px] px-8 py-3.5 rounded-full transition-all duration-300 shadow-[0_8px_24px_rgba(0,177,79,0.4)] hover:shadow-[0_12px_32px_rgba(0,177,79,0.5)] hover:-translate-y-1"
        >
          View Locations
        </Link>
      </div>
    </section>
  );
}
