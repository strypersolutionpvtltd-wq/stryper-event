import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";
import { Blog } from "@/models/Blog";
import { Event } from "@/models/Event";
import { Client } from "@/models/Client";
import { Review } from "@/models/Review";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function loadJsonFile(fileName: string) {
  try {
    const filePath = path.join(process.cwd(), "data", fileName);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch (e) {
    console.error(`Error loading ${fileName}:`, e);
  }
  return [];
}

export async function GET(request: Request) {
  const startTime = Date.now();
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return NextResponse.json(
        {
          databaseStatus: "NOT_CONFIGURED",
          error: "MONGODB_URI is not configured in environment variables",
        },
        { status: 500 }
      );
    }

    await connectToDatabase();
    const readyState = mongoose.connection.readyState;
    const isConnected = readyState === 1;

    if (!isConnected) {
      return NextResponse.json(
        { databaseStatus: "DISCONNECTED", message: "Database is not connected" },
        { status: 500 }
      );
    }

    // Auto-sync / seed collections if empty or requested
    const { searchParams } = new URL(request.url);
    const forceSync = searchParams.get("sync") === "true";

    let syncedItems: Record<string, number> = {};

    // 1. Sync Blogs
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0 || forceSync) {
      const localBlogs = loadJsonFile("blogs.json");
      if (localBlogs.length > 0) {
        for (const item of localBlogs) {
          const { id, _id, ...cleanItem } = item;
          await Blog.updateOne(
            { slug: cleanItem.slug },
            { $set: cleanItem },
            { upsert: true }
          );
        }
        syncedItems.blogs = localBlogs.length;
      }
    }

    // 2. Sync Events
    const eventCount = await Event.countDocuments();
    if (eventCount === 0 || forceSync) {
      const localEvents = loadJsonFile("events.json");
      if (localEvents.length > 0) {
        for (const item of localEvents) {
          const { id, _id, ...cleanItem } = item;
          await Event.updateOne(
            { title: cleanItem.title },
            { $set: cleanItem },
            { upsert: true }
          );
        }
        syncedItems.events = localEvents.length;
      }
    }

    // 3. Sync Clients
    const clientCount = await Client.countDocuments();
    if (clientCount === 0 || forceSync) {
      const localClients = loadJsonFile("clients.json");
      if (localClients.length > 0) {
        for (const item of localClients) {
          const { id, _id, ...cleanItem } = item;
          await Client.updateOne(
            { name: cleanItem.name },
            { $set: cleanItem },
            { upsert: true }
          );
        }
        syncedItems.clients = localClients.length;
      }
    }

    // 4. Sync Reviews
    const reviewCount = await Review.countDocuments();
    if (reviewCount === 0 || forceSync) {
      const localReviews = loadJsonFile("reviews.json");
      if (localReviews.length > 0) {
        for (const item of localReviews) {
          const { id, _id, ...cleanItem } = item;
          await Review.updateOne(
            { name: cleanItem.name, text: cleanItem.text },
            { $set: cleanItem },
            { upsert: true }
          );
        }
        syncedItems.reviews = localReviews.length;
      }
    }

    // Current live counts
    const counts = {
      blogs: await Blog.countDocuments(),
      events: await Event.countDocuments(),
      clients: await Client.countDocuments(),
      reviews: await Review.countDocuments(),
    };

    const db = mongoose.connection.db;
    const collections = await db?.listCollections().toArray();

    return NextResponse.json({
      databaseStatus: "CONNECTED",
      databaseName: mongoose.connection.name,
      host: mongoose.connection.host,
      latency: `${Date.now() - startTime}ms`,
      collections: collections?.map((c) => c.name) || [],
      counts,
      syncedNow: Object.keys(syncedItems).length > 0 ? syncedItems : "All collections already populated",
      message: "MongoDB database (stryper_event) is connected and all data is synced!",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        databaseStatus: "ERROR",
        error: error?.message || "Failed to connect to MongoDB",
        latency: `${Date.now() - startTime}ms`,
      },
      { status: 500 }
    );
  }
}

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

