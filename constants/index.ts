// Navigation items
export const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
] as const;

// Company stats
export const COMPANY_STATS = [
  { value: "100+", label: "Events Completed" },
  { value: "5+", label: "Happy Clients" },
  { value: "5+", label: "Years in Business" },
  { value: "150+", label: "Venues" },
] as const;

// About stats
export const ABOUT_STATS = [
  { value: "100+", label: "Events" },
  { value: "5+", label: "Clients" },
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
    image: "/images/dealer.jpg",
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
    image: "/images/gallery/1120880-ambiance-concert.jpg.jpeg",
  },
  {
    title: "Sports Management",
    slug: "sports-management",
    description:
      "Tournaments, marathons, or sports days — we manage all types of sports events smoothly.",
    icon: "trophy",
    image: "/images/sports.jpg",
  },
  {
    title: "Award Shows",
    slug: "award-shows",
    description:
      "Make your award ceremony special. We create events that honor achievements in style.",
    icon: "award",
    image: "/images/gallery/Award-shows-Host.jpg.jpeg",
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
    image: "/images/gallery/w5-1024x782.jpg.jpeg",
  },
  {
    title: "Event Staff",
    slug: "event-staff",
    description:
      "Our trained team makes sure your event runs smoothly and your guests are well taken care of.",
    icon: "users",
    image: "/images/gallery/IMG_1850.JPG.jpeg",
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
    image: "/images/dealer.jpg",
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
    image: "/images/sports.jpg",
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
    image: "/images/dealer.jpg",
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
    name: "Deepak Shah",
    role: "Founder & Director",
    experience: "8+ Years",
    image: "/images/logo.png",
    bio: "The driving force behind Stryper, Deepak has managed over 500+ events with a focus on precision and client happiness.",
  },
  {
    name: "Kartikey Niranjan",
    role: "Co-Founder & Creative Head",
    experience: "6+ Years",
    image: "/images/logo.png",
    bio: "Expert in conceptualizing unique event themes and ensuring high-end visual aesthetics for every project.",
  },
  {
    name: "Aman Nayak",
    role: "Head of Operations",
    experience: "7+ Years",
    image: "/images/logo.png",
    bio: "Specializes in ground execution and vendor management, making sure every event runs like clockwork.",
  },
  {
    name: "Lokesh Nagar",
    role: "Senior Event Strategist",
    experience: "5+ Years",
    image: "/images/logo.png",
    bio: "Dedicated to planning and strategy, ensuring that every client's vision is translated into a successful reality.",
  },
] as const;

// Video Testimonials
export const VIDEO_TESTIMONIALS = [
  {
    id: 1,
    clientName: "Rahul Kapoor",
    event: "Annual Corporate Gala",
    videoUrl: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.11 PM (1).mp4",
    thumbnail: "/images/dealer.jpg",
  },
  {
    id: 2,
    clientName: "Sneha & Amit",
    event: "Royal Destination Wedding",
    videoUrl: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.13 PM (1).mp4",
    thumbnail: "/images/family.jpg",
  },
  {
    id: 3,
    clientName: "Vikram Singh",
    event: "Product Launch Event",
    videoUrl: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.12 PM (1).mp4",
    thumbnail: "/images/brand.jpg",
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
