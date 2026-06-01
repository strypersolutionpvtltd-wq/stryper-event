"use client";

import { motion } from "framer-motion";
import { MessageCircle, Layout, Calendar, Zap, CheckCircle } from "lucide-react";
import React from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { EVENT_PROCESS } from "@/constants";

const iconMap = {
  "message-circle": MessageCircle,
  layout: Layout,
  calendar: Calendar,
  zap: Zap,
  "check-circle": CheckCircle,
};

const ProcessRoadmap = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background decoration */}
      <div className="absolute left-0 top-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-yellow/5 blur-[80px]" />

      <Container className="relative z-10">
        <SectionHeading
          subtitle="OUR PROCESS"
          title="The 5-Step Journey"
          align="center"
          className="mb-20"
        />

        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-accent-yellow/30 via-accent-yellow/10 to-transparent lg:block" />

          <div className="space-y-16 md:space-y-24">
            {EVENT_PROCESS.map((step, index) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap] || CheckCircle;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className={`group/step flex flex-col items-center gap-8 lg:flex-row p-6 rounded-[2rem] transition-colors hover:bg-white/[0.02] ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 text-center lg:text-left ${!isEven ? "lg:text-right" : ""}`}>
                    <div className="mb-2 inline-flex items-center gap-3">
                      <span className="text-4xl font-black text-white/10 lg:text-6xl group-hover/step:text-accent-yellow/20 transition-colors">
                        {step.step}
                      </span>
                      <h3 className="text-xl font-bold text-white md:text-2xl group-hover/step:text-accent-yellow transition-colors">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mx-auto max-w-md text-white/50 text-sm md:text-base lg:mx-0 lg:max-w-lg group-hover/step:text-white/80 transition-colors">
                      {step.description}
                    </p>
                  </div>

                  {/* Icon Circle */}
                  <div className="relative z-20 shrink-0">
                    <motion.div 
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8, ease: "anticipate" }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-black border border-accent-yellow/50 shadow-[0_0_15px_rgba(250,204,21,0.1)] group-hover/step:border-accent-yellow group-hover/step:shadow-[0_0_25px_rgba(250,204,21,0.3)]"
                    >
                      <Icon className="h-6 w-6 text-accent-yellow" />
                    </motion.div>
                    {/* Simplified ring for performance */}
                    <div className="absolute inset-0 -z-10 rounded-full bg-accent-yellow/10 animate-pulse group-hover/step:bg-accent-yellow/20" />
                  </div>

                  {/* Spacer for desktop alignment */}
                  <div className="hidden flex-1 lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProcessRoadmap;
