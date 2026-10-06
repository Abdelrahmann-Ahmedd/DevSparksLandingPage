export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeMeta: Record<
  Locale,
  { label: string; htmlLang: string; dir: "ltr" | "rtl" }
> = {
  en: { label: "English", htmlLang: "en", dir: "ltr" },
  ar: { label: "العربية", htmlLang: "ar", dir: "rtl" },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "en" ? "ar" : "en";
}
