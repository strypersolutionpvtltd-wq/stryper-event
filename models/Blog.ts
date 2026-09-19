import { Schema, Document, model, models } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  subtitle?: string;
  excerpt?: string;
  category: string;
  tags?: string[];
  content: string;
  coverImage?: string;
  author: string;
  readTime?: string;
  date: string;
  order?: number;
  status: "draft" | "published" | "archived";
  ctaText?: string;
  ctaUrl?: string;
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  created_at: Date;
  updated_at: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    subtitle: { type: String, default: "" },
    excerpt: { type: String, default: "" },
    category: { type: String, default: "Event Planning", index: true },
    tags: [{ type: String }],
    content: { type: String, required: true },
    coverImage: { type: String, default: "/images/corporate-new.jpg" },
    author: { type: String, default: "Stryper Editorial" },
    readTime: { type: String, default: "5 min read" },
    date: { type: String, default: () => new Date().toISOString().split("T")[0] },
    order: { type: Number, default: 0, index: true },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },
    ctaText: { type: String, default: "Book Your Consultation With Stryper Events" },
    ctaUrl: { type: String, default: "/contact" },
    seoTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    focusKeyword: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },
    ogTitle: { type: String, default: "" },
    ogDescription: { type: String, default: "" },
    ogImage: { type: String, default: "" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);
