"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function WhyChooseUs() {
    return (
        <section
            className="relative w-full pt-12 md:pt-16 pb-16 md:pb-24 bg-black overflow-hidden font-poppins"
            style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
        >
            {/* Subtle Glow */}
            <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#00b14f]/5 blur-[120px] rounded-full translate-x-1/2 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Header Row */}
                <div className="mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center md:items-start"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[1px] bg-[#00b14f]" />
                            <span className="text-[#00b14f] text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">Why Choose Us</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter uppercase text-center md:text-left">
                            SOLUTIONS FOR ALL <br />
                            <span className="text-[#00b14f]">EV PROGRAMS!</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Grid Layout - Equal Height Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 items-stretch">

                    {/* Column 1: Feature Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col h-full group"
                    >
                        <div className="relative w-full aspect-[4/5] overflow-hidden border border-white/10 shadow-2xl mb-6 rounded-2xl">
                            <Image
                                src="/about/relux-electric-fast-installation.webp"
                                alt="Installation"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-black text-white tracking-tight uppercase mb-3">Fast Installation</h3>
                                <p className="text-zinc-200 text-base md:text-[17px] font-normal leading-relaxed">
                                    We set up your EV charging station quickly and carefully — so you can start earning without delay.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Column 2: Hero Card (Tall) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden group border border-white/15 shadow-2xl h-full min-h-[400px] rounded-2xl"
                    >
                        <Image
                            src="/about/relux-electric-expert-team.webp"
                            alt="Expert Engineering"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8 z-10">
                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase mb-2 drop-shadow-md">Expert Engineering</h3>
                            <p className="text-[#00b14f] text-xs font-black uppercase tracking-[0.22em]">Relux Premium Standards</p>

                        </div>
                    </motion.div>

                    {/* Column 3: Stats & CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col h-full"
                    >
                        <div className="relative w-full aspect-[4/3] overflow-hidden border border-white/15 shadow-2xl mb-6 rounded-2xl">
                            <Image
                                src="/about/relux-electric-reliable-service.webp"
                                alt="Reliable Service"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>

                        <div className="flex-1 flex flex-col justify-between gap-8">
                            <p className="text-zinc-200 text-base md:text-[17px] font-normal leading-relaxed">
                                India&apos;s leading electric vehicle charging infrastructure provider, the only company with End to End charging services for private & public sectors as per the Indian government MOP guidelines across India.
                            </p>
                            <Link href="/contact" className="w-full">
                                <button className="w-full px-8 py-4 bg-[#00b14f] hover:bg-white hover:text-black text-white font-black text-xs md:text-sm uppercase tracking-[0.2em] rounded-sm transition-all duration-300 shadow-xl shadow-[#00b14f]/30 hover:-translate-y-1 cursor-pointer">
                                    Get Started Today
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
