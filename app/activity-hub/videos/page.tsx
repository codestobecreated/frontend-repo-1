"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FiPlay, 
  FiInstagram, 
  FiYoutube, 
  FiHeart, 
  FiPlus, 
  FiShare2, 
  FiChevronRight,
  FiBookOpen,
  FiExternalLink
} from "react-icons/fi";
import { motion } from "framer-motion";
import { BASE_URL } from "@/app/ui/baceurl";

interface VideoItem {
  id: number;
  title: string;
  video_url: string;
  thumbnail: string;
  description: string;
  category: string;
  platform: string;
  created_at: string;
}

interface BlogItem {
  id: number | string;
  title: string;
  slug?: string;
  excerpt?: string;
  image: string;
  category?: string;
  author?: string;
  read_time?: string;
  tag?: string;
  created_at: string;
  media_link?: string;
}

interface VideoHeroSlideItem {
  id: number;
  title: string;
  highlight_text: string;
  subtitle?: string;
  tagline?: string;
  views_count: string;
  description?: string;
  image: string;
  video_url?: string;
  order: number;
  is_active: boolean;
}

const getRelativeTime = (dateString: string) => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return "Today";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  } catch (e) {
    return "Recently";
  }
};

const getFullImageUrl = (path?: string) => {
  if (!path) return "/blog/blog_img.webp";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  
  // Ensure path starts with a slash
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const finalPath = cleanPath.startsWith("/media/") ? cleanPath : `/media${cleanPath}`;
  return `${BASE_URL}${finalPath}`;
};

const getArticleTargetLink = (post: BlogItem) => {
  const rawLink = (post.media_link || "").trim();
  if (rawLink) {
    if (rawLink.startsWith("http://") || rawLink.startsWith("https://")) {
      return { url: rawLink, isExternal: true };
    }
    // If it's a domain/web link like "timesofindia.indiatimes.com/..."
    if (rawLink.includes(".") && !rawLink.startsWith("/")) {
      return { url: `https://${rawLink}`, isExternal: true };
    }
    return { url: rawLink, isExternal: rawLink.startsWith("http") };
  }
  if (post.slug && post.slug.trim()) {
    return { url: `/activity-hub/blogs/${post.slug.trim()}`, isExternal: false };
  }
  if (post.title && post.title.trim()) {
    const slugified = post.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (slugified) return { url: `/activity-hub/blogs/${slugified}`, isExternal: false };
  }
  if (post.id) {
    return { url: `/activity-hub/blogs/${post.id}`, isExternal: false };
  }
  return { url: "/activity-hub/blogs", isExternal: false };
};

