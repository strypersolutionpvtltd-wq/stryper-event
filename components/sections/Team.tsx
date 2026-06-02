"use client";

import { motion } from "framer-motion";
import React from "react";
import { TEAM_MEMBERS } from "@/constants";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const Team = () => {
  return (
    <section id="team" className="relative py-24 md:py-32 overflow-hidden bg-white/[0.01]">
      <Container>
        <SectionHeading
          subtitle="EXPERT MINDS"
          title="The Heart of Our Success"
          align="center"
          className="mb-16 md:mb-24"
        />

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden glass glow-border p-4 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />
                
                {/* Image Placeholder / Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end items-center text-center space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-accent-yellow transition-colors leading-none">
                      {member.name}
                    </h3>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
                      {member.role}
                    </p>
                  </div>

                  {/* Experience Tag */}
                  <div className="px-4 py-1.5 rounded-full bg-accent-yellow/10 border border-accent-yellow/20 backdrop-blur-md">
                    <span className="text-[10px] font-black text-accent-yellow uppercase tracking-widest">
                      {member.experience} EXP
                    </span>
                  </div>

                  {/* Bio - Appears on Hover */}
                  <p className="text-xs text-white/60 font-medium leading-relaxed max-h-0 group-hover:max-h-32 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    {member.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Team;
