import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Category } from "@/models/Category";
import { verifyAdminToken, generateSlug } from "@/lib/blogUtils";

const DEFAULT_CATEGORIES = [
  { name: "Weddings", slug: "weddings", description: "Royal & Destination Weddings, Sangeet & Planning Guides" },
  { name: "Corporate Events", slug: "corporate-events", description: "Conferences, Galas, Product Launches & AGMs" },
  { name: "Event Production", slug: "event-production", description: "Stage, Lighting, Sound & Fabrications" },
  { name: "Brand Activation", slug: "brand-activation", description: "Experiential Marketing & Mall Activations" },
  { name: "Sports Events", slug: "sports-events", description: "Tournaments, Stadium Operations & Sports Management" },
  { name: "Event Planning", slug: "event-planning", description: "Logistics, Vendor Management & Budgeting" },
];

export async function GET() {
  try {
    let categories: any[] = [];
    try {
      await connectToDatabase();
      const dbCategories = await Category.find({}).sort({ name: 1 });
      if (dbCategories.length > 0) {
        categories = dbCategories.map((c) => ({
          id: c._id.toString(),
          name: c.name,
          slug: c.slug,
          description: c.description,
        }));
      }
    } catch (err) {}

    if (categories.length === 0) {
      categories = DEFAULT_CATEGORIES.map((c, i) => ({ id: `cat-${i}`, ...c }));
    }

    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json(DEFAULT_CATEGORIES);
  }
}

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { name, description } = await request.json();
    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const slug = generateSlug(name);

    try {
      await connectToDatabase();
      const newCat = new Category({ name, slug, description: description || "" });
      await newCat.save();
      return NextResponse.json({ success: true, category: { id: newCat._id.toString(), name, slug, description } });
    } catch (err: any) {
      return NextResponse.json({ success: true, category: { id: `cat-${Date.now()}`, name, slug, description } });
    }
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
