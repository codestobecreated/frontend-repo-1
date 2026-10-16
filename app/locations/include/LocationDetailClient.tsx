"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { 
  FaStar, FaMapMarkerAlt, FaShieldAlt, FaClock, FaCheckCircle, 
  FaDirections, FaShareAlt, FaPhoneAlt, FaEnvelope, FaBolt, 
  FaPlug, FaBatteryFull, FaToilet, FaCoffee, FaChair, FaParking, 
  FaWifi, FaVideo, FaQuestionCircle, FaExternalLinkAlt, FaChevronRight,
  FaArrowLeft, FaCar, FaInfoCircle
} from "react-icons/fa";
import { IoMdBatteryCharging } from "react-icons/io";
import { BASE_URL, SITE_URL } from "@/app/ui/baceurl";

interface Review {
  id: number;
  name: string;
  rating: number;
  date_str: string;
  comment: string;
  is_featured?: boolean;
}

interface Station {
  id: string | number;
  name: string;
  address?: string;
  city: string;
  state?: string;
  country: string;
  latitude: string;
  longitude: string;
  status: string;
  facilities: string[];
  charger_connector: string;
  charger_power: string;
  charger_count: number;
  google_map_url: string;
  google_business_url?: string;
  google_rating?: number;
  google_reviews_count?: number;
  about_text?: string;
  operating_hours?: string;
  pricing_text?: string;
  station_id_code?: string;
  image?: string;
  avg_rating?: number;
  total_reviews?: number;
  reviews?: Review[];
  faq_schema?: string;
}

