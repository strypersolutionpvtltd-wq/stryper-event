# MongoDB Database Integration Guide

This project is now fully configured to use **MongoDB** (with Mongoose) as the database. It stores both text data (events and inquiries) and images/videos (saved as auto-optimized Base64 strings) inside a single database.

This means **zero setup** for images/videos—everything works automatically out of the box!

---

## Step 1: Create a Free MongoDB Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.
2. Click **Create** to deploy a new database cluster.
3. Choose the **M0 Free** shared cluster, select a region, and click **Create**.
4. In the Security Quickstart:
   * Create a Database User (Note down the **Username** and **Password**).
   * In IP Access List, choose **Allow Access from Anywhere** (IP `0.0.0.0/0`) so Vercel can connect, then click **Finish and Close**.

---

## Step 2: Get Connection String
1. Go to the **Database** dashboard under Deployment.
2. Click **Connect** on your cluster.
3. Select **Drivers** (under "Connect to your application").
4. Copy the connection string. It will look like this:
   `mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
5. Replace `<password>` in the connection string with the password you set for your database user.

---

## Step 3: Add Environment Variables
Add the connection string and admin panel settings to your local `.env.local` file and your production deployment settings (e.g. on Vercel):

### Local Configuration (`.env.local`):
```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://your_user:your_password@cluster0.xxxx.mongodb.net/stryper_db?retryWrites=true&w=majority

# Admin Passcode for /admin panel
ADMIN_PASSWORD=event@@2026
```

---

## Step 4: Run & Test
1. Restart your local server: `npm run dev`
2. Open the Admin Panel at [http://localhost:3000/admin](http://localhost:3000/admin).
3. Log in with your passcode (`event@@2026`).
4. Upload an Event image or write a blog post! It will automatically save to your MongoDB database.
