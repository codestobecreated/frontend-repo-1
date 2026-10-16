"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiUser,
  FiShare2,
  FiBookmark,
  FiCheck,
  FiInfo,
  FiList,
  FiZap,
  FiChevronRight
} from "react-icons/fi";
import { BASE_URL } from "@/app/ui/baceurl";

interface Subtopic {
  id?: number;
  order: number;
  title: string;
  content: string;
  pro_tip?: string | null;
}

interface BlogDetail {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  image?: string | null;
  category?: string | null;
  category_name?: string | null;
  author?: string | null;
  tag?: string | null;
  created_at: string;
  subtopics?: Subtopic[];
}

export default function BlogDetailClient({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  const [post, setPost] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchPost = async () => {
      try {
        setLoading(true);
        const cleanSlug = decodeURIComponent(slug).trim();

        // 1. Try direct fetch by slug or ID
        try {
          const res = await fetch(`${BASE_URL}/api/blogs/${encodeURIComponent(cleanSlug)}/`, {
            cache: "no-store",
          });
          if (res.ok) {
            const text = await res.text();
            if (text && text.trim().length > 0) {
              const data = JSON.parse(text);
              if (data && data.title && isMounted) {
                setPost(data);
                return;
              }
            }
          }
        } catch {
          // Fall through to list lookup
        }

        // 2. Fallback: Search all blogs from backend API by slug, title, or ID
        try {
          const listRes = await fetch(`${BASE_URL}/api/blogs/`, { cache: "no-store" });
          if (listRes.ok) {
            const listData = await listRes.json();
            const list = Array.isArray(listData) ? listData : listData.results || [];
            
            const normalize = (str: string) =>
              str.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");

            const targetNorm = normalize(cleanSlug);

            const matched = list.find((b: any) => {
              if (String(b.id) === cleanSlug) return true;
              if (b.slug && (b.slug === cleanSlug || normalize(b.slug) === targetNorm)) return true;
              if (b.title && (normalize(b.title) === targetNorm || b.title.toLowerCase().trim() === cleanSlug.toLowerCase())) return true;
              return false;
            });

            if (matched && isMounted) {
              // Try fetching full detail using matched.slug if available
              if (matched.slug) {
                try {
                  const detailRes = await fetch(`${BASE_URL}/api/blogs/${encodeURIComponent(matched.slug)}/`, { cache: "no-store" });
                  if (detailRes.ok) {
                    const detailData = await detailRes.json();
                    if (detailData && detailData.title && isMounted) {
                      setPost(detailData);
                      return;
                    }
                  }
                } catch {
                  // Use matched item directly
                }
              }
              setPost(matched);
              return;
            }
          }
        } catch {
          // Backend offline
        }
      } catch (err) {
        console.error("Failed to fetch blog post:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchPost();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
    } catch (e) {
      return dateString;
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#00b14f] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Blog Details...</p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col items-center justify-center pt-32 pb-20">
        <h1 className="text-2xl font-black uppercase tracking-widest text-slate-400 mb-6">Blog Post Not Found</h1>
        <Link href="/activity-hub/blogs" className="text-[#00b14f] hover:underline uppercase text-xs font-black tracking-widest flex items-center gap-2">
          <FiArrowLeft /> Back to Blogs
        </Link>
      </main>
    );
  }

  const imageUrl = post.image
    ? (post.image.startsWith("http") ? post.image : `${BASE_URL}${post.image.startsWith("/") ? "" : "/"}${post.image}`)
    : "/blog/blog_img.webp";
  const subtopics = post.subtopics && post.subtopics.length > 0 ? post.subtopics : [];

  // Fallback category tags
  const tagsList = post.tag ? post.tag.split(",").map(t => t.trim()) : [post.category || "EV Charging", "Business", "Infrastructure"];

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 pt-28 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/activity-hub/blogs"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#00b14f] transition-colors group"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blogs
          </Link>
        </div>

        {/* Top Hero Banner Graphic (Like Reference Image Header) */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white shadow-xl mb-8 p-6 md:p-10 border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b14f]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight break-words">
                Latest Insights & Industry Guides
              </h2>
              <p className="text-slate-300 text-xs md:text-sm font-medium tracking-wide">
                Insights • Strategy • Technology • Franchise • Sustainability
              </p>
            </div>

            <div className="w-full md:w-56 h-36 md:h-36 rounded-xl overflow-hidden shadow-lg border border-white/10 flex-shrink-0">
              <img
                src={imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/blog/blog_img.webp";
                }}
              />
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {tagsList.map((tag, idx) => (
            <span
              key={idx}
              className="px-4 py-1.5 bg-[#00b14f]/10 text-[#00b14f] border border-[#00b14f]/30 rounded-full text-xs font-semibold tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Main Blog Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6 break-words">
          {post.title}
        </h1>

        {/* Article Meta Bar */}
        {post.author && (
          <div className="flex flex-wrap items-center gap-6 text-slate-500 text-xs font-semibold mb-8 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <FiUser className="w-4 h-4 text-[#00b14f]" />
              <span>By {post.author}</span>
            </div>
          </div>
        )}

        {/* Excerpt / Callout Box */}
        {post.excerpt && (
          <div className="bg-[#e6f7f0] border-l-4 border-[#00b14f] rounded-r-2xl p-6 md:p-7 mb-10 shadow-sm">
            <p className="text-slate-800 text-sm md:text-base leading-relaxed font-medium break-words">
              {post.excerpt}
            </p>
          </div>
        )}

        {/* Main Content Intro HTML (if any content exists before subtopics) */}
        {post.content && (
          <div
            className="prose prose-slate max-w-none text-slate-700 text-sm md:text-base leading-relaxed mb-10 break-words"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}

        {/* "Topics Covered In This Blog" (Table of Contents Box) */}
        {subtopics.length > 0 && (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm mb-12">
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
              <FiList className="w-5 h-5 text-[#00b14f]" />
              <h3 className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
                Topics Covered In This Blog
              </h3>
            </div>

            <ul className="space-y-3">
              {subtopics.map((sub, index) => (
                <li key={sub.id || index}>
                  <button
                    onClick={() => scrollToSection(`subtopic-${sub.order || index + 1}`)}
                    className="flex items-start gap-3 text-left text-slate-700 hover:text-[#00b14f] transition-colors group text-sm md:text-base font-medium"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00b14f] flex-shrink-0 mt-2 group-hover:scale-125 transition-transform" />
                    <span className="group-hover:underline break-words">
                      {sub.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Subtopic Sections (Numbered Cards 1, 2, 3, 4...) */}
        {subtopics.length > 0 && (
          <div className="space-y-8 mb-12">
            {subtopics.map((sub, index) => {
              const itemNum = sub.order || index + 1;
              return (
                <section
                  key={sub.id || index}
                  id={`subtopic-${itemNum}`}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Number Badge + Subtopic Title */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#00b14f] text-white font-black text-base flex items-center justify-center flex-shrink-0 shadow-md">
                      {itemNum}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-snug pt-1 break-words">
                      {sub.title}
                    </h2>
                  </div>

                  {/* Subtopic Paragraph Content */}
                  <div
                    className="prose prose-slate max-w-none text-slate-700 text-sm md:text-base leading-relaxed space-y-4 mb-6 break-words"
                    dangerouslySetInnerHTML={{ __html: sub.content }}
                  />

                  {/* Pro Tip Callout Box */}
                  {sub.pro_tip && (
                    <div className="bg-[#f0fdf4] border-l-4 border-[#00b14f] rounded-r-xl p-4 md:p-5 flex items-start gap-3">
                      <FiInfo className="w-5 h-5 text-[#00b14f] flex-shrink-0 mt-0.5" />
                      <div className="text-slate-800 text-xs md:text-sm font-medium leading-relaxed break-words">
                        <span className="font-bold text-[#00b14f] uppercase tracking-wider block mb-1">
                          Pro Tip:
                        </span>
                        {sub.pro_tip.replace(/^pro tip:\s*/i, "")}
                      </div>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}

        {/* Conclusion Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm mb-12">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-3">
            Your EV Charging Business Deserves a Partner Who Shows Up Every Single Day
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
            At Relux Electric, we build reliable, high-uptime charging hubs with turnkey execution, smart CMS software, and full operational support across India.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00b14f] hover:bg-[#009643] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-105"
          >
            Start Your Franchise Today <FiChevronRight />
          </Link>
        </div>

        {/* Footer Bar / Share & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200">
          <Link
            href="/activity-hub/blogs"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-[#00b14f] transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to All Blogs
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-[#00b14f] hover:text-white text-slate-700 rounded-lg text-xs font-bold transition-all border border-slate-200"
            >
              {copied ? <FiCheck className="w-4 h-4 text-emerald-600 hover:text-white" /> : <FiShare2 className="w-4 h-4" />}
              {copied ? "Link Copied!" : "Share Article"}
            </button>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2.5 rounded-lg border text-xs transition-all ${bookmarked
                ? "bg-[#00b14f] text-white border-[#00b14f]"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                }`}
            >
              <FiBookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
