"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Menu, X, ChevronDown, Facebook, Instagram, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_ITEMS, COMPANY_CONTACT, VENUES } from "@/constants";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVenueDropdownOpen, setIsVenueDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="fixed left-0 right-0 top-0 z-[100] w-full">
      {/* Top Info Bar - Optimized for Mobile */}
      {!isScrolled && (
        <div className="bg-[#0a0a0a] border-b border-white/5 py-1.5 md:py-2">
          <Container>
            <div className="flex justify-between items-center text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] text-white/40 font-bold">
              <div className="flex gap-4 md:gap-6">
                <a href={`mailto:${COMPANY_CONTACT.email}`} className="hover:text-accent-yellow transition-colors flex items-center gap-1.5 md:gap-2">
                  <Mail size={10} className="md:w-3 md:h-3" /> 
                  <span className="hidden xs:inline">{COMPANY_CONTACT.email}</span>
                  <span className="xs:hidden">Email</span>
                </a>
                <a href={`tel:${COMPANY_CONTACT.phoneRaw}`} className="hover:text-accent-yellow transition-colors flex items-center gap-1.5 md:gap-2">
                  <Phone size={10} className="md:w-3 md:h-3" /> {COMPANY_CONTACT.phone}
                </a>
              </div>
              <div className="flex gap-3 md:gap-4">
                 <a href={COMPANY_CONTACT.facebook} className="hover:text-white transition-colors">FB</a>
                 <a href={COMPANY_CONTACT.instagram} className="hover:text-white transition-colors">IG</a>
                 <a href={COMPANY_CONTACT.twitter} className="hover:text-white transition-colors">TW</a>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Main Navigation */}
      <nav className={cn(
        "w-full transition-all duration-500 py-3 md:py-4",
        isScrolled ? "bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl" : "bg-transparent"
      )}>
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo - Scalable */}
            <Link href="/" className="relative z-[110] flex items-center shrink-0">
              <div className="relative h-7 w-28 md:h-12 md:w-48">
                <Image
                  src="/images/logo.png"
                  alt="Stryper Events"
                  fill
                  className="object-contain mix-blend-screen"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1 relative z-[110]">
              {NAV_ITEMS.map((item: any) => (
                <div 
                  key={item.name} 
                  className="relative group"
                  onMouseEnter={() => item.isDropdown && setIsVenueDropdownOpen(true)}
                  onMouseLeave={() => item.isDropdown && setIsVenueDropdownOpen(false)}
                >
                  {item.isDropdown ? (
                    <button
                      className={cn(
                        "px-4 py-2 text-[13px] font-bold uppercase tracking-widest transition-all rounded-full flex items-center gap-1",
                        pathname.startsWith(item.href)
                          ? "text-primary-black bg-accent-yellow shadow-[0_0_20px_rgba(250,204,21,0.3)]" 
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {item.name} <ChevronDown size={14} className={cn("transition-transform duration-300", isVenueDropdownOpen && "rotate-180")} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "px-4 py-2 text-[13px] font-bold uppercase tracking-widest transition-all rounded-full",
                        pathname === item.href 
                          ? "text-primary-black bg-accent-yellow shadow-[0_0_20px_rgba(250,204,21,0.3)]" 
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Venue Dropdown */}
                  {item.isDropdown && (
                    <div className={cn(
                      "absolute top-full left-0 mt-2 w-72 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl transition-all duration-300 origin-top-left",
                      isVenueDropdownOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    )}>
                      <div className="grid gap-1">
                        <p className="px-3 py-2 text-[10px] font-black text-accent-yellow uppercase tracking-widest border-b border-white/5 mb-2">Premium Jaipur Venues</p>
                        {VENUES.map((venue) => (
                          <Link
                            key={venue.slug}
                            href={`/venue/${venue.slug}`}
                            className="px-3 py-2.5 text-xs font-bold text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                            onClick={() => setIsVenueDropdownOpen(false)}
                          >
                            {venue.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:gap-4 lg:hidden relative z-[110]">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 md:p-3 bg-white/5 rounded-xl md:rounded-2xl text-white border border-white/10 active:scale-95 transition-transform"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={20} className="md:w-6 md:h-6" /> : <Menu size={20} className="md:w-6 md:h-6" />}
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile Fullscreen Menu - Premium Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[105] bg-black flex flex-col lg:hidden"
            >
              <div className="flex-1 flex flex-col justify-center p-8 overflow-y-auto">
                <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
                  {NAV_ITEMS.map((item: any, index: number) => (
                    <motion.div 
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      {item.isDropdown ? (
                        <div className="flex flex-col gap-4 border-l-2 border-accent-yellow/20 pl-6 py-2">
                          <span className="text-[10px] font-black text-accent-yellow uppercase tracking-[0.3em]">Our Venues</span>
                          {VENUES.slice(0, 5).map((venue) => (
                            <Link
                              key={venue.slug}
                              href={`/venue/${venue.slug}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-xl font-bold uppercase text-white/50 hover:text-white"
                            >
                              {venue.name}
                            </Link>
                          ))}
                          <Link
                            href="/venue"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-sm font-bold text-accent-yellow underline underline-offset-4"
                          >
                            View All Venues
                          </Link>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "text-5xl font-black uppercase tracking-tighter transition-all",
                            pathname === item.href ? "text-accent-yellow" : "text-white/20 hover:text-white"
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="p-8 border-t border-white/5 bg-white/[0.02]">
                <div className="flex justify-between items-center max-w-sm mx-auto">
                  <div className="flex gap-6">
                    <a href={COMPANY_CONTACT.facebook} className="text-white/40 hover:text-white transition-colors"><Facebook size={20} /></a>
                    <a href={COMPANY_CONTACT.instagram} className="text-white/40 hover:text-white transition-colors"><Instagram size={20} /></a>
                    <a href={COMPANY_CONTACT.twitter} className="text-white/40 hover:text-white transition-colors"><Twitter size={20} /></a>
                  </div>
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Stryper Events © 2026</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
