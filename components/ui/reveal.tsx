"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
} from "react";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
};

export function Reveal({
  delay = 0,
  className = "",
  style,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.classList.add("is-visible");
      return;
    }

    let delayReset: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
          delayReset = window.setTimeout(() => {
            element.style.setProperty("--reveal-delay", "0ms");
          }, delay + 800);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (delayReset) window.clearTimeout(delayReset);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}
