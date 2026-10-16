"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import OurGoals from "./our-goals";
import {
  FiZap, FiMapPin, FiHeadphones, FiTrendingUp,
  FiShield, FiCheckCircle, FiFlag, FiCpu,
} from "react-icons/fi";

/* ─── fade-up helper ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true },
});

/* ─── Why Businesses Choose Relux pillars ─── */
const bizPillars = [
  {
    icon: FiZap,
    title: "Fast, Careful Execution",
    body: "Our teams install quickly without cutting corners — engineered to Relux's own safety and performance standards. Partners start earning sooner, not months later.",
  },
  {
    icon: FiHeadphones,
    title: "Round-the-Clock Regional Support",
    body: "Support doesn't stop once a station goes live. 24/7 assistance in regional languages — so issues get resolved in hours, not days.",
  },
  {
    icon: FiMapPin,
    title: "A Network Built for Scale",
    body: "A strong bench of service centres and technicians backs every installation, across every state we operate in.",
  },
  {
    icon: FiCpu,
    title: "Advanced, Future-Ready Technology",
    body: "From fast chargers to app-based monitoring, our systems are built for reliability first — including super-fast charging hubs for high-traffic locations.",
  },
  {
    icon: FiTrendingUp,
    title: "Proven at Scale, Backed by Real Capital",
    body: "With 1,000+ installations delivered, ~₹250 crore in project funding raised, and 100% founder equity retained, Relux combines an established network with financial staying power.",
  },
  {
    icon: FiShield,
    title: "MoP-Compliant Standards",
    body: "Every installation strictly follows Ministry of Power guidelines for EV charging infrastructure in India — covering safety, reliability, and future readiness.",
  },
];

/* ─── Charger types ─── */
const chargerTypes = [
  { label: "Bharat AC-001", detail: "Lighter vehicles & two-wheelers" },
  { label: "Bharat DC-001", detail: "Lighter vehicles & two-wheelers" },
  { label: "Type 2 AC", detail: "Workplace & overnight charging" },
  { label: "CCS / CHAdeMO / GB/T DC", detail: "Cars, fleets & high-traffic hubs" },
  { label: "120 kW → 1 MW capacity", detail: "Passenger cars to commercial fleets" },
  { label: "Cloud CMS + Relux App", detail: "Live monitoring, payments & uptime" },
];

/* ─── Reach stats ─── */
const reachStats = [
  { value: "1000+", label: "Installations Nationwide" },
  { value: "13+", label: "States Covered" },
  { value: "₹250 Cr", label: "Project Funding Raised" },
  { value: "₹50 Cr", label: "Revenue Target FY 2026–27" },
  { value: "500", label: "Stations in TN Rollout (TNGECL)" },
  { value: "9", label: "GCC Chennai Public Sites" },
];

/* ─── Section divider ─── */
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-8 h-px bg-[#00b14f]" />
      <span className="text-[#00b14f] text-[10px] font-black uppercase tracking-[0.4em]">
        {label}
      </span>
    </div>
  );
}

