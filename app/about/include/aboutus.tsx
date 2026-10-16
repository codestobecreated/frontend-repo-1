"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "@/app/ui/baceurl";

export default function AboutUs() {
    const [activeTab, setActiveTab] = useState("Vision");

    const [tabs, setTabs] = useState([
        { id: "Vision", label: "Vision", content: "To accelerate India’s transition towards sustainable mobility by providing accessible and reliable EV charging infrastructure." },
        { id: "Mission", label: "Mission", content: "Deliver clean, efficient, and smart charging solutions that empower individuals and businesses to adopt electric vehicles with confidence." },
        { id: "Values", label: "Values", content: "Innovation, Sustainability, and Reliability are the core pillars of everything we build at Relux Electric." },
    ]);

    useEffect(() => {
        const fetchTabs = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/company-core-tabs/`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setTabs(data.map((item: any) => ({
                            id: item.tab_id,
                            label: item.label,
                            content: item.content
                        })));

                        // Optional: if the current activeTab doesn't exist in the fetched tabs, set it to the first one
                        if (!data.find((t: any) => t.tab_id === activeTab)) {
                            setActiveTab(data[0].tab_id);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching company core tabs:", error);
            }
        };
        fetchTabs();
    }, []);

    return (
        <section
            className="relative w-full pt-5 md:pt-10 pb-12 md:pb-16 bg-black overflow-hidden px-6 font-poppins"
            style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
        >
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,#00b14f08,transparent_40%)]" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: Content Area */}
                    <div className="flex flex-col h-full justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <span className="w-8 h-px bg-[#00b14f]" />
                            <span className="text-[#00b14f] text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">About Us</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6 tracking-tighter uppercase"
                        >
                            WE BUILD THE INFRASTRUCTURE THAT
                            <span className="text-[#00b14f]"> KEEPS EVs MOVING.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-zinc-200 text-base md:text-[17px] font-normal leading-relaxed mb-10"
                        >
                            From a single charger to large-scale charging networks, Relux designs, installs and supports EV charging infrastructure built for the way India travels.
                        </motion.p>

                        {/* Tab Switcher - Balanced */}
                        <div className="flex items-center gap-10 mb-8 border-b border-white/10">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`text-xs md:text-sm font-black uppercase tracking-[0.25em] transition-all relative pb-4 cursor-pointer ${activeTab === tab.id ? "text-[#00b14f]" : "text-zinc-400 hover:text-white"
                                        }`}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <motion.div layoutId="activeAboutTab" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00b14f]" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-22.5">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={activeTab}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="text-white text-base md:text-[17px] font-medium leading-relaxed italic border-l-2 border-[#00b14f] pl-4 py-1"
                                >
                                    &quot;{tabs.find((t) => t.id === activeTab)?.content}&quot;
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right: Visual Composition - Proportional */}
                    <div className="relative group flex items-center justify-center lg:justify-end">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative w-full max-w-120 aspect-3/3.5 rounded-[2.5rem] overflow-hidden border border-white/15 shadow-2xl"
                        >
                            <Image
                                src="/about/relux_website_img.webp"
                                alt="Relux Evolution"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                        </motion.div>

                        {/* High-Contrast Balanced Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="absolute -bottom-6 -left-6 bg-[white] border-2 border-[#00b14f]/50 py-5 px-8 rounded-3xl  hidden md:flex flex-col items-center min-w-[170px] z-20"
                        >
                            <span className="text-4xl md:text-5xl font-black text-black tracking-tighter leading-none mb-1">
                                12<span className="text-black">+</span>
                            </span>

                            <span className="text-xs font-black uppercase text-[#00b14f]">
                                Years Elite
                            </span>

                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
