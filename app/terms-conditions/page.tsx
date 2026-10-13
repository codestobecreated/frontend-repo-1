import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/app/ui/baceurl";

export const metadata: Metadata = {
  title: "Terms & Conditions | Relux Electric India",
  description:
    "Read the Terms and Conditions of Relux Electric Pvt. Ltd. Understand the legal agreement, user representations, intellectual property, and EV charging service terms.",
  keywords: [
    "Relux terms and conditions",
    "Relux Electric legal agreement",
    "EV charging terms of service",
    "Relux charging terms of use",
  ],
  alternates: {
    canonical: `${SITE_URL}/terms-conditions`,
  },
  openGraph: {
    title: "Terms & Conditions | Relux Electric India",
    description:
      "Read the Terms and Conditions of Relux Electric Pvt. Ltd. Understand the legal agreement, user representations, intellectual property, and EV charging service terms.",
    url: `${SITE_URL}/terms-conditions`,
  },
};

export default function TermsConditions() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden selection:bg-[#00b14f] selection:text-black">
      {/* Ambient Electric Green & Dark Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00b14f]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-[#00b14f]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Subtle Green Accent Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-[#00b14f]/60 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#00b14f] shadow-[0_0_8px_rgba(0,177,79,0.8)]" />
            <span className="text-[#00b14f] text-xs font-bold uppercase tracking-[0.35em]">
              Legal &amp; Terms
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-4">
            Terms &amp; <span className="text-[#00b14f]">Conditions</span>
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 font-mono tracking-wider">
            <span>LAST UPDATED: JUNE 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00b14f]" />
            <span className="text-zinc-300">RELUX ELECTRIC PVT. LTD.</span>
          </div>
        </div>

        {/* Content Container */}
        <div className="bg-zinc-950/80 border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.95)] backdrop-blur-md space-y-10">

          {/* Section 1 - Agreement to Terms */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
              <span className="text-[#00b14f] text-sm font-mono font-bold bg-[#00b14f]/10 border border-[#00b14f]/20 px-2 py-0.5 rounded-md">
                01
              </span>
              Agreement to Terms
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-4">
              These Terms and Conditions constitute a legally binding agreement made between you and <strong className="text-white font-semibold">Relux Electric Pvt. Ltd.</strong> (&ldquo;we,&rdquo; &ldquo;us&rdquo; or &ldquo;our&rdquo;), concerning your access to and use of our mobile application <strong className="text-[#00b14f] font-semibold">RELUX CHARGING</strong>.
            </p>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-4">
              You agree that by accessing the Application, you have read, understood, and agree to be bound by all of these Terms and Conditions.
            </p>
            <div className="p-4 bg-white/[0.03] rounded-xl border border-white/10 text-xs md:text-sm text-zinc-300">
              <strong className="text-white">PLEASE NOTE:</strong> IF YOU DO NOT AGREE WITH ALL OF THESE TERMS AND CONDITIONS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE APPLICATION AND YOU MUST DISCONTINUE USE IMMEDIATELY.
            </div>
          </div>

          <div className="w-full h-px bg-white/5" />

          {/* Section 2 - Intellectual Property Rights */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
              <span className="text-[#00b14f] text-sm font-mono font-bold bg-[#00b14f]/10 border border-[#00b14f]/20 px-2 py-0.5 rounded-md">
                02
              </span>
              Intellectual Property Rights
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              Unless otherwise indicated, the Application is <strong className="text-white font-semibold">Relux Electric Pvt. Ltd.</strong> proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Application and the trademarks, service marks, and logos contained therein are owned or controlled by us and protected by copyright and trademark laws.
            </p>
          </div>

          <div className="w-full h-px bg-white/5" />

          {/* Section 3 - User Representations */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
              <span className="text-[#00b14f] text-sm font-mono font-bold bg-[#00b14f]/10 border border-[#00b14f]/20 px-2 py-0.5 rounded-md">
                03
              </span>
              User Representations
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-4">
              By using the Application, you represent and warrant that:
            </p>
            <ul className="space-y-3 text-zinc-400 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00b14f] shrink-0 shadow-[0_0_6px_rgba(0,177,79,0.8)]" />
                <span>All registration information you submit will be true, accurate, current, and complete.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00b14f] shrink-0 shadow-[0_0_6px_rgba(0,177,79,0.8)]" />
                <span>You have the legal capacity and you agree to comply with these Terms of Use.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00b14f] shrink-0 shadow-[0_0_6px_rgba(0,177,79,0.8)]" />
                <span>You are not under the age of 13.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00b14f] shrink-0 shadow-[0_0_6px_rgba(0,177,79,0.8)]" />
                <span>Your use of the Application will not violate any applicable law or regulation.</span>
              </li>
            </ul>
          </div>

          <div className="w-full h-px bg-white/5" />

          {/* Section 4 - Prohibited Activities */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
              <span className="text-[#00b14f] text-sm font-mono font-bold bg-[#00b14f]/10 border border-[#00b14f]/20 px-2 py-0.5 rounded-md">
                04
              </span>
              Prohibited Activities
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-4">
              You may not access or use the Application for any purpose other than that for which we make the Application available. You agree not to:
            </p>
            <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/10 hover:border-[#00b14f]/40 transition-colors">
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Systematically retrieve data; make any unauthorized use of the Application; use the Application to advertise goods and services; circumvent security features; engage in unauthorized framing; trick or defraud users; engage in automated use of the system; interfere with the Application; or use the Application for any illegal or unauthorized purpose.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-white/5" />

          {/* Section 5 - EV Charging Services */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
              <span className="text-[#00b14f] text-sm font-mono font-bold bg-[#00b14f]/10 border border-[#00b14f]/20 px-2 py-0.5 rounded-md">
                05
              </span>
              Terms and Conditions of Electric Vehicle Charging Services
            </h2>
            <div className="space-y-4">
              <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/10 hover:border-[#00b14f]/40 hover:bg-white/[0.03] transition-all duration-300">
                <h3 className="text-white font-semibold text-base mb-1.5 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#00b14f] shadow-[0_0_6px_rgba(0,177,79,0.8)]" />
                  Service Availability
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed pl-4.5">
                  <strong className="text-zinc-200">Relux Charging</strong> endeavors to provide uninterrupted and reliable charging services. However, the Company cannot guarantee continuous availability due to factors beyond its reasonable control, including power supply disruptions, communication issues with server infrastructure, and force majeure events.
                </p>
              </div>

              <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/10 hover:border-[#00b14f]/40 hover:bg-white/[0.03] transition-all duration-300">
                <h3 className="text-white font-semibold text-base mb-1.5 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#00b14f] shadow-[0_0_6px_rgba(0,177,79,0.8)]" />
                  Limitation of Liability
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed pl-4.5">
                  In no event shall <strong className="text-zinc-200">Relux Charging</strong> be liable for any damages, losses, or expenses arising from service interruptions, including inconvenience, loss of data, loss of business, damage to equipment, or vehicle breakdown.
                </p>
              </div>

              <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/10 hover:border-[#00b14f]/40 hover:bg-white/[0.03] transition-all duration-300">
                <h3 className="text-white font-semibold text-base mb-1.5 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#00b14f] shadow-[0_0_6px_rgba(0,177,79,0.8)]" />
                  Disclaimer of Warranty
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed pl-4.5">
                  The Company disclaims all warranties, express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement.
                </p>
              </div>

              <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/10 hover:border-[#00b14f]/40 hover:bg-white/[0.03] transition-all duration-300">
                <h3 className="text-white font-semibold text-base mb-1.5 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#00b14f] shadow-[0_0_6px_rgba(0,177,79,0.8)]" />
                  Assumption of Risk
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed pl-4.5">
                  By utilizing <strong className="text-zinc-200">Relux Charging&apos;s</strong> services, users acknowledge and accept the inherent risks of occasional downtime and agree to hold the Company harmless from any associated consequences.
                </p>
              </div>

              <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/10 hover:border-[#00b14f]/40 hover:bg-white/[0.03] transition-all duration-300">
                <h3 className="text-white font-semibold text-base mb-1.5 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#00b14f] shadow-[0_0_6px_rgba(0,177,79,0.8)]" />
                  Indemnification
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed pl-4.5">
                  Users agree to indemnify, defend, and hold <strong className="text-zinc-200">Relux Charging</strong> harmless from any claims, damages, losses, and expenses arising from service interruptions, EV failure or errors displayed in EVs during/after using Relux Charging services, user error, or force majeure events.
                </p>
              </div>
            </div>

            <p className="text-zinc-400 text-xs md:text-sm mt-5 italic">
              By using <strong className="text-white">Relux Charging&apos;s</strong> services, users acknowledge that they have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>

          <div className="w-full h-px bg-white/5" />

          {/* Section 6 - Contact Support */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
              <span className="text-[#00b14f] text-sm font-mono font-bold bg-[#00b14f]/10 border border-[#00b14f]/20 px-2 py-0.5 rounded-md">
                06
              </span>
              Contact Us
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-4">
              If you have any questions or require support regarding these Terms &amp; Conditions, please contact us:
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
