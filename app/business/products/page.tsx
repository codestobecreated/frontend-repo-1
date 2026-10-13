"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
  Zap,
  Shield,
  Wifi,
  Thermometer,
  Award,
  BatteryCharging,
  Download,
  Phone,
  Mail,
  ShoppingCart,
  SlidersHorizontal,
} from "lucide-react";
import ProductInquiryModal from "@/components/ProductInquiryModal";

/* ─────────────────────────────────────────
   PRODUCT DATA
───────────────────────────────────────── */
export interface ProductItem {
  id: string;
  badge: string;
  isBestSeller?: boolean;
  model: string;
  power: string;
  tagline: string;
  description: string;
  category: "dc-fast" | "ac" | "accessories";
  specsHighlight: string[];
  image: string;
}

const productsList: ProductItem[] = [];

const TABS = [
  { key: "all", label: "All Products" },
  { key: "dc-fast", label: "DC Fast Chargers" },
  { key: "ac", label: "AC Chargers" },
  { key: "accessories", label: "Accessories" },
];

import { BASE_URL } from "@/app/ui/baceurl";

const getFullImageUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const finalPath = cleanPath.startsWith("/media/") ? cleanPath : `/media${cleanPath}`;
  return `${BASE_URL}${finalPath}`;
};

export default function ProductListingPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);

  React.useEffect(() => {
    async function fetchProductsFromBackend() {
      try {
        const res = await fetch(`${BASE_URL}/api/products/`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const mapped: ProductItem[] = data.map((item: any) => {
              const rawImg = item.image_url || item.image || "";
              const fullImg = rawImg ? getFullImageUrl(rawImg) : "";
              return {
                id: item.product_id,
                badge: item.badge,
                isBestSeller: item.is_bestseller,
                model: item.model,
                power: item.power,
                tagline: item.tagline,
                description: item.description,
                category: item.category,
                specsHighlight: item.specs_highlight || [],
                image: fullImg,
              };
            });
            setProducts(mapped);
          }
        }
      } catch (err) {
        console.error("Using local fallback products list", err);
      }
    }
    fetchProductsFromBackend();
  }, []);

  const filteredProducts = products.filter((p) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "dc-fast") return p.category === "dc-fast";
    if (activeCategory === "ac") return p.category === "ac";
    if (activeCategory === "accessories") return p.category === "accessories";
    return true;
  });

  const productsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://reluxelectric.com/business/products#webpage",
        "url": "https://reluxelectric.com/business/products",
        "name": "EV Chargers & Hardware Catalog | Relux Electric",
        "description": "High-performance Make-in-India DC fast chargers and AC charging hardware engineered by Relux Electric.",
        "publisher": { "@id": "https://reluxelectric.com/#organization" },
      },
      {
        "@type": "OfferCatalog",
        "@id": "https://reluxelectric.com/business/products#catalog",
        "name": "Relux EV Chargers Catalog",
        "provider": { "@id": "https://reluxelectric.com/#organization" },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#4ade80] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }}
      />
      {/* ── HERO BANNER (WEBSITE DARK THEME) ── */}
      <section className="relative w-full bg-black text-white py-14 overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-[#4ade80] text-xs font-extrabold uppercase tracking-[0.25em] block mb-2">
              Our Products
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-3">
              Advanced DC Fast Chargers <span className="text-[#4ade80]">for Every Need</span>
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              High-performance, reliable and intelligent charging solutions engineered in India for today and tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* ── PRODUCT CONTENT CONTAINER (WEBSITE DARK THEME) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Category Tabs & Compare Button Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10 mb-8">
          {/* Tabs */}
          <div className="flex items-center gap-6 overflow-x-auto w-full sm:w-auto">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={`py-2 text-sm font-bold transition-all relative cursor-pointer whitespace-nowrap ${
                  activeCategory === tab.key
                    ? "text-[#4ade80]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
                {activeCategory === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4ade80] rounded-full shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                )}
              </button>
            ))}
          </div>

          {/* Compare Models */}
          <button className="flex items-center gap-2 border border-white/15 rounded-lg px-4 py-2 text-xs font-bold text-zinc-300 hover:text-white hover:bg-white/5 transition-colors shadow-sm shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-[#4ade80]" />
            <span>Compare Models</span>
          </button>
        </div>

        {/* ── 3-COLUMN PRODUCT CARDS GRID (EXACT LAYOUT FROM IMAGE + WEBSITE GREEN COLOR) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className={`bg-[#111111] rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 relative ${
                p.isBestSeller
                  ? "border-[#4ade80]/60 shadow-lg shadow-[#4ade80]/15"
                  : "border-white/10 hover:border-white/20 shadow-sm"
              }`}
            >
              {/* Card Badges Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="bg-[#4ade80] text-black text-[11px] font-black tracking-wider px-2.5 py-1 rounded uppercase shadow-sm">
                  {p.badge}
                </span>
                {p.isBestSeller && (
                  <span className="bg-emerald-500 text-white text-[10px] font-black tracking-wider px-2.5 py-0.5 rounded uppercase shadow-sm">
                    BEST SELLER
                  </span>
                )}
              </div>

              {/* Card Body: Image Left + Content Right */}
              <div className="flex gap-4 items-start mb-6">
                {/* Left: Product Image */}
                <div className="relative w-36 sm:w-40 h-52 shrink-0 bg-[#0c0c0c] border border-white/10 rounded-xl p-2 flex items-center justify-center overflow-hidden">
                  {p.image ? (
                    <img
                      src={getFullImageUrl(p.image)}
                      alt={p.model}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-zinc-600 gap-1 p-2">
                      <Zap className="w-8 h-8 text-[#4ade80]/40" />
                      <span className="text-[10px] font-bold text-center text-zinc-500">No Image Uploaded</span>
                    </div>
                  )}
                </div>

                {/* Right: Model Name, Tagline & Specs List */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-black text-white tracking-tight leading-none mb-1">
                    {p.model}
                  </h3>
                  <p className="text-xs font-semibold text-[#4ade80] mb-4 line-clamp-1">
                    {p.tagline}
                  </p>

                  {/* Bullet Specs List */}
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {p.specsHighlight.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2 leading-snug">
                        <Zap className="w-3.5 h-3.5 text-[#4ade80] shrink-0 mt-0.5" />
                        <span className="text-[11px] font-medium text-zinc-300">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Buttons: View Details + Cart Order Inquiry */}
              <div className="flex items-center gap-3 pt-2">
                <Link
                  href={`/business/products/${p.id}`}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold text-center transition-all shadow-sm ${
                    p.isBestSeller
                      ? "bg-[#4ade80] hover:bg-[#22c55e] text-black"
                      : "bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-white/15 text-white"
                  }`}
                >
                  View Details
                </Link>

                <button
                  onClick={() => setSelectedProduct(p)}
                  className="p-2.5 rounded-xl border border-[#4ade80]/40 text-[#4ade80] hover:bg-[#4ade80]/15 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                  title="Order / Request Quote"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── KEY FEATURES HIGHLIGHT STRIP (WEBSITE DARK THEME) ── */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">

            <div className="flex flex-col items-center text-center p-2">
              <div className="w-10 h-10 rounded-full bg-[#4ade80]/15 text-[#4ade80] flex items-center justify-center mb-2">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white mb-0.5">&gt; 95% Efficiency</h4>
              <p className="text-[11px] text-zinc-400 leading-tight">High performance with minimum energy loss</p>
            </div>

            <div className="flex flex-col items-center text-center p-2 pt-4 sm:pt-2">
              <div className="w-10 h-10 rounded-full bg-[#4ade80]/15 text-[#4ade80] flex items-center justify-center mb-2">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white mb-0.5">Power Factor &ge; 0.99</h4>
              <p className="text-[11px] text-zinc-400 leading-tight">Low THD &le; 5% for grid stability</p>
            </div>

            <div className="flex flex-col items-center text-center p-2 pt-4 sm:pt-2">
              <div className="w-10 h-10 rounded-full bg-[#4ade80]/15 text-[#4ade80] flex items-center justify-center mb-2">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white mb-0.5">Advanced Safety</h4>
              <p className="text-[11px] text-zinc-400 leading-tight">Over voltage, under voltage, short circuit &amp; more</p>
            </div>

            <div className="flex flex-col items-center text-center p-2 pt-4 sm:pt-2">
              <div className="w-10 h-10 rounded-full bg-[#4ade80]/15 text-[#4ade80] flex items-center justify-center mb-2">
                <Wifi className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white mb-0.5">OCPP 1.6 Ready</h4>
              <p className="text-[11px] text-zinc-400 leading-tight">Seamless integration with any CMS</p>
            </div>

            <div className="flex flex-col items-center text-center p-2 pt-4 sm:pt-2">
              <div className="w-10 h-10 rounded-full bg-[#4ade80]/15 text-[#4ade80] flex items-center justify-center mb-2">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white mb-0.5">Make in India</h4>
              <p className="text-[11px] text-zinc-400 leading-tight">Designed &amp; manufactured in Chennai, India</p>
            </div>

            <div className="flex flex-col items-center text-center p-2 pt-4 sm:pt-2">
              <div className="w-10 h-10 rounded-full bg-[#4ade80]/15 text-[#4ade80] flex items-center justify-center mb-2">
                <Thermometer className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white mb-0.5">Wide Operating Range</h4>
              <p className="text-[11px] text-zinc-400 leading-tight">-10°C to +50°C, Up to 95% RH</p>
            </div>

          </div>
        </div>

      </section>

      {/* ── BOTTOM DARK CTA BANNER (WEBSITE GREEN ACCENT) ── */}
      <section className="bg-[#0d0d0d] border-t border-white/10 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#4ade80]/15 text-[#4ade80] flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 fill-[#4ade80]" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-black text-white">
                Need help choosing the right charger?
              </h3>
              <p className="text-xs text-zinc-400">
                Our experts are here to help you build the perfect EV charging network.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href="tel:04449521212"
              className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-[#1a1a1a] hover:bg-[#252525] border border-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#4ade80]" />
              <span>Talk to Expert</span>
            </a>

            <button
              onClick={() =>
                setSelectedProduct({
                  id: "general-quote",
                  badge: "Custom",
                  model: "Custom Charger Solution",
                  power: "Custom kW",
                  tagline: "Custom EV Charging Setup Inquiry",
                  description: "Custom charger solution for business",
                  category: "dc-fast",
                  specsHighlight: [],
                  image: "",
                })
              }
              className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-[#4ade80] hover:bg-[#22c55e] text-black font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#4ade80]/20 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Request a Quote</span>
            </button>

            <Link
              href="/contact?subject=Catalogue%20Download"
              className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-[#1a1a1a] hover:bg-[#252525] border border-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-[#4ade80]" />
              <span>Download Catalogue</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRODUCT ORDER / INQUIRY MODAL ── */}
      <ProductInquiryModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        productName={selectedProduct?.model || ""}
        powerTagline={selectedProduct?.tagline}
        productImage={selectedProduct?.image}
      />
    </main>
  );
}
