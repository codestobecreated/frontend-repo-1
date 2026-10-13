"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiClock,
  FiUser,
  FiArrowRight,
  FiSearch,
  FiGrid,
  FiList,
  FiMail,
  FiDownload,
  FiCalendar,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import { motion } from "framer-motion";
import { BASE_URL } from "@/app/ui/baceurl";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  created_at: string;
  author: string;
  image: string;
  read_time: string;
  tag: string;
  slug: string;
}

type PaginatedResponse<T> = {
  count?: number;
  next?: string | null;
  results?: T[];
};

function getApiItems<T>(data: unknown): T[] {
  if (Array.isArray(data)) {
    return data as T[];
  }

  if (data && typeof data === "object") {
    const paginated = data as PaginatedResponse<T>;
    return Array.isArray(paginated.results) ? paginated.results : [];
  }

  return [];
}

async function fetchAllApiItems<T>(path: string): Promise<T[]> {
  const items: T[] = [];
  let url: string | null = new URL(path, BASE_URL).toString();

  while (url) {
    const currentUrl = url;
    const response: Response = await fetch(currentUrl, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${currentUrl}: ${response.status}`);
    }

    const data = await response.json();
    items.push(...getApiItems<T>(data));
    url =
      data && typeof data === "object" && "next" in data && typeof data.next === "string"
        ? new URL(data.next, BASE_URL).toString()
        : null;
  }

  return items;
}

export default function BlogsPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogs = await fetchAllApiItems<BlogPost>("/api/blogs/");
        setBlogPosts(blogs);
      } catch (error) {
        console.error("Error fetching blogs data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase();
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#00b14f] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs font-black uppercase tracking-widest text-white/40">Loading Knowledge Hub...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white font-[family-name:var(--font-poppins)]">

      {/* Header Section - Relux Elite Style */}
      <section className="relative pt-20 pb-10 bg-gradient-to-b from-[#00b14f10] to-[#080808] border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,#00b14f15,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black text-white leading-[0.95] tracking-tighter uppercase mb-4"
          >
            RELUX ELECTRIC <br />
            <span className="text-[#00b14f]">INSIGHTS.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/40 text-[5px] md:text-xs font-black uppercase tracking-[0.3em] max-w-3xl mx-auto leading-relaxed"
          >
            Expert opinions, technological breakthroughs, and the latest news from the world of sustainable mobility.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/5">
          <div className="flex items-baseline gap-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Latest Stories</h2>
            <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">{blogPosts.length} Posts Available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 items-stretch">
          {blogPosts.map((post, i) => (
            <Link key={i} href={`/activity-hub/blogs/${post.slug || post.id}`} className="group block relative h-full">
              <div className="h-full flex flex-col justify-between bg-gradient-to-br from-white/[0.03] to-transparent rounded-sm p-5 border border-white/5 group-hover:border-[#00b14f]/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,177,79,0.05)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00b14f] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex-1 flex flex-col">
                  <div className="relative aspect-video rounded-sm overflow-hidden mb-6 border border-white/5 bg-zinc-900 shrink-0">
                    <img
                      src={post.image ? (post.image.startsWith('http') ? post.image : `${BASE_URL}${post.image.startsWith('/') ? '' : '/'}${post.image}`) : "/blog/blog_img.webp"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-60 group-hover:opacity-100"
                      onError={(e) => {
                        e.currentTarget.src = "/blog/blog_img.webp";
                      }}
                    />
                    {post.tag && (
                      <div className="absolute top-4 left-4 bg-[#00b14f] text-white text-[8px] font-black px-3 py-1.5 rounded-sm uppercase tracking-widest shadow-lg">
                        {post.tag}
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 w-7 h-7 bg-[#080808] rounded-full flex items-center justify-center text-white text-[11px] font-black border border-white/10 group-hover:bg-[#00b14f] group-hover:border-[#00b14f] transition-all">R</div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-4 text-[10px] font-black text-white/30 uppercase tracking-widest shrink-0">
                    <div className="flex items-center gap-1.5">
                      <FiCalendar className="w-3.5 h-3.5 text-[#00b14f]" />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiClock className="w-3.5 h-3.5 text-[#00b14f]" />
                      <span>8 min read</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiUser className="w-3.5 h-3.5 text-[#00b14f]" />
                      <span className="truncate max-w-[100px]">By {post.author}</span>
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-black text-white group-hover:text-[#00b14f] transition-colors mb-3 uppercase tracking-tighter leading-snug break-words">
                    {post.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-6 line-clamp-2 break-words">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-auto pt-2 flex items-center gap-2 text-[#00b14f] text-[9px] font-black uppercase tracking-[0.3em] group-hover:gap-4 transition-all border-t border-white/5">
                  Explore Article <FiArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-20 flex items-center gap-3">
          <FiChevronLeft className="w-5 h-5 text-white/10 cursor-pointer hover:text-[#00b14f] transition-colors" />
          <button className="w-9 h-9 rounded-sm bg-[#00b14f] text-white font-black text-sm shadow-xl shadow-[#00b14f]/20">1</button>
          <FiChevronRight className="w-5 h-5 text-white/10 cursor-pointer hover:text-[#00b14f] transition-colors" />
        </div>
      </section>
    </main>
  );
}
