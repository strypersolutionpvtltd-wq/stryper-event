"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useState, useEffect } from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All Events" },
    { id: "corporate", label: "Corporate" },
    { id: "sports", label: "Sports" },
    { id: "brand", label: "Brand Promotion" },
  ];

  const galleryItems = [
    {
      id: 1,
      category: "corporate",
      title: "Award Show Host",
      image: "/images/gallery/Award-shows-Host.jpg.jpeg",
      type: "image",
    },
    {
      id: 2,
      category: "brand",
      title: "Concert Ambiance",
      image: "/images/gallery/1120880-ambiance-concert.jpg.jpeg",
      type: "image",
    },
    {
      id: 3,
      category: "brand",
      title: "Coldplay Concert",
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
      category: "corporate",
      title: "Live Band Performance",
      image:
        "/images/gallery/Katherine-Marchand-Weddings_Three-ways-you-can-utilize-a-live-band-at-your-wedding_5-1-1024x683.jpg.jpeg",
      type: "image",
    },
    {
      id: 6,
      category: "corporate",
      title: "Wedding Sangeet",
      image: "/images/gallery/ptaufiq-indian-wedding-cancun-mexico-sangeet.jpg.jpeg",
      type: "image",
    },
    {
      id: 7,
      category: "corporate",
      title: "Corporate Event",
      image: "/images/gallery/w5-1024x782.jpg.jpeg",
      type: "image",
    },
    {
      id: 8,
      category: "sports",
      title: "Sports Event",
      image: "/images/gallery/IMG_1850.JPG.jpeg",
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
      image: "/images/gallery/images.jpg.jpeg",
      type: "image",
    },
    {
      id: 11,
      category: "brand",
      title: "Event Highlight Video",
      video: "/videos/gallery/IMG_3192.MP4",
      type: "video",
    },
    {
      id: 12,
      category: "corporate",
      title: "Corporate Gala Video",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.11 PM (1).mp4",
      type: "video",
    },
    {
      id: 13,
      category: "brand",
      title: "Stage Performance",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.11 PM.mp4",
      type: "video",
    },
    {
      id: 14,
      category: "sports",
      title: "Sports Action",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.12 PM (1).mp4",
      type: "video",
    },
    {
      id: 15,
      category: "brand",
      title: "Musical Night",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.12 PM (2).mp4",
      type: "video",
    },
    {
      id: 16,
      category: "corporate",
      title: "Client Meet Video",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.12 PM.mp4",
      type: "video",
    },
    {
      id: 17,
      category: "brand",
      title: "Grand Entry",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.13 PM (1).mp4",
      type: "video",
    },
    {
      id: 18,
      category: "sports",
      title: "Winning Moment",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.13 PM (2).mp4",
      type: "video",
    },
    {
      id: 19,
      category: "brand",
      title: "Festival Celebration",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.13 PM.mp4",
      type: "video",
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
    if (selectedIdx === null) {
      return;
    }
    
    const scrollY = window.scrollY;
    document.body.classList.add("no-scroll");
    document.body.style.top = `-${scrollY}px`;
    
    return () => {
      document.body.classList.remove("no-scroll");
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, [selectedIdx]);

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
    <section id="gallery" className="relative py-24 md:py-32 overflow-hidden">
      <Container className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          subtitle="OUR WORK"
          title="Past Events"
          align="center"
          className="mb-12"
        />

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeFilter === category.id
                  ? "bg-accent-yellow text-primary-black shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                  : "bg-white/5 text-white/80 border border-white/10 hover:border-accent-yellow/50"
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                whileHover={{ y: -8 }}
                onClick={() => setSelectedIdx(index)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden glass glow-border cursor-pointer"
              >
                {/* Actual Media */}
                {item.type === "image" ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <video
                    src={item.video}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    loop
                    onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                    onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                  />
                )}

                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/40 to-transparent flex items-end p-6 transition-opacity"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <span className="text-sm text-accent-yellow capitalize">
                      {item.category}
                    </span>
                  </div>
                </motion.div>

                {/* Media Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 w-10 h-10 bg-accent-yellow rounded-full flex items-center justify-center shadow-lg"
                >
                  {item.type === "image" ? (
                    <svg
                      className="w-5 h-5 text-primary-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                      />
                    </svg>
                  ) : (
                    <Play className="w-5 h-5 text-primary-black ml-0.5" fill="currentColor" />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white/5 border border-white/10 hover:border-accent-yellow/50 rounded-full text-white font-medium transition-all"
          >
            Load More
          </motion.button>
        </motion.div>

        {/* Lightbox / Modal */}
        <AnimatePresence>
          {selectedIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-primary-black/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 touch-none"
              onClick={() => setSelectedIdx(null)}
            >
              {/* Controls */}
              <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[110]">
                <div className="text-white/50 font-medium">
                  {selectedIdx + 1} / {filteredItems.length}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
                  onClick={() => setSelectedIdx(null)}
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Navigation */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-10 z-[110] pointer-events-none">
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
                className="relative max-w-5xl w-full aspect-video md:aspect-auto md:h-[80vh] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl bg-black touch-auto overscroll-contain"
                onClick={(e) => e.stopPropagation()}
              >
                {filteredItems[selectedIdx].type === "image" ? (
                  <img
                    src={filteredItems[selectedIdx].image}
                    alt={filteredItems[selectedIdx].title}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <video
                    src={filteredItems[selectedIdx].video}
                    className="w-full h-full max-h-[80vh] object-contain"
                    controls
                    autoPlay
                  />
                )}

                {/* Bottom Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {filteredItems[selectedIdx].title}
                  </h3>
                  <p className="text-accent-yellow capitalize">
                    {filteredItems[selectedIdx].category}
                  </p>
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
