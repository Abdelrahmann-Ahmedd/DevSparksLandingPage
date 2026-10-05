import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lead: string;
  titleId: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  titleId,
}: SectionHeadingProps) {
  return (
    <Reveal>
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-widest text-spark uppercase">
          {eyebrow}
        </p>
        <h2
          id={titleId}
          className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          {title}
        </h2>
        <p className="mt-4 text-base leading-7 text-ink-muted sm:text-lg">
          {lead}
        </p>
      </header>
    </Reveal>
  );
}
