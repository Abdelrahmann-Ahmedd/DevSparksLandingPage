import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  const variants = {
    primary:
      "bg-spark text-ink hover:bg-spark-bright focus-visible:outline-spark",
    secondary:
      "bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/15 focus-visible:outline-white",
    ghost:
      "bg-ink text-paper hover:bg-ink-soft focus-visible:outline-ink",
  };

  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
