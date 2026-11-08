import type { Dictionary } from "@/lib/dictionary";
import type { CSSProperties } from "react";

const sampleCode = `type Learner = {
  name: string;
  goal: "career" | "craft";
};

function spark(learner: Learner) {
  return {
    ...learner,
    ships: true,
    languages: ["en", "ar"],
  };
}`;

type HeroCodePreviewProps = {
  hero: Dictionary["hero"];
};

export function HeroCodePreview({ hero }: HeroCodePreviewProps) {
  return (
    <div
      className="hero-enter"
      style={{ "--enter-delay": "280ms" } as CSSProperties}
    >
      <figure className="hero-float rounded-2xl border border-white/10 bg-[#0b1220] p-4 shadow-2xl shadow-black/40">
        <figcaption className="mb-3 flex items-center justify-between text-xs text-paper/60">
          <span>{hero.codeCaption}</span>
          <span className="font-mono text-spark">{hero.codeFilename}</span>
        </figcaption>
        <pre
          dir="ltr"
          className="overflow-x-auto rounded-xl bg-black/40 p-4 font-mono text-[13px] leading-6 text-paper/90"
        >
          <code>{sampleCode}</code>
          <span className="hero-caret" aria-hidden="true" />
        </pre>
      </figure>
    </div>
  );
}
