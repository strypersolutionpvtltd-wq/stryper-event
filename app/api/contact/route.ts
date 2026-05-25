import { NextResponse } from "next/server";

// To receive emails, you can use a service like Resend, SendGrid, or Nodemailer.
// 1. RESEND (Recommended): npm install resend
// 2. NODEMAILER: npm install nodemailer

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "fullName",
      "phone",
      "email",
      "eventType",
      "budgetRange",
      "eventDate",
      "message",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // --- EMAIL NOTIFICATION LOGIC ---
    // If you want to receive emails on your Gmail, follow these steps:
    // Option A: Use a service like Resend.com (easiest)
    /*
    import { Resend } from 'resend';
    const resend = new Resend('YOUR_API_KEY');
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'your-gmail@gmail.com',
      subject: 'New Event Inquiry: ' + body.fullName,
      html: `<p>New inquiry from <strong>${body.fullName}</strong></p>
             <p>Phone: ${body.phone}</p>
             <p>Email: ${body.email}</p>
             <p>Event Type: ${body.eventType}</p>
             <p>Budget: ${body.budgetRange}</p>
             <p>Date: ${body.eventDate}</p>
             <p>Message: ${body.message}</p>`
    });
    */

    // --- WHATSAPP NOTIFICATION LOGIC ---
    // For direct phone notifications, you can use Twilio or a WhatsApp API provider.
    // Alternatively, the client-side form can redirect to a WhatsApp link.

    // eslint-disable-next-line no-console
    console.log("New Contact Form Submission:", body);

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
