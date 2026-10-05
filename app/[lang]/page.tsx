import { ContactSection } from "@/components/sections/contact";
import { CoursesSection } from "@/components/sections/courses";
import { FaqSection } from "@/components/sections/faq";
import { FeaturesSection } from "@/components/sections/features";
import { HeroSection } from "@/components/sections/hero";
import { JsonLd } from "@/components/seo/json-ld";
import { getDictionary, requireLocale } from "@/lib/dictionary";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const locale = requireLocale(lang);
  const dictionary = getDictionary(locale);

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
      <JsonLd locale={locale} dictionary={dictionary} />
      <HeroSection locale={locale} dictionary={dictionary} />
      <FeaturesSection dictionary={dictionary} />
      <CoursesSection locale={locale} dictionary={dictionary} />
      <FaqSection dictionary={dictionary} />
      <ContactSection locale={locale} dictionary={dictionary} />
    </main>
  );
}
