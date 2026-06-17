// Navigation items
export const NAV_ITEMS = [
  { name: "Overview", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Venue", href: "/venue", isDropdown: true },
  { name: "Tourism", href: "/tourism" },
  { name: "Events", href: "/events" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;

// Jaipur Premium Venues
export const VENUES = [
  {
    name: "Fairmont Jaipur",
    slug: "fairmont-jaipur",
    rating: "5 Star Luxury",
    location: "Kukas, Amber Road, Jaipur",
    description:
      "A tribute to the pink city, Fairmont Jaipur is a luxurious living palace built in the tradition of the region's royal heritage. Featuring Rajput and Mughal architecture, it offers a grand setting for luxury destination weddings with stunning views of the Aravalli hills.",
    features: ["Grand Ballroom", "Aravalli View Lawns", "Traditional Welcomes", "Luxury Suites"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    ],
    videos: [
      "/videos/gallery/WhatsApp Video 2026-06-02 at 2.51.14 AM.mp4",
      "/videos/gallery/WhatsApp Video 2026-06-02 at 2.51.15 AM.mp4",
    ],
  },
  {
    name: "Taj Rambagh Palace Jaipur",
    slug: "taj-rambagh-palace",
    rating: "Palatial 5 Star",
    location: "Bhawani Singh Road, Jaipur",
    description:
      "The 'Jewel of Jaipur', Rambagh Palace offers an authentic experience of royal living. Spread across 47 acres of lush gardens, this former residence of the Maharaja is arguably the most prestigious wedding venue in the world.",
    features: ["Historic Gardens", "Royal Durbar Hall", "Peacock Courtyard", "Heritage Suites"],
    image: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80",
    ],
    videos: ["/videos/gallery/WhatsApp Video 2026-06-02 at 2.51.16 AM.mp4"],
  },
  {
    name: "Taj Amer Jaipur",
    slug: "taj-amer-jaipur",
    rating: "5 Star Luxury",
    location: "Amber, Jaipur",
    description:
      "Nestled near the iconic Amer Fort, Taj Amer combines modern luxury with the timeless beauty of Jaipur's history. It's an ideal choice for couples seeking a majestic backdrop for their special day.",
    features: ["Fort Backdrop", "Infinity Pool", "Grand Courtyards", "Modern Ballroom"],
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551882547-ff43c61f1c90?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    ],
    videos: ["/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.12 PM (1).mp4"],
  },
  {
    name: "Jai Mahal Palace, Jaipur",
    slug: "jai-mahal-palace",
    rating: "Heritage 5 Star",
    location: "Civil Lines, Jaipur",
    description:
      "Built in 1745, Jai Mahal Palace is a masterpiece in the Indo-Saracenic style of architecture. Its 18 acres of beautiful landscaped gardens are perfect for grand outdoor wedding ceremonies.",
    features: ["Landscaped Gardens", "Marble Hall", "Heritage Architecture", "Luxury Pool"],
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    ],
    videos: ["/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.12 PM (2).mp4"],
  },
  {
    name: "Taj Devi Ratn Resort & Spa, Jaipur",
    slug: "taj-devi-ratn",
    rating: "5 Star Boutique",
    location: "Jamdoli, Agra Road, Jaipur",
    description:
      "A bold, modern interpretation of Jaipur's heritage. Devi Ratn is inspired by the gems of Rajasthan, featuring avant-garde architecture and unique spaces for creative destination weddings.",
    features: ["Avant-garde Design", "Mountain Backdrop", "Unique Event Spaces", "Modern Spa"],
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    ],
    videos: ["/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.11 PM (1).mp4"],
  },
  {
    name: "Hyatt Regency Jaipur Mansarovar",
    slug: "hyatt-regency-jaipur",
    rating: "5 Star Luxury",
    location: "Mansarovar, Jaipur",
    description:
      "Modern luxury meets local culture. Hyatt Regency Mansarovar offers expansive banqueting spaces and contemporary design, making it perfect for high-volume corporate and wedding events.",
    features: ["Massive Banquets", "Modern Decor", "Poolside Lawns", "City Location"],
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1562790351-d273a961e00d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543967354-28193cbef2e9?auto=format&fit=crop&w=800&q=80",
    ],
    videos: ["/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.11 PM.mp4"],
  },
  {
    name: "Mundota Fort And Palace, Jaipur",
    slug: "mundota-fort-palace",
    rating: "Heritage 5 Star",
    location: "Mundota, Jaipur",
    description:
      "Experience weddings atop a hill at the Mundota Fort or in the majestic palace below. Known for its polo grounds and historical significance, it provides a truly unique setting for elite events.",
    features: ["Hilltop Fort", "Polo Grounds", "War Horse Statues", "Desert Landscape"],
    image: "https://images.unsplash.com/photo-1590050756297-bbc731766624?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1590050756297-bbc731766624?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=800&q=80",
    ],
    videos: ["/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.13 PM.mp4"],
  },
  {
    name: "The Leela Palace, Jaipur",
    slug: "the-leela-palace-jaipur",
    rating: "5 Star Luxury",
    location: "Amber, Jaipur",
    description:
      "The Leela Palace Jaipur is a stunning modern palace inspired by the grandeur of Rajputana heritage. It offers a majestic and contemporary setting for the most opulent weddings.",
    features: ["Modern Palatial Design", "Lush Lawns", "Signature Dining", "Grand Ballrooms"],
    image: "https://images.unsplash.com/photo-1513581163417-bcac5192b16e?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1513581163417-bcac5192b16e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80",
    ],
    videos: ["/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.13 PM (1).mp4"],
  },
  {
    name: "Mementos By ITC Hotels - Jaipur",
    slug: "mementos-itc-jaipur",
    rating: "5 Star Luxury",
    location: "Kukas, Jaipur",
    description:
      "A luxury resort that celebrates the unique character of Jaipur. Mementos offers bespoke experiences and grand venues that blend seamlessly with the local traditions and landscape.",
    features: ["Bespoke Service", "Luxury Villas", "Traditional Vibe", "Expansive Banquets"],
    image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    ],
    videos: ["/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.13 PM (2).mp4"],
  },
  {
    name: "Anantara Jewel Bagh Jaipur Hotel",
    slug: "anantara-jewel-bagh",
    rating: "5 Star Luxury",
    location: "Agra Road, Jaipur",
    description:
      "Bringing world-class Anantara luxury to Jaipur. Jewel Bagh is designed to host grand celebrations with a perfect mix of international hospitality and Rajasthani charm.",
    features: ["International Luxury", "Signature Pool", "Gourmet Catering", "Luxury Pavilions"],
    image: "https://images.unsplash.com/photo-1544124499-58912cbddada?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1544124499-58912cbddada?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1562790351-d273a961e00d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    ],
  },
] as const;

