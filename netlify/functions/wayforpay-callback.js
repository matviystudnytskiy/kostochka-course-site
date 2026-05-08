import crypto from "crypto";
import { updateOrderAfterCallback } from "./_sheets.js";

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  };
}

function hmacMd5(value, secret) {
  return crypto.createHmac("md5", secret).update(value, "utf8").digest("hex");
}

function safeCompare(a, b) {
  const left = Buffer.from(String(a || ""), "utf8");
  const right = Buffer.from(String(b || ""), "utf8");

  if (left.length !== right.length) return false;

  return crypto.timingSafeEqual(left, right);
}

function responseSignature(orderReference, status, time, secret) {
  return hmacMd5(`${orderReference};${status};${time}`, secret);
}

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { message: "Method not allowed." });
  }

  const secret = process.env.WAYFORPAY_MERCHANT_SECRET_KEY;

  if (!secret) {
    console.error("Missing WAYFORPAY_MERCHANT_SECRET_KEY.");
    return json(500, { message: "Server configuration error." });
  }

  let payload;

  try {
    payload = JSON.parse(event.body || "{}");
  } catch (error) {
    console.error("Invalid callback JSON:", error);
    return json(400, { message: "Invalid JSON." });
  }

  const {
    merchantAccount,
    orderReference,
    merchantSignature,
    amount,
    currency,
    authCode,
    cardPan,
    transactionStatus,
    reasonCode,
  } = payload;

  const signatureString = [
    merchantAccount,
    orderReference,
    amount,
    currency,
    authCode,
    cardPan,
    transactionStatus,
    reasonCode,
  ].join(";");

  const expectedSignature = hmacMd5(signatureString, secret);

  if (!safeCompare(merchantSignature, expectedSignature)) {
    console.error("Invalid WayForPay callback signature.", {
      orderReference,
      transactionStatus,
      reasonCode,
    });

    return json(400, { message: "Invalid signature." });
  }

  const approved = transactionStatus === "Approved" && String(reasonCode) === "1100";
  const status = approved ? "PAID" : "PAYMENT_FAILED";
  const paidAt = approved ? new Date().toISOString() : "";

  try {
    await updateOrderAfterCallback({
      orderReference,
      status,
      wayforpayStatus: transactionStatus,
      reasonCode,
      paidAt,
      notes: approved
        ? "Payment approved. Manual Telegram access required."
        : `Payment not approved: ${transactionStatus}, reasonCode ${reasonCode}`,
    });
  } catch (error) {
    console.error("Google Sheets update error:", error);
  }

  const time = Math.floor(Date.now() / 1000);
  const acceptStatus = "accept";

  return json(200, {
    orderReference,
    status: acceptStatus,
    time,
    signature: responseSignature(orderReference, acceptStatus, time, secret),
  });
};