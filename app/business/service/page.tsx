"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home, Zap, Truck, Sun, Check, ArrowRight, X, Info,
  Plug, Scale, Building2, Smartphone, SunMedium, BatteryCharging,
  Cpu, Activity, Wrench, Clock, BarChart3, Building, Award,
  Shield, Globe, Layers,
} from "lucide-react";

/* ─── Types ─── */
interface PopupSection { title: string; points: string[]; }
interface ServiceDetail {
  id: string;
  tag: string;
  h2Title: string;
  cardHeading: string;
  popupH2: string;
  shortDesc: string;
  icon: React.ReactNode;
  chips: { icon: React.ReactNode; label: string }[];
  sections: PopupSection[];
}

/* ─── Service Data ─── */
const serviceDetails: ServiceDetail[] = [
  /* ════════ 1. RESIDENTIAL ════════ */
  {
    id: "residential",
    tag: "RESIDENTIAL EV CHARGING (HOME AC)",
    h2Title: "Residential EV Charging & Home EV Charger Installation",
    cardHeading: "Smart Home Charging Solutions",
    popupH2: "Smart Home Charging Solutions Explained",
    shortDesc:
      "Complete Home EV Charger Installation for villas, apartments, and gated communities — combining smart AC chargers, load safety, and solar integration for reliable everyday charging.",
    icon: <Home className="w-6 h-6" />,
    chips: [
      { icon: <Plug className="w-4 h-4" />, label: "Smart AC Charger Setup" },
      { icon: <Scale className="w-4 h-4" />, label: "Home Load Balancing" },
      { icon: <Building2 className="w-4 h-4" />, label: "Apartment Charging Pods" },
      { icon: <Smartphone className="w-4 h-4" />, label: "Automated Billing System" },
      { icon: <SunMedium className="w-4 h-4" />, label: "Solar-Powered Charging" },
    ],
    sections: [
      {
        title: "1. Smart AC Charger Setup",
        points: [
          "We install smart AC chargers from 7.4kW to 22kW, matched to your home's power capacity.",
          "Both single-phase and three-phase configurations are available for different connection types.",
          "Chargers are ideal for villas and independent homes needing dependable daily charging.",
          "Installations are handled by certified technicians for long-term safety and performance.",
          "The setup is compatible with Tata, Mahindra, MG, BYD, and other major EV brands.",
        ],
      },
      {
        title: "2. Home Load Balancing",
        points: [
          "Our Home Load Balancing technology prevents the main breaker from tripping during charging.",
          "The system automatically adjusts charger load based on real-time home power usage.",
          "This keeps your existing electrical setup safe without requiring major rewiring.",
          "Where needed, we also upgrade your home's electrical panel for higher capacity.",
          "This ensures stable, safe charging alongside your regular household appliances.",
        ],
      },
      {
        title: "3. Apartment Charging Pods",
        points: [
          "We design Common Area Charging Pods specifically for apartment complexes and gated communities.",
          "These pods allow multiple EV owners to charge conveniently within the same premises.",
          "Access is organized fairly among residents, avoiding conflicts or confusion.",
          "The infrastructure is built to scale as EV adoption increases within the community.",
          "This makes the solution future-ready for growing residential EV demand.",
        ],
      },
      {
        title: "4. Automated Billing System",
        points: [
          "Our system enables automated, usage-based billing for every individual charging session.",
          "Residents can book charging slots in real time through a simple interface.",
          "This ensures fair, transparent access to shared charging infrastructure for everyone.",
          "It significantly reduces the manual effort required from building management.",
          "The result is a smooth, hassle-free charging experience for the community.",
        ],
      },
      {
        title: "5. Solar-Powered Charging",
        points: [
          "Your home AC charger can be paired directly with rooftop solar panels.",
          "This integration enables truly zero-cost EV charging for daily use.",
          "It supports a more sustainable, environment-friendly home charging solution.",
          "Over time, it reduces dependency on grid electricity and lowers costs.",
          "This option is ideal for eco-conscious homeowners seeking long-term savings.",
        ],
      },
    ],
  },

  /* ════════ 2. PUBLIC ════════ */
  {
    id: "public",
    tag: "PUBLIC CHARGING INFRASTRUCTURE",
    h2Title: "Public EV Charging Infrastructure & DC Fast Charger Setup",
    cardHeading: "DC Fast Charging Infrastructure",
    popupH2: "DC Fast Charging Infrastructure Explained",
    shortDesc:
      "Complete Public Charging Infrastructure for highway toll plazas, tourist spots, and city parking lots — covering high-power DC chargers, grid coordination, smart monitoring, and turnkey civil execution.",
    icon: <Zap className="w-6 h-6" />,
    chips: [
      { icon: <BatteryCharging className="w-4 h-4" />, label: "High-Power DC Chargers" },
      { icon: <Globe className="w-4 h-4" />, label: "DISCOM Grid Coordination" },
      { icon: <Cpu className="w-4 h-4" />, label: "Smart CMS Integration" },
      { icon: <Activity className="w-4 h-4" />, label: "Remote Uptime Monitoring" },
      { icon: <Wrench className="w-4 h-4" />, label: "Turnkey Site Execution" },
    ],
    sections: [
      {
        title: "1. High-Power DC Chargers",
        points: [
          "We install high-power DC fast chargers ranging from 30kW to 240kW for public locations.",
          "Both CCS2 and GB/T standard chargers are supported across all installations.",
          "Our scalable modular DC chargers can be upgraded from 60kW to 240kW as demand grows.",
          "This modular approach allows phased investment without full system replacement.",
          "Installations are suited for highway toll plazas, tourist spots, and city public parking lots.",
        ],
      },
      {
        title: "2. DISCOM Grid Coordination",
        points: [
          "We conduct complete substation load assessments for every public charging site.",
          "Our team manages both HT and LT connections from planning to execution.",
          "We liaise directly with State Electricity Boards (DISCOMs) for power sanctions.",
          "All grid-related approvals and heavy-lifting coordination are handled on your behalf.",
          "This ensures every site is fully compliant with local electricity regulations.",
        ],
      },
      {
        title: "3. Smart CMS Integration",
        points: [
          "Our Central Management System (CMS) offers seamless hardware integration with OCPP-compliant apps.",
          "This ensures smooth communication between charging hardware and monitoring platforms.",
          "Clients can monitor charger uptime in real time across every connected site.",
          "The system also enables remote diagnostics for quick issue identification.",
          "UPI and GPS-based billing are integrated for seamless, cashless transactions.",
        ],
      },
      {
        title: "4. Remote Uptime Monitoring",
        points: [
          "Our CMS provides continuous, real-time uptime monitoring for every DC charger.",
          "Remote diagnostics help identify and resolve technical issues without site visits.",
          "This reduces the need for constant on-site staff presence at each location.",
          "Clients can track charger performance and health remotely, at any time.",
          "This improves overall network reliability and minimizes charger downtime.",
        ],
      },
      {
        title: "5. Turnkey Site Execution",
        points: [
          "We manage complete site layout planning for highway tolls and tourist locations.",
          "Our scope includes trenching, cabling, and transformer installation for every site.",
          "Safety fencing and civil work are completed as per required standards.",
          "Every project is delivered as a single turnkey solution, from planning to commissioning.",
          "This ensures a fully ready-to-operate charging site with no added coordination needed.",
        ],
      },
    ],
  },

  /* ════════ 3. FLEET ════════ */
  {
    id: "fleet",
    tag: "HEAVY-DUTY FLEET HUBS (TRUCKS & BUSES)",
    h2Title: "Commercial EV Charging Hubs for Trucks & Buses",
    cardHeading: "Commercial Fleet Charging",
    popupH2: "Commercial Fleet Charging Explained",
    shortDesc:
      "Purpose-built EV charging stations for logistics parks, bus depots, and freight corridors — delivering high power EV charging, smart scheduling, and solar-powered savings for commercial fleets.",
    icon: <Truck className="w-6 h-6" />,
    chips: [
      { icon: <Truck className="w-4 h-4" />, label: "High Power EV Charging" },
      { icon: <Building className="w-4 h-4" />, label: "Electric Bus Charging" },
      { icon: <Clock className="w-4 h-4" />, label: "Scheduled Overnight Charging" },
      { icon: <BarChart3 className="w-4 h-4" />, label: "Off-Peak Tariff Savings" },
      { icon: <SunMedium className="w-4 h-4" />, label: "Solar Canopy Charging" },
    ],
    sections: [
      {
        title: "1. High Power EV Charging",
        points: [
          "We install high power EV charging stations rated at 240kW and above for heavy-duty fleets.",
          "Each EV charger is specifically engineered for electric trucks and freight vehicles.",
          "The same high-capacity charging station infrastructure supports intercity passenger e-buses reliably.",
          "Fast charging speeds ensure minimal downtime for high-utilization commercial vehicles.",
          "This makes our EV charging station setup ideal for large logistics parks and depots.",
        ],
      },
      {
        title: "2. Electric Bus Charging",
        points: [
          "Our electric bus charging infrastructure is purpose-built for state transport depots.",
          "The EV charging station is designed to withstand continuous, high-frequency bus charging.",
          "This ensures dependable performance for passenger e-buses across daily transit routes.",
          "Charging stations are tailored to the specific patterns of large bus fleets.",
          "It supports state transport corporations operating electric bus fleets at scale.",
        ],
      },
      {
        title: "3. Scheduled Overnight Charging",
        points: [
          "We integrate backend fleet management software to automate overnight charging schedules.",
          "Vehicles at every EV charging station are ready for deployment each morning.",
          "Fleet operators get centralized visibility over charging timing across all depots.",
          "This reduces manual coordination needed to manage large-scale fleet charging.",
          "The result is improved fleet readiness with minimal operational oversight required.",
        ],
      },
      {
        title: "4. Off-Peak Tariff Savings",
        points: [
          "Our scheduling system prioritizes charging during cheaper nighttime electricity tariffs.",
          "This directly reduces the EV charging cost associated with running an electric fleet.",
          "Lower off-peak EV charging cost supports stronger long-term fleet economics.",
          "Savings compound significantly for large logistics and transport operators over time.",
          "This makes electric fleet charging more financially sustainable at scale.",
        ],
      },
      {
        title: "5. Solar Canopy Charging",
        points: [
          "We install large-scale solar carports directly above heavy-duty vehicle parking bays.",
          "These dedicated solar canopies help offset the overall EV charging cost for fleets.",
          "Solar integration supports sustainable, long-term savings for depot-based EV chargers.",
          "The design is tailored specifically for logistics park and bus depot layouts.",
          "This reduces grid dependency while lowering overall fleet operating expenses.",
        ],
      },
    ],
  },

  /* ════════ 4. B2B SOLAR / BESS ════════ */
  {
    id: "solar",
    tag: "B2B TURNKEY CAPTIVE PROJECTS",
    h2Title: "Turnkey Captive EV Charging with Solar & BESS Integration",
    cardHeading: "Industrial Solar EV Charging",
    popupH2: "Industrial Solar EV Charging Explained",
    shortDesc:
      "Zero-emission mobility, maximum cost efficiency — we combine Industrial EV Charging Infrastructure with Solar EV Charging and Battery Energy Storage System integration, built for hospitals, IT offices, malls, and factories that cannot afford downtime.",
    icon: <Sun className="w-6 h-6" />,
    chips: [
      { icon: <Wrench className="w-4 h-4" />, label: "End-to-End Turnkey Execution" },
      { icon: <SunMedium className="w-4 h-4" />, label: "Solar EV Charging Integration" },
      { icon: <BatteryCharging className="w-4 h-4" />, label: "BESS Energy Storage" },
      { icon: <Cpu className="w-4 h-4" />, label: "Real-Time Energy Management" },
      { icon: <Award className="w-4 h-4" />, label: "PM E-Drive Subsidy Support" },
    ],
    sections: [
      {
        title: "1. End-to-End Turnkey Execution",
        points: [
          "We begin every project with a detailed on-site energy audit of your facility.",
          "Our engineers assess existing electrical infrastructure, roof load capacity, and daily EV power demand.",
          "We manage all civil and electrical work, including HT/LT substation upgrades and trenching.",
          "Transformer installation and grid synchronization with your local DISCOM are fully handled.",
          "As your EV Charging Company, we remain your single point of contact through commissioning.",
        ],
      },
      {
        title: "2. Solar EV Charging Integration",
        points: [
          "We design custom solar arrays — rooftop, carport canopies, or ground-mounted — for your site.",
          "Solar canopies protect vehicles from harsh weather while generating free daytime power.",
          "Net Metering integration exports excess solar energy back to the grid for credits.",
          "These credits directly reduce your nighttime EV charging costs over time.",
          "This turns your Solar EV Charging setup into a genuine cost-saving asset.",
        ],
      },
      {
        title: "3. BESS Energy Storage",
        points: [
          "Our BESS solutions use Lithium-ion and LFP technology, scalable from 50kWh to multi-MWh.",
          "The system stores surplus solar energy during the day for later use.",
          "During peak tariff hours, stored power discharges instead of drawing from the grid.",
          "This Peak Shaving strategy significantly lowers your monthly electricity demand charges.",
          "BESS also delivers uninterruptible backup power during grid outages for critical operations.",
        ],
      },
      {
        title: "4. Real-Time Energy Management",
        points: [
          "Our cloud-based Energy Management System offers complete, live visibility into your site.",
          "Facility managers can track solar generation, battery charge levels, and EV load in real time.",
          "The system prioritizes solar power first, then battery, then grid as a last resort.",
          "Automated ROI reports and carbon footprint calculators support informed decision-making.",
          "Maintenance alerts help prevent downtime before issues affect daily operations.",
        ],
      },
      {
        title: "5. PM E-Drive & FAME-II Subsidy Support",
        points: [
          "Our compliance team manages the complete PM E-Drive subsidy application process.",
          "We also help clients access applicable FAME-II benefits wherever eligible.",
          "Coordination with DPIIT and your local DISCOM is handled entirely on your behalf.",
          "Net Metering applications and load sanctions are managed as part of the same process.",
          "Every installation follows the latest BIS and MNRE regulatory guidelines — zero paperwork hassle for you.",
        ],
      },
    ],
  },
];

