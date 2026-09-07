import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Review } from "@/models/Review";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import defaultReviews from "@/data/reviews.json";

const REVIEWS_FILE = path.join(process.cwd(), "data", "reviews.json");

// Helper to read local JSON file
function readLocalReviews(): any[] {
  try {
    if (fs.existsSync(REVIEWS_FILE)) {
      const content = fs.readFileSync(REVIEWS_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (e) {
    console.warn("Could not read local reviews file:", e);
  }
  return defaultReviews;
}

// Helper to write local JSON file
function writeLocalReviews(data: any[]) {
  try {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.warn("Could not write to local reviews file:", e);
  }
}

// Helper to verify admin token
function verifyAdmin(request: Request): boolean {
  try {
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "stryper@@2002";
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
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isAdminQuery = searchParams.get("admin") === "true";
  const isAdmin = isAdminQuery && verifyAdmin(request);

  try {
    await connectToDatabase();

    let query: any = {};
    if (!isAdmin) {
      query.status = "approved";
    }

    let reviews = await Review.find(query).sort({ created_at: -1 });

    if (reviews.length === 0) {
      const local = readLocalReviews();
      if (local.length > 0) {
        try {
          await Review.insertMany(local);
          reviews = await Review.find(query).sort({ created_at: -1 });
        } catch {
          // ignore seed error
        }
      }
    }

    if (reviews.length > 0) {
      const transformed = reviews.map((r) => {
        const obj = r.toObject();
        return {
          ...obj,
          id: obj._id.toString(),
        };
      });
      return NextResponse.json(transformed);
    }
  } catch (error: any) {
    console.warn("MongoDB offline, serving local reviews data:", error?.message || error);
  }

  // Fallback to local file
  const localList = readLocalReviews();
  const filtered = isAdmin
    ? localList
    : localList.filter((r) => !r.status || r.status === "approved");

  return NextResponse.json(
    filtered.map((r, i) => ({
      ...r,
      id: r.id || `local-rev-${i + 1}`,
    })),
    { status: 200 }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, role, eventName, rating, text } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Please provide your name" }, { status: 400 });
    }

    if (!text || !text.trim()) {
      return NextResponse.json({ error: "Please provide your review feedback" }, { status: 400 });
    }

    const parsedRating = Number(rating) || 5;
    if (parsedRating < 1 || parsedRating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5 stars" }, { status: 400 });
    }

    const newReviewData: any = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      company: company ? company.trim() : "",
      role: role ? role.trim() : "",
      eventName: eventName ? eventName.trim() : "",
      rating: parsedRating,
      text: text.trim(),
      status: "approved",
      created_at: new Date().toISOString(),
    };

    // Save to local file so it is ALWAYS persisted and available immediately
    const existingReviews = readLocalReviews();
    existingReviews.unshift(newReviewData);
    writeLocalReviews(existingReviews);

    // Also attempt to save to MongoDB
    try {
      await connectToDatabase();
      const mongoReview = new Review({
        name: newReviewData.name,
        company: newReviewData.company,
        role: newReviewData.role,
        eventName: newReviewData.eventName,
        rating: newReviewData.rating,
        text: newReviewData.text,
        status: newReviewData.status,
        created_at: new Date(newReviewData.created_at),
      });
      await mongoReview.save();
      newReviewData.id = mongoReview._id.toString();
    } catch (dbErr) {
      console.warn("MongoDB save warning, review saved to local storage:", dbErr);
    }

    return NextResponse.json({ success: true, review: newReviewData }, { status: 201 });
  } catch (error: any) {
    console.error("Failed to submit review:", error);
    return NextResponse.json({ error: "Failed to submit review. Please try again." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing review ID" }, { status: 400 });
    }

    // Delete from local file
    const local = readLocalReviews();
    const updated = local.filter((r) => r.id !== id);
    writeLocalReviews(updated);

    // Also delete from MongoDB if valid ObjectId
    try {
      await connectToDatabase();
      await Review.findByIdAndDelete(id);
    } catch {
      // ignore
    }

    return NextResponse.json({ success: true, message: "Review deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete review:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !["approved", "pending"].includes(status)) {
      return NextResponse.json({ error: "Invalid review ID or status" }, { status: 400 });
    }

    // Update in local file
    const local = readLocalReviews();
    let updatedReview: any = null;
    const modified = local.map((r) => {
      if (r.id === id) {
        updatedReview = { ...r, status };
        return updatedReview;
      }
      return r;
    });
    writeLocalReviews(modified);

    // Also update in MongoDB
    try {
      await connectToDatabase();
      const doc = await Review.findByIdAndUpdate(id, { status }, { new: true });
      if (doc) updatedReview = doc;
    } catch {
      // ignore
    }

    return NextResponse.json({ success: true, review: updatedReview });
  } catch (error: any) {
    console.error("Failed to update review status:", error);
    return NextResponse.json({ error: "Failed to update review status" }, { status: 500 });
  }
}
