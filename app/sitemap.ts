import type { MetadataRoute } from "next";
import { BASE_URL } from "@/app/ui/baceurl";

export const dynamic = "force-static";

interface BlogPost {
  id?: number | string;
  slug: string;
  created_at?: string;
}

interface Location {
  name: string;
  city: string;
  created_at?: string;
}

function generateLocationSlug(name: string, city: string): string {
  const combined = `${name}-${city}`;
  return combined
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://reluxelectric.com";

  // Static routes configuration
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/locations",
    "/business/franchise",
    "/business/zero-investment",
    "/business/service",
    "/activity-hub",
    "/activity-hub/blogs",
    "/activity-hub/events",
    "/activity-hub/videos",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/business") ? 0.8 : 0.5,
  }));

  // Fetch dynamic blog routes from backend API
  try {
    const blogs = await fetchAllApiItems<BlogPost>("/api/blogs/");
    const blogEntries = blogs.map((blog) => ({
      url: `${baseUrl}/activity-hub/blogs/${blog.slug || blog.id}`,
      lastModified: blog.created_at ? new Date(blog.created_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
    sitemapEntries.push(...blogEntries);
  } catch (error) {
    console.error(
      "Warning: Failed to fetch blogs for sitemap, falling back to static routes only.",
      error
    );
  }



  // Fetch dynamic location routes from backend API
  try {
    const locations = await fetchAllApiItems<Location>("/api/locations/");
    const locationEntries = locations
      .filter((loc) => loc.name && loc.city)
      .map((loc) => ({
        url: `${baseUrl}/locations/${generateLocationSlug(loc.name, loc.city)}`,
        lastModified: loc.created_at ? new Date(loc.created_at) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    sitemapEntries.push(...locationEntries);
  } catch (error) {
    console.error(
      "Warning: Failed to fetch locations for sitemap, falling back to static routes only.",
      error
    );
  }

  return sitemapEntries;
}
