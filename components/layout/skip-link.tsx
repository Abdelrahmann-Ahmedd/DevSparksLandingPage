import type { Dictionary } from "@/lib/dictionary";

type SkipLinkProps = {
  dictionary: Dictionary;
};

export function SkipLink({ dictionary }: SkipLinkProps) {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-spark focus:px-4 focus:py-2 focus:text-ink focus:shadow-lg"
    >
      {dictionary.skipToContent}
    </a>
  );
}
