"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiSend, FiX } from "react-icons/fi";
import { BASE_URL } from "@/app/ui/baceurl";
import { STATES as states, CITIES as citiesByState } from "@/app/ui/states-cities";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelTitle: string;
}

const EnquiryModal = ({ isOpen, onClose, modelTitle }: EnquiryModalProps) => {
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

  // Handle escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

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

    // Map frontend fields to backend FranchiseInquiry model fields
    const payload = {
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      state: formData.state,
      investment_capacity: formData.investmentRange,
      franchise_model: modelTitle,
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
        setStatusMessage({ type: "success", text: "YOUR ENQUIRY HAS BEEN SUBMITTED SUCCESSFULLY!" });
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
        setTimeout(() => {
          onClose();
          setStatusMessage(null);
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error("Server Error:", errorData);
        setStatusMessage({ type: "error", text: "FAILED TO SUBMIT ENQUIRY. PLEASE CHECK YOUR INPUTS." });
      }
    } catch (error) {
      console.error("Network Error:", error);
      setStatusMessage({ type: "error", text: "SOMETHING WENT WRONG. PLEASE TRY AGAIN LATER." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center px-4 md:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl bg-[#050505] border border-white/10 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,177,79,0.25)] flex flex-col md:flex-row max-h-[90vh] md:max-h-none font-poppins"
          style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#ea3323] transition-colors"
          >
            <FiX className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Left Panel: Info Card - Hidden on Mobile for better focus */}
          <div className="hidden md:flex md:w-[35%] p-8 md:p-12 bg-linear-to-br from-[#0a1a10] to-[#050505] flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[#00b14f]/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-[#00b14f] tracking-tighter uppercase mb-6 leading-none">
                {modelTitle} <br />
                <span className="text-white">ENQUIRY</span>
              </h2>
              <p className="text-white/70 text-[16px] leading-relaxed mb-10 max-w-xs">
                Join the growing EV revolution! Fill out the form below to become a partner for our <span className="text-[#00b14f] font-black">{modelTitle}</span> model in Relux Electric's franchise network.
              </p>

              <div className="space-y-6">
                {[
                  { icon: FiPhone, val: "+91 98848 66993" },
                  { icon: FiMail, val: "enquiry@reluxelectric.com" },
                  { icon: FiMapPin, val: "Chennai, India" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#00b14f] group-hover:bg-[#00b14f] group-hover:text-white transition-all border border-white/5">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-white/70 text-[11px] md:text-xs font-bold tracking-tight">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Form Area */}
          <div className="w-full md:w-[65%] p-6 md:p-12 bg-black/50 overflow-y-auto">
            {/* Mobile Header */}
            <div className="md:hidden mb-8 pr-8">
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-px bg-[#00b14f]" />
                    <span className="text-[#00b14f] text-[8px] font-black uppercase tracking-[0.3em]">Enquiry</span>
                </div>
                <h2 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter">
                   {modelTitle} <span className="text-[#00b14f]">PARTNER</span>
                </h2>
            </div>

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
              className="space-y-4"
              onSubmit={handleSubmit}
              {...({
                "tool-name": "submit_franchise_enquiry_modal",
                "tool-description": "Submit a quick EV Charging Station Franchise Enquiry"
              } as any)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] text-white/30 font-black tracking-widest pl-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-[10px] font-bold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-white/10 tracking-widest"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] text-white/30 font-black tracking-widest pl-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-[10px] font-bold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-white/10 tracking-widest"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] text-white/30 font-black tracking-widest pl-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-[10px] font-bold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-white/10 tracking-widest"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] text-white/30 font-black tracking-widest pl-1">Select State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-[10px] font-bold tracking-widest focus:outline-none focus:border-[#00b14f] appearance-none cursor-pointer"
                  >
                    <option className="bg-black text-white" value="">Choose State</option>
                    {states.map(state => (
                      <option key={state} className="bg-black text-white" value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] text-white/30 font-black tracking-widest pl-1">Select City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    disabled={!formData.state}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-[10px] font-bold tracking-widest focus:outline-none focus:border-[#00b14f] appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option className="bg-black text-white" value="">Choose City</option>
                    {currentCities.map(city => (
                      <option key={city} className="bg-black text-white" value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] text-white/30 font-black tracking-widest pl-1">Current Business Profile</label>
                  <select
                    name="businessProfile"
                    value={formData.businessProfile}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-[10px] font-bold tracking-widest focus:outline-none focus:border-[#00b14f] appearance-none cursor-pointer"
                  >
                    <option className="bg-black text-white" value="">Select Profile</option>
                    <option className="bg-black text-white" value="ENTREPRENEUR">Entrepreneur</option>
                    <option className="bg-black text-white" value="REAL ESTATE OWNER">Real Estate Owner</option>
                    <option className="bg-black text-white" value="FLEET OPERATOR">Fleet Operator</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] text-white/30 font-black tracking-widest pl-1">Investment Range</label>
                  <select
                    name="investmentRange"
                    value={formData.investmentRange}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-[10px] font-bold tracking-widest focus:outline-none focus:border-[#00b14f] appearance-none cursor-pointer"
                  >
                    <option className="bg-black text-white" value="">Select Range</option>
                    <option className="bg-black text-white" value="10L - 25L">10L - 25L</option>
                    <option className="bg-black text-white" value="25L - 50L">25L - 50L</option>
                    <option className="bg-black text-white" value="50L+">50L+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] text-white/30 font-black tracking-widest pl-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Your message..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-[10px] font-bold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-white/10 tracking-widest resize-none"
                ></textarea>
              </div>

              {/* Mobile Contact Info (Compact) */}
              <div className="md:hidden flex flex-wrap gap-4 py-4 border-t border-white/5 mt-4">
                  <div className="flex items-center gap-2">
                      <FiPhone className="text-[#00b14f] w-3 h-3" />
                      <span className="text-white/40 text-[8px] font-bold">+91 98848 66993</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <FiMail className="text-[#00b14f] w-3 h-3" />
                      <span className="text-white/40 text-[8px] font-bold">enquiry@reluxelectric.com</span>
                  </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00b14f] hover:bg-white hover:text-black text-white font-black py-5 rounded-xl transition-all duration-300 shadow-xl shadow-[#00b14f]/20 flex items-center justify-center gap-3 text-[11px] tracking-[0.2em] mt-4 disabled:opacity-50"
              >
                <span>{loading ? "Submitting..." : "Submit"}</span>
                <FiSend className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EnquiryModal;
