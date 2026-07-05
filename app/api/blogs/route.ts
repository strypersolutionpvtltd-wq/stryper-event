import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Blog } from "@/models/Blog";
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
    const blogs = await Blog.find({}).sort({ created_at: -1 });

    // Transform _id to id for the frontend
    const transformedBlogs = blogs.map((b) => {
      const obj = b.toObject();
      return {
        ...obj,
        id: obj._id.toString(),
      };
    });

    return NextResponse.json(transformedBlogs);
  } catch (error: any) {
    console.error("GET blogs error:", error);
    // Return empty array on connection warning to prevent client crash during setup
    if (error.message && error.message.includes("MONGODB_URI")) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: "Failed to read blogs data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const { title, subtitle, category, content, coverImage, author } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    // Calculate reading time roughly: words / 200
    const wordsCount = content.trim().split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordsCount / 200))} min read`;

    const newBlogData = {
      title,
      subtitle: subtitle || "",
      category: category || "Event Planning",
      content,
      coverImage: coverImage || "/images/placeholder.jpg",
      author: author || "Administrator",
      readTime,
      date: new Date().toISOString().split("T")[0],
    };

    const newBlog = new Blog(newBlogData);
    await newBlog.save();

    const result = newBlog.toObject();
    result.id = result._id.toString();

    return NextResponse.json({ success: true, blog: result });
  } catch (error) {
    console.error("POST blog error:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
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
      return NextResponse.json({ error: "Missing blog ID" }, { status: 400 });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("DELETE blog error:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
