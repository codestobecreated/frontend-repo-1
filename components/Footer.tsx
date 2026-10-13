"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/locations" || pathname.startsWith("/locations/")) {
    return null;
  }

  const isHiddenPanel = ["/admin-panel", "/founder-panel", "/agent-panel"].some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  if (isHiddenPanel) {
    return null;
  }

  if (pathname === "/founder-panel" || pathname.startsWith("/founder-panel/")) {
    return null;
  }

  return (
    <footer className="w-full bg-black text-white border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Floating WhatsApp Widget */}
      <Link
        href="https://wa.me/919884866993"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Relux Electric on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.933 3.659 1.422 5.635 1.423h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </Link>

      {/* Top Accent Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-[#00b14f] to-transparent" />

      {/* Main Full-Width Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14">

          {/* Brand & Socials (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" aria-label="Relux Electric Homepage">
              <Image
                src="/relux-electric-india-logo.svg"
                alt="Relux Electric Logo"
                width={200}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Sustainable charging solutions for a greener future. Leader in high-speed EV charging infrastructure across India.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              {[
                { Icon: FaFacebookF, href: "https://www.facebook.com/reluxelectric", label: "Facebook" },
                { Icon: FaInstagram, href: "https://www.instagram.com/reluxelectric/", label: "Instagram" },
                { Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/reluxelectric/", label: "LinkedIn" },
                { Icon: FaYoutube, href: "https://www.youtube.com/@reluxelectric7550", label: "YouTube" },
                { Icon: FaXTwitter, href: "https://x.com/reluxelectric", label: "X (Twitter)" }
              ].map(({ Icon, href, label }, i) => (
                <Link
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow Relux Electric on ${label}`}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#00b14f] hover:border-[#00b14f] transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">
              Menu
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Locations", href: "/locations" },
                { name: "Blogs", href: "/activity-hub/blogs" },
                { name: "Videos", href: "/activity-hub/videos" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-zinc-400 hover:text-[#00b14f] transition-colors font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Business (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">
              Support &amp; Business
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "FAQ", href: "/faq" },
                { name: "Contact Us", href: "/contact" },
                { name: "Franchise Opportunity", href: "/business/franchise" },
                { name: "Zero Investment Model", href: "/business/zero-investment" },
                { name: "Charger as a Service (CaaS)", href: "/business/caas" },
                // { name: "UBC Protocol", href: "/unified-bharat-echarge" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-zinc-400 hover:text-[#00b14f] transition-colors font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & App Badges (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-1">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <a href="mailto:enquiry@reluxelectric.com" className="flex items-center gap-3 text-zinc-400 hover:text-white text-sm transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#00b14f] group-hover:border-[#00b14f] group-hover:text-white text-[#00b14f] transition-all">
                  <FiMail className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-xs sm:text-sm">enquiry@reluxelectric.com</span>
              </a>
              <a href="tel:+919884866993" className="flex items-center gap-3 text-zinc-400 hover:text-white text-sm transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#00b14f] group-hover:border-[#00b14f] group-hover:text-white text-[#00b14f] transition-all">
                  <FiPhone className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-xs sm:text-sm">+91 9884866993</span>
              </a>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link href="https://apps.apple.com/in/app/relux-electric/id1552174323" target="_blank" rel="noopener noreferrer" aria-label="Download Relux Electric on the App Store" className="hover:opacity-85 transition-opacity">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" width={130} height={38} className="h-8.5 w-auto" />
              </Link>
              <Link href="https://play.google.com/store/apps/details?id=com.namp.relux&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" aria-label="Get Relux Electric on Google Play" className="hover:opacity-85 transition-opacity">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" width={130} height={38} className="h-8.5 w-auto" />
              </Link>
            </div>
          </div>

        </div>

        {/* Google Preferred Source Note Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-center lg:text-left">
            <span className="font-semibold text-zinc-200">Preferred Source on Google Search &amp; AI:</span>
            <span className="text-zinc-400">Add Relux Electric to receive verified EV charging updates, station launches &amp; stories.</span>
            <a
              href="https://www.google.com/preferences/source?q=reluxelectric.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00b14f] hover:text-[#00e365] font-semibold ml-1 inline-flex items-center gap-1 transition-colors"
            >
              <span>Add Source</span>
              <span className="text-[10px]">→</span>
            </a>
          </div>

          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore: google-add-preferred-source-btn is a custom Google attribute */}
          <div google-add-preferred-source-btn="true" data-theme="dark" data-lang="en" />
        </div>



        {/* Copyright & Legal Links Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-500 text-xs font-medium">
          <p>© {new Date().getFullYear()} Relux Electric India. All rights reserved.</p>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-zinc-800">|</span>
            <Link href="/terms-conditions" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-zinc-800">|</span>
            <p>
              Designed &amp; Developed by{" "}
              <a
                href="https://ec4you.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline font-semibold"
              >
                EC4You
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
