"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import React from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GetStartedForm from "@/components/ui/GetStartedForm";
import { COMPANY_CONTACT } from "@/constants";

const Contact = () => {
  const contactDetails = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: COMPANY_CONTACT.phone,
      href: `tel:${COMPANY_CONTACT.phoneRaw}`,
      subtitle: "Mon-Sat, 10am-7pm",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: COMPANY_CONTACT.email,
      href: `mailto:${COMPANY_CONTACT.email}`,
      subtitle: "We'll reply within 24h",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      details: COMPANY_CONTACT.address,
      href: "https://maps.google.com",
      subtitle: "Head Office",
    },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-accent-yellow/5 rounded-full blur-[120px]" />

      <Container className="relative z-10">
        <SectionHeading
          subtitle="CONTACT US"
          title="Let's Plan Your Next Event"
          align="center"
          className="mb-16"
        />

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Get in Touch
              </h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                Have a question or ready to start planning? Reach out to us via
                the form or any of these contact methods. Our team is ready to
                bring your vision to life.
              </p>

              <div className="space-y-6">
                {contactDetails.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-2xl glass glow-border group transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-yellow/10 flex items-center justify-center text-accent-yellow transition-colors group-hover:bg-accent-yellow group-hover:text-primary-black">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{item.title}</h4>
                      <p className="text-white/80">{item.details}</p>
                      <p className="text-white/40 text-sm">{item.subtitle}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 glass glow-border rounded-3xl p-8 md:p-12"
          >
            <GetStartedForm />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
