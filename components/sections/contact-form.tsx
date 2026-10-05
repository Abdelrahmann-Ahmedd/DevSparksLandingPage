"use client";

import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { useId, useState, type FormEvent } from "react";

type ContactFormProps = {
  locale: Locale;
  dictionary: Dictionary;
};

type FieldErrors = {
  name?: string;
  email?: string;
  phone?: string;
  track?: string;
  message?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fieldClass =
  "mt-2 w-full rounded-lg border border-ink/15 bg-paper px-3 py-2.5 text-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/30";

export function ContactForm({ locale, dictionary }: ContactFormProps) {
  const form = dictionary.contact.form;
  const formId = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<FieldErrors>({});

  function validate(data: FormData): FieldErrors {
    const next: FieldErrors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const track = String(data.get("track") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const digits = phone.replace(/\D/g, "");

    if (!name) next.name = form.errorRequired;
    if (!email) next.email = form.errorRequired;
    else if (!emailPattern.test(email)) next.email = form.errorEmail;
    if (!phone) next.phone = form.errorRequired;
    else if (digits.length < 8 || digits.length > 15) next.phone = form.errorPhone;
    if (!track) next.track = form.errorRequired;
    if (!message) next.message = form.errorRequired;

    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const data = new FormData(formElement);
    const nextErrors = validate(data);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          phone: String(data.get("phone") ?? "").trim(),
          track: String(data.get("track") ?? "").trim(),
          message: String(data.get("message") ?? "").trim(),
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error("Submit failed");
      }

      setStatus("success");
      formElement.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-ink/8 bg-white p-6 shadow-sm"
      aria-describedby={status === "success" ? `${formId}-success` : undefined}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className="block text-sm font-medium text-ink">
            {form.name}
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            placeholder={form.namePlaceholder}
            className={fieldClass}
          />
          {errors.name ? (
            <p id={`${formId}-name-error`} className="mt-1 text-sm text-red-700">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className="block text-sm font-medium text-ink">
            {form.email}
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            placeholder={form.emailPlaceholder}
            className={fieldClass}
          />
          {errors.email ? (
            <p id={`${formId}-email-error`} className="mt-1 text-sm text-red-700">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-phone`} className="block text-sm font-medium text-ink">
            {form.phone}
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
            placeholder={form.phonePlaceholder}
            className={fieldClass}
          />
          {errors.phone ? (
            <p id={`${formId}-phone-error`} className="mt-1 text-sm text-red-700">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-track`} className="block text-sm font-medium text-ink">
            {form.track}
          </label>
          <select
            id={`${formId}-track`}
            name="track"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.track)}
            aria-describedby={errors.track ? `${formId}-track-error` : undefined}
            className={fieldClass}
          >
            <option value="" disabled>
              {form.trackPlaceholder}
            </option>
            {dictionary.courses.items.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          {errors.track ? (
            <p id={`${formId}-track-error`} className="mt-1 text-sm text-red-700">
              {errors.track}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-message`} className="block text-sm font-medium text-ink">
            {form.message}
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={5}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${formId}-message-error` : undefined}
            placeholder={form.messagePlaceholder}
            className={`${fieldClass} resize-y`}
          />
          {errors.message ? (
            <p id={`${formId}-message-error`} className="mt-1 text-sm text-red-700">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-ink-soft disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spark"
      >
        {status === "sending" ? form.sending : form.submit}
      </button>

      {status === "success" ? (
        <p id={`${formId}-success`} className="mt-4 text-sm text-teal" role="status">
          {form.success}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-4 text-sm text-red-700" role="alert">
          {form.errorGeneric}
        </p>
      ) : null}
    </form>
  );
}
