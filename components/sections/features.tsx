import { FeatureCard } from "@/components/sections/feature-card";
import { featureIcons } from "@/components/sections/feature-icon";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/lib/dictionary";

type FeaturesSectionProps = {
  dictionary: Dictionary;
};

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
              <FeatureCard
                title={item.title}
                body={item.body}
                icon={featureIcons[index] ?? "a11y"}
                delay={index * 80}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
