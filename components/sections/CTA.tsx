"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import React from "react";

import Container from "@/components/ui/Container";

const CTA = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/10 via-accent-gold/5 to-transparent" />
      
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass glow-border rounded-3xl p-12 md:p-16 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <div className="px-4 py-2 bg-accent-yellow/10 border border-accent-yellow/30 rounded-full">
              <span className="text-accent-yellow font-semibold text-sm">
                Ready to Start?
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Let&apos;s Plan Your Next Event
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 mb-10 max-w-2xl mx-auto"
          >
            Get in touch today and let our team help you create an event that
            your guests will remember.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-accent-yellow text-primary-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all flex items-center gap-2"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="tel:+91XXXXXXXXXX"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 border border-white/10 hover:border-accent-yellow/50 text-white font-semibold rounded-full transition-all flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </motion.a>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10 pt-8 border-t border-white/10"
          >
            <p className="text-white/60 text-sm">
              Trusted by 100+ companies • 500+ events completed • 15+ years
              experience
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTA;
