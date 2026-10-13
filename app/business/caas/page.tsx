import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_URL } from "@/app/ui/baceurl";
import {
  FiCheckCircle,
  FiUser,
  FiZap,
  FiMapPin,
  FiLayers,
  FiShield,
  FiTool,
  FiCpu,
  FiServer,
  FiHeadphones,
  FiShare2,
  FiRefreshCw,
  FiArrowRight,
  FiHelpCircle,
} from "react-icons/fi";
import CaasHeroFormModal from "./include/CaasHeroFormModal";

export const metadata: Metadata = {
  title: "Charger as a Service (CaaS) | Relux Electric",
  description:
    "Lease and own your EV charger with RELUX. You build the location, we provide the charger, and you retain the charging revenue.",
  keywords: [
    "Charger as a Service",
    "CaaS EV charger",
    "lease EV charger India",
    "Relux Electric CaaS",
    "EV charger lease to own",
    "EV charging station business model",
  ],
  alternates: {
    canonical: `${SITE_URL}/business/caas`,
  },
  openGraph: {
    title: "Charger as a Service (CaaS) | Relux Electric",
    description:
      "Lease and own your EV charger with RELUX. You build the location, we provide the charger, and you retain the charging revenue.",
    url: `${SITE_URL}/business/caas`,
  },
};

