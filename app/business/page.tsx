import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/app/ui/baceurl";
import { FiArrowRight, FiShield, FiTrendingUp, FiZap, FiLayers, FiCheckCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "EV Business Solutions & Partnership Models | Relux Electric",
  description:
    "Explore Relux Electric EV business solutions including EV Charging Station Franchises, Zero Investment Host Partnerships, Charging as a Service (CaaS), and Turnkey Fleet Infrastructure.",
  keywords: [
    "EV charging business models",
    "EV charging station franchise",
    "zero investment EV charger host",
    "Charger as a Service CaaS",
    "commercial EV charging solutions India",
  ],
  alternates: {
    canonical: `${SITE_URL}/business`,
  },
  openGraph: {
    title: "EV Business Solutions & Partnership Models | Relux Electric",
    description:
      "Explore Relux Electric EV business solutions including EV Charging Station Franchises, Zero Investment Host Partnerships, Charging as a Service (CaaS), and Turnkey Fleet Infrastructure.",
    url: `${SITE_URL}/business`,
  },
};

const businessSolutions = [
  {
    title: "EV Charging Station Franchise",
    href: "/business/franchise",
    category: "Franchise Partner",
    description:
      "Turnkey franchise investment models with make-in-India DC fast chargers, central CMS software, and fast 18 to 36 month ROI for commercial investors.",
    features: ["Fast DC Chargers (30kW - 240kW)", "Turnkey Installation & Civil Work", "Automated Mobile App Payments", "Dedicated Maintenance & Support"],
    accent: "border-[#00b14f]/30 hover:border-[#00b14f]",
  },
  {
    title: "Zero Investment Host Partnership",
    href: "/business/zero-investment",
    category: "Land & Site Host",
    description:
      "Landowners, hotels, highway restaurants, and retail malls host Relux fast chargers with 0% capital expenditure and earn passive monthly revenue share.",
    features: ["Zero Upfront Capital Cost", "100% Hardware & Setup Funded", "Attract EV Footfall & Customers", "Passive Monthly Revenue Share"],
    accent: "border-[#00b14f]/30 hover:border-[#00b14f]",
  },
  {
    title: "Charging as a Service (CaaS)",
    href: "/business/caas",
    category: "Subscription & Lease",
    description:
      "Lease high-uptime EV chargers with flexible monthly operational payments instead of heavy upfront capital purchase for fleets and commercial sites.",
    features: ["Zero CapEx Hardware Lease", "Includes CMS Software & Maintenance", "Scalable Power Capacity", "Guaranteed Station Uptime"],
    accent: "border-[#00b14f]/30 hover:border-[#00b14f]",
  },
  {
    title: "Fleet & Enterprise Turnkey Solutions",
    href: "/business/service",
    category: "Depot & Fleet",
    description:
      "End-to-end electrical infrastructure, high-power DC charging hubs, and CMS management tailored for electric bus depots, logistics fleets, and ride-hailing operators.",
    features: ["High-Voltage Grid Substation Setup", "Depot Power Balancing CMS", "Dedicated SLA Maintenance", "Custom Fleet Integration"],
    accent: "border-[#00b14f]/30 hover:border-[#00b14f]",
  },
  {
    title: "EV Charger Hardware & Products",
    href: "/business/products",
    category: "Charger Hardware",
    description:
      "High-reliability Make-in-India AC and DC fast chargers ranging from 30kW single/dual-gun units up to 240kW ultra-fast hyper chargers complying with global standards.",
    features: ["OCPP 1.6J Open Protocol", "CCS2 & CHAdeMO Dual Guns", "IP54 Weatherproof Build", "Smart Load Management"],
    accent: "border-[#00b14f]/30 hover:border-[#00b14f]",
  },
];

export default function BusinessIndexPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": "Relux Electric",
        "legalName": "Relux Electric India Private Limited",
        "url": SITE_URL,
        "logo": `${SITE_URL}/assets/hero_franchise.png`,
        "telephone": "+91-9884866993",
        "email": "enquiry@reluxelectric.com",
      },
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/business#webpage`,
        "url": `${SITE_URL}/business`,
        "name": "EV Business Solutions & Partnership Models",
        "description": "Comprehensive business partnership models, franchise programs, CaaS leasing, and turnkey EV charging solutions by Relux Electric.",
        "publisher": { "@id": `${SITE_URL}/#organization` },
        "hasPart": businessSolutions.map((item) => ({
          "@type": "WebPage",
          "name": item.title,
          "url": `${SITE_URL}${item.href}`,
          "description": item.description,
        })),
      },
    ],
  };

  return (
    <main suppressHydrationWarning className="min-h-screen bg-black text-white pt-28 pb-20 font-sans">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00b14f]/10 border border-[#00b14f]/30 text-[#00b14f] text-xs font-bold uppercase tracking-widest mb-4">
            <FiZap /> Relux Business Ecosystem
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight mb-4">
            EV Business Solutions & <span className="text-[#00b14f]">Partnership Models</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Partner with India&apos;s leading EV charging network operator. Choose from turnkey franchises, zero investment site hosting, CaaS leasing, or fleet depot infrastructure.
          </p>
        </div>

        {/* Business Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessSolutions.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={`group flex flex-col justify-between bg-zinc-900/80 border ${item.accent} rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,177,79,0.15)] relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00b14f]/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#00b14f]/10 text-[#00b14f] text-[10px] font-black uppercase tracking-wider mb-4 border border-[#00b14f]/20">
                  {item.category}
                </span>

                <h2 className="text-xl md:text-2xl font-black text-white group-hover:text-[#00b14f] transition-colors mb-3 uppercase tracking-tight">
                  {item.title}
                </h2>

                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                <ul className="space-y-2 mb-8">
                  {item.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-zinc-300 text-xs font-medium">
                      <FiCheckCircle className="w-3.5 h-3.5 text-[#00b14f] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between text-[#00b14f] text-xs font-bold uppercase tracking-wider pt-4 border-t border-white/5 group-hover:pl-1 transition-all">
                <span>Explore Program</span>
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
