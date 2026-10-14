import React from "react";
import Link from "next/link";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { db as prisma } from "@/lib/db";

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
  const canonical = post.canonicalUrl || `https://www.watnidea.com/blog/${post.slug}`;
  const ogImg = post.ogImage || post.coverImage || undefined;

  return {
    title,
    description,
    keywords: post.focusKeyword ? [post.focusKeyword, ...(post.tags || [])] : post.tags,
    alternates: {
      canonical,
    },
    robots: {
      index: post.robotsIndex,
      follow: post.robotsFollow,
    },
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
      where: {
        OR: [{ sourcePath: `/blog/${slug}` }, { sourcePath: `/${slug}` }],
      },
    })
    .catch(() => null);

  if (redirectRule) {
    if (redirectRule.permanent) {
      permanentRedirect(redirectRule.targetPath);
    } else {
      redirect(redirectRule.targetPath);
    }
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

  const relatedPosts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      published: true,
      id: { not: post.id },
      category: post.category,
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": post.schemaType || "BlogPosting",
    headline: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || "",
    image: post.coverImage ? [post.coverImage] : [],
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.author?.name || "Watnidea Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Watnidea",
      url: "https://www.watnidea.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.canonicalUrl || `https://www.watnidea.com/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.watnidea.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.watnidea.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://www.watnidea.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <article className="py-16 px-4 md:px-8 w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto space-y-12">
        <nav className="text-xs text-neutral-500 flex items-center gap-2 font-medium tracking-wide">
          <Link href="/" className="hover:text-red-600 transition-colors">
            HOME
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-red-600 transition-colors">
            BLOG
          </Link>
          <span>/</span>
          <span className="text-neutral-900 truncate uppercase">{post.title}</span>
        </nav>

        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
            <span className="px-3 py-1 rounded-full bg-red-500 text-white tracking-widest uppercase">
              {post.category}
            </span>
            <span className="text-neutral-500">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-neutral-400">·</span>
            <span className="text-neutral-500">By {post.author?.name || "Watnidea Team"}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-neutral-900 leading-[1.1]">
            {post.title}
          </h1>

          {post.excerpt && <p className="text-xl text-neutral-600 leading-relaxed font-serif italic">{post.excerpt}</p>}
        </header>

        {post.coverImage && (
          <figure className="overflow-hidden rounded-3xl border border-black/10 shadow-md">
            <img
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              width={1200}
              height={650}
              className="w-full h-auto object-cover"
            />
          </figure>
        )}

        <div className="prose prose-lg md:prose-xl max-w-none text-neutral-800 leading-relaxed [&_h2]:font-serif [&_h2]:text-neutral-900 [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-6 [&_h3]:font-serif [&_h3]:text-neutral-900 [&_h3]:font-bold [&_h3]:mt-10 [&_h3]:mb-4 [&_p]:mb-6 [&_a]:text-red-600 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-red-700 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_li]:mb-2 [&_img]:rounded-2xl [&_img]:border [&_img]:border-black/10 [&_table]:w-full [&_table]:mb-6 [&_th]:border-b-2 [&_th]:border-black/20 [&_th]:p-3 [&_th]:text-left [&_td]:border-b [&_td]:border-black/10 [&_td]:p-3 [&_blockquote]:border-l-4 [&_blockquote]:border-red-500 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:font-serif [&_blockquote]:text-neutral-600">
          <ReactMarkdown>{post.content || ""}</ReactMarkdown>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-10 border-t border-black/10">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full bg-white border border-black/10 text-neutral-600 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {relatedPosts.length > 0 && (
          <section className="pt-16 mt-8 border-t border-black/10 space-y-8">
            <h2 className="text-3xl font-serif font-bold text-neutral-900">Keep Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="p-6 rounded-3xl border border-black/10 bg-white/40 hover:bg-white/60 hover:border-red-500/30 transition-all shadow-sm space-y-3 block"
                >
                  <span className="text-xs font-bold tracking-wider uppercase text-red-600">{rel.category}</span>
                  <h3 className="font-serif text-xl font-bold text-neutral-900 leading-snug line-clamp-2">{rel.title}</h3>
                  <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">{rel.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}