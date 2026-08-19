"use client";

import { motion } from "framer-motion";
import { MessageSquare, Video as VideoIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { COMPANY_CONTACT } from "@/constants";

interface EventItem {
  id: string | number;
  title: string;
  category: string;
  type: string;
  image?: string;
  video?: string;
  created_at?: string;
}

const EventCategories = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fallbackCategories: EventItem[] = [
    {
      id: "fb-1",
      title: "Award Show Host",
      category: "Corporate",
      type: "image",
      image: "/images/awards-new.jpg",
    },
    {
      id: "fb-2",
      title: "Concert Ambiance",
      category: "Promotion",
      type: "image",
      image: "/images/production-new.jpg",
    },
    {
      id: "fb-3",
      title: "Grand Wedding Highlights",
      category: "Weddings",
      type: "video",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.13 PM (1).mp4",
    },
    {
      id: "fb-4",
      title: "Corporate Excellence",
      category: "Corporate",
      type: "image",
      image: "/images/corporate-new.jpg",
    },
    {
      id: "fb-5",
      title: "Sports Event Tournament",
      category: "Sports",
      type: "image",
      image: "/images/sports-new.jpg",
    },
    {
      id: "fb-6",
      title: "Brand Promotion",
      category: "Promotion",
      type: "image",
      image: "/images/brand.jpg",
    },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        if (res.ok) {
          const data: EventItem[] = await res.json();
          if (data && data.length > 0) {
            // Sort latest first (newest top, oldest bottom)
            const sorted = [...data].sort((a, b) => {
              const timeA = a.created_at ? new Date(a.created_at).getTime() : Number(a.id) || 0;
              const timeB = b.created_at ? new Date(b.created_at).getTime() : Number(b.id) || 0;
              return timeB - timeA;
            });
            setEvents(sorted);
          } else {
            setEvents(fallbackCategories);
          }
        } else {
          setEvents(fallbackCategories);
        }
      } catch (err) {
        console.warn("Using fallback event categories:", err);
        setEvents(fallbackCategories);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section id="events" className="relative overflow-hidden py-24 md:py-32">
      {/* Background glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-yellow/10 blur-[120px]"
      />

      <Container className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          subtitle="EVENT TYPES"
          title="Events We Handle"
          align="center"
          className="mb-16"
        />

        {/* Dynamic Showcase Cards */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="relative h-full min-h-[320px] rounded-2xl bg-white/5 animate-pulse border border-white/10 flex items-center justify-center overflow-hidden"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 border-t-accent-yellow animate-spin" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((eventItem, index) => {
              const hasVideo = eventItem.type === "video" && eventItem.video;
              const hasImage = eventItem.image;

              return (
                <motion.a
                  key={eventItem.id || index}
                  href={`https://wa.me/${COMPANY_CONTACT.whatsapp.replace(/[^0-9]/g, "")}?text=Hi, I am interested in knowing more about the ${eventItem.title} event.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: (index % 6) * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className="glass glow-border transition-smooth group relative cursor-pointer overflow-hidden rounded-2xl h-full min-h-[320px] bg-black"
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-glow-gradient opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Media Background */}
                  <div className="absolute inset-0">
                    {hasImage ? (
                      <Image
                        src={eventItem.image!}
                        alt={eventItem.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : hasVideo ? (
                      <video
                        src={eventItem.video!}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        muted
                        loop
                        playsInline
                        onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                        onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <VideoIcon size={40} className="text-white/20" />
                      </div>
                    )}

                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col justify-end p-8">
                    <div className="space-y-3">
                      {/* Category Badge */}
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-yellow bg-accent-yellow/10 px-2.5 py-1 rounded border border-accent-yellow/20 inline-block">
                        {eventItem.category} • {eventItem.type === "video" ? "VIDEO" : eventItem.type === "image" ? "IMAGE" : "PLACEHOLDER"}
                      </span>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-accent-yellow leading-tight">
                        {eventItem.title}
                      </h3>

                      {/* WhatsApp Contact Action */}
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 pt-2 text-accent-yellow opacity-80 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="text-xs font-black uppercase tracking-widest">Contact Us</span>
                        <MessageSquare size={16} fill="currentColor" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Animated border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(250, 204, 21, 0.3), transparent)",
                      backgroundSize: "200% 100%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "200% 0%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.a>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
};

export default EventCategories;
