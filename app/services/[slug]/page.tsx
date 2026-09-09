import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import { SERVICES, VENUES, COMPANY_CONTACT } from "@/constants";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Contact from "@/components/sections/Contact";
import { Sparkles, CheckCircle2, ArrowRight, MapPin, PhoneCall } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = SERVICES.find((s) => s.slug === params.slug) as any;
  if (!service) {
    return { title: "Service Not Found | Stryper Events" };
  }

  const metaTitle: string = service.metaTitle || `${service.title} | Stryper Event Management`;
  const metaDesc: string = service.metaDescription || service.description;

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: {
      canonical: `https://www.stryperevent.com/services/${service.slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: `https://www.stryperevent.com/services/${service.slug}`,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: `${service.title} - Stryper Events`,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug) as any;

  if (!service) {
    notFound();
  }

  const subServices: string[] = service.subServices ? Array.from(service.subServices) : [];
  const features: string[] = service.features ? Array.from(service.features) : [];

  // Schema.org Structured Data
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: {
      "@type": "EventPlanningCompany",
      name: "Stryper Event Management",
      url: "https://www.stryperevent.com",
      telephone: `+${COMPANY_CONTACT.whatsapp}`,
    },
    areaServed: {
      "@type": "City",
      name: "Jaipur",
    },
    description: service.description,
    image: `https://www.stryperevent.com${service.image}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.stryperevent.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://www.stryperevent.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `https://www.stryperevent.com/services/${service.slug}`,
      },
    ],
  };

  return (
    <main className="pt-20 bg-primary-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[460px] w-full overflow-hidden flex items-center justify-center">
        <img
          src={service.image}
          alt={`${service.title} in Jaipur`}
          className="h-full w-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/40 to-transparent" />

        <Container className="relative z-10 flex flex-col items-center justify-center text-center">
          {/* Breadcrumb text */}
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
            <Link href="/" className="hover:text-accent-yellow transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-accent-yellow transition-colors">Services</Link>
            <span>/</span>
            <span className="text-accent-yellow">{service.title}</span>
          </nav>

          <h1 className="mb-4 text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
            {service.title}
          </h1>
          <p className="max-w-3xl text-sm sm:text-lg text-white/80 leading-relaxed">
            {service.description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${COMPANY_CONTACT.whatsapp}?text=Hi, I am looking for ${encodeURIComponent(service.title)} planning in Jaipur.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent-yellow text-primary-black font-black uppercase text-xs tracking-widest rounded-full hover:bg-accent-gold shadow-2xl transition-all"
            >
              <PhoneCall size={16} /> Get Free Quote
            </a>
            <Link
              href="/venue"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold uppercase text-xs tracking-widest rounded-full border border-white/20 backdrop-blur-md transition-all"
            >
              View Luxury Venues <ArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </section>

      {/* Sub-Services SEO Keyword Tags */}
      {subServices.length > 0 && (
        <section className="py-8 bg-white/[0.03] border-y border-white/5">
          <Container>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs font-black uppercase tracking-wider text-accent-yellow flex items-center gap-1 mr-2">
                <Sparkles size={14} /> Core Capabilities:
              </span>
              {subServices.map((sub, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-semibold hover:border-accent-yellow/50 transition-colors"
                >
                  {sub}
                </span>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Detailed Overview Section */}
      <section className="py-24 bg-white/[0.01]">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <SectionHeading
                subtitle="STRYPER EXPERTISE"
                title={`Premier ${service.title} in Jaipur & Rajasthan`}
                className="mb-6"
              />
              <div className="space-y-5 text-white/70 text-base sm:text-lg leading-relaxed">
                <p>
                  Stryper Event Management is your trusted partner for <strong className="text-white">{service.title}</strong> across Jaipur, Rajasthan, and nationwide. With over 5+ years of hands-on industry expertise, our dedicated production teams, decor artists, and event directors bring your vision to life.
                </p>
                <p>
                  From concept creation, royal palace booking, and 3D set fabrication to on-ground technical coordination, we manage every detail so you experience absolute peace of mind.
                </p>
              </div>

              {/* Core Deliverables / Features */}
              {features.length > 0 && (
                <div className="pt-4 space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-wider text-accent-yellow">
                    What We Deliver:
                  </h3>
                  <ul className="space-y-3">
                    {features.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-white/90">
                        <CheckCircle2 size={18} className="text-accent-yellow shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative aspect-video lg:aspect-square overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <img
                src={service.image}
                alt={`${service.title} Execution by Stryper Events`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-6 glass rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-yellow/20 flex items-center justify-center text-accent-yellow font-bold">
                    ★
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">500+ Events Successfully Managed</h4>
                    <p className="text-xs text-white/50">Trusted by leading brands and luxury wedding families</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Luxury Venues Cross-Linking Section */}
      <section className="py-20 bg-white/[0.02] border-t border-white/5">
        <Container>
          <SectionHeading
            subtitle="TOP VENUES IN JAIPUR"
            title="Venues We Coordinate With"
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VENUES.slice(0, 4).map((venue) => (
              <Link
                key={venue.slug}
                href={`/venue/${venue.slug}`}
                className="group relative h-64 rounded-2xl overflow-hidden glass glow-border border border-white/10 block"
              >
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <span className="text-[9px] font-black uppercase tracking-wider text-accent-yellow bg-accent-yellow/10 px-2 py-0.5 rounded border border-accent-yellow/20 mb-1 inline-block">
                    {venue.rating}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-accent-yellow transition-colors leading-tight">
                    {venue.name}
                  </h4>
                  <p className="text-[11px] text-white/50 truncate flex items-center gap-1 mt-0.5">
                    <MapPin size={10} /> {venue.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/venue"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-yellow hover:underline"
            >
              Explore All 10+ Jaipur Luxury Palace Venues <ArrowRight size={14} />
            </Link>
          </div>
        </Container>
      </section>

      {/* Service Portfolio (Videos/Images) */}
      {"portfolio" in service && service.portfolio && (
        <section className="py-24 bg-white/[0.01]">
          <Container>
            <SectionHeading
              subtitle="OUR CATALOG"
              title={`${service.title} Highlights`}
              align="center"
              className="mb-16"
            />
            <div className="grid gap-8 md:grid-cols-2">
              {service.portfolio.map((item: any, index: number) => (
                <div
                  key={index}
                  className="group relative aspect-video rounded-2xl overflow-hidden glass glow-border"
                >
                  <video
                    src={item.video}
                    className="h-full w-full object-cover"
                    controls
                    muted
                    loop
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Contact Form Component */}
      <Contact />
    </main>
  );
}
