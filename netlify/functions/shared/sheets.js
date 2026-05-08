import { google } from "googleapis";

const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || "Orders";

function normalizePrivateKey(value = "") {
  return value
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\\n/g, "\n");
}

function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY);

  if (!clientEmail || !privateKey || !process.env.GOOGLE_SHEETS_ID) {
    throw new Error("Google Sheets environment variables are missing.");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function appendOrder(row) {
  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `${SHEET_NAME}!A:P`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}

async function findOrderRow(orderReference) {
  const sheets = getSheetsClient();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `${SHEET_NAME}!A:P`,
  });

  const rows = response.data.values || [];
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
  const sheets = getSheetsClient();
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

  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `${SHEET_NAME}!A${found.rowNumber}:P${found.rowNumber}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [updated],
    },
  });
}