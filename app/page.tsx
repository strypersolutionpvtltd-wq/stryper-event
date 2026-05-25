import About from "@/components/sections/About";
import Benefits from "@/components/sections/Benefits";
import CityCoverage from "@/components/sections/CityCoverage";
import ClientLogos from "@/components/sections/ClientLogos";
import Contact from "@/components/sections/Contact";
import EventCategories from "@/components/sections/EventCategories";
import EventProcess from "@/components/sections/EventProcess";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import HowToBook from "@/components/sections/HowToBook";
import Navbar from "@/components/sections/Navbar";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import VenueTypes from "@/components/sections/VenueTypes";
import VideoShowcase from "@/components/sections/VideoShowcase";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import PageLoader from "@/components/ui/PageLoader";
import SectionDivider from "@/components/ui/SectionDivider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <>
      <PageLoader />
      <main className="relative">
        <Navbar />
        <Hero />

        <SectionDivider />
        <About />

        <SectionDivider />
        <Services />

        <SectionDivider />
        <WhyChooseUs />

        <SectionDivider />
        <EventCategories />

        <SectionDivider />
        <EventProcess />

        <SectionDivider />
        <HowToBook />

        <SectionDivider />
        <VenueTypes />

        <SectionDivider />
        <VideoShowcase />

        <SectionDivider />
        <Gallery />

        <SectionDivider />
        <Benefits />

        <SectionDivider />
        <ClientLogos />

        <SectionDivider />
        <CityCoverage />

        <SectionDivider />
        <Testimonials />

        <SectionDivider />
        <FAQ />

        <SectionDivider />
        <Contact />

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
