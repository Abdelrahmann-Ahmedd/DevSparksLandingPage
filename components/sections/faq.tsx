import { FaqItem } from "@/components/sections/faq-item";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/lib/dictionary";

type FaqSectionProps = {
  dictionary: Dictionary;
};

export function FaqSection({ dictionary }: FaqSectionProps) {
  const { faq } = dictionary;

  return (
    <section id={faq.id} aria-labelledby="faq-heading" className="bg-paper py-20">
      <Container>
        <SectionHeading
          eyebrow={faq.eyebrow}
          title={faq.title}
          lead={faq.lead}
          titleId="faq-heading"
        />
        <Reveal className="mx-auto mt-12 max-w-3xl divide-y divide-ink/10 rounded-2xl border border-ink/8 bg-white">
          {faq.items.map((item) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
