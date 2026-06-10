import EventCategories from "@/components/sections/EventCategories";
import Gallery from "@/components/sections/Gallery";
import SectionDivider from "@/components/ui/SectionDivider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events Portfolio | Stryper Event Management",
  description: "View our portfolio of successful events and see why we are the preferred choice for event planning.",
};

export default function EventsPage() {
  return (
    <main className="pt-24 md:pt-32">
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter">Events Portfolio</h1>
      </div>
      <EventCategories />
      <SectionDivider />
      <Gallery />
    </main>
  );
}
