import { Schema, Document, model, models } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  created_at: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  created_at: { type: Date, default: Date.now },
});

export const Category = models.Category || model<ICategory>("Category", CategorySchema);
