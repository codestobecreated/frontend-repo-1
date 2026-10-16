"use client";

import React from "react";
import { Car, Bus, Truck, AlertCircle } from "lucide-react";

export default function ChargingTimesSection() {
  const chargingData = [
    {
      vehicle: "Car",
      icon: Car,
      k60: "1.5 Hours",
      k120: "45 Minutes",
      k180: "30 Minutes",
      k240: "15–30 Min",
      k360: "10–20 Min",
    },
    {
      vehicle: "Bus",
      icon: Bus,
      k60: "4 Hours",
      k120: "2 Hours",
      k180: "1.5 Hours",
      k240: "Less than 1 Hour",
      k360: "45–60 Min",
    },
    {
      vehicle: "Truck",
      icon: Truck,
      k60: "4 Hours",
      k120: "2 Hours",
      k180: "1.5 Hours",
      k240: "1 Hour",
      k360: "45–60 Min",
    },
    {
      vehicle: "Mini Truck",
      icon: Truck,
      k60: "1.5 Hours",
      k120: "45 Minutes",
      k180: "45 Minutes",
      k240: "30–45 Min",
      k360: "20–30 Min",
    },
  ];

  return (
    <section
      className="relative w-full py-16 md:py-24 bg-white text-slate-900 font-poppins border-b border-slate-200"
      style={{ fontFamily: '"Poppins", "Poppins Fallback", var(--font-poppins), sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[#00b14f] font-black text-xs sm:text-sm tracking-[0.25em] uppercase block">
            STATION THROUGHPUT GUIDE
          </span>

          <div className="inline-block">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">
              EV CHARGING TIME <span className="text-[#00b14f]">BY VEHICLE TYPE</span>
            </h2>
            <div className="flex justify-center mt-2">
              <svg
                className="w-24 sm:w-32 h-2.5 text-[#00b14f] fill-none stroke-current"
                viewBox="0 0 100 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8C20 2 35 11 50 6C65 1 80 10 98 4"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <p className="text-slate-600 text-[16px] leading-relaxed font-normal pt-2">
            Charging duration varies by vehicle type, battery capacity, and charging capability. The following estimates provide a practical comparison of charging times across different EV categories.
          </p>
        </div>

        {/* Table Container */}
        <div className="mt-10 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-180">
              <thead>
                <tr className="bg-[#00b14f]/10 border-b border-slate-200">
                  <th className="py-4.5 px-6 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 w-1/5">
                    VEHICLE TYPE
                  </th>
                  <th className="py-4.5 px-6 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 text-center">
                    60 KW
                  </th>
                  <th className="py-4.5 px-6 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 text-center">
                    120 KW
                  </th>
                  <th className="py-4.5 px-6 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 text-center">
                    180 KW
                  </th>
                  <th className="py-4.5 px-6 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 text-center">
                    240 KW
                  </th>
                  <th className="py-4.5 px-6 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00b14f] text-center bg-[#00b14f]/15">
                    360 KW
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {chargingData.map((row, idx) => {
                  const Icon = row.icon;
                  return (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Vehicle Column */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#00b14f]/10 flex items-center justify-center text-[#00b14f] shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                            {row.vehicle}
                          </span>
                        </div>
                      </td>

                      {/* 60 KW */}
                      <td className="py-5 px-6 text-center text-slate-700 font-bold text-sm sm:text-base">
                        {row.k60}
                      </td>

                      {/* 120 KW */}
                      <td className="py-5 px-6 text-center text-slate-700 font-bold text-sm sm:text-base">
                        {row.k120}
                      </td>

                      {/* 180 KW */}
                      <td className="py-5 px-6 text-center text-slate-700 font-bold text-sm sm:text-base">
                        {row.k180}
                      </td>

                      {/* 240 KW */}
                      <td className="py-5 px-6 text-center text-slate-700 font-bold text-sm sm:text-base">
                        {row.k240}
                      </td>

                      {/* 360 KW */}
                      <td className="py-5 px-6 text-center text-[#00b14f] font-black text-sm sm:text-base bg-[#00b14f]/5">
                        {row.k360}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Warning / Disclaimer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-500 font-medium text-center">
          <AlertCircle className="w-4 h-4 text-[#00b14f] shrink-0" />
          <span>
            Charging times are approximate and vary by vehicle, battery capacity, and charging compatibility.
          </span>
        </div>

      </div>
    </section>
  );
}
