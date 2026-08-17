import { NextResponse } from "next/server";
import crypto from "crypto";

export const maxDuration = 60; // 60 seconds per chunk limit

export async function POST(request: Request) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "defnbmovm";
    const apiKey = process.env.CLOUDINARY_API_KEY || "122187293492261";
    const apiSecret = process.env.CLOUDINARY_API_SECRET || "YkTOOogzHiPu7l4Gr_cg0VNNieQ";

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: "Cloudinary credentials missing" }, { status: 500 });
    }

    const formData = await request.formData();
    const fileChunk = formData.get("file") as File;
    const resourceType = (formData.get("resourceType")?.toString() || "video") as "image" | "video";
    const contentRange = formData.get("contentRange")?.toString();
    const uploadId = formData.get("uploadId")?.toString();

    if (!fileChunk) {
      return NextResponse.json({ error: "No file chunk provided" }, { status: 400 });
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = "stryper_events";

    // Alphabetical signature: folder=stryper_events&timestamp=...<secret>
    const strToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(strToSign).digest("hex");

    const arrayBuffer = await fileChunk.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Endpoint for Cloudinary upload
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const cloudinaryFormData = new FormData();
    const blob = new Blob([buffer], { type: fileChunk.type || "video/mp4" });
    cloudinaryFormData.append("file", blob, fileChunk.name || "video.mp4");
    cloudinaryFormData.append("api_key", apiKey);
    cloudinaryFormData.append("timestamp", timestamp.toString());
    cloudinaryFormData.append("signature", signature);
    cloudinaryFormData.append("folder", folder);

    const headers: Record<string, string> = {};
    if (contentRange) {
      headers["Content-Range"] = contentRange;
    }
    if (uploadId) {
      headers["X-Unique-Upload-Id"] = uploadId;
    }

    const cloudinaryRes = await fetch(cloudinaryUrl, {
      method: "POST",
      headers,
      body: cloudinaryFormData,
    });

    const resText = await cloudinaryRes.text();
    let resData: any = {};
    try {
      resData = JSON.parse(resText);
    } catch (e) {
      console.error("Cloudinary Non-JSON Response:", resText.substring(0, 300));
      return NextResponse.json({ error: `Cloudinary response error: ${resText.substring(0, 100)}` }, { status: 500 });
    }

    if (!cloudinaryRes.ok) {
      console.error("Cloudinary Server Error:", resData);
      return NextResponse.json(
        { error: resData?.error?.message || `Cloudinary rejected chunk (${cloudinaryRes.status})` },
        { status: cloudinaryRes.status }
      );
    }

    return NextResponse.json({
      success: true,
      secure_url: resData.secure_url,
      public_id: resData.public_id,
    });
  } catch (error: any) {
    console.error("Upload video route error:", error);
    return NextResponse.json({ error: error.message || "Failed to process video upload" }, { status: 500 });
  }
}
