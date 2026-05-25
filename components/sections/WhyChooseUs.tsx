"use client";

import React from "react";

import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { WHY_CHOOSE_US } from "@/constants";

const WhyChooseUs = () => {
  return (
    <section
      id="why-choose-us"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <Container className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          subtitle="WHY CHOOSE US"
          title="Why Work With Us"
          align="center"
          className="mb-16"
        />

        {/* Bento Grid Layout */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