export default function AboutDeep() {
  return (
    <section
      className="relative w-full bg-black overflow-hidden font-poppins"
      style={{ fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
    >

      {/* ══════════════════════════════════════════════
          2. Our Story
      ══════════════════════════════════════════════ */}
      <div className="relative py-16 md:py-24 border-t border-white/6">
        <div className="absolute top-0 right-0 w-125 h-100 bg-[#00b14f]/5 blur-[130px] rounded-full translate-x-1/2 -translate-y-1/4 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <motion.div {...fadeUp()}>
            <SectionLabel label="Our Story" />
            <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter uppercase mb-10 max-w-4xl">
              WE WERE IN EV CHARGING BEFORE{" "}
              <span className="text-[#00b14f]">IT BECAME MAINSTREAM.</span>
            </h2>
          </motion.div>

          {/* Open Editorial Layout - No Box Enclosures */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Narrative with Vertical Line Accent */}
            <motion.div
              {...fadeUp(0.1)}
              className="lg:col-span-7 flex gap-5 md:gap-6"
            >
              {/* Vertical Glowing Line Indicator */}
              <div className="w-1 bg-gradient-to-b from-[#00b14f] via-[#00b14f]/50 to-transparent shrink-0 rounded-full my-1" />

              <div className="space-y-6 text-zinc-200 text-base md:text-[17px] leading-relaxed font-normal">
                <p className="text-white font-semibold text-base md:text-[17px] leading-relaxed">
                  Relux began operations in 2009 and entered the EV charging space in 2012, when India&apos;s charging infrastructure was still taking shape.
                </p>
                <p className="text-zinc-200 text-base md:text-[17px] leading-relaxed font-normal">
                  We learned the business on the ground—from equipment and electrical infrastructure to site requirements, vehicles and the realities of keeping a station running. More than a decade later, that experience continues to shape how we design, build and support charging infrastructure.
                </p>
              </div>
            </motion.div>

            {/* Right Column: Open Editorial Pull-Quote */}
            <motion.div
              {...fadeUp(0.2)}
              className="lg:col-span-5 relative border-l-2 border-[#00b14f] pl-6 py-2"
            >
              <span className="text-5xl text-[#00b14f] font-serif leading-none block mb-2 opacity-80">&ldquo;</span>
              <p className="text-xl md:text-2xl font-black text-white leading-snug tracking-tight">
                We don&apos;t just install EV chargers. We build and support the infrastructure around them.
              </p>
            </motion.div>

          </div>

          {/* ── RELUX TODAY STATS GRID ── */}
          {/* <motion.div {...fadeUp(0.3)} className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#00b14f]" />
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
                RELUX <span className="text-[#00b14f]">TODAY</span>
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { val: "2009", label: "Operations began" },
                { val: "2012", label: "Entered EV charging" },
                { val: "1,000+", label: "Installations delivered" },
                { val: "13+", label: "States covered" },
                { val: "500", label: "Charging stations planned under TNGECL rollout" },
                { val: "9", label: "Public charging sites with GCC Chennai" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/4 border border-white/8 rounded-2xl p-5 flex flex-col justify-between hover:bg-[#00b14f]/10 hover:border-[#00b14f]/50 transition-all duration-300 group"
                >
                  <div className="text-2xl sm:text-3xl font-black text-[#00b14f] group-hover:scale-105 transition-transform mb-2">
                    {stat.val}
                  </div>
                  <div className="text-white/60 text-xs font-semibold leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div> */}

          {/* Closing Company Growth & Funding Cards */}
          {/* <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              {...fadeUp(0.4)}
              className="bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-6 hover:border-[#00b14f]/40 transition-colors"
            >
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                The company is led by Managing Director Karthikeyan S., and has backed its expansion with real capital — including cumulative project funding of roughly ₹250 crore from private real estate and infrastructure investors, raised specifically to fund new station rollouts.
              </p>
            </motion.div>

            <motion.div
              {...fadeUp(0.5)}
              className="bg-gradient-to-br from-[#00b14f]/10 to-white/2 border border-[#00b14f]/30 rounded-2xl p-6 hover:border-[#00b14f]/60 transition-colors"
            >
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                Relux has set a revenue target of ₹50 crore for FY 2026–27, part of a multi-channel growth strategy spanning public charging, enterprise accounts, EPC projects, and technology licensing.
              </p>
            </motion.div>
          </div> */}

        </div>
      </div>

      <OurGoals />

      {/* ══════════════════════════════════════════════
          4. What We Offer
      ══════════════════════════════════════════════ */}
      {/* <div className="relative py-16 md:py-24 border-t border-white/6">
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-[#00b14f]/5 blur-[110px] rounded-full -translate-x-1/2 translate-y-1/4 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-3">
          <motion.div {...fadeUp()}>
            <SectionLabel label="What We Do" />
            <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter uppercase mb-6 max-w-4xl">
              EV CHARGING IS MORE THAN{" "}
              <span className="text-[#00b14f]">THE CHARGER.</span>
            </h2>
          </motion.div> */}

          {/* Intro Narrative */}
          {/* <motion.div {...fadeUp(0.1)} className="mt-6 max-w-3xl">
            <p className="text-white/80 text-base md:text-lg leading-relaxed border-l-2 border-[#00b14f] pl-4">
              A successful charging station depends on everything around the charger—from the site and power connection to software, installation, payments and ongoing maintenance.
            </p>
          </motion.div> */}

          {/* 5 Core Offerings Horizontal Lifecycle List */}
          {/* <div className="mt-10 divide-y divide-white/10 border-t border-b border-white/10">
            {[
              {
                icon: FiMapPin,
                title: "Site & Power",
                desc: "Assessing location, power availability, traffic and charging requirements.",
              },
              {
                icon: FiZap,
                title: "Charging Infrastructure",
                desc: "AC and DC charging solutions matched to the application",
              },
              {
                icon: FiCpu,
                title: "Software & Network",
                desc: "Connected monitoring, payments and station management.",
              },
              {
                icon: FiCheckCircle,
                title: "Installation & Commissioning",
                desc: "Civil, electrical and equipment installation, testing and commissioning.",
              },
              {
                icon: FiHeadphones,
                title: "Operations & Maintenance",
                desc: "Ongoing technical support to keep stations running.",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  {...fadeUp(0.08 * idx)}
                  className="py-6 sm:py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 group hover:px-4 transition-all duration-300 rounded-xl hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-4 md:w-2/5 shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-[#00b14f]/15 text-[#00b14f] group-hover:bg-[#00b14f] group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base md:text-lg font-black text-white uppercase tracking-wider group-hover:text-[#00b14f] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-white/70 text-xs md:text-sm font-medium leading-relaxed max-w-xl">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div> */}

      {/* ══════════════════════════════════════════════
          5. Charging Technology
      ══════════════════════════════════════════════ */}
      {/* <div className="relative py-16 md:py-24 border-t border-white/6">
        <div className="absolute top-1/2 right-0 w-125 h-100 bg-[#00b14f]/5 blur-[130px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp()}>
            <SectionLabel label="Charging Technology" />
            <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter uppercase mb-6 max-w-4xl">
              BUILT ON RECOGNISED STANDARDS, NOT{" "}
              <span className="text-[#00b14f]">PROPRIETARY LOCK-IN</span>
            </h2>
          </motion.div> */}

          {/* Intro Narrative */}
          {/* <motion.div {...fadeUp(0.1)} className="mt-8 max-w-4xl">
            <p className="text-white/80 text-base md:text-lg leading-relaxed bg-white/3 border border-white/6 rounded-2xl p-6 md:p-8 hover:border-[#00b14f]/30 transition-colors">
              Relux works across the major AC and DC charging standards used in India, with charging capacities from 120 kW to 1 MW — from passenger vehicles to commercial and fleet applications.
            </p>
          </motion.div> */}

          {/* 6 Standards Cards Grid */}
          {/* <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Bharat AC-001",
                desc: "Lighter vehicles & two-wheelers",
                icon: FiZap,
              },
              {
                title: "Bharat DC-001",
                desc: "Lighter vehicles & two-wheelers",
                icon: FiZap,
              },
              {
                title: "Type 2 AC",
                desc: "Workplace & overnight charging",
                icon: FiZap,
              },
              {
                title: "CCS / CHAdeMO / GB/T DC",
                desc: "Cars, fleets & high-traffic hubs",
                icon: FiZap,
              },
              {
                title: "120 kW → 1 MW",
                desc: "Passenger cars to commercial fleets",
                icon: FiTrendingUp,
              },
              {
                title: "Cloud CMS + Relux App",
                desc: "Monitoring, payments & station management",
                icon: FiCpu,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  {...fadeUp(0.1 * idx)}
                  className="bg-white/4 border border-white/8 rounded-2xl p-6 flex flex-col justify-between hover:bg-[#00b14f]/10 hover:border-[#00b14f]/50 transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#00b14f]/15 text-[#00b14f] group-hover:bg-[#00b14f] group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-base md:text-lg font-black text-white uppercase tracking-wider group-hover:text-[#00b14f] transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-white/60 text-xs md:text-sm font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div> */}

          {/* Action Button & Footer Note */}
          {/* <motion.div {...fadeUp(0.4)} className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white/3 border border-white/6 rounded-2xl p-6 md:p-8">
            <p className="text-white/70 text-sm md:text-base font-medium max-w-xl">
              Newer installations can also integrate renewable energy and battery storage where the site requires it.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#00b14f] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:bg-[#00c859] transition-all transform hover:-translate-y-0.5 shrink-0 shadow-lg shadow-[#00b14f]/20"
            >
              Explore our charging solutions &rarr;
            </Link>
          </motion.div>

        </div>
      </div> */}

      {/* ══════════════════════════════════════════════
          GREEN BAND — Built For Different Roads
      ══════════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden bg-[#00b14f] py-8 md:py-10">
        {/* Subtle diagonal overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.08)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-4">
          {/* Main headline */}
          <motion.h2
            {...fadeUp()}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-black uppercase tracking-tight leading-none"
          >
            BUILT FOR DIFFERENT ROADS.{" "}
            <span className="text-black/70">DIFFERENT NEEDS.</span>
          </motion.h2>

          {/* Pill tags row */}
          <motion.div
            {...fadeUp(0.15)}
            className="flex flex-wrap items-center justify-center gap-2 mt-1"
          >
            {["PUBLIC", "COMMERCIAL", "RESIDENTIAL", "FLEETS", "INDUSTRIAL"].map(
              (tag, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 rounded-full bg-black/10 text-black font-extrabold text-xs sm:text-sm uppercase tracking-widest border border-black/15"
                >
                  {tag}
                </span>
              )
            )}
          </motion.div>
        </div>
      </div>



      {/* ══════════════════════════════════════════════
          7. Our Projects
      ══════════════════════════════════════════════ */}
      <div className="relative py-16 md:py-24 border-t border-white/6">
        <div className="absolute top-1/2 right-0 w-125 h-100 bg-[#00b14f]/5 blur-[130px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp()}>
            <SectionLabel label="Our Projects" />
            <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter uppercase mb-6 max-w-4xl">
              PROOF ON THE {" "}
              <span className="text-[#00b14f]">GROUND</span>
            </h2>
          </motion.div>

          {/* 3 Projects Metric Dividers */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
            {[
              {
                icon: FiFlag,
                title: "CHENNAI",
                desc: "9 public charging sites with GCC , Marina Beach, Besant Nagar Beach and other key public locations.",
              },
              {
                icon: FiMapPin,
                title: "TAMIL NADU",
                desc: "500 stations under TNGECL rollout,A statewide charging infrastructure deployment.",
              },
              {
                icon: FiTrendingUp,
                title: "ACROSS INDIA",
                desc: "1,000+ installations , 13+ states ,Infrastructure spanning cities, highways, residential and commercial environments.",
              },
            ].map((proj, idx) => {
              const Icon = proj.icon;
              return (
                <motion.div
                  key={idx}
                  {...fadeUp(0.1 * idx)}
                  className="p-6 flex flex-col justify-between space-y-4 group hover:bg-white/[0.02] transition-colors rounded-2xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#00b14f]/15 text-[#00b14f] group-hover:bg-[#00b14f] group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-wider group-hover:text-[#00b14f] transition-colors leading-snug">
                        {proj.title}
                      </h3>
                    </div>
                    <p className="text-zinc-200 text-base font-normal leading-relaxed">
                      {proj.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          8. Why Businesses Choose Relux
      ══════════════════════════════════════════════ */}
      {/* <div className="relative py-16 md:py-24 border-t border-white/6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-[#00b14f]/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp()}>
            <SectionLabel label="Why Relux" />
            <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter uppercase mb-10 max-w-4xl">
              WHY BUSINESSES CHOOSE <span className="text-[#00b14f]">RELUX</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "FAST, CAREFUL EXECUTION",
                p1: "Our teams install efficiently without compromising engineering, safety or performance.",
              },
              {
                title: "REAL SUPPORT AFTER GO-LIVE",
                p1: "24/7 regional support keeps stations operational and issues moving towards resolution.",
              },
              {
                title: "A NETWORK BUILT FOR SCALE",
                p1: "Service centres and technicians support installations across the states we operate in.",
              },
              {
                title: "TECHNOLOGY THAT WORKS FOR THE SITE",
                p1: "From high-speed charging to connected monitoring, our systems are built around reliability and operational needs.",
              },
              {
                title: "BUILT FOR INDIA",
                p1: "Our solutions are shaped by real roads, real sites, different power conditions and different vehicle requirements.",
              },
            ].map((pillar, idx) => {
              return (
                <motion.div
                  key={idx}
                  {...fadeUp(0.1 * idx)}
                  className={`border-l-2 border-white/10 hover:border-[#00b14f] pl-6 py-4 flex flex-col justify-between transition-all duration-300 group ${
                    idx === 4 ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-[#00b14f] bg-[#00b14f]/10 border border-[#00b14f]/20 px-2.5 py-0.5 rounded-md">
                        0{idx + 1}
                      </span>
                      <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-wider group-hover:text-[#00b14f] transition-colors leading-snug">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="text-white/70 text-xs md:text-sm font-medium leading-relaxed pl-8">
                      {pillar.p1}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div> */}


      {/* ══════════════════════════════════════════════
          9 & 10. Reach + Stats + Compliance
      ══════════════════════════════════════════════ */}
      {/* <div className="relative py-16 md:py-24 border-t border-white/6">
        <div className="absolute top-1/2 right-0 w-125 h-125 bg-[#00b14f]/5 blur-[140px] rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp()}>
            <SectionLabel label="Our Reach Across India" />
            <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter uppercase mb-4">
              A Footprint Rooted in the South,{" "}
              <span className="text-[#00b14f]">Expanding Nationwide</span>
            </h2>
            <p className="mt-4 text-white/60 text-sm md:text-base leading-relaxed max-w-3xl">
              Relux&apos;s strongest presence remains anchored in South India — with established
              stations across Tamil Nadu, Kerala, Telangana, and Gujarat — and this base is actively
              widening through named state partnerships and new market entries, including an ongoing
              rollout in Punjab and Rajasthan. Stations are positioned at city centres, highway
              corridors, and residential zones, giving Relux a genuinely distributed presence rather
              than a concentration in one or two metros.
            </p>
          </motion.div> */}

          {/* Reach Stats Grid */}
      {/* <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
            {reachStats.map((s, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.08)}
                className="group flex flex-col items-center justify-center py-8 px-4 rounded-2xl border border-white/[0.07] bg-white/2 hover:border-[#00b14f]/40 hover:bg-[#00b14f]/5 transition-all duration-300 text-center"
              >
                <span className="text-3xl md:text-4xl font-extrabold text-[#00b14f] tracking-tight">
                  {s.value}
                </span>
                <span className="mt-2 text-[11px] md:text-[12px] text-white/50 leading-snug font-medium">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
         </div>
      </div> */}




      {/* ══════════════════════════════════════════════
          9. Compliance Banner
      ══════════════════════════════════════════════ */}
      {/* <div className="relative py-12 md:py-20 border-t border-white/6">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            {...fadeUp(0.2)}
            className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 px-8 md:px-12 py-10 rounded-3xl border border-[#00b14f]/30 bg-gradient-to-r from-[#00b14f]/10 via-white/[0.03] to-white/[0.01] backdrop-blur-xl overflow-hidden shadow-2xl shadow-[#00b14f]/5 group hover:border-[#00b14f]/50 transition-all duration-500"
          > */}
            {/* Top border glow line */}
            {/* <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00b14f] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" /> */}

            {/* Background glowing blurred circles */}
            {/* <div className="absolute -left-20 -top-20 w-64 h-64 bg-[#00b14f]/15 blur-[90px] rounded-full pointer-events-none group-hover:bg-[#00b14f]/25 transition-all duration-700" />
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#00b14f]/10 blur-[90px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-5xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00b14f]/15 border border-[#00b14f]/30 text-[#00b14f] text-[11px] font-mono font-bold tracking-widest uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00b14f] animate-pulse" />
                COMPLIANCE
              </div>

              <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                BUILT TO THE STANDARDS THAT <span className="text-[#00b14f]">MATTER</span>.
              </h3>

              <p className="text-white/70 text-sm md:text-base leading-relaxed mt-3 font-medium">
                Every Relux installation follows applicable Ministry of Power guidelines for EV charging infrastructure in India, with safety, reliability and future readiness built into the deployment process.
              </p>

              <div className="flex flex-wrap gap-2.5 mt-6">
                {[
                  "MOP GUIDELINES",
                  "SAFETY",
                  "RELIABILITY",
                  "FUTURE-READY",
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80 tracking-wider hover:border-[#00b14f]/40 hover:text-white transition-colors"
                  >
                    <span className="text-[#00b14f]">✓</span> {tag}
                  </span>
                ))}
              </div>
            </div> */}

            {/* <Link
              href="/contact"
              className="relative z-10 shrink-0 inline-flex items-center justify-center gap-3 bg-[#00b14f] hover:bg-[#009241] text-white font-bold text-sm px-8 py-4 rounded-2xl transition-all duration-300 shadow-[0_4px_25px_rgba(0,177,79,0.35)] hover:shadow-[0_8px_35px_rgba(0,177,79,0.6)] hover:-translate-y-1 group/btn"
            >
              <span>Get in Touch</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform text-xs">
                →
              </span>
            </Link> */}
          {/* </motion.div>
        </div>
      </div> */}
      {/* ══════════════════════════════════════════════
          6. Where To Find Us
      ══════════════════════════════════════════════ */}
      {/* <div className="relative py-16 md:py-24 border-t border-white/6">
        <div className="absolute top-1/2 left-0 w-125 h-100 bg-[#00b14f]/5 blur-[130px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp()}>
            <SectionLabel label="Where To Find Us" />
            <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter uppercase mb-4 max-w-4xl">
              FROM CITY ROADS TO{" "}
              <span className="text-[#00b14f]">HIGHWAY CORRIDORS</span>
            </h2>
            <p className="mt-4 text-white/70 text-sm md:text-base leading-relaxed max-w-3xl">
              Relux charging infrastructure can be deployed across different environments:
            </p>
          </motion.div> */}

      {/* 5 Deploy Environments Grid */}
      {/* <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FiMapPin,
                title: "PUBLIC CHARGING",
                desc: "Charging stations for city locations, highways, parking areas and destinations.",
              },
              {
                icon: FiZap,
                title: "COMMERCIAL",
                desc: "Charging infrastructure for hotels, malls, offices, restaurants and other businesses.",
              },
              {
                icon: FiShield,
                title: "RESIDENTIAL",
                desc: "Home, apartment and community charging.",
              },
              {
                icon: FiFlag,
                title: "FLEETS",
                desc: "High-capacity charging infrastructure for commercial vehicles, buses and fleet operators.",
              },
              {
                icon: FiCpu,
                title: "INDUSTRIAL",
                desc: "Charging integrated with larger energy requirements, including solar and battery storage where appropriate.",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  {...fadeUp(0.08 * idx)}
                  className="bg-white/4 border border-white/8 rounded-2xl p-6 flex flex-col justify-between hover:bg-[#00b14f]/10 hover:border-[#00b14f]/50 transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#00b14f]/15 text-[#00b14f] group-hover:bg-[#00b14f] group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base md:text-lg font-black text-white uppercase tracking-wider group-hover:text-[#00b14f] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-xs md:text-sm font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div> */}
    </section>
  );
}
