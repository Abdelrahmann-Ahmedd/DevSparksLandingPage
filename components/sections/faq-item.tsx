type FaqItemProps = {
  question: string;
  answer: string;
};

export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className="group p-5">
      <summary className="cursor-pointer list-none text-base font-semibold text-ink marker:content-none transition-colors hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spark">
        <span className="flex items-start justify-between gap-4">
          {question}
          <span
            aria-hidden="true"
            className="mt-0.5 text-spark transition duration-300 group-open:rotate-45"
          >
            +
          </span>
        </span>
      </summary>
      <p className="faq-answer mt-3 text-sm leading-6 text-ink-muted">{answer}</p>
    </details>
  );
}
