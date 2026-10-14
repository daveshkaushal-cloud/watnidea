import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const password = formData.get("password") as string | null;

    if (
      password !== process.env.ADMIN_PASSWORD &&
      (!process.env.SEO_EDITOR_PASSWORD || password !== process.env.SEO_EDITOR_PASSWORD)
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Resize to 1200x650 and compress as WebP
    const optimizedBuffer = await sharp(buffer)
      .resize(1200, 650, {
        fit: "cover",
        position: "center",
      })
      .webp({ quality: 82 })
      .toBuffer();

    const base64Webp = `data:image/webp;base64,${optimizedBuffer.toString("base64")}`;

    return NextResponse.json({
      url: base64Webp,
      width: 1200,
      height: 650,
      format: "webp",
      sizeKb: Math.round(optimizedBuffer.byteLength / 1024),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Image processing failed" }, { status: 500 });
  }
}