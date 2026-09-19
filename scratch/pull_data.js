const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const dns = require("dns");

// Fix querySrv issue on Windows if needed
if (process.platform === "win32") {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
    if (dns.setDefaultResultOrder) {
      dns.setDefaultResultOrder("ipv4first");
    }
  } catch (e) {
    console.warn("Could not set custom DNS servers:", e);
  }
}

const MONGODB_URI = "mongodb+srv://strypersolution:K73dLZv6aFW2A_F@cluster0.gcwtxve.mongodb.net/stryper_next?retryWrites=true&w=majority&appName=Cluster0";

async function pullData() {
  const exportDir = path.join(__dirname, "pulled_data");
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  console.log("=== STRYPER EVENTS DATA PULL ===");
  console.log("Connecting to MongoDB Atlas database...");

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4
    });
    console.log("Successfully connected to MongoDB!");

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    console.log(`Found ${collections.length} collections in MongoDB:`);
    const summary = {};

    for (const colInfo of collections) {
      const colName = colInfo.name;
      const collection = db.collection(colName);
      const docs = await collection.find({}).toArray();
      summary[colName] = docs.length;

      const filePath = path.join(exportDir, `${colName}.json`);
      fs.writeFileSync(filePath, JSON.stringify(docs, null, 2));
      console.log(` - Extracted ${docs.length} documents from collection '${colName}' -> saved to scratch/pulled_data/${colName}.json`);
    }

    // Save master export JSON
    const masterExportPath = path.join(exportDir, "complete_mongodb_export.json");
    fs.writeFileSync(masterExportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      summary,
      collections: Object.keys(summary)
    }, null, 2));

    console.log("\nMongoDB data pull completed successfully!");

  } catch (err) {
    console.error("MongoDB Connection/Export Error:", err.message);
  } finally {
    await mongoose.disconnect();
  }

  // Also pull local data files for completeness
  console.log("\n--- Checking local fallback JSON files in data/ directory ---");
  const dataDir = path.join(__dirname, "..", "data");
  if (fs.existsSync(dataDir)) {
    const localFiles = fs.readdirSync(dataDir);
    for (const file of localFiles) {
      if (file.endsWith(".json")) {
        const filePath = path.join(dataDir, file);
        const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
        const destPath = path.join(exportDir, `local_${file}`);
        fs.writeFileSync(destPath, JSON.stringify(content, null, 2));
        console.log(` - Copied local data file '${file}' (${Array.isArray(content) ? content.length : 'object'} items) -> saved to scratch/pulled_data/local_${file}`);
      }
    }
  }

  console.log("\nAll data pulled successfully into 'scratch/pulled_data/'!");
}

pullData();
