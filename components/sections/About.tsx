"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import React from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeInLeft, fadeInRight } from "@/lib/animations";

const About = () => {
  const highlights = [
    "We have done more than 100 successful events",
    "A friendly team that takes care of every small thing",
    "More than 5 years of real experience in जयपुर and India",
    "We work within your budget to give you the best event",
  ];

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
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              We Make Your Events <br />
              <span className="text-accent-yellow">Simple & Successful</span>
            </h3>

            <p className="text-body text-white/70">
              Stryper Event Management is a real event planning team in Jaipur. We know that planning an event is stressful, so we handle everything for you. From start to finish, we make sure your guests are happy and everything looks perfect.
            </p>

            <p className="text-body text-white/70">
              Whether you want a corporate meeting, a beautiful wedding, or a sports tournament, we take care of the venue, the decor, and the staff. You just focus on the moment.
            </p>

            {/* Highlights */}
            <div className="space-y-4 pt-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-accent-yellow" />
                  <span className="text-white/80">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Animated Card */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="glass glow-border relative overflow-hidden rounded-2xl p-8 md:p-12"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-glow-gradient opacity-50" />

              {/* Content */}
              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <h4 className="text-gradient text-2xl font-bold">
                    Why Choose Us?
                  </h4>
                  <p className="text-white/70">
                    Our clients trust us because we are honest. We don&apos;t have any hidden costs, and we are always available to talk. We have been doing this for 5 years, and we know how to fix problems quickly.
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Honest Pricing",
                    "Jaipur Based",
                    "Pan India Team",
                    "Always Ready",
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="rounded-lg border border-white/10 bg-white/5 p-4 text-center"
                    >
                      <span className="text-sm text-white/80">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default About;
