"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import React, { useState } from "react";
import Container from "@/components/ui/Container";
import TourismBookingForm from "@/components/ui/TourismBookingForm";

const TOURISM_PLANS = [
  {
    name: "Basic",
    price: "₹5,000",
    description: "Essential tourism experience for budget-conscious travelers.",
    features: [
      "Guided City Tour",
      "Monument Entry Fees",
      "Local Transportation",
      "Basic Refreshments",
    ],
    accent: "border-white/10",
  },
  {
    name: "Standard",
    price: "₹7,000",
    description: "Our most popular choice for a complete local experience.",
    features: [
      "Everything in Basic",
      "Premium Lunch",
      "Extended Sightseeing",
      "Professional Photographer",
    ],
    accent: "border-accent-yellow/30",
    popular: true,
  },
  {
    name: "Premium",
    price: "₹15,000",
    description: "Luxury and comfort combined for a sophisticated journey.",
    features: [
      "Everything in Standard",
      "Private AC Car",
      "5-Star Dining Experience",
      "VIP Access to Attractions",
      "Cultural Performance Show",
    ],
    accent: "border-accent-yellow/60",
  },
  {
    name: "Luxury",
    price: "₹25,000",
    description: "The ultimate royal treatment for an unforgettable trip.",
    features: [
      "Everything in Premium",
      "Luxury Suite Stay (1 Night)",
      "Helicopter City View",
      "Personal Butler Service",
      "Exclusive Heritage Gala Dinner",
    ],
    accent: "border-accent-yellow",
  },
];

interface TourismServicesProps {
  isPage?: boolean;
}

const TourismServices = ({ isPage = false }: TourismServicesProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleBookNow = (planName: string) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };

  return (
    <section id="tourism" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-yellow/5 rounded-full blur-[120px]" />
      
      <Container className="relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            {isPage ? (
              <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">
                Tourism <span className="text-accent-yellow">Services</span>
              </h1>
            ) : (
              <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">
                Tourism <span className="text-accent-yellow">Services</span>
              </h2>
            )}
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            Explore the heritage and beauty of India with our curated tourism packages. From budget-friendly city tours to ultra-luxury royal experiences.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {TOURISM_PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative flex flex-col p-8 rounded-3xl bg-white/[0.03] border-2 ${plan.accent} backdrop-blur-sm transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-yellow text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-accent-yellow">{plan.price}</span>
                  <span className="text-white/40 text-sm">/person</span>
                </div>
                <p className="mt-4 text-sm text-white/50 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="flex-grow space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm text-white/70">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-yellow/10 text-accent-yellow">
                      <Check size={12} />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleBookNow(plan.name)}
                className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all bg-white/5 text-white hover:bg-white/10"
              >
                Book Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-primary-black border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-8">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                  Book <span className="text-accent-yellow">{selectedPlan}</span> Plan
                </h2>
                <p className="text-white/60 text-sm">
                  Fill in the details below and our travel expert will contact you within 24 hours.
                </p>
              </div>

              <TourismBookingForm 
                planName={selectedPlan || "Standard"} 
                onSuccess={() => setTimeout(() => setIsModalOpen(false), 2000)} 
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TourismServices;
