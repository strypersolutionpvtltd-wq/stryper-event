import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Blog } from "@/models/Blog";
import { verifyAdminToken, generateSlug } from "@/lib/blogUtils";
import fs from "fs";
import path from "path";

function getLocalBlogs() {
  try {
    const filePath = path.join(process.cwd(), "data", "blogs.json");
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch (err) {}
  return [];
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "true";

    let isAdminAuthorized = false;
    if (isAdmin) {
      isAdminAuthorized = verifyAdminToken(request);
    }

    try {
      await connectToDatabase();
      const query: any = { slug };

      if (!isAdminAuthorized) {
        query.status = "published";
      }

      const blog = await Blog.findOne(query);

      if (blog) {
        const obj = blog.toObject();
        return NextResponse.json({
          ...obj,
          id: obj._id ? obj._id.toString() : obj.id,
        });
      }
    } catch (dbErr) {
      console.warn("MongoDB fetch by slug error, attempting local fallback:", dbErr);
    }

    // Local JSON fallback
    const localBlogs = getLocalBlogs();
    const blog = localBlogs.find(
      (b: any) =>
        (b.slug === slug || generateSlug(b.title) === slug) &&
        (isAdminAuthorized || b.status === "published" || !b.status)
    );

    if (blog) {
      return NextResponse.json({
        ...blog,
        id: blog._id || blog.id,
        slug: blog.slug || generateSlug(blog.title),
        status: blog.status || "published",
      });
    }

    return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  } catch (error: any) {
    console.error("GET blog by slug error:", error);
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
  }
}
