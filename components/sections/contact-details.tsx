import type { Dictionary } from "@/lib/dictionary";
import { siteConfig } from "@/lib/site";

type ContactDetailsProps = {
  contact: Dictionary["contact"];
};

export function ContactDetails({ contact }: ContactDetailsProps) {
  return (
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
  );
}
