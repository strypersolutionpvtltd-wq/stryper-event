"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";

import Container from "@/components/ui/Container";
import { COMPANY_CONTACT, NAV_ITEMS } from "@/constants";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: COMPANY_CONTACT.facebook, label: "Facebook" },
    { icon: Instagram, href: COMPANY_CONTACT.instagram, label: "Instagram" },
    { icon: Linkedin, href: COMPANY_CONTACT.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: COMPANY_CONTACT.twitter, label: "Twitter" },
  ];

  const contactInfo = [
    { icon: Phone, text: COMPANY_CONTACT.phone, href: `tel:${COMPANY_CONTACT.phoneRaw}` },
    { icon: Mail, text: COMPANY_CONTACT.email, href: `mailto:${COMPANY_CONTACT.email}` },
    { icon: MapPin, text: COMPANY_CONTACT.address, href: "https://maps.google.com" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-white/[0.01]">
      {/* Background glow */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-accent-yellow/5 blur-[100px]"
        />
      </div>

      <Container className="relative z-10">
        {/* Main Footer Content */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-gradient mb-2 text-2xl font-bold">STRYPER</h3>
              <p className="text-sm text-white/60">
                We plan and manage events that run smoothly and make people happy. Based in Jaipur, serving all of India.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors hover:border-accent-yellow/50"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-white/60 transition-colors group-hover:text-accent-yellow" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="mb-6 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="inline-block text-sm text-white/60 transition-colors hover:text-accent-yellow"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="mb-6 font-semibold text-white">Services</h4>
            <ul className="space-y-3">
              {[
                "Corporate Events",
                "Wedding Events",
                "Event Production",
                "Sports Management",
                "Brand Promotion",
              ].map((service, index) => (
                <li key={index}>
                  <span className="text-sm text-white/60">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="mb-6 font-semibold text-white">Contact Us</h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <a
                    href={info.href}
                    className="flex items-start gap-3 group transition-colors hover:text-accent-yellow"
                  >
                    <info.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-yellow transition-transform group-hover:scale-110" />
                    <span className="text-sm text-white/60 transition-colors group-hover:text-white">
                      {info.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center justify-between gap-4 border-t border-white/5 py-8 md:flex-row"
        >
          <p className="text-center text-sm text-white/40 md:text-left">
            © {new Date().getFullYear()} Stryper Solution Pvt Ltd. All
            rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#home"
              className="text-white/40 transition-colors hover:text-accent-yellow"
            >
              Privacy Policy
            </a>
            <a
              href="#home"
              className="text-white/40 transition-colors hover:text-accent-yellow"
            >
              Terms of Service
            </a>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;
