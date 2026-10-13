import type { Metadata } from "next";
import HomeHero from "./include/hero";
import HomeNewsMarquee from "./include/news-marquee";
import HomeAbout from "./include/about";
import SimpleABC from "./include/simple-abc";
import HomeCTABanner from "./include/cta-banner";
import HomePartners from "./include/partners";
import HomeBusiness from "./include/business";
import HomeCaaS from "./include/caas";
import HomeUpdates from "./include/updates";
import HomeAppFeature from "./include/app-feature";
import HomeContactCTA from "./include/contact-cta";
import { SITE_URL } from "@/app/ui/baceurl";

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
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
