import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Optimizes Cloudinary URLs by applying automatic format (WebP/AVIF),
 * automatic quality compression, and responsive max-width resizing.
 * Reduces 5MB-10MB raw photos to ~100KB-150KB for instant loading.
 */
export function optimizeCloudinaryUrl(url: string, width = 1200): string {
  if (!url || typeof url !== "string") return url || "";
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    if (url.includes("/f_auto,q_auto")) return url;
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  }
  return url;
}
