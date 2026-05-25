"use client";

import { motion } from "framer-motion";
import React from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { EVENT_PROCESS } from "@/constants";

const EventProcess = () => {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-white/[0.01] py-24 md:py-32"
    >
      <Container className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          subtitle="OUR PROCESS"
          title="How We Work"
          align="center"
          className="mb-20"
        />

        {/* Timeline */}
        <div className="relative mx-auto max-w-5xl">
          {/* Connecting line */}
          <div className="absolute bottom-0 left-4 sm:left-6 top-0 w-px bg-gradient-to-b from-accent-yellow/20 via-accent-yellow/50 to-accent-yellow/20 md:left-1/2" />

          {/* Process Steps */}
          <div className="space-y-8 md:space-y-16">
            {EVENT_PROCESS.map((process, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative flex items-center ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col md:gap-8`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      isEven ? "md:text-right" : "md:text-left"
                    } pl-12 sm:pl-16 md:pl-0 text-left`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="glass glow-border group rounded-xl p-6 md:p-8"
                    >
                      {/* Step number */}
                      <div
                        className={`mb-4 inline-block rounded-full border border-accent-yellow/30 bg-accent-yellow/10 px-4 py-1`}
                      >
                        <span className="text-sm font-semibold text-accent-yellow">
                          STEP {process.step}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-xl md:text-2xl font-bold text-white transition-colors group-hover:text-accent-yellow">
                        {process.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm md:text-base leading-relaxed text-white/70">
                        {process.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-4 sm:left-6 md:left-1/2 z-10 h-4 w-4 rounded-full border-4 border-primary-black bg-accent-yellow md:-translate-x-1/2" />

                  {/* Spacer for even layout */}
                  <div className="hidden flex-1 md:block" />
                </motion.div>
              );
            })}
          </div>

          {/* End marker */}
          <div className="absolute bottom-0 left-4 sm:left-6 md:left-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent-yellow to-accent-gold md:-translate-x-1/2">
            <div className="h-4 w-4 rounded-full border-2 border-primary-black" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default EventProcess;
