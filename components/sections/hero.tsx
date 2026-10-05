import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import type { CSSProperties } from "react";

type HeroSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function HeroSection({ locale, dictionary }: HeroSectionProps) {
  const { hero } = dictionary;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-ink text-paper"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-orb hero-orb-spark" />
        <div className="hero-orb hero-orb-teal" />
      </div>
      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
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

        <div
          className="hero-enter"
          style={{ "--enter-delay": "280ms" } as CSSProperties}
        >
          <figure className="hero-float rounded-2xl border border-white/10 bg-[#0b1220] p-4 shadow-2xl shadow-black/40">
            <figcaption className="mb-3 flex items-center justify-between text-xs text-paper/60">
              <span>{hero.codeCaption}</span>
              <span className="font-mono text-spark">{hero.codeFilename}</span>
            </figcaption>
            <pre
              dir="ltr"
              className="overflow-x-auto rounded-xl bg-black/40 p-4 font-mono text-[13px] leading-6 text-paper/90"
            >
              <code>{`type Learner = {
  name: string;
  goal: "career" | "craft";
};

function spark(learner: Learner) {
  return {
    ...learner,
    ships: true,
    languages: ["en", "ar"],
  };
}`}</code>
              <span className="hero-caret" aria-hidden="true" />
            </pre>
          </figure>
        </div>
      </Container>
    </section>
  );
}
