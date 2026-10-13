"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FiPhone, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { BASE_URL } from "@/app/ui/baceurl";
import { STATES as states, CITIES as citiesByState } from "@/app/ui/states-cities";


export default function ContactForm() {
  const searchParams = useSearchParams();
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Charger as a Service (CaaS)");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const paramSubject = searchParams.get("subject");
    if (paramSubject) {
      if (paramSubject.toLowerCase().includes("caas") || paramSubject.toLowerCase().includes("charger as a service")) {
        setSubject("Charger as a Service (CaaS)");
      } else {
        setSubject(paramSubject);
      }
    }
  }, [searchParams]);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
  };

  const currentCities = selectedState ? citiesByState[selectedState] || [] : [];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !selectedState || !selectedCity || !message) {
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
      subject: subject || "General Inquiry",
      message,
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
        // Clear form
        setName("");
        setEmail("");
        setPhone("");
        setSelectedState("");
        setSelectedCity("");
        setSubject("");
        setMessage("");
      } else {
        const errData = await response.json();
        setError(JSON.stringify(errData) || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      question: "What is the cost per unit for EV charging at Relux stations?",
      answer: "Relux provides competitive, transparent per-unit pricing. Check the Relux app for live rates, station availability, and exclusive charging offers."
    },
    {
      question: "Which is the most profitable EV charging franchise in India?",
      answer: "Relux Electric’s zero-investment model is a top choice for high ROI, helping entrepreneurs join India's fastest-growing green energy network."
    },
    {
      question: "How do I locate a Relux EV charging point near me?",
      answer: "Use the Relux app to find 24/7 charging spots, check real-time connector status, and navigate easily to the nearest high-speed charging hub."
    },
    {
      question: "Is it safe to charge my electric car at Relux hubs during the night?",
      answer: "Yes, all Relux stations are well-lit, monitored by CCTV, and located in accessible areas, ensuring a safe charging experience for everyone 24/7."
    },
    {
      question: "What are the space requirements to start a Relux EV franchise?",
      answer: "You only need a minimum of 2-3 dedicated parking slots in a prime area. Relux handles the technical setup to transform your space into a hub."
    },
    {
      question: "Does Relux Electric support all electric car models in India?",
      answer: "Absolutely. Our stations feature CCS2 and Bharat DC001 connectors, making them compatible with all major EVs like Tata, MG, Hyundai, and BYD."
    },
  ];

  return (
    <section className="relative w-full py-20 bg-black overflow-hidden font-sans">
      <div className="max-w-310 mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(450px,500px)] gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Contact Info & FAQ */}
          <div className="space-y-10">
            {/* Header */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                Get in touch with Us
              </h2>
              <p className="text-[#8e939a] text-sm leading-relaxed max-w-md font-medium">
                Connect with Relux Electric — We're Here to Assist You. Choose your preferred way to connect.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 max-w-md">
              {/* Phone Card */}
              <div className="flex items-start gap-4 p-5 rounded-xl bg-[#1a1c23] border border-white/2">
                <div className="shrink-0 w-10 h-10 rounded-[10px] bg-[#22242c] border border-white/5 flex items-center justify-center">
                  <FiPhone className="w-4.5 h-4.5 text-[#4caf50]" />
                </div>
                <div>
                  <h4 className="text-[#8e939a] text-[10px] font-bold uppercase tracking-wider mb-1">Phone Number</h4>
                  <p className="text-white text-[15px] font-bold mb-0.5">+91 98848 66993</p>
                  <p className="text-[#646870] text-[11px] font-medium">Mon-Sat, 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-start gap-4 p-5 rounded-xl bg-[#1a1c23] border border-white/2">
                <div className="shrink-0 w-10 h-10 rounded-[10px] bg-[#22242c] border border-white/5 flex items-center justify-center">
                  <FiMail className="w-4.5 h-4.5 text-[#4caf50]" />
                </div>
                <div>
                  <h4 className="text-[#8e939a] text-[10px] font-bold uppercase tracking-wider mb-1">Email Support</h4>
                  <p className="text-white text-[15px] font-bold mb-0.5">enquiry@reluxelectric.com</p>
                  <p className="text-[#646870] text-[11px] font-medium">Avg response: 4 hours</p>
                </div>
              </div>

              {/* Support Card */}
              <div className="col-span-1 sm:col-span-2 lg:col-span-1 p-5 rounded-xl bg-[#0c2a16] border border-[#1b3d26]">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h4 className="text-white text-[15px] font-extrabold">24/7 Technical Support</h4>
                </div>
                <p className="text-[#98c1a6] text-[11px] leading-relaxed mb-4 font-medium italic">
                  "Relux charging units are monitored 24/7 for maximum uptime and reliability."
                </p>
                <div className="flex items-center gap-4">
                  <button className="text-[#4caf50] text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Emergency Troubleshooting</button>
                </div>
              </div>
            </div>

            {/* Quick Questions FAQ */}
            <div className="max-w-md pt-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-0.5 bg-[#4caf50]" />
                <h3 className="text-[17px] font-extrabold text-white uppercase tracking-wider">Quick Questions</h3>
              </div>
              <div className="space-y-1">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-white/5 last:border-0">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
                    >
                      <span className={`text-[13px] font-extrabold transition-colors duration-300 ${openFaq === idx ? 'text-[#4caf50]' : 'text-white/80 group-hover:text-white'}`}>{faq.question}</span>
                      <svg className={`w-4 h-4 transition-all duration-300 ${openFaq === idx ? 'rotate-180 text-[#4caf50]' : 'text-white/30 group-hover:text-white/60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div 
                      className={`grid transition-all duration-300 ease-in-out ${openFaq === idx ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[12.5px] text-[#8e939a] font-medium leading-relaxed bg-[#1a1c23]/30 p-3 rounded-lg border border-white/5">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form & Map */}
          <div className="space-y-10">
            {/* Form */}
            <div className="bg-[#1a1c23] rounded-3xl p-8 md:p-10 shadow-2xl border border-white/5 relative z-10 w-full">
              {success ? (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-[#4caf50]/10 border border-[#4caf50]/20 flex items-center justify-center text-[#4caf50]">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-wider">Message Sent!</h3>
                  <p className="text-[#8e939a] text-xs max-w-sm font-medium">
                    Thank you for reaching out to Relux Electric. Our team has received your message and will get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="bg-white/5 border border-white/10 hover:border-[#4caf50]/40 hover:bg-[#4caf50]/10 text-white font-bold text-[10px] uppercase tracking-widest px-8 py-3 rounded-xl transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-[22px] font-extrabold text-white mb-2 tracking-tight">Send a message</h3>
                  <p className="text-[#8e939a] text-[12px] font-medium mb-8 leading-relaxed">
                    Fill out the form below and our team will get back to you within one business day.
                  </p>
                  
                  <form
                    className="space-y-5"
                    onSubmit={handleSubmit}
                    {...({
                      "tool-name": "submit_contact_enquiry",
                      "tool-description": "Submit a general contact or customer support inquiry to Relux Electric"
                    } as any)}
                  >
                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-bold uppercase tracking-wider p-4 rounded-xl text-center">
                        {error}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="flex gap-1 text-[11px] font-extrabold text-white mb-2 uppercase tracking-wider">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="e.g. Rahul Sharma"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full bg-[#242630] border border-transparent rounded-md px-4 py-3 text-[13px] text-white focus:outline-none focus:border-[#4caf50]/50 transition-colors placeholder:text-[#5e636e] font-medium"
                        />
                      </div>
                      <div>
                        <label className="flex gap-1 text-[11px] font-extrabold text-white mb-2 uppercase tracking-wider">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="email" 
                          placeholder="name@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full bg-[#242630] border border-transparent rounded-md px-4 py-3 text-[13px] text-white focus:outline-none focus:border-[#4caf50]/50 transition-colors placeholder:text-[#5e636e] font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="flex gap-1 text-[11px] font-extrabold text-white mb-2 uppercase tracking-wider">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="flex">
                          <div className="bg-[#2a2d36] border-r border-[#1a1c23] px-3 py-3 text-[12px] text-white font-medium rounded-l-md flex items-center justify-center shrink-0">
                            +91
                          </div>
                          <input 
                            type="tel" 
                            placeholder="10 digit number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="w-full bg-[#242630] border border-transparent rounded-r-md px-4 py-3 text-[13px] text-white focus:outline-none focus:border-[#4caf50]/50 transition-colors placeholder:text-[#5e636e] font-medium"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="flex gap-1 text-[11px] font-extrabold text-white mb-2 uppercase tracking-wider">
                          State <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select 
                            value={selectedState}
                            onChange={handleStateChange}
                            required
                            className="w-full bg-[#242630] border border-transparent rounded-md px-4 py-3 text-[13px] text-white focus:outline-none focus:border-[#4caf50]/50 transition-colors appearance-none font-medium [&>option]:text-white [&>option]:bg-[#242630]"
                          >
                            <option value="" disabled hidden className="text-[#5e636e]">Select State</option>
                            {states.map(state => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                             <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="flex gap-1 text-[11px] font-extrabold text-white mb-2 uppercase tracking-wider">
                          City <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select 
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            disabled={!selectedState}
                            required
                            className="w-full bg-[#242630] border border-transparent rounded-md px-4 py-3 text-[13px] text-white focus:outline-none focus:border-[#4caf50]/50 transition-colors appearance-none font-medium disabled:opacity-50 disabled:cursor-not-allowed [&>option]:text-white [&>option]:bg-[#242630]"
                          >
                            <option value="" disabled hidden className="text-[#5e636e]">Select City</option>
                            {currentCities.map(city => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                             <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="flex gap-1 text-[11px] font-extrabold text-white mb-2 uppercase tracking-wider">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select 
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                            className="w-full bg-[#242630] border border-transparent rounded-md px-4 py-3 text-[13px] text-white focus:outline-none focus:border-[#4caf50]/50 transition-colors appearance-none font-medium [&>option]:text-white [&>option]:bg-[#242630]"
                          >
                            <option value="" disabled hidden className="text-[#5e636e]">Select Subject</option>
                            <option value="Charger as a Service (CaaS)">Charger as a Service (CaaS)</option>
                            <option value="Franchise Opportunity">Franchise Opportunity</option>
                            <option value="Zero Investment Model">Zero Investment Model</option>
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Technical Support">Technical Support</option>
                            <option value="Other">Other</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                             <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="flex gap-1 text-[11px] font-extrabold text-white mb-2 uppercase tracking-wider">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea 
                        placeholder="Tell us more about your requirements..."
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="w-full bg-[#242630] border border-transparent rounded-md px-4 py-4 text-[13px] text-white focus:outline-none focus:border-[#4caf50]/50 transition-colors placeholder:text-[#5e636e] font-medium resize-none mb-1.5"
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#4caf50] hover:bg-[#43a047] disabled:opacity-50 text-white font-extrabold text-[14px] py-4 rounded-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-xl shadow-[#4caf50]/10"
                      >
                        {loading ? "Submitting Inquiry..." : "Submit Inquiry"}
                        <FiSend className="w-3.75 h-3.75" />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* Google Map */}
            <div className="bg-[#1a1c23] rounded-3xl p-2 shadow-2xl border border-white/5 overflow-hidden">
              <div className="w-full h-75 rounded-[1.2rem] overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.424990778029!2d80.20491577460434!3d13.00762211408842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52671df981257b%3A0xdac7f73a44cf46ed!2sRelux%20Electric%20Private%20Limited!5e1!3m2!1sen!2sin!4v1781007518971!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-[#4caf50]" />
                  <span>Guindy, Chennai</span>
                </div>
                <a href="https://maps.app.goo.gl/..." target="_blank" rel="noopener noreferrer" className="text-[#4caf50] hover:underline">Open in Maps</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

