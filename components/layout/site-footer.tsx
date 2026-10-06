import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import Link from "next/link";

type SiteFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-semibold">{siteConfig.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-paper/70">
            {dictionary.footer.tagline}
          </p>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="text-sm font-semibold uppercase tracking-wider text-spark">
            {dictionary.footer.explore}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link className="hover:text-spark" href={`/${locale}#features`}>
                {dictionary.nav.features}
              </Link>
            </li>
            <li>
              <Link className="hover:text-spark" href={`/${locale}#courses`}>
                {dictionary.nav.courses}
              </Link>
            </li>
            <li>
              <Link className="hover:text-spark" href={`/${locale}#faq`}>
                {dictionary.nav.faq}
              </Link>
            </li>
            <li>
              <Link className="hover:text-spark" href={`/${locale}#contact`}>
                {dictionary.nav.contact}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-legal">
          <h2 id="footer-legal" className="text-sm font-semibold uppercase tracking-wider text-spark">
            {dictionary.footer.legal}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="hover:text-spark" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </li>
            <li>
              <span className="text-paper/70">{dictionary.footer.privacy}</span>
            </li>
            <li>
              <span className="text-paper/70">{dictionary.footer.terms}</span>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {siteConfig.name}. {dictionary.footer.copyright}
          </p>
          <p>{dictionary.footer.madeFor}</p>
        </div>
      </div>
    </footer>
  );
}
