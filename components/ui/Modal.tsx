"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  // Robust scroll lock logic
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    
    const scrollY = window.scrollY;
    document.body.classList.add("no-scroll");
    document.body.style.top = `-${scrollY}px`;
    
    return () => {
      document.body.classList.remove("no-scroll");
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 touch-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary-black/90 backdrop-blur-md touch-none"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] flex flex-col glass glow-border rounded-[2.5rem] shadow-2xl overflow-hidden overscroll-contain touch-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Fixed at top */}
            <div className="flex items-center justify-between p-6 md:p-8 pb-4 bg-gradient-to-b from-primary-black/50 to-transparent">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {title || "Get Started"}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent-yellow hover:text-primary-black text-white transition-all shadow-lg border border-white/10"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Body - Scrollable content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 pt-0 overscroll-contain custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
