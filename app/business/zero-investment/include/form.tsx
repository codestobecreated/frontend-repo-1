"use client";

import React from "react";
import { FiPhone, FiMail, FiMapPin, FiUpload, FiSend } from "react-icons/fi";
import { motion } from "framer-motion";
import { BASE_URL } from "@/app/ui/baceurl";
import { STATES as states, CITIES as citiesByState } from "@/app/ui/states-cities";


export default function ZeroForm() {
  const [formData, setFormData] = React.useState({
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
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

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
    <section
      className="relative w-full py-16 md:py-24 bg-black overflow-hidden px-6 font-poppins"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Form - Elite Compact */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="p-10 md:p-14 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] relative shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#00b14f]/30 to-transparent" />
              
              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-[#00b14f]/10 border border-[#00b14f]/20 flex items-center justify-center text-[#00b14f]">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-wider">Inquiry Received!</h3>
                  <p className="text-white/70 text-[16px] leading-relaxed max-w-sm">
                    Thank you for partnering with Relux Electric. Our investment committee will review your site layout and get in touch within 24 hours.
                  </p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="bg-white/5 border border-white/10 hover:border-[#00b14f]/40 hover:bg-[#00b14f]/10 text-white font-bold text-[10px] uppercase tracking-widest px-8 py-3 rounded-xl transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form
                  className="space-y-5"
                  onSubmit={handleSubmit}
                  {...({
                    "tool-name": "submit_zero_investment_enquiry",
                    "tool-description": "Submit a Zero Investment EV Charger Host Application with Relux Electric"
                  } as any)}
                >
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-wider p-4 rounded-xl text-center">
                      {error}
                    </div>
                  )}

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-xs font-bold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-white/20 tracking-widest"
                    />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-xs font-bold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-white/20 tracking-widest"
                    />
                  </div>

                  {/* Row 2: Phone & Address */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-xs font-bold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-white/20 tracking-widest"
                    />
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-xs font-bold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-white/20 tracking-widest"
                    />
                  </div>

                  {/* Row 3: State & City */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <select 
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-xs font-bold tracking-widest focus:outline-none focus:border-[#00b14f] appearance-none cursor-pointer"
                    >
                      <option className="bg-black text-white" value="SELECT STATE">Select State</option>
                      {states.map(state => (
                        <option key={state} className="bg-black text-white" value={state}>{state}</option>
                      ))}
                    </select>
                    <select 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={!formData.state || formData.state === "SELECT STATE"}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-xs font-bold tracking-widest focus:outline-none focus:border-[#00b14f] appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option className="bg-black text-white" value="SELECT CITY">Select City</option>
                      {currentCities.map(city => (
                        <option key={city} className="bg-black text-white" value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Row 4: Land Size */}
                  <div className="grid grid-cols-2 gap-5">
                    <input 
                      type="number" 
                      name="landSize"
                      value={formData.landSize}
                      onChange={handleInputChange}
                      placeholder="Land Size"
                      className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-xs font-bold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-white/20 tracking-widest"
                    />
                    <select 
                      name="landUnit"
                      value={formData.landUnit}
                      onChange={handleInputChange}
                      className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-xs font-bold tracking-widest focus:outline-none focus:border-[#00b14f] appearance-none cursor-pointer"
                    >
                      <option className="bg-black text-white" value="SQ.FT">Sq.Ft</option>
                      <option className="bg-black text-white" value="ACRES">Acres</option>
                    </select>
                  </div>

                  {/* Electricity Connection */}
                  <div className="flex items-center justify-between py-3 px-3 border-y border-white/5">
                    <span className="text-[10px] text-white/30 font-black tracking-widest">Electricity Connection</span>
                    <div className="flex items-center gap-8">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="electricity" 
                          value="YES"
                          checked={formData.electricity === "YES"}
                          onChange={handleInputChange}
                          className="accent-[#00b14f] w-4 h-4" 
                        />
                        <span className="text-white/60 text-[10px] font-bold tracking-widest group-hover:text-[#00b14f] transition-colors">Yes</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="electricity" 
                          value="NO"
                          checked={formData.electricity === "NO"}
                          onChange={handleInputChange}
                          className="accent-[#00b14f] w-4 h-4" 
                        />
                        <span className="text-white/60 text-[10px] font-bold tracking-widest group-hover:text-[#00b14f] transition-colors">No</span>
                      </label>
                    </div>
                  </div>

                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Additional Message"
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-xs font-bold focus:outline-none focus:border-[#00b14f] transition-all placeholder:text-white/20 resize-none tracking-widest"
                  ></textarea>

                  {/* Image Upload Area */}
                  <div className="relative group">
                    <input 
                      type="file" 
                      onChange={handleFileChange}
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    />
                    <div className="w-full bg-white/5 border border-dashed border-white/10 rounded-xl px-6 py-5 flex items-center justify-center gap-4 group-hover:border-[#00b14f]/50 transition-all">
                      <FiUpload className="text-[#00b14f] w-5 h-5" />
                      <span className="text-white/30 font-black text-[10px] tracking-widest">
                        {file ? file.name : "Upload Land Photo (Optional)"}
                      </span>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#00b14f] hover:bg-white hover:text-black text-white font-black py-5 rounded-none transition-all duration-300 shadow-xl shadow-[#00b14f]/20 flex items-center justify-center gap-4 text-xs tracking-[0.2em] disabled:opacity-50"
                  >
                    <span>{loading ? "Submitting..." : "Submit Inquiry"}</span>
                    <FiSend className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right Column: Information Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-[#00b14f]" />
                <span className="text-[#00b14f] text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">Enquiry</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter uppercase mb-6">
                JOIN THE <br />
                <span className="text-[#00b14f]">REVOLUTION.</span>
              </h2>
              <p className="text-white/70 text-[16px] leading-relaxed max-w-md">
                The EV industry is expanding at an unprecedented rate. Secure your position as a location partner 
                and capitalize on the rising demand for premium charging infrastructure.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: FiPhone, label: "CALL US", val: "+91 98848 66993" },
                { icon: FiMail, label: "EMAIL", val: "enquiry@reluxelectric.com" },
                { icon: FiMapPin, label: "VISIT", val: "CHENNAI, INDIA" }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-6 p-5 bg-[#0a0a0a] border border-white/5 hover:border-[#00b14f]/20 transition-all group rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-[#00b14f]/10 flex items-center justify-center text-[#00b14f] group-hover:bg-[#00b14f] group-hover:text-white transition-all">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white/20 text-[9px] font-black uppercase tracking-[0.2em] mb-0.5">{item.label}</h4>
                    <p className="text-white text-xs md:text-sm font-bold tracking-tight">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
