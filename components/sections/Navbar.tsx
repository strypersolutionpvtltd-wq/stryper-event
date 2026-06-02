"use client";

import { Mail, Phone, Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_ITEMS, COMPANY_CONTACT, VENUES } from "@/constants";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Link from "next/link";
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-[100] w-full">
      {/* Top Info Bar */}
      {!isScrolled && (
        <div className="hidden md:block bg-[#0a0a0a] border-b border-white/5 py-2">
          <Container>
            <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
              <div className="flex gap-6">
                <a href={`mailto:${COMPANY_CONTACT.email}`} className="hover:text-accent-yellow transition-colors flex items-center gap-2">
                  <Mail size={12} /> {COMPANY_CONTACT.email}
                </a>
                <a href={`tel:${COMPANY_CONTACT.phoneRaw}`} className="hover:text-accent-yellow transition-colors flex items-center gap-2">
                  <Phone size={12} /> {COMPANY_CONTACT.phone}
                </a>
              </div>
              <div className="flex gap-4">
                 <a href={COMPANY_CONTACT.facebook} className="hover:text-white">FB</a>
                 <a href={COMPANY_CONTACT.instagram} className="hover:text-white">IG</a>
                 <a href={COMPANY_CONTACT.twitter} className="hover:text-white">TW</a>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Main Navigation */}
      <nav className={cn(
        "w-full transition-all duration-500 py-4",
        isScrolled ? "bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl" : "bg-transparent"
      )}>
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-[110] flex items-center">
              <img
                src="/images/logo.png"
                alt="Stryper Events"
                className="h-8 md:h-12 w-auto object-contain mix-blend-screen"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1 relative z-[110]">
              {NAV_ITEMS.map((item) => (
                <div 
                  key={item.name} 
                  className="relative group"
                  onMouseEnter={() => item.isDropdown && setIsVenueDropdownOpen(true)}
                  onMouseLeave={() => item.isDropdown && setIsVenueDropdownOpen(false)}
                >
                  {item.isDropdown ? (
                    <button
                      className={cn(
                        "px-5 py-2 text-sm font-bold uppercase tracking-widest transition-all rounded-full flex items-center gap-1",
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
                        "px-5 py-2 text-sm font-bold uppercase tracking-widest transition-all rounded-full",
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
            <div className="flex items-center gap-4 lg:hidden relative z-[110]">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 bg-white/5 rounded-2xl text-white border border-white/10"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile Fullscreen Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[105] bg-black flex flex-col items-center justify-center p-8 lg:hidden animate-in fade-in duration-300">
            <div className="flex flex-col gap-4 w-full max-w-xs text-center overflow-y-auto max-h-[70vh] py-8">
              {NAV_ITEMS.map((item, index) => (
                <div key={item.name}>
                  {item.isDropdown ? (
                    <div className="flex flex-col gap-4">
                      <span className="text-sm font-black text-accent-yellow uppercase tracking-widest">Premium Venues</span>
                      {VENUES.map((venue) => (
                        <Link
                          key={venue.slug}
                          href={`/venue/${venue.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-2xl font-bold uppercase text-white/40 hover:text-white"
                        >
                          {venue.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-4xl font-black uppercase tracking-tighter transition-all",
                        pathname === item.href ? "text-accent-yellow" : "text-white/20 hover:text-white"
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            
            <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-8 text-white/40">
               <a href={COMPANY_CONTACT.facebook}>FB</a>
               <a href={COMPANY_CONTACT.instagram}>IG</a>
               <a href={COMPANY_CONTACT.linkedin}>LN</a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
