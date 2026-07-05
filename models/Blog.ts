import { Schema, Document, model, models } from "mongoose";

export interface IBlog extends Document {
  title: string;
  subtitle?: string;
  category?: string;
  content: string;
  coverImage?: string; // base64 or URL
  author?: string;
  readTime?: string;
  date: string;
  created_at: Date;
}

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  subtitle: { type: String },
  category: { type: String, default: "Event Planning" },
  content: { type: String, required: true },
  coverImage: { type: String },
  author: { type: String, default: "Administrator" },
  readTime: { type: String },
  date: { type: String },
  created_at: { type: Date, default: Date.now },
});

export const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);
