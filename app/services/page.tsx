import Services from "@/components/sections/Services";
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
    </main>
  );
}
