export type ContactLead = {
  name: string;
  email: string;
  phone: string;
  track: string;
  message: string;
  locale: string;
};

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

export async function appendContactLead(lead: ContactLead): Promise<void> {
  const url = requiredEnv("GOOGLE_SHEETS_WEBHOOK_URL");
  const secret = requiredEnv("GOOGLE_SHEETS_WEBHOOK_SECRET");

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      ...lead,
      secret,
      submittedAt: new Date().toISOString(),
    }),
    redirect: "follow",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Sheets webhook failed (${response.status})`);
  }

  const result = (await response.json()) as { ok?: boolean; error?: string };
  if (!result.ok) {
    throw new Error(`Sheets webhook rejected: ${result.error ?? "unknown"}`);
  }
}