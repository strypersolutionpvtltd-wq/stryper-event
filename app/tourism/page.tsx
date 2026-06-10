import TourismServices from "@/components/sections/TourismServices";
import CityCoverage from "@/components/sections/CityCoverage";
import SectionDivider from "@/components/ui/SectionDivider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tourism Services | Stryper Event Management",
  description: "Explore our premium tourism packages and travel services in Jaipur and across India.",
};

export default function TourismPage() {
  return (
    <main className="pt-24 md:pt-32">
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Tourism Services</h1>
      </div>
      <TourismServices />
      <SectionDivider />
      <CityCoverage />
    </main>
  );
}
