const MAX_BODY_BYTES = 8_192;

function siteOrigins(): string[] {
  const origins = new Set<string>();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (siteUrl) {
    try {
      origins.add(new URL(siteUrl).origin);
    } catch {
      // ignore invalid public URL
    }
  }

  if (process.env.NODE_ENV !== "production") {
    origins.add("http://localhost:3000");
    origins.add("http://127.0.0.1:3000");
  }

  return [...origins];
}

function originFromUrl(value: string | null): string | null {
  if (!value) return null;

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const fromForwarded = forwarded?.split(",")[0]?.trim();
  return fromForwarded || request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function isAllowedContactOrigin(request: Request): boolean {
  const allowed = new Set(siteOrigins());

  try {
    allowed.add(new URL(request.url).origin);
  } catch {
    // ignore invalid request URL
  }

  const origin = request.headers.get("origin");
  const refererOrigin = originFromUrl(request.headers.get("referer"));

  if (origin) {
    return allowed.has(origin);
  }

  if (refererOrigin) {
    return allowed.has(refererOrigin);
  }

  return false;
}

export function isJsonContentType(request: Request): boolean {
  const contentType = request.headers.get("content-type") ?? "";
  return contentType.toLowerCase().includes("application/json");
}

export function isBodyTooLarge(request: Request): boolean {
  const raw = request.headers.get("content-length");
  if (!raw) return false;

  const length = Number(raw);
  return Number.isFinite(length) && length > MAX_BODY_BYTES;
}
