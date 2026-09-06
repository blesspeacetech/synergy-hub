import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function getSiteUrl(request: Request): string {
  const envUrl =
    (globalThis as unknown as { process?: { env?: Record<string, string> } }).process?.env?.[
      "VITE_SITE_URL"
    ] || (import.meta as unknown as { env?: Record<string, string> }).env?.["VITE_SITE_URL"];
  if (envUrl) return envUrl.replace(/\/$/, "");
  try {
    const url = new URL(request.url);
    return `${url.protocol}//${url.host}`;
  } catch {
    return "https://arichiglobalsynergy.com";
  }
}

function buildSitemapXml(siteUrl: string): string {
  const base = siteUrl.replace(/\/$/, "");
  const pages = [
    { loc: `${base}/`, priority: "1.0", changefreq: "weekly" },
    { loc: `${base}/services`, priority: "0.9", changefreq: "monthly" },
    { loc: `${base}/about`, priority: "0.8", changefreq: "monthly" },
    { loc: `${base}/contact`, priority: "0.7", changefreq: "yearly" },
  ];
  const now = new Date().toISOString().split("T")[0];
  const urls = pages
    .map(
      (p) =>
        `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      // Production health check for orchestrators (K8s, Container Apps, Load balancers)
      if (url.pathname === "/health" || url.pathname === "/api/health") {
        return new Response(JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }), {
          status: 200,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-store, no-cache, must-revalidate",
          },
        });
      }
      // Dynamic sitemap with correct host (fallback to static public/sitemap.xml via nitro if this is skipped)
      if (url.pathname === "/sitemap.xml") {
        const siteUrl = getSiteUrl(request);
        const xml = buildSitemapXml(siteUrl);
        return new Response(xml, {
          status: 200,
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      }
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
