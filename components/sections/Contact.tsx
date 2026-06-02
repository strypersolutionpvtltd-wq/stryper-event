"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import React from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { COMPANY_CONTACT } from "@/constants";

const Contact = () => {
  const contactDetails = [
    {
      icon: <MessageSquare className="h-5 w-5 md:h-6 md:w-6" />,
      title: "WhatsApp",
      details: COMPANY_CONTACT.phone,
      href: `https://wa.me/${COMPANY_CONTACT.whatsapp.replace(/[^0-9]/g, "")}`,
      subtitle: "Fastest response",
      color: "bg-[#25D366]",
    },
    {
      icon: <Phone className="h-5 w-5 md:h-6 md:w-6" />,
      title: "Call Us",
      details: COMPANY_CONTACT.phone,
      href: `tel:${COMPANY_CONTACT.phoneRaw}`,
      subtitle: "10am-7pm Support",
      color: "bg-accent-yellow",
    },
    {
      icon: <Mail className="h-5 w-5 md:h-6 md:w-6" />,
      title: "Email Us",
      details: COMPANY_CONTACT.email,
      href: `mailto:${COMPANY_CONTACT.email}`,
      subtitle: "Official Enquiries",
      color: "bg-white/10",
    },
    {
      icon: <MapPin className="h-5 w-5 md:h-6 md:w-6" />,
      title: "Jaipur Office",
      details: COMPANY_CONTACT.address,
      href: "https://maps.google.com",
      subtitle: "Visit us",
      color: "bg-white/10",
    },
  ];

  return (
    <section id="contact" className="relative py-16 md:py-32 overflow-hidden px-4 md:px-0">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-accent-yellow/5 rounded-full blur-[80px] md:blur-[120px]" />

      <Container className="relative z-10">
        <SectionHeading
          subtitle="CONTACT US"
          title="Ready to Start?"
          align="center"
          className="mb-8 md:mb-16"
        />

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <p className="text-white/60 text-sm md:text-lg leading-relaxed px-4">
              We have unified our communication to provide you with the fastest service. 
              Click below to chat with our expert team on WhatsApp and get a quote instantly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {contactDetails.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 md:gap-6 p-5 md:p-6 rounded-[1.5rem] md:rounded-3xl glass glow-border group transition-all hover:-translate-y-1 active:scale-95"
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${item.color} flex items-center justify-center text-black shrink-0 transition-transform group-hover:scale-110`}>
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-white/40 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-0.5 truncate">{item.subtitle}</p>
                  <h4 className="text-white text-base md:text-xl font-bold truncate">{item.title}</h4>
                  <p className="text-white/70 text-[10px] md:text-sm mt-0.5 truncate">{item.details}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-16 text-center"
          >
            <motion.a
              href={`https://wa.me/${COMPANY_CONTACT.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 md:px-12 md:py-5 bg-[#25D366] text-white rounded-full text-xs md:text-sm font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(37,211,102,0.3)] active:scale-95 transition-transform"
            >
              <MessageSquare size={20} fill="currentColor" />
              Chat on WhatsApp Now
            </motion.a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
