import React from "react";
import { VENUES } from "@/constants";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Venues in Jaipur | Stryper Event Management",
  description: "Explore the most luxurious and iconic event venues in Jaipur, from royal palaces to 5-star hotels.",
};

export default function VenuesPage() {
  return (
    <main className="pt-24 md:pt-32 pb-20">
      <Container>
        <div className="text-center py-12 mb-10">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">Premium <span className="text-accent-yellow">Venues</span></h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            We have partnered with Jaipur&apos;s most prestigious locations to ensure your event has the perfect backdrop.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {VENUES.map((venue) => (
            <Link 
              key={venue.slug} 
              href={`/venue/${venue.slug}`}
              className="group relative h-[400px] rounded-[2.5rem] overflow-hidden glass glow-border block"
            >
              {/* Background Image */}
              <img 
                src={venue.image} 
                alt={venue.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent-yellow text-primary-black w-fit">
                    <Star size={12} className="fill-primary-black" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{venue.rating}</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight group-hover:text-accent-yellow transition-colors">
                    {venue.name}
                  </h2>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/70 font-bold uppercase tracking-widest text-[10px]">
                      <MapPin size={14} className="text-accent-yellow" />
                      {venue.location.split(',')[0]}
                    </div>
                    
                    <div className="flex items-center gap-2 text-accent-yellow font-black uppercase tracking-widest text-[10px] opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform">
                      View Details <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
