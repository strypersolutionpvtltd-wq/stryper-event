"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import React from "react";
import Image from "next/image";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const About = () => {
  const highlights = [
    "Over 100+ successful events completed",
    "Professional team that manages every small detail",
    "5+ years of experience in Jaipur and all over India",
    "Quality service that fits perfectly in your budget",
  ];

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-accent-gold/5 blur-[100px]" />
      </div>

      <Container className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          subtitle="ABOUT US"
          title="Who We Are"
          align="center"
          className="mb-16"
        />

        {/* Split Layout */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              We Make Your Events <br />
              <span className="text-accent-yellow">Seamless & Memorable</span>
            </h3>

            <p className="text-body text-white/70">
              Stryper Event Management is a professional event planning team based in Jaipur. We have been creating beautiful events for over 5 years. Our goal is simple: to take the stress away from you and make your event perfect.
            </p>

            <p className="text-body text-white/70">
              From grand weddings in Jaipur to corporate meetings and sports events across India, we handle everything. We take care of the venue, the decor, the music, and the staff so you can just focus on your guests.
            </p>

            {/* Highlights */}
            <div className="space-y-4 pt-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-accent-yellow" />
                  <span className="font-medium text-white/90">
                    {highlight}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
                alt="Stryper Events Team Work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-black/60 via-transparent to-transparent" />
            </div>

            {/* Stats floating card */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute -bottom-6 -left-6 rounded-2xl bg-accent-yellow p-6 text-primary-black shadow-2xl md:p-8"
            >
              <div className="text-center">
                <p className="text-4xl font-black md:text-5xl">5+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary-black/60">
                  Years of Excellence
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default About;
