"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import React from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Tech Solutions Pvt Ltd",
      role: "CEO",
      rating: 5,
      text: "Stryper made our annual conference a huge success. Everything was perfect from start to finish. Highly professional team!",
      image: "/images/testimonials/client-1.jpg",
    },
    {
      name: "Priya Sharma",
      company: "Fashion Brand India",
      role: "Marketing Head",
      text: "Our product launch event was amazing! The team handled everything smoothly. Great attention to detail and very responsive.",
      rating: 5,
      image: "/images/testimonials/client-2.jpg",
    },
    {
      name: "Amit Patel",
      company: "Sports Academy",
      role: "Director",
      text: "They organized our sports tournament perfectly. On-time setup, great coordination, and excellent management throughout the event.",
      rating: 5,
      image: "/images/testimonials/client-3.jpg",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white/[0.01]">
      <Container className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          subtitle="TESTIMONIALS"
          title="What Our Clients Say"
          align="center"
          className="mb-16"
        />

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass glow-border rounded-2xl p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-16 h-16 text-accent-yellow" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-accent-yellow fill-accent-yellow"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/80 mb-6 leading-relaxed relative z-10">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-yellow/20 to-accent-gold/20 flex items-center justify-center">
                  <span className="text-accent-yellow font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-white/60">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white/70 mb-6">
            Join <span className="text-accent-yellow font-bold">100+</span>{" "}
            happy clients
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-accent-yellow text-primary-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-shadow"
          >
            Start Your Event
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
};

export default Testimonials;
