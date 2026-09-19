import { NextResponse } from "next/server";
import { verifyAdminToken, getBlogDataBySlug } from "@/lib/blogUtils";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } | Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const slug = resolvedParams?.slug;

    if (!slug) {
      return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "true";

    let isAdminAuthorized = false;
    if (isAdmin) {
      isAdminAuthorized = verifyAdminToken(request);
    }

    const blog = await getBlogDataBySlug(slug, isAdminAuthorized);

    if (blog) {
      return NextResponse.json(blog);
    }

    return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  } catch (error: any) {
    console.error("GET blog by slug error:", error);
    return NextResponse.json({ error: error?.message || "Failed to fetch blog post" }, { status: 500 });
  }
}
