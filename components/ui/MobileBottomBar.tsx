"use client";

import { motion } from "framer-motion";
import { MessageSquare, Phone } from "lucide-react";
import React from "react";

import { COMPANY_CONTACT } from "@/constants";

const MobileBottomBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] block border-t border-white/10 bg-black/80 backdrop-blur-lg sm:hidden h-16">
      <div className="flex h-full items-center justify-around px-4">
        {/* Call Now */}
        <motion.a
          href={`tel:${COMPANY_CONTACT.phoneRaw}`}
          whileTap={{ scale: 0.9 }}
          className="flex flex-col items-center gap-1 text-white/70"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
            <Phone size={18} className="text-accent-yellow" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider">Call</span>
        </motion.a>

        {/* WhatsApp */}
        <motion.a
          href={`https://wa.me/${COMPANY_CONTACT.whatsapp.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.9 }}
          className="flex h-11 items-center gap-2 rounded-full bg-[#25D366] px-8 text-sm font-bold text-white shadow-lg"
        >
          <MessageSquare size={18} fill="currentColor" />
          WHATSAPP
        </motion.a>
      </div>
    </div>
  );
};

export default MobileBottomBar;
