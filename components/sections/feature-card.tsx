import { FeatureIcon, type FeatureIconName } from "@/components/sections/feature-icon";
import { Reveal } from "@/components/ui/reveal";

type FeatureCardProps = {
  title: string;
  body: string;
  icon: FeatureIconName;
  delay?: number;
};

export function FeatureCard({ title, body, icon, delay = 0 }: FeatureCardProps) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="card-lift group h-full rounded-2xl border border-ink/8 bg-white p-6 shadow-sm">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-spark transition duration-300 group-hover:scale-105">
          <FeatureIcon name={icon} />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-ink-muted">{body}</p>
      </article>
    </Reveal>
  );
}
