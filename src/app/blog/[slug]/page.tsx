import React from "react";
import Link from "next/link";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { db as prisma } from "@/lib/db";
import { User, Calendar, ArrowRight, FolderTree, Folder } from "lucide-react";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true },
  });

  if (!post || post.status !== "PUBLISHED") {
    return { title: "Article Not Found | Watnidea" };
  }

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt || "";
  // FIXED: Removed www from the fallback canonical URL
  const canonical = post.canonicalUrl || `https://watnidea.com/blog/${post.slug}`;
  const ogImg = post.ogImage || post.coverImage || undefined;

  return {
    title,
    description,
    keywords: post.focusKeyword ? [post.focusKeyword, ...(post.tags || [])] : post.tags,
    alternates: { canonical },
    robots: { index: post.robotsIndex, follow: post.robotsFollow },
    openGraph: {
      title: post.ogTitle || title,
      description: post.ogDescription || description,
      url: canonical,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: post.author?.name ? [post.author.name] : ["Watnidea"],
      images: ogImg ? [{ url: ogImg, width: 1200, height: 650, alt: post.coverImageAlt || title }] : undefined,
    },
    twitter: {
      card: (post.twitterCard as "summary_large_image" | "summary") || "summary_large_image",
      title: post.ogTitle || title,
      description: post.ogDescription || description,
      images: ogImg ? [ogImg] : undefined,
    },
  };
}

