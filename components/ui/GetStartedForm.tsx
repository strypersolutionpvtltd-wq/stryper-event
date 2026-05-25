"use client";

import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import React, { useState } from "react";

import Button from "@/components/ui/Button";

interface FormData {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  eventType: string;
  budgetRange: string;
  eventDate: string;
  message: string;
}

interface GetStartedFormProps {
  onSuccess?: () => void;
}

const GetStartedForm: React.FC<GetStartedFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    eventType: "",
    budgetRange: "",
    eventDate: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const eventTypes = [
    "Corporate Event",
    "Wedding Event",
    "Sports Event",
    "Product Launch",
    "Award Ceremony",
    "Brand Promotion",
    "Exhibition",
    "Other",
  ];

  const budgetRanges = [
    "Under ₹5 Lakhs",
    "₹5-10 Lakhs",
    "₹10-25 Lakhs",
    "₹25-50 Lakhs",
    "₹50 Lakhs+",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        if (onSuccess) {
          onSuccess();
        }

        // Optional: Send WhatsApp notification from client side
        
        // This won't automatically send but we could provide a link
        // window.open(`https://wa.me/91XXXXXXXXXX?text=${waMessage}`, '_blank');

        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            fullName: "",
            companyName: "",
            phone: "",
            email: "",
            eventType: "",
            budgetRange: "",
            eventDate: "",
            message: "",
          });
        }, 3000);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Success Overlay */}
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-primary-black/95 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl"
        >
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle className="w-20 h-20 text-accent-yellow mx-auto" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
            <p className="text-white/70">We&apos;ll get back to you soon.</p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div className="relative">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onFocus={() => setFocusedField("fullName")}
            onBlur={() => setFocusedField(null)}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-transparent focus:outline-none focus:border-accent-yellow/50 transition-colors peer"
            placeholder="Full Name"
          />
          <label
            className={`absolute left-4 transition-all pointer-events-none ${
              formData.fullName || focusedField === "fullName"
                ? "-top-2 text-xs bg-primary-black px-2 text-accent-yellow"
                : "top-4 text-white/60"
            }`}
          >
            Full Name *
          </label>
        </div>

        {/* Company Name */}
        <div className="relative">
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            onFocus={() => setFocusedField("companyName")}
            onBlur={() => setFocusedField(null)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-transparent focus:outline-none focus:border-accent-yellow/50 transition-colors peer"
            placeholder="Company Name"
          />
          <label
            className={`absolute left-4 transition-all pointer-events-none ${
              formData.companyName || focusedField === "companyName"
                ? "-top-2 text-xs bg-primary-black px-2 text-accent-yellow"
                : "top-4 text-white/60"
            }`}
          >
            Company Name
          </label>
        </div>

        {/* Phone & Email */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField(null)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-transparent focus:outline-none focus:border-accent-yellow/50 transition-colors"
              placeholder="Phone"
            />
            <label
              className={`absolute left-4 transition-all pointer-events-none ${
                formData.phone || focusedField === "phone"
                  ? "-top-2 text-xs bg-primary-black px-2 text-accent-yellow"
                  : "top-4 text-white/60"
              }`}
            >
              Phone *
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-transparent focus:outline-none focus:border-accent-yellow/50 transition-colors"
              placeholder="Email"
            />
            <label
              className={`absolute left-4 transition-all pointer-events-none ${
                formData.email || focusedField === "email"
                  ? "-top-2 text-xs bg-primary-black px-2 text-accent-yellow"
                  : "top-4 text-white/60"
              }`}
            >
              Email *
            </label>
          </div>
        </div>

        {/* Event Type & Budget */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-accent-yellow/50 transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Select Event Type
              </option>
              {eventTypes.map((type) => (
                <option key={type} value={type} className="bg-primary-black">
                  {type}
                </option>
              ))}
            </select>
            <label className="absolute -top-2 left-4 text-xs bg-primary-black px-2 text-accent-yellow">
              Event Type *
            </label>
          </div>

          <div className="relative">
            <select
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-accent-yellow/50 transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Select Budget Range
              </option>
              {budgetRanges.map((range) => (
                <option key={range} value={range} className="bg-primary-black">
                  {range}
                </option>
              ))}
            </select>
            <label className="absolute -top-2 left-4 text-xs bg-primary-black px-2 text-accent-yellow">
              Budget Range *
            </label>
          </div>
        </div>

        {/* Event Date */}
        <div className="relative">
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            onFocus={() => setFocusedField("eventDate")}
            onBlur={() => setFocusedField(null)}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-accent-yellow/50 transition-colors"
          />
          <label className="absolute -top-2 left-4 text-xs bg-primary-black px-2 text-accent-yellow">
            Event Date *
          </label>
        </div>

        {/* Message */}
        <div className="relative">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            rows={4}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-transparent focus:outline-none focus:border-accent-yellow/50 transition-colors resize-none"
            placeholder="Message"
          />
          <label
            className={`absolute left-4 transition-all pointer-events-none ${
              formData.message || focusedField === "message"
                ? "-top-2 text-xs bg-primary-black px-2 text-accent-yellow"
                : "top-4 text-white/60"
            }`}
          >
            Message *
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full group"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-5 h-5 border-2 border-primary-black border-t-transparent rounded-full"
              />
              Sending...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Send Message
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default GetStartedForm;
