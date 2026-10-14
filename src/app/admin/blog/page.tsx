"use client";

import React, { useState, useEffect, useMemo } from "react";

export default function SeoBlogAdminDashboard() {
  const [activeTab, setActiveTab] = useState<
    "posts" | "editor" | "redirects" | "404s" | "global" | "trash"
  >("posts");

  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [redirects, setRedirects] = useState<any[]>([]);
  const [brokenLinks, setBrokenLinks] = useState<any[]>([]);
  const [statusMsg, setStatusMsg] = useState("");
  const [serpDevice, setSerpDevice] = useState<"desktop" | "mobile">("desktop");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [coverImageAlt, setCoverImageAlt] = useState("");
  const [category, setCategory] = useState("Digital Strategy");
  const [tags, setTags] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [relatedPostIds, setRelatedPostIds] = useState<string[]>([]);
  const [postStatus, setPostStatus] = useState<"DRAFT" | "PUBLISHED" | "SCHEDULED">("PUBLISHED");
  const [scheduledAt, setScheduledAt] = useState("");
  const [authorName, setAuthorName] = useState("Watnidea Team");
  const [authorEmail, setAuthorEmail] = useState("admin@watnidea.com");

  const [focusKeyword, setFocusKeyword] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [robotsIndex, setRobotsIndex] = useState(true);
  const [robotsFollow, setRobotsFollow] = useState(true);
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [schemaType, setSchemaType] = useState("BlogPosting");
  const [revisions, setRevisions] = useState<any[]>([]);

  const [sourcePath, setSourcePath] = useState("");
  const [targetPath, setTargetPath] = useState("");
  const [isPermanent, setIsPermanent] = useState(true);

  const [globalSeo, setGlobalSeo] = useState({
    siteName: "Watnidea",
    defaultMetaTitle: "",
    defaultMetaDesc: "",
    defaultOgImage: "",
    customRobotsTxt:
      "User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://www.watnidea.com/sitemap.xml",
  });

  useEffect(() => {
    const savedPass = sessionStorage.getItem("watnidea_seo_pass");
    if (savedPass) setPassword(savedPass);

    const savedDraft = localStorage.getItem("watnidea_autosave_draft");
    if (savedDraft && !editingId) {
      try {
        const parsed = JSON.parse(savedDraft);
        if (parsed.title) setTitle(parsed.title);
        if (parsed.content) setContent(parsed.content);
      } catch {}
    }

    fetchAllData();
  }, []);

  useEffect(() => {
    if (title || content) {
      localStorage.setItem(
        "watnidea_autosave_draft",
        JSON.stringify({ title, content, updatedAt: new Date().toISOString() })
      );
    }
  }, [title, content]);

  const fetchAllData = async () => {
    try {
      const [postsRes, redRes, errRes, globRes] = await Promise.all([
        fetch("/api/posts?all=true"),
        fetch("/api/seo-tools?type=redirects"),
        fetch("/api/seo-tools?type=404s"),
        fetch("/api/seo-tools?type=global"),
      ]);
      if (postsRes.ok) setPosts(await postsRes.json());
      if (redRes.ok) setRedirects(await redRes.json());
      if (errRes.ok) setBrokenLinks(await errRes.json());
      if (globRes.ok) {
        const g = await globRes.json();
        if (g) setGlobalSeo((prev) => ({ ...prev, ...g }));
      }
    } catch (e) {
      console.error("Failed loading dashboard data", e);
    }
  };

  const seoAnalysis = useMemo(() => {
    const checks: { label: string; passed: boolean; points: number; tip: string }[] = [];
    const kw = focusKeyword.trim().toLowerCase();
    const effectiveMetaTitle = (metaTitle || title).trim();
    const effectiveMetaDesc = (metaDescription || excerpt).trim();
    const wordCount = content
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    checks.push({
      label: "Focus Keyword is set",
      passed: kw.length > 2,
      points: 15,
      tip: "Add a target Focus Keyword to analyze on-page SEO.",
    });

    checks.push({
      label: "Focus Keyword in Meta Title",
      passed: kw.length > 2 && effectiveMetaTitle.toLowerCase().includes(kw),
      points: 15,
      tip: "Include your exact Focus Keyword near the beginning of the Meta Title.",
    });

    checks.push({
      label: "Focus Keyword in URL Slug",
      passed: kw.length > 2 && slug.toLowerCase().includes(kw.replace(/\s+/g, "-")),
      points: 10,
      tip: "Ensure the URL slug contains the Focus Keyword.",
    });

    checks.push({
      label: "Focus Keyword in Meta Description",
      passed: kw.length > 2 && effectiveMetaDesc.toLowerCase().includes(kw),
      points: 10,
      tip: "Include the Focus Keyword naturally inside the Meta Description.",
    });

    checks.push({
      label: "Focus Keyword appears in Content",
      passed: kw.length > 2 && content.toLowerCase().includes(kw),
      points: 15,
      tip: "Use the Focus Keyword in the first paragraph and subheadings (H2/H3).",
    });

    checks.push({
      label: `Meta Title length (${effectiveMetaTitle.length}/60 chars)`,
      passed: effectiveMetaTitle.length >= 30 && effectiveMetaTitle.length <= 60,
      points: 10,
      tip: "Keep Meta Title between 30 and 60 characters so Google doesn't truncate it.",
    });

    checks.push({
      label: `Meta Description length (${effectiveMetaDesc.length}/160 chars)`,
      passed: effectiveMetaDesc.length >= 110 && effectiveMetaDesc.length <= 160,
      points: 10,
      tip: "Write a compelling Meta Description between 110 and 160 characters.",
    });

    checks.push({
      label: "Featured Image & Alt Text (1200x650 WebP)",
      passed: Boolean(coverImage && coverImageAlt.trim().length > 3),
      points: 10,
      tip: "Upload a 1200x650 WebP image and provide descriptive Alt Text.",
    });

    checks.push({
      label: `Article Word Count (${wordCount} words)`,
      passed: wordCount >= 300,
      points: 5,
      tip: "Aim for at least 300-800 words for strong organic ranking.",
    });

    const score = checks.reduce((sum: number, c) => (c.passed ? sum + c.points : sum), 0);
    return { score, checks, wordCount, effectiveMetaTitle, effectiveMetaDesc };
  }, [focusKeyword, metaTitle, title, metaDescription, excerpt, slug, content, coverImage, coverImageAlt]);

  const insertMarkdown = (syntax: string) => {
    setContent((prev) => `${prev}\n${syntax}\n`);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!password) {
      alert("Please enter your Admin/SEO Editor password at the top right first.");
      return;
    }

    setStatusMsg("Compressing to 1200x650 WebP...");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);

    const res = await fetch("/api/upload-image", { method: "POST", body: formData });
    const data = await res.json();
    if (!res.ok) {
      setStatusMsg(`Upload error: ${data.error}`);
      return;
    }
    setCoverImage(data.url);
    if (!ogImage) setOgImage(data.url);
    setStatusMsg(`Converted to 1200x650 WebP (${data.sizeKb} KB)!`);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setCoverImage("");
    setCoverImageAlt("");
    setCategory("Digital Strategy");
    setTags("");
    setIsFeatured(false);
    setRelatedPostIds([]);
    setPostStatus("PUBLISHED");
    setScheduledAt("");
    setFocusKeyword("");
    setMetaTitle("");
    setMetaDescription("");
    setCanonicalUrl("");
    setRobotsIndex(true);
    setRobotsFollow(true);
    setOgTitle("");
    setOgDescription("");
    setOgImage("");
    setSchemaType("BlogPosting");
    setRevisions([]);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      alert("Enter your Admin or SEO Editor Password in the top bar first!");
      return;
    }
    sessionStorage.setItem("watnidea_seo_pass", password);
    setStatusMsg("Saving post & revision history...");

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingId,
        password,
        title,
        slug,
        excerpt,
        content,
        coverImage,
        coverImageAlt,
        category,
        tags,
        isFeatured,
        relatedPostIds,
        status: postStatus,
        scheduledAt: postStatus === "SCHEDULED" ? scheduledAt : null,
        focusKeyword,
        metaTitle,
        metaDescription,
        canonicalUrl,
        robotsIndex,
        robotsFollow,
        ogTitle,
        ogDescription,
        ogImage,
        twitterCard,
        schemaType,
        authorName,
        authorEmail,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setStatusMsg(`Error: ${data.error}`);
      return;
    }

    localStorage.removeItem("watnidea_autosave_draft");
    setStatusMsg(editingId ? "Post & Revision saved!" : "New Blog Post created!");
    resetForm();
    fetchAllData();
    setActiveTab("posts");
  };

  const handleEditPost = (p: any) => {
    setEditingId(p.id);
    setTitle(p.title || "");
    setSlug(p.slug || "");
    setExcerpt(p.excerpt || "");
    setContent(p.content || "");
    setCoverImage(p.coverImage || "");
    setCoverImageAlt(p.coverImageAlt || "");
    setCategory(p.category || "Digital Strategy");
    setTags(Array.isArray(p.tags) ? p.tags.join(", ") : "");
    setIsFeatured(Boolean(p.isFeatured));
    setRelatedPostIds(Array.isArray(p.relatedPostIds) ? p.relatedPostIds : []);
    setPostStatus(p.status === "TRASH" ? "DRAFT" : p.status || "DRAFT");
    setScheduledAt(p.scheduledAt ? new Date(p.scheduledAt).toISOString().slice(0, 16) : "");
    setFocusKeyword(p.focusKeyword || "");
    setMetaTitle(p.metaTitle || "");
    setMetaDescription(p.metaDescription || "");
    setCanonicalUrl(p.canonicalUrl || "");
    setRobotsIndex(p.robotsIndex !== false);
    setRobotsFollow(p.robotsFollow !== false);
    setOgTitle(p.ogTitle || "");
    setOgDescription(p.ogDescription || "");
    setOgImage(p.ogImage || "");
    setTwitterCard(p.twitterCard || "summary_large_image");
    setSchemaType(p.schemaType || "BlogPosting");
    setRevisions(Array.isArray(p.revisions) ? p.revisions : []);
    setActiveTab("editor");
  };

  const handleStatusChange = async (id: string, status: string) => {
    if (!password) return alert("Enter your password in the top right first.");
    const res = await fetch("/api/posts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, password }),
    });
    if (res.ok) fetchAllData();
    else alert("Unauthorized: Check password.");
  };

  const handlePermanentDelete = async (id: string) => {
    if (!confirm("Permanently delete this post from database? This cannot be undone.")) return;
    const res = await fetch("/api/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password }),
    });
    const data = await res.json();
    if (res.ok) fetchAllData();
    else alert(data.error || "Delete failed");
  };

  const handleAddRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/seo-tools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "add_redirect",
        password,
        sourcePath,
        targetPath,
        permanent: isPermanent,
      }),
    });
    if (res.ok) {
      setSourcePath("");
      setTargetPath("");
      fetchAllData();
    } else alert("Check password");
  };

  const handleDownloadBackup = async () => {
    const res = await fetch("/api/seo-tools?type=backup");
    const data = await res.json();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `watnidea-seo-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const activePosts = posts.filter((p: any) => p.status !== "TRASH");
  const publishedCount = posts.filter((p: any) => p.status === "PUBLISHED").length;
  const draftCount = posts.filter((p: any) => p.status === "DRAFT").length;
  const scheduledCount = posts.filter((p: any) => p.status === "SCHEDULED").length;
  const trashPosts = posts.filter((p: any) => p.status === "TRASH");
  const totalViews = posts.reduce((acc: number, p: any) => acc + (p.views || 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Watnidea Enterprise SEO & Blog CMS
            </h1>
            <p className="text-sm text-slate-400">
              Complete On-Page SEO, WebP Image Pipeline, Schema Markup, 301 Redirects & Analytics
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                sessionStorage.setItem("watnidea_seo_pass", e.target.value);
              }}
              placeholder="Admin / SEO Editor Password"
              className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleDownloadBackup}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium border border-slate-700"
            >
              JSON Backup
            </button>
            <button
              type="button"
              onClick={() => {
                resetForm();
                setActiveTab("editor");
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white"
            >
              + New Blog Post
            </button>
          </div>
        </div>

        {statusMsg && (
          <div className="p-3 rounded-lg bg-blue-950/70 border border-blue-700 text-blue-200 text-sm flex justify-between">
            <span>{statusMsg}</span>
            <button type="button" onClick={() => setStatusMsg("")} className="text-xs underline">
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <p className="text-xs text-slate-400">Total Blogs</p>
            <p className="text-2xl font-bold mt-1">{activePosts.length}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <p className="text-xs text-emerald-400">Published</p>
            <p className="text-2xl font-bold mt-1 text-emerald-400">{publishedCount}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <p className="text-xs text-amber-400">Drafts</p>
            <p className="text-2xl font-bold mt-1 text-amber-400">{draftCount}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <p className="text-xs text-purple-400">Scheduled</p>
            <p className="text-2xl font-bold mt-1 text-purple-400">{scheduledCount}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <p className="text-xs text-cyan-400">Total Views</p>
            <p className="text-2xl font-bold mt-1 text-cyan-400">{totalViews}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <p className="text-xs text-rose-400">In Trash</p>
            <p className="text-2xl font-bold mt-1 text-rose-400">{trashPosts.length}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: "posts", label: `All Blogs (${activePosts.length})` },
            { id: "editor", label: editingId ? "Edit Blog & SEO" : "+ Blog Editor & SEO Grader" },
            { id: "redirects", label: `301 Redirects (${redirects.length})` },
            { id: "404s", label: `404 Monitor (${brokenLinks.length})` },
            { id: "global", label: "Global SEO & Robots.txt" },
            { id: "trash", label: `Trash (${trashPosts.length})` },
          ].map((t) => (
            <button
              type="button"
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === t.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "posts" && (
          <div className="space-y-3">
            {activePosts.length === 0 ? (
              <div className="p-12 text-center bg-slate-900 rounded-xl border border-slate-800 text-slate-400">
                No blog posts yet. Click <strong>+ New Blog Post</strong> to publish your first article!
              </div>
            ) : (
              activePosts.map((post: any) => (
                <div
                  key={post.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                          post.status === "PUBLISHED"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-700"
                            : post.status === "SCHEDULED"
                            ? "bg-purple-950 text-purple-300 border border-purple-700"
                            : "bg-amber-950 text-amber-300 border border-amber-700"
                        }`}
                      >
                        {post.status}
                      </span>
                      {post.isFeatured && (
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-950 text-blue-300">
                          Featured
                        </span>
                      )}
                      <span className="text-xs text-slate-400">{post.category}</span>
                      <span className="text-xs text-cyan-400">{post.views || 0} views</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                    <p className="text-xs text-slate-400">
                      URL: <code className="text-slate-300">/blog/{post.slug}</code> · Focus Keyword:{" "}
                      <strong className="text-slate-200">{post.focusKeyword || "Not set"}</strong> ·{" "}
                      {post.robotsIndex ? "Index" : "Noindex"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditPost(post)}
                      className="px-3 py-1.5 rounded bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs hover:bg-blue-600/30"
                    >
                      Edit & SEO
                    </button>
                    {post.status === "PUBLISHED" ? (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(post.id, "DRAFT")}
                        className="px-3 py-1.5 rounded bg-slate-800 text-amber-300 text-xs hover:bg-slate-700"
                      >
                        Unpublish
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(post.id, "PUBLISHED")}
                        className="px-3 py-1.5 rounded bg-emerald-900/40 border border-emerald-700 text-emerald-300 text-xs"
                      >
                        Publish Now
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleStatusChange(post.id, "TRASH")}
                      className="px-3 py-1.5 rounded bg-rose-950/60 border border-rose-800 text-rose-300 text-xs hover:bg-rose-900"
                    >
                      Move to Trash
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "editor" && (
          <form onSubmit={handleSavePost} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                <h2 className="text-lg font-bold text-white">1. Article Content & Formatting</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Blog Title (H1) *</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        if (!editingId) {
                          setSlug(
                            e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "-")
                              .replace(/(^-|-$)+/g, "")
                          );
                        }
                      }}
                      placeholder="e.g. Complete B2B Growth Strategy for 2026"
                      className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Custom URL Slug *</label>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="complete-b2b-growth-strategy-2026"
                      className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {[
                    { label: "H2", code: "## Heading 2" },
                    { label: "H3", code: "### Heading 3" },
                    { label: "H4", code: "#### Heading 4" },
                    { label: "Bold", code: "**Bold text**" },
                    { label: "Internal Link", code: "[Anchor Text](/blog/related-slug)" },
                    { label: "External Link", code: "[Source](https://example.com)" },
                    { label: "Bullet List", code: "- List item 1\n- List item 2" },
                    {
                      label: "Insert Table",
                      code: "| Column 1 | Column 2 |\n| --- | --- |\n| Data 1 | Data 2 |",
                    },
                  ].map((btn) => (
                    <button
                      type="button"
                      key={btn.label}
                      onClick={() => insertMarkdown(btn.code)}
                      className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 border border-slate-700"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Article Body (Markdown & HTML supported) *
                  </label>
                  <textarea
                    rows={16}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your article here using ## H2, ### H3, tables, internal links..."
                    className="w-full p-3 rounded bg-slate-950 border border-slate-700 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Short Excerpt / Summary</label>
                  <textarea
                    rows={2}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-sm"
                  />
                </div>
              </div>

              <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                <h2 className="text-lg font-bold text-white">
                  2. Featured Image (Auto 1200 x 650 px WebP Compression)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Upload Image File (Auto-converts to 1200x650 WebP)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded file:border-0 file:bg-blue-600 file:text-white"
                    />
                    <input
                      type="text"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="Or paste image URL / WebP Data URI"
                      className="w-full mt-2 p-2 rounded bg-slate-950 border border-slate-700 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Image Alt Text (Required for Image SEO) *
                    </label>
                    <input
                      type="text"
                      value={coverImageAlt}
                      onChange={(e) => setCoverImageAlt(e.target.value)}
                      placeholder="Describe the image including focus keyword..."
                      className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-sm"
                    />
                  </div>
                </div>
                {coverImage && (
                  <img
                    src={coverImage}
                    alt={coverImageAlt || "Preview"}
                    className="w-full max-h-56 object-cover rounded-lg border border-slate-700"
                  />
                )}
              </div>

              <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                <h2 className="text-lg font-bold text-white">
                  3. On-Page SEO, Canonical, Robots & Social Metadata
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Focus Keyword *</label>
                    <input
                      type="text"
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                      placeholder="e.g. b2b growth strategy"
                      className="w-full p-2.5 rounded bg-slate-950 border border-blue-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Schema Markup Type</label>
                    <select
                      value={schemaType}
                      onChange={(e) => setSchemaType(e.target.value)}
                      className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-sm"
                    >
                      <option value="BlogPosting">BlogPosting (+ BreadcrumbList)</option>
                      <option value="Article">Article (+ BreadcrumbList)</option>
                      <option value="NewsArticle">NewsArticle (+ BreadcrumbList)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    SEO Meta Title ({(metaTitle || title).length}/60 chars)
                  </label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder={title || "Custom Meta Title"}
                    className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    SEO Meta Description ({(metaDescription || excerpt).length}/160 chars)
                  </label>
                  <textarea
                    rows={2}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder={excerpt || "Custom Meta Description for Google search results..."}
                    className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Canonical URL (Optional)</label>
                    <input
                      type="url"
                      value={canonicalUrl}
                      onChange={(e) => setCanonicalUrl(e.target.value)}
                      placeholder={`https://www.watnidea.com/blog/${slug}`}
                      className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-4 pt-5">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={robotsIndex}
                        onChange={(e) => setRobotsIndex(e.target.checked)}
                      />
                      <span>Robots: Index</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={robotsFollow}
                        onChange={(e) => setRobotsFollow(e.target.checked)}
                      />
                      <span>Robots: Follow</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-800">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Open Graph / Social Title</label>
                    <input
                      type="text"
                      value={ogTitle}
                      onChange={(e) => setOgTitle(e.target.value)}
                      placeholder={metaTitle || title}
                      className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Twitter/X Card Type</label>
                    <select
                      value={twitterCard}
                      onChange={(e) => setTwitterCard(e.target.value)}
                      className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-xs"
                    >
                      <option value="summary_large_image">Summary Large Image</option>
                      <option value="summary">Summary Card</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="font-bold text-white">Publishing & Author</h3>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Status</label>
                  <select
                    value={postStatus}
                    onChange={(e) => setPostStatus(e.target.value as any)}
                    className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-sm"
                  >
                    <option value="PUBLISHED">Published (Live)</option>
                    <option value="DRAFT">Draft (Hidden)</option>
                    <option value="SCHEDULED">Scheduled (Future Date/Time)</option>
                  </select>
                </div>

                {postStatus === "SCHEDULED" && (
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Publish Date & Time</label>
                    <input
                      type="datetime-local"
                      value={scheduledAt}
                      onChange={(e) => setScheduledAt(e.target.value)}
                      className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-xs"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Category</label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="SEO, Branding, Web"
                      className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Author Name</label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Author Email</label>
                    <input
                      type="email"
                      value={authorEmail}
                      onChange={(e) => setAuthorEmail(e.target.value)}
                      className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-xs"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                  />
                  <span>Mark as Featured Blog Post</span>
                </label>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm"
                >
                  {editingId ? "Save Changes & Revision" : "Publish / Save Blog Post"}
                </button>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white">SEO Score & Analysis</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      seoAnalysis.score >= 80
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-600"
                        : seoAnalysis.score >= 50
                        ? "bg-amber-950 text-amber-300 border border-amber-600"
                        : "bg-rose-950 text-rose-300 border border-rose-600"
                    }`}
                  >
                    {seoAnalysis.score} / 100
                  </span>
                </div>

                <div className="space-y-2">
                  {seoAnalysis.checks.map((c, idx) => (
                    <div key={idx} className="text-xs flex items-start gap-2">
                      <span className={c.passed ? "text-emerald-400" : "text-rose-400"}>
                        {c.passed ? "PASS" : "TODO"}
                      </span>
                      <div>
                        <p className={c.passed ? "text-slate-200" : "text-slate-400 font-medium"}>
                          {c.label}
                        </p>
                        {!c.passed && <p className="text-[11px] text-slate-500">{c.tip}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">Google Search Preview</h3>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setSerpDevice("desktop")}
                      className={`px-2 py-1 text-xs rounded ${
                        serpDevice === "desktop" ? "bg-blue-600 text-white" : "bg-slate-800"
                      }`}
                    >
                      Desktop
                    </button>
                    <button
                      type="button"
                      onClick={() => setSerpDevice("mobile")}
                      className={`px-2 py-1 text-xs rounded ${
                        serpDevice === "mobile" ? "bg-blue-600 text-white" : "bg-slate-800"
                      }`}
                    >
                      Mobile
                    </button>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-lg bg-white text-slate-900 ${
                    serpDevice === "mobile" ? "max-w-[340px] mx-auto" : "w-full"
                  }`}
                >
                  <p className="text-xs text-slate-600 truncate">
                    https://www.watnidea.com &gt; blog &gt; {slug || "post-slug"}
                  </p>
                  <p className="text-base font-medium text-[#1a0dab] hover:underline truncate mt-0.5">
                    {seoAnalysis.effectiveMetaTitle || "Your Blog Title Appears Here"}
                  </p>
                  <p className="text-xs text-[#4d5156] line-clamp-2 mt-1">
                    {seoAnalysis.effectiveMetaDesc ||
                      "Your meta description will appear here in Google search results..."}
                  </p>
                </div>
              </div>

              {revisions.length > 0 && (
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h3 className="font-bold text-white text-sm">
                    Revision History ({revisions.length})
                  </h3>
                  <div className="max-h-40 overflow-y-auto space-y-1.5">
                    {revisions.map((rev: any, i: number) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-xs p-2 rounded bg-slate-950 border border-slate-800"
                      >
                        <span className="text-slate-400">
                          {new Date(rev.savedAt).toLocaleString()}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (rev.title) setTitle(rev.title);
                            if (rev.content) setContent(rev.content);
                            if (rev.metaTitle) setMetaTitle(rev.metaTitle);
                            if (rev.metaDescription) setMetaDescription(rev.metaDescription);
                          }}
                          className="text-blue-400 hover:underline"
                        >
                          Restore
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </form>
        )}

        {activeTab === "redirects" && (
          <div className="space-y-6">
            <form
              onSubmit={handleAddRedirect}
              className="p-6 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
            >
              <div>
                <label className="block text-xs text-slate-400 mb-1">Old Source URL Path</label>
                <input
                  type="text"
                  required
                  value={sourcePath}
                  onChange={(e) => setSourcePath(e.target.value)}
                  placeholder="/old-blog-url"
                  className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">New Target URL Path</label>
                <input
                  type="text"
                  required
                  value={targetPath}
                  onChange={(e) => setTargetPath(e.target.value)}
                  placeholder="/blog/new-blog-url"
                  className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Redirect Type</label>
                <select
                  value={isPermanent ? "301" : "302"}
                  onChange={(e) => setIsPermanent(e.target.value === "301")}
                  className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-sm"
                >
                  <option value="301">301 Permanent Redirect</option>
                  <option value="302">302 Temporary Redirect</option>
                </select>
              </div>
              <button
                type="submit"
                className="py-2.5 px-4 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm"
              >
                + Add Redirect
              </button>
            </form>

            <div className="space-y-2">
              {redirects.map((r: any) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm"
                >
                  <div>
                    <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 text-xs mr-3">
                      {r.permanent ? "301" : "302"}
                    </span>
                    <code>{r.sourcePath}</code> <span className="text-slate-500 mx-2">-&gt;</span>{" "}
                    <code className="text-emerald-400">{r.targetPath}</code>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      await fetch("/api/seo-tools", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ action: "delete_redirect", id: r.id, password }),
                      });
                      fetchAllData();
                    }}
                    className="text-xs text-rose-400 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "404s" && (
          <div className="space-y-3">
            {brokenLinks.length === 0 ? (
              <div className="p-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-center">
                No 404 errors logged yet.
              </div>
            ) : (
              brokenLinks.map((log: any) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm"
                >
                  <div>
                    <code className="text-rose-400 font-semibold">{log.path}</code>
                    <span className="text-xs text-slate-400 ml-3">
                      Hits: {log.hits} · Last hit: {new Date(log.lastHitAt).toLocaleString()}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSourcePath(log.path);
                      setActiveTab("redirects");
                    }}
                    className="text-xs px-3 py-1 rounded bg-blue-600 text-white"
                  >
                    Create 301 Redirect
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "global" && (
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4 max-w-3xl">
            <h2 className="text-lg font-bold text-white">Global Default Metadata & Robots.txt</h2>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Default Site Meta Title</label>
              <input
                type="text"
                value={globalSeo.defaultMetaTitle || ""}
                onChange={(e) => setGlobalSeo({ ...globalSeo, defaultMetaTitle: e.target.value })}
                className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Default Site Meta Description
              </label>
              <textarea
                rows={2}
                value={globalSeo.defaultMetaDesc || ""}
                onChange={(e) => setGlobalSeo({ ...globalSeo, defaultMetaDesc: e.target.value })}
                className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Custom Robots.txt Rules</label>
              <textarea
                rows={5}
                value={globalSeo.customRobotsTxt || ""}
                onChange={(e) => setGlobalSeo({ ...globalSeo, customRobotsTxt: e.target.value })}
                className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 font-mono text-xs"
              />
            </div>
            <button
              type="button"
              onClick={async () => {
                const res = await fetch("/api/seo-tools", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ action: "save_global", password, ...globalSeo }),
                });
                if (res.ok) setStatusMsg("Global SEO settings saved!");
                else alert("Check password");
              }}
              className="px-5 py-2.5 rounded bg-blue-600 text-white text-sm font-semibold"
            >
              Save Global SEO Settings
            </button>
          </div>
        )}

        {activeTab === "trash" && (
          <div className="space-y-3">
            {trashPosts.length === 0 ? (
              <div className="p-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-center">
                Trash is empty.
              </div>
            ) : (
              trashPosts.map((post: any) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800"
                >
                  <div>
                    <h4 className="font-semibold text-white">{post.title}</h4>
                    <p className="text-xs text-slate-400">/blog/{post.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(post.id, "DRAFT")}
                      className="px-3 py-1.5 rounded bg-emerald-900/50 border border-emerald-700 text-emerald-300 text-xs"
                    >
                      Restore to Drafts
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePermanentDelete(post.id)}
                      className="px-3 py-1.5 rounded bg-rose-600 text-white text-xs"
                    >
                      Delete Permanently (Super Admin)
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}