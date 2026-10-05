import {
  getContactFieldErrors,
  isValidContactLocale,
  parseContactPayload,
} from "@/lib/contact";
import { appendContactLead } from "@/lib/google-sheets";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const payload = parseContactPayload(body);
  const errors = getContactFieldErrors(payload);

  if (Object.keys(errors).length > 0 || !isValidContactLocale(payload.locale)) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  try {
    await appendContactLead(payload);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form could not write to Google Sheets", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
