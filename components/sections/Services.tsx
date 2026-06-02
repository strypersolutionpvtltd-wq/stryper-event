"use client";

import { motion } from "framer-motion";
import React from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import { SERVICES, COMPANY_CONTACT } from "@/constants";
import { MessageSquare } from "lucide-react";

const Services = () => {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white/[0.01] py-24 md:py-32"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(250,204,21,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <Container className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          subtitle="OUR SERVICES"
          title="What We Do"
          align="center"
          className="mb-16"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white/70 text-lg max-w-3xl mx-auto mb-16"
        >
          From corporate events to weddings, we handle everything. Our team
          takes care of planning, setup, and management so you can focus on
          enjoying your event.
        </motion.p>

        {/* Services Grid */}
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              slug={service.slug}
              description={service.description}
              icon={service.icon}
              image={service.image}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href={`https://wa.me/${COMPANY_CONTACT.whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent-yellow text-primary-black font-black uppercase tracking-widest rounded-full hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-shadow"
          >
            <MessageSquare size={20} fill="currentColor" />
            Contact Us
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
};

export default Services;
