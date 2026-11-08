import {
  getContactFieldErrors,
  isHoneypotFilled,
  isValidContactLocale,
  parseContactPayload,
} from "@/lib/contact";
import { appendContactLead } from "@/lib/google-sheets";
import { consumeRateLimit } from "@/lib/rate-limit";
import {
  getClientIp,
  isAllowedContactOrigin,
  isBodyTooLarge,
  isJsonContentType,
} from "@/lib/request-guard";

export async function POST(request: Request) {
  if (!isJsonContentType(request)) {
    return Response.json({ ok: false }, { status: 415 });
  }

  if (isBodyTooLarge(request)) {
    return Response.json({ ok: false }, { status: 413 });
  }

  if (!isAllowedContactOrigin(request)) {
    return Response.json({ ok: false }, { status: 403 });
  }

  const limit = consumeRateLimit(`contact:${getClientIp(request)}`);
  if (!limit.ok) {
    return Response.json(
      { ok: false },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const payload = parseContactPayload(body);

  if (isHoneypotFilled(payload)) {
    return Response.json({ ok: true });
  }

  const errors = getContactFieldErrors(payload);

  if (Object.keys(errors).length > 0 || !isValidContactLocale(payload.locale)) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  try {
    await appendContactLead({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      track: payload.track,
      message: payload.message,
      locale: payload.locale,
    });
    return Response.json({ ok: true });
  } catch {
    console.error("Contact form could not write to Google Sheets");
    return Response.json({ ok: false }, { status: 500 });
  }
}
