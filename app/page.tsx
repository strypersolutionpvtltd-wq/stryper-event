"use client";

import About from "@/components/sections/About";
import Benefits from "@/components/sections/Benefits";
import ClientLogos from "@/components/sections/ClientLogos";
import EventCategories from "@/components/sections/EventCategories";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import SectionDivider from "@/components/ui/SectionDivider";
import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { COMPANY_CONTACT } from "@/constants";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <main className="relative w-full">
        <Hero />

        <SectionDivider />
        <Services />

        <SectionDivider />
        <EventCategories />

        <SectionDivider />
        <Benefits />

        <SectionDivider />
        <ClientLogos />

        <SectionDivider />
        <Testimonials />

        <SectionDivider />
        <About />

        <SectionDivider />
        {/* Simplified WhatsApp CTA instead of full Contact Form */}
        <section className="py-24 md:py-32 relative overflow-hidden w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#25D366]/5 rounded-full blur-[120px]" />
          <Container className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                Let&apos;s Create Something <span className="text-accent-yellow">Legendary</span>
              </h2>
              <p className="text-white/60 text-lg">
                Stop planning and start celebrating. Message us on WhatsApp for a fast response and expert advice for your next event.
              </p>
              <motion.a
                href={`https://wa.me/${COMPANY_CONTACT.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-4 px-12 py-5 bg-[#25D366] text-white rounded-full font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(37,211,102,0.3)] transition-all hover:shadow-[0_25px_60px_rgba(37,211,102,0.4)]"
              >
                <MessageSquare size={24} fill="currentColor" />
                Contact Us
              </motion.a>
            </motion.div>
          </Container>
        </section>
      </main>
    </div>
  );
}
