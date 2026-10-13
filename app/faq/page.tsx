import type { Metadata } from "next";
import { SITE_URL } from "@/app/ui/baceurl";
import FaqClient from "@/app/faq/include/FaqClient";
import { ALL_FAQS } from "@/app/faq/include/faqData";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | Relux Electric EV Charging",
  description:
    "Find answers to common questions about Relux Electric EV charging station franchise opportunities, investment, installation, pricing, driver app, and technical support.",
  keywords: [
    "EV charging FAQ",
    "Relux Electric FAQ",
    "EV franchise questions",
    "EV charging station cost FAQ India",
    "electric car charger help",
    "EV charging business returns",
  ],
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
  openGraph: {
    title: "Frequently Asked Questions (FAQ) | Relux Electric EV Charging",
    description:
      "Find answers to common questions about Relux Electric EV charging station franchise opportunities, investment, installation, and technical support.",
    url: `${SITE_URL}/faq`,
  },
};

export default function FaqPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/faq#webpage`,
        "url": `${SITE_URL}/faq`,
        "name": "Frequently Asked Questions (FAQ) | Relux Electric EV Charging",
        "description": "Find answers to common questions about Relux Electric EV charging station franchise opportunities, investment, installation, pricing, driver app, and technical support.",
        "publisher": { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/faq#faq`,
        "mainEntity": ALL_FAQS.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="bg-black min-h-screen font-sans text-white selection:bg-[#00b14f] selection:text-black pt-4">
      {/* Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <FaqClient />
    </main>
  );
}
