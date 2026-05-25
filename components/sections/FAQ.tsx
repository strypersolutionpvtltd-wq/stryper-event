"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import React, { useState } from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "How do you plan events?",
      answer:
        "First, we talk to you and understand what you need. Then we create a plan, book vendors, and handle all the setup. On event day, our team manages everything so you can relax.",
    },
    {
      question: "How much do your services cost?",
      answer:
        "Every event is different, so prices vary. We look at what you need, how big your event is, and your budget. Then we give you a clear quote with no hidden charges. Contact us to discuss your event.",
    },
    {
      question: "Where do you work?",
      answer:
        "We're based in Jaipur, Rajasthan, but we work all over India. We've done events in Delhi, Mumbai, Bangalore, and many other cities. We can also help with destination events anywhere you need.",
    },
    {
      question: "Can you handle corporate events?",
      answer:
        "Yes, we do lots of corporate events. Conferences, meetings, product launches, team events, and company celebrations. We make sure everything looks professional and runs on time.",
    },
    {
      question: "Do you plan weddings?",
      answer:
        "Absolutely! We love planning weddings. From small ceremonies to big celebrations, we handle everything — venue, decorations, catering, entertainment, and more. We work with traditional, modern, and destination weddings.",
    },
    {
      question: "Can you manage sports events?",
      answer:
        "Yes, we have good experience with sports events. We handle tournaments, marathons, corporate sports days, and award ceremonies. We take care of registrations, logistics, safety, timing, and coordination.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <Container className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          subtitle="FAQ"
          title="Common Questions"
          align="center"
          className="mb-16"
        />

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass glow-border rounded-xl overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-white/5"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-yellow/10 border border-accent-yellow/30 flex items-center justify-center"
                >
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-accent-yellow" />
                  ) : (
                    <Plus className="w-5 h-5 text-accent-yellow" />
                  )}
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-white/70 leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white/70 mb-6">
            Still have questions? We&apos;re here to help!
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-accent-yellow text-primary-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-shadow"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
};

export default FAQ;
