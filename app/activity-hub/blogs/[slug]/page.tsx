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
    { slug: "why-do-some-ev-charging-projects-fail-while-others-succeed" },
    { slug: "how-to-start-an-ev-charging-station-in-india" },
  ];
}

async function fetchBlogDetail(slug: string): Promise<BlogDetail | null> {
  try {
    const url = new URL(`/api/blogs/${encodeURIComponent(slug)}/`, BASE_URL).toString();
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
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogDetail(slug);
  const title = post?.title || slug.replace(/-/g, " ");
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

