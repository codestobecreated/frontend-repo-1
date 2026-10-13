"use client";

import React, { useState, useMemo } from "react";
import { CHARGER_PLANS, ChargerPlan } from "@/data/chargerPlans";
import { calculateROI, formatCroresOrLakhs } from "@/utils/roiCalculator";
import {
  TrendingUp,
  Clock,
  Coins,
  Settings,
  Zap,
  Building2,
  Leaf,
  Car,
  Landmark,
  ArrowRight,
  Plus,
  Minus,
  Calendar,
} from "lucide-react";

export default function ROICalculator() {
  // State matching screenshot inputs
  const [selectedPlan, setSelectedPlan] = useState<ChargerPlan>(CHARGER_PLANS[0]); // 30 kW
  const [stationCount, setStationCount] = useState<number>(1);
  const [spaceSqFt, setSpaceSqFt] = useState<number>(200);
  const [ebTariff, setEbTariff] = useState<number>(12);
  const [operationalDays, setOperationalDays] = useState<number>(365);
  const [dailySessions, setDailySessions] = useState<number>(18);
  const [avgEnergyPerSession, setAvgEnergyPerSession] = useState<number>(26);

  // Synchronize space sq ft and session parameters when plan changes
  const handleSelectPlan = (plan: ChargerPlan) => {
    setSelectedPlan(plan);
    setSpaceSqFt((plan.defaultSpaceSqFt || 200) * stationCount);
    if (plan.defaultDailySessions !== undefined) {
      setDailySessions(plan.defaultDailySessions);
    }
    if (plan.defaultAvgEnergy !== undefined) {
      setAvgEnergyPerSession(plan.defaultAvgEnergy);
    }
  };

  const handleStationChange = (delta: number) => {
    const nextCount = Math.max(1, stationCount + delta);
    setStationCount(nextCount);
    setSpaceSqFt((selectedPlan.defaultSpaceSqFt || 200) * nextCount);
  };

  // Calculation Result
  const result = useMemo(() => {
    return calculateROI({
      customTariff: ebTariff,
      chargerPlan: selectedPlan,
      dailySessions,
      avgEnergyPerSession,
      customerChargingPrice: 21,
      stationCount,
      operationalDays,
    });
  }, [ebTariff, selectedPlan, dailySessions, avgEnergyPerSession, stationCount, operationalDays]);

  // Year-wise detail label descriptors
  const yearDescriptors = [
    { label: "Year 1", tag: "Return" },
    { label: "Year 2", tag: "Growth" },
    { label: "Year 3", tag: "Profit" },
    { label: "Year 4", tag: "Strong Gain" },
    { label: "Year 5", tag: "Net Value" },
  ];

  // Chart SVG Coordinates Math (Matching screenshot layout)
  const chartHeight = 245;
  const chartWidth = 350;
  const paddingLeft = 58;
  const paddingRight = 18;
  const paddingTop = 45;
  const paddingBottom = 40;

  const usableWidth = chartWidth - paddingLeft - paddingRight;
  const usableHeight = chartHeight - paddingTop - paddingBottom;

  const maxVal = Math.max(result.investmentAmount * 1.4, result.annualNetIncome * 5 * 1.15, 10000000);

  const mapX = (idx: number) => paddingLeft + (idx / 5) * usableWidth;
  const mapY = (val: number) => paddingTop + usableHeight * (1 - Math.min(1, val / maxVal));

  const yTicks = [
    { val: maxVal, label: formatCrL(maxVal) },
    { val: maxVal * 0.8, label: formatCrL(maxVal * 0.8) },
    { val: maxVal * 0.6, label: formatCrL(maxVal * 0.6) },
    { val: maxVal * 0.4, label: formatCrL(maxVal * 0.4) },
    { val: maxVal * 0.2, label: formatCrL(maxVal * 0.2) },
    { val: 0, label: "₹0" },
  ];

  function formatCrL(amt: number): string {
    if (amt >= 10000000) return `₹${(amt / 10000000).toFixed(0)}Cr`;
    if (amt >= 100000) return `₹${(amt / 100000).toFixed(0)}L`;
    return `₹${Math.round(amt / 1000)}k`;
  }

  const chartPoints = result.chartPoints;

  // Trendline Path through node tops
  const trendPoints = chartPoints.map((p) => ({
    x: mapX(p.yearNum),
    y: mapY(p.value),
  }));

  const trendlinePath = trendPoints.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  return (
    <section id="roi-calculator" className="w-full py-12 md:py-16 bg-white text-zinc-900 font-sans border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
        
        {/* ============================================================ */}
        {/* SECTION HEADER */}
        {/* ============================================================ */}
        <div className="text-center max-w-4xl mx-auto space-y-2.5 mb-8">
          <span className="text-[#00b14f] text-xs font-black uppercase tracking-[0.3em]">
            INTERACTIVE ROI TOOL
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black uppercase tracking-tight leading-tight">
            Calculate Your Franchise{" "}
            <span className="text-[#00b14f]">Returns</span>
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-semibold">
            Select your charger plan, adjust daily charging sessions, and project your exact 5-year net profits & payback timeline.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 1. TOP STATS BAR (3 CARDS ROW) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Annualized ROI */}
          <div className="bg-emerald-50/80 border border-emerald-100/80 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-emerald-100 rounded-xl text-[#00873d] shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-zinc-900 tracking-tight">
                +{result.annualRoiPercent}%
              </div>
              <div className="text-xs font-bold text-zinc-500">
                Annualized ROI
              </div>
            </div>
          </div>

          {/* Card 2: Payback Period */}
          <div className="bg-emerald-50/80 border border-emerald-100/80 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-emerald-100 rounded-xl text-[#00873d] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-zinc-900 tracking-tight">
                {result.paybackYearsDisplay}
              </div>
              <div className="text-xs font-bold text-zinc-500">
                Payback Period
              </div>
            </div>
          </div>

          {/* Card 3: 5-Year Net Gain */}
          <div className="bg-emerald-50/80 border border-emerald-100/80 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-emerald-100 rounded-xl text-[#00873d] shrink-0">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-zinc-900 tracking-tight">
                {result.fiveYearNetGainDisplay}
              </div>
              <div className="text-xs font-bold text-zinc-500">
                5-Year Net Gain
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. MAIN 2-COLUMN DASHBOARD */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* LEFT COLUMN: INVESTMENT SETUP CARD (5 COLS) */}
          <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-3xl p-6 md:p-7 space-y-6 shadow-sm flex flex-col">
            {/* Title Header */}
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-emerald-100 rounded-xl text-[#00873d]">
                <Settings className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-extrabold text-zinc-900">
                  Investment Setup
                </h3>
                <p className="text-xs text-zinc-500">
                  Customize your plan as per your location and capacity
                </p>
              </div>
            </div>

            {/* Charger Type Pill Selection */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-700 block">
                Charger Type
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CHARGER_PLANS.map((plan) => {
                  const isSelected = selectedPlan.id === plan.id;
                  return (
                    <button
                      key={plan.id}
                      onClick={() => handleSelectPlan(plan)}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        isSelected
                          ? "bg-emerald-50 border-[#00873d] text-[#00873d] shadow-sm"
                          : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300"
                      }`}
                    >
                      {plan.id === "superhub" ? (
                        <Building2 className="w-3.5 h-3.5" />
                      ) : (
                        <Zap className="w-3.5 h-3.5" />
                      )}
                      <span>{plan.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Usage & Session Parameters Group */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-emerald-100 rounded text-[#00873d]">
                    <Zap className="w-3.5 h-3.5" />
                  </span>
                  <span>Daily Usage & Session Parameters</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-semibold">
                  Revenue Calculator Controls
                </span>
              </div>

              {/* Select Your Plan Amount Dropdown */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-500 block">
                  Select Your Plan Amount
                </label>
                <select
                  value={selectedPlan.id}
                  onChange={(e) => {
                    const plan = CHARGER_PLANS.find((p) => p.id === e.target.value);
                    if (plan) handleSelectPlan(plan);
                  }}
                  className="w-full bg-white border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#00873d] shadow-sm"
                >
                  {CHARGER_PLANS.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} – {plan.investmentDisplay} ({plan.capacityRange})
                    </option>
                  ))}
                </select>
              </div>

              {/* Daily Charging Sessions & Avg Energy per Session Grid */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Daily Charging Sessions Counter */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-500 block">
                    Daily Charging Sessions
                  </label>
                  <div className="flex items-center justify-between bg-white border border-zinc-300 rounded-xl px-3 py-2 text-xs font-bold text-zinc-800 shadow-sm">
                    <button
                      onClick={() => setDailySessions((prev) => Math.max(1, prev - 1))}
                      className="p-1 hover:bg-zinc-100 rounded text-zinc-600 transition"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-black text-[#00873d]">{dailySessions}</span>
                    <button
                      onClick={() => setDailySessions((prev) => prev + 1)}
                      className="p-1 hover:bg-zinc-100 rounded text-zinc-600 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Avg Energy per Session (kWh) Counter */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-500 block">
                    Avg Energy per Session
                  </label>
                  <div className="flex items-center justify-between bg-white border border-zinc-300 rounded-xl px-3 py-2 text-xs font-bold text-zinc-800 shadow-sm">
                    <button
                      onClick={() => setAvgEnergyPerSession((prev) => Math.max(5, prev - 1))}
                      className="p-1 hover:bg-zinc-100 rounded text-zinc-600 transition"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-black text-[#00873d]">{avgEnergyPerSession} kWh</span>
                    <button
                      onClick={() => setAvgEnergyPerSession((prev) => prev + 1)}
                      className="p-1 hover:bg-zinc-100 rounded text-zinc-600 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Parameters Inputs */}
            <div className="space-y-3 pt-1 border-t border-zinc-100">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-800">
                <span className="p-1 bg-emerald-100 rounded text-[#00873d]">
                  <TrendingUp className="w-3.5 h-3.5" />
                </span>
                <span>Key Parameters</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-600 font-semibold">
                    Average Electricity Tariff (₹/Unit)
                  </span>
                  <input
                    type="number"
                    value={ebTariff}
                    onChange={(e) => setEbTariff(Math.max(1, Number(e.target.value)))}
                    className="w-24 bg-white border border-zinc-300 rounded-xl px-3 py-1.5 text-right font-black text-zinc-900 text-xs shadow-sm focus:border-[#00873d] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-600 font-semibold">
                    Operational Days (Per Year)
                  </span>
                  <input
                    type="number"
                    value={operationalDays}
                    onChange={(e) => setOperationalDays(Math.max(1, Math.min(365, Number(e.target.value))))}
                    className="w-24 bg-white border border-zinc-300 rounded-xl px-3 py-1.5 text-right font-black text-zinc-900 text-xs shadow-sm focus:border-[#00873d] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Calculate My Returns CTA Button */}
            <button
              onClick={() => {
                const el = document.getElementById("roi-calculator");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full bg-[#00873d] hover:bg-[#007334] text-white font-extrabold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg text-sm"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Calculate My Returns</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* RIGHT COLUMN: 5-YEAR ROI PROJECTION CARD (7 COLS) */}
          <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-3xl p-6 md:p-7 space-y-6 shadow-sm flex flex-col justify-between">
            {/* Header & Payback Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="p-2.5 bg-emerald-100 rounded-xl text-[#00873d]">
                  <TrendingUp className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-zinc-900">
                    5-Year ROI Projection
                  </h3>
                  <p className="text-xs text-zinc-500">
                    See how your investment grows year by year
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200/60 rounded-xl text-[#00873d] text-xs font-extrabold self-start sm:self-auto">
                <Calendar className="w-3.5 h-3.5" />
                <span>Payback in {result.paybackYearsDisplay}</span>
              </div>
            </div>

            {/* CHART & YEAR-WISE DETAILS MATRIX */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center flex-1 my-auto">
              
              {/* SVG CHART (8 Cols) */}
              <div className="md:col-span-8 overflow-x-auto select-none">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full h-56 sm:h-64 min-w-70"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs >
                    {/* Emerald Bar Gradient */}
                    <linearGradient id="lightEmeraldBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00b14f" />
                      <stop offset="100%" stopColor="#00873d" />
                    </linearGradient>

                    {/* Year 0 Grey Bar Gradient */}
                    <linearGradient id="greyBarGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d4d4d8" />
                      <stop offset="100%" stopColor="#a1a1aa" />
                    </linearGradient>
                  </defs>

                  {/* Y Gridlines */}
                  {yTicks.map((tick, idx) => {
                    const yPos = mapY(tick.val);
                    return (
                      <g key={idx}>
                        <line
                          x1={paddingLeft}
                          y1={yPos}
                          x2={chartWidth - paddingRight}
                          y2={yPos}
                          stroke="#f4f4f5"
                          strokeWidth="1"
                        />
                        <text
                          x={paddingLeft - 8}
                          y={yPos + 3}
                          fill="#a1a1aa"
                          fontSize="9"
                          fontWeight="700"
                          textAnchor="end"
                        >
                          {tick.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* GREEN CONNECTING TRENDLINE */}
                  <path
                    d={trendlinePath}
                    stroke="#00873d"
                    strokeWidth="1.5"
                    opacity="0.8"
                  />

                  {/* STEPPED BARS FOR YEAR 0 TO YEAR 5 */}
                  {chartPoints.map((pt) => {
                    const barTopY = mapY(pt.value);
                    const height = Math.max(8, mapY(0) - barTopY);
                    const bw = 18;
                    const barX = mapX(pt.yearNum) - bw / 2;
                    const isYear0 = pt.yearNum === 0;

                    return (
                      <g key={pt.yearNum}>
                        {/* Bar */}
                        <rect
                          x={barX}
                          y={barTopY}
                          width={bw}
                          height={height}
                          rx="6"
                          fill={isYear0 ? "url(#greyBarGrad)" : "url(#lightEmeraldBar)"}
                        />

                        {/* Top Node Dot */}
                        <circle
                          cx={mapX(pt.yearNum)}
                          cy={barTopY}
                          r="3"
                          fill={isYear0 ? "#71717a" : "#00873d"}
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        />

                        {/* Value Badge above bar */}
                        <g>
                          <rect
                            x={mapX(pt.yearNum) - 24}
                            y={barTopY - 20}
                            width="48"
                            height="14"
                            rx="4"
                            fill="#ffffff"
                            stroke="#e4e4e7"
                            strokeWidth="1"
                            className="shadow-sm"
                          />
                          <text
                            x={mapX(pt.yearNum)}
                            y={barTopY - 10}
                            fill="#18181b"
                            fontSize="8.5"
                            fontWeight="900"
                            textAnchor="middle"
                          >
                            {pt.displayValue}
                          </text>
                        </g>

                        {/* X Axis Label */}
                        <text
                          x={mapX(pt.yearNum)}
                          y={mapY(0) + 16}
                          fill="#71717a"
                          fontSize="8.5"
                          fontWeight="700"
                          textAnchor="middle"
                        >
                          {isYear0 ? "Year 0" : `Year ${pt.yearNum}`}
                        </text>
                        {isYear0 && (
                          <text
                            x={mapX(pt.yearNum)}
                            y={mapY(0) + 25}
                            fill="#a1a1aa"
                            fontSize="7.5"
                            fontWeight="600"
                            textAnchor="middle"
                          >
                            Investment
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* BASELINE */}
                  <line
                    x1={paddingLeft - 10}
                    y1={mapY(0)}
                    x2={chartWidth - paddingRight + 10}
                    y2={mapY(0)}
                    stroke="#e4e4e7"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              {/* YEAR-WISE DETAILS PANEL (4 Cols) */}
              <div className="md:col-span-4 bg-zinc-50/80 border border-zinc-200/80 rounded-2xl p-3.5 space-y-2">
                <span className="text-[11px] font-extrabold text-zinc-700 block border-b border-zinc-200/80 pb-2">
                  Year-wise Details
                </span>

                <div className="space-y-2">
                  {yearDescriptors.map((desc, idx) => {
                    const pt = chartPoints.find((p) => p.yearNum === idx + 1);
                    return (
                      <div
                        key={desc.label}
                        className="flex items-center justify-between text-xs py-1 border-b border-zinc-200/40 last:border-0"
                      >
                        <span className="text-zinc-600 font-semibold">
                          {desc.label}
                        </span>
                        <div className="text-right">
                          <span className="text-zinc-900 font-black block">
                            {pt ? pt.displayValue : "₹0"}
                          </span>
                          <span className="text-[9px] text-zinc-500 font-semibold block">
                            {desc.tag}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* TOTAL NET GAIN BANNER (LIGHT GREEN) */}
            <div className="bg-[#eafaf1] border border-emerald-200/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="p-2.5 bg-[#00873d] text-white rounded-full">
                  <Zap className="w-5 h-5 fill-white" />
                </span>
                <span className="text-sm font-extrabold text-zinc-900">
                  Total Net Gain (5 Years)
                </span>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-2xl font-black text-zinc-900 tracking-tight">
                  {result.fiveYearNetGainDisplay}
                </span>

                <div className="border-l border-emerald-300/80 pl-4 text-right">
                  <span className="text-[10px] text-zinc-500 font-bold block uppercase">
                    Total ROI
                  </span>
                  <span className="text-sm font-black text-[#00873d]">
                    +{result.fiveYearTotalRoiPercent}%
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ============================================================ */}
        {/* 3. CTA BUTTON */}
        {/* ============================================================ */}
        <div className="flex justify-center pt-2">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#00b14f] hover:bg-[#009643] text-white font-extrabold px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03]"
          >
            Make An Enquiry
          </a>
        </div>

      </div>
    </section>
  );
}
