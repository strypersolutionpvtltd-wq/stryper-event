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
      <TourismServices isPage={true} />
      <SectionDivider />
      <CityCoverage />
    </main>
  );
}
