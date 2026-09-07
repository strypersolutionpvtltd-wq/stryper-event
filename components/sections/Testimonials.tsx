"use client";

import { motion } from "framer-motion";
import { Quote, Star, MessageSquare, PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { COMPANY_CONTACT } from "@/constants";

interface TestimonialItem {
  id?: string;
  name: string;
  company?: string;
  role?: string;
  eventName?: string;
  rating: number;
  text: string;
}

const defaultTestimonials: TestimonialItem[] = [
  {
    name: "Sunil Verma",
    company: "",
    role: "Groom",
    eventName: "Destination Wedding Jaipur",
    rating: 5,
    text: "Unbelievable experience! Stryper Events managed our wedding seamlessly.",
  },
  {
    name: "Rajesh Kumar",
    company: "Tech Solutions Pvt Ltd",
    role: "CEO",
    eventName: "Corporate Annual Conference",
    rating: 5,
    text: "Stryper made our annual conference a huge success. Everything was perfect from start to finish. Highly professional team!",
  },
  {
    name: "Priya Sharma",
    company: "Fashion Brand India",
    role: "Marketing Head",
    eventName: "Product Launch Gala",
    rating: 5,
    text: "Our product launch event was amazing! The team handled everything smoothly. Great attention to detail and very responsive.",
  },
  {
    name: "Amit Patel",
    company: "Sports Academy",
    role: "Director",
    eventName: "Sports Tournament",
    rating: 5,
    text: "They organized our sports tournament perfectly. On-time setup, great coordination, and excellent management throughout the event.",
  },
  {
    name: "Ananya & Siddharth Singhania",
    company: "Singhania Group",
    role: "Bride & Groom",
    eventName: "Royal Destination Wedding @ Fairmont",
    rating: 5,
    text: "Stryper Events turned our dream wedding into reality! From the grand baraat entry to the mandap decor, everything was perfection.",
  },
  {
    name: "Vikram Rathore",
    company: "Heritage Hospitality",
    role: "Managing Director",
    eventName: "Cultural Festival 2024",
    rating: 5,
    text: "Unmatched hospitality and event planning. Their vendor connections and on-ground management in Jaipur are truly second to none.",
  },
];

// Single Review Card component for marquee
function ReviewCard({ testimonial }: { testimonial: TestimonialItem }) {
  return (
    <div className="w-[320px] sm:w-[360px] md:w-[410px] shrink-0 glass glow-border rounded-2xl md:rounded-3xl p-6 md:p-7 relative flex flex-col justify-between bg-white/[0.02] hover:bg-white/[0.06] hover:border-accent-yellow/50 transition-all duration-300 select-none group">
      <div>
        {/* Event Name Tag (if present) */}
        {testimonial.eventName && (
          <div className="mb-3">
            <span className="px-3 py-1 bg-accent-yellow/10 border border-accent-yellow/20 text-accent-yellow text-[10px] font-black uppercase tracking-widest rounded-full inline-block truncate max-w-full">
              {testimonial.eventName}
            </span>
          </div>
        )}

        {/* Quote Icon */}
        <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
          <Quote className="w-12 h-12 text-accent-yellow" />
        </div>

        {/* Rating Stars */}
        <div className="flex gap-1 mb-3">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 text-accent-yellow fill-accent-yellow"
            />
          ))}
        </div>

        {/* Text */}
        <p className="text-white/80 text-sm leading-relaxed mb-6 line-clamp-4 relative z-10">
          &quot;{testimonial.text}&quot;
        </p>
      </div>

      {/* Client Info */}
      <div className="flex items-center gap-3.5 pt-4 border-t border-white/10 mt-auto">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent-yellow/20 to-accent-gold/20 flex items-center justify-center border border-accent-yellow/30 shrink-0">
          <span className="text-accent-yellow font-bold text-base">
            {testimonial.name ? testimonial.name.charAt(0).toUpperCase() : "C"}
          </span>
        </div>
        <div className="min-w-0">
          <h4 className="text-white font-bold text-sm truncate">
            {testimonial.name}
          </h4>
          <p className="text-xs text-white/50 truncate">
            {[testimonial.role, testimonial.company].filter(Boolean).join(", ") || "Valued Client"}
          </p>
        </div>
      </div>
    </div>
  );
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(defaultTestimonials);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setTestimonials(data);
          }
        }
      } catch (err) {
        // Fallback to default testimonials if API fails
      }
    }
    loadReviews();
  }, []);

  // Split reviews into two continuous rows
  const midPoint = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, midPoint);
  const row2 = testimonials.slice(midPoint).length > 0 ? testimonials.slice(midPoint) : testimonials;

  // Multiply items so the marquee loop is always continuous and seamless
  const row1Loop = [...row1, ...row1, ...row1, ...row1];
  const row2Loop = [...row2, ...row2, ...row2, ...row2];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white/[0.01]">
      <Container className="relative z-10 mb-12">
        {/* Section Heading */}
        <SectionHeading
          subtitle="TESTIMONIALS"
          title="What Our Clients Say"
          align="center"
          className="mb-6"
        />
        <p className="text-center text-white/50 text-xs md:text-sm max-w-xl mx-auto -mt-10">
          Read real stories from our clients across India. Hover over any card to pause and read.
        </p>
      </Container>

      {/* Full-width Infinite Continuous Marquee Container */}
      <div className="relative w-full overflow-hidden space-y-6">
        {/* Left & Right Gradient Shadow Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-primary-black via-primary-black/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-primary-black via-primary-black/80 to-transparent z-20" />

        {/* Row 1: Scrolling Left Continuously */}
        <div className="relative overflow-hidden py-1">
          <div className="animate-marquee-left marquee-pause flex gap-6">
            {row1Loop.map((testimonial, idx) => (
              <ReviewCard key={`r1-${idx}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right Continuously */}
        <div className="relative overflow-hidden py-1">
          <div className="animate-marquee-right marquee-pause flex gap-6">
            {row2Loop.map((testimonial, idx) => (
              <ReviewCard key={`r2-${idx}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>

      <Container className="relative z-10 mt-14">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white/70 mb-6 text-base">
            Had an event with us? We&apos;d love to hear your story! Join{" "}
            <span className="text-accent-yellow font-bold">100+</span> happy clients
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/clients"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-accent-yellow text-primary-black font-black uppercase tracking-widest rounded-full hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              View All Reviews
            </Link>

            <Link
              href="/review"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest rounded-full border border-white/15 transition-all hover:scale-105 active:scale-95"
            >
              <PlusCircle size={18} />
              Write a Review
            </Link>

            <motion.a
              href={`https://wa.me/${COMPANY_CONTACT.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest rounded-full border border-white/15 transition-all"
            >
              <MessageSquare size={18} />
              Contact Us
            </motion.a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Testimonials;
