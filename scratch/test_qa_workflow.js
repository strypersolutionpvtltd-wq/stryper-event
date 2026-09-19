const crypto = require("crypto");

const BASE_URL = "http://localhost:3000";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Jaipurboss2026@@";

const token = crypto
  .createHmac("sha256", ADMIN_PASSWORD)
  .update("stryper-admin-session")
  .digest("hex");

async function runQaTests() {
  console.log("==========================================");
  console.log("      STRYPER EVENTS BLOG SYSTEM QA       ");
  console.log("==========================================");

  let createdId = null;

  // TEST 1: Public GET /api/blogs (Drafts must be hidden)
  console.log("\n[TEST 1] Testing Public GET /api/blogs...");
  const pubRes = await fetch(`${BASE_URL}/api/blogs`);
  const pubData = await pubRes.json();
  const pubBlogs = Array.isArray(pubData) ? pubData : pubData.blogs || [];
  console.log(` -> Returned ${pubBlogs.length} published blogs.`);
  const containsDrafts = pubBlogs.some((b) => b.status === "draft" || b.status === "archived");
  if (containsDrafts) {
    console.error(" ❌ FAILED: Public API returned draft or archived blogs!");
  } else {
    console.log(" ✅ PASSED: Public API returns only published blogs.");
  }

  // TEST 2: Admin GET /api/blogs?admin=true
  console.log("\n[TEST 2] Testing Admin GET /api/blogs?admin=true...");
  const adminRes = await fetch(`${BASE_URL}/api/blogs?admin=true`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const adminData = await adminRes.json();
  const adminBlogs = adminData.blogs || [];
  console.log(` -> Returned ${adminBlogs.length} total blogs for admin.`);

  // TEST 3: Create QA Test Blog as Draft
  console.log("\n[TEST 3] Creating QA Test Blog as Draft...");
  const testBlogPayload = {
    title: "QA Test Blog - Stryper Events",
    slug: "qa-test-blog-stryper-events",
    subtitle: "Temporary QA article for testing the blog workflow.",
    excerpt: "Temporary QA article for testing the blog workflow.",
    category: "Event Planning",
    tags: ["QA Test", "Event Planning"],
    content: "This is a temporary QA article used to verify the Stryper Events blog publishing workflow.\n\n## Section Test H2\n* Bullet 1\n* Bullet 2\n\n[Contact Us](/contact)",
    coverImage: "/images/corporate-new.jpg",
    author: "Kartikey Niranjan",
    status: "draft",
    ctaText: "Book Your Consultation With Stryper Events",
    ctaUrl: "/contact",
    seoTitle: "QA Test Blog | Stryper Events",
    metaDescription: "Temporary QA article for testing the Stryper Events blog system.",
    focusKeyword: "Stryper Events blog",
    canonicalUrl: "/blog/qa-test-blog-stryper-events",
    ogTitle: "QA Test Blog | Stryper Events",
    ogDescription: "Temporary QA article for testing the Stryper Events blog system.",
    ogImage: "/images/corporate-new.jpg",
  };

  const createRes = await fetch(`${BASE_URL}/api/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(testBlogPayload),
  });

  const createData = await createRes.json();
  if (createRes.ok && createData.success) {
    createdId = createData.blog.id || createData.blog._id;
    console.log(` ✅ PASSED: Created QA draft blog with ID: ${createdId}, Slug: ${createData.blog.slug}`);
  } else {
    console.error(" ❌ FAILED: Creating QA blog failed:", createData);
  }

  // TEST 4: Verify Draft Security (Public fetch by slug must return 404, Admin preview returns 200)
  console.log("\n[TEST 4] Testing Draft Security Access...");
  const pubSlugRes = await fetch(`${BASE_URL}/api/blogs/qa-test-blog-stryper-events`);
  if (pubSlugRes.status === 404) {
    console.log(" ✅ PASSED: Draft blog is inaccessible through public endpoint (404 Not Found).");
  } else {
    console.error(` ❌ FAILED: Draft blog was publicly accessible with status ${pubSlugRes.status}!`);
  }

  const adminSlugRes = await fetch(`${BASE_URL}/api/blogs/qa-test-blog-stryper-events?admin=true`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (adminSlugRes.ok) {
    console.log(" ✅ PASSED: Admin preview fetch returned 200 OK.");
  } else {
    console.error(" ❌ FAILED: Admin preview fetch failed.");
  }

  // TEST 5: Edit QA Blog and Publish
  console.log("\n[TEST 5] Updating QA Blog & Changing Status to Published...");
  const updateRes = await fetch(`${BASE_URL}/api/blogs`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: createdId,
      title: "QA Test Blog - Stryper Events (Updated Title)",
      status: "published",
    }),
  });
  const updateData = await updateRes.json();
  if (updateRes.ok && updateData.success) {
    console.log(" ✅ PASSED: Updated QA blog status to published.");
  } else {
    console.error(" ❌ FAILED: Updating QA blog failed:", updateData);
  }

  // TEST 6: Public Access after Publishing
  console.log("\n[TEST 6] Testing Public Access After Publishing...");
  const pubSlugRes2 = await fetch(`${BASE_URL}/api/blogs/qa-test-blog-stryper-events`);
  if (pubSlugRes2.ok) {
    const publishedBlog = await pubSlugRes2.json();
    console.log(` ✅ PASSED: Published blog accessed successfully! Title: "${publishedBlog.title}"`);
  } else {
    console.error(` ❌ FAILED: Published blog access returned status ${pubSlugRes2.status}`);
  }

  // TEST 7: Test Unpublish / Archive & Cleanup
  console.log("\n[TEST 7] Cleaning Up QA Test Data...");
  if (createdId) {
    const deleteRes = await fetch(`${BASE_URL}/api/blogs?id=${createdId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const deleteData = await deleteRes.json();
    if (deleteRes.ok && deleteData.success) {
      console.log(" ✅ PASSED: QA Test Blog deleted successfully.");
    } else {
      console.error(" ❌ FAILED: Deleting QA test blog failed.");
    }
  }

  console.log("\n==========================================");
  console.log("      QA WORKFLOW TEST COMPLETED          ");
  console.log("==========================================");
}

runQaTests();
