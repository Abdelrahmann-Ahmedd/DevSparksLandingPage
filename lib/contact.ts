import en from "@/app/[lang]/dictionaries/en.json";
import { isLocale } from "@/lib/i18n";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const courseIds = en.courses.items.map((item) => item.id);

export const contactLimits = {
  name: 100,
  email: 254,
  phone: 30,
  message: 2000,
} as const;

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  track: string;
  message: string;
  locale: string;
  website: string;
};

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "phone" | "track" | "message", true>
>;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function parseContactPayload(input: unknown): ContactPayload {
  const data = (input ?? {}) as Record<string, unknown>;
  return {
    name: asString(data.name).slice(0, contactLimits.name),
    email: asString(data.email).slice(0, contactLimits.email),
    phone: asString(data.phone).slice(0, contactLimits.phone),
    track: asString(data.track),
    message: asString(data.message).slice(0, contactLimits.message),
    locale: asString(data.locale),
    website: asString(data.website),
  };
}

export function getContactFieldErrors(payload: ContactPayload): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  const digits = payload.phone.replace(/\D/g, "");

  if (!payload.name) errors.name = true;
  if (!payload.email) errors.email = true;
  else if (!emailPattern.test(payload.email)) errors.email = true;
  if (!payload.phone) errors.phone = true;
  else if (digits.length < 8 || digits.length > 15) errors.phone = true;
  if (!payload.track || !courseIds.includes(payload.track)) errors.track = true;
  if (!payload.message) errors.message = true;

  return errors;
}

export function isHoneypotFilled(payload: ContactPayload): boolean {
  return payload.website.length > 0;
}

export function isValidContactLocale(locale: string): boolean {
  return isLocale(locale);
}
