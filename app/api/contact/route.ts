import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Inquiry } from "@/models/Inquiry";
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

// POST: Submit a new inquiry from the contact form
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Determine inquiry type and required fields
    const isInquiryTourism = body.type === "tourism";
    const requiredFields = isInquiryTourism
      ? ["fullName", "phone", "email", "selectedPlan", "numPersons", "travelDate"]
      : ["fullName", "phone", "email", "eventType", "budgetRange", "eventDate", "message"];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    await connectToDatabase();

    // Create and save database inquiry record
    const newInquiryData: any = {
      fullName: body.fullName,
      phone: body.phone,
      email: body.email,
      type: body.type || "event",
      message: body.message || "",
    };

    if (isInquiryTourism) {
      newInquiryData.selectedPlan = body.selectedPlan;
      newInquiryData.numPersons = Number(body.numPersons);
      newInquiryData.travelDate = body.travelDate;
    } else {
      newInquiryData.eventType = body.eventType;
      newInquiryData.budgetRange = body.budgetRange;
      newInquiryData.eventDate = body.eventDate;
    }

    const newInquiry = new Inquiry(newInquiryData);
    await newInquiry.save();

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your inquiry. We'll get back to you soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form submit error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// GET: Fetch all inquiries for the admin dashboard (Secure)
export async function GET(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const inquiries = await Inquiry.find({}).sort({ created_at: -1 });

    const transformed = inquiries.map((inq) => {
      const obj = inq.toObject();
      return {
        ...obj,
        id: obj._id.toString(),
      };
    });

    return NextResponse.json(transformed);
  } catch (error) {
    console.error("GET inquiries error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

// DELETE: Remove an inquiry by ID (Secure)
export async function DELETE(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing inquiry ID" }, { status: 400 });
    }

    const deleted = await Inquiry.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("DELETE inquiry error:", error);
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
