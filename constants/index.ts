// Navigation items
export const NAV_ITEMS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Events", href: "#events" },
  { name: "Contact", href: "#contact" },
] as const;

// Company stats
export const COMPANY_STATS = [
  { value: "100+", label: "Events Completed" },
  { value: "15+", label: "Happy Clients" },
  { value: "5+", label: "Years in Business" },
  { value: "150+", label: "Venues" },
] as const;

// About stats
export const ABOUT_STATS = [
  { value: "100+", label: "Events" },
  { value: "15+", label: "Clients" },
  { value: "5+", label: "Years" },
  { value: "150+", label: "Venues" },
] as const;

// Services
export const SERVICES = [
  {
    title: "Corporate Events",
    description:
      "We handle your business events, conferences, and meetings. Everything runs on time and looks professional.",
    icon: "briefcase",
    image: "/images/dealer.jpg",
  },
  {
    title: "Wedding Events",
    description:
      "Your special day deserves special care. We plan weddings that you and your guests will remember.",
    icon: "heart",
    image: "/images/family.jpg",
  },
  {
    title: "Event Production",
    description:
      "From planning to setup, we take care of everything. You get a complete event solution.",
    icon: "video",
    image: "/images/gallery/1120880-ambiance-concert.jpg.jpeg",
  },
  {
    title: "Sports Events",
    description:
      "Tournaments, marathons, or sports days — we manage all types of sports events smoothly.",
    icon: "trophy",
    image: "/images/sports.jpg",
  },
  {
    title: "Award Shows",
    description:
      "Make your award ceremony special. We create events that honor achievements in style.",
    icon: "award",
    image: "/images/gallery/Award-shows-Host.jpg.jpeg",
  },
  {
    title: "Brand Promotion",
    description:
      "Launch your brand or product with events that get people talking and create real impact.",
    icon: "target",
    image: "/images/brand.jpg",
  },
  {
    title: "Exhibition Setup",
    description:
      "Trade shows and exhibitions need great setups. We design booths that attract attention.",
    icon: "layout",
    image: "/images/product.jpg",
  },
  {
    title: "Event Fabrication",
    description:
      "Need custom stages, structures, or setups? We build exactly what your event needs.",
    icon: "box",
    image: "/images/gallery/w5-1024x782.jpg.jpeg",
  },
  {
    title: "Event Staff",
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
    description: "Dealer meetings and business networking events",
    image: "/images/dealer.jpg",
  },
  {
    title: "Product Launches",
    description: "Launch your new product with a memorable event",
    image: "/images/product.jpg",
  },
  {
    title: "Sports Events",
    description: "Tournaments, marathons, and sports competitions",
    image: "/images/sports.jpg",
  },
  {
    title: "Family Day Events",
    description: "Fun family gatherings and celebration events",
    image: "/images/family.jpg",
  },
  {
    title: "Brand Promotions",
    description: "Events that promote your brand and get attention",
    image: "/images/brand.jpg",
  },
] as const;

// Event Process
export const EVENT_PROCESS = [
  {
    step: "01",
    title: "We Talk",
    description:
      "Tell us what you want. We listen carefully and understand your needs and budget.",
  },
  {
    step: "02",
    title: "We Plan",
    description:
      "We create a detailed plan, book vendors, and prepare everything your event needs.",
  },
  {
    step: "03",
    title: "We Setup",
    description:
      "Our team arrives early to set up everything perfectly before your guests arrive.",
  },
  {
    step: "04",
    title: "Event Day",
    description:
      "We manage everything on the day so you can relax and enjoy your event.",
  },
  {
    step: "05",
    title: "Follow Up",
    description:
      "After the event, we check in with you and learn how we can do even better.",
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
