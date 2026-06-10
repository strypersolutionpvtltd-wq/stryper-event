"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import Container from "@/components/ui/Container";
import { COMPANY_CONTACT, NAV_ITEMS, SERVICES } from "@/constants";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: COMPANY_CONTACT.facebook, label: "Facebook" },
    { icon: Instagram, href: COMPANY_CONTACT.instagram, label: "Instagram" },
    { icon: Linkedin, href: COMPANY_CONTACT.linkedin, label: "Linkedin" },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-black pt-16 md:pt-24 pb-20 md:pb-12 overflow-hidden px-4 md:px-0">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent-yellow/20 to-transparent" />
      
      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Company Info & Chairman */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center md:text-left">
              <h3 className="text-gradient mb-4 text-3xl font-bold uppercase tracking-tighter text-white">STRYPER</h3>
              <p className="text-sm text-white/60 leading-relaxed max-w-sm mx-auto md:mx-0">
                Jaipur&apos;s leading event architects, dedicated to creating seamless and memorable experiences across India.
              </p>
            </div>

            {/* Chairman Profile */}
            <div className="relative group max-w-sm mx-auto md:mx-0">
              <div className="absolute -inset-4 rounded-2xl bg-white/[0.02] border border-white/5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-accent-yellow/30 bg-black p-1 transition-transform md:group-hover:scale-110">
                    <Image
                      src="/images/logo.png"
                      alt="Chairman"
                      fill
                      className="object-contain mix-blend-screen p-1"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-white uppercase tracking-tight truncate">Kartikey Niranjan</h4>
                    <p className="text-[9px] font-black text-accent-yellow uppercase tracking-[0.2em]">Chairman & Visionary</p>
                  </div>
                </div>
                <p className="text-xs italic text-white/50 leading-relaxed">
                  &quot;With over 8 years of leadership, Kartikey drives our mission to redefine excellence in event management through innovation.&quot;
                </p>
                <a 
                  href="https://www.linkedin.com/in/kartikey-niranjan-493115188"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-black text-white/40 hover:text-accent-yellow transition-colors uppercase tracking-widest"
                >
                  <Linkedin size={12} /> Connect on LinkedIn
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start gap-4">
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

          {/* Quick Links & Services */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-10 lg:col-span-2">
            <div className="text-center md:text-left">
                <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-white">Quick Links</h4>
                <ul className="space-y-4">
                {NAV_ITEMS.map((item) => (
                    <li key={item.name}>
                    <Link
                        href={item.href}
                        className="text-sm text-white/40 transition-colors hover:text-accent-yellow"
                    >
                        {item.name}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>

            <div className="text-center md:text-left lg:col-span-2">
                <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-white">Services</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {SERVICES.map((service) => (
                    <li key={service.slug}>
                    <Link
                        href={`/services/${service.slug}`}
                        className="text-sm text-white/40 transition-colors hover:text-accent-yellow"
                    >
                        {service.title}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-1 text-center md:text-left">
            <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-white">Contact Us</h4>
            <ul className="space-y-6 max-w-xs mx-auto md:mx-0">
              <li className="flex flex-col md:flex-row items-center gap-3 text-sm text-white/40">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-accent-yellow">
                   <Phone size={16} />
                </div>
                <span className="truncate">{COMPANY_CONTACT.phone}</span>
              </li>
              <li className="flex flex-col md:flex-row items-center gap-3 text-sm text-white/40">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-accent-yellow">
                   <Mail size={16} />
                </div>
                <span className="truncate">{COMPANY_CONTACT.email}</span>
              </li>
              <li className="flex flex-col md:flex-row items-center gap-3 text-sm text-white/40">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-accent-yellow">
                   <MapPin size={16} />
                </div>
                <span className="leading-relaxed">{COMPANY_CONTACT.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20 flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-8 md:flex-row"
        >
          <p className="text-xs text-white/40 text-center md:text-left">
            &copy; {new Date().getFullYear()} Stryper Solution Pvt Ltd. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="text-[10px] md:text-xs text-white/40 transition-colors hover:text-accent-yellow uppercase tracking-widest font-bold"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[10px] md:text-xs text-white/40 transition-colors hover:text-accent-yellow uppercase tracking-widest font-bold"
            >
              Terms
            </Link>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;
