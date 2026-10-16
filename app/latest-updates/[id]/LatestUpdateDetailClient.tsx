"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Share2,
  Check,
  Sparkles,
  ChevronRight,
  Zap,
  Building2,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { BASE_URL } from "@/app/ui/baceurl";

interface UpdateItem {
  id: string | number;
  title: string;
  category: string;
  excerpt?: string | null;
  content?: string | null;
  image?: string | null;
  link?: string | null;
  date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

const FALLBACK_UPDATES: Record<string, UpdateItem> = {
  "art-feat": {
    id: "art-feat",
    category: "EV CHARGING",
    title: "The Future of EV Charging in India",
    excerpt:
      "From smart stations to a cleaner planet — explore how EV charging is shaping a sustainable future.",
    content: `As India accelerates toward an electric future, the demand for fast, reliable, and accessible EV charging infrastructure is growing at an unprecedented rate. Relux Electric is at the forefront of this green transition, deploying next-generation DC fast charging hubs and smart AC charging stations across highways and urban centres.

Our vision goes beyond simply installing chargers — we are building integrated energy hubs powered by solar renewable power, intelligent load-balancing software, and seamless mobile app connectivity. EV drivers can now locate stations, reserve charging slots, monitor state-of-charge, and complete contactless digital payments in seconds.

With over 100+ charging stations and rapidly expanding corridors across Tamil Nadu, Karnataka, and Kerala, Relux continues to bridge the gap between range anxiety and sustainable highway travel.`,
    date: "12 Oct 2026",
    image: "/media/blogs/Super_Hub.jpg",
    link: "/activity-hub/blogs",
  },
  "up-1": {
    id: "up-1",
    category: "FRANCHISE OPENINGS",
    title: "Relux Franchise Now Open in Coimbatore",
    excerpt: "Relux opens new high-speed EV charging franchise hub in Coimbatore.",
    content: `Relux Electric is excited to announce the grand opening of our latest franchise charging hub in Coimbatore, Tamil Nadu's industrial epicenter. Located strategically along key transportation corridors, this new hub features multiple ultra-fast DC fast chargers capable of replenishing battery levels from 10% to 80% in under 30 minutes.

This franchise model represents our commitment to empowering local entrepreneurs and business owners with turn-key, high-yield EV charging solutions. Our franchise partners receive end-to-end technical assistance, site planning, regulatory approvals, hardware installation, and round-the-clock remote network monitoring.`,
    date: "12 Oct 2026",
    image: "/franchise/120 kW.webp",
    link: "/business/franchise",
  },
  "up-2": {
    id: "up-2",
    category: "EVENTS",
    title: "Relux EV Expo 2026 - A Grand Success",
    excerpt: "Highlights and announcements from the annual Relux EV Expo.",
    content: `The Relux EV Expo 2026 concluded with unprecedented participation from EV manufacturers, fleet operators, franchise investors, and clean mobility enthusiasts. The event showcased Relux's latest 240kW ultra-high-power DC fast charging dispensers, proprietary dynamic power-sharing architecture, and solar-coupled battery energy storage solutions.

Key keynote sessions highlighted the commercial viability of EV charging infrastructure in tier-1 and tier-2 cities, along with comprehensive case studies on ROI and station uptime maintenance.`,
    date: "08 Oct 2026",
    image: "/about/relux_website_img.webp",
    link: "/activity-hub/blogs",
  },
  "up-3": {
    id: "up-3",
    category: "BRANCH OPENINGS",
    title: "New Branch Opening - Tiruppur",
    excerpt: "Expanding our high-capacity charging network with a brand new branch in Tiruppur.",
    content: `Relux Electric continues its state-wide expansion with the inauguration of a brand-new high-capacity charging station in Tiruppur. As a vital textile manufacturing center with high interstate commercial transit, this branch fulfills a critical need for continuous, high-speed charging.

The station operates 24/7 with dedicated customer amenities, illuminated bays, CCTV security, and multiple DC charging guns compatible with all CCS2 electric cars and commercial fleets.`,
    date: "04 Oct 2026",
    image: "/images/relux-electric-tamilnadu-banner.webp",
    link: "/locations",
  },
  "up-4": {
    id: "up-4",
    category: "ANNOUNCEMENTS",
    title: "Relux Partners with Tamil Nadu Government",
    excerpt: "Strategic partnership to install EV charging stations across corridors.",
    content: `In a landmark development for public charging infrastructure, Relux Electric has formalized a strategic partnership with the Tamil Nadu State Transport authorities to install dedicated EV charging corridors along state highways and municipal hubs.

This public-private collaboration aims to ensure that no electric vehicle driver travels more than 40 km without encountering a certified Relux fast charger.`,
    date: "29 Sep 2026",
    image: "/media/zero_land_photos/Relux.jpg.jpeg",
    link: "/activity-hub/blogs",
  },
  "up-5": {
    id: "up-5",
    category: "NETWORK UPDATES",
    title: "EV Charging Network Crosses 100+ Stations",
    excerpt: "Fast-charging stations milestone reached across South India.",
    content: `Relux Electric has officially crossed the milestone of 100+ active EV charging hubs across South India. With an average network uptime of 99.4%, our stations continue to set the industry standard for charger availability, speed, and reliability.

We thank our station hosts, franchise partners, and the entire EV community for trusting Relux as their preferred charging network.`,
    date: "25 Sep 2026",
    image: "/media/blogs/Super_Hub.jpg",
    link: "/locations",
  },
};

const getArticleImage = (img?: string | null) => {
  if (!img) return "/blog/blog_img.webp";
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  if (img.startsWith("/images/") || img.startsWith("/about/") || img.startsWith("/franchise/")) return img;
  const clean = img.startsWith("/") ? img : `/${img}`;
  const finalPath = clean.startsWith("/media/") ? clean : `/media${clean}`;
  return `${BASE_URL}${finalPath}`;
};

export default function LatestUpdateDetailClient() {
  const params = useParams();
  const updateId = (params?.id as string) || "";

  const [update, setUpdate] = useState<UpdateItem | null>(null);
  const [recentUpdates, setRecentUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchUpdateDetail = async () => {
      try {
        setLoading(true);

        // Fetch single update from backend if numeric ID
        let backendItem: any = null;
        try {
          const detailRes = await fetch(`${BASE_URL}/api/latest-updates/${updateId}/`);
          if (detailRes.ok) {
            backendItem = await detailRes.json();
          }
        } catch {
          // Backend single item fetch failed
        }

        // Fetch all updates for fallback or sidebar
        let allUpdates: any[] = [];
        try {
          const listRes = await fetch(`${BASE_URL}/api/latest-updates/`);
          if (listRes.ok) {
            const listData = await listRes.json();
            allUpdates = Array.isArray(listData) ? listData : listData.results || [];
          }
        } catch {
          // List lookup failed
        }

        if (!backendItem && allUpdates.length > 0) {
          backendItem = allUpdates.find(
            (item: any) => String(item.id) === String(updateId)
          );
        }

        if (backendItem && isMounted) {
          const formatted: UpdateItem = {
            id: backendItem.id,
            title: backendItem.title,
            category: (backendItem.category || "ANNOUNCEMENTS").toUpperCase(),
            excerpt: backendItem.excerpt || "",
            content: backendItem.content || backendItem.excerpt || "",
            image: getArticleImage(backendItem.image_url || backendItem.image),
            link: backendItem.link || "/activity-hub/blogs",
            date:
              backendItem.date_formatted ||
              (backendItem.created_at
                ? new Date(backendItem.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : ""),
            created_at: backendItem.created_at,
            updated_at: backendItem.updated_at,
          };
          setUpdate(formatted);
        } else if (FALLBACK_UPDATES[updateId] && isMounted) {
          setUpdate(FALLBACK_UPDATES[updateId]);
        } else if (isMounted) {
          const firstFallback = Object.values(FALLBACK_UPDATES)[0];
          setUpdate(firstFallback || null);
        }

        // Set sidebar recent updates (excluding current id)
        if (allUpdates.length > 0 && isMounted) {
          const others = allUpdates
            .filter((item: any) => String(item.id) !== String(updateId))
            .slice(0, 3)
            .map((item: any) => ({
              id: item.id,
              title: item.title,
              category: (item.category || "ANNOUNCEMENTS").toUpperCase(),
              excerpt: item.excerpt || "",
              image: getArticleImage(item.image_url || item.image),
              link: `/latest-updates/${item.id}`,
              date:
                item.date_formatted ||
                (item.created_at
                  ? new Date(item.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : ""),
            }));
          setRecentUpdates(others);
        } else if (isMounted) {
          const fallbackOthers = Object.values(FALLBACK_UPDATES)
            .filter((item) => String(item.id) !== String(updateId))
            .slice(0, 3)
            .map((item) => ({
              ...item,
              link: `/latest-updates/${item.id}`,
            }));
          setRecentUpdates(fallbackOthers);
        }
      } catch (err) {
        console.error("Error loading update details:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUpdateDetail();
    return () => {
      isMounted = false;
    };
  }, [updateId]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 pt-3 sm:pt-4 pb-12">
        <div className="w-[92%] max-w-4xl mx-auto space-y-6 animate-pulse">
          <div className="h-6 w-36 bg-zinc-200 rounded-lg" />
          <div className="h-10 w-3/4 bg-zinc-200 rounded-xl" />
          <div className="h-80 w-full bg-zinc-200 rounded-3xl" />
          <div className="space-y-3 pt-4">
            <div className="h-4 bg-zinc-200 rounded w-full" />
            <div className="h-4 bg-zinc-200 rounded w-5/6" />
            <div className="h-4 bg-zinc-200 rounded w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!update) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4 pt-24 pb-16">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm text-center space-y-4">
          <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto">
            <Zap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900">Update Not Found</h2>
          <p className="text-sm text-zinc-500">
            The update you are looking for may have been moved or removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#00b14f] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#009b45] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Split content into clean readable paragraphs
  const paragraphs = (update.content || update.excerpt || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="min-h-screen bg-zinc-50/70 pt-3 sm:pt-4 pb-14 text-zinc-900 font-sans selection:bg-[#00b14f] selection:text-white">
      <div className="w-[92%] max-w-5xl mx-auto">
        {/* ======================================================== */}
        {/* 1. COMPACT TOP ACTION BAR & BADGES */}
        {/* ======================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5 sm:mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-[#00b14f] bg-white border border-zinc-200/80 px-3 py-1 rounded-full shadow-xs hover:border-[#00b14f]/40 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>

            <span className="inline-flex items-center gap-1 bg-[#e6f8ee] text-[#00b14f] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              {update.category}
            </span>

            {update.date && (
              <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500 font-medium bg-white border border-zinc-200/80 px-2.5 py-0.5 rounded-full">
                <Calendar className="w-3 h-3 text-[#00b14f]" />
                {update.date}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 bg-white border border-zinc-200/80 px-3 py-1 rounded-full shadow-xs transition-colors"
            title="Share this update"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#00b14f]" />
                <span className="text-[#00b14f]">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* ======================================================== */}
        {/* 2. HEADER: TITLE & EXCERPT */}
        {/* ======================================================== */}
        <header className="space-y-1 mb-3.5 sm:mb-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-extrabold text-zinc-900 tracking-tight leading-[1.2]">
            {update.title}
          </h1>

          {update.excerpt && (
            <p className="text-xs sm:text-sm md:text-base text-zinc-600 font-normal leading-relaxed max-w-3xl">
              {update.excerpt}
            </p>
          )}
        </header>

        {/* ======================================================== */}
        {/* 3. HERO IMAGE BANNER */}
        {/* ======================================================== */}
        <div className="relative w-full h-48 sm:h-64 md:h-[360px] rounded-2xl overflow-hidden border border-zinc-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.05)] mb-5 bg-zinc-100">
          <Image
            src={update.image || "/blog/blog_img.webp"}
            alt={update.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            onError={(e) => {
              (e.currentTarget as any).src = "/blog/blog_img.webp";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/90 backdrop-blur-md text-zinc-800 text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00b14f] animate-pulse" />
            <span>Relux Electric Updates &amp; Insights</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. MAIN ARTICLE CONTENT BODY */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white rounded-[2rem] border border-zinc-200/80 p-6 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.02)] space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-100">
              <div className="w-9 h-9 rounded-xl bg-[#e6f8ee] text-[#00b14f] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#00b14f] uppercase tracking-wider block">
                  UPDATE OVERVIEW
                </span>
                <span className="text-xs text-zinc-500">
                  Published by Relux Official Media
                </span>
              </div>
            </div>

            {/* Paragraphs */}
            <div className="space-y-5 text-base sm:text-[17px] text-zinc-700 leading-relaxed font-normal">
              {paragraphs.length > 0 ? (
                paragraphs.map((para, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {para}
                  </p>
                ))
              ) : (
                <p>
                  Get the latest updates on our franchise openings, events, company
                  announcements, and expanding EV charging network across India.
                </p>
              )}
            </div>

            {/* Key Takeaway Callout Box */}
            <div className="bg-[#f4fbf7] border-l-4 border-[#00b14f] rounded-2xl p-5 sm:p-6 my-6 space-y-2">
              <span className="text-xs font-bold text-[#00b14f] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Key Highlights
              </span>
              <p className="text-sm sm:text-base text-zinc-800 font-medium leading-relaxed">
                Relux Electric is actively accelerating sustainable mobility across
                India through robust, solar-integrated charging stations, high-capacity
                franchise corridors, and 24/7 smart network monitoring.
              </p>
            </div>

            {/* Category Action Links */}
            <div className="pt-6 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/business/franchise"
                className="inline-flex items-center gap-2 bg-[#00b14f] hover:bg-[#009b45] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm"
              >
                <Building2 className="w-4 h-4" />
                <span>Explore Franchise</span>
              </Link>

              <Link
                href="/locations"
                className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 px-6 py-3 rounded-xl font-bold text-sm transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#00b14f]" />
                <span>Find Charging Hubs</span>
              </Link>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 5. SIDEBAR: MORE RECENT UPDATES */}
          {/* ======================================================== */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2rem] border border-zinc-200/80 p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
                  More Recent Updates
                </h3>
                <Link
                  href="/"
                  className="text-xs font-bold text-[#00b14f] hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-3.5 divide-y divide-zinc-100">
                {recentUpdates.map((item) => (
                  <Link
                    key={item.id}
                    href={`/latest-updates/${item.id}`}
                    className="group block pt-3.5 first:pt-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                        <Image
                          src={item.image || "/blog/blog_img.webp"}
                          alt={item.title}
                          fill
                          sizes="64px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.currentTarget as any).src = "/blog/blog_img.webp";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-[#00b14f] uppercase tracking-wider block mb-0.5 truncate">
                          {item.category}
                        </span>
                        <h4 className="text-xs font-semibold text-zinc-900 line-clamp-2 leading-snug group-hover:text-[#00b14f] transition-colors">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Need Help Card */}
            <div className="bg-gradient-to-br from-[#e6f8ee] to-[#d8f5e5] rounded-[2rem] border border-[#c1eed3] p-6 text-zinc-900 space-y-3">
              <span className="inline-block bg-[#00b14f] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                Support &amp; Inquiries
              </span>
              <h4 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
                Want to partner with Relux Electric?
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Connect with our franchise and infrastructure experts to bring high-speed
                EV charging to your location.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00b14f] hover:text-[#008f40] pt-1"
              >
                <span>Contact Team</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
