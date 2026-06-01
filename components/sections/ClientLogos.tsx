"use client";

import { motion } from "framer-motion";
import React from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const ClientLogos = () => {
  const clients = [
    { name: "Airtel", url: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Airtel_logo_2011.svg" },
    { name: "Tata Motors", url: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg" },
    { name: "Reliance", url: "https://upload.wikimedia.org/wikipedia/en/9/99/Reliance_Industries_Logo.svg" },
    { name: "HDFC Bank", url: "https://upload.wikimedia.org/wikipedia/commons/1/1a/HDFC_Bank_Logo.svg" },
    { name: "UltraTech", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/UltraTech_Cement_Logo.svg/2560px-UltraTech_Cement_Logo.svg.png" },
    { name: "JK Cement", url: "https://www.jkcement.com/wp-content/uploads/2021/05/logo.png" },
    { name: "AU Bank", url: "https://www.aubank.in/assets/images/au-logo.png" },
    { name: "Jaipur Rugs", url: "https://www.jaipurrugs.com/pub/static/frontend/Magento/luma/en_US/images/logo.svg" },
    { name: "Vivo", url: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Vivo_mobile_logo.png" },
  ];

  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <section className="relative py-24 overflow-hidden bg-white/[0.01]">
      <Container className="relative z-10">
        <SectionHeading
          subtitle="TRUSTED BY"
          title="Companies We Work With"
          align="center"
          className="mb-16"
        />

        <div className="relative group">
          <div className="overflow-hidden">
            <motion.div
              animate={{
                x: [0, -1200],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex gap-12 md:gap-24 items-center"
            >
              {duplicatedClients.map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-32 md:w-44 h-12 md:h-16 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                >
                  <img
                    src={client.url}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ClientLogos;
