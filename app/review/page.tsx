"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Send, CheckCircle2, ArrowRight, Sparkles, Building, Calendar, User } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

import Container from "@/components/ui/Container";

const ratingLabels: Record<number, string> = {
  1: "Needs Improvement",
  2: "Fair",
  3: "Good Experience",
  4: "Very Good!",
  5: "Exceptional & Outstanding! ⭐",
};

export default function ReviewPage() {
  const [name, setName] = useState("");
  const [eventName, setEventName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!text.trim()) {
      toast.error("Please write a few words about your experience");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          eventName: eventName.trim(),
          company: company.trim(),
          role: role.trim(),
          rating,
          text: text.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Review submitted successfully! It is now live.");
        setIsSubmitted(true);
      } else {
        toast.error(data.error || "Failed to submit review. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-28 md:pt-36 pb-20 bg-primary-black text-white relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-yellow/5 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-yellow/10 border border-accent-yellow/20 text-accent-yellow text-xs font-black uppercase tracking-[0.25em] mb-4">
              <Sparkles size={14} /> Client Experience
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
              Review Your Event
            </h1>
            <p className="text-white/60 text-base md:text-lg leading-relaxed">
              We take pride in turning celebrations into unforgettable milestones. 
              Share your honest feedback and let the world know how your event went!
            </p>
          </motion.div>
        </div>

        {isSubmitted ? (
          /* Success Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto glass glow-border rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6 text-green-400">
              <CheckCircle2 size={44} />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-3">
              Thank You, {name}!
            </h2>
            <p className="text-white/70 mb-6 leading-relaxed">
              Your review has been successfully submitted and is now <span className="text-accent-yellow font-bold">live on our website</span> in the testimonials section!
            </p>

            {/* Submitted Preview Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left mb-8 relative">
              <div className="flex gap-1 mb-3">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent-yellow fill-accent-yellow" />
                ))}
              </div>
              <p className="text-white/90 text-sm italic mb-4 leading-relaxed">
                &quot;{text}&quot;
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-accent-yellow/20 flex items-center justify-center text-accent-yellow font-bold">
                  {name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold">{name}</h4>
                  <p className="text-white/50 text-xs">
                    {[eventName, role, company].filter(Boolean).join(" • ")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-yellow text-primary-black font-black uppercase tracking-wider rounded-full hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all"
              >
                View On Website <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => {
                  setName("");
                  setEventName("");
                  setCompany("");
                  setRole("");
                  setText("");
                  setRating(5);
                  setIsSubmitted(false);
                }}
                className="inline-flex items-center justify-center px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-full transition-all text-sm"
              >
                Submit Another Review
              </button>
            </div>
          </motion.div>
        ) : (
          /* Form & Live Preview Grid */
          <div className="grid lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
            {/* Form Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-7 glass glow-border rounded-3xl p-6 md:p-10"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Star Rating Selector */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-accent-yellow mb-3">
                    Overall Experience Rating *
                  </label>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-125 focus:outline-none"
                        aria-label={`${star} star`}
                      >
                        <Star
                          className={`w-7 h-7 md:w-8 md:h-8 transition-colors ${
                            star <= (hoverRating || rating)
                              ? "text-accent-yellow fill-accent-yellow drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                              : "text-white/20"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-3 text-xs md:text-sm font-semibold text-white/80">
                      {ratingLabels[hoverRating || rating]}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/80 mb-2">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Singhania"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent-yellow text-sm font-medium transition-colors"
                    />
                  </div>
                </div>

                {/* Event Name */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/80 mb-2">
                    Event Name / Type
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      placeholder="e.g. Annual Tech Summit 2024 / Royal Wedding at Fairmont"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent-yellow text-sm font-medium transition-colors"
                    />
                  </div>
                </div>

                {/* Company / Designation (2 columns) */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/80 mb-2">
                      Company / Organization
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="text"
                        placeholder="e.g. Acme Innovations"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent-yellow text-sm font-medium transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/80 mb-2">
                      Your Role / Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Director / Bride"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent-yellow text-sm font-medium transition-colors"
                    />
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/80 mb-2">
                    Your Review / Experience *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Share how Stryper Events handled the execution, stage setup, hospitality, and overall coordination of your event..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-accent-yellow text-sm font-medium transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-accent-yellow hover:bg-accent-gold text-primary-black font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_10px_30px_rgba(250,204,21,0.25)] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Publishing Review...</span>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Submit Review</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Live Preview Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5 space-y-6"
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-yellow block mb-2">
                  Live Preview
                </span>
                <p className="text-xs text-white/50 mb-4">
                  Here is how your testimonial will display on the Stryper website:
                </p>
              </div>

              {/* Preview Card */}
              <div className="glass glow-border rounded-2xl p-8 relative overflow-hidden bg-white/[0.02]">
                {/* Quote Icon Background */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-16 h-16 text-accent-yellow" />
                </div>

                {/* Event Name Tag */}
                {eventName && (
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-accent-yellow/10 border border-accent-yellow/20 text-accent-yellow text-[10px] font-black uppercase tracking-widest rounded-full">
                      {eventName}
                    </span>
                  </div>
                )}

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-accent-yellow fill-accent-yellow"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-white/80 mb-6 leading-relaxed relative z-10 min-h-[4rem] text-sm">
                  {text ? (
                    <>&quot;{text}&quot;</>
                  ) : (
                    <span className="text-white/30 italic">
                      &quot;Your review message will appear right here...&quot;
                    </span>
                  )}
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-yellow/20 to-accent-gold/20 flex items-center justify-center border border-accent-yellow/30">
                    <span className="text-accent-yellow font-bold text-lg">
                      {name ? name.charAt(0).toUpperCase() : "S"}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">
                      {name || "Your Name"}
                    </h4>
                    <p className="text-xs text-white/60">
                      {[role, company].filter(Boolean).join(", ") || "Valued Client"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Information Note */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-white/50 space-y-2">
                <p className="flex items-center gap-2 font-bold text-white/80">
                  <Sparkles size={14} className="text-accent-yellow" />
                  Instant Visibility
                </p>
                <p>
                  Once submitted, your feedback helps future clients choose Stryper Events with complete confidence. Thank you for your partnership!
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </Container>
    </main>
  );
}
