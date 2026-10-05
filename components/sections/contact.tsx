import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

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
            <aside className="rounded-2xl bg-ink p-6 text-paper">
              <address className="not-italic space-y-5 text-sm leading-6">
                <p>
                  <span className="block text-xs font-semibold tracking-wider text-spark uppercase">
                    {contact.emailLabel}
                  </span>
                  <a
                    className="mt-1 inline-block transition-colors hover:text-spark"
                    href={`mailto:${siteConfig.email}`}
                  >
                    {siteConfig.email}
                  </a>
                </p>
                <p>
                  <span className="block text-xs font-semibold tracking-wider text-spark uppercase">
                    {contact.phoneLabel}
                  </span>
                  <a
                    className="mt-1 inline-block transition-colors hover:text-spark"
                    href={`tel:${siteConfig.phone}`}
                  >
                    {siteConfig.phone}
                  </a>
                </p>
                <p>
                  <span className="block text-xs font-semibold tracking-wider text-spark uppercase">
                    {contact.hoursLabel}
                  </span>
                  <span className="mt-1 block text-paper/80">{contact.hoursValue}</span>
                </p>
              </address>
            </aside>
          </Reveal>
          <Reveal delay={120}>
            <ContactForm locale={locale} dictionary={dictionary} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
