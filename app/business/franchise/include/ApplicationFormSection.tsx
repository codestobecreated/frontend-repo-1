"use client";

import React, { useState } from "react";
import { FiPhone, FiMail, FiMapPin, FiSend, FiCheckCircle } from "react-icons/fi";
import { BASE_URL } from "@/app/ui/baceurl";
import { STATES as states, CITIES as citiesByState } from "@/app/ui/states-cities";

export default function ApplicationFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    businessProfile: "",
    investmentRange: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "state") {
      setFormData((prev) => ({ ...prev, state: value, city: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const currentCities = formData.state ? citiesByState[formData.state] || [] : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    const payload = {
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      state: formData.state,
      investment_capacity: formData.investmentRange,
      franchise_model: "Direct Application Form",
      business_profile: formData.businessProfile,
      message: formData.message,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/franchise/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatusMessage({ type: "success", text: "YOUR FRANCHISE APPLICATION HAS BEEN SUBMITTED SUCCESSFULLY!" });
        setFormData({
          name: "",
          email: "",
          phone: "",
          state: "",
          city: "",
          businessProfile: "",
          investmentRange: "",
          message: "",
        });
      } else {
        setStatusMessage({ type: "error", text: "FAILED TO SUBMIT APPLICATION. PLEASE CHECK YOUR INPUTS." });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatusMessage({ type: "error", text: "NETWORK ERROR. PLEASE TRY AGAIN LATER." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="apply-form"
      className="relative w-full py-20 md:py-28 bg-[#050505] overflow-hidden font-poppins border-b border-white/5"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >
      {/* Background Ornament */}
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-[#00b14f]/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-[0_0_90px_rgba(0,177,79,0.15)] grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Contact & Info (5 cols) */}
          <div className="lg:col-span-5 p-8 md:p-12 bg-linear-to-br from-[#0a1a10] via-[#050505] to-black flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="absolute top-0 left-0 w-full h-full bg-[#00b14f]/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-0.5 bg-[#00b14f]" />
                <span className="text-[#00b14f] text-xs font-black uppercase tracking-[0.3em]">
                  Get Started Today
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight">
                HAVE A LOCATION? <br />
                <span className="text-[#00b14f]">APPLY FOR FRANCHISE</span>
              </h2>

              <p className="text-white/60 text-[16px] leading-relaxed font-normal">
                Fill out the application form and our team will prepare a complimentary site feasibility & grid survey report for your location.
              </p>

              {/* Direct Info */}
              <div className="space-y-4 pt-4">
                {[
                  { icon: FiPhone, label: "Franchise Helpline", val: "+91 98848 66993" },
                  { icon: FiMail, label: "Official Email", val: "enquiry@reluxelectric.com" },
                  { icon: FiMapPin, label: "Headquarters", val: "Chennai, Tamil Nadu, India" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-[#00b14f]/10 text-[#00b14f] flex items-center justify-center shrink-0 border border-[#00b14f]/20">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[9px] text-white/40 font-black uppercase tracking-widest">{item.label}</div>
                      <div className="text-white text-xs font-bold">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Highlights */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#00b14f] font-bold">
                <FiCheckCircle className="w-4 h-4" />
                <span>100% Free Site Feasibility Check</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#00b14f] font-bold">
                <FiCheckCircle className="w-4 h-4" />
                <span>Fast Grid Load Sanction Guidance</span>
              </div>
            </div>

          </div>

          {/* Right Column: Form (7 cols) */}
          <div className="lg:col-span-7 p-8 md:p-12">
            
            {statusMessage && (
              <div
                className={`mb-6 p-4 rounded-xl text-center text-xs font-black tracking-widest ${
                  statusMessage.type === "success"
                    ? "bg-[#00b14f]/20 text-[#00b14f] border border-[#00b14f]/30"
                    : "bg-[#ea3323]/20 text-[#ea3323] border border-[#ea3323]/30"
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              {...({
                "tool-name": "submit_franchise_enquiry",
                "tool-description": "Submit an EV Charging Station Franchise Application with Relux Electric"
              } as any)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-white/40 font-black tracking-widest uppercase">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-xs font-bold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-white/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-white/40 font-black tracking-widest uppercase">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter email address"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-xs font-bold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-white/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-white/40 font-black tracking-widest uppercase">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter 10-digit mobile number"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-xs font-bold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-white/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-white/40 font-black tracking-widest uppercase">Business Profile *</label>
                  <select
                    name="businessProfile"
                    value={formData.businessProfile}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-xs font-bold focus:outline-none focus:border-[#00b14f] appearance-none cursor-pointer"
                  >
                    <option className="bg-black text-white" value="">Select Profile</option>
                    <option className="bg-black text-white" value="ENTREPRENEUR">Entrepreneur</option>
                    <option className="bg-black text-white" value="REAL ESTATE OWNER">Real Estate Owner</option>
                    <option className="bg-black text-white" value="FLEET OPERATOR">Fleet Operator</option>
                    <option className="bg-black text-white" value="HOTEL / RESTAURANT OWNER">Hotel / Restaurant Owner</option>
                    <option className="bg-black text-white" value="FUEL PUMP OPERATOR">Fuel Pump Operator</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-white/40 font-black tracking-widest uppercase">Select State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-xs font-bold focus:outline-none focus:border-[#00b14f] appearance-none cursor-pointer"
                  >
                    <option className="bg-black text-white" value="">Choose State</option>
                    {states.map((st) => (
                      <option key={st} className="bg-black text-white" value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-white/40 font-black tracking-widest uppercase">Select City *</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    disabled={!formData.state}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-xs font-bold focus:outline-none focus:border-[#00b14f] appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option className="bg-black text-white" value="">Choose City</option>
                    {currentCities.map((ct) => (
                      <option key={ct} className="bg-black text-white" value={ct}>{ct}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-white/40 font-black tracking-widest uppercase">Investment Range *</label>
                <select
                  name="investmentRange"
                  value={formData.investmentRange}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-xs font-bold focus:outline-none focus:border-[#00b14f] appearance-none cursor-pointer"
                >
                  <option className="bg-black text-white" value="">Choose Investment Capacity</option>
                  <option className="bg-black text-white" value="10L - 25L">₹10 Lakhs - ₹25 Lakhs (AC / 30kW DC)</option>
                  <option className="bg-black text-white" value="25L - 50L">₹25 Lakhs - ₹50 Lakhs (60kW / 120kW DC)</option>
                  <option className="bg-black text-white" value="50L+">₹50 Lakhs+ (Ultra-Fast Hub / Fleet Station)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-white/40 font-black tracking-widest uppercase">Property & Location Details</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell us about your property location (e.g. Highway NH44, plot size, nearby landmarks)..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-xs font-bold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-white/20 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-[#00b14f] hover:bg-[#00e667] text-black font-black uppercase text-xs tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(0,177,79,0.3)] flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
              >
                <span>{loading ? "Submitting Application..." : "Submit Application"}</span>
                <FiSend className="w-4 h-4" />
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
