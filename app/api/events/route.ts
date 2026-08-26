import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Event } from "@/models/Event";
import crypto from "crypto";
import fallbackEvents from "@/data/events.json";

// Helper to verify admin token
function verifyAdmin(request: Request): boolean {
  try {
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "event@@2026";
    const expectedToken = crypto
      .createHmac("sha256", ADMIN_PASSWORD)
      .update("stryper-admin-session")
      .digest("hex");

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return false;
    }
    const token = authHeader.substring(7);
    return token === expectedToken;
  } catch (error) {
    return false;
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const events = await Event.find({}).sort({ created_at: -1 });
    
    // Transform _id to id for the frontend
    const transformedEvents = events.map((evt) => {
      const obj = evt.toObject();
      return {
        ...obj,
        id: obj._id.toString(),
      };
    });

    return NextResponse.json(transformedEvents);
  } catch (error: any) {
    console.warn("MongoDB connection warning, using fallback events data:", error?.message || error);
    return NextResponse.json(fallbackEvents, { status: 200 });
  }
}

export async function POST(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const category = formData.get("category")?.toString();
    const type = formData.get("type")?.toString(); // "image" | "video" | "coming-soon"
    const mediaSource = formData.get("mediaSource")?.toString(); // "upload" | "url"
    const externalUrl = formData.get("externalUrl")?.toString();

    let mediaUrls: string[] = [];
    const directMediaUrlsJson = formData.get("directMediaUrlsJson")?.toString();
    const rawDirectUrls = formData.getAll("directMediaUrls").map((v) => v.toString()).filter(Boolean);
    const directMediaUrl = formData.get("directMediaUrl")?.toString();

    if (directMediaUrlsJson) {
      try {
        mediaUrls = JSON.parse(directMediaUrlsJson);
      } catch (e) {
        mediaUrls = [];
      }
    } else if (rawDirectUrls.length > 0) {
      mediaUrls = rawDirectUrls;
    } else if (directMediaUrl) {
      mediaUrls = [directMediaUrl];
    }

    if (type !== "coming-soon" && mediaUrls.length === 0) {
      if (mediaSource === "upload") {
        const files = formData.getAll("file") as File[];
        const singleFile = formData.get("file") as File;
        const uploadFiles = files.length > 0 ? files : singleFile ? [singleFile] : [];

        if (uploadFiles.length === 0 || uploadFiles[0].size === 0) {
          return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        for (const file of uploadFiles) {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const base64String = buffer.toString("base64");
          mediaUrls.push(`data:${file.type};base64,${base64String}`);
        }
      } else if (mediaSource === "url") {
        if (!externalUrl) {
          return NextResponse.json({ error: "External URL is required" }, { status: 400 });
        }
        mediaUrls = [externalUrl];
      }
    }

    // Save event to MongoDB
    const newEventData: any = {
      title,
      category,
      type,
    };

    if (type === "image") {
      newEventData.images = mediaUrls;
      newEventData.image = mediaUrls[0] || "";
    } else if (type === "video") {
      newEventData.video = mediaUrls[0] || "";
    }

    const newEvent = new Event(newEventData);
    await newEvent.save();

    const result = newEvent.toObject();
    result.id = result._id.toString();

    return NextResponse.json({ success: true, event: result });
  } catch (error) {
    console.error("Failed to add event:", error);
    return NextResponse.json({ error: "Failed to add event post" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
    }

    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return NextResponse.json({ error: "Event post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Event post deleted successfully" });
  } catch (error) {
    console.error("Failed to delete event:", error);
    return NextResponse.json({ error: "Failed to delete event post" }, { status: 500 });
  }
}
