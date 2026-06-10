import Container from "@/components/ui/Container";
import { MessageSquare, Phone, Mail } from "lucide-react";
import { COMPANY_CONTACT } from "@/constants";
import { Metadata } from "next";
import GetStartedForm from "@/components/ui/GetStartedForm";

export const metadata: Metadata = {
  title: "Contact Us | Stryper Event Management",
  description: "Get in touch with us via WhatsApp or Phone to plan your next event in Jaipur.",
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: MessageSquare,
      title: "WhatsApp Us",
      description: "Fastest way to get a quote",
      value: COMPANY_CONTACT.phone,
      href: `https://wa.me/${COMPANY_CONTACT.whatsapp.replace(/[^0-9]/g, "")}`,
      color: "bg-[#25D366]",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Available 10 AM - 8 PM",
      value: COMPANY_CONTACT.phone,
      href: `tel:${COMPANY_CONTACT.phoneRaw}`,
      color: "bg-accent-yellow",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "For official enquiries",
      value: COMPANY_CONTACT.email,
      href: `mailto:${COMPANY_CONTACT.email}`,
      color: "bg-white/10",
    },
  ];

  return (
    <main className="pt-32 pb-16">
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">Get In Touch</h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Ready to plan your next big event? Fill out our form or connect with us directly on WhatsApp.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20 items-start">
          {/* Left: Form */}
          <div className="glass glow-border p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent-yellow" />
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-8">Send Us a Message</h2>
            <GetStartedForm />
          </div>

          {/* Right: Contact Methods */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group relative p-8 rounded-[2rem] glass glow-border overflow-hidden transition-all hover:-translate-y-2"
                >
                  <div className={`w-12 h-12 ${method.color} rounded-2xl flex items-center justify-center mb-6 text-black transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                    <method.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-4">{method.description}</p>
                  <p className="text-sm text-white/80 font-medium break-all">{method.value}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
