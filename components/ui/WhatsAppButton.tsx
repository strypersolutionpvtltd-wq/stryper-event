"use client";

import { motion } from "framer-motion";
import React from "react";

import { COMPANY_CONTACT } from "@/constants";

const WhatsAppButton = () => {
  return (
    <motion.a
      href={`https://wa.me/${COMPANY_CONTACT.whatsapp.replace(/[^0-9]/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="group fixed bottom-24 right-6 z-[50] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all hover:bg-[#20ba5a] md:bottom-8 md:right-8 md:h-16 md:w-16"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8 fill-current md:h-10 md:w-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.347-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.05-.149-.471-1.135-.646-1.53-.17-.41-.35-.354-.471-.354-.121-.002-.26-.002-.399-.002s-.364.053-.554.26c-.19.206-.724.708-.724 1.727s.74 2.003.843 2.14c.103.137 1.455 2.22 3.526 3.21.493.236.879.378 1.179.474.497.157.949.135 1.305.083.397-.058 1.21-.495 1.38-.973.171-.478.171-.887.12-.973-.05-.086-.184-.137-.481-.286zM12 2c-5.523 0-10 4.477-10 10 0 1.834 1.503 3.52 1.503 3.52l-1.503 6.48 6.48-1.503s1.686 1.503 3.52 1.503c5.523 0 10-4.477 10-10s-4.477-10-10-10z" />
      </svg>
      {/* Tooltip */}
      <div className="absolute right-full mr-4 px-3 py-1 bg-primary-black/90 border border-accent-yellow/30 rounded-lg text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us!
      </div>
    </motion.a>
  );
};

export default WhatsAppButton;