const ArticleSection = ({ title, articles }: { title: string, articles: BlogItem[] }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <div id="articles-insights" className="mb-10 md:mb-14 scroll-mt-24 md:scroll-mt-28">
      <div className="flex items-center justify-between mb-4 md:mb-6 px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-3">
          <FiBookOpen className="text-[#00b14f] w-4 h-4 md:w-5 md:h-5" />
          <h2 className="text-base md:text-xl font-black text-white uppercase tracking-tighter">{title}</h2>
        </div>
        <span className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-wider hidden sm:block">
          Press &amp; Publications
        </span>
      </div>

      <div className="flex gap-3 md:gap-5 overflow-x-auto pb-4 px-4 md:px-6 hide-scrollbar scroll-smooth">
        {articles.map((post, idx) => {
          const { url: itemLink, isExternal } = getArticleTargetLink(post);

          const cardContent = (
            <div className="h-full flex flex-col">
              <div className="relative aspect-video rounded-md overflow-hidden mb-3 border border-white/5 bg-zinc-900">
                <img 
                  src={getFullImageUrl(post.image)} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-75 group-hover:opacity-100" 
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/blog/blog_img.webp";
                  }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-[#00b14f] flex items-center justify-center shadow-lg text-white">
                    <FiExternalLink className="w-4 h-4" />
                  </div>
                </div>
                {(post.category || post.tag) && (
                  <div className="absolute top-2 right-2 z-10 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-sm border border-white/10 text-[8px] font-black uppercase tracking-wider text-[#00b14f]">
                    {post.category || post.tag}
                  </div>
                )}
              </div>

              <h3 className="text-white font-bold text-xs md:text-sm group-hover:text-[#00b14f] transition-colors line-clamp-2 mb-1 uppercase tracking-tight leading-snug">
                {post.title}
              </h3>

              <div className="mt-auto pt-2 flex items-center justify-between">
                {post.author ? (
                  <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest truncate">
                    By {post.author}
                  </span>
                ) : (
                  <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">
                    {getRelativeTime(post.created_at)}
                  </span>
                )}
                <span className="flex items-center gap-1 text-[#00b14f] text-[9px] font-bold uppercase tracking-wider group-hover:translate-x-0.5 transition-transform shrink-0">
                  <span>Open</span>
                  <FiExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          );

          return (
            <motion.div 
              key={post.id || idx}
              className="min-w-[72vw] max-w-[260px] md:min-w-[290px] group block cursor-pointer"
              whileHover={{ y: -4 }}
            >
              {isExternal ? (
                <a 
                  href={itemLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block h-full"
                  title={`Open article: ${post.title}`}
                >
                  {cardContent}
                </a>
              ) : (
                <Link 
                  href={itemLink} 
                  className="block h-full"
                  title={`Open article: ${post.title}`}
                >
                  {cardContent}
                </Link>
              )}
            </motion.div>
          );
        })}

        <div className="flex items-center justify-center min-w-[60px] cursor-pointer group">
          <Link 
            href="/activity-hub/blogs" 
            title="View All Blogs"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-[#00b14f] group-hover:text-white group-hover:border-[#00b14f] transition-all"
          >
            <FiChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const VideoSection = ({ title, videos }: { title: string, videos: VideoItem[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const displayedVideos = isExpanded ? videos : videos.slice(0, 4);

  return (
    <div className="mb-10 md:mb-14 px-4 md:px-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2 md:gap-3">
          <FiPlay className="text-[#00b14f] w-4 h-4 fill-current" />
          <h2 className="text-base md:text-xl font-black text-white uppercase tracking-tighter">{title}</h2>
        </div>
        {videos.length > 4 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-[#00b14f] hover:bg-white hover:text-black text-white text-[8px] md:text-[9px] font-black px-3 md:px-4 py-1.5 md:py-2 rounded-sm transition-all uppercase tracking-widest"
          >
            {isExpanded ? "Less" : "More"}
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {displayedVideos.map((video, idx) => (
          <motion.a 
            key={idx}
            href={video.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full"
            whileHover={{ y: -3 }}
            layout
          >
            <div className="relative aspect-video rounded-md overflow-hidden mb-3 border border-white/5 bg-zinc-900">
              <img 
                src={getFullImageUrl(video.thumbnail)} 
                alt={video.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-[#00b14f]/90 flex items-center justify-center shadow-lg">
                  <FiPlay className="w-4 h-4 text-white fill-current" />
                </div>
              </div>
              <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 text-white">
                {video.platform === "Instagram" ? <FiInstagram className="w-3 h-3" /> : <FiYoutube className="w-3 h-3" />}
              </div>
            </div>
            <h3 className="text-white font-bold text-xs md:text-sm group-hover:text-[#00b14f] transition-colors line-clamp-1 mb-0.5 uppercase tracking-tight">{video.title}</h3>
            <div className="flex items-center gap-2 text-white/40 text-[9px] font-bold uppercase tracking-widest">
              <span>{getRelativeTime(video.created_at)}</span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span className="text-[#00b14f]">{video.category}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default function VideoGallery() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [slides, setSlides] = useState<VideoHeroSlideItem[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videosRes, articlesRes, slidesRes] = await Promise.all([
          fetch(`${BASE_URL}/api/videos/`),
          fetch(`${BASE_URL}/api/articles/`),
          fetch(`${BASE_URL}/api/video-hero-slides/`)
        ]);

        if (videosRes.ok) {
          const videoData = await videosRes.json();
          setVideos(videoData);
        }
        if (articlesRes.ok) {
          const articleData = await articlesRes.json();
          const list = Array.isArray(articleData) ? articleData : articleData.results || [];
          setBlogs(Array.isArray(list) ? list : []);
        } else {
          setBlogs([]);
        }
        if (slidesRes.ok) {
          const slidesData = await slidesRes.json();
          setSlides(slidesData);
        }
      } catch (err) {
        console.error("Failed to fetch gallery data:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  // Smooth scroll to anchor hash (e.g. #articles-insights) on load or hashchange
  useEffect(() => {
    const scrollToHash = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const hash = window.location.hash.replace("#", "");
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    if (!loading) {
      scrollToHash();
      const t1 = setTimeout(scrollToHash, 200);
      const t2 = setTimeout(scrollToHash, 600);
      window.addEventListener("hashchange", scrollToHash);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        window.removeEventListener("hashchange", scrollToHash);
      };
    }
  }, [loading]);

  const speechVideos = videos.filter(v => v.category === "Speech" || v.category === "Interview");
  const eventVideos = videos.filter(v => v.category === "Event" || v.category === "Meetup");

  if (loading) {
    return (
      <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#00b14f] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs font-black uppercase tracking-widest text-white/40">Loading Gallery Hub...</p>
        </div>
      </main>
    );
  }

  // Fallback if no slides are present in the database
  const defaultSlide = {
    title: "FUTURE IS",
    highlight_text: "NOW.",
    subtitle: "Innovation",
    tagline: "2 Years ago",
    views_count: "12K Views",
    description: "Relux Electric is redefining how India charges. Experience our technological breakthroughs in ultra-fast charging infrastructure.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
    video_url: "https://www.youtube.com/@reluxelectric"
  };

  const currentSlide = slides.length > 0 ? slides[activeSlide] : defaultSlide;
  const slideImageUrl = currentSlide.image.startsWith("http") ? currentSlide.image : `${BASE_URL}${currentSlide.image.startsWith("/") ? "" : "/"}${currentSlide.image.startsWith("media/") ? "" : "media/"}${currentSlide.image}`;

  return (
    <main className="min-h-screen bg-[#080808] pt-6 md:pt-10 pb-16 overflow-hidden">
      
      {/* Cinematic Hero */}
      <section className="px-3 md:px-6 mb-8 md:mb-12">
        <div className="relative w-full max-w-7xl mx-auto h-[55vw] min-h-[260px] md:h-[450px] rounded-xl overflow-hidden border border-white/10 group">
          
          {/* Animated Background Image */}
          <div className="absolute inset-0 w-full h-full bg-[#0c0c0c]">
            <motion.img 
              key={activeSlide}
              src={slideImageUrl} 
              alt="Featured Spotlight" 
              className="w-full h-full object-cover opacity-50" 
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-4 md:p-12 z-10">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-2xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2 md:mb-3 leading-tight">
                {currentSlide.title} <span className="text-[#00b14f]">{currentSlide.highlight_text}</span>
              </h1>
              <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-5 flex-wrap">
                {currentSlide.tagline && (
                  <span className="text-white/40 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">{currentSlide.tagline}</span>
                )}
                {currentSlide.subtitle && (
                  <span className="bg-[#00b14f] text-white text-[8px] md:text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest">{currentSlide.subtitle}</span>
                )}
                <span className="text-white/40 text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <FiPlay className="w-3 h-3 md:w-3.5 md:h-3.5" /> {currentSlide.views_count}
                </span>
              </div>
              <p className="hidden md:block text-white/50 text-[11px] md:text-xs max-w-lg leading-relaxed mb-6">
                {currentSlide.description}
              </p>
              
              {currentSlide.video_url ? (
                <a 
                  href={currentSlide.video_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 md:gap-3 bg-[#00b14f] hover:bg-white hover:text-black text-white font-black px-4 md:px-6 py-2 md:py-3 rounded-sm transition-all uppercase tracking-[0.15em] md:tracking-[0.2em] w-fit shadow-lg shadow-[#00b14f]/10 text-[9px] md:text-[10px]"
                >
                  <FiPlay className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" /> Play Now
                </a>
              ) : (
                <button className="flex items-center gap-2 md:gap-3 bg-[#00b14f] hover:bg-white hover:text-black text-white font-black px-4 md:px-6 py-2 md:py-3 rounded-sm transition-all uppercase tracking-[0.15em] md:tracking-[0.2em] w-fit shadow-lg shadow-[#00b14f]/10 text-[9px] md:text-[10px]">
                  <FiPlay className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" /> Play Now
                </button>
              )}
            </motion.div>
          </div>

          {/* Next Slide Right Arrow */}
          {slides.length > 1 && (
            <div 
              onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex w-10 h-10 rounded-full bg-white/5 border border-white/10 items-center justify-center text-white/40 hover:bg-[#00b14f] hover:text-white transition-all cursor-pointer z-20"
            >
              <FiChevronRight className="w-6 h-6" />
            </div>
          )}

          {/* Dot Indicators */}
          {slides.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {slides.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === activeSlide ? 'w-8 bg-[#00b14f]' : 'w-3 bg-white/20 hover:bg-white/40'}`} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dynamic Content Sections */}
      <div className="max-w-7xl mx-auto mt-2 md:mt-0">
        <ArticleSection title="ARTICLES & INSIGHTS" articles={blogs} />
        <VideoSection title="Speech & Interview" videos={speechVideos} />
        <VideoSection title="Event & Meetup" videos={eventVideos} />
      </div>

      {/* VideoObject Schema for Google Video Indexing */}
      {videos.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": videos.map((video, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "VideoObject",
                  "name": video.title,
                  "description": video.description || `${video.title} - Relux Electric EV Charging Network Video`,
                  "thumbnailUrl": [getFullImageUrl(video.thumbnail)],
                  "uploadDate": video.created_at ? new Date(video.created_at).toISOString() : new Date().toISOString(),
                  "contentUrl": video.video_url,
                  "embedUrl": video.video_url,
                },
              })),
            }),
          }}
        />
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}
