"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FiX, FiArrowRight } from "react-icons/fi";
import CaasEnquiryForm from "./CaasEnquiryForm";

interface CaasHeroFormModalProps {
  buttonText?: string;
  buttonClassName?: string;
  autoOpen?: boolean;
}

export default function CaasHeroFormModal({
  buttonText = "Enquire Now for CaaS",
  buttonClassName,
  autoOpen = true,
}: CaasHeroFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (autoOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [autoOpen]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const modalJSX = isOpen ? (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 md:py-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Backdrop Click Listener */}
      <div
        className="fixed inset-0"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Container with Max Height & Inner Scroll */}
      <div className="relative w-full max-w-2xl max-h-[85vh] sm:max-h-[88vh] bg-[#15171e] border border-white/10 rounded-3xl shadow-2xl z-10 flex flex-col overflow-hidden my-auto animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-30 cursor-pointer shadow-lg backdrop-blur-md border border-white/10"
          aria-label="Close Enquiry Form"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto">
          <CaasEnquiryForm />
        </div>

      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Action Button */}
      <div className="mt-6 flex items-center justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className={
            buttonClassName ||
            "inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#00b14f] hover:bg-[#009b45] text-black font-extrabold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(0,177,79,0.4)] hover:shadow-[0_0_35px_rgba(0,177,79,0.6)] transform hover:-translate-y-0.5 cursor-pointer"
          }
        >
          <span>{buttonText}</span>
          <FiArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Render Modal via React Portal directly into document.body */}
      {mounted && modalJSX ? createPortal(modalJSX, document.body) : null}
    </>
  );
}
