import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Client } from "@/models/Client";
import crypto from "crypto";
import fallbackClients from "@/data/clients.json";

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
    let clients = await Client.find({}).sort({ order: 1, created_at: -1 });

    // If database has 0 clients, seed default clients so admin can immediately manage them
    if (clients.length === 0 && fallbackClients.length > 0) {
      try {
        const seedData = fallbackClients.map((c, index) => ({
          name: c.name,
          logo: c.logo || "",
          website: c.website || "",
          order: index + 1,
        }));
        await Client.insertMany(seedData);
        clients = await Client.find({}).sort({ order: 1, created_at: -1 });
      } catch (seedErr) {
        console.warn("Could not auto-seed default clients:", seedErr);
      }
    }

    const transformedClients = clients.map((c) => {
      const obj = c.toObject();
      return {
        ...obj,
        id: obj._id.toString(),
      };
    });

    return NextResponse.json(transformedClients);
  } catch (error: any) {
    console.warn("MongoDB connection warning, using fallback clients data:", error?.message || error);
    return NextResponse.json(fallbackClients, { status: 200 });
  }
}

export async function POST(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const contentType = request.headers.get("content-type") || "";
    let name = "";
    let logo = "";
    let website = "";
    let order = 0;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      name = formData.get("name")?.toString()?.trim() || "";
      website = formData.get("website")?.toString()?.trim() || "";
      const orderVal = formData.get("order")?.toString();
      if (orderVal) order = parseInt(orderVal, 10) || 0;

      const mediaSource = formData.get("mediaSource")?.toString();
      const directMediaUrl = formData.get("directMediaUrl")?.toString();
      const externalUrl = formData.get("externalUrl")?.toString();

      if (directMediaUrl) {
        logo = directMediaUrl;
      } else if (mediaSource === "upload") {
        const file = formData.get("file") as File;
        if (file && file.size > 0) {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const base64String = buffer.toString("base64");
          logo = `data:${file.type};base64,${base64String}`;
        }
      } else if (mediaSource === "url" && externalUrl) {
        logo = externalUrl;
      }
    } else {
      const body = await request.json();
      name = body.name?.toString()?.trim() || "";
      logo = body.logo?.toString()?.trim() || "";
      website = body.website?.toString()?.trim() || "";
      if (body.order !== undefined) order = Number(body.order) || 0;
    }

    if (!name) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 });
    }

    const newClient = new Client({
      name,
      logo,
      website,
      order,
    });

    await newClient.save();

    const result = newClient.toObject();
    result.id = result._id.toString();

    return NextResponse.json({ success: true, client: result });
  } catch (error) {
    console.error("Failed to add client company:", error);
    return NextResponse.json({ error: "Failed to add company" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const body = await request.json();
    const { id, name, logo, website, order } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing company ID" }, { status: 400 });
    }

    const updatedData: any = {};
    if (name !== undefined) updatedData.name = name.trim();
    if (logo !== undefined) updatedData.logo = logo.trim();
    if (website !== undefined) updatedData.website = website.trim();
    if (order !== undefined) updatedData.order = Number(order) || 0;

    const updatedClient = await Client.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedClient) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    const result = updatedClient.toObject();
    result.id = result._id.toString();

    return NextResponse.json({ success: true, client: result });
  } catch (error) {
    console.error("Failed to update company:", error);
    return NextResponse.json({ error: "Failed to update company" }, { status: 500 });
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
      return NextResponse.json({ error: "Missing company ID" }, { status: 400 });
    }

    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Company deleted successfully" });
  } catch (error) {
    console.error("Failed to delete company:", error);
    return NextResponse.json({ error: "Failed to delete company" }, { status: 500 });
  }
}
