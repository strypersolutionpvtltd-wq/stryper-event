import About from "@/components/sections/About";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ClientLogos from "@/components/sections/ClientLogos";
import SectionDivider from "@/components/ui/SectionDivider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Stryper Event Management",
  description: "Learn more about Stryper Event Management, our team, and why we are the leading event planners in Jaipur.",
};

export default function AboutPage() {
  return (
    <main className="pt-24 md:pt-32">
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter">About Us</h1>
      </div>
      <About />
      <SectionDivider />
      <WhyChooseUs />
      <SectionDivider />
      <ClientLogos />
    </main>
  );
}
