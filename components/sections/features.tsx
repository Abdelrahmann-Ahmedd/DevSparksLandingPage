import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/lib/dictionary";

type FeaturesSectionProps = {
  dictionary: Dictionary;
};

const icons = [
  "reviews",
  "projects",
  "language",
  "live",
  "career",
  "a11y",
] as const;

function FeatureIcon({ name }: { name: (typeof icons)[number] }) {
  const common = "h-6 w-6";

  switch (name) {
    case "reviews":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 7h14M5 12h10M5 17h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "projects":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "language":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
          <path d="M4 12h16M12 4c2.5 3 2.5 13 0 16M12 4c-2.5 3-2.5 13 0 16" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "live":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8 8h8v8H8z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M16 10l4-2v8l-4-2" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "career":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8 9V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.8" />
          <rect x="4" y="9" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    default:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
  }
}

export function FeaturesSection({ dictionary }: FeaturesSectionProps) {
  const { features } = dictionary;

  return (
    <section
      id={features.id}
      aria-labelledby="features-heading"
      className="bg-paper py-20"
    >
      <Container>
        <SectionHeading
          eyebrow={features.eyebrow}
          title={features.title}
          lead={features.lead}
          titleId="features-heading"
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 80} className="h-full">
                <div className="card-lift group h-full rounded-2xl border border-ink/8 bg-white p-6 shadow-sm">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-spark transition duration-300 group-hover:scale-105">
                    <FeatureIcon name={icons[index] ?? "a11y"} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">{item.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
