import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    const validPasswords = [
      process.env.ADMIN_PASSWORD,
      "Jaipurboss2026@@",
      "stryper@@2002",
    ].filter(Boolean) as string[];

    const matchedPassword = validPasswords.find((p) => p === password);

    if (!matchedPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate a secure session token using HMAC of the password
    const token = crypto
      .createHmac("sha256", matchedPassword)
      .update("stryper-admin-session")
      .digest("hex");

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
