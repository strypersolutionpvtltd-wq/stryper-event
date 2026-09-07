import { Schema, Document, model, models } from "mongoose";

export interface IReview extends Document {
  name: string;
  company?: string;
  role?: string;
  eventName?: string;
  rating: number;
  text: string;
  status: "approved" | "pending";
  created_at: Date;
}

const ReviewSchema = new Schema<IReview>({
  name: { type: String, required: true },
  company: { type: String, default: "" },
  role: { type: String, default: "" },
  eventName: { type: String, default: "" },
  rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
  text: { type: String, required: true },
  status: { type: String, enum: ["approved", "pending"], default: "approved" },
  created_at: { type: Date, default: Date.now },
});

export const Review = models.Review || model<IReview>("Review", ReviewSchema);
