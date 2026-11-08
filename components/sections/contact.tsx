import { ContactDetails } from "@/components/sections/contact-details";
import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

type ContactSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function ContactSection({ locale, dictionary }: ContactSectionProps) {
  const { contact } = dictionary;

  return (
    <section
      id={contact.id}
      aria-labelledby="contact-heading"
      className="bg-mist py-20"
    >
      <Container>
        <SectionHeading
          eyebrow={contact.eyebrow}
          title={contact.title}
          lead={contact.lead}
          titleId="contact-heading"
        />
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <ContactDetails contact={contact} />
          </Reveal>
          <Reveal delay={120}>
            <ContactForm locale={locale} dictionary={dictionary} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
