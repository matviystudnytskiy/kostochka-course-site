import crypto from "crypto";

const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || "Orders";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

function normalizePrivateKey(value = "") {
  return value
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\\n/g, "\n");
}

function base64Url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function createJwtAssertion() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY);

  if (!clientEmail || !privateKey) {
    throw new Error("Google service account credentials are missing.");
  }

  const now = Math.floor(Date.now() / 1000);

  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const claimSet = {
    iss: clientEmail,
    scope: GOOGLE_SHEETS_SCOPE,
    aud: GOOGLE_TOKEN_URL,
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedClaimSet = base64Url(JSON.stringify(claimSet));
  const unsignedToken = `${encodedHeader}.${encodedClaimSet}`;

  const signature = crypto
    .sign("RSA-SHA256", Buffer.from(unsignedToken), privateKey)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${unsignedToken}.${signature}`;
}

async function getAccessToken() {
  const assertion = createJwtAssertion();

  const body = new URLSearchParams();
  body.append("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer");
  body.append("assertion", assertion);

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.access_token) {
    console.error("Google token error:", {
      status: response.status,
      statusText: response.statusText,
      error: data.error,
      error_description: data.error_description,
    });

    throw new Error("Could not obtain Google access token.");
  }

  return data.access_token;
}

function getSpreadsheetId() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_ID is missing.");
  }

  return spreadsheetId;
}

async function sheetsRequest({ method, range, body }) {
  const accessToken = await getAccessToken();
  const spreadsheetId = getSpreadsheetId();

  const encodedRange = encodeURIComponent(range);
  const isAppend = method === "APPEND";

  const url = isAppend
    ? `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}:append?valueInputOption=USER_ENTERED`
    : `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}?valueInputOption=USER_ENTERED`;

  const response = await fetch(url, {
    method: isAppend ? "POST" : method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("Google Sheets API error:", {
      status: response.status,
      statusText: response.statusText,
      data,
    });

    throw new Error("Google Sheets API request failed.");
  }

  return data;
}

export async function appendOrder(row) {
  await sheetsRequest({
    method: "APPEND",
    range: `${SHEET_NAME}!A:P`,
    body: {
      values: [row],
    },
  });
}

async function getSheetRows() {
  const accessToken = await getAccessToken();
  const spreadsheetId = getSpreadsheetId();
  const range = encodeURIComponent(`${SHEET_NAME}!A:P`);

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("Google Sheets read error:", {
      status: response.status,
      statusText: response.statusText,
      data,
    });

    throw new Error("Could not read Google Sheet rows.");
  }

  return data.values || [];
}

async function findOrderRow(orderReference) {
  const rows = await getSheetRows();
  const index = rows.findIndex((row) => row[2] === orderReference);

  if (index === -1) return null;

  return {
    rowNumber: index + 1,
    row: rows[index],
  };
}

export async function updateOrderAfterCallback({
  orderReference,
  status,
  wayforpayStatus,
  reasonCode,
  paidAt,
  notes,
}) {
  const found = await findOrderRow(orderReference);

  if (!found) {
    const now = new Date().toISOString();

    await appendOrder([
      now,
      now,
      orderReference,
      status,
      "",
      "",
      "UAH",
      "",
      "",
      "",
      "",
      wayforpayStatus || "",
      reasonCode || "",
      paidAt || "",
      status === "PAID" ? "PENDING_MANUAL_ACCESS" : "",
      notes || "Created from WayForPay callback because original row was not found.",
    ]);

    return;
  }

  const existing = found.row;
  const now = new Date().toISOString();

  const updated = [
    existing[0] || now,
    now,
    existing[2] || orderReference,
    status,
    existing[4] || "",
    existing[5] || "",
    existing[6] || "UAH",
    existing[7] || "",
    existing[8] || "",
    existing[9] || "",
    existing[10] || "",
    wayforpayStatus || "",
    reasonCode || "",
    paidAt || "",
    status === "PAID" ? "PENDING_MANUAL_ACCESS" : existing[14] || "",
    notes || existing[15] || "",
  ];

  await sheetsRequest({
    method: "PUT",
    range: `${SHEET_NAME}!A${found.rowNumber}:P${found.rowNumber}`,
    body: {
      values: [updated],
    },
  });
}