import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "defnbmovm";
    const apiKey = process.env.CLOUDINARY_API_KEY || "122187293492261";
    const apiSecret = process.env.CLOUDINARY_API_SECRET || "YkTOOogzHiPu7l4Gr_cg0VNNieQ";

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: "Cloudinary credentials not configured" }, { status: 500 });
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

    // Create Cloudinary signature
    const strToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(strToSign).digest("hex");

    // Convert file chunk to buffer for sending to Cloudinary
    const arrayBuffer = await fileChunk.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Endpoint URL (use upload_large for chunked or large files)
    const cloudinaryUrl = contentRange
      ? `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload_large`
      : `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const cloudinaryFormData = new FormData();
    const blob = new Blob([buffer], { type: fileChunk.type || "application/octet-stream" });
    cloudinaryFormData.append("file", blob, fileChunk.name || "chunk");
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

    const resData = await cloudinaryRes.json();

    if (!cloudinaryRes.ok) {
      console.error("Cloudinary Chunk Error:", resData);
      return NextResponse.json(
        { error: resData?.error?.message || `Cloudinary rejected chunk (${cloudinaryRes.status})` },
        { status: cloudinaryRes.status }
      );
    }

    return NextResponse.json({
      success: true,
      secure_url: resData.secure_url,
      public_id: resData.public_id,
      done: !!resData.secure_url,
    });
  } catch (error: any) {
    console.error("Upload chunk route error:", error);
    return NextResponse.json({ error: error.message || "Failed to process chunk upload" }, { status: 500 });
  }
}