export default async function SingleBlogPostPage({ params }: Props) {
  const { slug } = await params;

  const redirectRule = await prisma.redirect
    .findFirst({
      where: { OR: [{ sourcePath: `/blog/${slug}` }, { sourcePath: `/${slug}` }] },
    })
    .catch(() => null);

  if (redirectRule) {
    if (redirectRule.permanent) permanentRedirect(redirectRule.targetPath);
    else redirect(redirectRule.targetPath);
  }

  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true },
  });

  if (!post || post.status !== "PUBLISHED") {
    await prisma.brokenLinkLog
      .upsert({
        where: { path: `/blog/${slug}` },
        update: { hits: { increment: 1 }, lastHitAt: new Date() },
        create: { path: `/blog/${slug}`, hits: 1 },
      })
      .catch(() => {});
    notFound();
  }

  await prisma.post
    .update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    })
    .catch(() => {});

  // Fetch recent blogs & categories for the sidebar
  const [recentPosts, allPublishedPosts] = await Promise.all([
    prisma.post.findMany({
      where: { status: "PUBLISHED", published: true, id: { not: post.id } },
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    prisma.post.findMany({
      where: { status: "PUBLISHED", published: true },
      select: { category: true },
    }),
  ]);

  const categoryCounts: Record<string, number> = {};
  allPublishedPosts.forEach((p) => {
    const cat = p.category || "General";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });
  const categories = Object.keys(categoryCounts);

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": post.schemaType || "BlogPosting",
    headline: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || "",
    image: post.coverImage ? [post.coverImage] : [],
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Person", name: post.author?.name || "Watnidea Team" },
    publisher: { "@type": "Organization", name: "Watnidea", url: "https://watnidea.com" },
    // FIXED: Removed www from the schema markup
    mainEntityOfPage: { "@type": "WebPage", "@id": post.canonicalUrl || `https://watnidea.com/blog/${post.slug}` },
  };

  return (
    <div className="bg-[#FFF7E9] text-[#111111] min-h-screen pt-28 pb-16 px-4 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="max-w-7xl mx-auto space-y-10">
        <nav className="text-xs text-[#5D5A54] flex items-center gap-2 font-medium tracking-wide">
          <Link href="/" className="hover:text-[#F13D32] transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#F13D32] transition-colors">BLOG</Link>
          <span>/</span>
          <span className="text-[#111111] truncate uppercase">{post.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ARTICLE CONTENT */}
          <article className="lg:col-span-8 bg-white rounded-3xl border border-[rgba(17,17,17,0.10)] p-6 md:p-12 shadow-sm space-y-8">
            {post.coverImage && (
              <figure className="overflow-hidden rounded-2xl border border-[rgba(17,17,17,0.08)] bg-[#FFF7E9]">
                <img
                  src={post.coverImage}
                  alt={post.coverImageAlt || post.title}
                  width={1200}
                  height={650}
                  className="w-full h-auto object-cover max-h-[480px]"
                />
              </figure>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-[#5D5A54] pb-4 border-b border-[rgba(17,17,17,0.08)]">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-[#F13D32]" />
                <span className="text-[#111111] font-semibold">{post.author?.name || "Watnidea Team"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#5D5A54]" />
                <span>{formattedDate}</span>
              </span>
            </div>

            <div className="space-y-4">
              {post.category && (
                <Link
                  href={`/blog?category=${encodeURIComponent(post.category)}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF7E9] text-[#F13D32] text-xs font-bold uppercase tracking-wider border border-[rgba(17,17,17,0.12)] hover:bg-[#F13D32] hover:text-white transition-colors"
                >
                  <Folder className="h-3.5 w-3.5" />
                  <span>{post.category}</span>
                </Link>
              )}
              <h1 className="text-3xl md:text-5xl font-editorial font-bold tracking-tight text-[#111111] leading-tight">
                {post.title}
              </h1>
            </div>

            {post.excerpt && (
              <p className="text-lg text-[#5D5A54] leading-relaxed font-serif italic border-l-2 border-[#F13D32] pl-4">
                {post.excerpt}
              </p>
            )}

            <div className="prose prose-lg max-w-none text-[#111111] leading-relaxed [&_h2]:font-editorial [&_h2]:text-[#111111] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-editorial [&_h3]:text-[#111111] [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-6 [&_a]:text-[#F13D32] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-[#d93228] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_li]:mb-2 [&_img]:w-full [&_img]:rounded-2xl [&_img]:my-6 [&_img]:border [&_img]:border-[rgba(17,17,17,0.10)] [&_table]:w-full [&_table]:mb-6 [&_th]:border-b-2 [&_th]:border-[rgba(17,17,17,0.15)] [&_th]:p-3 [&_th]:text-left [&_td]:border-b [&_td]:border-[rgba(17,17,17,0.08)] [&_td]:p-3">
              <ReactMarkdown>{post.content || ""}</ReactMarkdown>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-6 border-t border-[rgba(17,17,17,0.08)]">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#FFF7E9] border border-[rgba(17,17,17,0.10)] text-[#5D5A54]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* SIDEBAR: Recent Blogs, Categories & CTA */}
          <aside className="lg:col-span-4 space-y-8 sticky top-24">
            
            {/* Recent Blogs */}
            <div className="bg-white rounded-3xl border border-[rgba(17,17,17,0.10)] p-6 shadow-sm space-y-6">
              <h3 className="text-xl font-editorial font-bold text-[#111111] border-b border-[rgba(17,17,17,0.08)] pb-3">
                Recent Blogs
              </h3>

              {recentPosts.length === 0 ? (
                <p className="text-xs text-[#5D5A54]">No recent posts available.</p>
              ) : (
                <div className="space-y-4">
                  {recentPosts.map((rec) => {
                    const recDate = new Date(rec.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    });

                    return (
                      <Link
                        key={rec.id}
                        href={`/blog/${rec.slug}`}
                        className="group flex items-start gap-4 pb-4 border-b border-[rgba(17,17,17,0.05)] last:border-0 last:pb-0"
                      >
                        {rec.coverImage && (
                          <div className="w-20 h-16 shrink-0 rounded-xl overflow-hidden bg-[#FFF7E9]">
                            <img src={rec.coverImage} alt={rec.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                          </div>
                        )}
                        <div className="space-y-1 flex-1">
                          <h4 className="text-sm font-bold text-[#111111] group-hover:text-[#F13D32] transition-colors line-clamp-2 leading-snug">
                            {rec.title}
                          </h4>
                          <span className="text-[11px] text-[#5D5A54] block">{recDate}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Categories Widget */}
            <div className="bg-white rounded-3xl border border-[rgba(17,17,17,0.10)] p-6 shadow-sm space-y-5">
              <h3 className="text-xl font-editorial font-bold text-[#111111] border-b border-[rgba(17,17,17,0.08)] pb-3 flex items-center gap-2">
                <FolderTree className="h-5 w-5 text-[#F13D32]" /> Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-[#5D5A54] hover:bg-neutral-50 hover:text-[#111111] transition-colors"
                  >
                    <span>All Categories</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                      {allPublishedPosts.length}
                    </span>
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/blog?category=${encodeURIComponent(cat)}`}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-[#5D5A54] hover:bg-neutral-50 hover:text-[#111111] transition-colors"
                    >
                      <span>{cat}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                        {categoryCounts[cat]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Need Help? CTA Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#111111] to-[#222222] text-white p-8 shadow-xl relative overflow-hidden space-y-6 border border-[rgba(255,255,255,0.1)]">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#F13D32]/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-2 relative z-10">
                <h3 className="text-2xl font-editorial font-bold">Need Help?</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Get in touch with our experts for a free consultation on your brand and growth strategy.
                </p>
              </div>

              <Link
                href="/book-strategy-call"
                className="inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#F13D32] hover:bg-[#d93228] px-6 py-3 text-sm font-bold text-white transition-all shadow-md relative z-10"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}