// Company stats
export const COMPANY_STATS = [
  { value: "100+", label: "Events Completed" },
  { value: "100+", label: "Happy Clients" },
  { value: "5+", label: "Years in Business" },
  { value: "150+", label: "Venues" },
] as const;

// About stats
export const ABOUT_STATS = [
  { value: "100+", label: "Events" },
  { value: "100+", label: "Clients" },
  { value: "5+", label: "Years" },
  { value: "150+", label: "Venues" },
] as const;

// Services
export const SERVICES = [
  {
    title: "Corporate Events",
    slug: "corporate-events",
    description:
      "We handle your business events, conferences, and meetings. Everything runs on time and looks professional.",
    icon: "briefcase",
    image: "/images/corporate-new.jpg",
  },
  {
    title: "Wedding Events",
    slug: "wedding-events",
    description:
      "Your special day deserves special care. We plan weddings that you and your guests will remember.",
    icon: "heart",
    image: "/images/family.jpg",
  },
  {
    title: "Event Production",
    slug: "event-production",
    description:
      "From planning to setup, we take care of everything. You get a complete event solution.",
    icon: "video",
    image: "/images/production-new.jpg",
  },
  {
    title: "Sports Management",
    slug: "sports-management",
    description:
      "Tournaments, marathons, or sports days — we manage all types of sports events smoothly.",
    icon: "trophy",
    image: "/images/sports-new.jpg",
  },
  {
    title: "Award Shows",
    slug: "award-shows",
    description:
      "Make your award ceremony special. We create events that honor achievements in style.",
    icon: "award",
    image: "/images/awards-new.jpg",
  },
  {
    title: "Brand Promotion",
    slug: "brand-promotion",
    description:
      "Launch your brand or product with events that get people talking and create real impact.",
    icon: "target",
    image: "/images/brand.jpg",
  },
  {
    title: "Exhibition Setup",
    slug: "exhibition-setup",
    description:
      "Trade shows and exhibitions need great setups. We design booths that attract attention.",
    icon: "layout",
    image: "/images/product.jpg",
  },
  {
    title: "Event Fabrication",
    slug: "event-fabrication",
    description:
      "Need custom stages, structures, or setups? We build exactly what your event needs.",
    icon: "box",
    image: "/images/fabrication-new.jpg",
    portfolio: [
      {
        title: "Setup Process",
        video: "/videos/gallery/WhatsApp Video 2026-06-02 at 2.51.14 AM.mp4",
      },
      {
        title: "Stage Construction",
        video: "/videos/gallery/WhatsApp Video 2026-06-02 at 2.51.15 AM (2).mp4",
      },
      {
        title: "Exhibition Fabrication",
        video: "/videos/gallery/WhatsApp Video 2026-06-02 at 2.51.15 AM.mp4",
      },
      {
        title: "Production Final",
        video: "/videos/gallery/WhatsApp Video 2026-06-02 at 2.51.16 AM.mp4",
      },
    ],
  },
  {
    title: "Event Staff",
    slug: "event-staff",
    description:
      "Our trained team makes sure your event runs smoothly and your guests are well taken care of.",
    icon: "users",
    image: "/images/staff-new.jpg",
  },
] as const;

