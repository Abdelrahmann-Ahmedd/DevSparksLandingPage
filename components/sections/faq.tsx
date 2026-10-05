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
            <details key={item.question} className="group p-5">
              <summary className="cursor-pointer list-none text-base font-semibold text-ink marker:content-none transition-colors hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spark">
                <span className="flex items-start justify-between gap-4">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="mt-0.5 text-spark transition duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="faq-answer mt-3 text-sm leading-6 text-ink-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
