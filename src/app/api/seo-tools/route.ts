import { NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";

function isAuthorized(password?: string | null) {
  if (!password) return false;
  return (
    password === process.env.ADMIN_PASSWORD ||
    (Boolean(process.env.SEO_EDITOR_PASSWORD) && password === process.env.SEO_EDITOR_PASSWORD)
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  try {
    if (type === "redirects") {
      const redirects = await prisma.redirect.findMany({ orderBy: { createdAt: "desc" } });
      return NextResponse.json(redirects);
    }

    if (type === "404s") {
      const logs = await prisma.brokenLinkLog.findMany({ orderBy: { hits: "desc" }, take: 50 });
      return NextResponse.json(logs);
    }

    if (type === "global") {
      let config = await prisma.globalSeoConfig.findUnique({ where: { id: "default" } });
      if (!config) {
        config = await prisma.globalSeoConfig.create({
          data: {
            id: "default",
            siteName: "Watnidea",
            defaultMetaTitle: "Watnidea | Digital Agency & Growth Insights",
            defaultMetaDesc: "Explore digital strategy, web development, and SEO insights from Watnidea.",
          },
        });
      }
      return NextResponse.json(config);
    }

    if (type === "backup") {
      const [posts, redirects, globalSeo] = await Promise.all([
        prisma.post.findMany(),
        prisma.redirect.findMany(),
        prisma.globalSeoConfig.findMany(),
      ]);
      return NextResponse.json({
        exportedAt: new Date().toISOString(),
        posts,
        redirects,
        globalSeo,
      });
    }

    return NextResponse.json({ error: "Specify ?type=redirects|404s|global|backup" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, password } = body;

    if (action === "log_404" && body.path) {
      const log = await prisma.brokenLinkLog.upsert({
        where: { path: body.path },
        update: { hits: { increment: 1 }, lastHitAt: new Date() },
        create: { path: body.path, hits: 1 },
      });
      return NextResponse.json(log);
    }

    if (!isAuthorized(password)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (action === "add_redirect") {
      const item = await prisma.redirect.upsert({
        where: { sourcePath: body.sourcePath },
        update: { targetPath: body.targetPath, permanent: Boolean(body.permanent) },
        create: {
          sourcePath: body.sourcePath.startsWith("/") ? body.sourcePath : `/${body.sourcePath}`,
          targetPath: body.targetPath,
          permanent: body.permanent !== false,
        },
      });
      return NextResponse.json(item);
    }

    if (action === "delete_redirect") {
      await prisma.redirect.delete({ where: { id: body.id } });
      return NextResponse.json({ success: true });
    }

    if (action === "clear_404") {
      await prisma.brokenLinkLog.delete({ where: { id: body.id } });
      return NextResponse.json({ success: true });
    }

    if (action === "save_global") {
      const config = await prisma.globalSeoConfig.upsert({
        where: { id: "default" },
        update: {
          siteName: body.siteName,
          defaultMetaTitle: body.defaultMetaTitle,
          defaultMetaDesc: body.defaultMetaDesc,
          defaultOgImage: body.defaultOgImage,
          customRobotsTxt: body.customRobotsTxt,
        },
        create: {
          id: "default",
          siteName: body.siteName || "Watnidea",
          defaultMetaTitle: body.defaultMetaTitle,
          defaultMetaDesc: body.defaultMetaDesc,
          defaultOgImage: body.defaultOgImage,
          customRobotsTxt: body.customRobotsTxt,
        },
      });
      return NextResponse.json(config);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
