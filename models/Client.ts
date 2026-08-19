import { Schema, Document, model, models } from "mongoose";

export interface IClient extends Document {
  name: string;
  logo?: string;
  website?: string;
  order?: number;
  created_at: Date;
}

const ClientSchema = new Schema<IClient>({
  name: { type: String, required: true },
  logo: { type: String, default: "" },
  website: { type: String, default: "" },
  order: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

export const Client = models.Client || model<IClient>("Client", ClientSchema);