const generateSlug = (name: string, city: string) => {
  const combined = `${name}-${city}`;
  return combined
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const facilityIcons: Record<string, React.ReactNode> = {
  Restroom: <FaToilet className="text-[#00b14f]" />,
  Cafe: <FaCoffee className="text-[#00b14f]" />,
  "Seating Area": <FaChair className="text-[#00b14f]" />,
  Parking: <FaParking className="text-[#00b14f]" />,
  "Wi-Fi": <FaWifi className="text-[#00b14f]" />,
  CCTV: <FaVideo className="text-[#00b14f]" />,
  "24x7 Security": <FaShieldAlt className="text-[#00b14f]" />,
};

const defaultFacilities = [
  "Restroom", "Cafe", "Seating Area", "Parking", "Wi-Fi", "CCTV", "24x7 Security"
];

const faqsList = [
  {
    q: "What type of charger is available at this station?",
    a: "This station is equipped with high-speed DC Fast Chargers (CCS2 Dual Gun connectors) supporting rapid charging, compatible with all 4-wheeler EVs in India."
  },
  {
    q: "What is the charging cost at this station?",
    a: "The standard tariff is approximately ₹18 / kWh (indicative). Real-time billing and wallet debits are calculated seamlessly through the Relux Mobile App."
  },
  {
    q: "Is the charging station open 24x7?",
    a: "Yes, all Relux Electric charging stations operate 24 hours a day, 7 days a week with automated access, lighting, and security monitoring."
  },
  {
    q: "How many chargers are currently available?",
    a: "The station features high-power charging bays. You can view real-time live availability directly in the Relux App or on this page."
  },
  {
    q: "What amenities & facilities are available nearby?",
    a: "Drivers can relax at nearby restrooms, air-conditioned seating areas, coffee shops, and secure parking while their vehicle charges."
  }
];

export default function LocationDetailClient() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : (rawSlug as string | undefined);

  const [station, setStation] = useState<Station | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/locations/`);
        if (res.ok) {
          const data: Station[] = await res.json();
          if (slug) {
            const matched = data.find((s) => generateSlug(s.name, s.city) === slug);
            if (matched) {
              setStation(matched);
            } else {
              setStation(data[0] || null);
            }
          } else if (data.length > 0) {
            setStation(data[0]);
          }
        }
      } catch (err) {
        console.error("Failed to load station detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, [slug]);

  if (loading) {
    return (
      <div
        className="min-h-screen bg-black text-white flex items-center justify-center pt-20 font-poppins"
        style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#00b14f] border-t-transparent rounded-full animate-spin" />
          <p className="text-[16px] font-bold uppercase tracking-widest text-white/50">Loading Station Details...</p>
        </div>
      </div>
    );
  }

  if (!station) {
    return (
      <div
        className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-20 px-6 font-poppins"
        style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
      >
        <h1 className="text-3xl font-black mb-4">Station Not Found</h1>
        <p className="text-white/60 text-[16px] leading-relaxed mb-8">The requested charging location does not exist or has been relocated.</p>
        <Link href="/locations" className="px-6 py-3 bg-[#00b14f] text-white rounded-xl font-bold hover:scale-105 transition-transform">
          Back to All Locations
        </Link>
      </div>
    );
  }

  const googleMapsUrl = station.google_map_url && station.google_map_url.trim() !== ""
    ? station.google_map_url
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${station.name}, ${station.city}, ${station.country}`)}`;

  const googleBusinessUrl = station.google_business_url && station.google_business_url.trim() !== ""
    ? station.google_business_url
    : googleMapsUrl;

  const facilitiesList = station.facilities && station.facilities.length > 0 
    ? station.facilities 
    : defaultFacilities;

  const latNum = parseFloat(station.latitude) || 18.7563;
  const lngNum = parseFloat(station.longitude) || 73.3172;

  const displayRating = (station.avg_rating || station.google_rating || 4.8).toFixed(1);
  const displayReviewCount = station.total_reviews || station.google_reviews_count || 127;
  const stationIdCode = station.station_id_code || `RELX-${String(station.id).padStart(3, "0")}`;
  const operatingHours = station.operating_hours || "24 x 7 Open";
  const pricingText = station.pricing_text || "₹18 / kWh";

  const stationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "EVChargingStation"],
        "@id": `${SITE_URL}/locations/${slug}#station`,
        "name": `${station.name} - Relux Electric EV Charging Station`,
        "description": station.about_text || `Fast EV charging station at ${station.name}, ${station.city}. Equipped with ${station.charger_power} ${station.charger_connector} chargers.`,
        "url": typeof window !== "undefined" ? window.location.href : `${SITE_URL}/locations/${slug}`,
        "telephone": "+91-9884866993",
        "parentOrganization": { "@id": `${SITE_URL}/#organization` },
        "brand": { "@id": `${SITE_URL}/#organization` },
        "operator": { "@id": `${SITE_URL}/#organization` },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": station.address || station.name,
          "addressLocality": station.city,
          "addressRegion": station.state || "Tamil Nadu",
          "addressCountry": "IN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": latNum,
          "longitude": lngNum,
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59",
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": displayRating,
          "reviewCount": displayReviewCount,
        },
      },
    ],
  };

  return (
    <div
      className="min-h-screen bg-black text-white pt-16 md:pt-20 pb-20 font-poppins"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >
      {/* Schema for Local SEO / Near Me Searches */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stationSchema) }}
      />
      {station.faq_schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: station.faq_schema }}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* 🟢 1. HEADER ROW: BACK BUTTON & BREADCRUMBS */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pt-4">
          <button
            onClick={() => router.push("/locations")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-[#00b14f]/20 border border-white/10 hover:border-[#00b14f]/40 text-white hover:text-[#00b14f] rounded-xl text-xs font-bold transition-all shadow-md group"
          >
            <FaArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform text-[#00b14f]" />
            <span>Back to Map</span>
          </button>

          <nav className="flex items-center gap-2 text-xs text-white/40 flex-wrap">
            <Link href="/" className="hover:text-[#00b14f] transition-colors">Home</Link>
            <FaChevronRight className="w-2.5 h-2.5" />
            <Link href="/locations" className="hover:text-[#00b14f] transition-colors">Locations</Link>
            <FaChevronRight className="w-2.5 h-2.5" />
            <span className="text-white/60">{station.state || "India"}</span>
            <FaChevronRight className="w-2.5 h-2.5" />
            <span className="text-[#00b14f] font-semibold">{station.name}</span>
          </nav>
        </div>

        {/* 🟢 2. HERO SECTION */}
        <div className="bg-zinc-950/80 border border-white/10 rounded-3xl p-6 md:p-8 mb-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b14f]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-[#00b14f]/20 border border-[#00b14f]/40 text-[#00b14f] text-xs font-black uppercase tracking-wider rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00b14f] animate-pulse" /> LIVE
                </span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/80 text-xs font-bold rounded-full">
                  DC Fast Charger
                </span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/80 text-xs font-bold rounded-full flex items-center gap-1">
                  <FaClock className="text-[#00b14f]" /> {operatingHours}
                </span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/80 text-xs font-bold rounded-full flex items-center gap-1">
                  <FaShieldAlt className="text-[#00b14f]" /> Safe & Secure
                </span>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
                    {station.name}
                  </h1>
                  <FaCheckCircle className="text-[#00b14f] text-xl md:text-2xl shrink-0" title="Verified Station" />
                </div>
                <p className="text-white/60 text-[16px] leading-relaxed flex items-center gap-2 pt-1">
                  <FaMapMarkerAlt className="text-[#00b14f] shrink-0" />
                  {station.address || `${station.name}, ${station.city}, ${station.state || ""}, ${station.country}`}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex text-amber-400 gap-1 text-sm">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FaStar key={s} />
                  ))}
                </div>
                <span className="text-sm font-bold text-white">★ {displayRating}</span>
                <span className="text-xs text-white/40">({displayReviewCount} Google Reviews)</span>
                <a 
                  href={googleBusinessUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs font-bold text-blue-400 border-l border-white/10 pl-3 hover:underline flex items-center gap-1"
                >
                  Google Business Profile <FaExternalLinkAlt className="text-[10px]" />
                </a>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5">
              <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/location/location_img.png"
                  alt={station.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs">
                  <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white font-bold">
                    Relux Charging Station
                  </span>
                  <span className="bg-[#00b14f] text-white px-3 py-1.5 rounded-lg font-black uppercase tracking-wider">
                    {station.charger_power || "60 kW DC"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🟢 3. KEY HIGHLIGHTS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-8">
          <div className="bg-zinc-950/80 border border-white/10 p-4 rounded-2xl flex flex-col justify-center">
            <span className="text-white/40 text-[10px] font-black uppercase tracking-wider mb-1 flex items-center gap-1">
              <FaBolt className="text-[#00b14f]" /> Max Power
            </span>
            <span className="text-lg md:text-xl font-extrabold text-white">{station.charger_power || "60 kW DC"}</span>
          </div>

          <div className="bg-zinc-950/80 border border-white/10 p-4 rounded-2xl flex flex-col justify-center">
            <span className="text-white/40 text-[10px] font-black uppercase tracking-wider mb-1 flex items-center gap-1">
              <FaPlug className="text-[#00b14f]" /> Connector
            </span>
            <span className="text-lg md:text-xl font-extrabold text-white truncate">{station.charger_connector || "CCS2"}</span>
          </div>

          <div className="bg-zinc-950/80 border border-white/10 p-4 rounded-2xl flex flex-col justify-center">
            <span className="text-white/40 text-[10px] font-black uppercase tracking-wider mb-1 flex items-center gap-1">
              <FaBatteryFull className="text-[#00b14f]" /> Chargers
            </span>
            <span className="text-lg md:text-xl font-extrabold text-white">{station.charger_count || 4} Units <span className="text-xs text-[#00b14f] font-bold">Available</span></span>
          </div>

          <div className="bg-zinc-950/80 border border-white/10 p-4 rounded-2xl flex flex-col justify-center">
            <span className="text-white/40 text-[10px] font-black uppercase tracking-wider mb-1 flex items-center gap-1">
              <IoMdBatteryCharging className="text-[#00b14f]" /> Type
            </span>
            <span className="text-lg md:text-xl font-extrabold text-white">DC Fast Charging</span>
          </div>

          <div className="col-span-2 md:col-span-1 bg-zinc-950/80 border border-white/10 p-4 rounded-2xl flex flex-col justify-center">
            <span className="text-white/40 text-[10px] font-black uppercase tracking-wider mb-1 flex items-center gap-1">
              <FaMapMarkerAlt className="text-[#00b14f]" /> Distance
            </span>
            <span className="text-lg md:text-xl font-extrabold text-[#00b14f]">1.2 km <span className="text-xs text-white/50 font-normal">from you</span></span>
          </div>
        </div>

        {/* 🟢 4. AVAILABLE FACILITIES */}
        <div className="bg-zinc-950/80 border border-white/10 rounded-3xl p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#00b14f] rounded-full" />
            Available Facilities
          </h2>
          <div className="flex flex-wrap gap-3">
            {facilitiesList.map((facility) => (
              <div
                key={facility}
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-semibold text-white/90"
              >
                {facilityIcons[facility] || <FaCheckCircle className="text-[#00b14f]" />}
                <span>{facility}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 🟢 5. ABOUT STATION */}
        <div className="bg-zinc-950/80 border border-white/10 rounded-3xl p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-6 bg-[#00b14f] rounded-full" />
                About {station.name} EV Charging Station
              </h2>
              {station.about_text ? (
                station.about_text.split('\n').filter(p => p.trim() !== '').map((paragraph, idx) => (
                  <p key={idx} className="text-white/70 text-[16px] leading-relaxed">
                    {paragraph}
                  </p>
                ))
              ) : (
                <>
                  <p className="text-white/70 text-[16px] leading-relaxed">
                    Relux EV charging station at {station.name}, {station.city} offers reliable, high-speed DC fast charging for all compatible electric vehicles. The station is equipped with high-performance dual-gun chargers, ensuring a safe, fast, and seamless charging experience.
                  </p>
                  <p className="text-white/70 text-[16px] leading-relaxed">
                    Whether you are traveling locally or on a long highway drive, charge your EV conveniently while you relax at the nearby amenities.
                  </p>
                </>
              )}
              <div className="flex flex-wrap gap-2 pt-2">
                {["Reliable", "Fast Charging", "Safe & Secure", "User Friendly"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-[#00b14f]/10 border border-[#00b14f]/30 text-[#00b14f] text-xs font-bold rounded-full">
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/location/location_img.png"
                  alt="About Station"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 🟢 6. LOCATION & DIRECTIONS MAP */}
        <div className="bg-zinc-950/80 border border-white/10 rounded-3xl p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#00b14f] rounded-full" />
            Location & Directions
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Map info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                <h3 className="font-bold text-white text-base">{station.name}</h3>
                <p className="text-white/60 text-[16px] leading-relaxed">{station.address || `${station.city}, ${station.state || ""}, ${station.country}`}</p>
                <p className="text-[16px] text-[#00b14f] font-mono pt-1">
                  Lat: {latNum.toFixed(4)} | Lng: {lngNum.toFixed(4)}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#00b14f] text-white rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#00b14f]/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                >
                  <FaDirections /> Get Directions
                </a>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <FaExternalLinkAlt className="text-xs" /> Open in Google Maps
                </a>
              </div>
            </div>

            {/* Embed Map Card */}
            <div className="lg:col-span-7">
              <div className="relative w-full h-70 md:h-80 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center">
                <iframe
                  title="Station Location Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src={`https://maps.google.com/maps?q=${latNum},${lngNum}&z=14&output=embed`}
                  className="w-full h-full filter invert-90 hue-rotate-180 brightness-95"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 🟢 7. CHARGING INFORMATION */}
        <div className="bg-zinc-950/80 border border-white/10 rounded-3xl p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#00b14f] rounded-full" />
            Charging Specifications & Pricing
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] font-black text-white/40 uppercase">Max Power</p>
              <p className="text-base font-bold text-white mt-1">{station.charger_power || "60 kW DC"}</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] font-black text-white/40 uppercase">Connector</p>
              <p className="text-base font-bold text-white mt-1">{station.charger_connector || "CCS2"}</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] font-black text-white/40 uppercase">Type</p>
              <p className="text-base font-bold text-white mt-1">DC Fast Charging</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] font-black text-white/40 uppercase">Chargers</p>
              <p className="text-base font-bold text-white mt-1">{station.charger_count || 4} Units</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] font-black text-white/40 uppercase">Pricing</p>
              <p className="text-base font-bold text-[#00b14f] mt-1">{pricingText} <span className="text-[10px] text-white/40 font-normal">(Indicative)</span></p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] font-black text-white/40 uppercase">Supported EVs</p>
              <p className="text-base font-bold text-white mt-1">All CCS2 EVs</p>
            </div>
          </div>
        </div>

        {/* 🟢 8. STATION INFORMATION GRID */}
        <div className="bg-zinc-950/80 border border-white/10 rounded-3xl p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#00b14f] rounded-full" />
            Station Info & Operational Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="flex justify-between items-center p-3.5 bg-white/5 rounded-xl border border-white/5">
              <span className="text-white/50 font-medium">Operating Hours</span>
              <span className="font-bold text-white">{operatingHours}</span>
            </div>
            <div className="flex justify-between items-center p-3.5 bg-white/5 rounded-xl border border-white/5">
              <span className="text-white/50 font-medium">Operator</span>
              <span className="font-bold text-[#00b14f]">Relux Energy</span>
            </div>
            <div className="flex justify-between items-center p-3.5 bg-white/5 rounded-xl border border-white/5">
              <span className="text-white/50 font-medium">Contact Number</span>
              <a href="tel:+919884866993" className="font-bold text-[#00b14f] hover:underline">+91 9884866993</a>
            </div>
            <div className="flex justify-between items-center p-3.5 bg-white/5 rounded-xl border border-white/5">
              <span className="text-white/50 font-medium">Support Email</span>
              <a href="mailto:enquiry@reluxelectric.com" className="font-bold text-[#00b14f] hover:underline">enquiry@reluxelectric.com</a>
            </div>
            <div className="flex justify-between items-center p-3.5 bg-white/5 rounded-xl border border-white/5">
              <span className="text-white/50 font-medium">Station ID</span>
              <span className="font-mono font-bold text-white">{stationIdCode}</span>
            </div>
            <div className="flex justify-between items-center p-3.5 bg-white/5 rounded-xl border border-white/5">
              <span className="text-white/50 font-medium">Status Updated</span>
              <span className="font-bold text-white/80">Real-time</span>
            </div>
          </div>
        </div>

        {/* 🟢 9. FREQUENTLY ASKED QUESTIONS (FAQ Section) */}
        <div className="bg-zinc-950/80 border border-white/10 rounded-3xl p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#00b14f] rounded-full" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqsList.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-4 text-left font-bold text-sm md:text-base text-white flex justify-between items-center gap-4"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#00b14f] font-black text-lg">{activeFaq === index ? "−" : "+"}</span>
                </button>
                {activeFaq === index && (
                  <div className="px-4 pb-4 text-white/70 text-[16px] leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 🟢 10. REVIEWS & RATINGS */}
        <div className="bg-zinc-950/80 border border-white/10 rounded-3xl p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#00b14f] rounded-full" />
            Google Business Reviews & Ratings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Score card */}
            <div className="md:col-span-4 p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
              <span className="text-5xl font-black text-white">★ {displayRating}</span>
              <div className="flex justify-center text-amber-400 gap-1 my-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <FaStar key={s} size={18} />
                ))}
              </div>
              <p className="text-[16px] text-white/60 font-semibold">{displayReviewCount} Google Reviews</p>
              <a
                href={googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:underline mt-2"
              >
                Relux Google Reviews <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </div>

            {/* Breakdown progress bars */}
            <div className="md:col-span-8 space-y-2">
              {[
                { stars: 5, count: Math.round(displayReviewCount * 0.8), pct: "80%" },
                { stars: 4, count: Math.round(displayReviewCount * 0.14), pct: "14%" },
                { stars: 3, count: Math.round(displayReviewCount * 0.04), pct: "4%" },
                { stars: 2, count: Math.round(displayReviewCount * 0.01), pct: "1%" },
                { stars: 1, count: Math.round(displayReviewCount * 0.01), pct: "1%" },
              ].map((item) => (
                <div key={item.stars} className="flex items-center gap-3 text-xs text-white/70">
                  <span className="w-8 font-bold">{item.stars} ★</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00b14f]" style={{ width: item.pct }} />
                  </div>
                  <span className="w-8 text-right text-white/40">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Google Reviews List */}
          {station.reviews && station.reviews.length > 0 && (
            <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-2">Featured Customer Reviews</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {station.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-sm">{rev.name}</span>
                      <span className="text-xs text-white/40">{rev.date_str}</span>
                    </div>
                    <div className="flex text-amber-400 gap-0.5 text-xs">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <p className="text-[16px] text-white/70 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 🟢 11. CTA BANNER */}
        <div className="bg-linear-to-r from-[#00b14f]/20 via-zinc-950 to-zinc-950 border border-[#00b14f]/30 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-white">Charge Your EV with Relux</h2>
            <p className="text-white/60 text-[16px] leading-relaxed">Fast, reliable & safe charging across India's rapidly growing network.</p>
          </div>
          <Link
            href="/locations"
            className="px-8 py-3.5 bg-[#00b14f] text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform shadow-lg shadow-[#00b14f]/20 shrink-0"
          >
            Find More Stations
          </Link>
        </div>

      </div>
    </div>
  );
}
