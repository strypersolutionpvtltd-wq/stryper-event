import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Blog } from "@/models/Blog";
import { generateSlug } from "@/lib/blogUtils";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function getLocalBlogs() {
  try {
    const filePath = path.join(process.cwd(), "data", "blogs.json");
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch (err) {}
  return [];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const currentSlug = searchParams.get("slug");
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "3", 10);

    if (!currentSlug) {
      return NextResponse.json({ error: "Missing current blog slug" }, { status: 400 });
    }

    let related: any[] = [];

    try {
      await connectToDatabase();
      const query: any = {
        slug: { $ne: currentSlug },
        status: "published",
      };

      if (category) {
        query.category = { $regex: new RegExp(`^${category}$`, "i") };
      }

      let blogs = await Blog.find(query).limit(limit).sort({ created_at: -1 });

      if (blogs.length < limit) {
        const extraBlogs = await Blog.find({
          slug: { $ne: currentSlug },
          _id: { $nin: blogs.map((b) => b._id) },
          status: "published",
        })
          .limit(limit - blogs.length)
          .sort({ created_at: -1 });

        blogs = [...blogs, ...extraBlogs];
      }

      related = blogs.map((b) => {
        const obj = b.toObject();
        return {
          ...obj,
          id: obj._id.toString(),
          slug: obj.slug || generateSlug(obj.title),
        };
      });
    } catch (dbErr) {
      console.warn("MongoDB related query failed, fallback to local JSON:", dbErr);
    }

    if (related.length === 0) {
      const localBlogs = getLocalBlogs().filter(
        (b: any) =>
          (b.status === "published" || !b.status) &&
          b.slug !== currentSlug &&
          generateSlug(b.title) !== currentSlug
      );

      let categoryMatches = localBlogs.filter(
        (b: any) => (b.category || "").toLowerCase() === (category || "").toLowerCase()
      );
      if (categoryMatches.length < limit) {
        const remaining = localBlogs.filter((b: any) => !categoryMatches.includes(b));
        categoryMatches = [...categoryMatches, ...remaining];
      }
      related = categoryMatches.slice(0, limit).map((b: any) => ({
        ...b,
        slug: b.slug || generateSlug(b.title),
      }));
    }

    return NextResponse.json(related);
  } catch (error: any) {
    console.error("GET related blogs error:", error);
    return NextResponse.json([]);
  }
}
