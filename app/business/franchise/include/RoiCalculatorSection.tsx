"use client";

import React, { useState } from "react";
import { Calculator, TrendingUp, DollarSign, Zap, MoveRight } from "lucide-react";

interface RoiCalculatorSectionProps {
  onOpenEnquiry?: (modelTitle: string) => void;
}

export default function RoiCalculatorSection({ onOpenEnquiry }: RoiCalculatorSectionProps) {
  const [selectedCharger, setSelectedCharger] = useState("60 kW DC Dual Gun");
  const [dailySessions, setDailySessions] = useState(25);
  const [kwhPerSession, setKwhPerSession] = useState(25);
  const [marginPerKwh, setMarginPerKwh] = useState(5);

  // Financial calculation math
  const dailyKwhTotal = dailySessions * kwhPerSession;
  const dailyMargin = dailyKwhTotal * marginPerKwh;
  const monthlyProfit = dailyMargin * 30;
  const annualProfit = monthlyProfit * 12;

  // Approximate setup cost based on charger model
  const setupCosts: Record<string, number> = {
    "60 kW DC Dual Gun": 1800000,
    "120 kW DC Dual Gun": 2800000,
    "180 kW DC Heavy Hub": 3800000,
  };

  const currentSetupCost = setupCosts[selectedCharger] || 1800000;
  const paybackMonths = Math.round((currentSetupCost / monthlyProfit) * 10) / 10;
  const paybackYears = (paybackMonths / 12).toFixed(1);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleApplyClick = () => {
    const el = document.getElementById("franchise-models");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (onOpenEnquiry) {
      onOpenEnquiry(selectedCharger);
    }
  };

  return (
    <section
      id="roi-calculator"
      className="relative w-full py-20 md:py-28 bg-black overflow-hidden font-poppins border-b border-white/5"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >
      {/* Glow Ornaments */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#00b14f]/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-0.5 bg-[#00b14f]" />
            <span className="text-[#00b14f] text-xs font-black uppercase tracking-[0.3em]">
              Interactive ROI
            </span>
            <span className="w-8 h-0.5 bg-[#00b14f]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase leading-tight">
            Calculate Your Franchise  <span className="text-[#00b14f]">Returns</span>
          </h2>
          <p className="text-white/60 text-[16px] leading-relaxed mt-3 font-normal">
            Adjust the sliders below to estimate your potential revenue and payback timeline.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 shadow-[0_0_80px_rgba(0,177,79,0.15)] grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left Column: Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Charger Selector */}
            <div>
              <label className="text-xs font-black text-white/40 uppercase tracking-widest block mb-3">
                1. Select Franchise Charger Model
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["60 kW DC Dual Gun", "120 kW DC Dual Gun", "180 kW DC Heavy Hub"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedCharger(m)}
                    className={`p-3.5 rounded-xl text-left transition-all border ${
                      selectedCharger === m
                        ? "bg-[#00b14f]/20 border-[#00b14f] text-white shadow-[0_0_20px_rgba(0,177,79,0.2)]"
                        : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                    }`}
                  >
                    <div className="text-xs font-black tracking-tight">{m}</div>
                    <div className="text-[10px] text-[#00b14f] font-bold mt-1">Est. {formatCurrency(setupCosts[m])}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: Daily Sessions */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-white/70 uppercase tracking-wider">Estimated Sessions Per Day</span>
                <span className="text-[#00b14f] text-base font-black px-3 py-1 rounded-lg bg-[#00b14f]/10 border border-[#00b14f]/30">
                  {dailySessions} Sessions
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                step={1}
                value={dailySessions}
                onChange={(e) => setDailySessions(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00b14f]"
              />
              <div className="flex justify-between text-[10px] text-white/30 font-medium">
                <span>10 Sessions (Low)</span>
                <span>35 Sessions (Avg)</span>
                <span>60 Sessions (Peak)</span>
              </div>
            </div>

            {/* Slider 2: Energy Per Session */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-white/70 uppercase tracking-wider">Average Energy Per Session</span>
                <span className="text-[#00b14f] text-base font-black px-3 py-1 rounded-lg bg-[#00b14f]/10 border border-[#00b14f]/30">
                  {kwhPerSession} kWh
                </span>
              </div>
              <input
                type="range"
                min={15}
                max={40}
                step={1}
                value={kwhPerSession}
                onChange={(e) => setKwhPerSession(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00b14f]"
              />
              <div className="flex justify-between text-[10px] text-white/30 font-medium">
                <span>15 kWh (Cars)</span>
                <span>25 kWh (SUVs)</span>
                <span>40 kWh (Fleets)</span>
              </div>
            </div>

            {/* Slider 3: Margin Per kWh */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-white/70 uppercase tracking-wider">Partner Margin Per kWh</span>
                <span className="text-[#00b14f] text-base font-black px-3 py-1 rounded-lg bg-[#00b14f]/10 border border-[#00b14f]/30">
                  ₹{marginPerKwh} / kWh
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={8}
                step={0.5}
                value={marginPerKwh}
                onChange={(e) => setMarginPerKwh(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00b14f]"
              />
              <div className="flex justify-between text-[10px] text-white/30 font-medium">
                <span>₹3/kWh (Base)</span>
                <span>₹5/kWh (Standard)</span>
                <span>₹8/kWh (Premium)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Output Summary (5 cols) */}
          <div className="lg:col-span-5 bg-linear-to-br from-[#0a1a10] via-[#050505] to-black border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00b14f]/10 blur-[50px] rounded-full pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#00b14f]/20 text-[#00b14f] flex items-center justify-center font-black">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase text-base tracking-tight">Financial Projection</h3>
                  <span className="text-white/40 text-[10px]">Estimated Return Summary</span>
                </div>
              </div>

              {/* Monthly Profit Card */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-white/40 font-black uppercase tracking-widest block mb-1">
                  Est. Monthly Margin Profit
                </span>
                <div className="text-3xl font-black text-[#00b14f] tracking-tight">
                  {formatCurrency(monthlyProfit)}
                </div>
              </div>

              {/* Annual Profit & Payback */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[9px] text-white/40 font-black uppercase tracking-widest block mb-1">
                    Annual Net Profit
                  </span>
                  <div className="text-xl font-black text-white tracking-tight">
                    {formatCurrency(annualProfit)}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[9px] text-white/40 font-black uppercase tracking-widest block mb-1">
                    Est. Payback
                  </span>
                  <div className="text-xl font-black text-[#00e667] tracking-tight">
                    {paybackYears} Years
                  </div>
                </div>
              </div>

              {/* Daily Energy Metrics */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-white/60 font-medium">Daily Power Delivered:</span>
                <span className="text-white font-black">{dailyKwhTotal.toLocaleString()} kWh / day</span>
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={handleApplyClick}
              className="mt-8 w-full py-4 rounded-xl bg-[#00b14f] hover:bg-[#00e667] text-black font-black uppercase text-xs tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(0,177,79,0.3)] flex items-center justify-center gap-3 cursor-pointer relative z-10"
            >
              <span>Apply For {selectedCharger}</span>
              <MoveRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
