"use client";

import { motion } from "framer-motion";
import { MessageSquare, Phone, Send } from "lucide-react";
import React from "react";

import { COMPANY_CONTACT } from "@/constants";
import { useGetStartedModal } from "@/hooks/useModal";

const MobileBottomBar = () => {
  const { onOpen } = useGetStartedModal();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] block border-t border-white/10 bg-black/80 backdrop-blur-lg sm:hidden">
      <div className="flex h-16 items-center justify-around px-4">
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
          className="flex flex-col items-center gap-1 text-white/70"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
            <MessageSquare size={18} className="text-green-500" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider">WhatsApp</span>
        </motion.a>

        {/* Enquire Button */}
        <motion.button
          onClick={onOpen}
          whileTap={{ scale: 0.9 }}
          className="flex h-11 items-center gap-2 rounded-full bg-accent-yellow px-6 text-sm font-bold text-primary-black shadow-lg"
        >
          <Send size={16} />
          ENQUIRE
        </motion.button>
      </div>
    </div>
  );
};

export default MobileBottomBar;
