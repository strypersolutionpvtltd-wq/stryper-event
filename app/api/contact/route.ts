import { NextResponse } from "next/server";

// To receive emails, you can use a service like Resend, SendGrid, or Nodemailer.
// 1. RESEND (Recommended): npm install resend
// 2. NODEMAILER: npm install nodemailer

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

    // --- EMAIL NOTIFICATION LOGIC ---
    /*
    const subject = isInquiryTourism 
      ? `New Tourism Inquiry: ${body.selectedPlan} Plan` 
      : `New Event Inquiry: ${body.eventType}`;
    
    const details = isInquiryTourism
      ? `<p>Plan: ${body.selectedPlan}</p>
         <p>Persons: ${body.numPersons}</p>
         <p>Travel Date: ${body.travelDate}</p>`
      : `<p>Event Type: ${body.eventType}</p>
         <p>Budget: ${body.budgetRange}</p>
         <p>Event Date: ${body.eventDate}</p>`;
    */

    // eslint-disable-next-line no-console
    console.log(`New ${body.type || "Event"} Submission:`, body);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your inquiry. We'll get back to you soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
