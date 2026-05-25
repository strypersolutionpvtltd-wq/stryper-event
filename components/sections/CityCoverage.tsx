"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import Container from "@/components/ui/Container";

const CITIES = [
  "Jaipur", "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai",
  "Kolkata", "Pune", "Ahmedabad", "Gurgaon", "Noida", "Lucknow",
  "Chandigarh", "Udaipur", "Jodhpur", "Goa", "Agra", "Indore",
  "Bhopal", "Surat", "Vadodara", "Nagpur", "Kochi", "Coimbatore",
];

const CityCoverage = () => {
  return (
    <section className="py-20 bg-primary-black">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-yellow/30 bg-accent-yellow/5 px-4 py-1.5 mb-4">
            <MapPin className="h-4 w-4 text-accent-yellow" />
            <span className="text-sm text-accent-yellow">Pan India Presence</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            We Serve Across <span className="text-gradient">India</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            From metro cities to tourist destinations — we plan and manage events everywhere.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {CITIES.map((city, i) => (
            <motion.div
              key={city}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:border-accent-yellow/40 hover:text-accent-yellow transition-colors cursor-default"
            >
              <MapPin size={12} className="text-accent-yellow" />
              {city}
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center text-white/40 text-sm mt-8"
        >
          + 50 more cities across India
        </motion.p>
      </Container>
    </section>
  );
};

export default CityCoverage;
