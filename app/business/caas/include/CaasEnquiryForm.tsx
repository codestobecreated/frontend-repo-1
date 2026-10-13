"use client";

import React, { useState } from "react";
import { FiSend, FiCheckCircle } from "react-icons/fi";
import { BASE_URL } from "@/app/ui/baceurl";
import { STATES as states, CITIES as citiesByState } from "@/app/ui/states-cities";

export default function CaasEnquiryForm() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Charger as a Service (CaaS)");
  const [locationDetails, setLocationDetails] = useState("");
  const [message, setMessage] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
  };

  const currentCities = selectedState ? citiesByState[selectedState] || [] : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !selectedState || !selectedCity) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    const payload = {
      name,
      email: email.toLowerCase(),
      phone,
      state: selectedState,
      city: selectedCity,
      subject: subject,
      message: message ? `Location Details: ${locationDetails}\n\n${message}` : `Location Details: ${locationDetails}`,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setSelectedState("");
        setSelectedCity("");
        setLocationDetails("");
        setMessage("");
      } else {
        const errData = await response.json();
        setError(typeof errData === "string" ? errData : "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="caas-enquiry-form" className="w-full bg-[#15171e] rounded-3xl pt-8 sm:pt-10 px-6 sm:px-8 pb-8 border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#4ade80]/5 blur-[120px] rounded-full pointer-events-none" />
      
      {success ? (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 flex items-center justify-center text-[#4ade80]">
            <FiCheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">CaaS Enquiry Submitted!</h3>
          <p className="text-zinc-400 text-sm max-w-md font-medium leading-relaxed">
            Thank you for your interest in Relux Charger as a Service (CaaS). Our team will evaluate your location and get back to you shortly.
          </p>
          <button 
            onClick={() => setSuccess(false)}
            className="mt-2 bg-white/5 border border-white/10 hover:border-[#4ade80]/40 hover:bg-[#4ade80]/10 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all text-white"
          >
            Submit Another Location
          </button>
        </div>
      ) : (
        <>
          <div className="mt-1 mb-6 pr-12">
            <span className="text-[#4ade80] text-xs font-bold uppercase tracking-widest block mb-1.5">
              Get Started with CaaS
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Tell us about your location
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 font-medium leading-relaxed">
              Fill out the details below to check if your site qualifies for the Charger as a Service (CaaS) model.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold p-3.5 rounded-xl text-center">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Rajesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-[#20232c] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4ade80]/60 transition-colors placeholder:text-zinc-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#20232c] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4ade80]/60 transition-colors placeholder:text-zinc-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <div className="flex">
                  <div className="bg-[#292d38] border-r border-white/5 px-3 py-3 text-xs text-zinc-300 font-medium rounded-l-xl flex items-center justify-center shrink-0">
                    +91
                  </div>
                  <input 
                    type="tel" 
                    placeholder="10 digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-[#20232c] border border-white/5 rounded-r-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4ade80]/60 transition-colors placeholder:text-zinc-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                  Subject <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="w-full bg-[#20232c] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4ade80]/60 transition-colors appearance-none font-medium [&>option]:text-white [&>option]:bg-[#20232c]"
                  >
                    <option value="Charger as a Service (CaaS)">Charger as a Service (CaaS)</option>
                    <option value="Franchise Opportunity">Franchise Opportunity</option>
                    <option value="Land Host Lease">Land Host Lease</option>
                    <option value="Fleet Charging Solutions">Fleet Charging Solutions</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                  State <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select 
                    value={selectedState}
                    onChange={handleStateChange}
                    required
                    className="w-full bg-[#20232c] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4ade80]/60 transition-colors appearance-none font-medium [&>option]:text-white [&>option]:bg-[#20232c]"
                  >
                    <option value="" disabled hidden className="text-zinc-500">Select State</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                     <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                  City <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState}
                    required
                    className="w-full bg-[#20232c] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4ade80]/60 transition-colors appearance-none font-medium disabled:opacity-50 disabled:cursor-not-allowed [&>option]:text-white [&>option]:bg-[#20232c]"
                  >
                    <option value="" disabled hidden className="text-zinc-500">Select City</option>
                    {currentCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                     <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                Location Details / Land Address
              </label>
              <input 
                type="text"
                placeholder="e.g. Highway touch property, Commercial Complex, Petrol Pump, Parking Lot"
                value={locationDetails}
                onChange={(e) => setLocationDetails(e.target.value)}
                className="w-full bg-[#20232c] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4ade80]/60 transition-colors placeholder:text-zinc-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                Additional Comments / Requirements
              </label>
              <textarea 
                placeholder="Tell us more about your land size, power connection, or expected demand..."
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#20232c] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4ade80]/60 transition-colors placeholder:text-zinc-500 font-medium resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#4ade80] hover:bg-[#3ec46d] disabled:opacity-50 text-black font-extrabold text-sm py-4 rounded-xl transition-all active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg shadow-[#4ade80]/20 cursor-pointer"
            >
              {loading ? "Submitting CaaS Enquiry..." : "Submit CaaS Enquiry"}
              <FiSend className="w-4 h-4" />
            </button>
          </form>
        </>
      )}
    </div>
  );
}
