"use client";

import { motion } from "framer-motion";
import React from "react";

const ClientMarquee = () => {
  const logos = [
  { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Tata", url: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg" },
  { name: "Reliance", url: "https://upload.wikimedia.org/wikipedia/en/9/99/Reliance_Industries_Logo.svg" },
  { name: "HDFC", url: "https://upload.wikimedia.org/wikipedia/commons/1/1a/HDFC_Bank_Logo.svg" },
  { name: "Airtel", url: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Airtel_logo_2011.svg" },
  { name: "UltraTech", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/UltraTech_Cement_Logo.svg/2560px-UltraTech_Cement_Logo.svg.png" },
  { name: "Vivo", url: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Vivo_mobile_logo.png" },
  { name: "JK Cement", url: "https://www.jkcement.com/wp-content/uploads/2021/05/logo.png" },
  ];

  // Duplicate for seamless loop
  const doubleLogos = [...logos, ...logos, ...logos];

  return (
    <section className="bg-white/[0.02] py-12 md:py-16 border-y border-white/5 overflow-hidden">
      <div className="flex flex-col items-center mb-8">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent-yellow/50">
          Trusted By Industry Leaders
        </span>
      </div>
      
      <div className="relative flex overflow-hidden group">
        <motion.div
          animate={{
            x: [0, -1035], // Approximate width of one set of logos
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex shrink-0 items-center gap-16 md:gap-24 px-12"
        >
          {doubleLogos.map((logo, idx) => (
            <div
              key={idx}
              className="h-8 md:h-12 w-32 md:w-40 shrink-0 grayscale opacity-40 transition-all duration-500 hover:grayscale-0 hover:opacity-100"
            >
              <img
                src={logo.url}
                alt={logo.name}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientMarquee;
