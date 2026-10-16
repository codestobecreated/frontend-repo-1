import type { Metadata } from "next";
import dynamic from "next/dynamic";
import AboutUs from "./include/aboutus";
import WhyChooseUs from "./include/whychoose";
import { SITE_URL } from "@/app/ui/baceurl";

const AboutDeep = dynamic(() => import("./include/about-deep"), {
  loading: () => <div className="min-h-[400px] w-full bg-black" />,
});

const WhyTxt = dynamic(() => import("./include/whytxt"), {
  loading: () => <div className="min-h-[250px] w-full bg-black" />,
});

export const metadata: Metadata = {
  title: "About Relux Electric | India's Leading EV Charging Network",
  description:
    "Learn about Relux Electric, our mission to build India's top EV charging network, and our commitment to reliable electric vehicle mobility solutions.",
  keywords: [
    "about Relux Electric",
    "EV charging network provider",
    "sustainable energy solutions India",
    "Relux EV charging",
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About Relux Electric | India's Leading EV Charging Network",
    description:
      "Learn about Relux Electric, our mission to build India's largest EV charging network, and our commitment to sustainable electric vehicle mobility solutions.",
    url: `${SITE_URL}/about`,
  },
};

export default function About() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about#webpage`,
        "url": `${SITE_URL}/about`,
        "name": "About Relux Electric | India's Leading EV Charging Network",
        "description": "Founded in 2020, Relux Electric is India's leading EV Charging Station Network Provider & Franchise Operator.",
        "publisher": { "@id": `${SITE_URL}/#organization` },
        "mainEntity": { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": "Relux Electric",
        "legalName": "Relux Electric India Private Limited",
        "url": SITE_URL,
        "foundingDate": "2020",
        "logo": `${SITE_URL}/assets/hero_franchise.png`,
        "description": "Founded in 2020, Relux Electric is India's leading EV Charging Station Network Provider & Franchise Operator, delivering fast AC/DC chargers to eliminate range anxiety across India.",
        "telephone": "+91-9884866993",
        "email": "enquiry@reluxelectric.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "No:16/8, PRV Towers, Ground floor, Grand Southern Trunk Rd, Ramapuram, Guindy",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "postalCode": "600032",
          "addressCountry": "IN",
        },
        "sameAs": [
          "https://www.facebook.com/reluxelectric",
          "https://www.instagram.com/reluxelectric/",
          "https://www.linkedin.com/company/relux-electric/",
          "https://www.youtube.com/@reluxelectric7550",
          "https://x.com/reluxelectric",
        ],
        "knowsAbout": [
          "Electric Vehicle Charging Stations",
          "Fast & High-Speed AC/DC Chargers",
          "EV Franchise Opportunities in India",
          "Range Anxiety Relief for EV Owners",
          "OCPP 1.6 Protocol",
          "Zero Investment Partnership Programs",
          "State Agency Infrastructure Deployments (TNGECL, GCC Chennai)",
          "Clean Energy and E-Mobility",
        ],
      },
    ],
  };

  return (
    <main
      className="flex min-h-screen flex-col bg-black font-poppins"
      style={{ fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutUs />
      
      <WhyChooseUs />
      <AboutDeep />
      
      <WhyTxt />
    </main>
  );
}
