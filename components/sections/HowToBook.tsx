"use client";

import { motion } from "framer-motion";
import { CalendarCheck, CheckCircle, MessageSquare, PhoneCall, Search, Smile } from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { useGetStartedModal } from "@/hooks/useModal";

const STEPS = [
  {
    icon: <PhoneCall className="h-6 w-6" />,
    step: "01",
    title: "Contact Us",
    description: "Call, WhatsApp, or fill the form. Tell us your event type, date, city, and budget.",
  },
  {
    icon: <Search className="h-6 w-6" />,
    step: "02",
    title: "We Find Options",
    description: "Our team shortlists the best venues and packages that match your requirements.",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    step: "03",
    title: "Discuss & Finalise",
    description: "We share proposals, negotiate with vendors, and finalise the best deal for you.",
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    step: "04",
    title: "Confirm Booking",
    description: "Once you approve, we confirm the booking and handle all paperwork and payments.",
  },
  {
    icon: <CalendarCheck className="h-6 w-6" />,
    step: "05",
    title: "We Plan Everything",
    description: "From logistics to decor, AV setup to catering — we manage every detail.",
  },
  {
    icon: <Smile className="h-6 w-6" />,
    step: "06",
    title: "You Enjoy the Event",
    description: "Relax and enjoy. Our on-ground team ensures everything runs perfectly.",
  },
];

const HowToBook = () => {
  const { onOpen } = useGetStartedModal();

  return (
    <section className="py-20 bg-primary-black">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-yellow/30 bg-accent-yellow/5 px-4 py-1.5 mb-4">
            <CalendarCheck className="h-4 w-4 text-accent-yellow" />
            <span className="text-sm text-accent-yellow">Simple Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How to Book Your <span className="text-gradient">Event</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            6 simple steps from inquiry to a perfectly executed event — we handle everything in between.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-accent-yellow/30 transition-all duration-300"
            >
              {/* Step number */}
              <span className="absolute top-4 right-5 text-4xl font-black text-white/5 select-none">
                {step.step}
              </span>
              <div className="mb-4 inline-flex rounded-xl bg-accent-yellow/10 p-3 text-accent-yellow">
                {step.icon}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Button size="lg" variant="primary" onClick={onOpen}>
            Start Planning Your Event
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default HowToBook;
