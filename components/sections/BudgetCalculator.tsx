"use client";

import { motion } from "framer-motion";
import { Calculator, Users, Calendar, Sparkles } from "lucide-react";
import React, { useState, useEffect } from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const BudgetCalculator = () => {
  const [guests, setGuests] = useState(100);
  const [eventType, setEventType] = useState("corporate");
  const [quality, setQuality] = useState("premium");
  const [estimate, setEstimate] = useState(0);

  const calculateEstimate = () => {
    let basePerGuest = 0;
    
    // Adjusted lower base rates per guest
    if (eventType === "corporate") {
      basePerGuest = 800;
    } else if (eventType === "wedding") {
      basePerGuest = 1200;
    } else if (eventType === "brand") {
      basePerGuest = 1000;
    } else if (eventType === "social") {
      basePerGuest = 500;
    }

    // Quality Multipliers
    let multiplier = 1;
    if (quality === "standard") {
      multiplier = 1;
    } else if (quality === "premium") {
      multiplier = 1.3;
    } else if (quality === "luxury") {
      multiplier = 1.8;
    }

    const total = guests * basePerGuest * multiplier;
    setEstimate(total);
  };

  const handleQuoteClick = () => {
    // Redirect to contact page
    window.location.href = '/contact';
  };

  useEffect(() => {
    calculateEstimate();
  }, [guests, eventType, quality]);

  return (
    <section id="calculator" className="relative py-24 md:py-32 overflow-hidden bg-white/[0.01]">
      <Container>
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            subtitle="PLANNING TOOL"
            title="Instant Budget Estimator"
            align="center"
            className="mb-16"
          />

          <div className="glass glow-border rounded-[2.5rem] p-8 md:p-12 lg:p-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Inputs */}
              <div className="space-y-8">
                {/* Event Type */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-accent-yellow uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={16} /> Event Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["corporate", "wedding", "brand", "social"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setEventType(type)}
                        className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                          eventType === type
                            ? "bg-accent-yellow border-accent-yellow text-primary-black"
                            : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guest Count */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-accent-yellow uppercase tracking-widest flex items-center gap-2">
                      <Users size={16} /> Guest Count
                    </label>
                    <span className="text-white font-bold">{guests} Guests</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-yellow"
                  />
                  <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-tighter">
                    <span>50</span>
                    <span>1000</span>
                    <span>2500</span>
                    <span>5000+</span>
                  </div>
                </div>

                {/* Quality Level */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-accent-yellow uppercase tracking-widest flex items-center gap-2">
                    <Sparkles size={16} /> Service Level
                  </label>
                  <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                    {["standard", "premium", "luxury"].map((level) => (
                      <button
                        key={level}
                        onClick={() => setQuality(level)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                          quality === level
                            ? "bg-white/10 text-white border border-white/10 shadow-lg"
                            : "text-white/40 hover:text-white/60"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output Display */}
              <div className="relative">
                <div className="bg-gradient-to-br from-accent-yellow/20 to-accent-gold/5 rounded-[2rem] p-8 text-center border border-accent-yellow/20">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-yellow text-primary-black shadow-xl">
                    <Calculator size={32} />
                  </div>
                  <h4 className="text-white/60 text-sm font-medium uppercase tracking-widest mb-2">
                    Estimated Budget
                  </h4>
                  <div className="text-4xl md:text-5xl font-black text-white mb-4">
                    ₹{estimate.toLocaleString('en-IN')}
                    <span className="text-accent-yellow">*</span>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed italic">
                    *This is a rough estimate. Actual cost may vary based on specific requirements, venue, and season.
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleQuoteClick}
                    className="mt-8 w-full py-4 bg-accent-yellow text-primary-black font-bold rounded-2xl shadow-[0_10px_30px_rgba(250,204,21,0.3)] hover:shadow-[0_15px_40px_rgba(250,204,21,0.4)] transition-all"
                  >
                    Get Detailed Quote
                  </motion.button>
                </div>
                
                {/* Decorative particles */}
                <div className="absolute -top-4 -right-4 h-12 w-12 bg-accent-yellow/20 blur-2xl rounded-full" />
                <div className="absolute -bottom-4 -left-4 h-12 w-12 bg-accent-yellow/20 blur-2xl rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BudgetCalculator;
