import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const appFaviconPath = path.join(process.cwd(), "app", "favicon.ico");
    if (fs.existsSync(appFaviconPath)) {
      try {
        fs.unlinkSync(appFaviconPath);
        return NextResponse.json({ success: true, message: "app/favicon.ico deleted successfully" });
      } catch (err: any) {
        // If file cannot be unlinked directly, overwrite it with 0 bytes
        fs.writeFileSync(appFaviconPath, "");
        return NextResponse.json({ success: true, message: "app/favicon.ico cleared" });
      }
    }
    return NextResponse.json({ success: true, message: "app/favicon.ico already clean" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
