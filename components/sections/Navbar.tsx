"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Facebook, Instagram, Mail, Menu, Phone, Twitter, X, Youtube } from "lucide-react";
import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { NAV_ITEMS, COMPANY_CONTACT } from "@/constants";
import { cn } from "@/lib/utils";
import { useGetStartedModal } from "@/hooks/useModal";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { onOpen } = useGetStartedModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-50">
      {/* Top Bar - hides on scroll */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-[#111] border-b border-white/[0.08]"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-9 items-center justify-between">

                {/* Left - Email + Call with divider */}
                <div className="flex items-center text-[11px] text-white/50">
                  <a href={`mailto:${COMPANY_CONTACT.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors pr-3">
                    <Mail size={12} strokeWidth={1.5} />
                    <span>{COMPANY_CONTACT.email}</span>
                  </a>
                  <span className="h-3 w-px bg-white/20 mx-1" />
                  <a href={`tel:${COMPANY_CONTACT.phoneRaw}`} className="flex items-center gap-1.5 hover:text-white transition-colors pl-3">
                    <Phone size={12} strokeWidth={1.5} />
                    <span>{COMPANY_CONTACT.phone}</span>
                  </a>
                </div>

                {/* Right - Social icons with dividers */}
                <div className="flex items-center gap-0 text-white/50">
                  {[
                    { icon: <Facebook size={13} strokeWidth={1.5} />, label: "Facebook", href: COMPANY_CONTACT.facebook },
                    { icon: <Twitter size={13} strokeWidth={1.5} />, label: "Twitter", href: COMPANY_CONTACT.twitter },
                    { icon: <Instagram size={13} strokeWidth={1.5} />, label: "Instagram", href: COMPANY_CONTACT.instagram },
                    { icon: <Youtube size={13} strokeWidth={1.5} />, label: "YouTube", href: "#" },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      aria-label={s.label}
                      className="flex items-center gap-1.5 px-3 h-9 hover:text-white transition-colors border-l border-white/[0.08] text-[11px]"
                    >
                      {s.icon}
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "transition-all duration-300",
          isScrolled
            ? "glass border-b border-white/10 shadow-lg"
            : "bg-black/80 backdrop-blur-sm"
        )}
      >
        <Container>
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="/images/gallery/logo.jpeg"
                alt="Stryper Events"
                className="h-10 w-auto sm:h-12 md:h-14 max-w-[150px] sm:max-w-[180px] object-contain"
              />
            </motion.a>

            {/* Desktop Nav Links */}
            <div className="hidden items-center space-x-1 lg:flex">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="transition-smooth animated-underline px-4 py-2 text-white/80 hover:text-accent-yellow text-sm font-medium"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden sm:block">
              <Button size="sm" variant="primary" onClick={onOpen}>
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="transition-smooth p-2 text-white hover:text-accent-yellow lg:hidden"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </Container>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[60] flex flex-col bg-primary-black lg:hidden"
            >
              <div className="flex h-20 items-center justify-between px-4 sm:px-6">
                <img
                  src="/images/gallery/logo.jpeg"
                  alt="Stryper Events"
                  className="h-10 w-auto object-contain"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-1 flex-col justify-center space-y-8 px-8 text-center">
                {NAV_ITEMS.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-bold text-white transition-colors hover:text-accent-yellow"
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.1 }}
                  className="pt-8"
                >
                  <Button
                    size="lg"
                    variant="primary"
                    className="w-full max-w-xs"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpen();
                    }}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </div>

              {/* Mobile Menu Socials */}
              <div className="border-t border-white/10 p-8">
                <div className="flex justify-center gap-6">
                  <Facebook className="text-white/50 hover:text-white" />
                  <Twitter className="text-white/50 hover:text-white" />
                  <Instagram className="text-white/50 hover:text-white" />
                  <Youtube className="text-white/50 hover:text-white" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
