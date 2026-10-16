"use client";

import React from "react";
import {
  ShieldCheck,
  TrendingUp,
  Wrench,
  Zap,
  Smartphone,
  Headphones,
  Megaphone,
  CreditCard,
  MapPin,
  Briefcase,
  Network,
  Globe,
  ArrowDown,
} from "lucide-react";

export default function ValuePropsSection() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Refundable Franchise Model",
      desc: "A refundable franchise structure designed to provide greater investment confidence for eligible partners.",
    },
    {
      icon: TrendingUp,
      title: "Investment Assurance",
      desc: "A structured model that gives franchise partners added confidence when entering the EV charging business.",
    },
    {
      icon: Wrench,
      title: "End-to-End Setup Assistance",
      desc: "Guidance across the key stages of establishing your charging station, from initial planning through operational readiness.",
    },
    {
      icon: Zap,
      title: "Civil & Power Infrastructure",
      desc: "Assistance with essential civil works and power infrastructure required for setting up the charging facility.",
    },
    {
      icon: Smartphone,
      title: "Mobile App Connectivity",
      desc: "Enable customers to locate, access, and use the charging network through the Relux mobile app ecosystem.",
    },
    {
      icon: Headphones,
      title: "24×7 Customer Care",
      desc: "Round-the-clock assistance for customers, with service available in regional languages.",
    },
    {
      icon: Megaphone,
      title: "Social Media Marketing",
      desc: "Digital marketing assistance to increase local awareness and attract EV users to your charging location.",
    },
    {
      icon: CreditCard,
      title: "RFID Charging Access",
      desc: "RFID-based charging connectivity for convenient and streamlined access for compatible users.",
    },
    {
      icon: MapPin,
      title: "Prime Location Assistance",
      desc: "Guidance in evaluating locations based on accessibility, EV traffic potential, and charging demand.",
    },
    {
      icon: Briefcase,
      title: "Corporate Tie-Ups",
      desc: "Opportunities to connect with corporate users and businesses that require convenient EV charging facilities.",
    },
    {
      icon: Network,
      title: "Integrated Service Network",
      desc: "Access to an established service ecosystem for ongoing technical and operational requirements.",
    },
    {
      icon: Globe,
      title: "Brand Visibility & Network Reach",
      desc: "Build your charging business under the Relux brand while becoming part of a growing EV charging network.",
    },
    {
      icon: Network,
      title: "Unified Bharat e-Charge (UBC) Ready",
      desc: "Interoperable with India's open EV protocol (MHI, BHEL, NPCI), allowing drivers from BHIM and any UBC app to discover & book your station.",
    },
  ];

  return (
    <section
      className="relative w-full py-20 md:py-28 text-slate-900 font-poppins border-b border-slate-200 overflow-hidden"
      style={{
        backgroundImage: "url('/franchise/image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif',
      }}
    >
      {/* Light background overlay for optimal readability */}
      <div className="absolute inset-0 bg-white/88 backdrop-blur-[2px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12 max-w-5xl mx-auto space-y-4">
          <span className="text-[#00b14f] text-xs font-black uppercase tracking-[0.25em]">
            WHY PARTNER WITH RELUX
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight leading-tight">
            EVERYTHING YOU NEED TO BUILD YOUR{" "}
            <span className="text-[#00b14f]">EV CHARGING BUSINESS</span>
          </h2>

          <p className="text-slate-600 text-[16px] leading-relaxed font-normal max-w-4xl">
            Relux provides a complete franchise ecosystem covering infrastructure, technology, customer support,
            marketing, and business assistance helping franchise partners establish and manage their EV charging operations
            with greater confidence.
          </p>
        </div>

        {/* 12 Value Prop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-3xl p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 hover:border-[#00b14f]/50 transition-all duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#00b14f]/10 text-[#00b14f] flex items-center justify-center mb-5 group-hover:bg-[#00b14f] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Callout */}
        <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00b14f]/15 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl text-center md:text-left space-y-2">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              Choose Your Relux EV Charging <span className="text-[#00b14f]">Franchise Model</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
              Compare our available charging station models and find the setup that fits your business goals.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <a
              href="#franchise-models"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#00b14f] hover:bg-[#00c95a] text-black font-black uppercase text-xs tracking-wider transition-all shadow-lg hover:scale-105"
            >
              <span>Explore Models</span>
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
