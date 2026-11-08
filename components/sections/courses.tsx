import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import Image from "next/image";

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
          {courses.items.map((course, index) => {
            const featured = index === 1;

            return (
              <li key={course.id} className="h-full">
                <Reveal delay={index * 90} className="h-full">
                  <div
                    className={`card-lift group relative flex h-full flex-col rounded-2xl border p-6 shadow-sm ${
                      featured
                        ? "border-spark bg-ink text-paper"
                        : "border-ink/8 bg-white text-ink"
                    }`}
                  >
                    {featured ? (
                      <p className="absolute -top-3 start-6 z-10 rounded-full bg-spark px-3 py-1 text-xs font-semibold text-ink">
                        {courses.featured}
                      </p>
                    ) : null}
                    <figure className="-mx-6 -mt-6 mb-5 overflow-hidden rounded-t-2xl">
                      <Image
                        src={course.src}
                        alt={course.name}
                        width={640}
                        height={360}
                        className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </figure>
                    <h3 className="text-xl font-semibold">{course.name}</h3>
                    <p
                      className={`mt-1 text-sm ${featured ? "text-paper/70" : "text-ink-muted"}`}
                    >
                      {course.level} · {course.duration}
                    </p>
                    <p className="mt-4 text-3xl font-semibold">
                      {course.price}
                      <span className="m-4 opacity-50 text-xl line-through">{course.offer}</span>
                    </p>
                    <p
                      className={`mt-3 text-sm leading-6 ${featured ? "text-paper/75" : "text-ink-muted"}`}
                    >
                      {course.summary}
                    </p>
                    <p className="mt-5 text-sm font-semibold">{courses.includesLabel}</p>
                    <ul className="mt-2 space-y-2 text-sm">
                      {course.includes.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden="true" className="text-spark">
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <ButtonLink
                      href={`/${locale}#contact`}
                      variant={featured ? "primary" : "ghost"}
                      className="mt-6 w-full"
                    >
                      {courses.cta}
                    </ButtonLink>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
