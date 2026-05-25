import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stryper Event Management",
    short_name: "Stryper Events",
    description:
      "Premium event management services for corporate events, weddings, sports, and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#facc15",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
