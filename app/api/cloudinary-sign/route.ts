import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST() {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "defnbmovm";
    const apiKey = process.env.CLOUDINARY_API_KEY || "122187293492261";
    const apiSecret = process.env.CLOUDINARY_API_SECRET || "YkTOOogzHiPu7l4Gr_cg0VNNieQ";

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: "Cloudinary credentials missing" }, { status: 500 });
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = "stryper_events";

    // Alphabetically sorted query string parameters to sign
    const strToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(strToSign).digest("hex");

    return NextResponse.json({
      signature,
      timestamp,
      apiKey,
      cloudName,
      folder,
    });
  } catch (error: any) {
    console.error("Cloudinary sign error:", error);
    return NextResponse.json({ error: "Failed to generate upload signature" }, { status: 500 });
  }
}
