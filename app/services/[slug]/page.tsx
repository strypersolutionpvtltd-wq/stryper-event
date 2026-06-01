import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { SERVICES } from "@/constants";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Contact from "@/components/sections/Contact";

// Since it's a server component by default in app router, we can use this for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Stryper Event Management`,
    description: service.description,
  };
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <Container className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            {service.title}
          </h1>
          <p className="max-w-2xl text-lg text-white/80 md:text-xl">
            {service.description}
          </p>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white/[0.02]">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                subtitle="ABOUT SERVICE"
                title={`Professional ${service.title}`}
                className="mb-8"
              />
              <div className="space-y-6 text-white/70 text-lg">
                <p>
                  Stryper Event Management provides end-to-end solutions for {service.title.toLowerCase()}. 
                  With over 5 years of experience in the industry, we understand what it takes to make 
                  an event successful and memorable.
                </p>
                <p>
                  Our team of experts handles everything from conceptualization and planning to 
                  execution and post-event analysis. We pride ourselves on our attention to detail, 
                  creativity, and commitment to excellence.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    "Customized event planning and strategy",
                    "Venue selection and management",
                    "Professional technical production",
                    "Logistics and vendor coordination",
                    "On-site management and support",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-accent-yellow" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 lg:aspect-square">
              <img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us for this service */}
      <section className="py-24">
        <Container>
          <SectionHeading
            subtitle="WHY CHOOSE US"
            title="Expertise You Can Trust"
            align="center"
            className="mb-16"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Experience",
                desc: "5+ years of managing high-profile events across India.",
              },
              {
                title: "Creativity",
                desc: "Unique themes and innovative solutions tailored to your needs.",
              },
              {
                title: "Reliability",
                desc: "We deliver what we promise, on time and within budget.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-8 text-center"
              >
                <h3 className="mb-4 text-xl font-bold text-white">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Contact />
    </main>
  );
}
