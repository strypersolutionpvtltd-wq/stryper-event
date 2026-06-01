"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Lightbulb, Target } from "lucide-react";
import React from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { CASE_STUDIES } from "@/constants";

const CaseStudies = () => {
  return (
    <section id="case-studies" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          subtitle="CASE STUDIES"
          title="Stories of Success"
          align="center"
          className="mb-16"
        />

        <div className="space-y-16 md:space-y-24">
          {CASE_STUDIES.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col gap-8 md:gap-12 lg:items-center ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Image Side */}
              <div className="group relative flex-1 overflow-hidden rounded-2xl md:rounded-3xl border border-white/10">
                <img
                  src={study.image}
                  alt={study.title}
                  className="aspect-video lg:aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                   <span className="rounded-full bg-accent-yellow px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary-black">
                     {study.category}
                   </span>
                </div>
              </div>

              {/* Content Side */}
              <div className="flex-1 space-y-6 md:space-y-8 px-2 md:px-0">
                <h3 className="text-2xl font-bold text-white md:text-4xl">
                  {study.title}
                </h3>

                <div className="grid gap-4 md:gap-6">
                  {/* Challenge */}
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                      <Target size={18} />
                    </div>
                    <div>
                      <h4 className="mb-0.5 font-bold text-white text-sm md:text-base">The Challenge</h4>
                      <p className="text-xs md:text-sm leading-relaxed text-white/50">
                        {study.challenge}
                      </p>
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-yellow/10 text-accent-yellow">
                      <Lightbulb size={18} />
                    </div>
                    <div>
                      <h4 className="mb-0.5 font-bold text-white text-sm md:text-base">Our Solution</h4>
                      <p className="text-xs md:text-sm leading-relaxed text-white/50">
                        {study.solution}
                      </p>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <h4 className="mb-0.5 font-bold text-white text-sm md:text-base">The Result</h4>
                      <p className="text-xs md:text-sm leading-relaxed text-white/50">
                        {study.result}
                      </p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 font-semibold text-accent-yellow text-sm md:text-base"
                >
                  View Details <ArrowUpRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CaseStudies;
