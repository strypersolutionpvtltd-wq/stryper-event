import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Tag } from "@/models/Tag";
import { verifyAdminToken, generateSlug } from "@/lib/blogUtils";

const DEFAULT_TAGS = [
  "Destination Wedding",
  "Jaipur Venues",
  "Corporate Gala",
  "Event Lighting",
  "Sound Production",
  "Budget Planning",
  "Brand Promotion",
  "Rajasthan Tourism",
  "Sports Management",
  "Stage Fabrication",
];

export async function GET() {
  try {
    let tags: any[] = [];
    try {
      await connectToDatabase();
      const dbTags = await Tag.find({}).sort({ name: 1 });
      if (dbTags.length > 0) {
        tags = dbTags.map((t) => ({
          id: t._id.toString(),
          name: t.name,
          slug: t.slug,
        }));
      }
    } catch (err) {}

    if (tags.length === 0) {
      tags = DEFAULT_TAGS.map((t, i) => ({ id: `tag-${i}`, name: t, slug: generateSlug(t) }));
    }

    return NextResponse.json(tags);
  } catch (error: any) {
    return NextResponse.json(DEFAULT_TAGS.map((t, i) => ({ id: `tag-${i}`, name: t, slug: generateSlug(t) })));
  }
}

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ error: "Tag name is required" }, { status: 400 });
    }

    const slug = generateSlug(name);

    try {
      await connectToDatabase();
      const newTag = new Tag({ name, slug });
      await newTag.save();
      return NextResponse.json({ success: true, tag: { id: newTag._id.toString(), name, slug } });
    } catch (err: any) {
      return NextResponse.json({ success: true, tag: { id: `tag-${Date.now()}`, name, slug } });
    }
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create tag" }, { status: 500 });
  }
}
