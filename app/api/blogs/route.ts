import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { Blog } from "@/models/Blog";
import { verifyAdminToken, generateSlug } from "@/lib/blogUtils";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

// Helper to read local JSON fallback
function getLocalBlogs() {
  try {
    const filePath = path.join(process.cwd(), "data", "blogs.json");
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Local blogs read error:", err);
  }
  return [];
}

// Helper to save to local JSON fallback
function saveLocalBlogs(blogs: any[]) {
  try {
    const dirPath = path.join(process.cwd(), "data");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = path.join(dirPath, "blogs.json");
    fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2));
  } catch (err) {
    console.error("Local blogs write error:", err);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "true";
    const statusFilter = searchParams.get("status");
    const categoryFilter = searchParams.get("category");
    const searchFilter = searchParams.get("search");
    const tagFilter = searchParams.get("tag");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "100", 10);

    let isAdminAuthorized = false;
    if (isAdmin) {
      isAdminAuthorized = verifyAdminToken(request);
    }

    try {
      await connectToDatabase();
      const query: any = {};

      if (!isAdminAuthorized) {
        query.status = "published";
      } else if (statusFilter && statusFilter !== "all") {
        query.status = statusFilter;
      }

      if (categoryFilter && categoryFilter !== "all") {
        query.category = { $regex: new RegExp(`^${categoryFilter}$`, "i") };
      }

      if (tagFilter) {
        query.tags = tagFilter;
      }

      if (searchFilter) {
        query.$or = [
          { title: { $regex: searchFilter, $options: "i" } },
          { excerpt: { $regex: searchFilter, $options: "i" } },
          { subtitle: { $regex: searchFilter, $options: "i" } },
          { content: { $regex: searchFilter, $options: "i" } },
        ];
      }

      const total = await Blog.countDocuments(query);
      const blogs = await Blog.find(query)
        .sort({ order: 1, created_at: 1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const transformedBlogs = blogs.map((b) => {
        const obj = b.toObject();
        return {
          ...obj,
          id: obj._id ? obj._id.toString() : obj.id,
          slug: obj.slug || generateSlug(obj.title),
          status: obj.status || "published",
        };
      });

      return NextResponse.json({
        blogs: transformedBlogs,
        total,
        page,
        totalPages: Math.ceil(total / limit) || 1,
      });
    } catch (dbError) {
      console.warn("MongoDB query failed, attempting local JSON fallback:", dbError);
      let localData = getLocalBlogs();

      let filtered = localData.map((b: any) => ({
        ...b,
        slug: b.slug || generateSlug(b.title),
        status: b.status || "published",
        category: b.category || "Event Planning",
        tags: b.tags || [],
      }));

      if (!isAdminAuthorized) {
        filtered = filtered.filter((b: any) => b.status === "published");
      } else if (statusFilter && statusFilter !== "all") {
        filtered = filtered.filter((b: any) => b.status === statusFilter);
      }

      if (categoryFilter && categoryFilter !== "all") {
        filtered = filtered.filter(
          (b: any) => (b.category || "").toLowerCase() === categoryFilter.toLowerCase()
        );
      }

      if (searchFilter) {
        const q = searchFilter.toLowerCase();
        filtered = filtered.filter(
          (b: any) =>
            (b.title || "").toLowerCase().includes(q) ||
            (b.content || "").toLowerCase().includes(q) ||
            (b.subtitle || "").toLowerCase().includes(q)
        );
      }

      filtered.sort((a: any, b: any) => (a.order || 99) - (b.order || 99));

      return NextResponse.json({
        blogs: filtered,
        total: filtered.length,
        page: 1,
        totalPages: 1,
      });
    }
  } catch (error: any) {
    console.error("GET blogs root error:", error);
    return NextResponse.json({ error: "Failed to read blogs data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      slug: customSlug,
      subtitle,
      excerpt,
      category,
      tags,
      content,
      coverImage,
      author,
      status,
      ctaText,
      ctaUrl,
      seoTitle,
      metaDescription,
      focusKeyword,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImage,
      date,
    } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Blog title and content are required" }, { status: 400 });
    }

    let finalSlug = (customSlug ? generateSlug(customSlug) : generateSlug(title)) || `blog-${Date.now()}`;

    // Read time calculation
    const wordsCount = content.trim().split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordsCount / 200))} min read`;

    const blogDoc = {
      title,
      slug: finalSlug,
      subtitle: subtitle || "",
      excerpt: excerpt || subtitle || "",
      category: category || "Event Planning",
      tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((t) => t.trim()) : [],
      content,
      coverImage: coverImage || "/images/corporate-new.jpg",
      author: author || "Stryper Editorial",
      readTime,
      date: date || new Date().toISOString().split("T")[0],
      status: status || "draft",
      ctaText: ctaText || "Book Your Consultation With Stryper Events",
      ctaUrl: ctaUrl || "/contact",
      seoTitle: seoTitle || title,
      metaDescription: metaDescription || excerpt || subtitle || "",
      focusKeyword: focusKeyword || "",
      canonicalUrl: canonicalUrl || `/blog/${finalSlug}`,
      ogTitle: ogTitle || seoTitle || title,
      ogDescription: ogDescription || metaDescription || excerpt || "",
      ogImage: ogImage || coverImage || "/images/corporate-new.jpg",
    };

    let createdBlog: any = null;

    try {
      await connectToDatabase();
      let count = 1;
      let existing = await Blog.findOne({ slug: finalSlug });
      while (existing) {
        finalSlug = `${generateSlug(title)}-${count++}`;
        existing = await Blog.findOne({ slug: finalSlug });
      }
      blogDoc.slug = finalSlug;

      const newBlog = new Blog(blogDoc);
      await newBlog.save();
      createdBlog = newBlog.toObject();
      createdBlog.id = createdBlog._id.toString();

      // Always sync local JSON file as well
      const localBlogs = getLocalBlogs();
      localBlogs.unshift(createdBlog);
      saveLocalBlogs(localBlogs);
    } catch (dbErr) {
      console.warn("MongoDB save failed, saving to local JSON fallback:", dbErr);
      const localBlogs = getLocalBlogs();
      const localId = `local-${Date.now()}`;
      createdBlog = { ...blogDoc, id: localId };
      localBlogs.unshift(createdBlog);
      saveLocalBlogs(localBlogs);
    }

    return NextResponse.json({ success: true, blog: createdBlog });
  } catch (error: any) {
    console.error("POST blog error:", error);
    return NextResponse.json({ error: error.message || "Failed to create blog post" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, slug: customSlug, ...updateFields } = body;

    if (!id && !customSlug) {
      return NextResponse.json({ error: "Blog ID or slug is required for update" }, { status: 400 });
    }

    if (title) {
      const wordsCount = (updateFields.content || "").trim().split(/\s+/).length;
      if (wordsCount > 0) {
        updateFields.readTime = `${Math.max(1, Math.ceil(wordsCount / 200))} min read`;
      }
    }

    if (customSlug) {
      updateFields.slug = generateSlug(customSlug);
    }

    updateFields.updated_at = new Date();

    let updatedBlogObj: any = null;

    try {
      await connectToDatabase();

      const targetSlug = updateFields.slug || (customSlug ? generateSlug(customSlug) : undefined);
      const queryConditions: any[] = [];

      if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
          queryConditions.push({ _id: id });
        }
        queryConditions.push({ id: id });
      }
      if (targetSlug) {
        queryConditions.push({ slug: targetSlug });
      }
      if (title) {
        queryConditions.push({ title: title });
      }

      const updated = await Blog.findOneAndUpdate(
        { $or: queryConditions },
        { $set: { ...updateFields, ...(title ? { title } : {}) } },
        { new: true }
      );

      if (updated) {
        const resObj = updated.toObject();
        resObj.id = resObj._id.toString();
        updatedBlogObj = resObj;
      }
    } catch (dbErr) {
      console.warn("MongoDB update failed, fallback to local JSON:", dbErr);
    }

    // Always update local JSON file as well to keep in sync
    const localBlogs = getLocalBlogs();
    const targetSlug = updateFields.slug || (customSlug ? generateSlug(customSlug) : undefined);
    const index = localBlogs.findIndex(
      (b: any) =>
        (id && (b.id === id || b._id === id)) ||
        (targetSlug && b.slug === targetSlug) ||
        (title && b.title === title)
    );

    if (index !== -1) {
      localBlogs[index] = { ...localBlogs[index], ...updateFields, ...(title ? { title } : {}) };
      saveLocalBlogs(localBlogs);
      if (!updatedBlogObj) {
        updatedBlogObj = localBlogs[index];
      }
    }

    if (updatedBlogObj) {
      return NextResponse.json({ success: true, blog: updatedBlogObj });
    }

    return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  } catch (error: any) {
    console.error("PUT blog error:", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return NextResponse.json({ error: "Missing blog ID or slug" }, { status: 400 });
    }

    try {
      await connectToDatabase();
      const queryConditions: any[] = [];
      if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
          queryConditions.push({ _id: id });
        }
        queryConditions.push({ id: id });
      }
      if (slug) {
        queryConditions.push({ slug });
      }
      await Blog.findOneAndDelete({ $or: queryConditions });
    } catch (dbErr) {
      console.warn("MongoDB delete failed, fallback to local JSON:", dbErr);
    }

    const localBlogs = getLocalBlogs();
    const filtered = localBlogs.filter((b: any) => b.id !== id && b._id !== id && b.slug !== slug);
    saveLocalBlogs(filtered);

    return NextResponse.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error: any) {
    console.error("DELETE blog error:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
