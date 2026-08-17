const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const filePath = "C:\\Users\\Prashant Singh\\Documents\\VID20240422225344.mp4";
const cloudName = "defnbmovm";
const apiKey = "122187293492261";
const apiSecret = "YkTOOogzHiPu7l4Gr_cg0VNNieQ";
const folder = "stryper_events";

async function testUpload() {
  try {
    console.log("Checking file status:", filePath);
    if (!fs.existsSync(filePath)) {
      console.error("File does not exist!");
      return;
    }
    const stats = fs.statSync(filePath);
    console.log("File size in bytes:", stats.size, "(", (stats.size / (1024 * 1024)).toFixed(2), "MB )");

    const timestamp = Math.round(new Date().getTime() / 1000);
    const strToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(strToSign).digest("hex");

    console.log("Signature generated:", signature, "Timestamp:", timestamp);

    // Read first 5MB chunk
    const chunkSize = 5 * 1024 * 1024; // 5MB
    const fd = fs.openSync(filePath, "r");
    const buffer = Buffer.alloc(chunkSize);
    const bytesRead = fs.readSync(fd, buffer, 0, chunkSize, 0);
    fs.closeSync(fd);

    const chunkBuffer = buffer.subarray(0, bytesRead);
    console.log("Read chunk bytes:", bytesRead);

    const blob = new Blob([chunkBuffer], { type: "video/mp4" });
    const formData = new FormData();
    formData.append("file", blob, "VID20240422225344.mp4");
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);
    formData.append("folder", folder);

    const uploadId = `uq_${Date.now()}`;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload_large`;

    console.log("Testing POST to Cloudinary upload_large...");
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Range": `bytes 0-${bytesRead - 1}/${stats.size}`,
        "X-Unique-Upload-Id": uploadId,
      },
      body: formData,
    });

    console.log("Cloudinary HTTP Response Status:", res.status, res.statusText);
    const text = await res.text();
    console.log("Cloudinary Raw Response Body:\n", text);
  } catch (err) {
    console.error("Test Upload Error:", err);
  }
}

testUpload();
