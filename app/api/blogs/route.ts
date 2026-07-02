import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "blogs.json");

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

// Helper to read blogs from file
async function readBlogs(): Promise<any[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.warn("Could not read blogs.json, returning empty array:", error);
    return [];
  }
}

export async function GET() {
  try {
    const blogs = await readBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("GET blogs error:", error);
    return NextResponse.json({ error: "Failed to read blogs data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Blog creation logic stub (ready for future expansion)
  return NextResponse.json(
    { 
      success: true, 
      message: "Blog creation API stub called successfully. Full integration coming soon." 
    },
    { status: 200 }
  );
}

export async function DELETE(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Blog deletion logic stub (ready for future expansion)
  return NextResponse.json(
    { 
      success: true, 
      message: "Blog deletion API stub called successfully. Full integration coming soon." 
    },
    { status: 200 }
  );
}
