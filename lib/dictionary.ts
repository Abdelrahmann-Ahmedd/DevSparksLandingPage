import ar from "@/app/[lang]/dictionaries/ar.json";
import en from "@/app/[lang]/dictionaries/en.json";
import { isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const dictionaries = {
  en,
  ar,
} as const;

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function requireLocale(value: string): Locale {
  if (!isLocale(value)) {
    notFound();
  }

  return value;
}
