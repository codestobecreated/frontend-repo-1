"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
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

export default function HomeUpdates() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchBlogs = async () => {
      try {
        const blogs = await fetchAllApiItems<BlogPost>("/api/blogs/");
        if (Array.isArray(blogs) && blogs.length > 0 && isMounted) {
          setBlogPosts(blogs);
        }
      } catch {
        // Backend unavailable
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  const nextSlide = () => {
    if (blogPosts.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % blogPosts.length);
  };

  const prevSlide = () => {
    if (blogPosts.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
  };

  // Auto-play logic
  useEffect(() => {
    if (blogPosts.length === 0) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, blogPosts.length]);

  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase();
    } catch (e) {
      return dateString;
    }
  };

  if (loading || blogPosts.length === 0) {
    return null;
  }

  return (
    <section 
      className="relative w-full py-12 md:py-32 bg-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header: Title & Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 text-center md:text-left">
              Content <span className="text-[#00b14f]">Hub</span>
            </h2>
            <p className="text-white/40 text-sm md:text-base font-medium text-center md:text-left">
              Stay informed about the EV revolution and Relux milestones.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all active:scale-95"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all active:scale-95"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Sliding Carousel Viewport */}
        <div className="relative overflow-hidden group">
          <div
            className="updates-marquee"
            style={{
              '--translate-mobile': `calc(-${currentIndex} * (85vw + 24px))`,
              '--translate-desktop': `-${currentIndex * (100 / (blogPosts.length || 1))}%`
            } as React.CSSProperties}
          >
            {blogPosts.map((post, i) => {
              const blogSlug = post.slug && post.slug.trim()
                ? post.slug.trim()
                : (post.title
                    ? post.title
                        .toLowerCase()
                        .trim()
                        .replace(/[^\w\s-]/g, "")
                        .replace(/[\s_-]+/g, "-")
                        .replace(/^-+|-+$/g, "")
                    : String(post.id));

              return (
                <div
                  key={i}
                  className={`update-card-container ${i === currentIndex ? 'active' : ''}`}
                >
                  <Link href={`/activity-hub/blogs/${blogSlug}`}>
                    <article
                    className="group flex flex-col bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 hover:border-[#00b14f]/30 transition-all duration-500 h-full cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-16/10 overflow-hidden shrink-0">
                      <img
                        src={post.image ? (post.image.startsWith('http') ? post.image : (post.image.startsWith('/') ? post.image : `/${post.image}`)) : "/blog/blog_img.webp"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = "/blog/blog_img.webp";
                        }}
                      />
                    </div>

                    {/* Content Area */}
                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      {(post.excerpt || post.content) && (
                        <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-2 font-normal">
                          {(post.excerpt || post.content).replace(/<[^>]+>/g, '').trim()}
                        </p>
                      )}

                      <div className="mt-auto pt-2">
                        <div className="flex items-center gap-2 text-[#00b14f] font-bold text-xs uppercase tracking-widest group/link">
                          <span>Read Full Story</span>
                          <FiChevronRight className="transition-transform group-hover/link:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
              );
            })}
          </div>
        </div>

        {/* Mobile-only Navigation Buttons (Bottom Centered) */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-10">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all active:scale-95"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all active:scale-95"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
