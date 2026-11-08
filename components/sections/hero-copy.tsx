import { ButtonLink } from "@/components/ui/button-link";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import type { CSSProperties } from "react";

type HeroCopyProps = {
  locale: Locale;
  hero: Dictionary["hero"];
};

export function HeroCopy({ locale, hero }: HeroCopyProps) {
  return (
    <div>
      <p
        className="hero-enter text-sm font-semibold tracking-[0.2em] text-spark uppercase"
        style={{ "--enter-delay": "40ms" } as CSSProperties}
      >
        {hero.eyebrow}
      </p>
      <h1
        id="hero-heading"
        className="hero-enter mt-4 max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
        style={{ "--enter-delay": "140ms" } as CSSProperties}
      >
        {hero.title}
      </h1>
      <p
        className="hero-enter mt-5 max-w-xl text-base leading-7 text-paper/75 sm:text-lg"
        style={{ "--enter-delay": "240ms" } as CSSProperties}
      >
        {hero.lead}
      </p>
      <div
        className="hero-enter mt-8 flex flex-col gap-3 sm:flex-row"
        style={{ "--enter-delay": "340ms" } as CSSProperties}
      >
        <ButtonLink href={`/${locale}#courses`}>{hero.primaryCta}</ButtonLink>
        <ButtonLink href={`/${locale}#contact`} variant="secondary">
          {hero.secondaryCta}
        </ButtonLink>
      </div>
      <ul
        className="hero-enter mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6"
        style={{ "--enter-delay": "460ms" } as CSSProperties}
      >
        {hero.stats.map((stat) => (
          <li key={stat.label}>
            <p className="text-lg font-semibold text-spark sm:text-2xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-paper/65 sm:text-sm">{stat.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
