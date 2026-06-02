"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
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
    { icon: Twitter, href: COMPANY_CONTACT.twitter, label: "Twitter" },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-black pt-24 pb-12 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent-yellow/20 to-transparent" />
      
      <Container className="relative z-10">
        <div className="grid gap-16 lg:grid-cols-4">
          {/* Company Info & Chairman */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-gradient mb-2 text-2xl font-bold uppercase tracking-tighter text-white">STRYPER</h3>
              <p className="text-sm text-white/60">
                Jaipur&apos;s leading event architects, dedicated to creating seamless and memorable experiences across India.
              </p>
            </div>

            {/* Chairman Profile */}
            <div className="relative group">
              <div className="absolute -inset-4 rounded-2xl bg-white/[0.02] border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-accent-yellow/30 bg-black p-1 transition-transform group-hover:scale-110">
                    <Image
                      src="/images/logo.png"
                      alt="Chairman"
                      fill
                      className="object-contain mix-blend-screen"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white uppercase tracking-tight">Kartikey Niranjan</h4>
                    <p className="text-[10px] font-black text-accent-yellow uppercase tracking-[0.2em]">Chairman & Visionary</p>
                  </div>
                </div>
                <p className="text-xs italic text-white/50 leading-relaxed">
                  &quot;With over 8 years of leadership, Kartikey drives our mission to redefine excellence in event management through innovation and strategic vision.&quot;
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
          <div className="lg:col-span-1">
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

          {/* Services */}
          <div className="lg:col-span-1">
            <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-white">Services</h4>
            <ul className="space-y-4">
              {SERVICES.slice(0, 5).map((service) => (
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

          {/* Contact */}
          <div className="lg:col-span-1">
            <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-white/40">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-accent-yellow">
                   <Phone size={14} />
                </div>
                {COMPANY_CONTACT.phone}
              </li>
              <li className="flex items-center gap-3 text-sm text-white/40">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-accent-yellow">
                   <Mail size={14} />
                </div>
                {COMPANY_CONTACT.email}
              </li>
              <li className="flex items-center gap-3 text-sm text-white/40">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-accent-yellow">
                   <MapPin size={14} />
                </div>
                {COMPANY_CONTACT.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row"
        >
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Stryper Solution Pvt Ltd. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="text-xs text-white/40 transition-colors hover:text-accent-yellow"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/40 transition-colors hover:text-accent-yellow"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;
