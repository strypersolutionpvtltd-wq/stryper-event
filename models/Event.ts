import { Schema, Document, model, models } from "mongoose";

export interface IEvent extends Document {
  title: string;
  category: string;
  type: string; // 'image' | 'video' | 'coming-soon'
  image?: string; // base64 or URL
  video?: string; // base64 or URL
  created_at: Date;
}

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String },
  video: { type: String },
  created_at: { type: Date, default: Date.now },
});

export const Event = models.Event || model<IEvent>("Event", EventSchema);
