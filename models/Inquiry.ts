import { Schema, Document, model, models } from "mongoose";

export interface IInquiry extends Document {
  fullName: string;
  phone: string;
  email: string;
  type: "event" | "tourism";
  selectedPlan?: string;
  numPersons?: number;
  travelDate?: string;
  eventType?: string;
  budgetRange?: string;
  eventDate?: string;
  message?: string;
  created_at: Date;
}

const InquirySchema = new Schema<IInquiry>({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, enum: ["event", "tourism"], default: "event" },
  selectedPlan: { type: String },
  numPersons: { type: Number },
  travelDate: { type: String },
  eventType: { type: String },
  budgetRange: { type: String },
  eventDate: { type: String },
  message: { type: String },
  created_at: { type: Date, default: Date.now },
});

export const Inquiry = models.Inquiry || model<IInquiry>("Inquiry", InquirySchema);
