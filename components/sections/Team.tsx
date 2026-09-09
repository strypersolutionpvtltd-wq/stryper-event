"use client";

import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Sparkles, Award, ShieldCheck, Quote } from "lucide-react";

const Team = () => {
  return (
    <section id="team" className="relative py-20 md:py-32 overflow-hidden bg-white/[0.01]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-yellow/5 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          subtitle="LEADERSHIP"
          title="Meet Our Chairman"
          align="center"
          className="mb-12 md:mb-16"
        />

        {/* Grand Executive Chairman Showcase Card */}
        <div className="max-w-4xl lg:max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass glow-border rounded-3xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 relative overflow-hidden bg-white/[0.02] border border-white/10 hover:border-accent-yellow/40 transition-all duration-500 shadow-2xl"
          >
            {/* Ambient Background Quote Icon */}
            <div className="absolute top-6 right-8 opacity-5 pointer-events-none hidden sm:block">
              <Quote size={140} className="text-accent-yellow" />
            </div>

            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Chairman Photo Column */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-full md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden glass border-2 border-accent-yellow/30 shadow-[0_0_40px_rgba(250,204,21,0.15)] group">
                  <Image
                    src="/images/chairman_final.png"
                    alt="Kartikey Niranjan - Chairman Stryper Events"
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 288px, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Gold Corner Badge */}
                  <div className="absolute bottom-4 left-4 right-4 text-center z-10">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent-yellow text-primary-black font-black text-[10px] uppercase tracking-widest shadow-lg">
                      <Award size={12} /> 8+ Years Experience
                    </span>
                  </div>
                </div>
              </div>

              {/* Chairman Info & Vision Column */}
              <div className="md:col-span-7 space-y-6 text-left">
                <div>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-yellow/10 border border-accent-yellow/20 text-accent-yellow text-xs font-black uppercase tracking-widest mb-3">
                    <Sparkles size={13} /> Founder & Strategic Visionary
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-2">
                    Kartikey Niranjan
                  </h3>
                  <p className="text-accent-yellow font-bold text-sm sm:text-base tracking-wider uppercase">
                    Chairman • Stryper Event Management
                  </p>
                </div>

                {/* Chairman Vision Message */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/5 relative">
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed italic">
                    &ldquo;At Stryper Events, our mission is to transform celebrations into unforgettable milestones and execute corporate summits with flawless precision. With operational hubs in Jaipur and Delhi NCR, our passion is delivering world-class event experiences with uncompromising quality.&rdquo;
                  </p>
                </div>

                {/* Key Leadership Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <ShieldCheck className="text-accent-yellow shrink-0" size={18} />
                    <span className="text-xs sm:text-sm font-semibold text-white/90">
                      500+ Successful Events
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <ShieldCheck className="text-accent-yellow shrink-0" size={18} />
                    <span className="text-xs sm:text-sm font-semibold text-white/90">
                      Jaipur &amp; Delhi NCR Hubs
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <ShieldCheck className="text-accent-yellow shrink-0" size={18} />
                    <span className="text-xs sm:text-sm font-semibold text-white/90">
                      Royal Palace Specialist
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <ShieldCheck className="text-accent-yellow shrink-0" size={18} />
                    <span className="text-xs sm:text-sm font-semibold text-white/90">
                      Pan-India Production
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Team;
