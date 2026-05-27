# Stryper Event Management Website

A premium, modern event management website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Premium glass-morphism UI with smooth animations
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Performance Optimized**: Built with Next.js 14 for optimal performance
- **Type-Safe**: Full TypeScript implementation
- **Smooth Animations**: Powered by Framer Motion
- **Smooth Scrolling**: Lenis smooth scroll integration
- **Contact Form**: Functional contact form with API integration
- **WhatsApp Integration**: Floating WhatsApp button for quick inquiries
- **SEO Optimized**: Meta tags and semantic HTML
- **Production Ready**: ESLint, Prettier, and TypeScript configured

## 📋 Sections

1. **Hero** - Eye-catching hero section with animated stats
2. **About** - Company introduction with statistics
3. **Services** - Comprehensive service offerings
4. **Why Choose Us** - Key differentiators
5. **Event Categories** - Types of events handled
6. **Event Process** - Step-by-step process
7. **Video Showcase** - Video player with modal
8. **Gallery** - Filterable image gallery
9. **Benefits** - Client benefits
10. **Client Logos** - Infinite scrolling client logos
11. **FAQ** - Frequently asked questions
12. **Contact** - Contact form with validation
13. **Footer** - Company information and links

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React
- **Linting**: ESLint
- **Formatting**: Prettier

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd stryper-events
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```
Edit `.env.local` with your actual values.

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbo
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts

## 📁 Project Structure

```
stryper-events/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API endpoint
│   ├── fonts/                    # Custom fonts
│   ├── favicon.ico
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx
│   ├── sections/                 # Page sections
│   │   ├── About.tsx
│   │   ├── Benefits.tsx
│   │   ├── ClientLogos.tsx
│   │   ├── Contact.tsx
│   │   ├── EventCategories.tsx
│   │   ├── EventProcess.tsx
│   │   ├── FAQ.tsx
│   │   ├── Footer.tsx
│   │   ├── Gallery.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Services.tsx
│   │   ├── VideoShowcase.tsx
│   │   └── WhyChooseUs.tsx
│   ├── ui/                       # Reusable UI components
│   │   ├── AnimatedCard.tsx
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── PageLoader.tsx
│   │   ├── SectionDivider.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── StatCounter.tsx
│   │   └── WhatsAppButton.tsx
│   └── index.ts                  # Component exports
├── constants/
│   └── index.ts                  # App constants
├── hooks/
│   ├── useMediaQuery.ts
│   └── useScrollPosition.ts
├── lib/
│   ├── animations.ts             # Framer Motion variants
│   ├── metadata.ts               # SEO metadata
│   └── utils.ts                  # Utility functions
├── public/
│   └── images/                   # Image assets
├── .env.example                  # Environment variables template
├── .eslintrc.json               # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme:
```typescript
colors: {
  primary: {
    black: "#0a0a0a",
    yellow: "#facc15",
    gold: "#fbbf24",
  },
  accent: {
    yellow: "#facc15",
    gold: "#fbbf24",
    "gold-light": "#fde68a",
  },
}
```

### Content
Edit constants in `constants/index.ts`:
- Navigation items
- Company stats
- Services
- Event categories
- FAQ items
- And more...

### Contact Information
Update in `.env.local`:
- Phone number
- Email address
- WhatsApp number
- Physical address

## 📧 Email Integration

The contact form API is ready for email integration. Choose one of these options:

### Option 1: SendGrid
```bash
npm install @sendgrid/mail
```

### Option 2: Resend
```bash
npm install resend
```

### Option 3: Nodemailer (SMTP)
```bash
npm install nodemailer
```

Update `app/api/contact/route.ts` with your chosen email service implementation.

## 🖼️ Adding Images

1. Place images in `public/images/`
2. Follow naming conventions in `public/images/README.md`
3. Recommended: Use WebP format for better performance
4. Optimize images before uploading (< 500KB)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
1. Build the project: `npm run build`
2. Start production server: `npm run start`
3. Or deploy the `.next` folder to your hosting provider

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## ⚡ Performance Tips

1. **Image Optimization**: Use Next.js Image component for automatic optimization
2. **Code Splitting**: Leverage Next.js automatic code splitting
3. **Lazy Loading**: Components are lazy-loaded where appropriate
4. **Font Optimization**: Using next/font for optimal font loading
5. **CSS Optimization**: Tailwind CSS purges unused styles in production

## 🔒 Security

- Environment variables for sensitive data
- API route validation
- Input sanitization in forms
- CORS configuration
- Rate limiting (recommended for production)

## 📄 License

This project is proprietary and confidential.

## 🤝 Support

For support, email deepak.shah@stryperevent.com or contact via WhatsApp.

## 🎯 Future Enhancements

- [ ] Add blog section
- [ ] Implement CMS integration
- [ ] Add testimonials slider
- [ ] Integrate analytics
- [ ] Add multi-language support
- [ ] Implement admin dashboard
- [ ] Add real-time chat support
- [ ] Integrate payment gateway
- [ ] Add event booking system
- [ ] Implement user authentication

## 📝 Notes

- Replace placeholder images with actual event photos
- Update contact information in environment variables
- Configure email service for contact form
- Add Google Analytics tracking ID
- Set up social media links
- Update meta tags for SEO
- Add favicon and app icons
- Configure domain and SSL certificate

---

Built with ❤️ by Stryper Event Management Team
