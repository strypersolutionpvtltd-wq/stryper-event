import { Schema, Document, model, models } from "mongoose";

export interface ITag extends Document {
  name: string;
  slug: string;
  created_at: Date;
}

const TagSchema = new Schema<ITag>({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
});

export const Tag = models.Tag || model<ITag>("Tag", TagSchema);
