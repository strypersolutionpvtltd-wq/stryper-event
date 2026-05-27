"use client";

import { motion } from "framer-motion";
import { Briefcase, Building2, Globe, Star, Trophy, Users } from "lucide-react";

import Container from "@/components/ui/Container";

const VENUE_TYPES = [
  {
    icon: <Briefcase className="h-7 w-7" />,
    title: "Corporate Events",
    description: "Board meetings, AGMs, town halls, and corporate offsites at premium venues.",
    count: "50+ Venues",
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: "MICE & Conferences",
    description: "Meetings, Incentives, Conferences & Exhibitions — fully managed end to end.",
    count: "30+ Venues",
  },
  {
    icon: <Building2 className="h-7 w-7" />,
    title: "Banquet Halls",
    description: "Elegant banquet spaces for weddings, receptions, and social gatherings.",
    count: "40+ Venues",
  },
  {
    icon: <Trophy className="h-7 w-7" />,
    title: "Sports & Outdoor",
    description: "Stadiums, grounds, and open spaces for sports events and marathons.",
    count: "20+ Venues",
  },
  {
    icon: <Star className="h-7 w-7" />,
    title: "5-Star Hotels",
    description: "Luxury hotel venues with world-class amenities and professional staff.",
    count: "15+ Hotels",
  },
  {
    icon: <Globe className="h-7 w-7" />,
    title: "Destination Events",
    description: "Goa, Udaipur, Shimla, Manali — unforgettable destination event experiences.",
    count: "10+ Destinations",
  },
];

const TOP_JAIPUR_VENUES = [
  { name: "Fairmont Jaipur", link: "https://maps.app.goo.gl/T8L5M" },
  { name: "Marriott Jaipur", link: "https://maps.app.goo.gl/YfS7H" },
  { name: "Jai Mahal Palace", link: "https://maps.app.goo.gl/Z9K4J" },
  { name: "Birla Auditorium", link: "https://maps.app.goo.gl/P2M9L" },
  { name: "Clarks Amer", link: "https://maps.app.goo.gl/Q5W1M" },
];

const VenueTypes = () => {
  return (
    <section className="py-24 bg-white/[0.02]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-yellow/30 bg-accent-yellow/5 px-4 py-1.5 mb-4">
            <Building2 className="h-4 w-4 text-accent-yellow" />
            <span className="text-sm text-accent-yellow">Venue Solutions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Find the Perfect <span className="text-gradient">Venue</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            From intimate boardrooms to grand convention centres — we have the right space for over 150+ venues across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {VENUE_TYPES.map((venue, i) => (
            <motion.div
              key={venue.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-accent-yellow/40 hover:bg-white/[0.07] transition-all duration-300 cursor-pointer"
            >
              <div className="mb-4 inline-flex rounded-xl bg-accent-yellow/10 p-3 text-accent-yellow group-hover:bg-accent-yellow/20 transition-colors">
                {venue.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{venue.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-4">{venue.description}</p>
              <span className="text-xs font-medium text-accent-yellow border border-accent-yellow/30 rounded-full px-3 py-1">
                {venue.count}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Jaipur Specific Venues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">Top Jaipur Venues We Partner With</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TOP_JAIPUR_VENUES.map((venue, i) => (
              <motion.a
                key={i}
                href={venue.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center p-3 rounded-xl border border-white/5 bg-white/5 text-sm text-white/70 hover:border-accent-yellow/50 hover:text-accent-yellow transition-all text-center"
              >
                {venue.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default VenueTypes;
