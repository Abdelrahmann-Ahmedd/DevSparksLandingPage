import { getAlternateLocale, localeMeta, type Locale } from "@/lib/i18n";
import Link from "next/link";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
};

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const nextLocale = getAlternateLocale(locale);
  const nextLabel = localeMeta[nextLocale].label;

  return (
    <div className="flex items-center gap-2">
      <span className="sr-only">{label}</span>
      <Link
        href={`/${nextLocale}`}
        hrefLang={nextLocale}
        className="rounded-full border border-white/15 px-3 py-1.5 text-sm font-medium text-white transition hover:border-spark hover:text-spark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spark"
        lang={nextLocale}
      >
        {nextLabel}
      </Link>
    </div>
  );
}
