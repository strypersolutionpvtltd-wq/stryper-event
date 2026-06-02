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
      icon: <MessageSquare className="h-6 w-6" />,
      title: "WhatsApp",
      details: COMPANY_CONTACT.phone,
      href: `https://wa.me/${COMPANY_CONTACT.whatsapp.replace(/[^0-9]/g, "")}`,
      subtitle: "Fastest response",
      color: "bg-[#25D366]",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: COMPANY_CONTACT.phone,
      href: `tel:${COMPANY_CONTACT.phoneRaw}`,
      subtitle: "10am-7pm Support",
      color: "bg-accent-yellow",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: COMPANY_CONTACT.email,
      href: `mailto:${COMPANY_CONTACT.email}`,
      subtitle: "Official Enquiries",
      color: "bg-white/10",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Jaipur Office",
      details: COMPANY_CONTACT.address,
      href: "https://maps.google.com",
      subtitle: "Visit us",
      color: "bg-white/10",
    },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-yellow/5 rounded-full blur-[120px]" />

      <Container className="relative z-10">
        <SectionHeading
          subtitle="CONTACT US"
          title="Ready to Start Your Event?"
          align="center"
          className="mb-16"
        />

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-white/60 text-lg leading-relaxed">
              We have unified our communication to provide you with the fastest service. 
              Click below to chat with our expert team on WhatsApp and get a quote instantly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
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
                className="flex items-center gap-6 p-6 rounded-3xl glass glow-border group transition-all hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-black transition-transform group-hover:scale-110`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{item.subtitle}</p>
                  <h4 className="text-white text-xl font-bold">{item.title}</h4>
                  <p className="text-white/70 text-sm mt-1">{item.details}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <motion.a
              href={`https://wa.me/${COMPANY_CONTACT.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-4 px-12 py-5 bg-[#25D366] text-white rounded-full font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(37,211,102,0.3)]"
            >
              <MessageSquare size={24} fill="currentColor" />
              Chat on WhatsApp Now
            </motion.a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
