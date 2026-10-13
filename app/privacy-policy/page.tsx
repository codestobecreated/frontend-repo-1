import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/app/ui/baceurl";

export const metadata: Metadata = {
  title: "Privacy Policy | Relux Electric India",
  description:
    "Read the Privacy Policy of Relux Electric Private Limited. Understand how we collect, use, disclose, and safeguard your information when you visit our mobile application and EV charging services.",
  keywords: [
    "Relux privacy policy",
    "Relux Electric Private Limited",
    "EV charging privacy policy",
    "Relux charging data protection",
    "privacy terms Relux",
  ],
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | Relux Electric India",
    description:
      "Read the Privacy Policy of Relux Electric Private Limited. Understand how we collect, use, disclose, and safeguard your information when you visit our mobile application and EV charging services.",
    url: `${SITE_URL}/privacy-policy`,
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden selection:bg-[#00b14f] selection:text-black">
      {/* Ambient Electric Green & Dark Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00b14f]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#00b14f]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Subtle Green Accent Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-[#00b14f]/60 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#00b14f] shadow-[0_0_8px_rgba(0,177,79,0.8)]" />
            <span className="text-[#00b14f] text-xs font-bold uppercase tracking-[0.35em]">
              Legal &amp; Privacy
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-4">
            Privacy <span className="text-[#00b14f]">Policy</span>
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 font-mono tracking-wider">
            <span>LAST UPDATED: JUNE 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00b14f]" />
            <span className="text-zinc-300">RELUX ELECTRIC PVT LTD</span>
          </div>
        </div>

        {/* Content Container */}
        <div className="bg-zinc-950/80 border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.95)] backdrop-blur-md space-y-10">

          {/* Section 1 - Introduction */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
              <span className="text-[#00b14f] text-sm font-mono font-bold bg-[#00b14f]/10 border border-[#00b14f]/20 px-2 py-0.5 rounded-md">
                01
              </span>
              Introduction
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-4">
              <strong className="text-white font-semibold">RELUX ELECTRIC PRIVATE LIMITED</strong> (&ldquo;we&rdquo; or &ldquo;us&rdquo; or &ldquo;our&rdquo;) respects the privacy of our users (&ldquo;user&rdquo; or &ldquo;you&rdquo;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our mobile application <strong className="text-[#00b14f] font-semibold">RELUX CHARGING</strong>. Please read this Privacy Policy carefully. <strong className="text-white font-semibold">IF YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, PLEASE DO NOT ACCESS THE APPLICATION.</strong>
            </p>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the &ldquo;Last updated&rdquo; date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the Application after the date such revised Privacy Policy is posted.
            </p>
          </div>

          <div className="w-full h-px bg-white/5" />

          {/* Section 2 - Collection of Information */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
              <span className="text-[#00b14f] text-sm font-mono font-bold bg-[#00b14f]/10 border border-[#00b14f]/20 px-2 py-0.5 rounded-md">
                02
              </span>
              Collection of Your Information
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-5">
              We may collect information about you in a variety of ways. The information we may collect via the Application depends on the content and materials you use, and includes:
            </p>
            <div className="space-y-4">
              <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/10 hover:border-[#00b14f]/40 hover:bg-white/[0.03] transition-all duration-300 group">
                <h3 className="text-white font-semibold text-base mb-1.5 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#00b14f] shadow-[0_0_6px_rgba(0,177,79,0.8)]" />
                  Personal Data
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed pl-4.5">
                  Demographic and other personally identifiable information (such as your name and email address) that you voluntarily give to us when choosing to participate in various activities related to the Application, such as chat, posting messages in comment sections or in our forums, liking posts, sending feedback, and responding to surveys.
                </p>
              </div>

              <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/10 hover:border-[#00b14f]/40 hover:bg-white/[0.03] transition-all duration-300 group">
                <h3 className="text-white font-semibold text-base mb-1.5 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#00b14f] shadow-[0_0_6px_rgba(0,177,79,0.8)]" />
                  Derivative Data
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed pl-4.5">
                  Information our servers automatically collect when you access the Application, such as your native actions that are integral to the Application, including your location, liking as well as other interactions with the Application via server log files.
                </p>
              </div>

              <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/10 hover:border-[#00b14f]/40 hover:bg-white/[0.03] transition-all duration-300 group">
                <h3 className="text-white font-semibold text-base mb-1.5 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#00b14f] shadow-[0_0_6px_rgba(0,177,79,0.8)]" />
                  Geo-Location Information
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed pl-4.5">
                  We may request access or permission to and track location-based information from your mobile device, either continuously or while you are using the Application, to provide location-based services.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-white/5" />

          {/* Section 3 - Use of Your Information */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
              <span className="text-[#00b14f] text-sm font-mono font-bold bg-[#00b14f]/10 border border-[#00b14f]/20 px-2 py-0.5 rounded-md">
                03
              </span>
              Use of Your Information
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to deliver targeted advertising, enable user-to-user communications, fulfill and manage purchases, generate a personal profile, increase the efficiency and operation of the Application, monitor and analyze usage, notify you of updates, process payments and refunds, and respond to product and customer service requests.
            </p>
          </div>

          <div className="w-full h-px bg-white/5" />

          {/* Section 4 - Disclosure of Your Information */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
              <span className="text-[#00b14f] text-sm font-mono font-bold bg-[#00b14f]/10 border border-[#00b14f]/20 px-2 py-0.5 rounded-md">
                04
              </span>
              Disclosure of Your Information
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              We may share information we have collected about you in certain situations. Your information may be disclosed as permitted or required by any applicable law, rule, or regulation, or shared with third parties that perform services for us or on our behalf.
            </p>
          </div>

          <div className="w-full h-px bg-white/5" />

          {/* Section 5 - Security of Your Information */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
              <span className="text-[#00b14f] text-sm font-mono font-bold bg-[#00b14f]/10 border border-[#00b14f]/20 px-2 py-0.5 rounded-md">
                05
              </span>
              Security of Your Information
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
            </p>
          </div>

          <div className="w-full h-px bg-white/5" />

          {/* Section 6 - Policy for Children */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
              <span className="text-[#00b14f] text-sm font-mono font-bold bg-[#00b14f]/10 border border-[#00b14f]/20 px-2 py-0.5 rounded-md">
                06
              </span>
              Policy for Children
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              We do not knowingly solicit information from or market to children under the age of 13.
            </p>
          </div>

          <div className="w-full h-px bg-white/5" />

          {/* Section 7 - Contact Us */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
              <span className="text-[#00b14f] text-sm font-mono font-bold bg-[#00b14f]/10 border border-[#00b14f]/20 px-2 py-0.5 rounded-md">
                07
              </span>
              Contact Us
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-4">
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/10 hover:border-[#00b14f]/30 transition-colors space-y-3 text-sm md:text-base text-zinc-300">
              <p>
                <span className="text-zinc-400 font-medium">Company: </span>
                <strong className="text-white font-semibold">RELUX ELECTRIC PRIVATE LIMITED</strong>
              </p>
              <p>
                <span className="text-zinc-400 font-medium">Email: </span>
                <a
                  href="mailto:enquiry@reluxelectric.com"
                  className="text-[#00b14f] hover:text-[#00e365] font-medium underline underline-offset-4 transition-colors"
                >
                  enquiry@reluxelectric.com
                </a>
              </p>
              <p>
                <span className="text-zinc-400 font-medium">Phone: </span>
                <a
                  href="tel:+919884866993"
                  className="text-[#00b14f] hover:text-[#00e365] font-medium underline underline-offset-4 transition-colors"
                >
                  +91 9884866993
                </a>
              </p>
              <p>
                <span className="text-zinc-400 font-medium">Address: </span>
                <span className="text-zinc-200">No:16/8, PRV Towers, Ground floor, Grand Southern Trunk Rd, Ramapuram, Guindy, Chennai, Tamil Nadu 600032</span>
              </p>
            </div>
          </div>

        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#00b14f] text-sm font-medium transition-colors group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}
