import type { Metadata } from "next";
import LatestUpdateDetailClient from "./LatestUpdateDetailClient";
import { BASE_URL, SITE_URL } from "@/app/ui/baceurl";

export async function generateStaticParams() {
  const paths: { id: string }[] = [
    { id: "art-feat" },
    { id: "up-1" },
    { id: "up-2" },
    { id: "up-3" },
    { id: "up-4" },
    { id: "up-5" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
  ];
  try {
    const res = await fetch(`${BASE_URL}/api/latest-updates/`);
    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.results || [];
      list.forEach((item: any) => {
        if (item.id) {
          paths.push({ id: String(item.id) });
        }
      });
    }
  } catch {
    // Backend offline during static generation
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const canonical = `${SITE_URL}/latest-updates/${id}`;

  return {
    title: `Latest Update | Relux Electric`,
    description: `Official latest update and announcement from Relux Electric.`,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `Latest Update | Relux Electric`,
      url: canonical,
    },
  };
}

export default function LatestUpdatePage() {
  return <LatestUpdateDetailClient />;
}
