const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Load .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2 && !line.startsWith('#')) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
      if (key && val) process.env[key] = val;
    }
  });
}

async function runFullVerification() {
  console.log('--- START VERIFICATION ---');
  const password = process.env.ADMIN_PASSWORD || 'Jaipurboss2026@@';
  const token = crypto.createHmac('sha256', password).update('stryper-admin-session').digest('hex');

  // 1. Public API
  const pubRes = await fetch('http://localhost:3000/api/blogs');
  const pubData = await pubRes.json();
  const pubBlogs = Array.isArray(pubData) ? pubData : (pubData.blogs || []);
  console.log('1. Public API Blogs Count:', pubBlogs.length);
  const pubBlog1 = pubBlogs.find(b => b.slug === 'destinationwedding-cost-jaipur');
  console.log('2. Published Blog #1 Found in Public API:', !!pubBlog1);

  // 3. Draft Blog #2 public access
  const draft2Res = await fetch('http://localhost:3000/blog/luxurywedding-venues-jaipur');
  console.log('3. Draft Blog #2 HTTP Status:', draft2Res.status);

  // 4. Admin fetch
  const adminRes = await fetch('http://localhost:3000/api/blogs?admin=true', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const adminData = await adminRes.json();
  const totalAdminBlogs = (adminData.blogs || []).length;
  console.log('4. Admin Total Blogs Count:', totalAdminBlogs);

  // 5. Create Temp Draft
  const tempPayload = {
    title: 'TEMP_QA_TEST_' + Date.now(),
    content: 'Temporary QA content',
    category: 'Event Planning',
    status: 'draft',
    author: 'QA Tester'
  };

  const createRes = await fetch('http://localhost:3000/api/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(tempPayload)
  });
  const createJson = await createRes.json();
  const tempId = createJson.blog?.id || createJson.blog?._id;
  console.log('5. Temp Draft Created:', createJson.success, 'ID:', tempId);

  // 6. Verify Persists
  const reAdmin = await fetch('http://localhost:3000/api/blogs?admin=true', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const reAdminJson = await reAdmin.json();
  const found = (reAdminJson.blogs || []).find(b => (b.id === tempId || b._id === tempId));
  console.log('6. Temp Draft Persists:', !!found);

  // 7. Edit Temp Draft
  if (tempId) {
    const editRes = await fetch('http://localhost:3000/api/blogs', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ id: tempId, title: tempPayload.title + '_EDITED' })
    });
    const editJson = await editRes.json();
    console.log('7. Temp Draft Edit:', editJson.success);

    // 8. Delete Temp Draft
    const delRes = await fetch('http://localhost:3000/api/blogs?id=' + tempId, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token }
    });
    const delJson = await delRes.json();
    console.log('8. Temp Draft Delete:', delJson.success);

    // 9. Confirm Deleted
    const postDel = await fetch('http://localhost:3000/api/blogs?admin=true', {
      headers: { Authorization: 'Bearer ' + token }
    });
    const postDelJson = await postDel.json();
    const stillThere = (postDelJson.blogs || []).find(b => (b.id === tempId || b._id === tempId));
    console.log('9. Temp Draft Confirmed Deleted:', !stillThere);
  }

  // 10. Sitemap & Robots
  const sitemapRes = await fetch('http://localhost:3000/sitemap.xml');
  const sitemapTxt = await sitemapRes.text();
  console.log('10. Sitemap Has Published Blog:', sitemapTxt.includes('destinationwedding-cost-jaipur'));

  const robotsRes = await fetch('http://localhost:3000/robots.txt');
  const robotsTxt = await robotsRes.text();
  console.log('11. Robots.txt Has Sitemap Reference:', robotsTxt.includes('sitemap.xml'));

  console.log('--- END VERIFICATION ---');
}

runFullVerification();
