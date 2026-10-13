"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { BASE_URL } from "@/app/ui/baceurl";

const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 2000; // 2 seconds

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // easeOutQuad function
      const easeOutQuad = percentage * (2 - percentage);
      
      setCount(Math.floor(easeOutQuad * value));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setCount(value);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animationFrameId = requestAnimationFrame(animateCount);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [value]);

  return <span ref={ref}>{count}</span>;
};

const SimpleABC = () => {
  const [stats, setStats] = useState({
    locations: 150,
    charge_points: 500,
    now_building: 85
  });

  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/network-stats/`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0 && isMounted) {
            setStats({
              locations: data[0].locations || 150,
              charge_points: data[0].charge_points || 500,
              now_building: data[0].now_building || 85
            });
          }
        }
      } catch {
        // Silently retain default stats
      }
    };
    
    fetchStats();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full py-8 md:py-12 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Banner Container - ULTRA COMPACT STATS VERSION */}
        <div className="relative w-full rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-[#00b14f] via-[#009b45] to-[#007a36] py-6 md:py-8 px-8 md:px-12 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,177,79,0.3)] group">
          
          {/* Subtle Decorative Glow */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/10 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-0">
            
            {/* Left side: Heading & Button */}
            <div className="flex flex-col items-center xl:items-start text-center xl:text-left gap-4 xl:w-[30%] shrink-0 xl:pr-10">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white tracking-tighter leading-[1.1]">
                Our Charging <br className="hidden md:block" /> <span className="text-white/80">Network</span>
              </h2>
              <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/30 bg-white/10 hover:bg-white hover:text-[#00b14f] text-white text-[11px] md:text-xs font-bold transition-all duration-300 group/btn">
                <span>Explore Now</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right side: 3-Column Stats Grid with Vertical Separators */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-0">
              
              {/* Item 1: Locations */}
              <div className="flex flex-col items-center text-center flex-1 px-4 md:border-r border-white/20 group/item">
                <span className="text-4xl md:text-5xl font-black text-white tracking-tighter transition-transform group-hover/item:scale-110 duration-500 leading-none mb-1">
                  <Counter value={stats.locations} /><span className="text-white/40">+</span>
                </span>
                <h4 className="text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-[0.2em]">Locations</h4>
              </div>

              {/* Item 2: Charge Points */}
              <div className="flex flex-col items-center text-center flex-1 px-4 md:border-r border-white/20 group/item">
                <span className="text-4xl md:text-5xl font-black text-white tracking-tighter transition-transform group-hover/item:scale-110 duration-500 leading-none mb-1">
                  <Counter value={stats.charge_points} /><span className="text-white/40">+</span>
                </span>
                <h4 className="text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-[0.2em]">Charge Points</h4>
              </div>

              {/* Item 3: Now Building */}
              <div className="flex flex-col items-center text-center flex-1 px-4 group/item">
                <span className="text-4xl md:text-5xl font-black text-white tracking-tighter transition-transform group-hover/item:scale-110 duration-500 leading-none mb-1">
                  <Counter value={stats.now_building} /><span className="text-white/40">+</span>
                </span>
                <h4 className="text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-[0.2em]">Now Building</h4>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default SimpleABC;
