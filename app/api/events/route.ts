import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Event } from "@/models/Event";
import crypto from "crypto";

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
    console.error("GET events error:", error);
    // Return empty array on connection warning to prevent client crash during setup
    if (error.message && error.message.includes("MONGODB_URI")) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: "Failed to read events portfolio" }, { status: 500 });
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

    if (!title || !category || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let mediaUrl = "";

    if (type !== "coming-soon") {
      if (mediaSource === "upload") {
        const file = formData.get("file") as File;
        if (!file || file.size === 0) {
          return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Convert file to Base64 data URI (enables direct cloud database storage)
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64String = buffer.toString("base64");
        mediaUrl = `data:${file.type};base64,${base64String}`;
      } else if (mediaSource === "url") {
        if (!externalUrl) {
          return NextResponse.json({ error: "External URL is required" }, { status: 400 });
        }
        mediaUrl = externalUrl;
      }
    }

    // Save event to MongoDB
    const newEventData: any = {
      title,
      category,
      type,
    };

    if (type === "image") {
      newEventData.image = mediaUrl;
    } else if (type === "video") {
      newEventData.video = mediaUrl;
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