/* ─── Industries We Empower ─── */
const industries = [
  { icon: <Cpu className="w-5 h-5" />, title: "IT Campuses", desc: "Carbon neutrality and LEED certification goals" },
  { icon: <Shield className="w-5 h-5" />, title: "Hospitals", desc: "24/7 ambulance and staff EV charging readiness" },
  { icon: <Building2 className="w-5 h-5" />, title: "Shopping Malls", desc: "Seamless solar-powered valet charging for EV owners" },
  { icon: <Globe className="w-5 h-5" />, title: "Highway & Tourist Sites", desc: "Off-grid high-capacity solar + BESS charging hubs" },
  { icon: <Layers className="w-5 h-5" />, title: "Factories", desc: "Fleet and common-area charging at scale" },
  { icon: <Building className="w-5 h-5" />, title: "Residential Towers", desc: "Common-area smart EV charging pods" },
];

/* ─── Stats ─── */
const stats = [
  { num: "1000+", label: "Charging Points Installed" },
  { num: "13+", label: "States Covered" },
  { num: "24/7", label: "Remote Support" },
  { num: "₹250 Cr", label: "Project Funding Raised" },
];

/* ════════════════════════════════════════
   PAGE COMPONENT
════════════════════════════════════════ */
export default function ServicePage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = serviceDetails.find((s) => s.id === activeId) ?? null;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://reluxelectric.com/business/service#webpage",
        "url": "https://reluxelectric.com/business/service",
        "name": "Turnkey EV Infrastructure Services & Fleet Depot Charging | Relux Electric",
        "description": "End-to-end EV charging infrastructure, electric bus depot solutions, smart home charging, and B2B fleet electrification services by Relux Electric.",
        "publisher": { "@id": "https://reluxelectric.com/#organization" },
      },
      {
        "@type": "Service",
        "@id": "https://reluxelectric.com/business/service#service",
        "name": "End-to-End EV Infrastructure Solutions",
        "provider": { "@id": "https://reluxelectric.com/#organization" },
        "areaServed": "IN",
        "description": "Turnkey civil/electrical substation execution, high-power DC fleet charging hubs, and smart home charging solutions.",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Relux EV Services Catalog",
          "itemListElement": serviceDetails.map((item) => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": item.h2Title,
              "description": item.shortDesc,
            },
          })),
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ══ PAGE HEADER ══ */}
      <section className="relative bg-[#060606] border-b border-white/[0.07] py-14 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,177,79,0.08),transparent)] pointer-events-none" />
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#00b14f]" />
            <span className="text-[#00b14f] text-[10px] font-black uppercase tracking-[0.4em]">Our Services</span>
            <span className="w-8 h-px bg-[#00b14f]" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.1] mb-5">
            End-to-End EV Charging <span className="text-[#00b14f]">Services</span>
            <br className="hidden md:block" /> &amp; Infrastructure Solutions
          </h1>
          <p className="text-white/55 text-sm md:text-base max-w-2xl leading-relaxed">
            Complete EV charging services and infrastructure for residential, public, fleet, and
            commercial projects across India.
          </p>
        </div>
      </section>

      {/* ══ 4 SERVICE CARDS ══ */}
      <section className="max-w-6xl mx-auto px-4 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceDetails.map((service, idx) => (
            <div
              key={service.id}
              className="group bg-[#0a0a0a] border border-white/8 rounded-3xl p-7 md:p-8 hover:border-[#00b14f]/50 hover:bg-[#0e0e0e] transition-all duration-300 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#00b14f]/12 border border-[#00b14f]/25 text-[#00b14f] flex items-center justify-center shrink-0 group-hover:bg-[#00b14f]/20 transition-colors">
                  {service.icon}
                </div>
                <div>
                  <span className="text-[10px] font-black text-[#00b14f] uppercase tracking-widest">
                    Service 0{idx + 1}
                  </span>
                  <h2 className="text-lg font-black text-white leading-tight">{service.cardHeading}</h2>
                </div>
              </div>

              {/* H2 sub-label */}
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-3">
                {service.h2Title}
              </p>

              {/* Short description */}
              <p className="text-white/65 text-sm leading-relaxed mb-5 flex-1">{service.shortDesc}</p>

              {/* Feature chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.chips.map((chip, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-300 bg-[#141414] border border-white/8 px-3 py-1.5 rounded-xl"
                  >
                    <span className="text-[#00b14f]">{chip.icon}</span>
                    {chip.label}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => setActiveId(service.id)}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl border border-[#00b14f]/60 bg-[#00b14f]/10 text-[#00b14f] font-extrabold text-sm hover:bg-[#00b14f] hover:text-black transition-all duration-200 cursor-pointer"
              >
                View Details <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <section className="bg-[#080808] border-t border-b border-white/[0.07] py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-[#00b14f]">{s.num}</span>
              <span className="text-xs text-white/45 font-medium mt-1.5 leading-snug">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ INDUSTRIES WE EMPOWER ══ */}
      <section className="max-w-6xl mx-auto px-4 py-14 md:py-20">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#00b14f]" />
            <span className="text-[#00b14f] text-[10px] font-black uppercase tracking-[0.4em]">Industries We Empower</span>
            <span className="w-8 h-px bg-[#00b14f]" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
            Built for Every Sector That <span className="text-[#00b14f]">Can&apos;t Afford Downtime</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind, i) => (
            <div
              key={i}
              className="group flex items-start gap-4 p-6 rounded-2xl border border-white/[0.07] bg-white/2 hover:border-[#00b14f]/40 hover:bg-[#00b14f]/5 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#00b14f]/10 border border-[#00b14f]/20 flex items-center justify-center shrink-0 group-hover:bg-[#00b14f]/20 transition-colors text-[#00b14f]">
                {ind.icon}
              </div>
              <div>
                <p className="text-white font-black text-sm uppercase tracking-tight mb-1 group-hover:text-[#00b14f] transition-colors">{ind.title}</p>
                <p className="text-white/45 text-[12px] leading-relaxed">{ind.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TURNKEY O&M ADD-ON ══ */}
      <section className="bg-[#080808] border-t border-white/[0.07] py-14 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#00b14f]" />
            <span className="text-[#00b14f] text-[10px] font-black uppercase tracking-[0.4em]">Turnkey O&amp;M Support</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight mb-4">
                Post-Installation <span className="text-[#00b14f]">Annual Maintenance</span> & 24/7 Support
              </h2>
              <p className="text-white/55 text-sm md:text-base leading-relaxed">
                We offer post-installation Annual Maintenance Contracts (AMC) for complete peace of
                mind. Our team provides 24/7 remote monitoring, quarterly physical inspections, and
                rapid-response repair teams — keeping hospitals, IT offices, and factories running
                without interruption year-round.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "24/7 remote monitoring across your entire solar and EV charging system",
                "Quarterly physical inspections to identify issues before they affect operations",
                "Rapid-response repair teams for facilities that cannot afford outages",
                "Annual Maintenance Contracts (AMC) for complete peace of mind",
                "Trusted hardware partnerships for consistent, long-term reliability",
              ].map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                  <Check className="w-4 h-4 text-[#00b14f] shrink-0 mt-0.5" />
                  <span className="leading-snug">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══ CLOSING CTA (Solar + BESS) ══ */}
      <section className="max-w-6xl mx-auto px-4 py-14 md:py-20">
        <div className="relative bg-[#0a0a0a] border border-[#00b14f]/30 rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00b14f]/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-[#00b14f]" />
                <span className="text-[#00b14f] text-[10px] font-black uppercase tracking-[0.4em]">Ready to Get Started?</span>
              </div>
              <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight mb-3">
                Turn Your EV Charging Infrastructure<br />
                into an <span className="text-[#00b14f]">Energy Asset</span>
              </h3>
              <p className="text-white/55 text-sm md:text-base leading-relaxed">
                Let us design a custom Solar + BESS solution tailored to your facility&apos;s load.
                Request your free feasibility study and ROI projection today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#00b14f] text-black font-black text-sm px-7 py-3.5 rounded-full hover:bg-[#009b45] transition-all shadow-[0_4px_20px_rgba(0,177,79,0.35)] hover:-translate-y-0.5"
              >
                Request Free Feasibility Study <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/business/franchise"
                className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-bold text-sm px-7 py-3.5 rounded-full transition-all hover:-translate-y-0.5"
              >
                Explore Franchise Model
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ POPUP MODAL ══ */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 md:pt-32 px-4 pb-12 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) setActiveId(null); }}
        >
          <div className="relative w-full max-w-4xl bg-[#0c0c0c] border border-white/12 rounded-3xl shadow-2xl overflow-hidden flex flex-col mt-4 mb-12">

            {/* Modal Header */}
            <div className="bg-[#111] border-b border-white/8 px-6 py-5 flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-black text-[#00b14f] uppercase tracking-widest bg-[#00b14f]/10 border border-[#00b14f]/30 px-3 py-1 rounded-full inline-block mb-2">
                  {active.tag}
                </span>
                <h3 className="text-lg md:text-2xl font-black text-white leading-tight">{active.popupH2}</h3>
              </div>
              <button
                onClick={() => setActiveId(null)}
                className="shrink-0 p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer mt-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Short Desc */}
            <div className="px-6 py-4 border-b border-white/[0.07] bg-[#0a0a0a]">
              <div className="flex items-start gap-3 bg-[#141414] border border-white/[0.07] rounded-2xl p-4">
                <Info className="w-5 h-5 text-[#00b14f] shrink-0 mt-0.5" />
                <p className="text-zinc-300 text-sm leading-relaxed">{active.shortDesc}</p>
              </div>
            </div>

            {/* Sections Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {active.sections.map((sec, si) => (
                <div
                  key={si}
                  className="bg-[#121212] border border-white/8 rounded-2xl p-5 hover:border-[#00b14f]/40 transition-all"
                >
                  <h4 className="font-black text-[#00b14f] text-sm flex items-center gap-2 border-b border-white/8 pb-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#00b14f] shrink-0" />
                    {sec.title}
                  </h4>
                  <ul className="space-y-2">
                    {sec.points.map((pt, pi) => (
                      <li key={pi} className="flex items-start gap-2 text-sm text-zinc-300">
                        <Check className="w-4 h-4 text-[#00b14f] shrink-0 mt-0.5" />
                        <span className="leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-white/[0.07] bg-[#111] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-zinc-400">Need a customised feasibility report for your location?</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveId(null)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-sm transition-colors cursor-pointer"
                >
                  Close
                </button>
                <Link
                  href={`/contact?subject=${encodeURIComponent(active.cardHeading)}`}
                  className="px-6 py-2.5 rounded-xl bg-[#00b14f] hover:bg-[#009b45] text-black font-extrabold text-sm flex items-center gap-2 transition-all shadow-md hover:-translate-y-0.5"
                >
                  Contact Support <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}
