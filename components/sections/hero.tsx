import { HeroCodePreview } from "@/components/sections/hero-code-preview";
import { HeroCopy } from "@/components/sections/hero-copy";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

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
        <HeroCopy locale={locale} hero={hero} />
        <HeroCodePreview hero={hero} />
      </Container>
    </section>
  );
}
