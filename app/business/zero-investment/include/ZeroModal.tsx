"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiPhone, FiMail, FiMapPin, FiSend, FiUpload } from "react-icons/fi";
import { BASE_URL } from "@/app/ui/baceurl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { STATES as states, CITIES as citiesByState } from "@/app/ui/states-cities";


interface ZeroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ZeroModal = ({ isOpen, onClose }: ZeroModalProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    state: "SELECT STATE",
    city: "SELECT CITY",
    landSize: "",
    landUnit: "SQ.FT",
    electricity: "YES",
    message: ""
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Handle escape key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Sync URL status with state!
  const showSuccess = success || searchParams.get("status") === "success";

  // Handle direct success URL navigation timeout
  useEffect(() => {
    if (searchParams.get("status") === "success" && !success) {
      const timer = setTimeout(() => {
        router.push(pathname, { scroll: false });
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, success, router, pathname, onClose]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "state") {
      setFormData(prev => ({
        ...prev,
        state: value,
        city: "SELECT CITY"
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const currentCities = formData.state && formData.state !== "SELECT STATE" ? citiesByState[formData.state] || [] : [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      setError("Please fill out Name, Email, and Phone Number.");
      return;
    }
    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("full_name", formData.fullName);
    data.append("email", formData.email.toLowerCase());
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("state", formData.state === "SELECT STATE" ? "" : formData.state);
    data.append("city", formData.city === "SELECT CITY" ? "" : formData.city);
    data.append("land_size", formData.landSize);
    data.append("land_unit", formData.landUnit);
    data.append("electricity_connection", formData.electricity);
    data.append("message", formData.message);
    if (file) {
      data.append("land_photo", file);
    }

    try {
      const response = await fetch(`${BASE_URL}/api/zero-investment/`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          state: "SELECT STATE",
          city: "SELECT CITY",
          landSize: "",
          landUnit: "SQ.FT",
          electricity: "YES",
          message: ""
        });
        setFile(null);
        router.push(`${pathname}?status=success`, { scroll: false });
        setTimeout(() => {
          router.push(pathname, { scroll: false });
          onClose();
          setSuccess(false);
        }, 3000);
      } else {
        const errData = await response.json();
        setError(JSON.stringify(errData) || "Something went wrong.");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
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
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl bg-[#080808] border border-white/10 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,177,79,0.25)] flex flex-col md:flex-row max-h-[90vh] md:max-h-none font-poppins"
          style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 md:top-5 md:right-5 z-50 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#ea3323] transition-colors"
          >
            <FiX className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Left Panel: Information Section - Hidden on Mobile */}
          <div className="hidden md:flex md:w-[38%] p-8 md:p-10 bg-linear-to-br from-[#0a1a10] to-[#080808] flex-col justify-center relative overflow-hidden border-r border-white/5">
            <div className="absolute top-0 left-0 w-full h-full bg-[#00b14f]/5 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-[2px] bg-[#00b14f]" />
                <span className="text-[#00b14f] text-xs font-black uppercase tracking-[0.3em] bg-[#00b14f]/10 px-3 py-1 rounded-sm border border-[#00b14f]/30">Inquiry</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-[0.95] tracking-tighter uppercase mb-6">
                LOCATION <br />
                <span className="text-[#00b14f]">PARTNER.</span>
              </h2>
              <p className="text-zinc-200 text-sm md:text-base leading-relaxed mb-10 max-w-64 font-normal">
                The EV industry is expanding at an unprecedented rate. Secure your position as a location partner.
              </p>

              <div className="space-y-4">
                {[
                  { icon: FiPhone, label: "CALL US", val: "+91 98848 66993" },
                  { icon: FiMail, label: "EMAIL", val: "enquiry@reluxelectric.com" },
                  { icon: FiMapPin, label: "VISIT", val: "CHENNAI, INDIA" }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-5 p-4 bg-white/[0.07] border border-white/10 hover:border-[#00b14f]/40 transition-all group rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-[#00b14f]/15 flex items-center justify-center text-[#00b14f] group-hover:bg-[#00b14f] group-hover:text-black transition-all shrink-0 border border-[#00b14f]/30">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-zinc-400 text-[10px] font-black uppercase tracking-wider mb-0.5">{item.label}</h4>
                      <p className="text-white text-xs md:text-sm font-bold tracking-tight truncate">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Form Section */}
          <div className="w-full md:w-[62%] p-6 md:p-12 bg-black/40 overflow-y-auto">
            {/* Mobile Header */}
            <div className="md:hidden pr-8 mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-px bg-[#00b14f]" />
                    <span className="text-[#00b14f] text-[8px] font-black uppercase tracking-[0.3em]">Partner Inquiry</span>
                </div>
                <h2 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter">
                   LOCATION <span className="text-[#00b14f]">PARTNER</span>
                </h2>
            </div>

            {showSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 md:py-16 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#00b14f]/10 border border-[#00b14f]/20 flex items-center justify-center text-[#00b14f]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-wider">Inquiry Received!</h3>
                <p className="text-white/40 text-[10px] max-w-xs leading-relaxed">
                  Thank you for partnering with Relux Electric. Our investment committee will review your site layout and get in touch within 24 hours.
                </p>
              </motion.div>

            ) : (
              <form
                className="space-y-4"
                onSubmit={handleSubmit}
                {...({
                  "tool-name": "submit_zero_investment_modal",
                  "tool-description": "Submit a quick Zero Investment EV Charger Host Application"
                } as any)}
              >
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-bold uppercase tracking-wider p-3 rounded-xl text-center">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="FULL NAME *"
                    required
                    className="w-full bg-[#141414] border border-white/20 rounded-xl px-5 py-4 text-white text-xs md:text-sm font-semibold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-zinc-500 uppercase tracking-wider"
                  />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="EMAIL ADDRESS *"
                    required
                    className="w-full bg-[#141414] border border-white/20 rounded-xl px-5 py-4 text-white text-xs md:text-sm font-semibold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-zinc-500 tracking-wider"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="PHONE NUMBER *"
                    required
                    className="w-full bg-[#141414] border border-white/20 rounded-xl px-5 py-4 text-white text-xs md:text-sm font-semibold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-zinc-500 uppercase tracking-wider"
                  />
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="PROPERTY ADDRESS"
                    className="w-full bg-[#141414] border border-white/20 rounded-xl px-5 py-4 text-white text-xs md:text-sm font-semibold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-zinc-500 uppercase tracking-wider"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select 
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-[#141414] border border-white/20 rounded-xl px-5 py-4 text-white text-xs md:text-sm font-semibold uppercase tracking-wider focus:outline-none focus:border-[#00b14f] appearance-none cursor-pointer"
                  >
                    <option className="bg-[#141414] text-white" value="SELECT STATE">SELECT STATE</option>
                    {states.map((s) => (
                      <option key={s} className="bg-[#141414] text-white" value={s}>{s.toUpperCase()}</option>
                    ))}
                  </select>
                  <select 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={formData.state === "SELECT STATE"}
                    className="w-full bg-[#141414] border border-white/20 rounded-xl px-5 py-4 text-white text-xs md:text-sm font-semibold uppercase tracking-wider focus:outline-none focus:border-[#00b14f] appearance-none cursor-pointer disabled:opacity-40"
                  >
                    <option className="bg-[#141414] text-white" value="SELECT CITY">SELECT CITY</option>
                    {currentCities.map((c) => (
                      <option key={c} className="bg-[#141414] text-white" value={c}>{c.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="number" 
                    name="landSize"
                    value={formData.landSize}
                    onChange={handleInputChange}
                    placeholder="LAND SIZE"
                    className="bg-[#141414] border border-white/20 rounded-xl px-5 py-4 text-white text-xs md:text-sm font-semibold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-zinc-500 uppercase tracking-wider"
                  />
                  <select 
                    name="landUnit"
                    value={formData.landUnit}
                    onChange={handleInputChange}
                    className="bg-[#141414] border border-white/20 rounded-xl px-5 py-4 text-white text-xs md:text-sm font-semibold uppercase tracking-wider focus:outline-none focus:border-[#00b14f] appearance-none cursor-pointer"
                  >
                    <option className="bg-[#141414] text-white" value="SQ.FT">SQ.FT</option>
                    <option className="bg-[#141414] text-white" value="ACRES">ACRES</option>
                  </select>
                </div>

                <div className="flex items-center justify-between py-3.5 px-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="text-xs text-zinc-300 uppercase font-black tracking-wider">Electricity Connection</span>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="electricity" 
                        value="YES"
                        checked={formData.electricity === "YES"}
                        onChange={handleInputChange}
                        className="accent-[#00b14f] w-4 h-4 cursor-pointer" 
                      />
                      <span className="text-white text-xs font-bold uppercase tracking-wider group-hover:text-[#00b14f] transition-colors">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="electricity" 
                        value="NO"
                        checked={formData.electricity === "NO"}
                        onChange={handleInputChange}
                        className="accent-[#00b14f] w-4 h-4 cursor-pointer" 
                      />
                      <span className="text-white text-xs font-bold uppercase tracking-wider group-hover:text-[#00b14f] transition-colors">No</span>
                    </label>
                  </div>
                </div>

                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="ADDITIONAL MESSAGE (OPTIONAL)"
                  rows={2}
                  className="w-full bg-[#141414] border border-white/20 rounded-xl px-5 py-4 text-white text-xs md:text-sm font-semibold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-zinc-500 resize-none uppercase tracking-wider"
                ></textarea>

                <div className="relative group">
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  />
                  <div className="w-full bg-[#141414] border border-dashed border-white/20 rounded-xl px-5 py-4 flex items-center justify-center gap-3 group-hover:border-[#00b14f] transition-all cursor-pointer">
                    <FiUpload className="text-[#00b14f] w-4 h-4" />
                    <span className="text-zinc-200 font-bold text-xs uppercase tracking-wider">
                      {file ? file.name : "Upload Land Photo (Optional)"}
                    </span>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#00b14f] hover:bg-white hover:text-black text-white font-black py-4.5 rounded-sm transition-all duration-300 shadow-xl shadow-[#00b14f]/30 flex items-center justify-center gap-3 text-xs md:text-sm uppercase tracking-[0.2em] group disabled:opacity-50 cursor-pointer"
                >
                  <span>{loading ? "SUBMITTING..." : "Submit Inquiry"}</span>
                  <FiSend className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Mobile Contact Info */}
                <div className="md:hidden grid grid-cols-2 gap-4 py-4 border-t border-white/10 mt-6">
                    <div className="flex items-center gap-2">
                        <FiPhone className="text-[#00b14f] w-3.5 h-3.5" />
                        <span className="text-zinc-300 text-[10px] font-bold">+91 98848 66993</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiMail className="text-[#00b14f] w-3.5 h-3.5" />
                        <span className="text-zinc-300 text-[10px] font-bold">enquiry@reluxelectric.com</span>
                    </div>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ZeroModal;
