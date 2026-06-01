"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import React from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { TEAM_MEMBERS } from "@/constants";

const Team = () => {
  return (
    <section id="team" className="relative py-24 md:py-32 overflow-hidden bg-white/[0.01]">
      <Container>
        <SectionHeading
          subtitle="OUR EXPERTS"
          title="Meet the Visionaries"
          align="center"
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Profile Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 glass mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                
                {/* Info Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                   <p className="text-white/80 text-sm leading-relaxed mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     {member.bio}
                   </p>
                </div>
              </div>

              {/* Name & Role */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-accent-yellow transition-colors">
                  {member.name}
                </h3>
                <p className="text-accent-yellow font-medium text-sm uppercase tracking-wider mb-2">
                  {member.role}
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs">
                  <Briefcase size={14} />
                  {member.experience}
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
