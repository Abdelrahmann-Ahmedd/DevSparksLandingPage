"use client";

import { ContactFormField } from "@/components/sections/contact-form-field";
import { contactLimits } from "@/lib/contact";
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
          website: String(data.get("website") ?? "").trim(),
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
      className="relative rounded-2xl border border-ink/8 bg-white p-6 shadow-sm"
      aria-describedby={status === "success" ? `${formId}-success` : undefined}
    >
      <input
        name="website"
        type="text"
        hidden
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <ContactFormField
          id={`${formId}-name`}
          label={form.name}
          error={errors.name}
        >
          {({ id, describedBy, invalid, className }) => (
            <input
              id={id}
              name="name"
              autoComplete="name"
              required
              maxLength={contactLimits.name}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              placeholder={form.namePlaceholder}
              className={className}
            />
          )}
        </ContactFormField>

        <ContactFormField
          id={`${formId}-email`}
          label={form.email}
          error={errors.email}
        >
          {({ id, describedBy, invalid, className }) => (
            <input
              id={id}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              maxLength={contactLimits.email}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              placeholder={form.emailPlaceholder}
              className={className}
            />
          )}
        </ContactFormField>

        <ContactFormField
          id={`${formId}-phone`}
          label={form.phone}
          error={errors.phone}
        >
          {({ id, describedBy, invalid, className }) => (
            <input
              id={id}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              maxLength={contactLimits.phone}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              placeholder={form.phonePlaceholder}
              className={className}
            />
          )}
        </ContactFormField>

        <ContactFormField
          id={`${formId}-track`}
          label={form.track}
          error={errors.track}
        >
          {({ id, describedBy, invalid, className }) => (
            <select
              id={id}
              name="track"
              required
              defaultValue=""
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={className}
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
          )}
        </ContactFormField>

        <ContactFormField
          id={`${formId}-message`}
          label={form.message}
          error={errors.message}
          className="sm:col-span-2"
        >
          {({ id, describedBy, invalid, className }) => (
            <textarea
              id={id}
              name="message"
              rows={5}
              required
              maxLength={contactLimits.message}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              placeholder={form.messagePlaceholder}
              className={`${className} resize-y`}
            />
          )}
        </ContactFormField>
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
