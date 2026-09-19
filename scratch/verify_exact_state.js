const crypto = require("crypto");

const BASE_URL = "http://localhost:3000";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Jaipurboss2026@@";

const token = crypto
  .createHmac("sha256", ADMIN_PASSWORD)
  .update("stryper-admin-session")
  .digest("hex");

async function verifyState() {
  console.log("==========================================");
  console.log("   VERIFYING EXACT BLOG SYSTEM STATE      ");
  console.log("==========================================");

  // 1. Check Public API
  const pubRes = await fetch(`${BASE_URL}/api/blogs`);
  const pubData = await pubRes.json();
  const pubList = Array.isArray(pubData) ? pubData : pubData.blogs || [];

  console.log(`\n[PUBLIC API /api/blogs]`);
  console.log(` -> Published count: ${pubList.length}`);
  pubList.forEach((b, i) => console.log(`    ${i+1}. [${b.status.toUpperCase()}] ${b.title} (/blog/${b.slug})`));

  // 2. Check Admin API
  const adminRes = await fetch(`${BASE_URL}/api/blogs?admin=true`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const adminData = await adminRes.json();
  const adminList = adminData.blogs || [];

  console.log(`\n[ADMIN API /api/blogs?admin=true]`);
  console.log(` -> Total count: ${adminList.length}`);
  adminList.forEach((b, i) => console.log(`    ${i+1}. [${b.status.toUpperCase()}] ${b.title} (/blog/${b.slug})`));

  // 3. Check Public vs Draft Slug Endpoint
  console.log("\n[SLUG SECURITY CHECK]");
  const pubSlugRes = await fetch(`${BASE_URL}/api/blogs/7-luxury-wedding-venues-jaipur`);
  console.log(` -> Public request to Draft Blog #2 slug returned status: ${pubSlugRes.status} (Expected: 404)`);

  const adminSlugRes = await fetch(`${BASE_URL}/api/blogs/7-luxury-wedding-venues-jaipur?admin=true`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(` -> Admin Preview request to Draft Blog #2 returned status: ${adminSlugRes.status} (Expected: 200)`);
}

verifyState();
