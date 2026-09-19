"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Archive,
  Globe,
  UploadCloud,
  Bold,
  Italic,
  List,
  Heading2,
  Heading3,
  Quote,
  Link as LinkIcon,
  AlertCircle,
  ArrowLeft,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

interface BlogItem {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  subtitle?: string;
  excerpt?: string;
  category: string;
  tags?: string[];
  content: string;
  coverImage?: string;
  author: string;
  readTime?: string;
  date: string;
  status: "draft" | "published" | "archived";
  ctaText?: string;
  ctaUrl?: string;
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  created_at?: string;
  updated_at?: string;
}

interface AdminBlogManagerProps {
  sessionToken: string;
}

const DEFAULT_CATEGORIES = [
  "Weddings",
  "Corporate Events",
  "Event Production",
  "Brand Activation",
  "Sports Events",
  "Event Planning",
];

export default function AdminBlogManager({ sessionToken }: AdminBlogManagerProps) {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [allBlogs, setAllBlogs] = useState<BlogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // In-Page Editor View State (No Popup Modal)
  const [isEditingInPage, setIsEditingInPage] = useState(false);
  const [editorTab, setEditorTab] = useState<"content" | "seo" | "publishing">("content");
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Event Planning");
  const [customCategory, setCustomCategory] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [author, setAuthor] = useState("Kartikey Niranjan");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("/images/corporate-new.jpg");
  const [imageSource, setImageSource] = useState<"upload" | "url">("upload");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [status, setStatus] = useState<"draft" | "published" | "archived">("draft");
  const [ctaText, setCtaText] = useState("Book Your Consultation With Stryper Events");
  const [ctaUrl, setCtaUrl] = useState("/contact");

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [statusFilter, categoryFilter]);

  const fetchAllBlogs = async () => {
    try {
      const res = await fetch(`/api/blogs?admin=true`, {
        headers: { Authorization: `Bearer ${sessionToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAllBlogs(data.blogs || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      let url = `/api/blogs?admin=true`;
      if (statusFilter !== "all") url += `&status=${statusFilter}`;
      if (categoryFilter !== "all") url += `&category=${encodeURIComponent(categoryFilter)}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${sessionToken}` },
      });

      if (res.ok) {
        const data = await res.json();
        const list = data.blogs || [];
        setBlogs(list);
        if (statusFilter === "all" && categoryFilter === "all") {
          setAllBlogs(list);
        }
      } else {
        toast.error("Failed to fetch blogs list");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error fetching blogs");
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlugFromTitle = (t: string) => {
    return t
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!editingBlogId || !slug) {
      setSlug(generateSlugFromTitle(val));
    }
    if (!seoTitle || seoTitle === title) {
      setSeoTitle(val);
    }
  };

  const openNewEditor = () => {
    setEditingBlogId(null);
    setTitle("");
    setSlug("");
    setSubtitle("");
    setExcerpt("");
    setCategory("Event Planning");
    setCustomCategory("");
    setTagsInput("Weddings, Event Planning");
    setAuthor("Kartikey Niranjan");
    setContent("");
    setCoverImage("/images/corporate-new.jpg");
    setImageFile(null);
    setImagePreview(null);
    setStatus("draft");
    setCtaText("Book Your Consultation With Stryper Events");
    setCtaUrl("/contact");
    setSeoTitle("");
    setMetaDescription("");
    setFocusKeyword("");
    setCanonicalUrl("");
    setOgTitle("");
    setOgDescription("");
    setOgImage("");
    setEditorTab("content");
    setIsEditingInPage(true);
  };

  const openEditEditor = (b: BlogItem) => {
    setEditingBlogId(b.id || b._id || "");
    setTitle(b.title || "");
    setSlug(b.slug || generateSlugFromTitle(b.title || ""));
    setSubtitle(b.subtitle || "");
    setExcerpt(b.excerpt || b.subtitle || "");
    setCategory(DEFAULT_CATEGORIES.includes(b.category) ? b.category : "new");
    if (!DEFAULT_CATEGORIES.includes(b.category)) {
      setCustomCategory(b.category || "");
    }
    setTagsInput((b.tags || []).join(", "));
    setAuthor(b.author || "Stryper Editorial");
    setContent(b.content || "");
    setCoverImage(b.coverImage || "/images/corporate-new.jpg");
    setImageFile(null);
    setImagePreview(b.coverImage || null);
    setStatus(b.status || "draft");
    setCtaText(b.ctaText || "Book Your Consultation With Stryper Events");
    setCtaUrl(b.ctaUrl || "/contact");
    setSeoTitle(b.seoTitle || b.title || "");
    setMetaDescription(b.metaDescription || b.excerpt || "");
    setFocusKeyword(b.focusKeyword || "");
    setCanonicalUrl(b.canonicalUrl || `/blog/${b.slug}`);
    setOgTitle(b.ogTitle || b.title || "");
    setOgDescription(b.ogDescription || b.excerpt || "");
    setOgImage(b.ogImage || b.coverImage || "");
    setEditorTab("content");
    setIsEditingInPage(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file exceeds 5MB limit");
      return;
    }

    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const handleRemoveImage = () => {
    setCoverImage("");
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadCoverImageIfNeeded = async (): Promise<string> => {
    if (imageSource === "url" || !imageFile) {
      return coverImage;
    }

    setIsUploadingImage(true);
    try {
      const signRes = await fetch("/api/cloudinary-sign", { method: "POST" });
      if (!signRes.ok) throw new Error("Failed to get upload signature");
      const { signature, timestamp, apiKey, cloudName, folder } = await signRes.json();

      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("folder", folder);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        return data.secure_url;
      }
    } catch (err) {
      console.warn("Cloudinary upload fallback to preview URL:", err);
    } finally {
      setIsUploadingImage(false);
    }
    return imagePreview || coverImage;
  };

  const handleSave = async (targetStatus?: "draft" | "published" | "archived") => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and article content are required!");
      return;
    }

    setIsSubmitting(true);
    try {
      const uploadedImgUrl = await uploadCoverImageIfNeeded();
      const finalCategory = category === "new" ? customCategory.trim() : category;
      const finalStatus = targetStatus || status;
      const finalSlug = slug.trim() ? generateSlugFromTitle(slug) : generateSlugFromTitle(title);
      const tagsArray = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);

      const payload = {
        id: editingBlogId,
        title,
        slug: finalSlug,
        subtitle,
        excerpt: excerpt || subtitle,
        category: finalCategory,
        tags: tagsArray,
        content,
        coverImage: uploadedImgUrl,
        author,
        status: finalStatus,
        ctaText,
        ctaUrl,
        seoTitle: seoTitle || title,
        metaDescription: metaDescription || excerpt || subtitle,
        focusKeyword,
        canonicalUrl: canonicalUrl || `/blog/${finalSlug}`,
        ogTitle: ogTitle || seoTitle || title,
        ogDescription: ogDescription || metaDescription || excerpt,
        ogImage: ogImage || uploadedImgUrl,
      };

      const method = editingBlogId ? "PUT" : "POST";
      const res = await fetch("/api/blogs", {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(`Blog post ${editingBlogId ? "updated" : "created"} as ${finalStatus}!`);
        setIsEditingInPage(false);
        fetchBlogs();
      } else {
        toast.error(data.error || "Failed to save blog post");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Error saving blog post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusToggle = async (b: BlogItem, newStatus: "draft" | "published" | "archived") => {
    try {
      const res = await fetch("/api/blogs", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({ id: b.id || b._id, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Blog status updated to ${newStatus}`);
        fetchBlogs();
      } else {
        toast.error(data.error || "Failed to update status");
      }
    } catch (err) {
      toast.error("Network error updating status");
    }
  };

  const handleDelete = async (b: BlogItem) => {
    if (!confirm(`Are you sure you want to delete "${b.title}"?`)) return;

    try {
      const res = await fetch(`/api/blogs?id=${b.id || b._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${sessionToken}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Blog post deleted successfully");
        fetchBlogs();
      } else {
        toast.error(data.error || "Failed to delete blog post");
      }
    } catch (err) {
      toast.error("Error deleting blog post");
    }
  };

  const insertFormatting = (syntaxStart: string, syntaxEnd: string = "") => {
    if (!textareaRef.current) return;
    const el = textareaRef.current;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = el.value;
    const selected = text.substring(start, end) || "text";

    const replacement = `${syntaxStart}${selected}${syntaxEnd}`;
    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setContent(newContent);

    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + syntaxStart.length, end + syntaxStart.length);
    }, 50);
  };

  const filteredBlogs = blogs.filter((b) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q);
    return matchesSearch;
  });

  const metricsSource = allBlogs.length > 0 ? allBlogs : blogs;
  const totalCount = metricsSource.length;
  const publishedCount = metricsSource.filter((b) => b.status === "published").length;
  const draftCount = metricsSource.filter((b) => b.status === "draft").length;
  const archivedCount = metricsSource.filter((b) => b.status === "archived").length;

  // IN-PAGE EDITOR VIEW
  if (isEditingInPage) {
    return (
      <div className="space-y-6">
        {/* Back Button & Page Header */}
        <div className="flex items-center justify-between bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setIsEditingInPage(false)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog List
          </button>

          <h2 className="text-xl font-bold text-white">
            {editingBlogId ? "Edit Blog Article" : "Write New Blog Article"}
          </h2>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={isSubmitting || isUploadingImage}
              onClick={() => handleSave("draft")}
              className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-sm font-semibold"
            >
              {isSubmitting ? "Saving..." : "Save Draft"}
            </button>

            <button
              type="button"
              disabled={isSubmitting || isUploadingImage}
              onClick={() => handleSave("published")}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20"
            >
              {isSubmitting ? "Publishing..." : "Publish Article"}
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 rounded-t-2xl px-4 pt-2">
          <button
            onClick={() => setEditorTab("content")}
            className={`py-3 px-5 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
              editorTab === "content"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText className="w-4 h-4" /> Article Content
          </button>
          <button
            onClick={() => setEditorTab("seo")}
            className={`py-3 px-5 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
              editorTab === "seo"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Globe className="w-4 h-4" /> SEO & Meta Data
          </button>
          <button
            onClick={() => setEditorTab("publishing")}
            className={`py-3 px-5 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
              editorTab === "publishing"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <CheckCircle className="w-4 h-4" /> Publishing & CTA
          </button>
        </div>

        {/* Editor Body */}
        <div className="bg-slate-900/80 p-8 rounded-b-2xl border border-slate-800 space-y-6">
          {editorTab === "content" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Destination Wedding Cost in Jaipur 2026"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                    URL Slug (/blog/{slug})
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(generateSlugFromTitle(e.target.value))}
                    placeholder="destination-wedding-cost-jaipur"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 font-mono text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  >
                    {DEFAULT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                    <option value="new">+ Custom Category</option>
                  </select>
                </div>

                {category === "new" && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                      Custom Category Name
                    </label>
                    <input
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="e.g. Royal Venues"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Kartikey Niranjan"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Weddings, Jaipur, Decor"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                  Excerpt / Short Summary
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Clear 2-sentence summary of the article..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-300 uppercase">
                  Featured Image
                </label>
                <div className="flex gap-4 items-center">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="imageSource"
                      checked={imageSource === "upload"}
                      onChange={() => setImageSource("upload")}
                    />
                    Upload Image File
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="imageSource"
                      checked={imageSource === "url"}
                      onChange={() => setImageSource("url")}
                    />
                    External Image URL
                  </label>
                </div>

                {imageSource === "upload" ? (
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500 text-sm text-slate-300 flex items-center gap-2"
                    >
                      <UploadCloud className="w-4 h-4 text-amber-400" />
                      Choose Image File
                    </button>
                    {imagePreview && (
                      <div className="relative group inline-block">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-20 h-14 object-cover rounded-lg border border-slate-700"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          title="Remove Image"
                          className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow-lg transition-all"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={coverImage}
                      onChange={(e) => {
                        setCoverImage(e.target.value);
                        setImagePreview(e.target.value);
                      }}
                      placeholder="/images/corporate-new.jpg or https://..."
                      className="w-full px-4 py-3 pr-10 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                    {coverImage && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        title="Clear Image"
                        className="absolute right-3 p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-300 uppercase">
                    Article Text Content *
                  </label>

                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button
                      type="button"
                      onClick={() => insertFormatting("## ", "\n")}
                      title="H2 Heading"
                      className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-amber-400"
                    >
                      <Heading2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("### ", "\n")}
                      title="H3 Heading"
                      className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-amber-400"
                    >
                      <Heading3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("**", "**")}
                      title="Bold Text"
                      className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-amber-400"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("*", "*")}
                      title="Italic Text"
                      className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-amber-400"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("* ", "\n")}
                      title="Bullet List"
                      className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-amber-400"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("> ", "\n")}
                      title="Quote"
                      className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-amber-400"
                    >
                      <Quote className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("[Link Text](", ")")}
                      title="Add Link"
                      className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-amber-400"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <textarea
                  ref={textareaRef}
                  rows={16}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write clear, authentic article text here... Use ## for section headings and [link](/contact) for internal links."
                  className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans text-sm leading-relaxed focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}

          {editorTab === "seo" && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                  SEO Title Tag
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Destination Wedding Cost in Jaipur 2026 | Stryper Events"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Budget breakdown for destination weddings in Jaipur..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                    Focus Keyword
                  </label>
                  <input
                    type="text"
                    value={focusKeyword}
                    onChange={(e) => setFocusKeyword(e.target.value)}
                    placeholder="destination wedding cost in jaipur"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                    Canonical URL
                  </label>
                  <input
                    type="text"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    placeholder={`/blog/${slug}`}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500 font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {editorTab === "publishing" && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-3">
                  Publication Status
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setStatus("draft")}
                    className={`p-5 rounded-xl border text-left transition-all ${
                      status === "draft"
                        ? "bg-amber-500/10 border-amber-500 text-amber-400"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="font-bold text-base">Draft</div>
                    <div className="text-xs text-slate-500 mt-1">Hidden from public website</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus("published")}
                    className={`p-5 rounded-xl border text-left transition-all ${
                      status === "published"
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="font-bold text-base">Published</div>
                    <div className="text-xs text-slate-500 mt-1">Live on /blog</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus("archived")}
                    className={`p-5 rounded-xl border text-left transition-all ${
                      status === "archived"
                        ? "bg-purple-500/10 border-purple-500 text-purple-400"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="font-bold text-base">Archived</div>
                    <div className="text-xs text-slate-500 mt-1">Archived article</div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                    Call-to-Action (CTA) Text
                  </label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="Book Your Consultation With Stryper Events"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                    CTA Link URL
                  </label>
                  <input
                    type="text"
                    value={ctaUrl}
                    onChange={(e) => setCtaUrl(e.target.value)}
                    placeholder="/contact"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // DEFAULT BLOG LIST VIEW
  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-400" />
            Blog Management
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Manage articles, draft publications, and editorial content for STRYPER EVENTS.
          </p>
        </div>

        <button
          onClick={openNewEditor}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold shadow-lg shadow-amber-500/10 transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Add New Blog Article
        </button>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onClick={() => setStatusFilter("all")}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            statusFilter === "all"
              ? "bg-amber-500/10 border-amber-500/40 text-amber-400"
              : "bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700"
          }`}
        >
          <div className="text-xs font-semibold text-slate-400 uppercase">Total Articles</div>
          <div className="text-2xl font-bold mt-1 text-white">{totalCount}</div>
        </div>

        <div
          onClick={() => setStatusFilter("published")}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            statusFilter === "published"
              ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
              : "bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700"
          }`}
        >
          <div className="text-xs font-semibold text-slate-400 uppercase">Published</div>
          <div className="text-2xl font-bold mt-1 text-emerald-400">{publishedCount}</div>
        </div>

        <div
          onClick={() => setStatusFilter("draft")}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            statusFilter === "draft"
              ? "bg-amber-500/10 border-amber-500/40 text-amber-400"
              : "bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700"
          }`}
        >
          <div className="text-xs font-semibold text-slate-400 uppercase">Drafts</div>
          <div className="text-2xl font-bold mt-1 text-amber-400">{draftCount}</div>
        </div>

        <div
          onClick={() => setStatusFilter("archived")}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            statusFilter === "archived"
              ? "bg-purple-500/10 border-purple-500/40 text-purple-400"
              : "bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700"
          }`}
        >
          <div className="text-xs font-semibold text-slate-400 uppercase">Archived</div>
          <div className="text-2xl font-bold mt-1 text-purple-400">{archivedCount}</div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles by title, category, or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Drafts Only</option>
            <option value="published">Published Only</option>
            <option value="archived">Archived Only</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50"
          >
            <option value="all">All Categories</option>
            {DEFAULT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400">Loading blog articles...</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <FileText className="w-12 h-12 text-slate-600 mx-auto" />
            <p className="text-lg font-medium text-slate-300">No blog articles found</p>
            <p className="text-sm text-slate-500">
              Try adjusting search filters or click &quot;Add New Blog Article&quot; to write an article.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Article Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredBlogs.map((b, idx) => (
                  <tr key={b.id || b._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-amber-400 font-mono font-bold text-xs shrink-0 w-8">
                          #{String((b as any).order || idx + 1).padStart(2, "0")}
                        </span>
                        <img
                          src={b.coverImage || "/images/corporate-new.jpg"}
                          alt={b.title}
                          className="w-14 h-10 object-cover rounded-lg border border-slate-700 bg-slate-800 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-semibold text-white truncate max-w-xs sm:max-w-md">
                            {b.title}
                          </div>
                          <div className="text-xs text-amber-400/80 truncate max-w-xs font-mono">
                            /blog/{b.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300">
                        {b.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-300">{b.author}</td>

                    <td className="px-6 py-4">
                      {b.status === "published" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                          <CheckCircle className="w-3 h-3" /> Published
                        </span>
                      )}
                      {b.status === "draft" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400">
                          <AlertCircle className="w-3 h-3" /> Draft
                        </span>
                      )}
                      {b.status === "archived" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-400">
                          <Archive className="w-3 h-3" /> Archived
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-400">{b.date}</td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/blog/${b.slug}?admin=true`}
                          target="_blank"
                          rel="noreferrer"
                          title="Preview Article"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </a>

                        <button
                          onClick={() => openEditEditor(b)}
                          title="Edit Article"
                          className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {b.status !== "published" ? (
                          <button
                            onClick={() => handleStatusToggle(b, "published")}
                            title="Publish"
                            className="px-2 py-1 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                          >
                            Publish
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusToggle(b, "draft")}
                            title="Unpublish to Draft"
                            className="px-2 py-1 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30"
                          >
                            Unpublish
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(b)}
                          title="Delete Article"
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
