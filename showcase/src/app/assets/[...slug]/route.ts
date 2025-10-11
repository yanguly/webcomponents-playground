import { NextResponse } from "next/server";
import path from "path";
import { readFile } from "node:fs/promises";

export const dynamic = "force-dynamic";

const PREACT_DIST_ROOT = path.join(
  process.cwd(),
  "..",
  "components",
  "preact-demo",
  "dist",
);

const projects = new Map([
  [
    "example-01",
    path.join(process.cwd(), "..", "components", "example-01"),
  ],
  [
    "stencil-example-component",
    path.join(
      process.cwd(),
      "..",
      "components",
      "stencil",
      "example-component",
      "www",
    ),
  ],
  [
    "angular-elements",
    path.join(
      process.cwd(),
      "..",
      "components",
      "kxl-wc",
      "dist",
      "elements",
    ),
  ],
  [
    "kxl-wc",
    path.join(process.cwd(), "..", "components", "kxl-wc"),
  ],
  [
    "preact-demo",
    PREACT_DIST_ROOT,
  ],
]);

const mimeByExtension: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
};

type RouteContext = {
  params: Promise<{ slug?: string[] }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug: slugParam } = await context.params;
  const segments = slugParam ?? [];
  if (segments.length === 0) {
    return NextResponse.json({ error: "Missing asset path" }, { status: 404 });
  }

  const [project, ...rest] = segments;
  let lookupProject = project;
  let remainder = rest;

  if (!projects.has(project) && project === "assets" && rest[0] === "kxl-wc") {
    lookupProject = "kxl-wc";
    remainder = rest.slice(1);
  }

  const baseDirEntry = projects.get(lookupProject);
  const baseDir = baseDirEntry ?? PREACT_DIST_ROOT;
  const relativePath = baseDirEntry
    ? remainder.length === 0
      ? "index.html"
      : remainder.join("/")
    : segments.join("/");
  const candidatePaths: string[] = [];
  const primaryPath = path.join(baseDir, relativePath);
  const normalizedBase = path.normalize(baseDir);
  const normalizedTarget = path.normalize(primaryPath);

  if (!normalizedTarget.startsWith(normalizedBase)) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }
  candidatePaths.push(primaryPath);

  if (!baseDirEntry) {
    candidatePaths.push(path.join(baseDir, "assets", relativePath));
  }

  for (const candidate of candidatePaths) {
    try {
      const file = await readFile(candidate);
      const body = new Uint8Array(file);
      const ext = path.extname(candidate).toLowerCase();
      const contentType =
        mimeByExtension[ext] ??
        (ext.startsWith(".") ? `application/octet-stream` : "text/plain");
      return new NextResponse(body, {
        headers: {
          "content-type": contentType,
          "cache-control": "public, max-age=31536000, immutable",
        },
      });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        console.error("Asset read failed:", error);
        return NextResponse.json({ error: "Asset read error" }, { status: 500 });
      }
    }
  }

  console.error("Asset read failed:", {
    baseDir,
    relativePath,
  });
  return NextResponse.json({ error: "Asset not found" }, { status: 404 });
}
