import About from "@/components/sections/About";
import Benefits from "@/components/sections/Benefits";
import ClientLogos from "@/components/sections/ClientLogos";
import Contact from "@/components/sections/Contact";
import EventCategories from "@/components/sections/EventCategories";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import VideoTestimonials from "@/components/sections/VideoTestimonials";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <main className="relative">
        <Hero />

        <SectionDivider />
        <About />

        <SectionDivider />
        <Services />

        <SectionDivider />
        <EventCategories />

        <SectionDivider />
        <Benefits />

        <SectionDivider />
        <ClientLogos />

        <SectionDivider />
        <Testimonials />

        <SectionDivider />
        <VideoTestimonials />

        <SectionDivider />
        <Contact />
      </main>
    </>
  );
}
