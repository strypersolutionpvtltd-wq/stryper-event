"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Play, 
  PlusCircle, 
  LogOut, 
  BarChart2, 
  UploadCloud, 
  Check, 
  AlertCircle, 
  FileText,
  LayoutDashboard,
  X
} from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

import Container from "@/components/ui/Container";

const getWhatsAppLink = (phone: string, fullName: string, type: string) => {
  let cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.length === 10) {
    cleanPhone = "91" + cleanPhone;
  }
  const message = encodeURIComponent(
    `Hi ${fullName}, thank you for contacting Stryper Events regarding your ${
      type === "tourism" ? "Tourism" : "Event"
    } inquiry. We would love to discuss further.`
  );
  return `https://wa.me/${cleanPhone}?text=${message}`;
};

export default function AdminPage() {
  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [sessionToken, setSessionToken] = useState("");

  // Media preview lightbox state
  const [previewMedia, setPreviewMedia] = useState<{ url: string; type: "image" | "video"; title: string } | null>(null);

  // Tab states: overview, portfolio, inquiries
  const [activeTab, setActiveTab] = useState<"overview" | "portfolio" | "inquiries">("overview");

  // Data states
  const [events, setEvents] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(true);

  // Form states for Event Post
  const [eventTitle, setEventTitle] = useState("");
  const [eventCategory, setEventCategory] = useState("corporate");
  const [customCategory, setCustomCategory] = useState("");
  const [eventType, setEventType] = useState<"image" | "video" | "coming-soon">("image");
  const [eventMediaSource, setEventMediaSource] = useState<"upload" | "url">("upload");
  const [eventFile, setEventFile] = useState<File | null>(null);
  const [eventExternalUrl, setEventExternalUrl] = useState("");
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [eventPreviewUrl, setEventPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload Progress States
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedMb, setUploadedMb] = useState("0.0");
  const [totalMb, setTotalMb] = useState("0.0");
  const [uploadStatus, setUploadStatus] = useState("");

  // Fix Preview Bug: Reset file selection & preview URL when eventType toggles if file doesn't match
  useEffect(() => {
    if (eventFile) {
      const isFileVideo = eventFile.type.startsWith("video/");
      const isFileImage = eventFile.type.startsWith("image/");

      if ((eventType === "image" && isFileVideo) || (eventType === "video" && isFileImage)) {
        setEventFile(null);
        if (eventPreviewUrl) {
          URL.revokeObjectURL(eventPreviewUrl);
          setEventPreviewUrl(null);
        }
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  }, [eventType]);

  // Check authentication status on mount & clean favicon
  useEffect(() => {
    fetch("/api/clean-favicon").catch(() => {});
    const token = sessionStorage.getItem("stryper_admin_token");
    if (token) {
      setSessionToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
      fetchInquiries();
    }
  }, [isAuthenticated]);

  const fetchEvents = async () => {
    setIsLoadingEvents(true);
    try {
      const res = await fetch("/api/events");
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      } else {
        toast.error("Failed to load events portfolio");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error loading events");
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const fetchInquiries = async () => {
    setIsLoadingInquiries(true);
    try {
      const res = await fetch("/api/contact", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      } else {
        toast.error("Failed to load client inquiries");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error loading inquiries");
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  const handleDeleteInquiry = async (id: any) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) {
      return;
    }

    try {
      const res = await fetch(`/api/contact?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Inquiry deleted successfully!");
        fetchInquiries();
      } else {
        toast.error(data.error || "Failed to delete inquiry");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the inquiry");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPassword.trim()) {
      toast.error("Please enter your password");
      return;
    }

    setIsLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: loginPassword }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem("stryper_admin_token", data.token);
        setSessionToken(data.token);
        setIsAuthenticated(true);
        toast.success("Successfully logged in!");
      } else {
        toast.error(data.error || "Invalid password");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("stryper_admin_token");
    setSessionToken("");
    setIsAuthenticated(false);
    setLoginPassword("");
    toast.success("Logged out successfully");
  };

  // Direct Signed Client-to-Cloudinary Chunked Upload for Files up to 1 GB
  const uploadToCloudinaryWithProgress = async (
    file: File,
    resourceType: "image" | "video"
  ): Promise<string> => {
    // 1. Get secure signature from server API (/api/cloudinary-sign)
    const signRes = await fetch("/api/cloudinary-sign", { method: "POST" });
    if (!signRes.ok) {
      throw new Error("Failed to generate upload signature from server");
    }
    const signData = await signRes.json();
    const { signature, timestamp, apiKey, cloudName, folder } = signData;

    if (!signature || !apiKey || !cloudName) {
      throw new Error("Cloudinary credentials missing or invalid signature");
    }

    const chunkSize = 6 * 1024 * 1024; // 6 MB chunks (Cloudinary requires all non-EOF chunks to be >= 5MB)
    const totalChunks = Math.ceil(file.size / chunkSize);
    const uploadId = `uq_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    let finalUrl = "";

    // Upload individual 6MB chunk directly from browser to Cloudinary with retry
    const uploadChunkWithRetry = async (
      chunk: Blob,
      start: number,
      end: number,
      chunkIndex: number,
      maxRetries = 3
    ): Promise<any> => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          return await new Promise<any>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.timeout = 300000; // 5 minute timeout per 6MB chunk

            xhr.upload.onprogress = (e) => {
              if (e.lengthComputable) {
                const currentUploaded = start + e.loaded;
                const percent = Math.round((currentUploaded / file.size) * 100);
                const loadedMb = (currentUploaded / (1024 * 1024)).toFixed(1);
                const totalMb = (file.size / (1024 * 1024)).toFixed(1);

                setUploadProgress(percent);
                setUploadedMb(loadedMb);
                setTotalMb(totalMb);
                setUploadStatus(
                  `Uploading ${resourceType}... ${percent}% (${loadedMb} MB / ${totalMb} MB)`
                );
              }
            };

            xhr.onload = () => {
              const responseText = (xhr.responseText || "").trim();
              if (xhr.status >= 200 && xhr.status < 300) {
                try {
                  const response = JSON.parse(responseText);
                  resolve(response);
                } catch (err) {
                  reject(new Error("Failed to parse Cloudinary response"));
                }
              } else {
                try {
                  const response = JSON.parse(responseText);
                  reject(new Error(response?.error?.message || `Upload failed with status ${xhr.status}`));
                } catch (e) {
                  reject(new Error(`Upload failed with status ${xhr.status}`));
                }
              }
            };

            xhr.onerror = () => reject(new Error(`Network error on chunk ${chunkIndex + 1}`));
            xhr.ontimeout = () => reject(new Error(`Upload chunk ${chunkIndex + 1} timed out`));

            const formData = new FormData();
            formData.append("file", chunk, file.name);
            formData.append("api_key", apiKey);
            formData.append("timestamp", timestamp.toString());
            formData.append("signature", signature);
            formData.append("folder", folder);

            xhr.open("POST", cloudinaryUrl, true);
            if (totalChunks > 1) {
              xhr.setRequestHeader("Content-Range", `bytes ${start}-${end - 1}/${file.size}`);
              xhr.setRequestHeader("X-Unique-Upload-Id", uploadId);
            }
            xhr.send(formData);
          });
        } catch (err: any) {
          if (attempt < maxRetries) {
            setUploadStatus(
              `Network hiccup. Retrying chunk ${chunkIndex + 1}/${totalChunks} (Attempt ${attempt + 1}/${maxRetries})...`
            );
            await new Promise((r) => setTimeout(r, 1500));
          } else {
            throw err;
          }
        }
      }
    };

    if (totalChunks === 1) {
      const res = await uploadChunkWithRetry(file, 0, file.size, 0);
      finalUrl = res.secure_url;
    } else {
      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const chunk = file.slice(start, end);

        const chunkRes = await uploadChunkWithRetry(chunk, start, end, i);
        if (chunkRes.secure_url) {
          finalUrl = chunkRes.secure_url;
        }
      }
    }

    if (!finalUrl) {
      throw new Error("Failed to retrieve uploaded media URL from Cloudinary");
    }

    setUploadStatus("Upload complete! Saving event data...");
    return finalUrl;
  };

  // Event creation
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) {
      toast.error("Event title is required");
      return;
    }

    const finalCategory = eventCategory === "new" ? customCategory.trim().toLowerCase() : eventCategory;
    if (eventCategory === "new" && !customCategory.trim()) {
      toast.error("Please enter a custom category name");
      return;
    }

    setIsSubmittingEvent(true);
    setUploadProgress(0);
    setUploadedMb("0.0");
    setTotalMb("0.0");
    setUploadStatus("Initializing upload...");

    let directMediaUrl = "";

    try {
      if (eventType !== "coming-soon") {
        if (eventMediaSource === "upload") {
          if (!eventFile) {
            toast.error("Please select a file to upload");
            setIsSubmittingEvent(false);
            return;
          }

          // Validate file size before upload
          if (eventType === "image" && eventFile.size > 5 * 1024 * 1024) {
            toast.error("Image file size exceeds 5 MB limit");
            setIsSubmittingEvent(false);
            return;
          }
          if (eventType === "video" && eventFile.size > 100 * 1024 * 1024) {
            toast.error("Video file size exceeds Cloudinary Free Account limit (100 MB). Use 'External URL' for larger videos.");
            setIsSubmittingEvent(false);
            return;
          }

          // Upload via chunk proxy
          directMediaUrl = await uploadToCloudinaryWithProgress(
            eventFile,
            eventType === "video" ? "video" : "image"
          );
        } else {
          if (!eventExternalUrl.trim()) {
            toast.error("Please enter a media URL");
            setIsSubmittingEvent(false);
            return;
          }
        }
      }

      // Step 3: Save Event metadata + Cloudinary URL in MongoDB
      const formData = new FormData();
      formData.append("title", eventTitle);
      formData.append("category", finalCategory);
      formData.append("type", eventType);
      formData.append("mediaSource", eventMediaSource);

      if (directMediaUrl) {
        formData.append("directMediaUrl", directMediaUrl);
      } else if (eventExternalUrl) {
        formData.append("externalUrl", eventExternalUrl);
      }

      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Event post added successfully!");
        // Reset form
        setEventTitle("");
        setEventFile(null);
        setEventExternalUrl("");
        if (eventPreviewUrl) {
          URL.revokeObjectURL(eventPreviewUrl);
        }
        setEventPreviewUrl(null);
        setEventCategory("corporate");
        setCustomCategory("");
        setUploadProgress(0);
        setUploadStatus("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        // Refresh items
        fetchEvents();
      } else {
        toast.error(data.error || "Failed to create event post");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred while creating event post");
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  // Event deletion
  const handleDeleteEvent = async (id: any) => {
    if (!confirm("Are you sure you want to delete this event post?")) {
      return;
    }

    try {
      const res = await fetch(`/api/events?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Event post deleted!");
        fetchEvents();
      } else {
        toast.error(data.error || "Failed to delete event post");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the event post");
    }
  };

  // File selection handler with size validation & preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (eventType === "image") {
      const maxImageBytes = 5 * 1024 * 1024; // 5 MB limit
      if (file.size > maxImageBytes) {
        toast.error(`Image size exceeds 5 MB limit. Selected: ${(file.size / (1024 * 1024)).toFixed(2)} MB`);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }
    } else if (eventType === "video") {
      const maxVideoBytes = 100 * 1024 * 1024; // 100 MB Cloudinary Free Account hard limit
      if (file.size > maxVideoBytes) {
        toast.error(
          `Selected video (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds Cloudinary Free Account limit (100 MB). Switched to 'External URL' tab for pasting YouTube/Drive link.`
        );
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setEventFile(null);
        setEventMediaSource("url");
        return;
      }
    }

    if (eventPreviewUrl) {
      URL.revokeObjectURL(eventPreviewUrl);
    }

    setEventFile(file);
    const url = URL.createObjectURL(file);
    setEventPreviewUrl(url);
  };

  // Render stats counters
  const totalEvents = events.length;
  const imageEventsCount = events.filter((e) => e.type === "image").length;
  const videoEventsCount = events.filter((e) => e.type === "video").length;

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-primary-black relative overflow-hidden px-4">
        {/* Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-yellow/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full glass glow-border p-8 rounded-3xl relative z-10 text-center"
        >
          <div className="w-16 h-16 bg-accent-yellow/10 border border-accent-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-accent-yellow w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
            Stryper Admin
          </h1>
          <p className="text-white/50 text-sm mb-8">
            Please enter your passcode to access the website administration console.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Admin Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 text-center font-bold tracking-widest focus:outline-none focus:border-accent-yellow transition-all"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoggingIn}
              type="submit"
              className="w-full py-4 bg-accent-yellow hover:bg-accent-yellow/90 text-primary-black rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(250,204,21,0.2)] disabled:opacity-50"
            >
              {isLoggingIn ? "Authenticating..." : "Unlock Console"}
            </motion.button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 md:pt-32 pb-16 bg-primary-black text-white">
      <Container>
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6 mb-8">
          <div>
            <span className="text-[10px] font-black tracking-[0.2em] text-accent-yellow uppercase">Control Room</span>
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter">Stryper Admin Console</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-red-500/20 hover:border-red-500/30 border border-white/10 rounded-full text-xs font-bold transition-all text-white/70 hover:text-red-400"
          >
            <LogOut size={14} />
            Logout
          </motion.button>
        </div>

        {/* Tab Controls */}
        <div className="flex overflow-x-auto gap-2 border-b border-white/5 pb-4 mb-8 no-scrollbar">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard, badge: 0 },
            { id: "portfolio", label: "Event Portfolio", icon: ImageIcon, badge: 0 },
            { id: "inquiries", label: "Client Inquiries", icon: FileText, badge: inquiries.length },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-accent-yellow text-primary-black shadow-[0_0_20px_rgba(250,204,21,0.2)]"
                    : "bg-white/5 text-white/60 border border-white/10 hover:border-accent-yellow/50"
                }`}
              >
                <Icon size={16} />
                {tab.label}
                {tab.badge > 0 && (
                  <span className="ml-1.5 px-2.5 py-0.5 text-[10px] font-black bg-red-500 text-white rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Total Events", value: totalEvents, icon: ImageIcon, desc: "Live in gallery", tab: "portfolio" },
                  { title: "Image Posts", value: imageEventsCount, icon: ImageIcon, desc: "Event photographs", tab: "portfolio" },
                  { title: "Video Posts", value: videoEventsCount, icon: VideoIcon, desc: "Event recordings", tab: "portfolio" },
                  { title: "Client Inquiries", value: inquiries.length, icon: FileText, desc: "Awaiting response", tab: "inquiries" },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={i} 
                      onClick={() => setActiveTab(stat.tab as any)}
                      className="glass glow-border p-6 rounded-2xl flex items-center justify-between cursor-pointer hover:border-accent-yellow/50 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                      <div>
                        <span className="text-xs text-white/50 font-bold block mb-1">{stat.title}</span>
                        <span className="text-3xl font-black text-white">{stat.value}</span>
                        <span className="text-[10px] text-accent-yellow block mt-1 uppercase tracking-wider">{stat.desc}</span>
                      </div>
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/60">
                        <Icon size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass glow-border p-8 rounded-3xl space-y-4">
                  <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
                    <BarChart2 className="text-accent-yellow" size={20} />
                    Platform Status
                  </h3>
                  <div className="space-y-3 pt-2 text-sm">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-white/50">Storage Type</span>
                      <span className="font-bold text-accent-yellow">MongoDB Cloud</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-white/50">Media Location</span>
                      <span className="font-bold text-white">Inline Base64 Cloud</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-white/50">Security Token</span>
                      <span className="font-bold text-green-400 flex items-center gap-1">
                        <Check size={14} /> Active
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Next.js Version</span>
                      <span className="font-bold text-white/80">14.2.35 (App Router)</span>
                    </div>
                  </div>
                </div>

                <div className="glass glow-border p-8 rounded-3xl flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                      <PlusCircle className="text-accent-yellow" size={20} />
                      Quick Setup Shortcut
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      You can navigate directly to the **Event Portfolio** or **Client Inquiries** tabs using the tab bar above to quickly manage event details or view leads.
                    </p>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setActiveTab("portfolio")}
                      className="px-5 py-2.5 bg-accent-yellow text-primary-black text-xs font-black uppercase tracking-wider rounded-full hover:bg-accent-yellow/90 transition-all"
                    >
                      Manage Portfolio
                    </button>
                    <button
                      onClick={() => setActiveTab("inquiries")}
                      className="px-5 py-2.5 bg-white/10 border border-white/10 text-white text-xs font-black uppercase tracking-wider rounded-full hover:bg-white/20 transition-all"
                    >
                      View Inquiries
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "portfolio" && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Event Editor Form (Col 1) */}
              <div className="lg:col-span-1">
                <div className="glass glow-border p-6 rounded-3xl space-y-6 sticky top-28">
                  <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
                    <Plus className="text-accent-yellow" size={22} />
                    Add Event Post
                  </h3>

                  <form onSubmit={handleCreateEvent} className="space-y-4">
                    {/* Title */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/60 uppercase">Event Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Award Show Gala"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent-yellow transition-all"
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/60 uppercase">Category</label>
                      <select
                        value={eventCategory}
                        onChange={(e) => setEventCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-accent-yellow transition-all"
                      >
                        {(() => {
                          const defaultCats = [
                            { id: "corporate", label: "Corporate" },
                            { id: "sports", label: "Sports" },
                            { id: "weddings", label: "Weddings" },
                            { id: "brand", label: "Promotion" },
                            { id: "fabrication", label: "Fabrication (Fab)" }
                          ];
                          const combined = [...defaultCats];
                          if (Array.isArray(events)) {
                            events.forEach((evt) => {
                              if (evt.category && !combined.some((c) => c.id === evt.category)) {
                                const label = evt.category.charAt(0).toUpperCase() + evt.category.slice(1);
                                combined.push({ id: evt.category, label });
                              }
                            });
                          }
                          return combined.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                          ));
                        })()}
                        <option value="new">+ Add New Category...</option>
                      </select>

                      {eventCategory === "new" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="pt-2"
                        >
                          <input
                            type="text"
                            placeholder="Enter new category name"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent-yellow transition-all"
                          />
                        </motion.div>
                      )}
                    </div>

                    {/* Post Type */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/60 uppercase block">Media Type</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "image", label: "Image" },
                          { id: "video", label: "Video" },
                          { id: "coming-soon", label: "Placeholder" },
                        ].map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setEventType(t.id as any)}
                            className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                              eventType === t.id
                                ? "bg-accent-yellow text-primary-black border-accent-yellow"
                                : "bg-white/5 text-white/60 border-white/10 hover:border-white/20"
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Media Source Choice (Only if not placeholder) */}
                    {eventType !== "coming-soon" && (
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 text-xs font-bold text-white/70 cursor-pointer">
                            <input
                              type="radio"
                              name="mediaSource"
                              checked={eventMediaSource === "upload"}
                              onChange={() => setEventMediaSource("upload")}
                              className="accent-accent-yellow"
                            />
                            Local Upload
                          </label>
                          <label className="flex items-center gap-2 text-xs font-bold text-white/70 cursor-pointer">
                            <input
                              type="radio"
                              name="mediaSource"
                              checked={eventMediaSource === "url"}
                              onChange={() => setEventMediaSource("url")}
                              className="accent-accent-yellow"
                            />
                            External URL
                          </label>
                        </div>

                        {/* File Upload Zone */}
                        {eventMediaSource === "upload" ? (
                          <div className="space-y-3">
                            {/* Size limit indicator badge */}
                            <div className="flex items-center justify-between text-[11px] font-semibold text-white/60 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                              <span>Allowed Format: {eventType === "image" ? "Images (JPG, PNG, WebP)" : "Videos (MP4, MOV, WebM)"}</span>
                              <span className="text-accent-yellow font-bold">
                                {eventType === "image" ? "Max: 5 MB" : "Max: 100 MB (Direct)"}
                              </span>
                            </div>

                            <div
                              onClick={() => fileInputRef.current?.click()}
                              className="border-2 border-dashed border-white/10 hover:border-accent-yellow/50 rounded-2xl p-6 text-center cursor-pointer hover:bg-white/5 transition-all space-y-2 group"
                            >
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept={eventType === "image" ? "image/*" : "video/*"}
                                className="hidden"
                              />
                              {eventFile ? (
                                <div className="space-y-3 p-3 bg-white/5 border border-accent-yellow/30 rounded-xl relative group-hover:border-accent-yellow transition-all">
                                  <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0 text-left">
                                      <div className="w-10 h-10 rounded-lg bg-accent-yellow/10 border border-accent-yellow/20 flex items-center justify-center shrink-0">
                                        {eventType === "video" ? (
                                          <VideoIcon size={20} className="text-accent-yellow" />
                                        ) : (
                                          <UploadCloud size={20} className="text-accent-yellow" />
                                        )}
                                      </div>
                                      <div className="min-w-0">
                                        <div className="text-xs font-bold text-white truncate max-w-[180px]" title={eventFile.name}>
                                          {eventFile.name}
                                        </div>
                                        <div className="text-[10px] text-white/50 font-mono">
                                          {(eventFile.size / (1024 * 1024)).toFixed(1)} MB
                                        </div>
                                      </div>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent-yellow bg-accent-yellow/10 px-2 py-1 rounded border border-accent-yellow/20 shrink-0">
                                      File Ready
                                    </span>
                                  </div>

                                  {/* Optional Media Preview */}
                                  {eventPreviewUrl && (
                                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden w-full max-w-[260px] mx-auto border border-white/10 bg-black/60">
                                      {eventType === "image" ? (
                                        <img
                                          src={eventPreviewUrl}
                                          alt="Preview"
                                          className="object-cover w-full h-full"
                                        />
                                      ) : (
                                        <video
                                          src={`${eventPreviewUrl}#t=0.1`}
                                          controls
                                          preload="metadata"
                                          className="object-cover w-full h-full"
                                        />
                                      )}
                                    </div>
                                  )}

                                  <div className="text-[10px] text-white/40 italic">
                                    Click box to change file
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <UploadCloud className="mx-auto text-white/30 group-hover:text-accent-yellow transition-colors" size={32} />
                                  <div className="text-xs font-bold text-white/60">
                                    Drag & drop or <span className="text-accent-yellow">browse</span>
                                  </div>
                                  <div className="text-[10px] text-white/40">
                                    {eventType === "image" ? "Up to 5 MB per image" : "Up to 100 MB (Direct) | Use 'External URL' for >100 MB"}
                                  </div>
                                </>
                              )}
                            </div>

                            {/* Real-time Upload Progress Bar */}
                            {isSubmittingEvent && (
                              <div className="space-y-2 p-3.5 bg-accent-yellow/5 border border-accent-yellow/30 rounded-xl animate-pulse">
                                <div className="flex justify-between items-center text-xs">
                                  <span className="font-bold text-accent-yellow truncate">{uploadStatus || "Preparing video upload..."}</span>
                                  <span className="font-mono font-bold text-white">{uploadProgress}%</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/10">
                                  <div
                                    className="bg-accent-yellow h-full transition-all duration-200 ease-out rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                                    style={{ width: `${Math.max(uploadProgress, 5)}%` }}
                                  />
                                </div>
                                <div className="text-[11px] text-right font-mono text-white/70 font-semibold">
                                  {uploadedMb} MB / {totalMb !== "0.0" ? totalMb : eventFile ? (eventFile.size / (1024 * 1024)).toFixed(1) : "0.0"} MB
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          /* External URL Input */
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase">Media Link</label>
                            <input
                              type="url"
                              placeholder={
                                eventType === "image"
                                  ? "https://images.unsplash.com/photo-..."
                                  : "https://example.com/video.mp4"
                              }
                              value={eventExternalUrl}
                              onChange={(e) => setEventExternalUrl(e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent-yellow transition-all"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Submit */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmittingEvent}
                      type="submit"
                      className="w-full py-3.5 bg-accent-yellow hover:bg-accent-yellow/90 text-primary-black rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_5px_15px_rgba(250,204,21,0.1)] disabled:opacity-50 pt-3"
                    >
                      {isSubmittingEvent ? "Uploading Post..." : "Create Event Post"}
                    </motion.button>
                  </form>
                </div>
              </div>

              {/* Event List (Col 2 & 3) */}
              <div className="lg:col-span-2 space-y-4">
                <div className="glass glow-border p-6 rounded-3xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold uppercase tracking-tight">Current Gallery items ({events.length})</h3>
                    <button 
                      onClick={fetchEvents}
                      className="text-xs font-bold text-accent-yellow hover:underline"
                    >
                      Refresh List
                    </button>
                  </div>

                  {isLoadingEvents ? (
                    <div className="space-y-4 py-12 text-center text-white/40">
                      <div className="w-8 h-8 rounded-full border border-white/10 border-t-accent-yellow animate-spin mx-auto mb-4" />
                      Loading portfolio items...
                    </div>
                  ) : events.length === 0 ? (
                    <div className="text-center py-16 border border-white/5 rounded-2xl bg-white/5 text-white/40">
                      <AlertCircle className="mx-auto mb-3" size={32} />
                      No portfolio events found.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-2 no-scrollbar">
                      {events.map((item) => {
                        return (
                          <div
                            key={item.id}
                            className="flex border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden bg-white/5 p-3 items-center justify-between gap-4 transition-all"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {/* Media Thumbnail */}
                              <div 
                                onClick={() => {
                                  if (item.type !== "coming-soon" && (item.image || item.video)) {
                                    setPreviewMedia({
                                      url: item.image || item.video || "",
                                      type: item.type as any,
                                      title: item.title
                                    });
                                  }
                                }}
                                title="Click to preview"
                                className="relative w-16 h-12 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 duration-200 transition-all hover:border-accent-yellow/50"
                              >
                                {item.type === "image" && item.image ? (
                                  <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                  />
                                ) : item.type === "video" && item.video ? (
                                  <div className="relative w-full h-full flex items-center justify-center">
                                    <video src={item.video} className="w-full h-full object-cover" muted />
                                    <Play size={12} className="absolute text-accent-yellow fill-accent-yellow" />
                                  </div>
                                ) : (
                                  <span className="text-[8px] text-white/40 uppercase tracking-widest text-center">Soon</span>
                                )}
                              </div>

                              <div className="min-w-0">
                                <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[9px] font-black uppercase text-accent-yellow tracking-wider">
                                    {item.category}
                                  </span>
                                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                                  <span className="text-[9px] text-white/50 font-bold uppercase">
                                    {item.type}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteEvent(item.id)}
                              className="w-10 h-10 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:border-red-500 rounded-xl flex items-center justify-center text-red-400 hover:text-white transition-all shrink-0"
                              title="Delete Post"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "inquiries" && (
            <motion.div
              key="inquiries"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="glass glow-border p-6 rounded-3xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-tight">Client Inquiries ({inquiries.length})</h3>
                    <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">Submissions from contact forms</p>
                  </div>
                  <button 
                    onClick={fetchInquiries}
                    className="text-xs font-bold text-accent-yellow hover:underline"
                  >
                    Refresh List
                  </button>
                </div>

                {isLoadingInquiries ? (
                  <div className="space-y-4 py-12 text-center text-white/40">
                    <div className="w-8 h-8 rounded-full border border-white/10 border-t-accent-yellow animate-spin mx-auto mb-4" />
                    Loading inquiries...
                  </div>
                ) : inquiries.length === 0 ? (
                  <div className="text-center py-16 border border-white/5 rounded-2xl bg-white/5 text-white/40">
                    <AlertCircle className="mx-auto mb-3" size={32} />
                    No inquiries found.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto pr-2 no-scrollbar">
                    {inquiries.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col border border-white/10 hover:border-white/20 rounded-2xl bg-white/5 p-6 justify-between gap-4 transition-all relative overflow-hidden group"
                      >
                        {/* Decorative Top Line Badge */}
                        <div className={`absolute top-0 left-0 right-0 h-1 ${
                          item.type === "tourism" ? "bg-cyan-500" : "bg-accent-yellow"
                        }`} />

                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-bold text-white">{item.fullName}</h4>
                              <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border mt-1 inline-block ${
                                item.type === "tourism" 
                                  ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" 
                                  : "bg-accent-yellow/10 text-accent-yellow border-accent-yellow/20"
                              }`}>
                                {item.type === "tourism" ? "Tourism Inquiry" : "Event Inquiry"}
                              </span>
                            </div>
                            <span className="text-[10px] text-white/40 font-bold">
                              {new Date(item.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </span>
                          </div>

                          {/* Contact Info Table */}
                          <div className="grid grid-cols-2 gap-2 text-xs border-y border-white/5 py-3">
                            <div>
                              <span className="text-white/40 block text-[10px] uppercase font-bold">Phone</span>
                              <a href={`tel:${item.phone}`} className="font-bold text-white hover:underline">{item.phone}</a>
                            </div>
                            <div>
                              <span className="text-white/40 block text-[10px] uppercase font-bold">Email</span>
                              <a href={`mailto:${item.email}`} className="font-bold text-white hover:underline truncate block">{item.email}</a>
                            </div>
                          </div>

                          {/* Inquiry Details */}
                          {item.type === "tourism" ? (
                            <div className="grid grid-cols-3 gap-2 text-xs bg-white/5 p-3 rounded-xl border border-white/5">
                              <div>
                                <span className="text-white/40 block text-[9px] uppercase font-bold">Plan</span>
                                <span className="font-bold text-cyan-400">{item.selectedPlan}</span>
                              </div>
                              <div>
                                <span className="text-white/40 block text-[9px] uppercase font-bold">Persons</span>
                                <span className="font-bold">{item.numPersons}</span>
                              </div>
                              <div>
                                <span className="text-white/40 block text-[9px] uppercase font-bold">Travel Date</span>
                                <span className="font-bold">{item.travelDate}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-3 gap-2 text-xs bg-white/5 p-3 rounded-xl border border-white/5">
                              <div>
                                <span className="text-white/40 block text-[9px] uppercase font-bold">Event Type</span>
                                <span className="font-bold text-accent-yellow">{item.eventType}</span>
                              </div>
                              <div>
                                <span className="text-white/40 block text-[9px] uppercase font-bold">Budget</span>
                                <span className="font-bold">{item.budgetRange}</span>
                              </div>
                              <div>
                                <span className="text-white/40 block text-[9px] uppercase font-bold">Event Date</span>
                                <span className="font-bold">{item.eventDate}</span>
                              </div>
                            </div>
                          )}

                          {item.message && (
                            <div className="space-y-1">
                              <span className="text-white/40 block text-[10px] uppercase font-bold">Message</span>
                              <p className="text-xs text-white/70 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                                {item.message}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-white/5 gap-2">
                          <a
                            href={getWhatsAppLink(item.phone, item.fullName, item.type)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-4 py-2.5 bg-green-500/10 border border-green-500/20 hover:bg-green-500 hover:border-green-500 rounded-xl text-xs font-bold text-green-400 hover:text-white transition-all duration-300"
                          >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                            </svg>
                            WhatsApp Chat
                          </a>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteInquiry(item.id)}
                            className="flex items-center gap-1.5 px-4 py-2.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:border-red-500 rounded-xl text-xs font-bold text-red-400 hover:text-white transition-all duration-300"
                            title="Delete Inquiry"
                          >
                            <Trash2 size={14} />
                            Dismiss
                          </motion.button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
          
          {/* Lightbox Media Preview Modal */}
          {previewMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewMedia(null)}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center relative bg-zinc-950 border border-white/10 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-default"
              >
                {/* Header */}
                <div className="w-full flex justify-between items-center mb-4 border-b border-white/5 pb-3">
                  <h3 className="text-base font-bold uppercase tracking-tight text-white truncate max-w-[80%]">
                    {previewMedia.title}
                  </h3>
                  <button
                    onClick={() => setPreviewMedia(null)}
                    className="p-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Media Container */}
                <div className="relative w-full flex items-center justify-center flex-1 overflow-hidden rounded-2xl bg-black min-h-[300px] max-h-[60vh]">
                  {previewMedia.type === "image" ? (
                    <img
                      src={previewMedia.url}
                      alt={previewMedia.title}
                      className="object-contain max-w-full max-h-[60vh] w-auto h-auto rounded-xl"
                    />
                  ) : (
                    <video
                      src={previewMedia.url}
                      controls
                      autoPlay
                      className="max-w-full max-h-[60vh] rounded-xl"
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </main>
  );
}
