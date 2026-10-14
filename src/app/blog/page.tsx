import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { db as prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

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

export default async function BlogIndexPage() {
  await prisma.post
    .updateMany({
      where: { status: "SCHEDULED", scheduledAt: { lte: new Date() } },
      data: { status: "PUBLISHED", published: true },
    })
    .catch(() => {});

  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED", published: true },
    include: { author: true },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  const featuredPost = posts.find((p) => p.isFeatured) || posts[0];
  const regularPosts = featuredPost ? posts.filter((p) => p.id !== featuredPost.id) : posts;

  return (
    <main className="py-20 px-4 md:px-8 w-full">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header matching WatNidea typography */}
        <div className="space-y-5 text-center max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-red-600 border border-red-600/20 bg-red-50/50">
            Watnidea Insights
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-neutral-900">
            Ideas, Strategy & Digital Growth
          </h1>
          <p className="text-neutral-600 text-lg md:text-xl">
            Deep dives into branding, high-converting web architecture, and search engine dominance.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="p-12 rounded-2xl border border-black/10 bg-white/40 text-center space-y-5 shadow-sm backdrop-blur-sm">
            <p className="text-neutral-600 text-lg">No articles published yet.</p>
            <Link
              href="/admin/blog"
              className="inline-block px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-black text-sm font-semibold transition-colors shadow-md"
            >
              Go to Admin Dashboard to Publish Your First Post →
            </Link>
          </div>
        ) : (
          <>
            {/* Featured Post Card */}
            {featuredPost && (
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 rounded-3xl border border-black/10 bg-white/40 hover:bg-white/60 hover:border-red-500/30 transition-all shadow-sm backdrop-blur-sm"
              >
                {featuredPost.coverImage && (
                  <div className="lg:col-span-7 overflow-hidden rounded-2xl bg-neutral-100">
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.coverImageAlt || featuredPost.title}
                      className="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition duration-700"
                    />
                  </div>
                )}
                <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="px-3 py-1 rounded-full bg-red-500 text-white font-bold tracking-wide">
                      Featured
                    </span>
                    <span className="text-red-600 font-semibold uppercase tracking-wider">{featuredPost.category}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 group-hover:text-red-600 transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                  {featuredPost.excerpt && (
                    <p className="text-neutral-600 text-base leading-relaxed line-clamp-3">{featuredPost.excerpt}</p>
                  )}
                  <div className="pt-2 text-sm font-bold text-neutral-900 group-hover:text-red-600 flex items-center gap-2 transition-colors">
                    Read Full Article <span className="text-lg">→</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Standard Posts Grid */}
            {regularPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col rounded-3xl border border-black/10 bg-white/40 hover:bg-white/60 hover:border-red-500/30 overflow-hidden transition-all shadow-sm backdrop-blur-sm"
                  >
                    {post.coverImage && (
                      <div className="overflow-hidden h-56 bg-neutral-100">
                        <img
                          src={post.coverImage}
                          alt={post.coverImageAlt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                        />
                      </div>
                    )}
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-5">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
                          <span className="text-red-600 font-bold uppercase tracking-wider">{post.category}</span>
                          <span>
                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-neutral-900 group-hover:text-red-600 transition-colors leading-snug">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                        )}
                      </div>
                      <span className="text-sm font-bold text-neutral-900 group-hover:text-red-600 flex items-center gap-2 pt-2 transition-colors">
                        Read Article <span className="text-lg">→</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}