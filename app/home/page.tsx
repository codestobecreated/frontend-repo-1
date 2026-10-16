import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HomeHero from "./include/hero";
import { SITE_URL } from "@/app/ui/baceurl";

// Keep top sections fast and immediately available
const HomeNewsMarquee = dynamic(() => import("./include/news-marquee"), {
  loading: () => <div className="min-h-[400px] w-full bg-white" />,
});

const HomeCaaS = dynamic(() => import("./include/caas"), {
  loading: () => <div className="min-h-[140px] w-full bg-[#f8f9fa]" />,
});

// Lazy-load below-the-fold sections to drastically reduce initial bundle size and load time
const HomeAbout = dynamic(() => import("./include/about"), {
  loading: () => <div className="min-h-[450px] w-full bg-[#050505]" />,
});

const HomeCTABanner = dynamic(() => import("./include/cta-banner"), {
  loading: () => <div className="min-h-[350px] w-full bg-black" />,
});

const HomePartners = dynamic(() => import("./include/partners"), {
  loading: () => <div className="min-h-[150px] w-full bg-black" />,
});

const HomeBusiness = dynamic(() => import("./include/business"), {
  loading: () => <div className="min-h-[450px] w-full bg-white" />,
});

const HomeUpdates = dynamic(() => import("./include/updates"), {
  loading: () => <div className="min-h-[400px] w-full bg-black" />,
});

const SimpleABC = dynamic(() => import("./include/simple-abc"), {
  loading: () => <div className="min-h-[300px] w-full bg-white" />,
});

const HomeAppFeature = dynamic(() => import("./include/app-feature"), {
  loading: () => <div className="min-h-[350px] w-full bg-[#222222]" />,
});

const HomeContactCTA = dynamic(() => import("./include/contact-cta"), {
  loading: () => <div className="min-h-[250px] w-full bg-black" />,
});

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

export default function Home() {
  return (
    <div
      className="flex min-h-screen flex-col bg-black font-poppins"
      style={{ fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
    >
      <HomeHero />
      <HomeNewsMarquee />
      <HomeCaaS />
      <HomeAbout />
      <HomeCTABanner />
      <HomePartners />
      <HomeBusiness />
      <HomeUpdates />
      <SimpleABC />
      <HomeAppFeature />
      <HomeContactCTA />
    </div>
  );
}
