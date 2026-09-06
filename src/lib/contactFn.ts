import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact";

// Simple in-memory rate limit: max 5 submissions per IP per hour, 1 per 15s
const ipSubmissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_MIN_INTERVAL_MS = 15_000;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

function isRateLimited(ip: string): { limited: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const timestamps = ipSubmissions.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length === 0) {
    ipSubmissions.set(ip, []);
    return { limited: false };
  }
  const last = recent[recent.length - 1];
  if (last !== undefined && now - last < RATE_LIMIT_MIN_INTERVAL_MS) {
    return { limited: true, retryAfterMs: RATE_LIMIT_MIN_INTERVAL_MS - (now - last) };
  }
  if (recent.length >= RATE_LIMIT_MAX) {
    const oldestInWindow = recent[0]!;
    return { limited: true, retryAfterMs: RATE_LIMIT_WINDOW_MS - (now - oldestInWindow) };
  }
  return { limited: false };
}

function recordSubmission(ip: string) {
  const now = Date.now();
  const arr = ipSubmissions.get(ip) ?? [];
  const recent = arr.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  ipSubmissions.set(ip, recent);
  // Prevent unbounded growth in long-running process
  if (ipSubmissions.size > 5000) {
    const oldestKey = ipSubmissions.keys().next().value as string | undefined;
    if (oldestKey) ipSubmissions.delete(oldestKey);
  }
}

export const submitContact = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(parsed.error.issues.map((i) => i.message).join(", "));
    }
    return parsed.data;
  })
  .handler(async ({ data, context }) => {
    // Try to obtain request for rate limiting / IP. TanStack Start exposes getRequest() in server runtime.
    let request: Request | undefined = (context as unknown as { request?: Request })?.request;
    if (!request) {
      try {
        const mod = (await import("@tanstack/react-start/server")) as unknown as {
          getRequest?: () => Request;
        };
        request = mod.getRequest?.();
      } catch {
        // getRequest not available - fallback to unknown IP (still functional, just less precise rate limit)
      }
    }
    const ip = request ? getClientIp(request) : "unknown";

    // Honeypot check
    if (data.website && data.website.trim() !== "") {
      // Pretend success for bots
      return { success: true as const };
    }

    const rate = isRateLimited(ip);
    if (rate.limited) {
      const retrySec = Math.ceil((rate.retryAfterMs ?? 0) / 1000);
      throw new Error(`Too many requests. Please try again in ${retrySec}s.`);
    }

    // At this point data is validated and sanitized by zod (trimmed)
    // In production, integrate email provider (Resend, SendGrid, SES) or persist to DB.
    // For now, log structured event for observability.
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      subject: data.subject,
      message: data.message,
      ip,
      timestamp: new Date().toISOString(),
    };

    // Do not log PII in production logs at high volume - trim or hash email in real prod
    // This console.log is intentionally concise; replace with your logger/queue.
    console.log(
      JSON.stringify({
        level: "info",
        event: "contact_submission",
        ...payload,
        message: payload.message.slice(0, 200) + (payload.message.length > 200 ? "…" : ""),
      }),
    );

    recordSubmission(ip);

    // Simulate async work (e.g., email send)
    // await sendEmail(payload)

    return { success: true as const };
  });
