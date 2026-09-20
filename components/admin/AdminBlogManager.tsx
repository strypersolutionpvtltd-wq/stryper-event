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
        fetchAllBlogs();
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
        toast.success(newStatus === "published" ? "Blog published live!" : "Blog unpublished (moved to Draft)");
        fetchBlogs();
        fetchAllBlogs();
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
        fetchAllBlogs();
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
              className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              {isSubmitting ? "Saving..." : status === "published" ? "Unpublish to Draft" : "Save as Draft"}
            </button>

            <button
              type="button"
              disabled={isSubmitting || isUploadingImage}
              onClick={() => handleSave("published")}
              className="px-5 py-2 rounded-xl bg-accent-yellow text-primary-black text-xs font-black uppercase tracking-wider hover:bg-accent-yellow/90 transition-all shadow-md active:scale-95 flex items-center gap-1.5"
            >
              {isSubmitting ? "Publishing..." : "Publish Live"}
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
    <div className="space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Title + Quick Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent-yellow" />
            Blog Articles
            <span className="text-xs bg-white/10 text-accent-yellow px-2 py-0.5 rounded-full font-mono">
              {totalCount}
            </span>
          </h3>

          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-xl">
            {[
              { id: "all", label: "All", count: totalCount },
              { id: "published", label: "Published", count: publishedCount },
              { id: "draft", label: "Drafts", count: draftCount },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  statusFilter === tab.id
                    ? "bg-accent-yellow text-primary-black shadow-sm"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    statusFilter === tab.id ? "bg-black/20 text-black font-black" : "bg-white/10 text-white/70"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Search + Category + Add Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search title, author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-accent-yellow transition-all"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#111] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-yellow transition-all"
          >
            <option value="all">All Categories</option>
            {DEFAULT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            onClick={openNewEditor}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-yellow text-primary-black text-xs font-black uppercase tracking-wider hover:bg-accent-yellow/90 transition-all shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add Article
          </button>
        </div>
      </div>

      {/* Blogs List */}
      <div className="space-y-2.5">
        {isLoading ? (
          <div className="py-16 text-center text-white/40">
            <div className="w-8 h-8 rounded-full border border-white/10 border-t-accent-yellow animate-spin mx-auto mb-4" />
            Loading blog articles...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-16 border border-white/5 rounded-2xl bg-white/5 text-white/40 space-y-2">
            <FileText className="w-10 h-10 text-white/20 mx-auto" />
            <p className="text-sm font-semibold text-white/70">No blog articles found</p>
            <p className="text-xs text-white/40">Try adjusting search filters or click &quot;Add Article&quot;.</p>
          </div>
        ) : (
          filteredBlogs.map((b, idx) => (
            <div
              key={b.id || b._id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 bg-white/5 border border-white/10 hover:border-accent-yellow/40 rounded-2xl transition-all hover:bg-white/[0.07]"
            >
              {/* Left: Index + Image + Title + Slug */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="text-accent-yellow font-mono font-bold text-xs shrink-0 w-7 text-center">
                  #{String((b as any).order || idx + 1).padStart(2, "0")}
                </span>
                <img
                  src={b.coverImage || "/images/corporate-new.jpg"}
                  alt={b.title}
                  className="w-14 h-11 object-cover rounded-lg border border-white/10 bg-black/40 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-white text-sm truncate" title={b.title}>
                    {b.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-white/50">
                    <span className="text-accent-yellow/80 font-mono truncate max-w-[200px] sm:max-w-xs">
                      /blog/{b.slug}
                    </span>
                    <span className="w-1 h-1 bg-white/20 rounded-full shrink-0" />
                    <span className="shrink-0 text-white/40">{b.date}</span>
                  </div>
                </div>
              </div>

              {/* Middle: Category + Author + Status */}
              <div className="flex items-center gap-2.5 shrink-0 flex-wrap md:flex-nowrap">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/5 border border-white/10 text-white/80 shrink-0">
                  {b.category}
                </span>

                <span className="text-[11px] text-white/50 truncate max-w-[110px] hidden lg:inline">
                  {b.author}
                </span>

                {b.status === "published" ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                    <CheckCircle className="w-3 h-3" /> Published
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                    <AlertCircle className="w-3 h-3" /> Draft
                  </span>
                )}
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <a
                  href={`/blog/${b.slug}?admin=true`}
                  target="_blank"
                  rel="noreferrer"
                  title="Preview Article"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => openEditEditor(b)}
                  title="Edit Article"
                  className="w-8 h-8 rounded-lg bg-accent-yellow/10 hover:bg-accent-yellow/20 border border-accent-yellow/30 text-accent-yellow flex items-center justify-center transition-all"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>

                {b.status !== "published" ? (
                  <button
                    onClick={() => handleStatusToggle(b, "published")}
                    title="Publish article live"
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all flex items-center gap-1 active:scale-95"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Publish
                  </button>
                ) : (
                  <button
                    onClick={() => handleStatusToggle(b, "draft")}
                    title="Unpublish article (move to draft)"
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition-all flex items-center gap-1 active:scale-95"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    Unpublish
                  </button>
                )}

                <button
                  onClick={() => handleDelete(b)}
                  title="Delete Article"
                  className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 flex items-center justify-center transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