// Why Choose Us
export const WHY_CHOOSE_US = [
  {
    title: "You Come First",
    description:
      "We listen to what you want and work hard to make it happen. Your event, your way.",
  },
  {
    title: "We Handle Everything",
    description:
      "From the first idea to the final cleanup, we take care of all the details.",
  },
  {
    title: "Years of Experience",
    description:
      "We've done this hundreds of times. You get a team that knows how to get things right.",
  },
  {
    title: "Personal Attention",
    description:
      "You get a dedicated manager who stays with you through the whole process.",
  },
  {
    title: "Fresh Ideas",
    description:
      "We bring creative solutions that make your event different and memorable.",
  },
  {
    title: "No Stress Planning",
    description:
      "We manage all vendors and logistics. You just relax and enjoy the event.",
  },
] as const;

// Event Categories
export const EVENT_CATEGORIES = [
  {
    title: "Dealer Meets",
    slug: "corporate-events",
    description: "Dealer meetings and business networking events",
    image: "/images/corporate-new.jpg",
  },
  {
    title: "Product Launches",
    slug: "brand-promotion",
    description: "Launch your new product with a memorable event",
    image: "/images/product.jpg",
  },
  {
    title: "Sports Events",
    slug: "sports-management",
    description: "Tournaments, marathons, and sports competitions",
    image: "/images/sports-new.jpg",
  },
  {
    title: "Family Day Events",
    slug: "wedding-events",
    description: "Fun family gatherings and celebration events",
    image: "/images/family.jpg",
  },
  {
    title: "Brand Promotions",
    slug: "brand-promotion",
    description: "Events that promote your brand and get attention",
    image: "/images/brand.jpg",
  },
] as const;

// Event Process (Enhanced for Roadmap)
export const EVENT_PROCESS = [
  {
    step: "01",
    title: "Consultation",
    description:
      "We talk and listen. We understand your vision, requirements, and budget to create a solid foundation.",
    icon: "message-circle",
  },
  {
    step: "02",
    title: "Design & Concept",
    description:
      "Our creative team develops unique themes and 3D layouts so you can see your event before it happens.",
    icon: "layout",
  },
  {
    step: "03",
    title: "Detailed Planning",
    description:
      "From vendor booking to logistics, we handle every detail so nothing is left to chance.",
    icon: "calendar",
  },
  {
    step: "04",
    title: "Flawless Execution",
    description:
      "Our on-site team manages everything on the big day. You just relax and enjoy your event.",
    icon: "zap",
  },
  {
    step: "05",
    title: "Handover & Feedback",
    description:
      "We ensure a smooth wrap-up and follow up to ensure we exceeded your expectations.",
    icon: "check-circle",
  },
] as const;

