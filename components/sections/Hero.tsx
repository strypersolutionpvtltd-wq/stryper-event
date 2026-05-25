"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { COMPANY_STATS } from "@/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useGetStartedModal } from "@/hooks/useModal";

const Hero = () => {
  const { onOpen } = useGetStartedModal();

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-black via-primary-black to-primary-black" />

        {/* Simple glow */}
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-accent-yellow/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-accent-gold/10 blur-[120px]" />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(250,204,21,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Content */}
      <Container className="relative z-10 pt-[116px]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-5xl space-y-8 text-center"
        >
         

          {/* Main Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-display leading-[1.1] tracking-tight"
          >
            <span className="block text-white">We Plan Events</span>
            <span className="text-gradient block">People Remember</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            className="text-body-lg mx-auto max-w-3xl text-white/70"
          >
            From corporate events to weddings, we handle everything so your event runs smoothly and looks great. Based in Jaipur, serving clients across India.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
          >
            <a href="#gallery">
              <Button size="lg" variant="primary" className="group">
                See Our Work
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <Button size="lg" variant="outline" onClick={onOpen}>
              Talk to Us
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 gap-8 pt-16 md:grid-cols-4"
          >
            {COMPANY_STATS.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="text-gradient text-4xl font-bold md:text-5xl">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-accent-yellow/30 p-2">
          <div className="h-1.5 w-1.5 rounded-full bg-accent-yellow animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
