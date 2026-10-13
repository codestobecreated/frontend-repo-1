"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiClock, FiYoutube, FiInstagram, FiArrowRight, FiPlay, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BASE_URL } from "@/app/ui/baceurl";

interface BlogItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  read_time: string;
  tag: string;
  created_at: string;
  media_link?: string;
}

interface ParsedVideoItem {
  id: number | string;
  title: string;
  type: "youtube" | "instagram" | "mp4";
  embedUrl: string;
  originalUrl: string;
}

const getFullImageUrl = (path: string) => {
  if (!path) return "/blog/blog_img.webp";
  if (path.startsWith("http")) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return cleanPath.startsWith("/media/") ? `${BASE_URL}${cleanPath}` : `${BASE_URL}/media${cleanPath}`;
};

const getRelativeTime = (dateString: string) => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return "Today";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  } catch (e) {
    return "Recently";
  }
};

export default function HomeNewsMarquee() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [videoItems, setVideoItems] = useState<ParsedVideoItem[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/articles/`);
        if (res.ok) {
          const data = await res.json();
          const articlesList = Array.isArray(data) ? data : (data.results || []);
          if (articlesList.length > 0 && isMounted) {
            setBlogs(articlesList);
            return;
          }
        }

        // Fallback to backend /api/blogs/ if /api/articles/ has no records
        const blogRes = await fetch(`${BASE_URL}/api/blogs/`);
        if (blogRes.ok) {
          const blogData = await blogRes.json();
          const blogList = Array.isArray(blogData) ? blogData : (blogData.results || []);
          if (blogList.length > 0 && isMounted) {
            setBlogs(blogList);
          }
        }
      } catch {
        // Backend unavailable: section stays hidden
      }
    };

    const fetchVideos = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/home-shorts/`);
        if (res.ok) {
          const data = await res.json();
          const videosList = Array.isArray(data) ? data : (data.results || []);
          if (videosList.length > 0) {
            const parsed: ParsedVideoItem[] = [];

            for (const video of videosList) {
              const targetUrl = (video.video_url || "").trim();
              if (!targetUrl) continue;

              // 1. Check for Direct MP4 / Video File URL
              if (targetUrl.match(/\.(mp4|webm|mov|ogg)(\?.*)?$/i)) {
                parsed.push({
                  id: video.id || targetUrl,
                  title: video.title || "Relux Short Video",
                  type: "mp4" as any,
                  embedUrl: targetUrl,
                  originalUrl: targetUrl,
                });
                continue;
              }

              // 2. Check for Instagram URL (Reels or Posts)
              const instaMatch = targetUrl.match(/instagram\.com\/(?:reel|reels|p)\/([a-zA-Z0-9_-]+)/i);
              if (instaMatch) {
                const code = instaMatch[1];
                parsed.push({
                  id: video.id || code,
                  title: video.title || "Relux Instagram Reel",
                  type: "instagram",
                  embedUrl: `https://www.instagram.com/reel/${code}/embed/`,
                  originalUrl: targetUrl,
                });
                continue;
              }

              // 3. Check for YouTube URL (Shorts, watch, youtu.be)
              let ytId = null;
              if (targetUrl.includes("shorts/")) {
                const match = targetUrl.match(/shorts\/([a-zA-Z0-9_-]+)/i);
                if (match) ytId = match[1];
              } else {
                const match = targetUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|shorts\/)([a-zA-Z0-9_-]{11})/i);
                if (match) ytId = match[1];
              }

              if (ytId) {
                parsed.push({
                  id: video.id || ytId,
                  title: video.title || "Relux YouTube Shorts",
                  type: "youtube",
                  embedUrl: video.embed_url || `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&rel=0&playsinline=1&controls=0&enablejsapi=1`,
                  originalUrl: targetUrl,
                });
                continue;
              }

              // 3. If direct embed_url provided by API
              if (video.embed_url) {
                parsed.push({
                  id: video.id || targetUrl,
                  title: video.title || "Relux Video",
                  type: video.detected_platform === "instagram" ? "instagram" : "youtube",
                  embedUrl: video.embed_url,
                  originalUrl: targetUrl,
                });
              }
            }

            if (isMounted) {
              setVideoItems(parsed);
            }
          }
        }
      } catch {
        // Backend unavailable: shows "Coming Soon" placeholder
      }
    };

    fetchBlogs();
    fetchVideos();
    return () => {
      isMounted = false;
    };
  }, []);

  // Quick fast business-grade auto cycling (4.5 seconds)
  const [isPaused, setIsPaused] = useState(false);

  const nextVideo = () => {
    if (videoItems.length <= 1) return;
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoItems.length);
  };

  const prevVideo = () => {
    if (videoItems.length <= 1) return;
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videoItems.length) % videoItems.length);
  };

  useEffect(() => {
    if (videoItems.length <= 1 || isPaused) return;
    
    const intervalId = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoItems.length);
    }, 4500); // 4.5 seconds for snappy, engaging showcase

    return () => clearInterval(intervalId);
  }, [videoItems.length, isPaused]);

  const activeVideo = videoItems[currentVideoIndex];
  const displayItems = blogs.length > 0 ? blogs : [];

  if (displayItems.length === 0) {
    return null;
  }

  // Duplicate items to ensure a seamless continuous vertical loop
  const marqueeItems = [...displayItems, ...displayItems, ...displayItems, ...displayItems];

  return (
    <section className="bg-[#f8f9fa] py-12 md:py-20 relative font-sans">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-marquee-vertical {
          animation: marquee-vertical 40s linear infinite;
        }
        .group-hover\\/marquee\\:pause:hover {
          animation-play-state: paused;
        }
        `
      }} />

      <div className="w-[95%] 2xl:max-w-400 mx-auto px-4 md:px-8 flex flex-col gap-6 relative z-20">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-2 w-full">
          <Link href="/activity-hub/videos#articles-insights" className="group/title flex flex-col gap-1 inline-block">
            <span className="text-[#00b14f] text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase">
              LATEST UPDATES
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold text-zinc-900 tracking-tight group-hover/title:text-[#00b14f] transition-colors">
              Relux <span className="text-[#00b14f]">Feed</span>
            </h3>
          </Link>
          <Link href="/activity-hub/videos#articles-insights" className="text-[#00b14f] text-[11px] md:text-xs font-bold flex items-center gap-1.5 hover:underline transition-all">
            View All News <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Landscape Layout (2 Columns when backend videos exist, Full Width when articles only) */}
        <div className={`grid grid-cols-1 ${videoItems.length > 0 ? "lg:grid-cols-12" : ""} gap-8 lg:gap-12 items-center lg:items-start overflow-hidden lg:overflow-visible`}>
          
          {/* Left Column: Articles Vertical Marquee */}
          <div className={`${videoItems.length > 0 ? "lg:col-span-8" : "w-full"} w-full flex flex-col`}>
             
             {/* Vertical Marquee Container (White Card) */}
             <div className="relative h-110 sm:h-120 md:h-135 overflow-hidden group/marquee rounded-3xl sm:rounded-4xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                
                {/* Gradient Fades for vertical marquee (White theme) */}
                <div className="absolute top-0 inset-x-0 h-8 sm:h-10 bg-linear-to-b from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-8 sm:h-10 bg-linear-to-t from-white to-transparent z-10 pointer-events-none" />

                <div className="flex flex-col px-4 sm:px-6 md:px-8 py-3 sm:py-4 animate-marquee-vertical group-hover/marquee:pause will-change-transform">
                  {marqueeItems.map((item, idx) => {
                    const itemLink = item.media_link || (item.slug ? `/activity-hub/blogs/${item.slug}` : "/activity-hub/videos#articles-insights");
                    const isExternal = Boolean(item.media_link && item.media_link.startsWith("http"));

                    return (
                      <a
                        key={idx}
                        href={itemLink}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="group/item relative flex items-center gap-3 sm:gap-5 w-full py-3.5 sm:py-5 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer"
                      >
                        {/* Left Thumbnail Image */}
                        <div className="relative w-22 h-16 sm:w-28 sm:h-20 md:w-36 md:h-24 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 bg-gray-100">
                          <img
                            src={getFullImageUrl(item.image)}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700"
                            onError={(e) => {
                              e.currentTarget.src = "/blog/blog_img.webp";
                            }}
                          />
                        </div>

                        {/* Right Text Content */}
                        <div className="flex flex-col justify-center gap-1 sm:gap-1.5 flex-1 min-w-0 pr-1 sm:pr-2">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className="text-[#00b14f] text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-wider truncate">
                              {item.author || "PRESS RELEASE"}
                            </span>
                          </div>

                          <h4 className="text-zinc-900 text-xs sm:text-sm md:text-base font-bold tracking-tight leading-snug line-clamp-2 pr-2 sm:pr-4 group-hover/item:text-[#00b14f] transition-colors">
                            {item.title}
                          </h4>
                        </div>

                        {/* Corner Arrow Icon */}
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-gray-200 justify-center items-center text-gray-400 group-hover/item:text-black group-hover/item:bg-gray-100 transition-colors shrink-0 hidden sm:flex">
                          <FiArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </a>
                    );
                  })}
                </div>
             </div>
          </div>

          {/* Right Column: YouTube Shorts & Instagram Reels Stack (Only rendered when backend has videos) */}
          {videoItems.length > 0 && (
            <div className="lg:col-span-4 w-full flex flex-col items-center justify-center lg:items-end lg:pr-4 py-2 sm:py-0">

               <div 
                 className="relative w-65 sm:w-75 md:w-80 aspect-[9/16] shrink-0 group/video mx-auto lg:mx-0"
                 onMouseEnter={() => setIsPaused(true)}
                 onMouseLeave={() => setIsPaused(false)}
               >

                  {/* Video & Reel Stack Layer */}
                  <div className="absolute inset-0 w-full h-full z-40 pointer-events-auto">
                    {videoItems.map((video, index) => {
                      const isCurrent = currentVideoIndex === index;
                      const isNext = videoItems.length > 1 && (currentVideoIndex + 1) % videoItems.length === index;
                      const isNextNext = videoItems.length > 2 && (currentVideoIndex + 2) % videoItems.length === index;
                      
                      let styles = "opacity-0 z-0 scale-[0.8] translate-x-12 md:translate-x-24 pointer-events-none"; // Hidden videos
                      
                      if (isCurrent) {
                        styles = "opacity-100 z-30 scale-100 translate-x-0 translate-y-0 shadow-[0_20px_50px_rgba(0,0,0,0.4)] ring-1 ring-white/10";
                      } else if (isNext) {
                        styles = "opacity-80 z-20 scale-[0.93] translate-x-2.5 sm:translate-x-6 md:translate-x-8 pointer-events-none shadow-[0_10px_30px_rgba(0,0,0,0.25)]";
                      } else if (isNextNext) {
                        styles = "opacity-40 z-10 scale-[0.86] translate-x-4 sm:translate-x-12 md:translate-x-16 pointer-events-none shadow-[0_5px_20px_rgba(0,0,0,0.2)]";
                      }

                      return (
                        <div
                          key={`${video.type}-${video.id}-${index}`}
                          className={`absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${styles}`}
                        >
                          {/* Interactive click link that goes directly to video source (YouTube/Instagram) to play with sound */}
                          <a
                            href={video.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`absolute inset-0 z-30 cursor-pointer block group/link ${isCurrent ? 'pointer-events-auto' : 'pointer-events-none'}`}
                            aria-label={`Watch ${video.title} on ${video.type === "youtube" ? "YouTube" : "Instagram"}`}
                            title={`Click to watch on ${video.type === "youtube" ? "YouTube" : "Instagram"} with sound`}
                          >
                            {/* Hover overlay hint */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/link:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-30">
                              <div className="px-4 py-2.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-2 shadow-2xl scale-95 group-hover/link:scale-100 transition-transform">
                                <FiPlay className="w-3.5 h-3.5 fill-current text-[#00b14f]" />
                                <span>Watch on {video.type === "youtube" ? "YouTube" : "Instagram"}</span>
                              </div>
                            </div>
                          </a>

                          {video.type === "mp4" ? (
                            <video
                              src={video.embedUrl}
                              autoPlay
                              muted
                              loop
                              playsInline
                              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                            />
                          ) : video.type === "youtube" ? (
                            <iframe
                              src={video.embedUrl}
                              title={video.title || `Relux Electric Shorts ${index}`}
                              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              style={{ border: "none" }}
                            />
                          ) : (
                            <iframe
                              src={video.embedUrl}
                              title={video.title || `Relux Instagram Reel ${index}`}
                              className="absolute inset-0 w-full h-full object-cover bg-black pointer-events-none"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              scrolling="no"
                              style={{ border: "none" }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Floating Navigation Arrows on Hover (Corporate Standard) */}
                  {videoItems.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          prevVideo();
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-50 w-8 h-8 rounded-full bg-black/60 hover:bg-[#00b14f] text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-all duration-300 shadow-xl cursor-pointer hover:scale-110"
                        aria-label="Previous video"
                      >
                        <FiChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          nextVideo();
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-50 w-8 h-8 rounded-full bg-black/60 hover:bg-[#00b14f] text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-all duration-300 shadow-xl cursor-pointer hover:scale-110"
                        aria-label="Next video"
                      >
                        <FiChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
               </div>

               {/* Business Pagination Indicator Pills */}
               {videoItems.length > 1 && (
                 <div className="flex items-center justify-center gap-1.5 mt-3.5 z-30">
                   {videoItems.map((_, dotIdx) => (
                     <button
                       key={dotIdx}
                       type="button"
                       onClick={() => setCurrentVideoIndex(dotIdx)}
                       aria-label={`Go to slide ${dotIdx + 1}`}
                       className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                         currentVideoIndex === dotIdx
                           ? "w-6 bg-[#00b14f]"
                           : "w-2 bg-gray-300 hover:bg-gray-400"
                       }`}
                     />
                   ))}
                 </div>
               )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