export default function CaasPage() {
  const caasSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/business/caas#webpage`,
        "url": `${SITE_URL}/business/caas`,
        "name": "Charger as a Service (CaaS) | Relux Electric",
        "description": "Lease and own your EV charger with RELUX. You build the location, we provide the charger, and you retain the charging revenue.",
        "publisher": { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/business/caas#service`,
        "name": "Charger as a Service (CaaS)",
        "provider": { "@id": `${SITE_URL}/#organization` },
        "areaServed": "IN",
        "description": "Subscription & operational leasing model for high-uptime EV chargers with turnkey CMS software and maintenance.",
      },
    ],
  };

  return (
    <main className="bg-black min-h-screen text-white font-sans selection:bg-[#4ade80] selection:text-black">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caasSchema) }}
      />
      {/* Contact Page Style Banner Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden border-b border-white/10">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop"
            alt="Charger as a Service (CaaS) Relux Electric"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/95" />
        </div>

        {/* Center Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-[4rem] font-bold text-white tracking-tight mb-3">
            Charger as a Service <span className="text-[#00b14f]">(CaaS)</span>
          </h1>
          <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-medium">
            Lease and own your EV charger with RELUX. You build the location, we provide the charger, and you retain the charging revenue.
          </p>

          {/* Hero Action Button & 3-Second Auto Popup Modal */}
          <CaasHeroFormModal buttonText="Enquire Now for CaaS" autoOpen={true} />
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 md:py-32 bg-white text-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 md:mb-20">
            <div className="lg:col-span-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight leading-[1.08]">
                How it Works
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-zinc-700 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                Our Charger as a Service (CaaS) model enables you to lease an EV charger for your location, retain the charging revenue, and transition into full asset ownership once the lease tenure completes.
              </p>
            </div>
          </div>

          {/* 3 Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-4">
            
            {/* Card 1 */}
            <div className="bg-[#bbf2c8] rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300">
              <div>
                <div className="w-14 h-14 rounded-full bg-[#00b14f] text-white flex items-center justify-center text-2xl font-black mb-8 shadow-sm">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-black text-black tracking-tight mb-4 leading-tight">
                  Lease &amp; Setup
                </h3>

                <p className="text-zinc-800 text-sm sm:text-[15px] leading-relaxed font-medium">
                  With Relux’s Charger as a Service (CaaS) model, you can lease an EV charger for your location without purchasing the charger upfront. You provide the land, power, and required civil infrastructure for charger installation, while Relux will provide the charger, canopy, maintenance and technology support.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#181a20] text-white rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between shadow-2xl md:-rotate-2 hover:rotate-0 transition-all duration-500 scale-100 md:scale-105 z-10 border border-white/10">
              <div>
                <div className="w-14 h-14 rounded-full bg-white text-[#00b14f] flex items-center justify-center text-2xl font-black mb-8 shadow-lg">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-black text-white tracking-tight mb-4 leading-tight">
                  Revenue Retention
                </h3>

                <p className="text-zinc-300 text-sm sm:text-[15px] leading-relaxed font-medium">
                  During the lease period, you can retain the revenue generated from charging, while paying Relux only the agreed charger rental.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#d2f8db] rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300">
              <div>
                <div className="w-14 h-14 rounded-full bg-[#00b14f] text-white flex items-center justify-center text-2xl font-black mb-8 shadow-sm">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-black text-black tracking-tight mb-4 leading-tight">
                  Transfer of Ownership
                </h3>

                <p className="text-zinc-800 text-sm sm:text-[15px] leading-relaxed font-medium">
                  Once the lease tenure is complete, ownership of the charger is transferred to you, turning the leased charger into a long-term asset for your location.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Scope Comparison & Location Evaluation Section - Styled following Contact Page Color Palette */}
      <section id="scope-of-work" className="py-20 md:py-28 bg-black border-t border-b border-white/10 relative overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          
          <div className="space-y-8">
            
            {/* ROW 1: 2 SIDE-BY-SIDE CARDS (YOUR SCOPE on Left, LOCATION SUITABLE on Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* TOP LEFT CARD: YOUR SCOPE */}
              <div className="lg:col-span-6 bg-[#1a1c23] border border-white/5 rounded-3xl p-6 sm:p-8 hover:border-[#4caf50]/30 transition-all duration-300 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                    <div className="shrink-0 w-10 h-10 rounded-[10px] bg-[#22242c] border border-white/5 flex items-center justify-center text-[#4caf50]">
                      <FiUser className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">Your scope</h3>
                  </div>

                  {/* 3 List Items with alternating Green and White Bullets */}
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#242630] border border-white/5 hover:border-[#4caf50]/30 transition-colors">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#4caf50] shrink-0" />
                      <span className="text-base font-extrabold text-white">Land/location</span>
                    </div>

                    <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#242630] border border-white/5 hover:border-white/20 transition-colors">
                      <div className="w-2.5 h-2.5 rounded-full bg-white shrink-0" />
                      <span className="text-base font-extrabold text-white">Power connection &amp; electricity</span>
                    </div>

                    <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#242630] border border-white/5 hover:border-[#4caf50]/30 transition-colors">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#4caf50] shrink-0" />
                      <span className="text-base font-extrabold text-white">Civil infrastructure required for installation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TOP RIGHT CARD: IS YOUR LOCATION SUITABLE? (Contact Page Green Highlight Card Style) */}
              <div className="lg:col-span-6 bg-[#0c2a16] border border-[#1b3d26] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#4caf50]/10 blur-[100px] rounded-full pointer-events-none" />

                <div>
                  <div className="shrink-0 w-12 h-12 rounded-[12px] bg-[#1b3d26] border border-[#4caf50]/20 flex items-center justify-center text-[#4caf50] mb-5 shadow-md">
                    <FiHelpCircle className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3 leading-tight">
                    Is Your Location Suitable?
                  </h3>

                  <p className="text-[#98c1a6] text-sm sm:text-base leading-relaxed font-medium mb-6">
                    Every site is evaluated and is subject to final approval by Relux. Based on the location, infrastructure, accessibility, and expected demand, Relux will determine whether your site qualifies for the CaaS model.
                  </p>

                  <div className="p-4 rounded-xl bg-[#143d22]/50 border border-[#1b3d26] mb-6">
                    <h4 className="text-sm font-extrabold text-white mb-1">
                      Have a location in mind? Tell us about it.
                    </h4>
                    <p className="text-[#98c1a6] text-xs font-medium">
                      Fill out the details to check location eligibility with our team.
                    </p>
                  </div>
                </div>

                <div>
                  <CaasHeroFormModal 
                    buttonText="Fill CaaS Location Form" 
                    buttonClassName="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#4caf50] hover:bg-[#43a047] text-black font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#4caf50]/20 cursor-pointer"
                    autoOpen={false} 
                  />
                </div>
              </div>

            </div>

            {/* ROW 2: FULL-WIDTH BOTTOM CARD FOR RELUX'S SCOPE */}
            <div className="bg-[#1a1c23] border border-white/5 rounded-3xl p-6 sm:p-8 hover:border-[#4caf50]/30 transition-all duration-300 shadow-2xl">
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <div className="shrink-0 w-10 h-10 rounded-[10px] bg-[#22242c] border border-white/5 flex items-center justify-center text-[#4caf50]">
                  <FiZap className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">Relux’s scope</h3>
              </div>

              {/* 8 List Items across 4 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#242630] border border-white/5 hover:border-[#4caf50]/30 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4caf50] shrink-0" />
                  <span className="text-sm sm:text-base font-extrabold text-white">EV charger</span>
                </div>

                <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#242630] border border-white/5 hover:border-[#4caf50]/30 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4caf50] shrink-0" />
                  <span className="text-sm sm:text-base font-extrabold text-white">Canopy</span>
                </div>

                <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#242630] border border-white/5 hover:border-[#4caf50]/30 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4caf50] shrink-0" />
                  <span className="text-sm sm:text-base font-extrabold text-white">Charger installation</span>
                </div>

                <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#242630] border border-white/5 hover:border-[#4caf50]/30 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4caf50] shrink-0" />
                  <span className="text-sm sm:text-base font-extrabold text-white">Charger maintenance</span>
                </div>

                <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#242630] border border-white/5 hover:border-[#4caf50]/30 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4caf50] shrink-0" />
                  <span className="text-sm sm:text-base font-extrabold text-white">Software &amp; backend systems</span>
                </div>

                <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#242630] border border-white/5 hover:border-[#4caf50]/30 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4caf50] shrink-0" />
                  <span className="text-sm sm:text-base font-extrabold text-white">Customer support</span>
                </div>

                <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#242630] border border-white/5 hover:border-[#4caf50]/30 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4caf50] shrink-0" />
                  <span className="text-sm sm:text-base font-extrabold text-white">Social media optimization</span>
                </div>

                <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#242630] border border-white/5 hover:border-[#4caf50]/30 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4caf50] shrink-0" />
                  <span className="text-sm sm:text-base font-extrabold text-white">Ongoing technology and operational support</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}
