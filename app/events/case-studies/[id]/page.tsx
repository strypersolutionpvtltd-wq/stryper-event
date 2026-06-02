"use client";

import { notFound } from "next/navigation";
import React from "react";
import { CASE_STUDIES, COMPANY_CONTACT } from "@/constants";
import Container from "@/components/ui/Container";
import { Target, Lightbulb, CheckCircle2, MessageSquare, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CaseStudyPage({ params }: { params: { id: string } }) {
  const study = CASE_STUDIES.find((s) => s.id === params.id);

  if (!study) {
    notFound();
  }

  return (
    <main className="pt-32 pb-24 bg-primary-black min-h-screen">
      <Container>
        {/* Back Link */}
        <Link 
          href="/events" 
          className="inline-flex items-center gap-2 text-white/40 hover:text-accent-yellow transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span className="text-xs font-black uppercase tracking-[0.2em]">Back to Portfolio</span>
        </Link>

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <span className="px-4 py-1.5 rounded-full bg-accent-yellow/10 text-accent-yellow text-[10px] font-black uppercase tracking-[0.3em]">
              {study.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight">
              {study.title}
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:pb-4"
          >
            <p className="text-xl text-white/60 leading-relaxed font-medium">
              A detailed look into how Stryper Events transformed a complex requirement into a legendary celebration.
            </p>
          </motion.div>
        </div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-video md:aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/10 mb-24"
        >
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>

        {/* Details Grid */}
        <div className="grid lg:grid-cols-3 gap-12 items-start mb-24">
          {[
            {
              icon: Target,
              title: "The Challenge",
              content: study.challenge,
              color: "text-red-500",
              bg: "bg-red-500/10",
            },
            {
              icon: Lightbulb,
              title: "Our Solution",
              content: study.solution,
              color: "text-accent-yellow",
              bg: "bg-accent-yellow/10",
            },
            {
              icon: CheckCircle2,
              title: "The Result",
              content: study.result,
              color: "text-green-500",
              bg: "bg-green-500/10",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-10 rounded-[2.5rem] border border-white/5 space-y-6 h-full"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center ${item.color}`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{item.title}</h3>
              <p className="text-white/60 leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-16 rounded-[3rem] bg-[#111] border border-white/10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-accent-yellow/5 blur-[100px] -z-10" />
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">Want to create something similar?</h2>
          <p className="text-white/40 mb-10 max-w-xl mx-auto font-medium">
            Let&apos;s talk about your vision. Our experts are ready to provide a customized strategy for your event.
          </p>
          <motion.a
            href={`https://wa.me/${COMPANY_CONTACT.whatsapp.replace(/[^0-9]/g, "")}?text=Hi, I saw the ${study.title} case study and want to plan a similar event.`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-4 px-12 py-5 bg-[#25D366] text-white rounded-full font-black uppercase tracking-widest shadow-2xl"
          >
            <MessageSquare size={24} fill="currentColor" />
            Discuss on WhatsApp
          </motion.a>
        </motion.div>
      </Container>
    </main>
  );
}
