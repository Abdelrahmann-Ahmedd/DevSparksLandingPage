import { createSign } from "crypto";

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

function toBase64Url(value: object): string {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

async function getAccessToken(): Promise<string> {
  const email = requiredEnv("academydevsparks@gmail.com");
  const privateKey = requiredEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY").replace(
    /\\n/g,
    "\n",
  );
  const now = Math.floor(Date.now() / 1000);
  const assertion = [
    toBase64Url({ alg: "RS256", typ: "JWT" }),
    toBase64Url({
      iss: email,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  ].join(".");
  const signature = createSign("RSA-SHA256")
    .update(assertion)
    .sign(privateKey, "base64url");

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${assertion}.${signature}`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Google auth failed (${response.status})`);
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("Google auth did not return an access token");
  }

  return data.access_token;
}

async function appendViaWebhook(lead: ContactLead): Promise<void> {
  const url = requiredEnv("GOOGLE_SHEETS_WEBHOOK_URL");
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...lead,
      submittedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Sheets webhook failed (${response.status})`);
  }
}

async function appendViaServiceAccount(lead: ContactLead): Promise<void> {
  const spreadsheetId = requiredEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME?.trim() || "Sheet1";
  const token = await getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };
  const encodedRange = encodeURIComponent(`${sheetName}!A1:G1`);
  const existing = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}`,
    { headers },
  );

  if (!existing.ok) {
    throw new Error(`Could not read Google Sheet (${existing.status})`);
  }

  const current = (await existing.json()) as { values?: string[][] };
  const hasHeader = Boolean(current.values?.[0]?.length);
  const values = hasHeader
    ? [
        [
          new Date().toISOString(),
          lead.name,
          lead.email,
          lead.phone,
          lead.track,
          lead.message,
          lead.locale,
        ],
      ]
    : [
        ["Timestamp", "Name", "Email", "Phone", "Program", "Message", "Locale"],
        [
          new Date().toISOString(),
          lead.name,
          lead.email,
          lead.phone,
          lead.track,
          lead.message,
          lead.locale,
        ],
      ];

  const append = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(`${sheetName}!A:G`)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values }),
    },
  );

  if (!append.ok) {
    throw new Error(`Could not append to Google Sheet (${append.status})`);
  }
}

export async function appendContactLead(lead: ContactLead): Promise<void> {
  if (process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim()) {
    await appendViaWebhook(lead);
    return;
  }

  await appendViaServiceAccount(lead);
}
