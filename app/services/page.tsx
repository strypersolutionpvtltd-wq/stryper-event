import Services from "@/components/sections/Services";
import ProcessRoadmap from "@/components/sections/ProcessRoadmap";
import BudgetCalculator from "@/components/sections/BudgetCalculator";
import SectionDivider from "@/components/ui/SectionDivider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Stryper Event Management",
  description: "Explore our wide range of event management services including corporate events, weddings, and more.",
};

export default function ServicesPage() {
  return (
    <main className="pt-24 md:pt-32">
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter">Our Services</h1>
      </div>
      <Services />
      <SectionDivider />
      <ProcessRoadmap />
      <SectionDivider />
      <BudgetCalculator />
    </main>
  );
}