// Case Studies
export const CASE_STUDIES = [
  {
    id: "jaipur-tech-expo",
    title: "Rajasthan Tech Expo 2024",
    category: "Corporate Events",
    image: "/images/corporate-new.jpg",
    challenge: "Organizing a large-scale tech exhibition with 80+ exhibitors and 2000+ daily visitors in a heritage-style venue.",
    solution: "We designed a modular booth system that blended with the venue's architecture and managed crowd flow using digital check-ins.",
    result: "High exhibitor satisfaction with zero logistical delays and extensive local media coverage.",
  },
  {
    id: "royal-palace-wedding",
    title: "Heritage Palace Wedding",
    category: "Wedding Events",
    image: "/images/family.jpg",
    challenge: "Coordinating a multi-day destination wedding with guests arriving from 10 different countries and complex traditional rituals.",
    solution: "A dedicated hospitality desk was setup, and we worked with local artisans for custom floral decor that complemented the palace aesthetics.",
    result: "A seamless, culturally rich celebration that exceeded the family's expectations for hospitality and decor.",
  },
  {
    id: "retail-brand-launch",
    title: "Zest Retail Store Launch",
    category: "Brand Promotion",
    image: "/images/brand.jpg",
    challenge: "Creating buzz for a new retail chain opening in 3 different malls on the same day with a limited budget.",
    solution: "We used flash-mobs and interactive AR photobooths to engage shoppers and create instant social media content.",
    result: "Over 5000+ footfalls across all locations on day one and trending status on local social media channels.",
  },
] as const;

// Team Members
export const TEAM_MEMBERS = [
  {
    name: "Kartike Nirjayene",
    role: "Chairman",
    experience: "8 Years",
    image: "/images/chairman_final.png",
    bio: "8 Years of Experience in leadership and strategic vision.",
  },
  {
    name: "Deepak Shah",
    role: "Business Developer",
    experience: "1 Year",
    image: "/images/logo.png",
    bio: "1 Year of Experience in driving business growth and client relations.",
  },
  {
    name: "Lokesh Nagar",
    role: "HR (Human Resources)",
    experience: "3 Years",
    image: "/images/logo.png",
    bio: "3 Years of Experience in talent acquisition and team management.",
  },
] as const;

// Benefits
export const BENEFITS = [
  {
    title: "Save Your Time",
    description:
      "We do all the work. You focus on your business and let us handle the event.",
    icon: "zap",
  },
  {
    title: "Done Right",
    description:
      "Our experienced team makes sure every detail is perfect. No mistakes.",
    icon: "check-circle",
  },
  {
    title: "People Remember",
    description:
      "We create events that your guests will talk about and remember.",
    icon: "users",
  },
  {
    title: "On Time, On Budget",
    description: "We stick to your timeline and budget. No surprises or hidden costs.",
    icon: "shield",
  },
  {
    title: "Always Updated",
    description:
      "We keep you informed at every step. You always know what's happening.",
    icon: "message-circle",
  },
  {
    title: "Any Size Event",
    description:
      "Small gathering or big celebration — we handle events of all sizes.",
    icon: "trending-up",
  },
] as const;

// Breakpoints
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
} as const;

// Animation durations (in seconds)
export const ANIMATION_DURATION = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.2,
} as const;

// Company contact info
export const COMPANY_CONTACT = {
  phone: "+91 90767 73330",
  phoneRaw: "9076773330",
  whatsapp: "919076773330",
  email: "deepak.shah@stryperevent.com",
  address: "Jaipur, Rajasthan, India",
  instagram: "https://www.instagram.com/stryperevent",
  linkedin: "https://www.linkedin.com/company/stryper-solution-pvt-ltd/",
  facebook: "https://facebook.com/stryperevent",
  twitter: "https://twitter.com/stryperevent",
} as const;

// Colors
export const COLORS = {
  primary: {
    black: "#0a0a0a",
    yellow: "#facc15",
    gold: "#fbbf24",
  },
  accent: {
    yellow: "#facc15",
    gold: "#fbbf24",
    goldLight: "#fde68a",
  },
} as const;
