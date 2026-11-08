"use client";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { getNavLinks, NavLinks } from "@/components/layout/nav-links";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import icon from "@/public/icon.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const links = getNavLinks(locale, dictionary);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spark"
        >
          <Image src={icon} alt="Logo" width={32} height={32} className="rounded-lg" />
          <span className="text-base font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label={dictionary.nav.home}
        >
          <NavLinks
            links={links}
            className="text-sm text-paper/80 transition hover:text-spark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spark"
          />
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher locale={locale} label={dictionary.nav.language} />
          <Link
            href={`/${locale}#courses`}
            className="rounded-full bg-spark px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-spark-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spark"
          >
            {dictionary.nav.primaryCta}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spark"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">
            {open ? dictionary.nav.closeMenu : dictionary.nav.openMenu}
          </span>
          <span aria-hidden="true" className="flex h-5 w-6 flex-col justify-between">
            <span className={`h-0.5 w-full bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-full bg-white transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-full bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-navigation"
          className="mobile-nav-enter border-t border-white/10 px-4 py-4 lg:hidden"
          aria-label={dictionary.nav.home}
        >
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-2 py-2 text-paper/90 hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between gap-3">
            <LanguageSwitcher locale={locale} label={dictionary.nav.language} />
            <Link
              href={`/${locale}#courses`}
              className="rounded-full bg-spark px-4 py-2 text-sm font-semibold text-ink"
              onClick={() => setOpen(false)}
            >
              {dictionary.nav.primaryCta}
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
