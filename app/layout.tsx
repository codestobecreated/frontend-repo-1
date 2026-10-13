import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WebMCPRegistry from "../components/WebMCPRegistry";
import { SITE_URL } from "@/app/ui/baceurl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Relux Electric | EV Charging Station Franchise in India",
  description:
    "Join Relux Electric, India's top EV Charging Station Network. Explore profitable EV franchise opportunities & fast charging infrastructure across India.",
  keywords: [
    "EV Charging Station Network Provider",
    "EV charging station franchise",
    "electric vehicle charging India",
    "Relux EV",
    "low investment EV business",
    "sustainable energy solutions",
    "EV charging franchise",
    "EV charging station franchise in India",
    "electric vehicle charging franchise opportunity",
    "start EV charging station business",
    "EV charging franchise in Tamil Nadu",
    "electric charging station companies",
    "EV charging station companies",
    "electric vehicle charging stations business opportunities",
    "electric vehicle charging station franchise",
    "EV charging installation companies",
    "how to start a charging station business",
    "electric charging station investment",
    "how to start an EV charging business",
    "electric vehicle charging stations investment",
    "how to start an EV charging station business",
    "best EV franchise in India",
    "best EV charging franchise in India",
    "best EV charging station franchise in India",
    "best EV charging station franchise cost in India",
    "EV charging station franchise cost in India",
    "EV charging station franchise cost",
    "best EV manufacturers in India",
    "best EV battery manufacturers in India",
    "best EV charger manufacturers in India",
    "best EV parts manufacturers in India",
    "largest EV manufacturer in India",
    "top 5 EV manufacturers",
    "leading EV companies in India",
    "world’s largest EV manufacturer",
    "top 10 EV manufacturers in India",
    "Unified Bharat e-Charge",
    "UBC EV charging station India",
    "Beckn protocol EV charging"
  ],
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    title: "Relux Electric EV Charging Station Franchise in India",
    description:
      "Start your EV charging station franchise with Relux Electric. Electric car charging station franchise in India with low investment and high-profit potential.",
    url: `${SITE_URL}/`,
    siteName: "Relux Electric",
    images: [
      {
        url: "https://reluxelectric.com/assets/hero_franchise.png",
        width: 1200,
        height: 630,
        alt: "Relux Electric EV Charging Station Franchise in India",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Relux Electric EV Charging Station Franchise in India",
    description:
      "Start your EV charging station franchise with Relux Electric. Electric car charging station franchise in India with low investment and high-profit potential.",
    images: ["https://reluxelectric.com/assets/hero_franchise.png"],
    creator: "@reluxelectric",
    site: "@reluxelectric",
  },
  verification: {
    google: [
      "0FtLFyX0EBjDfEpgcmJ8QguEoC4JFLW0ehPFpeZcYAE",
      "h6a9A3nDnraOLjBk7uSACpv5R_yE9a9IMSx-xzR-xe4",
    ],
  },
  manifest: "/manifest.json",
  other: {
    "apple-mobile-web-app-title": "Relux Electric EV Charging Station Franchise in India",
    "application-name": "Relux Electric EV Charging Station Franchise in India",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased`}
    >
      <head suppressHydrationWarning>
        {/* WebMCP Origin Trial Token */}
        <meta
          httpEquiv="origin-trial"
          content="Ar3e18jUYYlmpRl2ByRmxAw8GiIq2VfXOWcXMYtpnxChtOF6rRe4YaoKfMgjl1XLP0IqrDXU4JjnTLAcBziP0g8AAABkeyJvcmlnaW4iOiJodHRwczovL3JlbHV4ZWxlY3RyaWMuY29tOjQ0MyIsImZlYXR1cmUiOiJXZWJNQ1AiLCJleHBpcnkiOjE3OTQ4NzM2MDAsImlzU3ViZG9tYWluIjp0cnVlfQ=="
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://core.reluxelectric.com" />

        {/* Google Preferred Sources – helps users follow Relux Electric in Google Search / AI Mode */}
        <Script
          async
          src="https://news.google.com/swg/js/v1/publisher.js"
          strategy="afterInteractive"
        />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CDC35ZMGSP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CDC35ZMGSP');
          `}
        </Script>

        {/* Microsoft Clarity - lazyOnload to prevent mobile INP delays */}
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "x7svvu0heh");
          `}
        </Script>

        {/* Facebook Pixel Code */}
        <Script id="facebook-pixel" strategy="lazyOnload">
          {`
            !(function (f, b, e, v, n, t, s) {
              if (f.fbq) return;
              n = f.fbq = function () {
                n.callMethod
                  ? n.callMethod.apply(n, arguments)
                  : n.queue.push(arguments);
              };
              if (!f._fbq) f._fbq = n;
              n.push = n;
              n.loaded = !0;
              n.version = "2.0";
              n.queue = [];
              t = b.createElement(e);
              t.async = !0;
              t.src = v;
              s = b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t, s);
            })(
              window,
              document,
              "script",
              "https://connect.facebook.net/en_US/fbevents.js"
            );
          `}
        </Script>
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col pt-24 bg-black">
        {/* JSON-LD Structured Data Schema */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  "name": "Relux Electric",
                  "alternateName": [
                    "Relux Electric EV Charging Station Franchise",
                    "Relux Electric India"
                  ],
                  "url": SITE_URL,
                  "publisher": { "@id": `${SITE_URL}/#organization` }
                },
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  "name": "Relux Electric",
                  "legalName": "Relux Electric India Private Limited",
                  "url": SITE_URL,
                  "logo": `${SITE_URL}/assets/hero_franchise.png`,
                  "description": "India's leading EV Charging Station Network Provider & Franchise Operator.",
                  "telephone": "+91-9884866993",
                  "email": "enquiry@reluxelectric.com",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "No:16/8, PRV Towers, Ground floor, Grand Southern Trunk Rd, Ramapuram, Guindy",
                    "addressLocality": "Chennai",
                    "addressRegion": "Tamil Nadu",
                    "postalCode": "600032",
                    "addressCountry": "IN"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+91-9884866993",
                    "contactType": "customer service",
                    "areaServed": "IN",
                    "availableLanguage": ["English", "Tamil", "Hindi"]
                  },
                  "sameAs": [
                    "https://www.facebook.com/reluxelectric",
                    "https://www.instagram.com/reluxelectric/",
                    "https://www.linkedin.com/company/relux-electric/",
                    "https://www.youtube.com/@reluxelectric7550",
                    "https://x.com/reluxelectric"
                  ],
                  "knowsAbout": [
                    "Electric Vehicle Charging Infrastructure",
                    "EV Charging Station Franchise",
                    "Fast & High-Speed AC/DC Chargers",
                    "Range Anxiety Relief for EV Owners",
                    "OCPP Charging Protocol",
                    "Unified Bharat e-Charge Protocol (UBC)",
                    "Beckn Protocol EV Charging",
                    "Zero-Investment Partnership Models",
                    "State & Institutional EV Infrastructure Deployments (TNGECL, GCC Chennai)",
                    "Clean Energy & E-Mobility"
                  ]
                }
              ]
            })
          }}
        />
        <WebMCPRegistry />
        <Navbar />
        <main suppressHydrationWarning className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

