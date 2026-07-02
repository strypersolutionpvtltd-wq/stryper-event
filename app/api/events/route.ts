import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "events.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Helper to verify admin token
function verifyAdmin(request: Request): boolean {
  try {
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
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

// Helper to read events from file
async function readEvents(): Promise<any[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.warn("Could not read events.json, returning empty array:", error);
    return [];
  }
}

// Helper to write events to file
async function writeEvents(events: any[]) {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(events, null, 2), "utf-8");
}

export async function GET() {
  try {
    const events = await readEvents();
    return NextResponse.json(events);
  } catch (error) {
    console.error("GET events error:", error);
    return NextResponse.json({ error: "Failed to read events portfolio" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const category = formData.get("category")?.toString();
    const type = formData.get("type")?.toString(); // "image" | "video" | "coming-soon"
    const mediaSource = formData.get("mediaSource")?.toString(); // "upload" | "url" | "none"
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

        // Ensure upload directory exists
        await fs.mkdir(UPLOAD_DIR, { recursive: true });

        // Create unique name
        const fileExt = path.extname(file.name);
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${fileExt}`;
        const filePath = path.join(UPLOAD_DIR, fileName);

        // Save file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await fs.writeFile(filePath, buffer);

        mediaUrl = `/uploads/${fileName}`;
      } else if (mediaSource === "url") {
        if (!externalUrl) {
          return NextResponse.json({ error: "External URL is required" }, { status: 400 });
        }
        mediaUrl = externalUrl;
      }
    }

    const events = await readEvents();

    // Create new event item
    const newEvent: any = {
      id: Date.now(), // Unique ID based on timestamp
      category,
      title,
      type,
    };

    if (type === "image") {
      newEvent.image = mediaUrl;
    } else if (type === "video") {
      newEvent.video = mediaUrl;
    }

    // Add to the top
    events.unshift(newEvent);
    await writeEvents(events);

    return NextResponse.json({ success: true, event: newEvent });
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
    const { searchParams } = new URL(request.url);
    const idStr = searchParams.get("id");
    if (!idStr) {
      return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
    }

    const id = parseInt(idStr, 10);
    const events = await readEvents();
    
    // Find the item index supporting both numbers and string match
    const itemIndex = events.findIndex(
      (e) => e.id === id || e.id?.toString() === idStr
    );

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Event post not found" }, { status: 404 });
    }

    const item = events[itemIndex];

    // Delete local file if it exists
    const mediaUrl = item.type === "image" ? item.image : item.video;
    if (mediaUrl && mediaUrl.startsWith("/uploads/")) {
      const fileName = mediaUrl.replace("/uploads/", "");
      const filePath = path.join(UPLOAD_DIR, fileName);
      try {
        await fs.unlink(filePath);
      } catch (err) {
        console.warn("Failed to delete local media file from disk:", filePath, err);
      }
    }

    events.splice(itemIndex, 1);
    await writeEvents(events);

    return NextResponse.json({ success: true, message: "Event post deleted successfully" });
  } catch (error) {
    console.error("Failed to delete event:", error);
    return NextResponse.json({ error: "Failed to delete event post" }, { status: 500 });
  }
}
