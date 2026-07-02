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
  BookOpen, 
  PlusCircle, 
  LogOut, 
  BarChart2, 
  UploadCloud, 
  Check, 
  AlertCircle, 
  Calendar, 
  FileText,
  User,
  Clock,
  LayoutDashboard
} from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

import Container from "@/components/ui/Container";

export default function AdminPage() {
  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [sessionToken, setSessionToken] = useState("");

  // Tab states: overview, portfolio, blogs
  const [activeTab, setActiveTab] = useState<"overview" | "portfolio" | "blogs">("overview");

  // Data states
  const [events, setEvents] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);

  // Form states for Event Post
  const [eventTitle, setEventTitle] = useState("");
  const [eventCategory, setEventCategory] = useState("corporate");
  const [eventType, setEventType] = useState<"image" | "video" | "coming-soon">("image");
  const [eventMediaSource, setEventMediaSource] = useState<"upload" | "url">("upload");
  const [eventFile, setEventFile] = useState<File | null>(null);
  const [eventExternalUrl, setEventExternalUrl] = useState("");
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [eventPreviewUrl, setEventPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // MOCK Form states for Blog Post
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSubtitle, setBlogSubtitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("Corporate Events");
  const [blogContent, setBlogContent] = useState("");
  const [blogCoverUrl, setBlogCoverUrl] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [isSubmittingBlog, setIsSubmittingBlog] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem("stryper_admin_token");
    if (token) {
      setSessionToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch events and blogs once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
      fetchBlogs();
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

  const fetchBlogs = async () => {
    setIsLoadingBlogs(true);
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      } else {
        toast.error("Failed to load blogs data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error loading blogs");
    } finally {
      setIsLoadingBlogs(false);
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
        localStorage.setItem("stryper_admin_token", data.token);
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
    localStorage.removeItem("stryper_admin_token");
    setSessionToken("");
    setIsAuthenticated(false);
    setLoginPassword("");
    toast.success("Logged out successfully");
  };

  // Event creation
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) {
      toast.error("Event title is required");
      return;
    }

    setIsSubmittingEvent(true);
    const formData = new FormData();
    formData.append("title", eventTitle);
    formData.append("category", eventCategory);
    formData.append("type", eventType);
    formData.append("mediaSource", eventMediaSource);

    if (eventType !== "coming-soon") {
      if (eventMediaSource === "upload") {
        if (!eventFile) {
          toast.error("Please select a file to upload");
          setIsSubmittingEvent(false);
          return;
        }
        formData.append("file", eventFile);
      } else {
        if (!eventExternalUrl.trim()) {
          toast.error("Please enter a media URL");
          setIsSubmittingEvent(false);
          return;
        }
        formData.append("externalUrl", eventExternalUrl);
      }
    }

    try {
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
        setEventPreviewUrl(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        // Refresh items
        fetchEvents();
      } else {
        toast.error(data.error || "Failed to create event post");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating event post");
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

  // Mock Blog creation
  const handleCreateBlogMock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim()) {
      toast.error("Blog title is required");
      return;
    }

    setIsSubmittingBlog(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Blog created! (Note: Simulated in Mock Mode. Full writing integration coming soon.)");
    
    // Simulate appending to the local list for visual feedback
    const mockBlog = {
      id: Date.now().toString(),
      title: blogTitle,
      subtitle: blogSubtitle,
      category: blogCategory,
      content: blogContent,
      coverImage: blogCoverUrl || "/images/placeholder.jpg",
      author: blogAuthor || "Administrator",
      readTime: "3 min read",
      date: new Date().toISOString().split("T")[0]
    };
    
    setBlogs((prev) => [mockBlog, ...prev]);

    // Reset Form
    setBlogTitle("");
    setBlogSubtitle("");
    setBlogContent("");
    setBlogCoverUrl("");
    setBlogAuthor("");
    setIsSubmittingBlog(false);
  };

  // File selection handler with preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEventFile(file);
      const url = URL.createObjectURL(file);
      setEventPreviewUrl(url);
    }
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
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "portfolio", label: "Event Portfolio", icon: ImageIcon },
            { id: "blogs", label: "Blog Manager", icon: BookOpen },
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
                  { title: "Total Events", value: totalEvents, icon: ImageIcon, desc: "Live in gallery" },
                  { title: "Image Posts", value: imageEventsCount, icon: ImageIcon, desc: "Event photographs" },
                  { title: "Video Posts", value: videoEventsCount, icon: VideoIcon, desc: "Event recordings" },
                  { title: "Blog Posts", value: blogs.length, icon: BookOpen, desc: "Articles & News" },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="glass glow-border p-6 rounded-2xl flex items-center justify-between">
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
                      <span className="font-bold text-accent-yellow">Local JSON Files</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-white/50">Media Location</span>
                      <span className="font-bold">/public/uploads/</span>
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
                      You can navigate directly to the **Event Portfolio** or **Blog Manager** tabs using the tab bar above to quickly add new event photographs/videos, or manage blog content.
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
                      onClick={() => setActiveTab("blogs")}
                      className="px-5 py-2.5 bg-white/10 border border-white/10 text-white text-xs font-black uppercase tracking-wider rounded-full hover:bg-white/20 transition-all"
                    >
                      Manage Blogs
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
                        <option value="corporate">Corporate</option>
                        <option value="sports">Sports</option>
                        <option value="weddings">Weddings</option>
                        <option value="brand">Promotion</option>
                        <option value="fabrication">Fabrication (Fab)</option>
                      </select>
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
                            {eventPreviewUrl ? (
                              <div className="relative aspect-[4/3] rounded-lg overflow-hidden w-full max-w-[200px] mx-auto border border-white/10">
                                {eventType === "image" ? (
                                  <img
                                    src={eventPreviewUrl}
                                    alt="Preview"
                                    className="object-cover w-full h-full"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/40">
                                    <VideoIcon size={24} />
                                  </div>
                                )}
                              </div>
                            ) : (
                              <>
                                <UploadCloud className="mx-auto text-white/30 group-hover:text-accent-yellow transition-colors" size={32} />
                                <div className="text-xs font-bold text-white/60">
                                  Drag & drop or <span className="text-accent-yellow">browse</span>
                                </div>
                                <div className="text-[10px] text-white/40">
                                  {eventType === "image" ? "PNG, JPG or WebP" : "MP4 format recommended"}
                                </div>
                              </>
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
                              <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10 flex items-center justify-center">
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

          {activeTab === "blogs" && (
            <motion.div
              key="blogs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Blog Editor (Col 1) */}
              <div className="lg:col-span-1">
                <div className="glass glow-border p-6 rounded-3xl space-y-6 sticky top-28">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
                      <PlusCircle className="text-accent-yellow" size={22} />
                      Write Blog Post
                    </h3>
                    <span className="text-[9px] font-black uppercase bg-accent-yellow/10 text-accent-yellow px-2 py-0.5 rounded-full tracking-widest border border-accent-yellow/20">
                      Mock Mode
                    </span>
                  </div>

                  <form onSubmit={handleCreateBlogMock} className="space-y-4">
                    {/* Cover Image URL */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/60 uppercase">Cover Image Link</label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={blogCoverUrl}
                        onChange={(e) => setBlogCoverUrl(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent-yellow transition-all"
                      />
                    </div>

                    {/* Blog Title */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/60 uppercase">Blog Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Trends in Indian Weddings 2026"
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent-yellow transition-all"
                      />
                    </div>

                    {/* Subtitle */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/60 uppercase">Subtitle / Summary</label>
                      <input
                        type="text"
                        placeholder="Short summary of the blog post..."
                        value={blogSubtitle}
                        onChange={(e) => setBlogSubtitle(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent-yellow transition-all"
                      />
                    </div>

                    {/* Category & Author */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/60 uppercase">Category</label>
                        <select
                          value={blogCategory}
                          onChange={(e) => setBlogCategory(e.target.value)}
                          className="w-full px-3 py-3 bg-[#111] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-accent-yellow transition-all"
                        >
                          <option value="Corporate Events">Corporate</option>
                          <option value="Weddings">Weddings</option>
                          <option value="Sports Management">Sports</option>
                          <option value="Event Planning">Planning</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/60 uppercase">Author Name</label>
                        <input
                          type="text"
                          placeholder="Author"
                          value={blogAuthor}
                          onChange={(e) => setBlogAuthor(e.target.value)}
                          className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-xs focus:outline-none focus:border-accent-yellow transition-all"
                        />
                      </div>
                    </div>

                    {/* Markdown Body Content */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/60 uppercase">Content (Markdown supported)</label>
                      <textarea
                        rows={6}
                        placeholder="# Heading&#10;Write the blog post content here..."
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent-yellow transition-all resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmittingBlog}
                      type="submit"
                      className="w-full py-3.5 bg-accent-yellow hover:bg-accent-yellow/90 text-primary-black rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_5px_15px_rgba(250,204,21,0.1)] disabled:opacity-50 pt-3"
                    >
                      {isSubmittingBlog ? "Saving Blog..." : "Post Blog Article"}
                    </motion.button>
                  </form>
                </div>
              </div>

              {/* Blogs List Mock (Col 2 & 3) */}
              <div className="lg:col-span-2 space-y-4">
                <div className="glass glow-border p-6 rounded-3xl">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-tight">Active Blogs ({blogs.length})</h3>
                      <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">Loaded dynamically from data/blogs.json</p>
                    </div>
                    <button 
                      onClick={fetchBlogs}
                      className="text-xs font-bold text-accent-yellow hover:underline"
                    >
                      Refresh List
                    </button>
                  </div>

                  {isLoadingBlogs ? (
                    <div className="space-y-4 py-12 text-center text-white/40">
                      <div className="w-8 h-8 rounded-full border border-white/10 border-t-accent-yellow animate-spin mx-auto mb-4" />
                      Loading articles...
                    </div>
                  ) : blogs.length === 0 ? (
                    <div className="text-center py-16 border border-white/5 rounded-2xl bg-white/5 text-white/40">
                      <AlertCircle className="mx-auto mb-3" size={32} />
                      No blog articles found.
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 no-scrollbar">
                      {blogs.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col sm:flex-row border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden bg-white/5 p-4 items-start sm:items-center justify-between gap-4 transition-all"
                        >
                          <div className="flex gap-4 items-start sm:items-center min-w-0">
                            {/* Blog Cover Thumbnail */}
                            <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10 flex items-center justify-center">
                              {item.coverImage ? (
                                <Image
                                  src={item.coverImage}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                  sizes="80px"
                                />
                              ) : (
                                <FileText className="text-white/20" size={20} />
                              )}
                            </div>

                            <div className="min-w-0">
                              <span className="text-[9px] font-black uppercase text-accent-yellow tracking-wider px-2 py-0.5 rounded-full bg-accent-yellow/5 border border-accent-yellow/10">
                                {item.category}
                              </span>
                              <h4 className="text-base font-bold text-white mt-2 truncate sm:max-w-md">{item.title}</h4>
                              
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[10px] text-white/50 font-bold">
                                <span className="flex items-center gap-1">
                                  <User size={10} /> {item.author || "Admin"}
                                </span>
                                <span className="w-1 h-1 bg-white/20 rounded-full" />
                                <span className="flex items-center gap-1">
                                  <Calendar size={10} /> {item.date}
                                </span>
                                <span className="w-1 h-1 bg-white/20 rounded-full" />
                                <span className="flex items-center gap-1">
                                  <Clock size={10} /> {item.readTime}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 self-end sm:self-center shrink-0">
                            <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/40 text-[9px] font-black uppercase tracking-wider rounded-md">
                              API Stub Only
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                toast.error("Full deletion api connector is disabled in visual mock editor mode.");
                              }}
                              className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all"
                              title="Delete Blog"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </main>
  );
}
