import { CourseCard } from "@/components/sections/course-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

type CoursesSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function CoursesSection({ locale, dictionary }: CoursesSectionProps) {
  const { courses } = dictionary;

  return (
    <section
      id={courses.id}
      aria-labelledby="courses-heading"
      className="bg-mist py-20"
    >
      <Container>
        <SectionHeading
          eyebrow={courses.eyebrow}
          title={courses.title}
          lead={courses.lead}
          titleId="courses-heading"
        />
        <p className="mt-4 text-center text-sm text-ink-muted">
          {courses.currencyNote}
        </p>
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {courses.items.map((course, index) => (
            <li key={course.id} className="h-full">
              <CourseCard
                locale={locale}
                course={course}
                featured={index === 1}
                featuredLabel={courses.featured}
                includesLabel={courses.includesLabel}
                cta={courses.cta}
                delay={index * 90}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
