"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Megaphone,
  FileText,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Play,
  Volume2,
  VolumeX,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
} from "lucide-react";
import { FaYoutube } from "react-icons/fa6";
import { BASE_URL } from "@/app/ui/baceurl";

// Interfaces
interface FeedItem {
  id: string | number;
  title: string;
  category: string;
  date?: string;
  image: string;
  slug?: string;
  link?: string;
  excerpt?: string;
}

interface ParsedVideoItem {
  id: number | string;
  title: string;
  type: "youtube" | "instagram" | "mp4";
  embedUrl: string;
  originalUrl: string;
}

// Fallback Default Updates Data
const DEFAULT_UPDATES: FeedItem[] = [
  {
    id: "art-feat",
    category: "EV CHARGING",
    title: "The Future of EV Charging in India",
    excerpt:
      "From smart stations to a cleaner planet — explore how EV charging is shaping a sustainable future.",
    date: "12 Oct 2026",
    image: "/media/blogs/Super_Hub.jpg",
    link: "/activity-hub/blogs",
  },
  {
    id: "up-1",
    category: "FRANCHISE OPENINGS",
    title: "Relux Franchise Now Open in Coimbatore",
    date: "12 Oct 2026",
    image: "/franchise/120 kW.webp",
    link: "/business/franchise",
  },
  {
    id: "up-2",
    category: "EVENTS",
    title: "Relux EV Expo 2026 - A Grand Success",
    date: "08 Oct 2026",
    image: "/about/relux_website_img.webp",
    link: "/activity-hub/blogs",
  },
  {
    id: "up-3",
    category: "BRANCH OPENINGS",
    title: "New Branch Opening - Tiruppur",
    date: "04 Oct 2026",
    image: "/images/relux-electric-tamilnadu-banner.webp",
    link: "/locations",
  },
  {
    id: "up-4",
    category: "ANNOUNCEMENTS",
    title: "Relux Partners with Tamil Nadu Government",
    date: "29 Sep 2026",
    image: "/media/zero_land_photos/Relux.jpg.jpeg",
    link: "/activity-hub/blogs",
  },
  {
    id: "up-5",
    category: "NETWORK UPDATES",
    title: "EV Charging Network Crosses 100+ Stations",
    date: "25 Sep 2026",
    image: "/media/blogs/Super_Hub.jpg",
    link: "/locations",
  },
  {
    id: "up-6",
    category: "BUSINESS",
    title: "Why EV Charging is a High-Yield Investment",
    date: "22 Sep 2026",
    image: "/media/blogs/hyper_charging.jpg",
    link: "/activity-hub/blogs",
  },
  {
    id: "up-7",
    category: "TECHNOLOGY",
    title: "Fast DC Chargers vs AC Chargers: What You Need to Know",
    date: "18 Sep 2026",
    image: "/media/blogs/silent_revolution.jpg",
    link: "/activity-hub/blogs",
  },
];

const getArticleImage = (img?: string) => {
  if (!img) return "/blog/blog_img.webp";
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  if (img.startsWith("/images/") || img.startsWith("/about/") || img.startsWith("/franchise/")) return img;
  const clean = img.startsWith("/") ? img : `/${img}`;
  const finalPath = clean.startsWith("/media/") ? clean : `/media${clean}`;
  return `${BASE_URL}${finalPath}`;
};

