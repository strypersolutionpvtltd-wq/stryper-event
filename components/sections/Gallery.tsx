"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { COMPANY_CONTACT } from "@/constants";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All" },
    { id: "corporate", label: "Corporate" },
    { id: "sports", label: "Sports" },
    { id: "weddings", label: "Weddings" },
    { id: "brand", label: "Promotion" },
    { id: "fabrication", label: "Fab" },
  ];

  const galleryItems = [
    {
      id: 1,
      category: "corporate",
      title: "Award Show Host",
      image: "/images/awards-new.jpg",
      type: "image",
    },
    {
      id: 2,
      category: "brand",
      title: "Concert Ambiance",
      image: "/images/production-new.jpg",
      type: "image",
    },
    {
      id: 3,
      category: "brand",
      title: "Major Concert Setup",
      image: "/images/gallery/coldplay-concert-in-mumbai-143846109-1x1.webp",
      type: "image",
    },
    {
      id: 4,
      category: "brand",
      title: "Live Concert",
      image: "/images/gallery/concert.webp",
      type: "image",
    },
    {
      id: 5,
      category: "weddings",
      title: "Live Band Performance",
      image:
        "/images/gallery/Katherine-Marchand-Weddings_Three-ways-you-can-utilize-a-live-band-at-your-wedding_5-1-1024x683.jpg.jpeg",
      type: "image",
    },
    {
      id: 6,
      category: "weddings",
      title: "Wedding Sangeet",
      image: "/images/gallery/ptaufiq-indian-wedding-cancun-mexico-sangeet.jpg.jpeg",
      type: "image",
    },
    {
      id: 7,
      category: "corporate",
      title: "Corporate Event",
      image: "/images/corporate-new.jpg",
      type: "image",
    },
    {
      id: 8,
      category: "sports",
      title: "Sports Event",
      image: "/images/sports-new.jpg",
      type: "image",
    },
    {
      id: 9,
      category: "sports",
      title: "Tournament Day",
      image: "/images/gallery/IMG_1856.JPG.jpeg",
      type: "image",
    },
    {
      id: 10,
      category: "brand",
      title: "Brand Promotion",
      image: "/images/brand.jpg",
      type: "image",
    },
    {
      id: 11,
      category: "corporate",
      title: "Corporate Gala Video",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.11 PM (1).mp4",
      type: "video",
    },
    {
      id: 12,
      category: "sports",
      title: "Sports Action Video",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.12 PM (1).mp4",
      type: "video",
    },
    {
      id: 13,
      category: "brand",
      title: "Festival Celebration",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.13 PM.mp4",
      type: "video",
    },
    {
      id: 14,
      category: "weddings",
      title: "Grand Wedding Entry",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.13 PM (1).mp4",
      type: "video",
    },
    {
      id: 15,
      category: "sports",
      title: "Winning Moment",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.13 PM (2).mp4",
      type: "video",
    },
    {
      id: 16,
      category: "fabrication",
      title: "Stage Construction",
      video: "/videos/gallery/WhatsApp Video 2026-06-02 at 2.51.15 AM (2).mp4",
      type: "video",
    },
    {
      id: 17,
      category: "fabrication",
      title: "Exhibition Setup",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.11 PM.mp4",
      type: "video",
    },
    {
      id: 18,
      category: "corporate",
      title: "Corporate Seminar",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.12 PM.mp4",
      type: "video",
    },
    {
      id: 19,
      category: "fabrication",
      title: "New Setup",
      type: "coming-soon",
    },
    {
      id: 20,
      category: "corporate",
      title: "Executive Meet",
      type: "coming-soon",
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx(
        (selectedIdx - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  // Robust scroll lock logic for Gallery Lightbox
  useEffect(() => {
    if (selectedIdx === null || filteredItems[selectedIdx].type === "coming-soon") {
      return;
    }
    
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedIdx, filteredItems]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedIdx(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section id="gallery" className="relative py-16 md:py-32 overflow-hidden px-4 md:px-0">
      <Container className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          subtitle="OUR WORK"
          title="Past Events"
          align="center"
          className="mb-8 md:mb-12"
        />

        {/* Filter Buttons - Scrollable on mobile */}
        <div className="flex overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 md:overflow-visible md:pb-0 md:justify-center md:mb-12">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-nowrap md:flex-wrap gap-2 md:gap-3 shrink-0"
            >
            {categories.map((category) => (
                <motion.button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                    activeFilter === category.id
                    ? "bg-accent-yellow text-primary-black shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                    : "bg-white/5 text-white/60 border border-white/10 hover:border-accent-yellow/50"
                }`}
                >
                {category.label}
                </motion.button>
            ))}
            </motion.div>
        </div>

        {/* Gallery Grid - Responsive Columns */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                whileHover={item.type !== "coming-soon" ? { y: -8 } : {}}
                onClick={() => item.type !== "coming-soon" && setSelectedIdx(index)}
                className={`group relative aspect-[4/3] rounded-2xl overflow-hidden glass glow-border ${item.type !== "coming-soon" ? "cursor-pointer" : ""}`}
              >
                {/* Actual Media */}
                {item.type === "image" ? (
                  <Image
                    src={item.image || "/images/placeholder.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                ) : item.type === "video" ? (
                  <video
                    src={item.video}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                    onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/5 space-y-2">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center">
                      <Play size={16} className="text-white/20 md:w-5 md:h-5" />
                    </div>
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Coming Soon</span>
                  </div>
                )}

                {/* Overlay - Optimized for mobile tap */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={item.type !== "coming-soon" ? { opacity: 1 } : {}}
                  className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/40 to-transparent flex items-end p-4 md:p-6 transition-opacity"
                >
                  <div className="w-full">
                    <h3 className="text-base md:text-xl font-bold text-white mb-1 truncate">
                      {item.title}
                    </h3>
                    <span className="text-[10px] md:text-sm font-black text-accent-yellow uppercase tracking-widest">
                      {item.category}
                    </span>
                  </div>
                </motion.div>

                {/* Media Icon - Larger on mobile */}
                {item.type !== "coming-soon" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 md:w-10 md:h-10 bg-accent-yellow rounded-full flex items-center justify-center shadow-lg"
                  >
                    {item.type === "image" ? (
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-primary-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    ) : (
                      <Play className="w-4 h-4 md:w-5 md:h-5 text-primary-black ml-0.5" fill="currentColor" />
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox / Modal - Highly responsive */}
        <AnimatePresence>
          {selectedIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-primary-black/98 backdrop-blur-xl flex items-center justify-center p-2 md:p-12 touch-none"
              onClick={() => setSelectedIdx(null)}
            >
              {/* Controls */}
              <div className="absolute top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 flex justify-between items-center z-[110]">
                <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">
                  {selectedIdx + 1} / {filteredItems.length}
                </div>
                <div className="flex items-center gap-4 group">
                  <span className="hidden md:block text-white/40 text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-white transition-colors">Close Media</span>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-all"
                    onClick={() => setSelectedIdx(null)}
                  >
                    <X size={20} className="md:w-8 md:h-8" />
                  </motion.button>
                </div>
              </div>

              {/* Navigation - Hidden on small mobile */}
              <div className="hidden md:flex absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between px-4 md:px-10 z-[110] pointer-events-none">
                <motion.button
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white pointer-events-auto backdrop-blur-md border border-white/10"
                  onClick={handlePrev}
                >
                  <ChevronLeft size={32} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white pointer-events-auto backdrop-blur-md border border-white/10"
                  onClick={handleNext}
                >
                  <ChevronRight size={32} />
                </motion.button>
              </div>

              {/* Media Content */}
              <motion.div
                key={selectedIdx}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative max-w-5xl w-full aspect-[4/5] md:aspect-auto md:h-[80vh] flex items-center justify-center rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-black touch-auto overscroll-contain"
                onClick={(e) => e.stopPropagation()}
              >
                {filteredItems[selectedIdx].type === "image" ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={filteredItems[selectedIdx].image!}
                      alt={filteredItems[selectedIdx].title}
                      fill
                      className="object-contain"
                      sizes="95vw"
                      priority
                    />
                  </div>
                ) : (
                  <video
                    src={filteredItems[selectedIdx].video}
                    className="w-full h-full max-h-[80vh] object-contain"
                    controls
                    autoPlay
                    playsInline
                  />
                )}

                {/* Bottom Overlay - Highly optimized for mobile */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                    <div>
                      <p className="text-accent-yellow text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                        {filteredItems[selectedIdx].category}
                      </p>
                      <h3 className="text-lg md:text-2xl font-bold text-white leading-tight">
                        {filteredItems[selectedIdx].title}
                      </h3>
                    </div>
                    <motion.a
                      href={`https://wa.me/${COMPANY_CONTACT.whatsapp.replace(/[^0-9]/g, "")}?text=Hi, I am interested in knowing more about the ${filteredItems[selectedIdx].title} project.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
                    >
                      <MessageSquare size={14} fill="currentColor" /> Enquire Now
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};

export default Gallery;
