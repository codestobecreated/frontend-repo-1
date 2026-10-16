import BlogDetailClient from "./BlogDetailClient";
import { BASE_URL, SITE_URL } from "@/app/ui/baceurl";
import type { Metadata } from "next";

type BlogDetail = {
  title?: string | null;
  excerpt?: string | null;
  image?: string | null;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const paths: { slug: string }[] = [];
  try {
    const res = await fetch(`${BASE_URL}/api/blogs/`);
    if (res.ok) {
      const data = await res.json();
      const blogs = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
        ? data.results
        : [];
      blogs.forEach((blog: any) => {
        if (blog?.slug && typeof blog.slug === "string" && blog.slug.trim().length > 0) {
          paths.push({ slug: blog.slug.trim() });
        }
        if (blog?.title && typeof blog.title === "string") {
          const titleSlug = blog.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");
          if (titleSlug && titleSlug !== blog?.slug) {
            paths.push({ slug: titleSlug });
          }
        }
        if (blog?.id !== undefined && blog?.id !== null) {
          paths.push({ slug: String(blog.id) });
        }
      });
      if (paths.length > 0) {
        return paths;
      }
    }
  } catch {
    // Fallback when backend is not running during static build
  }

  return [
    { slug: "is-an-ev-charging-station-the-right-investment-for-your-land" },
    { slug: "why-ev-charging-stations-are-the-future-of-india" },
    { slug: "best-ev-charging-station-franchise-in-india" },
    { slug: "how-to-start-an-ev-charging-station-franchise-in-india" },
    { slug: "what-are-the-benefits-of-a-relux-electric-refundable-ev-charging-station-franchise" },
    { slug: "is-an-ev-charging-station-franchise-profitable-in-india" },
    { slug: "why-do-some-ev-charging-projects-fail-while-others-succeed" },
    { slug: "22" },
    { slug: "21" },
    { slug: "1" },
    { slug: "10" },
    { slug: "9" },
    { slug: "8" },
  ];
}

async function fetchBlogDetail(slug: string): Promise<BlogDetail | null> {
  const cleanSlug = decodeURIComponent(slug).trim();
  try {
    const url = new URL(`/api/blogs/${encodeURIComponent(cleanSlug)}/`, BASE_URL).toString();
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      const text = await res.text();
      if (text && text.trim().length > 0) {
        return JSON.parse(text) as BlogDetail;
      }
    }
  } catch {
    // Return null fallback
  }

  // Fallback: search blog list by slug, id, or normalized title
  try {
    const listRes = await fetch(`${BASE_URL}/api/blogs/`, { cache: "no-store" });
    if (listRes.ok) {
      const data = await listRes.json();
      const list = Array.isArray(data) ? data : data?.results || [];
      const normalize = (str: string) =>
        str.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
      const target = normalize(cleanSlug);

      const matched = list.find((b: any) => {
        if (String(b.id) === cleanSlug) return true;
        if (b.slug && (b.slug === cleanSlug || normalize(b.slug) === target)) return true;
        if (b.title && (normalize(b.title) === target || b.title.toLowerCase().trim() === cleanSlug.toLowerCase())) return true;
        return false;
      });
      if (matched) return matched as BlogDetail;
    }
  } catch {
    // Ignore fallback errors
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogDetail(slug);
  const title = post?.title || (isNaN(Number(slug)) ? slug.replace(/-/g, " ") : `EV Charging Insights | Blog #${slug}`);
  const description = post?.excerpt || `${title} | Relux Electric`;
  const canonical = `${SITE_URL}/activity-hub/blogs/${slug}`;
  const image = post?.image
    ? post.image.startsWith("http")
      ? post.image
      : `${BASE_URL}${post.image.startsWith("/") ? "" : "/"}${post.image}`
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogDetailClient params={params} />;
}