export default function HomeNewsMarquee() {
  const [videoItems, setVideoItems] = useState<ParsedVideoItem[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Fetch backend videos if available
  useEffect(() => {
    let isMounted = true;
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/home-shorts/`);
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : data.results || [];
          if (list.length > 0 && isMounted) {
            const parsed: ParsedVideoItem[] = [];
            for (const v of list) {
              const url = (v.video_url || "").trim();
              if (!url) continue;

              const ytMatch = url.match(
                /(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|shorts\/)([a-zA-Z0-9_-]{11})/i
              );
              if (ytMatch) {
                const id = ytMatch[1];
                parsed.push({
                  id: v.id || id,
                  title: v.title || "Why Choose Relux?",
                  type: "youtube",
                  embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&rel=0&playsinline=1&controls=0`,
                  originalUrl: url,
                });
                continue;
              }

              if (url.match(/\.(mp4|webm)(\?.*)?$/i)) {
                parsed.push({
                  id: v.id || url,
                  title: v.title || "Why Choose Relux?",
                  type: "mp4",
                  embedUrl: url,
                  originalUrl: url,
                });
              }
            }
            if (parsed.length > 0) setVideoItems(parsed);
          }
        }
      } catch {
        // Fallback default shorts displayed
      }
    };

    fetchVideos();
    return () => {
      isMounted = false;
    };
  }, []);

  // Articles list from backend only
  const [articleList, setArticleList] = useState<FeedItem[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  // Fetch backend articles from /api/articles/
  useEffect(() => {
    let isMounted = true;
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/articles/`);
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : data.results || [];
          if (Array.isArray(list) && isMounted) {
            const formatted: FeedItem[] = list.map((a: any) => ({
              id: a.id,
              title: a.title,
              category: (a.author || "ARTICLE").toUpperCase(),
              image: getArticleImage(a.image),
              link: "/activity-hub/videos#articles-insights",
              date: a.created_at,
            }));
            setArticleList(formatted);
          }
        }
      } catch {
        // Backend unavailable
      } finally {
        if (isMounted) setArticlesLoading(false);
      }
    };
    fetchArticles();
    return () => {
      isMounted = false;
    };
  }, []);

  // Updates list from backend /api/latest-updates/
  const [updatesList, setUpdatesList] = useState<FeedItem[]>(DEFAULT_UPDATES);
  const [activeUpdateId, setActiveUpdateId] = useState<string | number | null>(null);
  const [updatesLoading, setUpdatesLoading] = useState(true);

  // Fetch backend updates from /api/latest-updates/
  useEffect(() => {
    let isMounted = true;
    const fetchUpdates = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/latest-updates/`);
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : data.results || [];
          if (Array.isArray(list) && list.length > 0 && isMounted) {
            const formatted: FeedItem[] = list.map((u: any) => ({
              id: u.id,
              title: u.title,
              category: (u.category || "ANNOUNCEMENTS").toUpperCase(),
              excerpt: u.excerpt || "",
              image: getArticleImage(u.image_url || u.image),
              link: u.link || "/activity-hub/blogs",
              date: u.date_formatted || (u.created_at ? new Date(u.created_at).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' }) : ""),
            }));
            setUpdatesList(formatted);
          }
        }
      } catch {
        // Fallback default updates
      } finally {
        if (isMounted) setUpdatesLoading(false);
      }
    };
    fetchUpdates();
    return () => {
      isMounted = false;
    };
  }, []);

  // Ensure enough items so Block 1 height is > 650px to guarantee zero bottom gap in marquee
  const repeatedArticles = React.useMemo(() => {
    if (articleList.length === 0) return [];
    const minItemsNeeded = 8;
    const repeatCount = Math.max(1, Math.ceil(minItemsNeeded / articleList.length));
    const result: FeedItem[] = [];
    for (let i = 0; i < repeatCount; i++) {
      result.push(...articleList);
    }
    return result;
  }, [articleList]);

  // Currently featured update (defaults to updatesList[0], the most recently updated)
  const currentFeatured =
    (activeUpdateId !== null
      ? updatesList.find((u) => String(u.id) === String(activeUpdateId))
      : null) || updatesList[0];

  // The remaining updates (exclude currently featured one, slice 0..3)
  const remainingUpdates = updatesList
    .filter((u) => String(u.id) !== String(currentFeatured?.id))
    .slice(0, 3);

  const activeVideo = videoItems[currentVideoIndex];

  return (
    <section className="relative w-full py-12 md:py-16 bg-white text-zinc-900 font-sans overflow-hidden">
      <div className="w-[95%] max-w-[1440px] mx-auto px-3 sm:px-6 relative z-10 space-y-8">

        {/* ======================================================== */}
        {/* 1. TOP HEADER */}
        {/* ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-[#00b14f] text-xs sm:text-sm md:text-[13px] font-bold tracking-[0.25em] uppercase block">
              LATEST NEWS &amp; UPDATES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight leading-[1.15]">
              What's New at <span className="text-[#00b14f]">Relux</span>
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal pt-0.5">
              Get the latest updates on our franchise openings, events, company announcements, and expanding EV charging network across India.
            </p>
            <div className="w-12 h-1 bg-[#00b14f] rounded-full mt-2.5" />
          </div>


        </div>

        {/* ======================================================== */}
        {/* 2. MAIN 3-COLUMN CONTENT GRID */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">

          {/* ------------------------------------------------------ */}
          {/* COLUMN 1: LATEST ARTICLES (4 COLS - MATCHING HEIGHT) */}
          {/* ------------------------------------------------------ */}
          <div className="lg:col-span-4 bg-white rounded-[2rem] border border-zinc-200/80 p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.03)] flex flex-col h-[420px] sm:h-[480px] lg:h-[650px]">
            {/* Card Header */}
            <div className="flex items-start justify-between gap-3 mb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#e6f8ee] text-[#00b14f] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight leading-snug">
                    Articles
                  </h3>
                  <p className="text-xs sm:text-[13px] text-zinc-500 font-normal leading-normal mt-0.5">
                    Insights, guides and updates to help you understand the EV revolution.
                  </p>
                </div>
              </div>

              <Link
                href="/activity-hub/videos#articles-insights"
                aria-label="View all articles"
                className="w-9 h-9 rounded-full bg-[#f4fbf7] hover:bg-[#00b14f] text-[#00b14f] hover:text-white flex items-center justify-center transition-colors shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Articles List - Continuous Auto-Scroll Loop */}
            <div className="relative flex-1 min-h-0 overflow-hidden group/marquee">
              {repeatedArticles.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center text-zinc-400">
                  <FileText className="w-8 h-8 mb-2 opacity-30 text-[#00b14f]" />
                  <p className="text-xs">
                    {articlesLoading ? "Loading articles..." : "No articles published yet."}
                  </p>
                </div>
              ) : (
                <>
                  {/* Soft Gradient Mask for smooth top/bottom blend */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />

                  {/* Scrolling track: 2 identical contiguous blocks for infinite seamless loop */}
                  <div className="vertical-scroll-track flex flex-col will-change-transform">
                    {/* Block 1 */}
                    <div className="flex flex-col gap-3 pb-3 shrink-0">
                      {repeatedArticles.map((item, idx) => (
                        <Link
                          key={`b1-${item.id}-${idx}`}
                          href="/activity-hub/videos#articles-insights"
                          className="group/item flex items-center gap-3.5 py-2.5 hover:bg-zinc-50/80 rounded-2xl p-2 -mx-1 transition-colors border-b border-zinc-100/80 last:border-0"
                        >
                          {/* Thumbnail */}
                          <div className="relative w-20 h-14 sm:w-22 sm:h-15 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="90px"
                              className="object-cover group-hover/item:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                (e.currentTarget as any).src = "/blog/blog_img.webp";
                              }}
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 pr-1">
                            <span className="text-[11px] font-bold text-[#00b14f] uppercase tracking-wider block mb-1 truncate">
                              {item.category}
                            </span>
                            <h4 className="text-sm sm:text-[15px] font-bold text-zinc-900 leading-snug line-clamp-2 group-hover/item:text-[#00b14f] transition-colors">
                              {item.title}
                            </h4>
                          </div>

                          {/* Circle Arrow */}
                          <div className="w-7 h-7 rounded-full bg-zinc-50 border border-zinc-200/80 text-zinc-400 group-hover/item:bg-[#00b14f] group-hover/item:text-white group-hover/item:border-[#00b14f] flex items-center justify-center shrink-0 transition-colors">
                            <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Block 2 (Exact duplicate clone for zero-gap seamless continuous scroll) */}
                    <div aria-hidden="true" className="flex flex-col gap-3 pb-3 shrink-0">
                      {repeatedArticles.map((item, idx) => (
                        <Link
                          key={`b2-${item.id}-${idx}`}
                          tabIndex={-1}
                          href="/activity-hub/videos#articles-insights"
                          className="group/item flex items-center gap-3.5 py-2.5 hover:bg-zinc-50/80 rounded-2xl p-2 -mx-1 transition-colors border-b border-zinc-100/80 last:border-0"
                        >
                          {/* Thumbnail */}
                          <div className="relative w-20 h-14 sm:w-22 sm:h-15 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="90px"
                              className="object-cover group-hover/item:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                (e.currentTarget as any).src = "/blog/blog_img.webp";
                              }}
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 pr-1">
                            <span className="text-[11px] font-bold text-[#00b14f] uppercase tracking-wider block mb-1 truncate">
                              {item.category}
                            </span>
                            <h4 className="text-sm sm:text-[15px] font-bold text-zinc-900 leading-snug line-clamp-2 group-hover/item:text-[#00b14f] transition-colors">
                              {item.title}
                            </h4>
                          </div>

                          {/* Circle Arrow */}
                          <div className="w-7 h-7 rounded-full bg-zinc-50 border border-zinc-200/80 text-zinc-400 group-hover/item:bg-[#00b14f] group-hover/item:text-white group-hover/item:border-[#00b14f] flex items-center justify-center shrink-0 transition-colors">
                            <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Local Keyframe Styles for Smooth Continuous Loop */}
                  <style>{`
                    @keyframes verticalScrollLoop {
                      0% { transform: translateY(0); }
                      100% { transform: translateY(-50%); }
                    }
                    .vertical-scroll-track {
                      animation: verticalScrollLoop 35s linear infinite;
                    }
                    .group\\/marquee:hover .vertical-scroll-track,
                    .group\\/marquee:active .vertical-scroll-track,
                    .vertical-scroll-track:hover,
                    .vertical-scroll-track:active {
                      animation-play-state: paused;
                    }
                  `}</style>
                </>
              )}
            </div>
          </div>

          {/* ------------------------------------------------------ */}
          {/* COLUMN 2: LATEST UPDATES (5 COLS - MATCHING HEIGHT) */}
          {/* ------------------------------------------------------ */}
          <div className="lg:col-span-5 bg-white rounded-[2rem] border border-zinc-200/80 p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.03)] flex flex-col h-full lg:h-[650px]">
            {/* Card Header */}
            <div className="flex items-start justify-between gap-3 mb-3.5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#e6f8ee] text-[#00b14f] flex items-center justify-center shrink-0">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight leading-snug">
                    Latest Updates
                  </h3>
                  <p className="text-xs sm:text-[13px] text-zinc-500 font-normal leading-normal mt-0.5">
                    Franchise openings, events, branch launches, announcements and network updates.
                  </p>
                </div>
              </div>

              <Link
                href="/activity-hub/blogs"
                aria-label="View all updates"
                className="w-9 h-9 rounded-full bg-[#f4fbf7] hover:bg-[#00b14f] text-[#00b14f] hover:text-white flex items-center justify-center transition-colors shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Featured Article Card */}
            {currentFeatured && (
              <div
                key={currentFeatured.id}
                className="shrink-0 group relative border border-zinc-200/80 rounded-2xl overflow-hidden p-3 sm:p-3.5 hover:border-[#00b14f]/50 hover:shadow-xs transition-all duration-300 mb-2.5 bg-zinc-50/50"
              >
                <Link
                  href={`/latest-updates/${currentFeatured.id}`}
                  className="block"
                >
                  {/* Landscape Image Banner */}
                  <div className="relative h-32 sm:h-36 w-full rounded-xl overflow-hidden mb-2 bg-zinc-100">
                    <Image
                      src={currentFeatured.image || "/blog/blog_img.webp"}
                      alt={currentFeatured.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 460px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.currentTarget as any).src = "/blog/blog_img.webp";
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#00b14f] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                      <Sparkles className="w-3 h-3 fill-white" />
                      <span>FEATURED</span>
                    </div>

                    {activeUpdateId !== null && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveUpdateId(null);
                        }}
                        title="Reset to latest update"
                        className="absolute top-2.5 right-2.5 bg-black/60 hover:bg-black/80 text-white text-[11px] font-medium px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1 transition-colors"
                      >
                        ✕ Close
                      </button>
                    )}
                  </div>

                  {/* Featured Text */}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-bold text-[#00b14f] uppercase tracking-wider block truncate">
                      {currentFeatured.category}
                    </span>
                    {currentFeatured.date && (
                      <span className="text-[11px] text-zinc-400 shrink-0">
                        {currentFeatured.date}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 leading-snug mb-1 group-hover:text-[#00b14f] transition-colors line-clamp-1">
                    {currentFeatured.title}
                  </h4>
                  <p className="text-zinc-600 text-xs sm:text-[13px] leading-relaxed line-clamp-2 mb-2 font-normal">
                    {currentFeatured.excerpt || "From smart stations to a cleaner planet — explore how EV charging is shaping a sustainable future."}
                  </p>

                  <div className="flex items-center justify-end">
                    <span className="text-[#00b14f] text-xs sm:text-sm font-bold flex items-center gap-1 group-hover:underline">
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {/* Bottom 3 Updates */}
            <div className="flex-1 flex flex-col justify-between divide-y divide-zinc-100/90">
              {remainingUpdates.map((update) => (
                <div
                  key={update.id}
                  onClick={() => setActiveUpdateId(update.id)}
                  title="Click to view this update on top"
                  className="group flex items-center gap-3 py-1.5 hover:bg-zinc-50/80 rounded-xl p-1.5 -mx-1.5 transition-colors cursor-pointer"
                >
                  <div className="relative w-18 h-12 sm:w-20 sm:h-13 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                    <Image
                      src={update.image || "/blog/blog_img.webp"}
                      alt={update.title}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as any).src = "/blog/blog_img.webp";
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#00b14f] uppercase tracking-wider block leading-tight truncate">
                        {update.category}
                      </span>
                      {update.date && (
                        <span className="text-[10px] text-zinc-400 shrink-0">
                          {update.date}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 leading-snug line-clamp-2 group-hover:text-[#00b14f] transition-colors">
                      {update.title}
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveUpdateId(update.id);
                    }}
                    aria-label={`Open "${update.title}" on top`}
                    className="w-6 h-6 rounded-full bg-zinc-50 border border-zinc-200/80 text-zinc-400 group-hover:bg-[#00b14f] group-hover:text-white group-hover:border-[#00b14f] flex items-center justify-center shrink-0 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------------ */}
          {/* COLUMN 3: YOUTUBE SHORTS (3 COLS - MATCHING HEIGHT) */}
          {/* ------------------------------------------------------ */}
          <div className="lg:col-span-3 bg-[#eef9f2] rounded-[2rem] border border-[#d2f3df] p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,177,79,0.04)] flex flex-col h-full lg:h-[650px]">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-3.5 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs">
                  <FaYoutube className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight leading-tight">
                    YouTube Shorts
                  </h3>
                  <span className="text-xs sm:text-[13px] font-semibold text-[#00873d] block mt-0.5">
                    Why Choose Relux?
                  </span>
                </div>
              </div>

              <a
                href="https://www.youtube.com/@reluxelectric7550"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on YouTube"
                className="w-9 h-9 rounded-full bg-white text-[#00873d] hover:bg-[#00b14f] hover:text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* 9:16 Vertical Video Frame - Flex to fit exact 650px card height */}
            <div className="relative flex-1 w-full rounded-2xl overflow-hidden bg-black shadow-lg border border-black/10 group min-h-[460px]">
              {/* Embed video or Fallback Short */}
              {activeVideo && activeVideo.type === "youtube" ? (
                <iframe
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  {/* Simulated High-Res Video Frame Poster */}
                  <Image
                    src="/media/hero_slides/hero_slide_1.jpg"
                    alt="Why Choose Relux YouTube Short"
                    fill
                    sizes="340px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Dark gradient overlay for realistic YouTube Shorts look */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none" />

                  {/* Top Watermark & Sound Toggle */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                      <span className="text-[11px] font-black text-white tracking-wider">
                        Re<span className="text-[#00e676]">l</span>ux
                      </span>
                    </div>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors cursor-pointer"
                      aria-label="Toggle mute"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Center Short Title Overlay */}
                  <div className="absolute top-16 inset-x-4 z-10">
                    <span className="text-white text-base sm:text-lg font-black block leading-tight">
                      Why Choose
                    </span>
                    <span className="text-[#00e676] text-xl sm:text-2xl font-black block leading-tight drop-shadow-md">
                      Relux?
                    </span>
                  </div>

                  {/* Right Action Icons (YouTube Shorts Sidebar) */}
                  <div className="absolute right-2.5 bottom-16 z-20 flex flex-col items-center gap-3 text-white">
                    <div className="flex flex-col items-center">
                      <button className="p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-white/20 transition cursor-pointer">
                        <ThumbsUp className="w-4 h-4 fill-white" />
                      </button>
                      <span className="text-xs font-bold mt-0.5">13</span>
                    </div>
                    <button className="p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-white/20 transition cursor-pointer">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-white/20 transition cursor-pointer">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bottom Metadata & Profile Tag */}
                  <div className="absolute bottom-3 inset-x-3 z-10 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-white text-[#00b14f] flex items-center justify-center font-black text-xs">
                        R
                      </div>
                      <span className="text-white text-xs sm:text-[13px] font-bold">
                        @reluxelectric7550
                      </span>
                    </div>
                    <p className="text-white/90 text-xs font-medium line-clamp-1">
                      The Relux EV Promise for Franchise ...
                    </p>

                    {/* YouTube Progress Bar Line */}
                    <div className="w-full h-0.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-red-600 rounded-full" />
                    </div>
                  </div>

                  {/* Clickable Full Link to YouTube Short */}
                  <a
                    href="https://www.youtube.com/@reluxelectric7550/shorts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Play Relux short video on YouTube"
                  >
                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </a>
                </>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
