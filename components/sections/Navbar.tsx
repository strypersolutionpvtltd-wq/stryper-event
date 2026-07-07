"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, ChevronDown, Facebook, Instagram } from "lucide-react";
import { useEffect, useState, useRef } from "react";
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
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dropdown Handlers
  const handleMouseEnter = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    setIsVenueDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setIsVenueDropdownOpen(false);
    }, 300); // 300ms delay to make it stable
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isVenueDropdownOpen && !(event.target as Element).closest(".venue-dropdown-container")) {
        setIsVenueDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (dropdownTimerRef.current) {
        clearTimeout(dropdownTimerRef.current);
      }
    };
  }, [isVenueDropdownOpen]);

  // Prevent scroll and reset state when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setIsVenueDropdownOpen(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="fixed left-0 right-0 top-0 z-[100] w-full">
      {/* Main Navigation */}
      <nav className={cn(
        "w-full transition-all duration-500 py-3 md:py-4",
        isScrolled ? "bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl" : "bg-transparent"
      )}>
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo - Scalable */}
            <Link href="/" className="relative z-[110] flex items-center shrink-0">
              <div className="relative h-8 w-32 md:h-12 md:w-48">
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
                  className={cn("relative group", item.isDropdown && "venue-dropdown-container")}
                  onMouseEnter={() => item.isDropdown && handleMouseEnter()}
                  onMouseLeave={() => item.isDropdown && handleMouseLeave()}
                >
                  {item.isDropdown ? (
                    <Link
                      href={item.href}
                      className={cn(
                        "px-4 py-2 text-[13px] font-bold uppercase tracking-widest transition-all rounded-full flex items-center gap-1",
                        pathname.startsWith(item.href) || isVenueDropdownOpen
                          ? "text-primary-black bg-accent-yellow shadow-[0_0_20px_rgba(250,204,21,0.3)]" 
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {item.name} <ChevronDown size={14} className={cn("transition-transform duration-300", isVenueDropdownOpen && "rotate-180")} />
                    </Link>
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

                  {/* Venue Dropdown - With invisible bridge to maintain hover */}
                  {item.isDropdown && (
                    <>
                      {/* Invisible bridge to prevent closure on gap */}
                      <div className={cn(
                        "absolute top-full left-0 w-full h-4 bg-transparent",
                        !isVenueDropdownOpen && "hidden"
                      )} />
                      
                      <div className={cn(
                        "absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-72 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-5 shadow-2xl transition-all duration-300 origin-top z-[200]",
                        isVenueDropdownOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                      )}>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-white/5 pb-3">
                            <p className="text-[9px] font-black text-accent-yellow uppercase tracking-[0.3em]">Premium Venues</p>
                            <Link 
                              href="/venue" 
                              className="text-[9px] font-black text-white/40 uppercase tracking-widest hover:text-white transition-colors"
                              onClick={() => setIsVenueDropdownOpen(false)}
                            >
                              View All
                            </Link>
                          </div>
                          <div className="grid grid-cols-1 gap-1 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                            {VENUES.map((venue) => (
                              <Link
                                key={venue.slug}
                                href={`/venue/${venue.slug}`}
                                className="group/item flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all"
                                onClick={() => setIsVenueDropdownOpen(false)}
                              >
                                <div className="flex flex-col min-w-0">
                                  <span className="text-xs font-bold text-white/70 group-hover/item:text-accent-yellow transition-colors truncate">{venue.name}</span>
                                  <span className="text-[8px] text-white/30 uppercase tracking-widest truncate">{venue.location.split(',')[0]}</span>
                                </div>
                                <ChevronDown size={12} className="-rotate-90 text-white/20 group-hover/item:text-accent-yellow transition-colors shrink-0 ml-2" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-3 lg:hidden relative z-[110]">
              <a 
                href={`tel:${COMPANY_CONTACT.phoneRaw}`}
                className="hidden xs:flex h-11 w-11 items-center justify-center bg-accent-yellow rounded-xl text-primary-black shadow-lg shadow-accent-yellow/20 active:scale-95 transition-transform"
              >
                <Phone size={18} />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white active:scale-95 transition-transform overflow-hidden"
                aria-label="Toggle Menu"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Top Line */}
                  <motion.path
                    animate={isMobileMenuOpen ? { d: "M3 17L17 3", stroke: "#facc15" } : { d: "M3 5H17", stroke: "#ffffff" }}
                    transition={{ duration: 0.3 }}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Middle Line */}
                  <motion.path
                    animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    d="M3 10H17"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Bottom Line */}
                  <motion.path
                    animate={isMobileMenuOpen ? { d: "M3 3L17 17", stroke: "#facc15" } : { d: "M3 15H17", stroke: "#ffffff" }}
                    transition={{ duration: 0.3 }}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
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
            className="fixed inset-0 z-[105] bg-black/95 backdrop-blur-2xl flex flex-col lg:hidden"
          >
            {/* Decorative premium background glows */}
            <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-accent-yellow/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[250px] h-[250px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex-1 flex flex-col p-8 overflow-y-auto pt-28 pb-12 relative z-10">
              <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
                {NAV_ITEMS.map((item: any, index: number) => (
                  <motion.div 
                    key={item.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 150, 
                      damping: 18,
                      delay: 0.1 + index * 0.05 
                    }}
                  >
                    {item.isDropdown ? (
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "text-4xl xs:text-5xl font-black uppercase tracking-tighter transition-all flex-1",
                              pathname.startsWith(item.href) ? "text-accent-yellow" : "text-white/50 hover:text-white"
                            )}
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => setIsVenueDropdownOpen(!isVenueDropdownOpen)}
                            className="p-3 text-white/40 hover:text-white flex items-center justify-center"
                            aria-label="Toggle Venues Submenu"
                          >
                            <ChevronDown 
                              size={28} 
                              className={cn("transition-transform duration-300", isVenueDropdownOpen && "rotate-180")} 
                            />
                          </button>
                        </div>
                        
                        <motion.div
                          initial={false}
                          animate={isVenueDropdownOpen ? "open" : "collapsed"}
                          variants={{
                            open: { opacity: 1, height: "auto", marginTop: 16 },
                            collapsed: { opacity: 0, height: 0, marginTop: 0 }
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden border-l border-accent-yellow/20 pl-4 flex flex-col gap-3"
                        >
                          {VENUES.map((venue) => (
                            <Link
                              key={venue.slug}
                              href={`/venue/${venue.slug}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex flex-col"
                            >
                              <span className="text-lg font-bold text-white/80 active:text-accent-yellow transition-colors leading-tight">
                                {venue.name}
                              </span>
                              <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">
                                {venue.location.split(',')[0]}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "text-4xl xs:text-5xl font-black uppercase tracking-tighter transition-all",
                          pathname === item.href ? "text-accent-yellow" : "text-white/50 hover:text-white"
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="p-8 border-t border-white/5 bg-white/[0.02] relative z-10">
              <div className="flex flex-col gap-6 max-w-sm mx-auto">
                <div className="flex justify-between items-center">
                  <div className="flex gap-6">
                    <a href={COMPANY_CONTACT.facebook} className="text-white/40 hover:text-white transition-colors"><Facebook size={20} /></a>
                    <a href={COMPANY_CONTACT.instagram} className="text-white/40 hover:text-white transition-colors"><Instagram size={20} /></a>
                  </div>
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Stryper Events © 2026</p>
                </div>
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
