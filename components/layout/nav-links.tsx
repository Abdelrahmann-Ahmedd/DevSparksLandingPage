import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";

export function getNavLinks(locale: Locale, dictionary: Dictionary) {
  return [
    { href: `/${locale}#features`, label: dictionary.nav.features },
    { href: `/${locale}#courses`, label: dictionary.nav.courses },
    { href: `/${locale}#faq`, label: dictionary.nav.faq },
    { href: `/${locale}#contact`, label: dictionary.nav.contact },
  ];
}

type NavLinksProps = {
  links: { href: string; label: string }[];
  className?: string;
  onNavigate?: () => void;
};

export function NavLinks({ links, className = "", onNavigate }: NavLinksProps) {
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={className}
          onClick={onNavigate}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
