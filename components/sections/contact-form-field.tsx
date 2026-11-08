import type { ReactNode } from "react";

const fieldClass =
  "mt-2 w-full rounded-lg border border-ink/15 bg-paper px-3 py-2.5 text-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/30";

type ContactFormFieldProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: (props: {
    id: string;
    describedBy?: string;
    invalid: boolean;
    className: string;
  }) => ReactNode;
};

export function ContactFormField({
  id,
  label,
  error,
  className = "",
  children,
}: ContactFormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      {children({
        id,
        describedBy: error ? errorId : undefined,
        invalid: Boolean(error),
        className: fieldClass,
      })}
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
