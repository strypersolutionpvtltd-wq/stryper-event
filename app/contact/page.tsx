import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";
import CityCoverage from "@/components/sections/CityCoverage";
import SectionDivider from "@/components/ui/SectionDivider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Stryper Event Management",
  description: "Get in touch with us to plan your next event. We are always ready to help you.",
};

export default function ContactPage() {
  return (
    <main className="pt-20">
      <Contact />
      <SectionDivider />
      <CityCoverage />
      <SectionDivider />
      <FAQ />
    </main>
  );
}
