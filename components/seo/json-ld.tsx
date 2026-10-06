import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionary";
import { siteConfig } from "@/lib/site";

type JsonLdProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function JsonLd({ locale, dictionary }: JsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": `${siteConfig.url}/#org`,
        name: siteConfig.name,
        url: `${siteConfig.url}/${locale}`,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        description: dictionary.meta.description,
        inLanguage: [locale],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: `${siteConfig.url}/${locale}`,
        name: siteConfig.name,
        inLanguage: locale,
        publisher: { "@id": `${siteConfig.url}/#org` },
      },
      ...dictionary.courses.items.map((course) => ({
        "@type": "Course",
        name: course.name,
        description: course.summary,
        provider: { "@id": `${siteConfig.url}/#org` },
        inLanguage: locale,
        offers: {
          "@type": "Offer",
          price: course.price.replace(/[^\d.]/g, ""),
          priceCurrency: "USD",
          category: course.level,
        },
      })),
      {
        "@type": "FAQPage",
        mainEntity: dictionary.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
