import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import Image from "next/image";

type Course = Dictionary["courses"]["items"][number];

type CourseCardProps = {
  locale: Locale;
  course: Course;
  featured?: boolean;
  featuredLabel: string;
  includesLabel: string;
  cta: string;
  delay?: number;
};

export function CourseCard({
  locale,
  course,
  featured = false,
  featuredLabel,
  includesLabel,
  cta,
  delay = 0,
}: CourseCardProps) {
  return (
    <Reveal delay={delay} className="h-full">
      <article
        className={`card-lift group relative flex h-full flex-col rounded-2xl border p-6 shadow-sm ${
          featured
            ? "border-spark bg-ink text-paper"
            : "border-ink/8 bg-white text-ink"
        }`}
      >
        {featured ? (
          <p className="absolute -top-3 start-6 z-10 rounded-full bg-spark px-3 py-1 text-xs font-semibold text-ink">
            {featuredLabel}
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
          {"offer" in course && course.offer ? (
            <span className="m-4 text-xl opacity-50 line-through">
              {course.offer}
            </span>
          ) : null}
        </p>
        <p
          className={`mt-3 text-sm leading-6 ${featured ? "text-paper/75" : "text-ink-muted"}`}
        >
          {course.summary}
        </p>
        <p className="mt-5 text-sm font-semibold">{includesLabel}</p>
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
          {cta}
        </ButtonLink>
      </article>
    </Reveal>
  );
}
