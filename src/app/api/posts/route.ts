import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";

function verifyAuth(password?: string) {
  if (!password) return null;
  if (password === process.env.ADMIN_PASSWORD) return "SUPER_ADMIN";
  if (process.env.SEO_EDITOR_PASSWORD && password === process.env.SEO_EDITOR_PASSWORD) {
    return "SEO_EDITOR";
  }
  return null;
}

// GET: Fetch posts (Public or Admin) + Authors
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "true";
  const slug = searchParams.get("slug");

  try {
    // Auto-publish any SCHEDULED posts whose scheduledAt time has passed
    await prisma.post.updateMany({
      where: {
        status: "SCHEDULED",
        scheduledAt: { lte: new Date() },
      },
      data: {
        status: "PUBLISHED",
        published: true,
      },
    });

    if (slug) {
      const post = await prisma.post.findUnique({
        where: { slug },
        include: { author: true },
      });
      return NextResponse.json(post);
    }

    const posts = await prisma.post.findMany({
      where: all
        ? {}
        : {
            status: "PUBLISHED",
            published: true,
          },
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch posts" }, { status: 500 });
  }
}

// POST: Create or Update Post + Auto-Save Revision Snapshot
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const role = verifyAuth(body.password);

    if (!role) {
      return NextResponse.json({ error: "Invalid Admin / SEO Editor Password" }, { status: 401 });
    }

    const {
      id,
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
      status,
      scheduledAt,
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
    } = body;

    const cleanSlug = (slug || title || "untitled")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    let authorId: string | undefined = undefined;
    if (authorEmail) {
      const author = await prisma.user.upsert({
        where: { email: authorEmail },
        update: { name: authorName || authorEmail.split("@")[0] },
        create: {
          email: authorEmail,
          name: authorName || authorEmail.split("@")[0],
          role: role === "SUPER_ADMIN" ? "SUPER_ADMIN" : "SEO_EDITOR",
        },
      });
      authorId = author.id;
    }

    const finalStatus = status || "DRAFT";
    const isPublished = finalStatus === "PUBLISHED";

    const postData: any = {
      title,
      slug: cleanSlug,
      excerpt: excerpt || null,
      content: content || "",
      coverImage: coverImage || null,
      coverImageAlt: coverImageAlt || null,
      category: category || "General",
      tags: Array.isArray(tags)
        ? tags
        : typeof tags === "string" && tags.trim()
        ? tags.split(",").map((t: string) => t.trim())
        : [],
      isFeatured: Boolean(isFeatured),
      relatedPostIds: Array.isArray(relatedPostIds) ? relatedPostIds : [],
      status: finalStatus,
      published: isPublished,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      focusKeyword: focusKeyword || null,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      canonicalUrl: canonicalUrl || null,
      robotsIndex: robotsIndex !== undefined ? Boolean(robotsIndex) : true,
      robotsFollow: robotsFollow !== undefined ? Boolean(robotsFollow) : true,
      ogTitle: ogTitle || null,
      ogDescription: ogDescription || null,
      ogImage: ogImage || null,
      twitterCard: twitterCard || "summary_large_image",
      schemaType: schemaType || "BlogPosting",
      ...(authorId ? { authorId } : {}),
    };

    if (id) {
      const existing = await prisma.post.findUnique({ where: { id } });
      const prevRevisions = Array.isArray(existing?.revisions) ? (existing.revisions as any[]) : [];

      const newRevision = {
        savedAt: new Date().toISOString(),
        title,
        excerpt,
        content,
        metaTitle,
        metaDescription,
        role,
      };

      const updated = await prisma.post.update({
        where: { id },
        data: {
          ...postData,
          revisions: [newRevision, ...prevRevisions].slice(0, 15),
        },
      });
      return NextResponse.json(updated);
    }

    const created = await prisma.post.create({
      data: {
        ...postData,
        revisions: [
          {
            savedAt: new Date().toISOString(),
            title,
            excerpt,
            content,
            metaTitle,
            metaDescription,
            role,
          },
        ],
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save post" }, { status: 500 });
  }
}

// PATCH: Increment View Counter OR Restore/Trash Post
export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    if (body.action === "increment_view" && body.slug) {
      const updated = await prisma.post.update({
        where: { slug: body.slug },
        data: { views: { increment: 1 } },
      });
      return NextResponse.json({ views: updated.views });
    }

    const role = verifyAuth(body.password);
    if (!role) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updated = await prisma.post.update({
      where: { id: body.id },
      data: {
        status: body.status,
        published: body.status === "PUBLISHED",
      },
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update post" }, { status: 500 });
  }
}

// DELETE: Permanent Delete (Super Admin only)
export async function DELETE(request: Request) {
  try {
    const { id, password } = await request.json();
    const role = verifyAuth(password);

    if (role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Only SUPER_ADMIN can permanently delete posts. Move to Trash instead." },
        { status: 403 }
      );
    }

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete post" }, { status: 500 });
  }
}