import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { db as prisma } from "@/lib/db";
import { User, Calendar, FolderTree, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const globalSeo = await prisma.globalSeoConfig.findUnique({ where: { id: "default" } }).catch(() => null);

  return {
    title: globalSeo?.defaultMetaTitle || "Insights & Blog | Watnidea",
    description:
      globalSeo?.defaultMetaDesc ||
      "Explore the latest digital strategy, web engineering, branding, and SEO insights from Watnidea.",
    alternates: {
      canonical: "https://www.watnidea.com/blog",
    },
    openGraph: {
      title: globalSeo?.defaultMetaTitle || "Insights & Blog | Watnidea",
      description:
        globalSeo?.defaultMetaDesc ||
        "Explore the latest digital strategy, web engineering, branding, and SEO insights from Watnidea.",
      url: "https://www.watnidea.com/blog",
      type: "website",
    },
  };
}

export default async function BlogIndexPage({ searchParams }: Props) {
  const { category } = await searchParams;

  await prisma.post
    .updateMany({
      where: { status: "SCHEDULED", scheduledAt: { lte: new Date() } },
      data: { status: "PUBLISHED", published: true },
    })
    .catch(() => {});

  const allPublishedPosts = await prisma.post.findMany({
    where: { status: "PUBLISHED", published: true },
    select: { category: true },
  });

  const categoryCounts: Record<string, number> = {};
  allPublishedPosts.forEach((p) => {
    const cat = p.category || "General";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });
  const categories = Object.keys(categoryCounts);

  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      published: true,
      ...(category ? { category } : {}),
    },
    include: { author: true },
    orderBy: [{ createdAt: "desc" }],
  });

  return (
    <main className="pt-28 pb-20 px-4 md:px-8 w-full bg-[#FFF7E9] text-[#111111]">
      <div className="max-w-[1400px] mx-auto space-y-16">
        <div className="space-y-5 text-center max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#F13D32] border border-[#F13D32]/20 bg-[#F13D32]/5">
            Watnidea Insights
          </span>
          <h1 className="text-4xl md:text-6xl font-editorial font-bold tracking-tight text-[#111111]">
            Ideas, Strategy & Digital Growth
          </h1>
          <p className="text-[#5D5A54] text-lg md:text-xl">
            Deep dives into branding, high-converting web architecture, and search engine dominance.
          </p>
        </div>

        {/* PERFECT 2-COLUMN LAYOUT: 3-Column Cards on Left (9 cols) + Sidebar on Right (3 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: 3-Column Blog Cards Grid */}
          <div className="lg:col-span-9 space-y-6">
            {category && (
              <div className="flex items-center justify-between bg-white px-6 py-3 rounded-2xl border border-[rgba(17,17,17,0.10)] shadow-sm">
                <span className="text-sm font-medium text-[#5D5A54]">
                  Filtering by category: <strong className="text-[#111111]">{category}</strong>
                </span>
                <Link href="/blog" className="text-xs font-bold text-[#F13D32] hover:underline">
                  Clear Filter ✕
                </Link>
              </div>
            )}

            {posts.length === 0 ? (
              <div className="p-12 rounded-3xl border border-[rgba(17,17,17,0.10)] bg-white text-center space-y-5 shadow-sm">
                <p className="text-[#5D5A54] text-lg">No articles found in this category.</p>
                <Link
                  href="/blog"
                  className="inline-block px-6 py-3 rounded-full bg-[#F13D32] text-white text-sm font-semibold shadow-md"
                >
                  View All Articles →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => {
                  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col rounded-2xl border border-[rgba(17,17,17,0.10)] bg-white overflow-hidden hover:border-[#F13D32]/50 transition-all shadow-sm hover:shadow-md"
                    >
                      {post.coverImage ? (
                        <div className="overflow-hidden h-48 bg-[#FFF7E9] relative">
                          <img
                            src={post.coverImage}
                            alt={post.coverImageAlt || post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                          />
                          <span className="absolute top-3 left-3 bg-[#111111]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                            {post.category || "General"}
                          </span>
                        </div>
                      ) : (
                        <div className="h-48 bg-neutral-900 flex flex-col justify-between p-4 text-white">
                          <span className="bg-[#F13D32] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full w-max">
                            {post.category || "General"}
                          </span>
                          <span className="font-editorial text-base font-bold line-clamp-2">{post.title}</span>
                        </div>
                      )}

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between text-xs text-[#5D5A54] font-medium">
                            <span className="flex items-center gap-1.5 truncate max-w-[55%]">
                              <User className="h-3 w-3 text-[#5D5A54] shrink-0" />
                              <span className="truncate">{post.author?.name || "Watnidea Team"}</span>
                            </span>
                            <span className="flex items-center gap-1.5 shrink-0">
                              <Calendar className="h-3 w-3 text-[#5D5A54]" />
                              <span>{formattedDate}</span>
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-[#111111] group-hover:text-[#F13D32] transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h3>

                          {post.excerpt && (
                            <p className="text-xs text-[#5D5A54] leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          )}
                        </div>

                        <div className="pt-3 border-t border-[rgba(17,17,17,0.06)] flex items-center text-xs font-bold text-[#F13D32] group-hover:translate-x-1 transition-transform">
                          Read More →
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT: Categories & CTA Sidebar */}
          <aside className="lg:col-span-3 space-y-6 sticky top-24">
            
            {/* Categories Widget */}
            <div className="bg-white rounded-3xl border border-[rgba(17,17,17,0.10)] p-6 shadow-sm space-y-5">
              <h3 className="text-lg font-editorial font-bold text-[#111111] border-b border-[rgba(17,17,17,0.08)] pb-3 flex items-center gap-2">
                <FolderTree className="h-4 w-4 text-[#F13D32]" /> Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      !category ? "bg-[#FFF7E9] text-[#F13D32] font-bold" : "text-[#5D5A54] hover:bg-neutral-50 hover:text-[#111111]"
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                      {allPublishedPosts.length}
                    </span>
                  </Link>
                </li>
                {categories.map((cat) => {
                  const isActive = category === cat;
                  return (
                    <li key={cat}>
                      <Link
                        href={`/blog?category=${encodeURIComponent(cat)}`}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                          isActive ? "bg-[#FFF7E9] text-[#F13D32] font-bold" : "text-[#5D5A54] hover:bg-neutral-50 hover:text-[#111111]"
                        }`}
                      >
                        <span className="truncate pr-2">{cat}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 shrink-0">
                          {categoryCounts[cat]}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Need Help? CTA Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#111111] to-[#222222] text-white p-6 shadow-xl relative overflow-hidden space-y-5 border border-[rgba(255,255,255,0.1)]">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#F13D32]/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-1.5 relative z-10">
                <h3 className="text-xl font-editorial font-bold">Need Help?</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Get in touch with our experts for a free consultation on your brand and growth strategy.
                </p>
              </div>

              <Link
                href="/book-strategy-call"
                className="inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#F13D32] hover:bg-[#d93228] px-5 py-2.5 text-xs font-bold text-white transition-all shadow-md relative z-10"
              >
                Contact Us <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}