"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  numPersons: string;
  travelDate: string;
  selectedPlan: string;
  message: string;
}

interface TourismBookingFormProps {
  planName?: string;
  onSuccess?: () => void;
}

const TourismBookingForm: React.FC<TourismBookingFormProps> = ({ planName, onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    numPersons: "1",
    travelDate: "",
    selectedPlan: planName || "Standard",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const tourismPlans = ["Basic", "Standard", "Premium", "Luxury"];

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
        body: JSON.stringify({ ...formData, type: "tourism" }),
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success("Booking inquiry sent!");
        if (onSuccess) {
          onSuccess();
        }

        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            fullName: "",
            phone: "",
            email: "",
            numPersons: "1",
            travelDate: "",
            selectedPlan: planName || "Standard",
            message: "",
          });
        }, 3000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to send inquiry.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
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
            <h3 className="text-2xl font-bold text-white">Inquiry Sent!</h3>
            <p className="text-white/70">Our travel expert will contact you soon.</p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <select
              name="selectedPlan"
              value={formData.selectedPlan}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-accent-yellow/50 transition-colors appearance-none cursor-pointer"
            >
              {tourismPlans.map((plan) => (
                <option key={plan} value={plan} className="bg-primary-black">
                  {plan} Plan
                </option>
              ))}
            </select>
            <label className="absolute -top-2 left-4 text-xs bg-primary-black px-2 text-accent-yellow">
              Selected Plan *
            </label>
          </div>

          <div className="relative">
            <input
              type="number"
              name="numPersons"
              min="1"
              value={formData.numPersons}
              onChange={handleChange}
              onFocus={() => setFocusedField("numPersons")}
              onBlur={() => setFocusedField(null)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-accent-yellow/50 transition-colors"
              placeholder="No. of Persons"
            />
            <label
              className={`absolute left-4 transition-all pointer-events-none ${
                formData.numPersons || focusedField === "numPersons"
                  ? "-top-2 text-xs bg-primary-black px-2 text-accent-yellow"
                  : "top-4 text-white/60"
              }`}
            >
              No. of Persons *
            </label>
          </div>
        </div>

        <div className="relative">
          <input
            type="date"
            name="travelDate"
            value={formData.travelDate}
            onChange={handleChange}
            onFocus={() => setFocusedField("travelDate")}
            onBlur={() => setFocusedField(null)}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-accent-yellow/50 transition-colors"
          />
          <label className="absolute -top-2 left-4 text-xs bg-primary-black px-2 text-accent-yellow">
            Travel Date *
          </label>
        </div>

        <div className="relative">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-transparent focus:outline-none focus:border-accent-yellow/50 transition-colors resize-none"
            placeholder="Special Requirements (Optional)"
          />
          <label
            className={`absolute left-4 transition-all pointer-events-none ${
              formData.message || focusedField === "message"
                ? "-top-2 text-xs bg-primary-black px-2 text-accent-yellow"
                : "top-4 text-white/60"
            }`}
          >
            Special Requirements (Optional)
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full group"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Submit Inquiry"}
        </Button>
      </form>
    </div>
  );
};

export default TourismBookingForm;
